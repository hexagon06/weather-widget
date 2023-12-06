<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{ modelValue: string | null; locations: string[] }>();
const emit = defineEmits(['update:modelValue']);
const selectedLocation = useVModel(props, 'modelValue', emit);

function isSelected(location: string): boolean {
  return selectedLocation.value === location;
}
</script>

<template>
  <div class="grid grid-cols-6 gap-2">
    <div
      v-for="location in locations"
      :key="location"
      :value="location"
      :role="isSelected(location) ? '' : 'button'"
      class="px-2 py-1 bg-opacity-50 transition-colors"
      :class="
        isSelected(location)
          ? ['bg-stone-500', 'text-slate-200', 'rounded-t-sm']
          : ['hover:bg-stone-700', 'hover:text-stone-300']
      "
      @click="selectedLocation = location"
    >
      {{ location }}
    </div>
  </div>
</template>
