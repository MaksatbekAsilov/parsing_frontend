<template>
  <div id="app" class="flex items-center justify-center min-h-screen w-full bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <nav class="flex justify-between mb-6">
        <RouterLink v-if="!isAuthenticated" to="/register" class="text-blue-500 hover:text-blue-700">Регистрация</RouterLink>
        <RouterLink v-if="!isAuthenticated" to="/login" class="text-blue-500 hover:text-blue-700">Вход</RouterLink>
        <RouterLink v-if="isAuthenticated" to="/compare" class="text-blue-500 hover:text-blue-700">Главная</RouterLink>
        <button v-if="isAuthenticated" @click="logout" class="text-red-500 hover:text-red-700">Выход</button>
      </nav>

      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isAuthenticated = ref(!!localStorage.getItem("token")); // Проверка токена

// Проверяем токен при загрузке
const checkAuth = () => {
  isAuthenticated.value = !!localStorage.getItem("token");
};

// Функция выхода
const logout = () => {
  localStorage.removeItem("token"); // Удаляем токен
  checkAuth(); // Обновляем состояние
  router.push("/login"); // Перенаправляем на страницу входа
};

// Следим за изменениями токена
watchEffect(checkAuth);

// Обработчик изменения localStorage в других вкладках
const handleStorageChange = (event) => {
  if (event.key === "token") {
    checkAuth();
  }
};

// Добавляем обработчик при монтировании компонента
onMounted(() => {
  window.addEventListener("storage", handleStorageChange);
});

// Убираем обработчик при размонтировании
onUnmounted(() => {
  window.removeEventListener("storage", handleStorageChange);
});
</script>
