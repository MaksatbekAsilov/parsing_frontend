<template>
  <div class="container mx-auto p-6">
    <h2 class="text-3xl font-semibold text-yellow-800 mb-6">Сравнение цен криптовалют</h2>

    <div class="mb-6">
      <label for="currency" class="block text-lg font-medium text-yellow-700">Выберите валюту:</label>
      <select
        v-model="selectedCurrency"
        @change="fetchPrices"
        class="mt-2 p-3 border-2 border-yellow-500 rounded-lg w-full text-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option v-for="currency in availableCurrencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </div>

    <table v-if="prices" class="w-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
      <thead class="bg-yellow-100">
        <tr>
          <th class="py-3 px-6 text-left text-yellow-700 font-medium">Источник</th>
          <th class="py-3 px-6 text-left text-yellow-700 font-medium">Цена</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="py-3 px-6 border-t text-yellow-700">VBR</td>
          <td class="py-3 px-6 border-t text-yellow-600 font-bold">{{ prices.vbr ? prices.vbr.toFixed(2) + '$' : 'Нет данных' }}</td>
        </tr>
        <tr>
          <td class="py-3 px-6 border-t text-yellow-700">Investing</td>
          <td class="py-3 px-6 border-t text-yellow-600 font-bold">{{ prices.investing ? prices.investing.toFixed(2) + '$' : 'Нет данных' }}</td>
        </tr>
        <tr>
          <td class="py-3 px-6 border-t text-yellow-700">BitInfo</td>
          <td class="py-3 px-6 border-t text-yellow-600 font-bold">{{ prices.bitinfo ? prices.bitinfo.toFixed(2) + '$' : 'Нет данных' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "@/api";

export default {
  setup() {
    const selectedCurrency = ref("BTC");
    const prices = ref(null);
    const availableCurrencies = ["SOL", "BTC", "LINK", "DOGE", "ADA", "BNB", "LTC", "ETH", "XRP"]; // Можно расширить список

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

    return { selectedCurrency, prices, availableCurrencies, fetchPrices };
  },
};
</script>

<style scoped>
/* Вся стилизация с помощью Tailwind CSS */
</style>
