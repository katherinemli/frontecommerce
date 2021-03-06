const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/cart', component: () => import('pages/Cart.vue') },
      {
        path: '/payment', component: () => import('pages/Payment.vue'), name: 'payment', props: true,
      },

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
