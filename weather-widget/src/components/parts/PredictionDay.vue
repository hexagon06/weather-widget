<script setup lang="ts">
import { toRef } from 'vue';
import { useReadableDateTime } from '../../composables/readable-datetime';

const props = defineProps<{ time: string }>();
const time = toRef(props, 'time');

const { readableDate } = useReadableDateTime(time);
</script>

<template>
  <span>{{ readableDate }}</span>
</template>
