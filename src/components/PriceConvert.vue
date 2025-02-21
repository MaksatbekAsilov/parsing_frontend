<template>
  <div class="container mx-auto p-6 transition-colors duration-300"
       :class="isDark ? 'bg-gray-900 text-green-300' : 'bg-green-50 text-green-800'">

    <h2 class="text-2xl font-bold mb-4" :class="isDark ? 'text-green-400' : 'text-green-700'">
      Конвертация валют
    </h2>

    <!-- Форма для конвертации валют -->
    <div class="mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Выбор валюты -->
        <div>
          <label for="fromCurrency" class="block text-lg font-medium" :class="isDark ? 'text-green-300' : 'text-green-600'">
            Из какой валюты:
          </label>
          <select v-model="fromCurrency"
                  class="mt-2 p-2 border rounded-lg w-full transition"
                  :class="isDark ? 'bg-gray-800 border-green-600 text-white' : 'bg-green-100 border-green-400 text-black'">
            <option value="SOL">SOL</option>
            <option value="BTC">BTC</option>
            <option value="LINK">LINK</option>
            <option value="DOGE">DOGE</option>
            <option value="ADA">ADA</option>
            <option value="BNB">BNB</option>
            <option value="LTC">LTC</option>
            <option value="ETH">ETH</option>
            <option value="XRP">XRP</option>
          </select>
        </div>

        <!-- Выбор валюты для конвертации -->
        <div>
          <label for="toCurrency" class="block text-lg font-medium" :class="isDark ? 'text-green-300' : 'text-green-600'">
            В какую валюту:
          </label>
          <select v-model="toCurrency"
                  class="mt-2 p-2 border rounded-lg w-full transition"
                  :class="isDark ? 'bg-gray-800 border-green-600 text-white' : 'bg-green-100 border-green-400 text-black'">
            <option value="SOL">SOL</option>
            <option value="BTC">BTC</option>
            <option value="LINK">LINK</option>
            <option value="DOGE">DOGE</option>
            <option value="ADA">ADA</option>
            <option value="BNB">BNB</option>
            <option value="LTC">LTC</option>
            <option value="ETH">ETH</option>
            <option value="XRP">XRP</option>
          </select>
        </div>
      </div>

      <!-- Ввод суммы для конвертации -->
      <div class="mt-4">
        <label for="amount" class="block text-lg font-medium" :class="isDark ? 'text-green-300' : 'text-green-600'">
          Сумма:
        </label>
        <input v-model="amount" type="number" step="0.01" min="0"
               class="mt-2 p-2 border rounded-lg w-full transition"
               :class="isDark ? 'bg-gray-800 border-green-600 text-white' : 'bg-green-100 border-green-400 text-black'">
      </div>

      <!-- Выбор источника для курса -->
      <div class="mt-4">
        <label for="source" class="block text-lg font-medium" :class="isDark ? 'text-green-300' : 'text-green-600'">
          Выберите источник:
        </label>
        <select v-model="selectedSource"
                class="mt-2 p-2 border rounded-lg w-full transition"
                :class="isDark ? 'bg-gray-800 border-green-600 text-white' : 'bg-green-100 border-green-400 text-black'">
          <option value="vbr">VBR</option>
          <option value="investing">Investing</option>
          <option value="bitinfo">BitInfo</option>
        </select>
      </div>

      <!-- Кнопка для конвертации -->
      <button @click="convertCurrency"
              class="mt-4 p-2 rounded-lg w-full transition"
              :class="isDark ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-500 hover:bg-green-400 text-white'">
        Конвертировать
      </button>
    </div>

    <!-- Результат конвертации -->
    <div v-if="convertedPrice !== null" class="mt-6 p-4 shadow-md rounded-lg transition"
         :class="isDark ? 'bg-gray-800 text-green-300' : 'bg-white text-green-700'">
      <h3 class="text-xl font-bold">Результат конвертации</h3>
      <p class="text-lg">
        {{ amount }} {{ fromCurrency }} = {{ convertedPrice }} {{ toCurrency }}
      </p>
      <p class="text-lg">Курс: {{ rate }}</p>
    </div>

    <!-- Сообщение об ошибке -->
    <p v-if="errorMessage" class="text-center mt-6" :class="isDark ? 'text-green-300' : 'text-green-700'">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import axios from "axios";

// Переменные формы
const fromCurrency = ref("SOL");
const toCurrency = ref("USD");
const amount = ref(0);
const selectedSource = ref("vbr");
const convertedPrice = ref(null);
const rate = ref(null);
const errorMessage = ref(null);

// Получаем тему из App.vue
const isDark = inject("isDark");

// Функция конвертации валют с передачей JWT
const convertCurrency = async () => {
  if (amount.value <= 0) {
    errorMessage.value = "Пожалуйста, введите сумму больше нуля.";
    return;
  }

  errorMessage.value = null;
  convertedPrice.value = null;

  try {
    const token = localStorage.getItem("token"); // Получаем токен

    const response = await axios.post(
      "http://127.0.0.1:8000/convert",
      {
        from_currency: fromCurrency.value,
        to_currency: toCurrency.value,
        amount: parseFloat(amount.value),
        source: selectedSource.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Передаём токен в заголовке
          "Content-Type": "application/json", // Указываем тип контента
        },
      }
    );

    convertedPrice.value = response.data.converted_price.toFixed(2);
    rate.value = response.data.rate.toFixed(2);
  } catch (error) {
    console.error("Ошибка конвертации:", error);
    errorMessage.value = "Ошибка при получении данных. Попробуйте снова.";
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
}
</style>
