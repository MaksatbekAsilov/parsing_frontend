<template>
  <div class="container" :class="isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'">
    <h2 class="title">Выберите источник</h2>

    <!-- Выпадающий список -->
    <div class="select-wrapper">
      <select v-model="selectedSource" @change="fetchPrices" class="select" :class="isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-black'">
        <option value="vbr">VBR</option>
        <option value="investing">Investing</option>
        <option value="bitinfo">BitInfo</option>
      </select>
    </div>

    <!-- Контейнер для таблицы с прокруткой вниз -->
    <div class="table-container">
      <table v-if="prices.length" class="table">
        <thead class="sticky-header" :class="isDark ? 'bg-gray-800 text-white' : 'bg-red-100 text-red-900'">
          <tr>
            <th>Валюта</th>
            <th>Цена</th>
            <th>Дата обновления</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(price, index) in prices" :key="price.currency" :class="{ 'dark-row': isDark && index % 2 === 1 }">
            <td>{{ price.currency }}</td>
            <td>{{ price.price.toFixed(2) }}$</td>
            <td>{{ formatDate(price.timestamp) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Сообщение, если данных нет -->
    <p v-if="!prices.length" class="no-data">Нет данных для выбранного источника</p>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import axios from "axios";
import { format } from "date-fns";

export default {
  setup() {
    const selectedSource = ref("vbr");
    const prices = ref([]);
    const isDark = inject("isDark");

    // Загрузка данных
    const fetchPrices = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/prices/${selectedSource.value}`);
        prices.value = response.data;
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        prices.value = [];
      }
    };

    // Форматирование даты
    const formatDate = (timestamp) => {
      return timestamp ? format(new Date(timestamp), "dd.MM.yyyy HH:mm:ss") : "Нет данных";
    };

    // Загружаем данные при старте
    fetchPrices();

    return { selectedSource, prices, fetchPrices, formatDate, isDark };
  },
};
</script>

<style scoped>
/* Центрируем контейнер */
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

/* Заголовок */
.title {
  font-size: 24px;
  font-weight: bold;
  color: #b71c1c;
  margin-bottom: 16px;
}

/* Обертка для select */
.select-wrapper {
  margin-bottom: 12px;
}

/* Select */
.select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
}

/* Таблица с прокруткой вниз */
.table-container {
  max-height: 400px;
  overflow-y: auto;
  border: 2px solid #e3342f;
  border-radius: 10px;
}

/* Таблица */
.table {
  width: 100%;
  border-collapse: collapse;
}

/* Фиксируем заголовки */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
}

/* Стили ячеек */
th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

/* Чередование строк */
tbody tr:nth-child(even) {
  background: #fce4e4;
}

/* Темные четные строки в темной теме */
.dark-row {
  background: #8b0000 !important; /* Темно-красный фон */
  color: black !important; /* Черный текст */
}

/* Подсветка при наведении */
tbody tr:hover {
  background: #ffebee;
}

/* Сообщение, если нет данных */
.no-data {
  text-align: center;
  color: gray;
  margin-top: 10px;
}

/* Стилизация вертикального ползунка */
.table-container::-webkit-scrollbar {
  width: 12px;
}

.table-container::-webkit-scrollbar-track {
  background: var(--scrollbar-track, #ffebee);
  border-radius: 10px;
}

.table-container::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb, #e3342f);
  border-radius: 10px;
  border: 3px solid var(--scrollbar-track, #ffebee);
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover, #b71c1c);
}

/* Для Firefox */
.table-container {
  scrollbar-color: var(--scrollbar-thumb, #e3342f) var(--scrollbar-track, #ffebee);
  scrollbar-width: thin;
}
</style>
