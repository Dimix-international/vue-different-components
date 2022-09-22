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
        pitch: -5, //на сайте от -7 до +5
        wet: 1, //только 1, а то 2 голоса
        feedback: 0,// 0 нету эха
      });

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


      Tone.loaded().then(() => {
        player.chain(pitch, Tone.Destination);
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