<script>
	import { onMount } from 'svelte';

	export let svg;

	let wrapper;
	const SVGWIDTH = 30;

	let width;
	let height;
	const timeToFade = 1000;
	let timeout;

	function spawnSvg() {
		const div = document.createElement('div');
		div.innerHTML = svg;
		const object = div.querySelector('svg');
		object.classList.add('div');

		const xPos = Math.round(Math.random() * (width + 2 * SVGWIDTH)) - SVGWIDTH;
		const yPos = height / 2 + Math.round(Math.random() * height);

		object.style.width = `${SVGWIDTH}px`;
		object.aspectRatio = 1;
		object.style.top = 0;
		object.style.left = `${xPos}px`;
		object.style.position = 'absolute';
		object.style.zIndex = 100;
		object.style.fill = 'var(--text)';

		object.animate(
			{
				transform: ['translateY(-100%)', `translateY(${yPos}px)`]
			},
			{
				fill: 'both',
				duration: (3 / 2) * height * 10
			}
		);

		setTimeout(
			() => {
				object.animate(
					{
						opacity: [1, 0]
					},
					{
						fill: 'both',
						duration: timeToFade
					}
				);

				setTimeout(() => {
					object.remove();
				}, timeToFade);
			},
			height * 10 - timeToFade
		);

		document.querySelector('.wrapper').appendChild(object);
	}

	function animateSvgs() {
		for (let i = 0; i < 7; i += 1) {
			spawnSvg();
		}

		timeout = setTimeout(() => {
			animateSvgs();
		}, 1000);
	}

	onMount(() => {
		width = wrapper.offsetWidth - SVGWIDTH;
		height = wrapper.offsetHeight;

		setTimeout(() => {
			animateSvgs();
		}, 1000);

		return () => {
			clearTimeout(timeout);
		};
	});
</script>

<div bind:this={wrapper} class="wrapper">
	<div class="icon"></div>
</div>

<style>
	.wrapper {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.125;
	}

	.icon {
		width: 30px;
	}
</style>
