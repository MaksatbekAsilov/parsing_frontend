<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold text-blue-700 mb-4 text-center">Источник информации о курсах</h2>

    <div class="relative w-full overflow-hidden">
      <div
        class="flex transition-transform duration-300 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div v-for="(source, index) in sources" :key="index" class="w-full flex-shrink-0 p-6">
          <div class="bg-blue-100 p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-medium text-blue-600 mb-2">{{ source.name }}</h3>
            <p class="text-blue-500 mb-4">Ссылка для получения актуальной информации о криптовалютах:</p>
            <a :href="source.url" target="_blank" class="text-blue-700 underline hover:text-blue-900">
              Открыть {{ source.name }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Кнопки переключения -->
    <div class="flex justify-between mt-4">
      <button @click="prevSlide" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        ← Назад
      </button>
      <button @click="nextSlide" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Вперед →
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CryptoSourcesSlider",
  data() {
    return {
      sources: [
        { name: "VBR", url: "https://www.vbr.ru/crypto/" },
        { name: "Investing", url: "https://ru.investing.com/crypto" },
        { name: "BitInfo", url: "https://bitinfocharts.com/ru/crypto-kurs/" }
      ],
      currentIndex: 0
    };
  },
  methods: {
    nextSlide() {
      if (this.currentIndex < this.sources.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // Зацикливаем
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.sources.length - 1; // Зацикливаем
      }
    }
  }
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
