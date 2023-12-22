<script>
  import Icon from '$lib/Icon.svelte';

  const iconNames = ['cat1', 'cat2', 'cat3', 'cat4'];
</script>

<h1>Welcome to the yet-to-become quiz app!</h1>

<div class="cats">
  {#each iconNames as name}
    <div class="icon">
      <Icon name={name} color="var(--text)" size="200px" />
    </div>
  {/each}
</div>

<style>
  .cats {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 50px;
    gap: 2rem;
  }

  .icon {
    margin: auto;
  }
</style>
