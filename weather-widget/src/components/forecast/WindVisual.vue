<script setup lang="ts">
import Arrow from '../../assets/arrow.svg';

const props = defineProps<{ direction: number; speed: number }>();
</script>

<template>
  <div class="w-8 h-8 rotate-0 text-white">
    <img
      :src="Arrow"
      alt="pointing arrow"
      :style="`transform:rotate(${direction - 180}deg)`"
    />
  </div>
</template>
