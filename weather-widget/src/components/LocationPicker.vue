<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { onMounted } from 'vue';

const locations = [
  'Amsterdam',
  'Groningen',
  'New York',
  'Salvador',
  'Mumbai',
  'Hong Kong',
];

const props = defineProps<{ modelValue: string | null }>();
const emit = defineEmits(['update:modelValue']);
const selectedLocation = useVModel(props, 'modelValue', emit);

onMounted(() => {
  // we use onMounted instead of defaults because the change is not propagated to the parent otherwise
  if (selectedLocation.value === null) {
    selectedLocation.value = locations[1];
  }
});
</script>

<template>
  <div>
    <select v-model="selectedLocation">
      <option v-for="location in locations" :key="location" :value="location">
        {{ location }}
      </option>
    </select>
  </div>
</template>
