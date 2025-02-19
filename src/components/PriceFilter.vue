<template>
  <div class="container mx-auto p-6" :class="isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'">
    <h2 class="text-2xl font-bold" :class="isDark ? 'text-purple-300' : 'text-purple-800'">Фильтр курсов криптовалют</h2>

    <!-- Фильтр -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label class="block text-lg font-medium" :class="isDark ? 'text-purple-300' : 'text-purple-700'">Мин. цена:</label>
        <input v-model.number="minPrice" type="number" class="mt-2 p-2 border rounded-lg w-full" :class="isDark ? 'bg-gray-800 border-purple-400 text-white' : 'border-purple-500 text-black'" />
      </div>

      <div>
        <label class="block text-lg font-medium" :class="isDark ? 'text-purple-300' : 'text-purple-700'">Макс. цена:</label>
        <input v-model.number="maxPrice" type="number" class="mt-2 p-2 border rounded-lg w-full" :class="isDark ? 'bg-gray-800 border-purple-400 text-white' : 'border-purple-500 text-black'" />
      </div>

      <div>
        <label class="block text-lg font-medium" :class="isDark ? 'text-purple-300' : 'text-purple-700'">Источник:</label>
        <select v-model="selectedSource" class="mt-9 p-2 border rounded-lg w-full" :class="isDark ? 'bg-gray-800 border-purple-400 text-white' : 'border-purple-500 text-black'">
          <option value="">Все</option>
          <option value="VBR">VBR</option>
          <option value="Investing">Investing</option>
          <option value="BitInfo">BitInfo</option>
        </select>
      </div>
    </div>

    <button @click="fetchFilteredPrices" class="px-4 py-2 rounded-lg" :class="isDark ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-purple-600 text-white hover:bg-purple-700'">
      Применить фильтр
    </button>

    <!-- Таблица с вертикальной прокруткой -->
    <div class="overflow-y-auto max-h-96 mt-6 custom-scrollbar relative">
      <table v-if="prices.length" class="w-full shadow-md rounded-lg overflow-hidden" :class="isDark ? 'bg-gray-800' : 'bg-white'">
        <thead class="sticky top-0 z-10" :class="isDark ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700'">
          <tr>
            <th class="py-2 px-4">Валюта</th>
            <th class="py-2 px-4">Цена</th>
            <th class="py-2 px-4">Источник</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="price in prices" :key="price.currency + price.source" class="border-b" :class="isDark ? 'hover:bg-purple-700' : 'hover:bg-purple-50'">
            <td class="py-2 px-4" :class="isDark ? 'text-purple-300' : 'text-purple-800'">{{ price.currency }}</td>
            <td class="py-2 px-4 font-bold" :class="isDark ? 'text-purple-400' : 'text-purple-600'">{{ price.price.toFixed(2) }}$</td>
            <td class="py-2 px-4" :class="isDark ? 'text-purple-300' : 'text-purple-800'">{{ price.source }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="mt-4" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Нет данных для выбранных параметров.</p>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import axios from "axios";

export default {
  setup() {
    const minPrice = ref(null);
    const maxPrice = ref(null);
    const selectedSource = ref("");
    const prices = ref([]);
    const isDark = inject("isDark");

    // Функция для отправки POST-запроса на сервер с фильтрами
    const fetchFilteredPrices = async () => {
      try {
        const body = {
          min_price: minPrice.value,
          max_price: maxPrice.value,
          source: selectedSource.value
        };

        console.log("Отправленные данные:", body);
        const response = await axios.post("http://127.0.0.1:8000/prices/filter", body);
        
        if (response.data && Array.isArray(response.data)) {
          prices.value = response.data;
        } else {
          prices.value = [];
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        prices.value = [];
      }
    };

    return { minPrice, maxPrice, selectedSource, prices, fetchFilteredPrices, isDark };
  },
};
</script>

<style scoped>
/* Кастомный стиль для скроллбара */
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #7c3aed;
  border-radius: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background-color: #e9d5ff;
}
</style>
