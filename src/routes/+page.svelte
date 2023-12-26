<script>
	import Icon from '$lib/utils/Icon.svelte';
	import MagicalText from '$lib/MagicalText.svelte';

	export let data;

	const name = 'Kreoniz';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="container">
	<div class="cat">
		<Icon name={data.cat} color="var(--text)" />
	</div>

	<h1>Hey, <MagicalText text={name} />, here's something cool I've made for you!</h1>

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
		font-size: 1.8rem;
		line-height: 1.5;
		font-weight: 600;
	}

	.cat {
		margin: auto;
		height: 200px;
		aspect-ratio: 1;
	}

	a {
		font-weight: 500;
		display: inline-block;
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
