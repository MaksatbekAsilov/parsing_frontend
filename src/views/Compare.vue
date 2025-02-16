<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Выберите функцию</h2>

    <!-- Список выбора функции -->
    <div class="mb-4">
      <select v-model="selectedFunction" class="mt-2 p-2 border rounded-lg w-full">
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import PriceTable from "@/components/PriceTable.vue";
import PriceFilter from "@/components/PriceFilter.vue";
import PriceSite from "@/components/PriceSite.vue";
import PriceConvert from "@/components/PriceConvert.vue";
import LinkSites from "@/components/LinkSites.vue";

const router = useRouter();
const selectedFunction = ref("table");

// Проверяем авторизацию при загрузке
onMounted(() => {
  const isAuthenticated = !!localStorage.getItem("token");
  if (!isAuthenticated) {
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
