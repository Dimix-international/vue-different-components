<template>
  <div class="web-audio">
    <canvas ref="canvas"></canvas>
  </div>

</template>

<script>
import {onMounted, ref} from "vue";
import Bar from "@/views/RecordPage/WebAudioAPI/visualizer";
import Microphone from "@/views/RecordPage/WebAudioAPI/microfone";

export default {
  name: "WebAudioAPI",
  setup () {
    const canvas = ref(null);
    const fftSize = 512;

    const main = () => {
      const ctx = canvas.value.getContext('2d');
      let bars = [];
   //   let barWidth = canvas.value.width / 256;

      canvas.value.width = window.innerWidth / 1.3;
      canvas.value.height = window.innerHeight / 1.3;

      const microphone = new Microphone(fftSize);

      const createBars = () => {
        for (let i = 0; i < fftSize / 2; i++) {
          let color = `hsl(${ i * 3}, 100%, 50%)`;

          bars.push(new Bar(
              0,
              i * 1.5,
              1,
              100,
              color,
              i
          ));
        }
      }
      createBars();
      let angle = 0;

      const animate = () => {

        if (microphone.initialized) {
          ctx.clearRect(0,0, canvas.value.width, canvas.value.height);

          const samples = microphone.getSamples();
          const volume = microphone.getVolume();
          angle -= 0.0001 + (volume * 0.05);
          ctx.save();
          ctx.translate(canvas.value.width / 2, canvas.value.height / 2);
          ctx.rotate(angle);

          bars.forEach((bar, i) => {
            bar.update(samples[i]);
            bar.draw(ctx, canvas.value.width, canvas.value.height, volume)
          });

          ctx.restore();
        }
        requestAnimationFrame(animate);
      }

      animate();
    }

    onMounted(() => {
      main();
    })
    return {
      canvas
    }
  }
}
</script>

<style scoped>

.web-audio {
  padding: 50px 100px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

canvas {

}

</style>