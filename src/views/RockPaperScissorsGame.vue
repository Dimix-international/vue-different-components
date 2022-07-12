<template>
  <div
      style="width: 100%"
      class="text-center min-h-screen flex flex-col"
  >
    <header class="container mx-auto p-6">
      <h1 class="text-4xl font-bold">Rock, Paper, Scissors!</h1>
    </header>

    <main class="container mx-auto p-6 flex-1">
      <div
          v-if="!choice"
          class="flex items-center justify-center -mx-6"
      >

        <button
            class="bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-pink-500"
            @click="play('rock')"
        >
          <img src="../assets/RockIcon.svg" alt="Rock">
        </button>

        <button
            class="bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-green-500"
            @click="play('scissors')"
        >
          <img src="../assets/ScissorsIcon.svg" alt="Scissors">
        </button>

        <button
            class="bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-yellow-500"
            @click="play('paper')"
        >
          <img src="../assets/PaperIcon.svg" alt="paper">
        </button>

      </div>
      <div v-else>
        <div class="text-3xl mb-4">
          You picked <span class="text-pink-500">{{choice}}</span>
        </div>
        <div class="text-3xl mb-4">
          Yhe computer picked <span class="text-green-500">{{computerChoice}}</span>
        </div>

        <div class="text-6xl mb-12">
          {{verdict}}
        </div>

        <button
          class="bg-pink-500 text-lg py-2 px-4"
          @click="resetRound"
        >
          Reset
        </button>
      </div>

      <div class="mt-12 text-3xl mb-4">
        {{wins}} : {{draws}} : {{losses}}
      </div>

      <div class="text-lg">
        Win rate: {{Math.round(winPercentage)}}%
      </div>
    </main>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";

const wins = ref(0);
const draws = ref(0);
const losses = ref(0);

const choice = ref(null);
const computerChoice = ref(null);
const verdict = ref(null);

const outcomes = {
  rock: {
    rock: 'draw',
    paper: 'loose',
    scissors: 'win'
  },
  paper: {
    paper: 'draw',
    scissors: 'loose',
    rock: 'win'
  },
  scissors: {
    scissors: 'draw',
    rock: 'loose',
    paper: 'win'
  },
};

const winPercentage = computed(() => {
  const total = wins.value + losses.value + draws.value;
  return total ? (wins.value / total) * 100 : 0;
})

const play = c => {
  choice.value = c;

  const choices = ['rock', 'paper', 'scissors'];
  const random = Math.floor(Math.random() * choices.length);
  computerChoice.value = choices[random];

  const outcome = outcomes[choice.value][computerChoice.value];

  switch (outcome) {
    case 'win': {
      wins.value += 1;
      verdict.value = 'You win!';
      break;
    }
    case 'loose': {
      losses.value += 1;
      verdict.value = 'You loose!';
      break;
    }
    default: {
      draws.value += 1;
      verdict.value = 'It is a draw!';
    }
  }

  saveGame();
}

const saveGame = () => {
  localStorage.setItem('wins', String(wins.value));
  localStorage.setItem('draws', String(draws.value));
  localStorage.setItem('losses', String(losses.value));
}

const loadGame = () => {
  wins.value = parseInt(localStorage.getItem('wins')) || 0;
  draws.value = parseInt(localStorage.getItem('draws')) || 0;
  losses.value = parseInt(localStorage.getItem('losses')) || 0;
}

const resetRound = () => {
  choice.value = null;
  computerChoice.value = null;
  verdict.value = null;
}

onMounted(() => {
  loadGame();

  window.addEventListener('keypress', e => {
    if(e.key === 'r') {
      resetRound();
    }
  })
})

</script>

<style scoped>

</style>