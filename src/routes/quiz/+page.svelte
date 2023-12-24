<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { tick } from 'svelte';
	import { questions } from '$lib/files/questions.js';
	import Icon from '$lib/utils/Icon.svelte';

	let current = 0;
	let question = questions[current];
	let duration = 0;
	let show = false;

	let answers = {};
	for (let i = 0; i < questions.length; i++) {
		answers[i] = null;
	}

	let side = 'right';
	let x = -100;

	function goToQuestion(id) {
		cancelAnimation();
		duration = 500;
		if (current === id) {
			return;
		}

		if (current < id) {
			side = 'right';
		} else {
			side = 'left';
		}

		if (id < 0) {
			current = questions.length - 1;
		} else if (id >= questions.length) {
			current = 0;
		} else {
			current = id;
		}

		question = questions[current];
		x = side === 'right' ? 100 : -100;
	}

	onMount(() => {
		const sessionCurrent = Number(sessionStorage.getItem('currentQuizQuestion'));
		current = sessionCurrent;

		const sessionAnswers = JSON.parse(sessionStorage.getItem('quizAnswers'));
		if (sessionAnswers) {
			answers = sessionAnswers;
		}

		return () => {
			sessionStorage.setItem('currentQuizQuestion', current);
			sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
		};
	});

	async function cancelAnimation() {
		show = false;
		await tick();
		show = true;
	}

	$: question = questions[current];
</script>

<svelte:head>
	<title>Quiz</title>
</svelte:head>

<div class="container">
	<div class="quiz-navigation">
		<button class="arrow-btn" on:click={() => goToQuestion(current - 1)}>
			<Icon name="arrow-left" />
		</button>

		<div class="indices">
			{#each questions as question, index}
				<button
					data-id={index}
					on:click={() => goToQuestion(index)}
					class:active={current === index}
					type="button"
					class="index-btn"
				>
					{index + 1}
				</button>
			{/each}
		</div>

		<button class="arrow-btn" on:click={() => goToQuestion(current + 1)}>
			<Icon name="arrow-right" />
		</button>
	</div>

	{#key current}
		<div
			in:fly={{ x: x, duration: duration, delay: duration }}
			out:fly={{ x: -x, duration: duration }}
			class="block"
		>
			<h2 class="question">{question.question}</h2>
			<div class="options">
				{#each question.answers as answer, id}
					<div class="option">
						<label for={id}>
							<input type="radio" name={current} {id} value={id} bind:group={answers[current]} />
							{answer}
						</label>
					</div>
				{/each}
			</div>

			{#if current === questions.length - 1}
				<button class="submit" type="button">Submit answers</button>
			{/if}
		</div>
	{/key}
</div>

<style>
	.container {
		height: 100%;
		padding: 0 1rem;
	}

	.block {
		position: relative;
	}

	.question {
		font-size: 2rem;
		margin-bottom: 5px;
	}

	.option {
		font-size: 1.2rem;
		margin-block: 1rem;
	}

	.quiz-navigation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	button {
		appearance: none;
		background: none;
	}

	.arrow-btn {
		height: 3rem;
		aspect-ratio: 1;
	}

	.index-btn {
		font-size: 1.5rem;
		padding: 0.5rem;
		color: var(--text);
	}

	.index-btn.active {
		font-weight: 600;
		text-decoration: underline;
	}

	button:hover {
		cursor: pointer;
	}

	.submit {
		display: block;
		margin: 2rem auto;
		color: var(--background);
		background-color: var(--text);

		font-weight: 500;
		font-size: 1.2rem;
		border-radius: 0.5rem;
		padding: 0.8rem 1rem;

		transition: var(--background-transition);
	}
</style>
