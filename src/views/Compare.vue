<template>
  <div class="min-h-screen p-6 transition-colors duration-300"
       :class="isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'">
    
    <div class="container mx-auto">
      <h2 class="text-2xl font-bold mb-4">Выберите функцию</h2>

      <!-- Список выбора функции -->
      <div class="mb-4">
        <select v-model="selectedFunction"
                class="mt-2 p-2 border rounded-lg w-full transition"
                :class="isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-black'">
          <option value="table">Таблица цен</option>
          <option value="filter">Фильтр цен</option>
          <option value="site">Источник</option>
          <option value="convert">Конвертация валют</option>
          <option value="linksites">Ссылки на сайты</option>
        </select>
      </div>

      <!-- Отображение выбранной функции -->
      <PriceTable v-if="selectedFunction === 'table'" />
      <PriceFilter v-if="selectedFunction === 'filter'" />
      <PriceSite v-if="selectedFunction === 'site'" />
      <PriceConvert v-if="selectedFunction === 'convert'" />
      <LinkSites v-if="selectedFunction === 'linksites'" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import PriceTable from "@/components/PriceTable.vue";
import PriceFilter from "@/components/PriceFilter.vue";
import PriceSite from "@/components/PriceSite.vue";
import PriceConvert from "@/components/PriceConvert.vue";
import LinkSites from "@/components/LinkSites.vue";

const router = useRouter();
const selectedFunction = ref("table");

// Получаем тему из App.vue
const isDark = inject("isDark");

// Проверяем авторизацию при загрузке
onMounted(() => {
  if (!localStorage.getItem("token")) {
    router.push("/login"); // Если не вошел, отправляем на вход
  }
});
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
}
</style>
