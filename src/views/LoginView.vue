<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <h2 class="text-3xl font-extrabold text-gray-800 text-center mb-6">Вход</h2>
      
      <!-- Сообщение об ошибке -->
      <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
      <br>
      <form @submit.prevent="loginUser">
        <!-- Поле Email -->
        <div class="mb-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        
        <!-- Поле Пароль -->
        <div class="mb-4">
          <input
            v-model="password"
            type="password"
            placeholder="Пароль"
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        <!-- Кнопка Войти -->
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition"
        >
          Войти
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");

// 🔒 Если уже залогинен — сразу на compare
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
      router.push("/compare"); // ✅ После входа переходит на compare
    }
  } catch (err) {
    error.value = "Ошибка входа. Проверьте данные.";
  }
};
</script>

