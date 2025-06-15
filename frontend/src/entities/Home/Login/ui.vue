<template>
	<v-card-title class="text-h5 mb-4">Вход</v-card-title>
	<v-form
		ref="formRef"
		v-model="formValid"
		@submit.prevent="onSubmit"
		class="flex flex-col gap-2"
	>
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
			:rules="[rules.required]"
		/>

		<v-btn
			type="submit"
			:disabled="!formValid"
			class="mt-4"
			color="primary"
		>
			Войти
		</v-btn>

		<v-btn
			variant="text"
			color="secondary"
			class="mt-2"
			@click="goToRegister"
		>
			Нет аккаунта? Зарегистрироваться
		</v-btn>
	</v-form>
</template>

<script lang="ts" setup>
	import { ref, reactive } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const form = reactive({
		email: '',
		password: ''
	});

	const formValid = ref(false);
	const formRef = ref();

	const serverErrors = reactive({
		email: '',
		password: ''
	});

	const rules = {
		required: (v: string) => !!v || 'Поле обязательно',
        email: (v: string) => /.+@.+\..+/.test(v) || 'Некорректный email',
	};

	async function onSubmit() {
		clearErrors();

		const payload = {
			email: form.email,
			password: form.password
		};

		try {
			// ⚠️ Здесь должен быть твой реальный HTTP-клиент
			const response = await fakeApiLogin(payload);
			console.log('Успех', response);
		} catch (err: any) {
			if (err?.errors) {
				Object.assign(serverErrors, err.errors);
			} else {
				console.error('Неизвестная ошибка', err);
			}
		}
	}

	function clearErrors() {
		Object.keys(serverErrors).forEach((key) => {
			// @ts-ignore
			serverErrors[key] = '';
		});
	}

	function goToRegister() {
		router.push({ query: { form: 'register' } });
	}

	// 👉 Пример фейкового запроса, замени на реальный axios/fetch
	async function fakeApiLogin(data: any) {
		return new Promise((_, reject) => {
			setTimeout(() => {
				reject({
					errors: {
						email: 'Email не найден',
						password: 'Неверный пароль'
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
