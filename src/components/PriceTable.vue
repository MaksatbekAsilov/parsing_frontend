<template>
  <div class="container mx-auto p-6" :class="isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'">
    <h2 class="text-3xl font-semibold" :class="isDark ? 'text-yellow-300' : 'text-yellow-800'">Сравнение цен криптовалют</h2>

    <div class="mb-6">
      <label for="currency" class="block text-lg font-medium" :class="isDark ? 'text-yellow-300' : 'text-yellow-700'">Выберите валюту:</label>
      <select
        v-model="selectedCurrency"
        @change="fetchPrices"
        class="mt-2 p-3 border-2 rounded-lg w-full focus:outline-none focus:ring-2"
        :class="isDark ? 'bg-gray-800 border-yellow-400 text-yellow-300 focus:ring-yellow-300' : 'border-yellow-500 text-yellow-700 focus:ring-yellow-400'"
      >
        <option v-for="currency in availableCurrencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </div>

    <table v-if="prices" class="w-full shadow-lg rounded-xl overflow-hidden border">
      <thead :class="isDark ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700'">
        <tr>
          <th class="py-3 px-6 text-left font-medium">Источник</th>
          <th class="py-3 px-6 text-left font-medium">Цена</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="py-3 px-6 border-t" :class="isDark ? 'text-yellow-300' : 'text-yellow-700'">VBR</td>
          <td class="py-3 px-6 border-t font-bold" :class="isDark ? 'text-yellow-400' : 'text-yellow-600'">{{ prices.vbr ? prices.vbr.toFixed(2) + '$' : 'Нет данных' }}</td>
        </tr>
        <tr>
          <td class="py-3 px-6 border-t" :class="isDark ? 'text-yellow-300' : 'text-yellow-700'">Investing</td>
          <td class="py-3 px-6 border-t font-bold" :class="isDark ? 'text-yellow-400' : 'text-yellow-600'">{{ prices.investing ? prices.investing.toFixed(2) + '$' : 'Нет данных' }}</td>
        </tr>
        <tr>
          <td class="py-3 px-6 border-t" :class="isDark ? 'text-yellow-300' : 'text-yellow-700'">BitInfo</td>
          <td class="py-3 px-6 border-t font-bold" :class="isDark ? 'text-yellow-400' : 'text-yellow-600'">{{ prices.bitinfo ? prices.bitinfo.toFixed(2) + '$' : 'Нет данных' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted, inject } from "vue";
import api from "@/api";

export default {
  setup() {
    const selectedCurrency = ref("BTC");
    const prices = ref(null);
    const availableCurrencies = ["SOL", "BTC", "LINK", "DOGE", "ADA", "BNB", "LTC", "ETH", "XRP"];
    const isDark = inject("isDark");

    const fetchPrices = async () => {
      try {
        const response = await api.get(`/prices/compare/${selectedCurrency.value}`);
        prices.value = response.data.prices;
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        prices.value = null;
      }
    };

    onMounted(fetchPrices);

    return { selectedCurrency, prices, availableCurrencies, fetchPrices, isDark };
  },
};
</script>

<style scoped>
/* Вся стилизация через Tailwind CSS */
</style>
