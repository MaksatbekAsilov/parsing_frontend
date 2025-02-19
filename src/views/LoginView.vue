<template>
  <div class="flex items-center justify-center min-h-screen transition-colors duration-300 p-6"
       :class="isDark ? 'bg-gradient-to-r from-gray-900 to-black' : 'bg-gradient-to-r from-blue-500 to-purple-600'">
    
    <div class="w-full max-w-md p-8 rounded-2xl shadow-xl transition-colors duration-300"
         :class="isDark ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-800 border border-gray-300'">
      
      <h2 class="text-3xl font-extrabold text-center mb-6">Вход</h2>
      
      <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
      <br>

      <form @submit.prevent="loginUser">
        <div class="mb-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            :class="isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-300' : 'border-gray-300 bg-gray-50 text-black placeholder-gray-600'"
          />
        </div>
        
        <div class="mb-4">
          <input
            v-model="password"
            type="password"
            placeholder="Пароль"
            required
            class="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            :class="isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-300' : 'border-gray-300 bg-gray-50 text-black placeholder-gray-600'"
          />
        </div>

        <button
          type="submit"
          class="w-full font-bold py-3 rounded-lg transition shadow-lg"
          :class="isDark ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'">
          Войти
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");

// Подключаем тему из App.vue
const isDark = inject("isDark");

onMounted(() => {
  if (localStorage.getItem("token")) {
    router.push("/compare");
  }
});

const loginUser = async () => {
  error.value = "";
  try {
    const response = await axios.post("http://127.0.0.1:8000/login", {
      email: email.value,
      password: password.value,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      router.push("/compare");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  } catch (err) {
    error.value = "Ошибка входа. Проверьте данные.";
  }
};
</script>
