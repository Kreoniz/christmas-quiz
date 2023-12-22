<script>
  import { onMount } from 'svelte';
  let theme = 'light';
  let body;

  onMount(() => {
    body = document.querySelector('body');
  });

  function toggleTheme() {
    body.classList.remove(theme);
    theme = theme === 'dark' ? 'light' : 'dark';
    body.classList.add(theme);
  }
</script>

<button on:click={toggleTheme}>Toggle Theme</button>
