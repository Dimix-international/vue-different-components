<template>
  <button @click="play">music</button>
  <div>
    <button @click="changeF">change</button>
  </div>
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

      //const pitch = new Tone.PitchShift(11).toDestination();
/*      const reverb = new Tone.JCReverb({
        roomSize: 0.5,
        wet: 0.5
      }).toDestination() //-- эхо - прикольно - распространение звука*/
      //const delay = new Tone.PingPongDelay(0.5, 0.1).toDestination(); // эхо повторяющее

     // const distor = new Tone.Distortion(0.2).toDestination(); //громкость и распространение

     // const trem = new Tone.Tremolo(4, 0.6).toDestination().start(); //вначле эхо

      //const bitcrush = new Tone.BitCrusher(10).toDestination(); //количество битов - не услышал разницы

      Tone.loaded().then(() => {
        player.connect();
        player.playbackRate = props.playbackRate;
        player.start();
      });
    }

    const changeF = () => {
      console.log(player);
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
      changeF,
    }
  }
}
</script>

<style scoped>

</style>