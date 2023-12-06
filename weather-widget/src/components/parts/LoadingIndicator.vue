<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useWeatherIcon } from '../../composables/weather-icon';

const codes = [4000, 2100, 6000, 5001, 1100, 1001, 1000, 8000];
const index = ref(0);

const code = computed(() => codes[index.value]);

const { icon } = useWeatherIcon(code);

function nextCode() {
  if (index.value >= codes.length - 1) {
    index.value = 0;
  } else {
    index.value += 1;
  }
}

let interval: NodeJS.Timeout;

onMounted(() => (interval = setInterval(nextCode, 200)));

onBeforeUnmount(() => clearInterval(interval));
</script>

<template>
  <img :src="icon?.day ?? ''" alt="loading data..." />
</template>
