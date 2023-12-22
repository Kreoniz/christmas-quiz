<script>
  import { onMount } from 'svelte';
  import ThemeToggle from './themeToggle.svelte';

  let hamburgerMenu;
  let body;

  function toggleMenu() {
    hamburgerMenu.classList.toggle('open');
  }

  onMount(() => {
    body = document.querySelector('body');
  });
</script>

<nav>
  <ThemeToggle />

  <button bind:this={hamburgerMenu} on:click={toggleMenu} type="button" class="hamburger-menu">
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

  .hamburger-menu {
    position: relative;

    width: 60px;
    height: 45px;
  }

  .hamburger-menu:hover {
    cursor: pointer;
  }

  .hamburger-menu::before,
  .hamburger-menu::after {
    content: "";
  }

  .hamburger-menu span,
  .hamburger-menu::before,
  .hamburger-menu::after {
    position: absolute;
    left: 0;
    width: 100%;
    height: 8px;
    background: var(--text);
    border-radius: 10px;

    transition: 0.4s ease;
  }

  .hamburger-menu span {
    top: 50%;
    transform: translateY(-50%);
  }

  .hamburger-menu::before {
    top: 0;
    transform-origin: 0% 0%;
  }

  .hamburger-menu::after {
    bottom: 0;
    transform-origin: 0% 100%;
  }

  .hamburger-menu:hover::before {
    transform: rotate(45deg);
    top: -1px;
    left: 11px;
  }

  .hamburger-menu:hover span {
    transform: translateY(-50%) scale(0);
  }

  .hamburger-menu:hover::after {
    transform: rotate(-45deg);
    bottom: -2px;
    left: 11px;
  }
</style>
