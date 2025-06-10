<script lang="ts">
  import { page } from '$app/stores';

  import Background from '../components/Background/Background.svelte';
  import Brand from '../components/Brand/Brand.svelte';
  import Weather from '../components/Weather/Weather.svelte';
  import Clock from '../components/Clock/Clock.svelte';
  import PersonCard from '../components/PersonCard/PersonCard.svelte';
  import Dialer from '../components/Dialer/Dialer.svelte';

  const webexApiUrl = 'https://webexapis.com/v1';
  const webexToken = $page.url.searchParams.get('webexToken');
  const deviceId = $page.url.searchParams.get('deviceId');
  const owmApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const owmToken = $page.url.searchParams.get('owmToken');
  const owmCityId = $page.url.searchParams.get('owmCityId') ?? '5506956';
  const people = $page.url.searchParams
    .get('people')
    ?.split(',')
    ?.map((r) => r.split(':'));
  const background = $page.url.searchParams.get('background') ?? 'photo-1568738009519-52d1bad47858.webp';
  const logo = $page.url.searchParams.get('logo') ?? 'font_rend-removebg-preview.png';
  const getWeatherResponse = (cityId: number, units: 'imperial' | 'standard') =>
    fetch(owmApiUrl + '?' + new URLSearchParams({ appid: owmToken, id: owmCityId, units: units }))
      .then((r) => (r.status >= 400 ? Promise.reject(r) : r))
      .then((r) => r.json())
      .then((r) => ({
        units: 'imperial',
        place: `${r.name}, ${r.sys.country}`,
        timezone: r.timezone,
        temp: r.main.temp,
        tempMin: r.main.temp_min,
        tempMax: r.main.temp_max,
        main: r.weather[0].main,
        description: r.weather[0].description,
        icon: r.weather[0].icon
      }));
  const getPersonResponse = (email: string) =>
    fetch(webexApiUrl + `/people?email=${encodeURIComponent(email)}`, {
      headers: { Authorization: 'Bearer ' + webexToken }
    })
      .then((r) => (r.status >= 400 ? Promise.reject(r) : r))
      .then((r) => r.json())
      .then((r) => (r?.items.length != 1 ? Promise.reject(r) : r.items[0]))
      .then((r) => {
        return {
          displayName: r.displayName,
          status: r.status,
          image: r.avatar ?? 'https://api.dicebear.com/7.x/initials/svg?seed=' + r.displayName,
          title: r.title ?? '',
          dial: r.extension ?? email
        };
      });

  let activePersonModel = undefined;
  let isLoading = false;
  let from = undefined;

  let showDialer = false;

  function handleDial(number: string) {
    fetch(webexApiUrl + `/xapi/command/Dial`, {
      method: 'post',
      headers: { 'Authorization': 'Bearer ' + webexToken, 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, arguments: { Number: number, Protocol: 'Sip' } })
    });
  }
  function handleDialerCall(event) {
  const { number } = event.detail;
  handleDial(number); // Reuse your existing dial logic
  }

  function toggleDialer() {
    showDialer = !showDialer;
  }

</script>

<Background imageLink={background} />

<section id="hero" class="hero is-fullheight has-text-white is-dark">
  <!-- hero-head start -->
  <div id="head-widgets" class="hero-head">
    <nav class="navbar is-translucent-black">
      <div class="container is-block">
        <div class="columns m-0">
          <div id="brand" class="column is-7 is-flex is-align-self-center">
            <Brand title={logo} subtitle="Bridge to Possible." />
          </div>
          <div id="weather" class="column is-5 is-align-self-center">
            <Weather {getWeatherResponse} cityId={owmCityId}>
              <Clock
                timeFormatOptions={{
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                }}
              />
            </Weather>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <!-- hero-head end -->
  <!-- hero-body start -->
  <div id="body-widgets" class="hero-body py-2">
    <div class="container">
      <div class="columns is-vcentered is-flex-grow-1">
        <!-- Person Cards Column -->
        <div class="column">
          <div class="columns is-multiline is-centered">
            {#each people as person}
              <div class="column is-6 is-flex is-justify-content-center">
                <PersonCard email={person[0]} {getPersonResponse} onDial={() => handleDial(person?.[1] ?? person[0])} />
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Dialer Column -->
        <div class="column is-narrow">
          {#if showDialer}
            <Dialer on:call={handleDialerCall} />
          {:else}
            <div class="card is-translucent-black">
              <div class="card-content">
                <div class="content has-text-centered">
                  <button 
                    class="button is-success is-large is-rounded"
                    on:click={toggleDialer}
                  >
                    <span class="icon">
                      <i class="mdi mdi-phone-plus"></i>
                    </span>
                    <span>Manual Dial</span>
                  </button>
                </div>
              </div>
            </div>
          {/if}
        </div>
      
      
      </div>
    </div>
    <!-- original container
    <div class="container">
      <div class="columns is-multiline is-centered is-vcentered is-flex-grow-1">
        {#each people as person}
          <div class="column is-4 is-flex is-justify-content-center">
            <PersonCard email={person[0]} {getPersonResponse} onDial={() => handleDial(person?.[1] ?? person[0])} />
          </div>
        {/each}
      </div>
    </div>
    -->
  
  </div>
  <!-- hero-body end -->
  <!-- hero-foot start -->
  <div id="foot-widgets" class="hero-foot" />
</section>

<!--{#if activePersonModel != null}-->
<!--  <div id="messaging-model" transition:fade={{ duration: 150 }}>-->
<!--    <Modal isActive={activePersonModel != null} on:click={() => (activePersonModel = undefined)}>-->
<!--      <figure class="image is-4by5">-->
<!--        <div class="has-ratio">-->
<!--          <PersonCard {...activePersonModel}>-->
<!--            <div class="field has-addons">-->
<!--              <div class="control has-icons-left is-expanded">-->
<!--                <input-->
<!--                  class="input is-rounded is-medium"-->
<!--                  placeholder="Your Name"-->
<!--                  bind:value={from}-->
<!--                  disabled={isLoading}-->
<!--                />-->
<!--                <span class="icon is-large is-left">-->
<!--                  <i class="mdi mdi-24px mdi-account" />-->
<!--                </span>-->
<!--              </div>-->
<!--              <div class="control">-->
<!--                <button-->
<!--                  class="button is-rounded is-medium has-background-white"-->
<!--                  type="button"-->
<!--                  on:click={() => (from = undefined)}-->
<!--                >-->
<!--                  <span class="icon">-->
<!--                    <i class="mdi mdi-24px mdi-backspace" />-->
<!--                  </span>-->
<!--                </button>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="field is-grouped">-->
<!--              <div class="control has-icons-left is-expanded">-->
<!--                <input-->
<!--                  class="input is-rounded is-medium is-static has-text-white"-->
<!--                  placeholder="Your Name"-->
<!--                  disabled={isLoading}-->
<!--                  readonly-->
<!--                  value="Notify {activePersonModel.name} that you have arrived"-->
<!--                />-->
<!--                <span class="icon is-large is-left">-->
<!--                  <i class="mdi mdi-24px mdi-text" />-->
<!--                </span>-->
<!--              </div>-->
<!--              <div class="control">-->
<!--                <button-->
<!--                  class="button is-primary has-background-dark is-inverted is-rounded is-medium"-->
<!--                  type="button"-->
<!--                  disabled={from == null || from.length === 0}-->
<!--                  class:is-loading={isLoading}-->
<!--                  on:click={handleMessageSend}-->
<!--                >-->
<!--                  <span>Send</span>-->
<!--                  <span class="icon">-->
<!--                    <i class="mdi mdi-24px mdi-send" />-->
<!--                  </span>-->
<!--                </button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </PersonCard>-->
<!--        </div>-->
<!--      </figure>-->
<!--    </Modal>-->
<!--  </div>-->

<!--{/if}-->
<style lang="scss">
  @use 'bulma/sass/helpers/typography';
  @use 'bulma/sass/helpers/color';
  @use 'bulma/sass/helpers/visibility';

  .is-translucent-black {
    background-color: hsl(0, 0%, 0%, 0.8) !important;
    box-shadow: none !important;
  }

  #messaging-model :global(.modal-background) {
    backdrop-filter: blur(30px);
  }

  #messaging-model :global(button.message) {
    @extend .is-hidden;
  }

  #messaging-model :global(.title) {
    @extend .has-text-white;
  }
</style>
