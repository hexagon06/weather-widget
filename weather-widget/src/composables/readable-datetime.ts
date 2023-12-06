import moment from 'moment';
import { Ref, computed } from 'vue';

export function useReadableDateTime(isoDateTime: Ref<string>) {
  const date = computed(() => new Date(Date.parse(isoDateTime.value)));
  const isValid = computed(
    () => date.value.toLocaleDateString() !== 'Invalid Date',
  );

  function emptyWenNotValid(fn: () => string) {
    return isValid.value ? fn() : '';
  }

  const readableTime = computed(() => {
    const hours = date.value.getHours();
    return emptyWenNotValid(() => `${hours < 10 ? 0 : ''}${hours}:00`);
  });
  const readableDate = computed(() =>
    emptyWenNotValid(() => {
      const now = new Date(moment.now()).getDate();
      const then = date.value.getDate();
      if (now === then) return 'Today';
      if (now + 1 === then) return 'Tomorrow';
      return date.value.toLocaleDateString();
    }),
  );
  const readableDateTime = computed(() =>
    emptyWenNotValid(() => `${readableDate.value} at ${readableTime.value}`),
  );

  return {
    readableTime,
    readableDate,
    readableDateTime,
  };
}
