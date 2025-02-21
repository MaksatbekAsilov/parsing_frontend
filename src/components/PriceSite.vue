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

    <!-- Контейнер для таблицы -->
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
import { ref, inject, onMounted } from "vue";
import api from "@/api"; // Используем общий API с настройками токена
import { format } from "date-fns";

export default {
  setup() {
    const selectedSource = ref("vbr");
    const prices = ref([]);
    const isDark = inject("isDark");

    // Функция загрузки данных
    const fetchPrices = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Нет токена, пользователь не авторизован");
        return;
      }

      try {
        const response = await api.get(`/prices/${selectedSource.value}`, {
          headers: { Authorization: `Bearer ${token}` }, // Передаем JWT
        });
        prices.value = response.data;
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        if (error.response && error.response.status === 401) {
          alert("Сессия истекла, пожалуйста, войдите снова");
          localStorage.removeItem("token");
          window.location.href = "/login"; // Перенаправление на вход
        }
        prices.value = [];
      }
    };

    // Форматирование даты
    const formatDate = (timestamp) => {
      return timestamp ? format(new Date(timestamp), "dd.MM.yyyy HH:mm:ss") : "Нет данных";
    };

    // Загружаем данные при монтировании компонента
    onMounted(fetchPrices);

    return { selectedSource, prices, fetchPrices, formatDate, isDark };
  },
};
</script>

<style scoped>
/* Общие стили */
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #b71c1c;
  margin-bottom: 16px;
}

.select-wrapper {
  margin-bottom: 12px;
}

.select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
}

/* Таблица */
.table-container {
  max-height: 400px;
  overflow-y: auto;
  border: 2px solid #e3342f;
  border-radius: 10px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

/* Чередование строк */
tbody tr:nth-child(even) {
  background: #fce4e4;
}

/* Темные строки в темной теме */
.dark-row {
  background: #8b0000 !important;
  color: black !important;
}

tbody tr:hover {
  background: #ffebee;
}

/* Сообщение, если нет данных */
.no-data {
  text-align: center;
  color: gray;
  margin-top: 10px;
}
</style>
