<template>
	<div class="h-screen w-full flex justify-center items-center">
		<v-card class="w-[300px] md:w-[400px] pa-6">
			<component :is="currentFormComponent" />
		</v-card>
	</div>
</template>

<script lang="ts" setup>
	import { useRoute } from 'vue-router';
	import { computed } from 'vue';

	import { ConfirmEmail, Login, Registration } from '@/entities';

	const route = useRoute();

	const currentFormComponent = computed(() => {
		const form = route.query.form;
		if (form === 'register') return Registration;
		if (form === 'confirm-email') return ConfirmEmail;
		return Login;
	});
</script>
