<script>
	import { onMount } from 'svelte';

	let passed = false;

	onMount(() => {
		if (localStorage.getItem('results')) {
			passed = true;
		}
	});
</script>

<svelte:head>
	<title>Results</title>
</svelte:head>

<div class="container">
	<h1>Results</h1>

	{#if passed}
		<p>Your results:</p>
		...
	{:else}
		<p class="info">Come back when you take the quiz!</p>
		<a href="/quiz">Take the Christmas quiz!</a>
	{/if}
</div>

<style>
	.container {
		padding: 0 1rem;
	}

	h1 {
		font-size: 1.8rem;
		font-weight: 600;
		line-height: 1.5;
	}

	.info {
		text-align: center;
		font-size: 1.4rem;
		line-height: 1.2;
		margin-block: 1rem;
	}

	a {
		font-weight: 500;
		display: block;
		font-size: 1.4rem;
		text-decoration: none;
		width: fit-content;
		margin: auto;
		border-radius: 0.5rem;

		padding: 1rem;
		background: var(--text);
		color: var(--background);
	}

	a:hover {
		text-decoration: underline;
	}
</style>
