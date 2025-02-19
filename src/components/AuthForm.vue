<template>
  <div class="min-h-screen flex items-center justify-center p-6 transition-colors duration-300"
       :class="isDark ? 'bg-gradient-to-r from-gray-900 to-black' : 'bg-gradient-to-r from-blue-500 to-purple-600'">
    
    <div class="w-full max-w-md p-8 rounded-2xl shadow-2xl transition-colors duration-300"
         :class="isDark ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-800 border border-gray-300'">
      
      <h2 class="text-3xl font-extrabold text-center">Регистрация</h2>

      <p v-if="successMessage" class="text-green-500 text-center mt-4">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>

      <form @submit.prevent="registerUser" class="mt-6">
        <div class="mb-4">
          <input 
            v-model="form.username" 
            type="text" 
            placeholder="Имя пользователя" 
            required
            class="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            :class="isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-300' : 'border-gray-300 bg-gray-50 text-black placeholder-gray-600'"/>
        </div>
        
        <div class="mb-4">
          <input 
            v-model="form.email" 
            type="email" 
            placeholder="Email" 
            required
            class="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            :class="isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-300' : 'border-gray-300 bg-gray-50 text-black placeholder-gray-600'"/>
        </div>

        <div class="mb-4">
          <input 
            v-model="form.password" 
            type="password" 
            placeholder="Пароль" 
            required
            class="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            :class="isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-300' : 'border-gray-300 bg-gray-50 text-black placeholder-gray-600'"/>
        </div>

        <button type="submit"
                class="w-full font-bold py-3 rounded-lg transition shadow-lg"
                :class="isDark ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'">
          Отправить
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import axios from "axios";

const form = ref({
  username: "",
  email: "",
  password: "",
});

const successMessage = ref("");
const errorMessage = ref("");

// Получаем тему из App.vue
const isDark = inject("isDark");

const registerUser = async () => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/register", {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    });

    successMessage.value = response.data.message || "Регистрация прошла успешно!";
    errorMessage.value = "";
    form.value = { username: "", email: "", password: "" };
  } catch (error) {
    successMessage.value = "";
    errorMessage.value = error.response?.data.detail || "Ошибка регистрации. Попробуйте снова.";
  }
};
</script>
