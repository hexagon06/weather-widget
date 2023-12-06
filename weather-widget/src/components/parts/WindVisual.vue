<script setup lang="ts">
import Arrow from '../../assets/arrow.svg';

defineProps<{ direction: number; speed: number }>();
</script>

<template>
  <div class="flex justify-center">
    <div class="w-8 h-8">
      <img
        :src="Arrow"
        alt="pointing arrow"
        :style="`transform:rotate(${direction - 180}deg)`"
      />
    </div>
  </div>
</template>
