import { Ref, computed } from 'vue';

export function useDayNight(time: Ref<string>) {
  const date = computed(() => new Date(Date.parse(time.value)));
  const sunUp = 6;
  const sunDown = 19;
  const isSunUp = computed(() => {
    const hours = date.value.getHours();
    return hours > sunUp && hours < sunDown;
  });

  return {
    isSunUp,
  };
}
