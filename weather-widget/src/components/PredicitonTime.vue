<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ time: string }>();

const date = computed(() => new Date(Date.parse(props.time)));

const readableTime = computed(() => date.value.toLocaleTimeString());
const readableDate = computed(() => date.value.toLocaleDateString());
</script>

<template>
  <span>{{ readableDate }}: {{ readableTime }}</span>
</template>
