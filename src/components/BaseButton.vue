<template>
	<router-link
		:to="routeObject"
		class="inline-block rounded-sm py-2 px-3"
		:class="[
			{
				'bg-primary-600 text-primary-50 ': color === 'primary',
				'border bg-yellow-500 text-yellow-50 ': color === 'yellow',
				'bg-red-600 text-red-50 ': color === 'red',
			},
			_class,
		]"
		>{{ text }}</router-link
	>
</template>

<script setup>
const props = defineProps({
	text: String,
	_type: {
		type: String,
		default: 'link',
	},
	_class: {
		type: String,
		default: '',
	},
	color: {
		type: String,
		default: 'primary',
	},
	routeObject: {
		type: Object,
		default: {},
	},
});
</script>

<style></style>
