<template>
  <div>
    <div class="flex items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat transition-colors duration-300"
         :style="{ backgroundImage: `url(${backgroundUrl})`, backdropFilter: 'blur(10px)', backgroundSize: 'cover', backgroundPosition: 'center' }"
         :class="isDark ? 'bg-black' : 'bg-white'">
      
      <div class="w-full max-w-md p-8 rounded-xl shadow-lg transition-colors duration-300"
           :class="isDark ? 'bg-black text-white border border-gray-800' : 'bg-white text-black border border-gray-300'">
        
        <nav class="flex justify-between mb-6">
          <div class="flex space-x-4">
            <RouterLink v-if="!isAuthenticated" to="/register" class="text-blue-500 hover:text-blue-700">Регистрация</RouterLink>
            <RouterLink v-if="!isAuthenticated" to="/login" class="text-blue-500 hover:text-blue-700">Вход</RouterLink>
            <RouterLink v-if="isAuthenticated" to="/compare" class="text-blue-500 hover:text-blue-700">Главная</RouterLink>
          </div>
          <div class="flex space-x-4">
            <button @click="toggleTheme" class="text-gray-800 dark:text-gray-200">
              {{ isDark ? '☀️' : '🌙' }}
            </button>
            <button v-if="isAuthenticated" @click="showLogoutNotification" class="text-red-500 hover:text-red-700">Выход</button>
          </div>
        </nav>

        <RouterView />
      </div>
    </div>

    <!-- Уведомление о выходе в центре экрана без затемнения -->
    <div v-if="isLogoutNotificationOpen" class="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg">
      <span class="mr-4">Вы уверены, что хотите выйти?</span>
      <button @click="confirmLogout" class="bg-white text-red-500 px-4 py-1 rounded-lg hover:bg-gray-200 mr-2">Выйти</button>
      <button @click="isLogoutNotificationOpen = false" class="bg-gray-300 text-black px-4 py-1 rounded-lg hover:bg-gray-400">Отмена</button>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isAuthenticated = ref(!!localStorage.getItem("token"));
const isLogoutNotificationOpen = ref(false);

const showLogoutNotification = () => {
  isLogoutNotificationOpen.value = true;
};

const confirmLogout = () => {
  localStorage.removeItem("token");
  isAuthenticated.value = false;
  isLogoutNotificationOpen.value = false;
  router.push("/login");
  setTimeout(() => {
    window.location.reload();
  }, 100);
};

const isDark = ref(localStorage.getItem("theme") === "dark");

const lightBackground = "https://images.wallpaperscraft.ru/image/single/solntse_utro_les_4812_1280x720.jpg";
const darkBackground = "https://images.wallpaperscraft.ru/image/single/domik_les_tuman_128777_3840x2160.jpg";
const backgroundUrl = ref(isDark.value ? darkBackground : lightBackground);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
  updateTheme();
};

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    backgroundUrl.value = darkBackground;
  } else {
    document.documentElement.classList.remove("dark");
    backgroundUrl.value = lightBackground;
  }
};

onMounted(() => {
  updateTheme();
});

provide("isDark", isDark);
provide("toggleTheme", toggleTheme);
</script>
