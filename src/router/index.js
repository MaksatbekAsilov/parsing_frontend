// import { createRouter, createWebHistory } from 'vue-router';
// import RegisterView from '@/views/RegisterView.vue';
// import LoginView from '@/views/LoginView.vue';

// const routes = [
//   { path: '/register', component: RegisterView },
//   { path: '/login', component: LoginView },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;
import { createRouter, createWebHistory } from "vue-router";
import Compare from "@/views/Compare.vue";
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';

const routes = [
  { path: "/", component: RegisterView }, // ✅ Теперь стартовая — Регистрация
  { path: "/compare", component: Compare },
  { path: "/register", component: RegisterView },
  { path: "/login", component: LoginView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔒 Защита маршрутов
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if ((to.path === "/register" || to.path === "/login") && isAuthenticated) {
    next("/compare"); // ✅ Если вошел, не пускать обратно в регистрацию и логин
  } else if (to.path === "/compare" && !isAuthenticated) {
    next("/login"); // ⛔ Без входа нельзя на Главную
  } else {
    next();
  }
});

export default router;
