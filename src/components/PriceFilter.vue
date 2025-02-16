<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold text-purple-800 mb-4">Фильтр курсов криптовалют</h2>

    <!-- Фильтр -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label class="block text-lg font-medium text-purple-700">Мин. цена:</label>
        <input v-model.number="minPrice" type="number" class="mt-2 p-2 border border-purple-500 rounded-lg w-full" />
      </div>

      <div>
        <label class="block text-lg font-medium text-purple-700">Макс. цена:</label>
        <input v-model.number="maxPrice" type="number" class="mt-2 p-2 border border-purple-500 rounded-lg w-full" />
      </div>

      <div>
        <label class="block text-lg font-medium text-purple-700">Источник:</label>
        <select v-model="selectedSource" class="mt-9 p-2 border border-purple-500 rounded-lg w-full">
          <option value="">Все</option>
          <option value="VBR">VBR</option>
          <option value="Investing">Investing</option>
          <option value="BitInfo">BitInfo</option>
        </select>
      </div>
    </div>

    <button @click="fetchFilteredPrices" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
      Применить фильтр
    </button>

    <!-- Таблица с вертикальной прокруткой -->
    <div class="overflow-y-auto max-h-96 mt-6 custom-scrollbar">
      <table v-if="prices.length" class="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-purple-100">
          <tr>
            <th class="py-2 px-4 text-purple-700">Валюта</th>
            <th class="py-2 px-4 text-purple-700">Цена</th>
            <th class="py-2 px-4 text-purple-700">Источник</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="price in prices" :key="price.currency + price.source" class="border-b hover:bg-purple-50">
            <td class="py-2 px-4 text-purple-800">{{ price.currency }}</td>
            <td class="py-2 px-4 font-bold text-purple-600">{{ price.price.toFixed(2) }}$</td>
            <td class="py-2 px-4 text-purple-800">{{ price.source }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-gray-500 mt-4">Нет данных для выбранных параметров.</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const minPrice = ref(null);
    const maxPrice = ref(null);
    const selectedSource = ref("");
    const prices = ref([]);

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

    return { minPrice, maxPrice, selectedSource, prices, fetchFilteredPrices };
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
