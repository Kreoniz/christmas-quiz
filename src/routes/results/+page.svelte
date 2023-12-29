<script>
	import { onMount } from 'svelte';
	import KoreanMessages from '$lib/KoreanMessages.svelte';
	import MagicalText from '$lib/MagicalText.svelte';
	import ChristmasHat from '$lib/img/christmas-hat.webp';
	import ChristmasCat1 from '$lib/img/christmas-cat1.jpg';
	import ChristmasCat2 from '$lib/img/christmas-cat2.jpg';
	import ChristmasCat3 from '$lib/img/christmas-cat3.jpg';
	import ChristmasCat4 from '$lib/img/christmas-cat4.jpg';
	import SvgWaterfall from '$lib/SvgWaterfall.svelte';
	import SnowflakeSvg from '$lib/img/snowflake.svg?raw';

	let passed = false;
	let results;

	onMount(() => {
		results = localStorage.getItem('results');
		if (results) {
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
		{#if results === '1'}
			<p class="results">You are a curious type</p>
			<img class="cat-img" src={ChristmasCat1} alt="cat" />
			<p class="results-info">
				You learn about the world by exploring and by breaking all the software you've written
			</p>
		{/if}
		{#if results === '2'}
			<p class="results">You are a panicking type</p>
			<img class="cat-img" src={ChristmasCat2} alt="cat" />
			<p class="results-info">
				You explore a lot, but you generally don't know what to do when something unexpected happens
				(or when you get overwhelped by bugs)
			</p>
		{/if}
		{#if results === '3'}
			<p class="results">You are a conservative type</p>
			<img class="cat-img" src={ChristmasCat3} alt="cat" />
			<p class="results-info">
				You enjoy sticking to what's generally accepted, be it food, beliefs, or widely-adopted web
				technologies
			</p>
		{/if}
		{#if results === '4'}
			<p class="results">You are an indifferent type</p>
			<img class="cat-img" src={ChristmasCat4} alt="cat" />
			<p class="results-info">
				More often than not you don't care about the things happening all around you and would
				rather dust off your C system programming skills
			</p>
		{/if}
		<p class="congratulations"><MagicalText text="Happy New Year!" /></p>
		<SvgWaterfall svg={SnowflakeSvg} />
	{:else}
		<p class="info">Come back when you take the quiz!</p>
		<a class="quiz-link" href="/quiz">
			<img class="link-hat" src={ChristmasHat} alt="christmas hat" />
			Take the Christmas quiz!
		</a>
	{/if}

	<div class="korean-messages">
		<KoreanMessages />
	</div>
</div>

<style>
	.container {
		height: 100%;
		padding: 0 1rem;
		text-align: center;
	}

	h1 {
		font-size: 1.8rem;
		font-weight: 600;
		line-height: 1.5;
	}

	p {
		line-height: 1.2;
	}

	.info {
		text-align: center;
		font-size: 1.4rem;
		margin-block: 1rem;
	}

	.quiz-link {
		position: relative;
		font-weight: 500;
		display: block;
		font-size: 1.4rem;
		text-decoration: none;
		width: fit-content;
		margin: 1.5rem auto;
		border-radius: 0.5rem;

		padding: 1rem;
		background: var(--text);
		color: var(--background);
	}

	a:hover {
		text-decoration: underline;
	}

	.korean-messages {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 2rem;
		margin: 0.5rem 1rem;
		padding: 0.5rem;
	}

	.link-hat {
		position: absolute;
		transform: scaleX(-1);
		top: -15px;
		right: -18px;
		height: 50px;
	}

	.cat-img {
		border-radius: 2rem;
		width: 250px;
		height: 200px;
		object-fit: cover;
		margin: 1rem;
	}

	.congratulations {
		margin-top: 0.5rem;
		font-size: 1.6rem;
	}
</style>
