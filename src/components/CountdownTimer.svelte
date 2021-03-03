<script lang="ts">
  import { onMount } from "svelte";

  export let utcMilliseconds = 0;
  export let utcSeconds = 0;
  export let utcMinutes = 0;
  export let utcHours = 0;
  export let utcDate = 1;
  export let utcMonth = 0;
  $: utcMonthIndex = utcMonth - 1;
  export let utcYear = 2000;

  let currentDate = new Date();
  $: countdownDate = new Date(
    Date.UTC(
      utcYear,
      utcMonthIndex,
      utcDate,
      utcHours,
      utcMinutes,
      utcSeconds,
      utcMilliseconds
    )
  );

  function formatDateInterval(date1: Date, date2: Date) {
    const intervalMilliseconds = date2.getTime() - date1.getTime();
    const displayDays = Math.abs(
      Math.floor(intervalMilliseconds / 1000 / 24 / 60 / 60)
    );
    const displayHours = Math.abs(
      Math.floor(intervalMilliseconds / 1000 / 60 / 60) % 24
    );
    const displayMinutes = Math.abs(
      Math.floor(intervalMilliseconds / 1000 / 60) % 60
    );
    const displaySeconds = Math.abs(
      Math.floor(intervalMilliseconds / 1000) % 60
    );

    return `${displayDays} days, ${displayHours} hours, ${displayMinutes} minutes, ${displaySeconds} seconds`;
  }

  $: displayString = formatDateInterval(currentDate, countdownDate);

  const period = 500;
  let interval: number;

  onMount(() => {
    interval = setInterval(() => {
      currentDate = new Date();
    }, period);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<span>{displayString}</span>
