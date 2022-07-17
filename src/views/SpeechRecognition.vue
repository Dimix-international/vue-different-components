<template>
  <div class="recording">
    <button
        class="btn"
        :class="`mic`"
        @click="toggleMic"
    >
      {{isRecording ? 'Stop record' : 'Start record'}}
    </button>
    <div
        v-text="transcript"
        class="transcript"
    >
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

  const transcript = ref('');
  const isRecording = ref(false);

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const sr = new Recognition();

  onMounted(() => {
    sr.continuous = true;
    sr.interimResults = true;

    sr.onstart = () => {
      isRecording.value = true;
    }

    sr.onend = () => {
      isRecording.value = false;
    }

    sr.onresult = (evt) => {

      for (const result of evt.results) {
        if(result.isFinal) {
          checkForCommand(result);
        }
      }

      transcript.value = Array.from(evt.results) //необходимо коллекцию преоб в массив
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
    }
  })

const checkForCommand = (result) => {
    const t = result[0].transcript;
    if(t.toLowerCase().includes('стоп запись')) {
      sr.stop();
    } else if(t.toLowerCase().includes('сколько время')) {
      sr.stop();
      alert(new Date().toLocaleTimeString());
      setTimeout(() => {
        sr.start();
      },0)
    }
}

  const toggleMic = () => {
  if(isRecording.value) {
    sr.stop();
  } else {
    sr.start();
  }
}
</script>

<style scoped>
.recording {
  max-width: 500px;
  padding: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
  .btn {
    background-color: black;
    width: 250px;
    color: #fff;
    padding: 7px 0;
    border-radius: 4px;
    font-size: 24px;
  }
</style>