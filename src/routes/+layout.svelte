<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { fly } from 'svelte/transition';
  import ThemeToggle from '$lib/themeToggle.svelte';

  export let theme;

  let hamburgerMenu;
  let body;
  let menuOpen = false;

  function toggleMenu() {
    hamburgerMenu.classList.toggle('open');
    menuOpen = !menuOpen;
  }

  function setBgColorVar() {
    theme = writable(getComputedStyle(body).getPropertyValue('--background'));
  }

  onMount(() => {
    body = document.querySelector('body');
    setBgColorVar();
  });
</script>

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

{#if menuOpen}
  <div transition:fly={{ x: 500, duration: 1000, opacity: 0 }} class="menu-content">
    <a on:click={toggleMenu} href="/">Quiz</a>
    <a on:click={toggleMenu} href="/results">Results</a>
    <a on:click={toggleMenu} href="/about">About</a>
  </div>
{/if}

<slot />

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    appearance: none;
    border: none;
    background: none;

    position: relative;
    z-index: 10;

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

  .menu-content {
    position: absolute;

    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    background-color: var(--background);

    transition: var(--background-transition);
  }

  .menu-content a {
    font-size: 2rem;
    color: var(--text);
    line-height: 1.5;
    text-decoration: none;
    margin-bottom: 1rem;
  }

  .menu-content a:hover {
    text-decoration: underline;
  }
</style>
