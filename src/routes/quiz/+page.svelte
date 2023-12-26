<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { questions } from '$lib/files/questions.js';
	import Icon from '$lib/utils/Icon.svelte';
	import ChristmasHat from '$lib/img/christmas-hat.webp';

	let current = 0;
	let question = questions[current];
	let duration = 0;
	let submitted = false;
	let completed = false;

	let answers = {};
	for (let i = 0; i < questions.length; i++) {
		answers[i] = null;
	}

	let side = 'right';
	let x = -100;

	function goToQuestion(id) {
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

	function submitAnswers() {
		submitted = true;
		if (submitReady) {
			const grading = { adventurous: 0, optimistic: 0 };
			for (let i = 0; i < questions.length; i++) {
				const points = questions[i].points[answers[i]];
				grading.adventurous += points[0];
				grading.optimistic += points[1];
			}

			let type;
			if (grading.adventurous > 0 && grading.optimistic > 0) type = 1;
			else if (grading.adventurous > 0 && grading.optimistic < 0) type = 2;
			else if (grading.adventurous < 0 && grading.optimistic > 0) type = 3;
			else if (grading.adventurous < 0 && grading.optimistic < 0) type = 4;

			localStorage.setItem('results', type);
			completed = true;
			sessionStorage.removeItem('currentQuizQuestion');
			sessionStorage.removeItem('quizAnswers');
		}
	}

	onMount(() => {
		const sessionCurrent = Number(sessionStorage.getItem('currentQuizQuestion'));
		current = sessionCurrent;

		const sessionAnswers = JSON.parse(sessionStorage.getItem('quizAnswers'));
		if (sessionAnswers) {
			answers = sessionAnswers;
		}

		return () => {
			if (!completed) {
				sessionStorage.setItem('currentQuizQuestion', current);
				sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
			}
		};
	});

	$: question = questions[current];
	$: submitReady = Object.entries(answers).filter((e) => e[1] === null).length === 0;
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
			{#each questions as question (question.id)}
				<button
					data-id={question.id}
					on:click={() => goToQuestion(question.id)}
					class:active={current === question.id}
					class:wrong={submitted & (answers[question.id] === null)}
					type="button"
					class="index-btn"
				>
					{question.id + 1}
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
			<h2 class="question">
				{question.question}
			</h2>
			<div class="options">
				{#each question.answers as answer, id}
					<div class="option">
						<label for={id}>
							<input type="radio" name={current} {id} value={id} bind:group={answers[current]} />
							<span>{answer}</span>
						</label>
					</div>
				{/each}
			</div>

			{#if current === questions.length - 1}
				<a
					on:click={(e) => {
						if (!submitReady) e.preventDefault();
					}}
					href="/results"
				>
					<button on:click={submitAnswers} class="submit" type="button">
						<img class="button-hat" src={ChristmasHat} alt="christmas hat" />
						Submit answers
					</button>
				</a>
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
		font-size: 1.8rem;
		margin-bottom: 5px;
		line-height: 1.2;
	}

	.option {
		font-size: 1.2rem;
		line-height: 1.2;
		margin-block: 1rem;
	}

	.option label {
		display: flex;
		align-items: flex-start;
	}

	.quiz-navigation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.indices {
		padding: 0 5px;
		display: flex;
		width: 100%;
		justify-content: space-around;
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
		padding: auto;
		color: inherit;
		transition: var(--background-transition);
	}

	.wrong {
		color: var(--error);
	}

	.index-btn.active {
		font-weight: 600;
		text-decoration: underline;
	}

	button:hover {
		cursor: pointer;
	}

	.submit {
		position: relative;
		display: block;
		margin: 3rem auto 0;
		color: var(--background);
		background-color: var(--text);

		font-weight: 500;
		font-size: 1.2rem;
		border-radius: 0.5rem;
		padding: 0.8rem 1rem;

		transition: var(--background-transition);
	}

	.submit:hover {
		text-decoration: underline;
	}

	.button-hat {
		position: absolute;
		top: -15px;
		left: -17px;
		height: 50px;
	}

	label {
		padding: 5px 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	label:hover {
		cursor: pointer;
	}

	input[type='radio'] {
		appearance: none;

		--size: 1.4rem;

		height: var(--size);
		width: var(--size);
		aspect-ratio: 1;
		border-radius: 50%;

		border: calc(var(--size) / 10) solid var(--text);
		transition: var(--background-transition);
	}

	input[type='radio']:checked {
		background-color: var(--text);
	}

	a {
		text-decoration: none;
	}
</style>
