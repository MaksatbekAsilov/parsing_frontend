<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold text-green-700 mb-4">Конвертация валют</h2>

    <!-- Форма для конвертации валют -->
    <div class="mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Выбор валюты -->
        <div>
          <label for="fromCurrency" class="block text-lg font-medium text-green-600">Из какой валюты:</label>
          <select v-model="fromCurrency" class="mt-2 p-2 border border-green-500 rounded-lg w-full">
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
          <label for="toCurrency" class="block text-lg font-medium text-green-600">В какую валюту:</label>
          <select v-model="toCurrency" class="mt-2 p-2 border border-green-500 rounded-lg w-full">
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
        <label for="amount" class="block text-lg font-medium text-green-600">Сумма:</label>
        <input
          v-model="amount"
          type="number"
          step="0.01"
          min="0"
          class="mt-2 p-2 border border-green-500 rounded-lg w-full"
        />
      </div>

      <!-- Выбор источника для курса -->
      <div class="mt-4">
        <label for="source" class="block text-lg font-medium text-green-600">Выберите источник:</label>
        <select v-model="selectedSource" class="mt-2 p-2 border border-green-500 rounded-lg w-full">
          <option value="vbr">VBR</option>
          <option value="investing">Investing</option>
          <option value="bitinfo">BitInfo</option>
        </select>
      </div>

      <!-- Кнопка для конвертации -->
      <button
        @click="convertCurrency"
        class="mt-4 p-2 bg-green-600 text-white rounded-lg w-full"
      >
        Конвертировать
      </button>
    </div>

    <!-- Результат конвертации -->
    <div v-if="convertedPrice !== null" class="mt-6 p-4 bg-white shadow-md rounded-lg">
      <h3 class="text-xl font-bold text-green-700">Результат конвертации</h3>
      <p class="text-lg text-green-600">
        {{ amount }} {{ fromCurrency }} = {{ convertedPrice }} {{ toCurrency }}
      </p>
      <p class="text-lg text-green-600">Курс: {{ rate }}</p>
    </div>

    <!-- Сообщение об ошибке, если нет данных -->
    <p v-if="errorMessage" class="text-center text-green-600 mt-6">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    // Переменные для формы
    const fromCurrency = ref("SOL");
    const toCurrency = ref("USD");
    const amount = ref(0);
    const selectedSource = ref("vbr");
    const convertedPrice = ref(null);
    const rate = ref(null);
    const errorMessage = ref(null);

    // Функция для конвертации валют
    const convertCurrency = async () => {
      // Проверка на пустое значение для amount
      if (amount.value <= 0) {
        errorMessage.value = "Пожалуйста, введите сумму больше нуля.";
        return;
      }

      // Очистка ошибок и предыдущих данных
      errorMessage.value = null;
      convertedPrice.value = null;

      try {
        // Запрос на конвертацию через FastAPI
        const response = await axios.post("http://127.0.0.1:8000/convert", {
          from_currency: fromCurrency.value,
          to_currency: toCurrency.value,
          amount: parseFloat(amount.value),
          source: selectedSource.value,
        });

        // Обновление данных с результатом конвертации
        convertedPrice.value = response.data.converted_price.toFixed(2);
        rate.value = response.data.rate.toFixed(2);
      } catch (error) {
        console.error("Ошибка конвертации:", error);
        errorMessage.value = "Ошибка при получении данных. Попробуйте снова.";
      }
    };

    return {
      fromCurrency,
      toCurrency,
      amount,
      selectedSource,
      convertedPrice,
      rate,
      errorMessage,
      convertCurrency,
    };
  },
};
</script>

<style scoped>
/* Стили для формы и результатов */
.container {
  max-width: 900px;
  margin: 0 auto;
}
</style>

