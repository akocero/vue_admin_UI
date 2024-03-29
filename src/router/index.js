import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/auth/Login.vue';
import ForgotPassword from '@/views/auth/ForgotPassword.vue';
import Auth from '@/components/layouts/Auth.vue';
import Signup from '@/views/auth/Signup.vue';
import ResetPassword from '@/views/auth/ResetPassword.vue';
import Main from '@/components/layouts/Main.vue';
import Dashboard from '@/views/Dashboard.vue';
import { useAuthStore } from '@/stores/auth';

const authRequired = (to, from, next) => {
	const auth = useAuthStore();
	const authorized = auth.user ? next() : next({ name: 'login' });
};

const noAuthRequired = (to, from, next) => {
	const auth = useAuthStore();
	const unauthorized = auth.user ? next({ name: 'dashboard' }) : next();
};

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/auth',
			name: 'auth',
			component: Auth,
			beforeEnter: noAuthRequired,
			children: [
				{
					path: 'login',
					name: 'login',
					component: Login,
				},
				{
					path: 'forgot_password',
					name: 'forgot-password',
					component: ForgotPassword,
				},
				{
					path: 'signup',
					name: 'signup',
					component: Signup,
				},
				{
					path: 'reset_password/:resetToken',
					name: 'reset-password',
					component: ResetPassword,
				},
			],
		},

		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/AboutView.vue'),
		},
		{
			path: '/main',
			name: 'main',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: Main,
			beforeEnter: authRequired,
			children: [
				{
					path: 'dashboard',
					name: 'dashboard',
					component: () => import('../views/Dashboard.vue'),
				},
				{
					path: 'sales/invoices',
					name: 'sales.invoices',
					component: () => import('../views/Invoices.vue'),
				},
				{
					path: 'sales/customers',
					name: 'sales.customers',
					component: () => import('../views/customer/index.vue'),
				},
				{
					path: 'sales/customers/create',
					name: 'sales.customers.create',
					component: () => import('../views/customer/create.vue'),
				},
				{
					path: 'warehouse/inventory',
					name: 'warehouse.inventory',
					component: () => import('../views/Inventory.vue'),
				},
			],
		},
	],
});

export default router;
