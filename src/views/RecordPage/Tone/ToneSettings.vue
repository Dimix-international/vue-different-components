<template>
  <div class="musio">
    <div class="container">
      <div class=upload>
      <label class=upload_label for=upload_input><span>Upload</span></label>
      <input
          id=upload_input
          class=upload_input
          type=file
          accept="audio/*"
          @change="changeSongFile"
      >
        <audio ref="audio" :src="playerAudio"></audio>
    </div>
      <div class="settings-tempo">
        <div class=tempo>
          <label class=tempo_label for=tempo_input>Tempo</label>
          <input
              :value="tempo"
              class=tempo_input
              ref="tempoInput"
              id=tempo_input
              type=range
              min=0.5
              max=1.5
              step=0.1
              @change="changeTempo"
          >
          <span class=tempo_display>{{ tempo }}</span>
        </div>
        <div class=tempo>
          <label class=tempo_label for=tempo_input>Tonality</label>
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
          <span class=tempo_display>{{ tonality }}</span>
        </div>
      </div>
      <div
          class="button"
          :class="{
            disabled: !playerAudio
          }"
      >
        <button
            @click.prevent="play"
            :disabled="!playerAudio"
        >
          play
        </button>
      </div>
      <div
          class="button"
          :class="{
            disabled: !playerAudio
          }"
      >
        <button
            @click.prevent="stop"
            :disabled="!playerAudio"
        >
          stop
        </button>
      </div>
      <div
          class="button"
          :class="{
            disabled: !playerAudio
          }"
      >
        <button
            @click.prevent="transformAudio"
            :disabled="!playerAudio"
        >
          Обработать
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as Tone from 'tone'
import {ref} from "vue";
import {countOffsetTonality} from "@/views/RecordPage/Tone/countOffsetTonality";


export default {
  name: "ToneSettings",
  setup() {
    let player;
    let pitch;

    const tempo = ref(1);
    const pitchTempo = ref(0);
    const playerAudio = ref('');
    const tonality = ref(0);
/*    const analyzerNode = new Tone.Analyser({
      type: 'fft',
      size: 1024
    }).toDestination();*/

    const play = async () => {

      //https://xminus.me/track/309115/%D0%B2%D0%B4%D0%B2%D0%BE%D1%91%D0%BC - для сравнения

/*      const autoWah = new Tone.AutoWah({
        Q: 1,
        wet: 1,
      });*/
/*      const reverb = new Tone.JCReverb({
        roomSize: 0.2,
        wet: 1
      }).toDestination();*/ //-- эхо - прикольно - распространение звука

     // const delay = new Tone.PingPongDelay(0.5, 0.1).toDestination(); // эхо повторяющее

     //const distor = new Tone.Distortion(0.2).toDestination(); //громкость и распространение

      // const trem = new Tone.Tremolo(4, 0.6).toDestination().start(); //вначле эхо

      //const bitcrush = new Tone.BitCrusher(10).toDestination(); //количество битов - не услышал разницы

      //chorus - комбинирование delay и tremolo
/*      const chorus = new Tone.Chorus({
        frequency: 4, //диапазон влияющий на вибрацию
        delayTime: 2, //ms - От 2 до  20
        depth: 0.6,
        wet: 1,
        type: 'sine'
      }).toDestination();*/

      //const autoFilter = new Tone.AutoFilter("B#-4"); //частота звука (пригулшенный, звонкий)
     // const autoPanner = new Tone.AutoFilter("1n").toDestination(); // как и autoFilter

     // const frequencyShifter = new Tone.FrequencyShifter(42).toDestination();

/*      const phaser = new Tone.Phaser({ //добавляет что-то вроде стерео, до конца не разобрался
        frequency: 15,
        octaves: 100,
        baseFrequency: 1000
      }).toDestination()*/

      // const vibrato = new Tone.Vibrato({
      //   type: 'sawtooth'
      // }); //добавляет вибрацию

/*      const stereoWinder = new Tone.StereoWidener({
        width: 0.5, // 0 макс стерео, громче стало
        wet: 1,
      });*/

/*      const cheby = new Tone.Chebyshev({ //хз
        oversample:'2x',
        wet: 1,
      });*/

    // pitch.chain(eff1, eff2, Tone.Destination)
   //  pitch.connect(phaser)


      pitch = new Tone.PitchShift({
        pitch: +tonality.value + pitchTempo.value,
        wet: 1, //только 1, а то 2 голоса
        feedback: 0,// 0 нету эха
      }).toDestination();

      await Tone.loaded();
      player.connect(pitch);
      player.playbackRate = tempo.value;
      player.start();
    }

    const stop = () => {
      player.stop();
    }

    const changeSongFile = function (e) {
      const target = e.currentTarget;
      const file = target.files[0];
      let reader;

      if (target.files && file) {
        reader = new FileReader();
        reader.onload = function (e) {
          playerAudio.value = e.target.result;
          preload();
        }
        reader.readAsDataURL(file);
      }
    };

    const preload = async () => {
      player = new Tone.Player(playerAudio.value);
    }

    const transformAudio = () => {
      stop();
      preload();
    }

    const changeTempo = (e) => {
      const {value} = e.target;
      const numberValue = +value;
      tempo.value = numberValue;
      pitchTempo.value = countOffsetTonality(+((numberValue * 100).toFixed(0)));

      if (player) {
        player.playbackRate = numberValue;
      }
      if (pitch) {
        pitch.pitch = +tonality.value + pitchTempo.value;
      }
    }

    const changeTonality = (e) => {
      const {value} = e.target;
      tonality.value = +value;

      if (pitch) {
        pitch.pitch = +pitchTempo.value + +value;
      }
    }


    return {
      play,
      tempo,
      stop,
      tonality,
      changeSongFile,
      playerAudio,
      transformAudio,
      changeTonality,
      changeTempo,
    }
  }
}
</script>

<style scoped>

.musio {
  padding: 50px 100px;
  display: flex;
  width: 100%;
}
.container {
  flex: 0 0 350px;
  display: flex;
  flex-direction: column;
}

.settings-tempo {
  padding: 20px 0;
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
  flex-direction: column;
}

.tempo_display {
  font-weight: 700;
  text-align: center;
  display: block;
}

.button {
  display: flex;
  justify-content: center;
  height: 40px;
  border-radius: 5px;
  background-color: blue;
  color: white;
  margin-bottom: 20px;
}

.button.disabled {
  background-color: gray;
}

.button button {
  display: block;
  width: 100%;
  height: 100%;
}

.animate {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: blue;
}

</style>