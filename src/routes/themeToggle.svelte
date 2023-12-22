<script>
  import { onMount } from 'svelte';
  
  let theme;
  let button;
  
  onMount(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    } else {
      theme = 'light';
    }

    document.body.classList.add(theme);
  });

  function toggleTheme() {
    document.body.classList.remove(theme);
    button.classList.remove(theme);
    theme = theme === 'dark' ? 'light' : 'dark';
    document.body.classList.add(theme);
    button.classList.add(theme);
  }
</script>

<button bind:this={button} type="button" on:click={toggleTheme}>Toggle Theme</button>
