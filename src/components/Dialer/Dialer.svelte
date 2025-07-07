<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let initialNumber = '';
  
  const dispatch = createEventDispatcher();
  
  let currentNumber = initialNumber;
  let callHistory: string[] = [];
  let isAlphanumericMode = false;
  let isShiftMode = false;
  
  
  // Enhanced keypad with alphanumeric support
  const numericKeypad = [
    { number: '1', letters: '' },
    { number: '2', letters: 'ABC' },
    { number: '3', letters: 'DEF' },
    { number: '4', letters: 'GHI' },
    { number: '5', letters: 'JKL' },
    { number: '6', letters: 'MNO' },
    { number: '7', letters: 'PQRS' },
    { number: '8', letters: 'TUV' },
    { number: '9', letters: 'WXYZ' },
    { number: '*', letters: '' },
    { number: '0', letters: '+' },
    { number: '#', letters: '' }
  ];

  // Alphanumeric keypad with 4 rows
  const alphanumericRows = [
    // Row 1 - 6 buttons
    [
      { char: 'Q', alt: '1' }, { char: 'W', alt: '2' }, { char: 'E', alt: '3' },
      { char: 'R', alt: '4' }, { char: 'T', alt: '5' }, { char: 'Y', alt: '6' }
    ],
    // Row 2 - 6 buttons  
    [
      { char: 'U', alt: '7' }, { char: 'I', alt: '8' }, { char: 'O', alt: '9' },
      { char: 'A', alt: '@' }, { char: 'S', alt: '.' }, { char: 'D', alt: '-' }
    ],
    // Row 3 - 6 buttons
    [
      { char: 'F', alt: '_' }, { char: 'G', alt: '+' }, { char: 'H', alt: '=' },
      { char: 'J', alt: ':' }, { char: 'K', alt: ';' }, { char: 'L', alt: '*' }
    ],
    // Row 4 - 8 buttons
    [
      { char: 'Z', alt: '#' }, { char: 'X', alt: ',' }, { char: 'C', alt: '/' },
      { char: 'V', alt: '?' }, { char: 'B', alt: '&' }, { char: 'N', alt: '%' },
      { char: 'M', alt: '!' }, { char: 'P', alt: '0' }
    ]
  ];

  function addDigit(digit: string) {
    currentNumber += digit;
  }

  function deleteDigit() {
    currentNumber = currentNumber.slice(0, -1);
  }

  function clearNumber() {
    currentNumber = '';
  }

  function addCharacter(char: string, alt: string) {
  // Use alt character if shift is active, otherwise use main character
    currentNumber += isShiftMode ? alt : char.toLowerCase();
  }

  function toggleMode() {
    isAlphanumericMode = !isAlphanumericMode;
    isShiftMode = false;
  }

  function toggleShift() {
    isShiftMode = !isShiftMode;
  }

  function formatPhoneNumber(number: string): string {
    // Basic US phone number formatting
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return number;
  }

  function makeCall() {
    if (currentNumber.trim()) {
      callHistory = [currentNumber, ...callHistory.slice(0, 9)]; // Keep last 10 calls
      dispatch('call', { number: currentNumber });
    }
  }

  function callFromHistory(number: string) {
    currentNumber = number;
    makeCall();
  }

  function closeDialer() {
    dispatch('close');
  }
</script>

<div class="card is-translucent-black">
  <div class="card-content">
    <div class="content">
      <!-- Header with mode toggle -->
      <div class="level mb-4">
        <div class="level-left">
          <div class="level-item">
            <h2 class="title is-size-5 has-text-white">
              <span class="icon">
                <i class="mdi mdi-phone"></i>
              </span>
              Dialer
            </h2>
          </div>
        </div>
        <div class="level-right">
          <!-- Add shift button (only show in alphanumeric mode) -->
          {#if isAlphanumericMode}
            <div class="level-item">
              <button 
                class="button is-small {isShiftMode ? 'is-warning' : 'is-dark'}"
                on:click={toggleShift}
                title="Toggle special characters"
              >
                <span class="icon is-small">
                  <i class="mdi mdi-keyboard-variant"></i>
                </span>
                <span>{isShiftMode ? 'ALT' : 'SHIFT'}</span>
              </button>
            </div>
          {/if}
          <div class="level-item">
            <button 
              class="button is-small {isAlphanumericMode ? 'is-info' : 'is-dark'}"
              on:click={toggleMode}
              title="Toggle alphanumeric mode"
            >
              <span class="icon is-small">
                <i class="mdi {isAlphanumericMode ? 'mdi-alphabetical' : 'mdi-numeric'}"></i>
              </span>
              <span>{isAlphanumericMode ? '123' : 'ABC'}</span>
            </button>
          </div>
          <div class="level-item">
            <button 
              class="button is-small is-dark"
              on:click={closeDialer}
              title="Close dialer"
            >
              <span class="icon is-small">
                <i class="mdi mdi-close"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Number Display -->
      <div class="field mb-4">
        <div class="control">
          <input 
            class="input has-text-centered has-background-dark has-text-white"
            type="text"
            bind:value={currentNumber}
            placeholder={isAlphanumericMode ? (isShiftMode ? "Special chars mode..." : "Letter mode...") : "Enter number..."}
            readonly
          />
        </div>
        <p class="help has-text-centered has-text-grey-light">
          {#if isAlphanumericMode}
            {isShiftMode ? 'Special Characters Mode' : 'Letters Mode'}
          {:else}
            {formatPhoneNumber(currentNumber)}
          {/if}
        </p>
      </div>
      
      <!-- Dynamic Keypad -->
      <div class="keypad mb-4">
        {#if isAlphanumericMode}
          <div class="alpha-keypad">
            {#each alphanumericRows as row}
              <div class="keypad-row">
                {#each row as button}
                  <button 
                    class="button is-small keypad-button has-background-grey-darker has-text-white"
                    on:click={() => addCharacter(button.char, button.alt)}
                  >
                    <div class="keypad-content">
                      <div class="keypad-number">
                        {isShiftMode ? button.alt : button.char}
                      </div>
                      <div class="keypad-letters">
                        {isShiftMode ? button.char : button.alt}
                      </div>
                    </div>
                  </button>
                {/each}
              </div>
            {/each}
          </div>
        {:else}
          <!-- Numeric Keypad -->
          <div class="numeric-keypad">
            {#each numericKeypad as button}
              <button 
                class="button is-small keypad-button has-background-grey-darker has-text-white"
                on:click={() => addDigit(button.number)}
              >
                <div class="keypad-content">
                  <div class="keypad-number">{button.number}</div>
                  {#if button.letters}
                    <div class="keypad-letters">{button.letters}</div>
                  {/if}
                </div>
              </button>
            {/each}
          </div>
        {/if}
      </div>
      
      <!-- Action buttons -->
      <div class="field is-grouped is-grouped-multiline is-justify-content-center mb-4">
        <div class="control">
          <button 
            class="button is-warning is-rounded is-small"
            on:click={deleteDigit}
            disabled={!currentNumber}
          >
            <span class="icon is-small">
              <i class="mdi mdi-backspace"></i>
            </span>
          </button>
        </div>
        <div class="control">
          <button 
            class="button is-success is-rounded"
            on:click={makeCall}
            disabled={!currentNumber.trim()}
          >
            <span class="icon">
              <i class="mdi mdi-phone"></i>
            </span>
          </button>
        </div>
        
        <div class="control">
          <button 
            class="button is-danger is-rounded is-small"
            on:click={clearNumber}
            disabled={!currentNumber}
          >
            <span class="icon is-small">
              <i class="mdi mdi-close"></i>
            </span>
          </button>
        </div>
      </div>

      <!-- Call History -->
      {#if callHistory.length > 0}
        <hr class="has-background-grey">
        <h3 class="subtitle is-6 has-text-white mb-3">Recent Calls</h3>
        <div class="call-history">
          {#each callHistory as number}
            <div class="call-history-item">
              <span class="has-text-white is-size-7">{formatPhoneNumber(number)}</span>
              <button 
                class="button is-small is-success is-outlined"
                on:click={() => callFromHistory(number)}
              >
                <span class="icon is-small">
                  <i class="mdi mdi-phone"></i>
                </span>
              </button>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  div.card {
    width: 100%;
    border-radius: var(--border-radius-large);
  }

  .keypad {
    display: grid;
    gap: 0.3rem;
    max-width: 320px;
    margin: 0 auto;
  }

  /* For numeric mode, use the 3-column grid */
  .keypad .numeric-keypad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.3rem;
  }

  .keypad-button {
    aspect-ratio: 1;
    border-radius: 6px !important;
    border: 1px solid #4a4a4a !important;
    min-height: 35px;
    font-size: 0.8rem;
  }

  .keypad-button:hover {
    background-color: #5a5a5a !important;
  }

  .keypad-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .keypad-number {
    font-size: 0.9rem;
    font-weight: bold;  
    line-height: 1;
  }

  .keypad-letters {
    font-size: 0.5rem;
    color: #b5b5b5;
    line-height: 1;
    margin-top: 1px;
  }

  .alpha-keypad {
    max-width: 320px;
    margin: 0 auto;
  }

  .keypad-row {
    display: flex;
    justify-content: center;
    gap: 0.3rem;
    margin-bottom: 0.3rem;
  }

  .keypad-row .keypad-button {
    flex: 1;
    min-width: 0;
    max-width: 32px;
    min-height: 32px;
    font-size: 0.7rem;
    padding: 0.2rem;
  }

  .call-history {
    max-height: 150px;
    overflow-y: auto;
  }

  .call-history-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #4a4a4a;
  }

  .call-history-item:last-child {
    border-bottom: none;
  }
</style>