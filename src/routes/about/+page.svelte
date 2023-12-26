<script>
	import svelteIcon from '$lib/img/svelte-logo-square.svg';
	import MagicalText from '$lib/MagicalText.svelte';
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="container">
	<h1>Long story short...</h1>
	<p class="info">
		This practice project is built with <span class="bold"><MagicalText text="love!" /></span>
	</p>
	<a href="https://kit.svelte.dev/" class="svelte">
		<img class="svelte" src={svelteIcon} alt="svelte logo" />
	</a>
	<p>
		...And with <a class="link" href="https://kit.svelte.dev/">SvelteKit!</a> An awesome framework enabling
		anyone to write complex web applications!
	</p>
</div>

<style>
	.container {
		text-align: center;
		padding: 0 1rem;
	}

	h1 {
		font-size: 1.8rem;
		line-height: 1.5;
		font-weight: 600;
	}

	p {
		margin-block: 8px;
		line-height: 1.2;
	}

	.info {
		font-size: 1.5rem;
	}

	a:hover {
		cursor: pointer;
	}

	a.svelte {
		display: block;
		width: 150px;
		margin: 5px auto;
	}

	a.link {
		color: var(--text);
		text-decoration: underline;
		transition: var(--background-transition);
	}

	.bold {
		font-weight: 600;
	}
</style>
