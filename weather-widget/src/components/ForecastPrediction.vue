<script setup lang="ts">
import { Values } from '../weather-api/tomorrowio-forecast';
import PredicitonTime from './PredicitonTime.vue';

defineProps<{ prediction: Values; time: string }>();
</script>

<template>
  <div>
    <h3><PredicitonTime :time="time" /></h3>
    <template v-for="key in Object.keys(prediction)">
      <div v-if="prediction[key as keyof Values] !== 0" :key="key">
        <b>{{ key }}:</b> {{ prediction[key as keyof Values] }}
      </div>
    </template>
  </div>
</template>
