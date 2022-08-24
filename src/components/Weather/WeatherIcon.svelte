<script lang="ts">
  import owmLine01d from '@bybas/weather-icons/production/line/openweathermap/01d.svg?url';
  import owmLine01n from '@bybas/weather-icons/production/line/openweathermap/01n.svg?url';
  import owmLine02d from '@bybas/weather-icons/production/line/openweathermap/02d.svg?url';
  import owmLine02n from '@bybas/weather-icons/production/line/openweathermap/02n.svg?url';
  import owmLine03d from '@bybas/weather-icons/production/line/openweathermap/03d.svg?url';
  import owmLine03n from '@bybas/weather-icons/production/line/openweathermap/03n.svg?url';
  import owmLine04d from '@bybas/weather-icons/production/line/openweathermap/04d.svg?url';
  import owmLine04n from '@bybas/weather-icons/production/line/openweathermap/04n.svg?url';
  import owmLine09d from '@bybas/weather-icons/production/line/openweathermap/09d.svg?url';
  import owmLine09n from '@bybas/weather-icons/production/line/openweathermap/09n.svg?url';
  import owmLine10d from '@bybas/weather-icons/production/line/openweathermap/10d.svg?url';
  import owmLine10n from '@bybas/weather-icons/production/line/openweathermap/10n.svg?url';
  import owmLine11d from '@bybas/weather-icons/production/line/openweathermap/11d.svg?url';
  import owmLine11n from '@bybas/weather-icons/production/line/openweathermap/11n.svg?url';
  import owmLine13d from '@bybas/weather-icons/production/line/openweathermap/13d.svg?url';
  import owmLine13n from '@bybas/weather-icons/production/line/openweathermap/13n.svg?url';
  import owmLine50d from '@bybas/weather-icons/production/line/openweathermap/50d.svg?url';
  import owmLine50n from '@bybas/weather-icons/production/line/openweathermap/50n.svg?url';

  export let icon: keyof typeof icons;

  const icons = {
    '01d': owmLine01d,
    '01n': owmLine01n,
    '02d': owmLine02d,
    '02n': owmLine02n,
    '03d': owmLine03d,
    '03n': owmLine03n,
    '04d': owmLine04d,
    '04n': owmLine04n,
    '09d': owmLine09d,
    '09n': owmLine09n,
    '10d': owmLine10d,
    '10n': owmLine10n,
    '11d': owmLine11d,
    '11n': owmLine11n,
    '13d': owmLine13d,
    '13n': owmLine13n,
    '50d': owmLine50d,
    '50n': owmLine50n
  };
</script>

<div class="level-item" class:is-outer-background-image-container={true} class:weather-icon-container={true}>
  <div class:is-inner-background-image-container={true} style:background="url({icons[icon]}) no-repeat" />
</div>

<style>
  .is-outer-background-image-container {
    position: relative;
  }
  .is-inner-background-image-container {
    mix-blend-mode: exclusion;
    position: absolute;
    right: 1.5rem;
    top: -5rem;
    height: 6.25rem;
    width: 6.25rem;
  }
</style>
