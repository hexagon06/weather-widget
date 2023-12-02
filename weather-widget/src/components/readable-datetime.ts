import { Ref, computed } from 'vue';

export function useReadableDateTime(isoDateTime: Ref<string>) {
  const date = computed(() => new Date(Date.parse(isoDateTime.value)));
  const isValid = computed(
    () => date.value.toLocaleDateString() !== 'Invalid Date',
  );

  function emptyWenNotValid(fn: () => string) {
    return isValid.value ? fn() : '';
  }

  const readableTime = computed(() =>
    emptyWenNotValid(() => date.value.toLocaleTimeString()),
  );
  const readableDate = computed(() =>
    emptyWenNotValid(() => date.value.toLocaleDateString()),
  );
  const readableDateTime = computed(() =>
    emptyWenNotValid(() => `${readableDate.value} ${readableTime.value}`),
  );

  return {
    readableTime,
    readableDate,
    readableDateTime,
  };
}
