<template>
  <div class="player">
    <input
      id=upload_input
      class=upload_input
      type=file
      accept="audio/*"
      @change="changeSongFile"
  >
    <div>
      <input
          :value="tonality"
          class=tempo_input
          ref="tempoInput"
          id=tempo_input
          type=range
          min=-15
          max=15
          step=1
          @change="changeTonality"
      >
    </div>
    <div>
      <input
          class=tempo_input
          ref="tempoInput"
          id=tempo_input
          type=range
          :value="tempo"
          min=0.5
          max=1.5
          step=0.025
          @change="changeTempo"
      >
    </div>
    <div>
      <button @click="playHanlder">play</button>
    </div>
  </div>

</template>

<script>
import {ref} from "vue";
import PitchShift from './PitchShift';


export default {
  name: "SoundAudio",
  setup() {
    const tempo = ref(1);
    //'https://websemantics.uk/pens/audio-tempo-change-fixed-pitch/media/hard-days-night.mp3'
    const playerAudio = ref('https://websemantics.uk/pens/audio-tempo-change-fixed-pitch/media/hard-days-night.mp3');
    const audio = new Audio();
    const audioCtx = new AudioContext();
    const pitchShift = PitchShift(audioCtx);
    const tonality = ref(0);

    pitchShift.wet.value = 1
    pitchShift.dry.value = 0.5;
    pitchShift.connect(audioCtx.destination);

    const changeSongFile = function (e) {
      const target = e.currentTarget;
      const file = target.files[0];
      let reader;

      if (target.files && file) {
        reader = new FileReader();
        reader.onload = function (e) {
          playerAudio.value = e.target.result
        }
        reader.readAsDataURL(file);
      }
    };

    const playHanlder = () => {
      audio.src = playerAudio.value
      ;
      pitchShift.transpose = tonality.value;
      audio.playbackRate = tempo.value;

      const audioSource = audioCtx.createMediaElementSource(audio);
      audioSource.connect(pitchShift);

      audio.play();
    }

    const changeTempo = async function (e) {
      const { value } = e.target;
      tempo.value = +value;
      audio.playbackRate = +value;
    };

    const changeTonality = async function (e) {
      const { value } = e.target;
      tonality.value = +value;
      pitchShift.transpose  = +value;
    };


    return {
      changeSongFile,
      playHanlder,
      tempo,
      tonality,
      changeTempo,
      changeTonality,
    }
  }
}
</script>

<style scoped>

.player {
  padding: 100px;
}

</style>