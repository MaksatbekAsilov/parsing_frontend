<script setup>
import { ref } from "vue";
import axios from "axios";

const form = ref({
  username: "",
  email: "",
  password: "",
});

const successMessage = ref("");
const errorMessage = ref("");

const registerUser = async () => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/register", {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    });

    // Успешная регистрация
    successMessage.value = response.data.message || "Регистрация прошла успешно!";
    errorMessage.value = "";
    // Можно очистить форму после успешной регистрации
    form.value = { username: "", email: "", password: "" };
  } catch (error) {
    // Ошибка регистрации
    successMessage.value = "";
    errorMessage.value = error.response?.data.detail || "Ошибка регистрации. Попробуйте снова.";
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
      <h2 class="text-3xl font-extrabold text-gray-800 text-center">Регистрация</h2>

      <!-- Сообщение об успехе -->
      <p v-if="successMessage" class="text-green-600 text-center mt-4">{{ successMessage }}</p>

      <!-- Сообщение об ошибке -->
      <p v-if="errorMessage" class="text-red-600 text-center mt-4">{{ errorMessage }}</p>

      <form @submit.prevent="registerUser" class="mt-6">
        <!-- Поле Имя пользователя -->
        <div class="mb-4">
          <input 
            v-model="form.username" 
            type="text" 
            placeholder="Имя пользователя" 
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        
        <!-- Поле Email -->
        <div class="mb-4">
          <input 
            v-model="form.email" 
            type="email" 
            placeholder="Email" 
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        <!-- Поле Пароль -->
        <div class="mb-4">
          <input 
            v-model="form.password" 
            type="password" 
            placeholder="Пароль" 
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        <!-- Кнопка -->
        <button 
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition shadow-lg"
        >
          Отправить
        </button>
      </form>
    </div>
  </div>
</template>
