<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import ThemeToggle from './themeToggle.svelte';

  export let theme;


  let hamburgerMenu;
  let body;

  function toggleMenu() {
    hamburgerMenu.classList.toggle('open');
  }

  function setBgColorVar() {
    theme = writable(getComputedStyle(body).getPropertyValue('--background'));
    console.log(theme);
  }

  onMount(() => {
    body = document.querySelector('body');
    setBgColorVar();
    console.log(theme);
  });
</script>

<svelte:head>
</svelte:head>

<nav>
  <ThemeToggle />

  <button
    bind:this={hamburgerMenu}
    on:click={toggleMenu}
    type="button"
    >
    <span></span>
  </button>

</nav>

<slot />

<style>
  nav {
    display: flex;
    justify-content: space-between;
  }

  button {
    appearance: none;
    border: none;
    background: none;
  }

  button {
    position: relative;

    width: 60px;
    height: 45px;
  }

  button:hover {
    cursor: pointer;
  }

  button::before,
  button::after {
    content: "";
  }

  button span,
  button::before,
  button::after {
    position: absolute;
    left: 0;
    width: 100%;
    height: 8px;
    background: var(--text);
    border-radius: 10px;

    transition: 0.4s ease;
  }

  button span {
    top: 50%;
    transform: translateY(-50%);
  }

  button::before {
    top: 0;
    transform-origin: 0% 0%;
  }

  button::after {
    bottom: 0;
    transform-origin: 0% 100%;
  }

  :global(button.open::before) {
    transform: rotate(45deg);
    top: -1px!important;
    left: 11px!important;
  }

  :global(button.open span) {
    transform: translateY(-50%) scale(0)!important;
  }

  :global(button.open::after) {
    transform: rotate(-45deg);
    bottom: -2px!important;
    left: 11px!important;
  }
</style>
