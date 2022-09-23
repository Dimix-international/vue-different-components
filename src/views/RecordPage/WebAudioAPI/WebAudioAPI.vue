<template>
  <div class="web-audio">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: "WebAudioAPI",
  setup () {
    const canvas = ref(null);

    const main = () => {
      const ctx = canvas.value.getContext('2d');

      const animate = () => {
        ctx.clearRect(0,0, canvas.value.width, canvas.value.height);
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
  width: 500px;
  height: 100%;
}

</style>