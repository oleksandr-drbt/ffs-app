export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/Login.vue'),
    meta: {
      auth: false,
      layout: 'auth',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/Register.vue'),
    meta: {
      auth: false,
      layout: 'auth',
    },
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('../views/UserProfile.vue'),
    meta: {
      auth: true,
      layout: 'app',
    },
  },
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      auth: true,
      layout: 'app',
    },
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('../views/Portfolio.vue'),
    meta: {
      auth: true,
      layout: 'app',
    },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/Projects.vue'),
    meta: {
      auth: true,
      layout: 'app',
    },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue'),
    meta: {
      auth: true,
      layout: 'app',
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue'),
    meta: {
      auth: true,
      layout: 'app',
    },
  },
  {
    path: '*',
    component: () => import('../views/errors/NotFound.vue'),
    meta: {
      layout: 'default',
    },
  },
];
