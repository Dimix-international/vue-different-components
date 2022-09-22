<template>
  <div>
    <canvas ref="myCanvas"></canvas>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import Pumpkin from "@/views/RecordPage/WebAudioAPI/pumpkin";


export default {
  name: "TalkingPumpkin",
  setup () {
    const myCanvas = ref(null);
    const main = () => {
      let frameCount = 0;

      const pumpkin = new Pumpkin(
          myCanvas.value.width / 2,
          myCanvas.value.height / 2,
          Math.min(myCanvas.value.width, myCanvas.value.height) * 0.4
      );

      //const microphone = new Microphone(8192);

      const clear = () => {
        myCanvas.value.getContext("2d")
            .clearRect(0,0, myCanvas.value.width, myCanvas.value.height);
      }
      const loop = () => {
        clear();
        frameCount++;
     //   const openness = microphone.getVolume() * 6;
        const openness = (Math.sin(frameCount / 30) + 1) / 2;
        pumpkin.draw(myCanvas.value.getContext('2d'), openness);
        requestAnimationFrame(loop);
      }
      loop();
    }


    onMounted(() => {
      main();
    })


    return {
      myCanvas
    }
  }
}
</script>

<style scoped lang="scss">

canvas {

}

</style>