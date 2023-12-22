<script>
  import { onMount } from 'svelte';
  let theme = 'light';
  let body;

  onMount(() => {
    body = document.querySelector('body');
    body.classList.add(theme);
  });

  function toggleTheme() {
    body.classList.remove(theme);
    theme = theme === 'dark' ? 'light' : 'dark';
    body.classList.add(theme);
  }
</script>

<button type="button" on:click={toggleTheme}>Toggle Theme</button>
