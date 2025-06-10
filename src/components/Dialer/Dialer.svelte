<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    export let initialNumber = '';
    
    const dispatch = createEventDispatcher();
    
    let currentNumber = initialNumber;
    let callHistory: string[] = [];
  
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
       <!-- Header with close button -->
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
              type="tel"
              bind:value={currentNumber}
              placeholder="Enter number..."
              readonly
            />
          </div>
          <p class="help has-text-centered has-text-grey-light">
            {formatPhoneNumber(currentNumber)}
          </p>
        </div>
  
        <!-- Keypad -->
        <div class="keypad mb-4">
          {#each keypadButtons as button}
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
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
      max-width: 240px;
      margin: 0 auto;
    }
  
    .keypad-button {
      aspect-ratio: 1;
      border-radius: 50% !important;
      border: 1px solid #4a4a4a !important;
      min-height: 50px;
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
      font-size: 1.2rem;
      font-weight: bold;
      line-height: 1;
    }
  
    .keypad-letters {
      font-size: 0.6rem;
      color: #b5b5b5;
      line-height: 1;
      margin-top: 2px;
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