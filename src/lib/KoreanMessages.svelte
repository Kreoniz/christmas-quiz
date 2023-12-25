<script>
	import { onMount } from 'svelte';
	import { koreanTypewriter } from '$lib/utils/transitions.js';
	import { messages } from '$lib/files/messages.js';

	let i = -1;

	let interval;

	function runAnimation() {
		interval = setInterval(() => {
			i += 1;
			i %= messages.length;
		}, 5000);
	}

	onMount(() => {
		runAnimation();

		return () => {
			clearInterval(interval);
		};
	});
</script>

{#key i}
	<button in:koreanTypewriter type="button">
		{messages[i] || ''}
	</button>
{/key}

<style>
	button {
		appearance: none;
		background-color: inherit;
		color: inherit;
		display: block;
		font-size: 1.5rem;
	}

	button:hover {
		cursor: pointer;
	}
</style>
