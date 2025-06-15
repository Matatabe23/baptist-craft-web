<template>
	<v-card-title class="text-h5 mb-4">Регистрация</v-card-title>
	<v-form
		ref="formRef"
		v-model="formValid"
		@submit.prevent="onSubmit"
		class="flex flex-col gap-2"
	>
		<v-text-field
			v-model="form.username"
			label="Имя пользователя"
			:error-messages="serverErrors.username"
			:rules="[rules.required, rules.min(3)]"
		/>
		<v-text-field
			v-model="form.email"
			label="Email"
			type="email"
			:error-messages="serverErrors.email"
			:rules="[rules.required, rules.email]"
		/>
		<v-text-field
			v-model="form.password"
			label="Пароль"
			type="password"
			:error-messages="serverErrors.password"
			:rules="[rules.required, rules.min(6)]"
		/>
		<v-text-field
			v-model="form.confirmPassword"
			label="Повторите пароль"
			type="password"
			:error-messages="serverErrors.confirmPassword"
			:rules="[rules.required, matchPassword]"
		/>

		<v-btn
			type="submit"
			:disabled="!formValid"
			class="mt-4"
			color="primary"
		>
			Зарегистрироваться
		</v-btn>

		<v-btn
			variant="text"
			color="secondary"
			class="mt-2"
			@click="goToLogin"
		>
			Уже есть аккаунт? Войти
		</v-btn>
	</v-form>
</template>

<script lang="ts" setup>
	import { registerUser } from '@/shared';
	import { ref, reactive } from 'vue';
	import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

	const router = useRouter();
	const toast = useToast();

	const form = reactive({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const formValid = ref(false);
	const formRef = ref();

	const serverErrors = reactive({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const rules = {
		required: (v: string) => !!v || 'Поле обязательно',
		email: (v: string) => /.+@.+\..+/.test(v) || 'Некорректный email',
		min: (length: number) => (v: string) =>
			(v?.length ?? 0) >= length || `Минимум ${length} символов`
	};

	const matchPassword = () => form.password === form.confirmPassword || 'Пароли не совпадают';

	function goToLogin() {
		router.push({ query: { form: 'login' } });
	}

	async function onSubmit() {
		clearErrors();

		if (form.password !== form.confirmPassword) {
			serverErrors.confirmPassword = 'Пароли не совпадают';
			return;
		}

		const payload = {
			login: form.username,
			email: form.email,
			password: form.password
		};

		try {
			await registerUser(payload);

			// ⏩ Опционально: переход к авторизации
			router.push({ query: { form: 'login' } });
			toast.success('Письмо с подтверждением отправлено на вашу почту', {
				timeout: 30000
			});
		} catch (e: any) {
			const err = e.response.data
			if (err && typeof err === 'object') {
				for (const key in err) {
					if (Array.isArray(err[key])) {
						serverErrors[key] = err[key][0];
					}
				}
			} else {
				//
			}
		}
	}

	function clearErrors() {
		Object.keys(serverErrors).forEach((key) => {
			// @ts-ignore
			serverErrors[key] = '';
		});
	}

	// 👉 Пример фейкового запроса, замени на реальный axios/fetch
	async function fakeApiRegister(data: any) {
		return new Promise((_, reject) => {
			setTimeout(() => {
				reject({
					errors: {
						email: 'Email уже используется',
						password: 'Пароль слишком простой'
					}
				});
			}, 1000);
		});
	}
</script>

<style scoped>
	.v-card {
		border-radius: 16px;
	}
</style>
