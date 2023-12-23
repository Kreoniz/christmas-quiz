<script>
  import Icon from '$lib/utils/Icon.svelte';
  import MagicalText from '$lib/MagicalText.svelte';

  const name = 'Kreoniz';
</script>

<div class="container">
  <div class="cat">
    <Icon name="cat1" color="var(--text)" />
  </div>

  <h1>Hi, <MagicalText text={name} />, here's something cool I've made for you!</h1>

  <a href="/quiz">Take the Christmas quiz!</a>
</div>

<style>
  .container {
    text-align: center;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  h1 {
    font-size: 2rem;
    line-height: 1.5;
    font-weight: 600;
  }

  .cat {
    margin: auto;
    max-width: 50%;
  }

  a {
    font-weight: 500;
    display: inline-block;
    font-size: 1.4rem;
    text-decoration: none;
    width: fit-content;
    margin: auto;
    border-radius: 1rem;

    padding: 1rem;
    background: var(--text);
    color: var(--background);
  }

  a:hover {
    text-decoration: underline;
  }
</style>
