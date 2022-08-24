<script lang="ts">
  import Avatar from '../Avatar/Avatar.svelte';

  export let name;
  export let image;
  export let status = 'active';
  export let title = 'Technical Solutions Specialist';
  export let onMessage = (...args) => undefined;
</script>

<div class="card is-translucent-black">
  <div class="card-content">
    <div class="media is-justify-content-center">
      <Avatar size="250" {status} {image} />
    </div>

    <div class="content">
      <hr />
      <div class="columns is-vcentered is-mobile is-multiline">
        <div class="column">
          <h1 class="title is-size-5">{name}</h1>
          <h2 class="subtitle is-size-6 has-text-grey">{title}</h2>
        </div>
        <div class="column is-narrow">
          <div class="field is-grouped">
            <p class="control">
              <button
                class="button is-fullwidth is-rounded is-primary has-background-dark is-inverted message"
                type="button"
                on:click={onMessage}
              >
                <span class="icon">
                  <i class="mdi mdi-24px mdi-message" />
                </span>
              </button>
            </p>
            <p class="control">
              <button class="button is-fullwidth is-rounded is-success has-background-dark is-inverted phone">
                <span class="icon">
                  <i class="mdi mdi-24px mdi-phone" />
                </span>
              </button>
            </p>
          </div>
        </div>
        {#if $$slots.default}
          <div class="column is-12">
            <slot />
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  div.card {
    width: 100%;
    border-radius: var(--border-radius-large);
  }
</style>
