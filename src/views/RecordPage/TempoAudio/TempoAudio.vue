<template>
  <div class="tempo">
    <div class=group>

      <h2>Audio source (.mp3)</h2>

      <div class=url>
        <label
            class=url_label
            for=url_input
        >
          <span>Address</span>
        </label>
        <input
            id=url_input
            class=url_input
            type=url
            :value="playerInputUrl"
            @change="changeSongURL"
        >
      </div>

      <p>OR</p>

      <div class=upload>
        <label class=upload_label for=upload_input><span>Upload</span></label>
        <input
            id=upload_input
            class=upload_input
            type=file
            accept="audio/*"
            @change="changeSongFile"
        >
      </div>

    </div>
    <div class=group>

      <div class=player>
        <h3 class=player_display>{{playerDisplay}}</h3>
        <audio
            class=player_audio
            controls
            :playbackRate="tempo"
            :src="playerAudio"
        >
          <track
              id=player-chords
              kind=captions
              srclang=en
              :src="playerChords"
          >
        </audio>
      </div>

      <div class=tempo>
        <label class=tempo_label for=tempo_input>Tempo</label>
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
        <span class=tempo_display>{{tempo}}</span>
      </div>

    </div>
  </div>
</template>

<script>
import {onBeforeMount, ref} from "vue";
import {Gain, PitchShift, UserMedia} from "tone";

export default {
  name: "TempoAudio",
  setup () {
    const playerDisplay = ref(null);
    const tempoInput = ref(null);
    const urlInput = ref(null);
    const playerChords = ref(null);

    const playerInputUrl = ref('');
    const tempo = ref('1');
    const playerAudio = ref('https://websemantics.uk/pens/audio-tempo-change-fixed-pitch/media/hard-days-night.mp3');

    const changeTempo = async function (e) {
      let gain = new Gain(0.3).toDestination();
      let mic = new UserMedia();
      let pitchShift = new PitchShift(10).connect(gain).toDestination();
      mic.connect(pitchShift);
      await mic.open();
      const { value } = e.target;
      tempo.value = value;
      playerChords.value = playerAudio.value.replace('.mp3', '.vtt');
    };

    const changeSongURL = function (e) {
      const { value } = e.target;
      playerAudio.value = value;
      playerInputUrl.value = value;
      playerDisplay.value = value.split('\\').pop().split('/').pop();
      tempo.value = '1';
    }

    const changeSongFile = function (e) {
      const target = e.currentTarget;
      const file = target.files[0];
      let reader;
      tempo.value = '1';

      if (target.files && file) {
        reader = new FileReader();
        reader.onload = function (e) {
          playerAudio.value = e.target.result
          playerDisplay.value = file.name;
          playerInputUrl.value = file.name;
        }
        reader.readAsDataURL(file);
      }
    };

    onBeforeMount(() => {
      playerDisplay.value = playerAudio.value.split('\\').pop().split('/').pop();
      playerInputUrl.value = playerAudio.value;
    })


    return {
      playerDisplay,
      tempoInput,
      urlInput,
      playerChords,
      changeTempo,
      changeSongURL,
      changeSongFile,
      tempo,
      playerAudio,
      playerInputUrl,
    }
  }
}
</script>

<style scoped>

.tempo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.group {
  padding: .5rem 1rem;
  margin: 1rem auto;
}

.url {
  display: flex;
  width: 100%;
  margin: 1rem auto;
}
[class*="_label"] {
  position: relative;
  white-space: nowrap;
  margin-right: .5em;
  min-width: 4em;
}
[class*="_label"] > span {
  display: block;
  position: relative;
  top: 50%;
  transform: translatey(-50%);
}
[class*="_input"] {
  display: inline-block;
  line-height: 1;
  width: 100%;
  margin: 0;
  padding: .25rem .5rem;
  font: inherit;
  border: 1px solid #fff;
  background-color: rgba(255,255,255,.5);
}

.upload {
  display: flex;
  width: 100%;
  margin: 1rem auto;
}

.player_audio {
  width: 100%;
}
.player_display {
  font-size: 1.25rem;
}
.tempo {
  display: flex;
  width: 100%;
  margin: 1rem auto;
}
.tempo_display {
  font-weight: 700;
  min-width: 3em;
  margin-left: .5em;
}

</style>