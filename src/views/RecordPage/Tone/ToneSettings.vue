<template>
  <button @click="play">music</button>
</template>

<script>
import * as Tone from 'tone'
import {onMounted, watch} from "vue";

export default {
  name: "ToneSettings",
  props: {
    music: String,
    playbackRate: {
      type: Number,
      default: 1.5,
    },
  },
  setup(props) {
    let player;

    const play = () => {

      //https://xminus.me/track/309115/%D0%B2%D0%B4%D0%B2%D0%BE%D1%91%D0%BC - для сравнения
      const pitch = new Tone.PitchShift({
        pitch: 1, //на сайте от -7 до +5
        wet: 1, //только 1, а то 2 голоса
        feedback: 0,// 0 нету эха
      }).toDestination();
/*    const reverb = new Tone.JCReverb({
        roomSize: 0.2,
        wet: 1
      }).toDestination() //-- эхо - прикольно - распространение звука*/
      //const delay = new Tone.PingPongDelay(0.5, 0.1).toDestination();  эхо повторяющее

     //const distor = new Tone.Distortion(0.2).toDestination(); //громкость и распространение

   //  const trem = new Tone.Tremolo(4, 0.6).toDestination().start(); //вначле эхо

      //const bitcrush = new Tone.BitCrusher(10).toDestination(); //количество битов - не услышал разницы

   //   pitch.connect(reverb)

      Tone.loaded().then(() => {
        player.connect(pitch);
        player.playbackRate = props.playbackRate;
        player.start();
      });
    }

    const preload = async () => {
      player = new Tone.Player(props.music);
    }

    watch(() => props.music, () => {
      preload();
    })

    onMounted(() => {
      preload()
    })

    return {
      play,
    }
  }
}
</script>

<style scoped>

</style>