<template>
  <div class="container mx-auto p-6 transition-colors duration-300"
       :class="isDark ? 'bg-gray-900 text-white' : 'bg-blue-50 text-blue-900'">
    
    <h2 class="text-2xl font-bold mb-4 text-center"
        :class="isDark ? 'text-blue-400' : 'text-blue-700'">
      Источник информации о курсах
    </h2>

    <div class="relative w-full overflow-hidden">
      <div class="flex transition-transform duration-300 ease-in-out"
           :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(source, index) in sources" :key="index"
             class="w-full flex-shrink-0 p-6">
          <div class="p-6 rounded-lg shadow-md text-center transition"
               :class="isDark ? 'bg-gray-800 text-white' : 'bg-blue-100 text-blue-900'">
            <h3 class="text-lg font-medium mb-2"
                :class="isDark ? 'text-blue-300' : 'text-blue-600'">
              {{ source.name }}
            </h3>
            <p class="mb-4"
               :class="isDark ? 'text-blue-400' : 'text-blue-700'">
              Ссылка для получения актуальной информации о криптовалютах:
            </p>
            <a :href="source.url" target="_blank"
               class="underline transition"
               :class="isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-700 hover:text-blue-900'">
              Открыть {{ source.name }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Кнопки переключения -->
    <div class="flex justify-between mt-4">
      <button @click="prevSlide"
              class="px-4 py-2 rounded-lg transition"
              :class="isDark ? 'bg-blue-700 text-white hover:bg-blue-600' : 'bg-blue-300 text-blue-900 hover:bg-blue-400'">
        ← Назад
      </button>
      <button @click="nextSlide"
              class="px-4 py-2 rounded-lg transition"
              :class="isDark ? 'bg-blue-700 text-white hover:bg-blue-600' : 'bg-blue-300 text-blue-900 hover:bg-blue-400'">
        Вперед →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";

const isDark = inject("isDark");

const sources = ref([
  { name: "VBR", url: "https://www.vbr.ru/crypto/" },
  { name: "Investing", url: "https://ru.investing.com/crypto" },
  { name: "BitInfo", url: "https://bitinfocharts.com/ru/crypto-kurs/" }
]);

const currentIndex = ref(0);

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % sources.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + sources.value.length) % sources.value.length;
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.relative {
  width: 100%;
  overflow: hidden;
}

.flex {
  display: flex;
}
</style>
