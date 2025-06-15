<template>
	<v-container class="fill-height d-flex justify-center align-center">
		<v-row
			justify="center"
			align="center"
		>
			<v-col
				cols="12"
				class="text-center"
			>
				<div v-if="isLoading">
					<v-progress-circular
						indeterminate
						color="primary"
						size="64"
						width="6"
					/>
					<div class="mt-4 text-subtitle-1">Подтверждаем почту...</div>
				</div>

				<div v-else>
					<v-icon
						size="96"
						:color="hasError ? 'error' : 'success'"
						class="mb-4"
					>
						{{ hasError ? 'mdi-close-circle' : 'mdi-check-circle' }}
					</v-icon>
					<div class="text-h5 font-weight-medium">
						{{
							hasError
								? 'Ошибка при подтверждении почты'
								: 'Почта успешно подтверждена!'
						}}
					</div>
					<v-btn
						variant="text"
						color="secondary"
						class="mt-2"
						@click="goToLogin"
					>
						На главную
					</v-btn>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts" setup>
	import { ref, onMounted } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { confirmEmailUser } from '@/shared';

	const isLoading = ref(true);
	const hasError = ref(false);
	const router = useRouter();
	const route = useRoute();

	const token = route.query.token as string;

	const confirmEmail = async () => {
		if (!token) return;

		try {
			await confirmEmailUser(token as string);
		} catch (error) {
			hasError.value = true;
		} finally {
			isLoading.value = false;
		}
	};

	function goToLogin() {
		router.push({ query: { form: '/' } });
	}

	onMounted(() => {
		confirmEmail();
	});
</script>
