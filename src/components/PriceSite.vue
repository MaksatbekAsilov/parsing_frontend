<template>
  <div class="container">
    <h2 class="title">Выберите источник</h2>

    <!-- Выпадающий список -->
    <div class="select-wrapper">
      <select v-model="selectedSource" @change="fetchPrices" class="select">
        <option value="vbr">VBR</option>
        <option value="investing">Investing</option>
        <option value="bitinfo">BitInfo</option>
      </select>
    </div>

    <!-- Контейнер для таблицы с прокруткой вниз -->
    <div class="table-container">
      <table v-if="prices.length" class="table">
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Цена</th>
            <th>Дата обновления</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="price in prices" :key="price.currency">
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
import { ref } from "vue";
import axios from "axios";
import { format } from "date-fns";

export default {
  setup() {
    const selectedSource = ref("vbr");
    const prices = ref([]);

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

    return { selectedSource, prices, fetchPrices, formatDate };
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
  border: 2px solid #e3342f;
  border-radius: 8px;
  font-size: 16px;
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
thead {
  position: sticky;
  top: 0;
  background: #f8d7da;
  z-index: 10;
}

/* Стили ячеек */
th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

/* Цвета заголовков */
th {
  color: #b71c1c;
  font-weight: bold;
}

/* Чередование строк */
tbody tr:nth-child(even) {
  background: #fce4e4;
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
  width: 8px; /* Ширина ползунка */
}

.table-container::-webkit-scrollbar-track {
  background: #ffebee; /* Цвет фона */
  border-radius: 10px;
}

.table-container::-webkit-scrollbar-thumb {
  background: #e3342f; /* Цвет ползунка */
  border-radius: 10px;
  border: 2px solid #ffebee; /* Окантовка */
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #b71c1c; /* Цвет ползунка при наведении */
}

/* Для Firefox */
.table-container {
  scrollbar-color: #e3342f #ffebee;
  scrollbar-width: thin;
}

</style>
