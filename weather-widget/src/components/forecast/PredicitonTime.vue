<script setup lang="ts">
import { toRef } from 'vue';
import { useReadableDateTime } from './readable-datetime';

const props = defineProps<{ time: string }>();
const time = toRef(props, 'time');

const { readableTime } = useReadableDateTime(time);
</script>

<template>
  <span>{{ readableTime }}</span>
</template>
