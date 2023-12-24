<script>
  import { fly } from 'svelte/transition';
  import { questions } from '$lib/files/questions.js';
  console.log(questions);

  let current = 0;

  let x = -100;

  function goToQuestion(id) {
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

    x = side === 'right' ? 100 : -100;
  }

  let side = 'right';
  $: question = questions[current];

  $: console.log(question, x, side);

</script>

{#key question}
  <div in:fly={{ x: x, duration: 500, delay: 500 }} out:fly={{ x: -x, duration: 500 }} class="block">
    <h2 class="question">{question.question}</h2>
    <ul>
      {#each question.answers as answer}
        <li>{answer}</li>
      {/each}
    </ul>

    <div class="buttons">
      <button on:click={() => goToQuestion(current - 1)}>Previous</button>
      <button on:click={() => goToQuestion(current + 1)}>Next</button>
    </div>
  </div>
{/key}

<style>
  .block {
    position: relative;
  }

  .question {
    font-size: 2rem;
    margin-bottom: 5px;
  }

  li {
    list-style: none;
    font-size: 1.2rem;
  }

  li::before {
    content: '* ';
  }

  .buttons {
    display: flex;
    gap: 1rem;
    padding: 5rem 0;
    margin: auto;
  }

  button {
    padding: 1rem;
  }

  button:hover {
    cursor: pointer;
  }
</style>
