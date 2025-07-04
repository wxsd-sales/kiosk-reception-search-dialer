<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    export let initialNumber = '';
    
    const dispatch = createEventDispatcher();
    
    let currentNumber = initialNumber;
    let callHistory: string[] = [];

    let isAlphanumericMode = false;
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
  
    const alphanumericKeypad = [
      // Top row - QWERTY
      { char: 'Q', alt: '1' },
      { char: 'W', alt: '2' },
      { char: 'E', alt: '3' },
      { char: 'R', alt: '4' },
      { char: 'T', alt: '5' },
      { char: 'Y', alt: '6' },
      { char: 'U', alt: '7' },
      { char: 'I', alt: '8' },
      { char: 'O', alt: '9' },
      { char: 'P', alt: '0' },
      
      // Middle row - ASDF
      { char: 'A', alt: '@' },
      { char: 'S', alt: '.' },
      { char: 'D', alt: '-' },
      { char: 'F', alt: '_' },
      { char: 'G', alt: '+' },
      { char: 'H', alt: '=' },
      { char: 'J', alt: ':' },
      { char: 'K', alt: ';' },
      { char: 'L', alt: '*' },
      
      // Bottom row - ZXCV
      { char: 'Z', alt: '#' },
      { char: 'X', alt: ',' },
      { char: 'C', alt: '/' },
      { char: 'V', alt: '?' },
      { char: 'B', alt: '&' },
      { char: 'N', alt: '%' },
      { char: 'M', alt: '!' }
    ];
  
    const keypadButtons = [
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
  
    function addDigit(digit: string) {
      currentNumber += digit;
    }
  
    function deleteDigit() {
      currentNumber = currentNumber.slice(0, -1);
    }
  
    function clearNumber() {
      currentNumber = '';
    }

    function addCharacter(char: string) {
      currentNumber += char;
    }
  
    function toggleMode() {
      isAlphanumericMode = !isAlphanumericMode;
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
              placeholder={isAlphanumericMode ? "Enter SIP URI..." : "Enter number..."}
              readonly
            />
          </div>
          <p class="help has-text-centered has-text-grey-light">
            {isAlphanumericMode ? 'SIP URI Mode' : formatPhoneNumber(currentNumber)}
          </p>
        </div>
        
        <!-- Dynamic Keypad -->
        <div class="keypad mb-4 {isAlphanumericMode ? 'alpha-mode' : 'numeric-mode'}">
          {#if isAlphanumericMode}
            <!-- Alphanumeric Keypad -->
            {#each alphanumericKeypad as button}
              <button 
                class="button is-small keypad-button has-background-grey-darker has-text-white"
                on:click={() => addCharacter(button.char.toLowerCase())}
              >
                <div class="keypad-content">
                  <div class="keypad-number">{button.char}</div>
                  <div class="keypad-letters">{button.alt}</div>
                </div>
              </button>
            {/each}
          {:else}
            <!-- Numeric Keypad -->
            {#each numericKeypad as button}
              <button 
                class="button is-small keypad-button has-background-grey-darker has-text-white"
                on:click={() => addCharacter(button.number)}
              >
                <div class="keypad-content">
                  <div class="keypad-number">{button.number}</div>
                  {#if button.letters}
                    <div class="keypad-letters">{button.letters}</div>
                  {/if}
                </div>
              </button>
            {/each}
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
  
    keypad {
      display: grid;
      gap: 0.3rem;
      max-width: 320px;
      margin: 0 auto;
    }

    /* Different grid layouts for different modes */
    .keypad.numeric-mode {
      grid-template-columns: repeat(3, 1fr); /* 3 columns for numeric */
    }

    .keypad.alpha-mode {
      grid-template-columns: repeat(9, 1fr); /* 9 columns for alphanumeric */
    }

    .keypad-button {
      aspect-ratio: 1;
      border-radius: 6px !important;
      border: 1px solid #4a4a4a !important;
      min-height: 35px;
      font-size: 0.8rem;
      /* Remove the problematic nth-child and margin rules */
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