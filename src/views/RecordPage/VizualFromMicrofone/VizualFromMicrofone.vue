<template>
  <canvas ref="visualizer"></canvas>
  <div>
    <div class="grid">
      <label for="volume">Volume</label>
      <input type="range" min="0" max="1" v-model="volume" step="0.1" id="volume">
      <label for="bass">Bass</label>
      <input type="range" min="-10" max="10" v-model="bass" id="bass">
      <label for="mid">Mid</label>
      <input type="range" min="-10" max="10" v-model="mid" id="mid">
      <label for="mid">Treble</label>
      <input type="range" min="-10" max="10" v-model="treble" id="treble">
    </div>
  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";

export default {
  name: "VizualFromMicrofone",
  setup () {
    const volume = ref(0.5);
    const bass = ref(0);
    const mid = ref(0);
    const treble = ref(0);
    const visualizer = ref(null);
    const context = ref(null);
    const idReqAnimFrame = ref(null);
    const analyzerNode = ref(null);
    const gainNode = ref(null);
    const baseEQ = ref(null);
    const midEQ = ref(null);
    const trebleEQ = ref(null);

    const setupContext = async () => {
      const guitar = await getGuitar();

      if(context.value.state === 'suspended') {
        await context.value.resume();
      }

      const source = context.value.createMediaStreamSource(guitar);
      source
          .connect(baseEQ.value)
          .connect(midEQ.value)
          .connect(trebleEQ.value)
          .connect(gainNode.value)
          .connect(analyzerNode.value)
          .connect(context.value.destination);
    }

    const getGuitar = () => {
      return navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
          latency: 0
        }
      })
    }


    const drawVisualizer = () => {
      idReqAnimFrame.value =  requestAnimationFrame(drawVisualizer);

      const bufferLength = analyzerNode.value.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyzerNode.value.getByteFrequencyData(dataArray);

      const width = visualizer.value?.width;
      const height = visualizer.value?.height;

      const barWidth = width / bufferLength;

      const canvasContext = visualizer.value.getContext('2d');
      canvasContext.clearRect(0, 0, width, height);

      dataArray.forEach((item, index) => {
        const y = item / 255 * height / 2;
        const x = barWidth * index;

        canvasContext.fillStyle = `hsl(${y / height * 400}, 100%, 50%)`;
        canvasContext.fillRect(x, height - y, barWidth, y);
      })
    }

    const resize = () => {
      visualizer.value.width = visualizer.value.clientWidth * window.devicePixelRatio;
      visualizer.value.height = visualizer.value.clientHeight * window.devicePixelRatio;
    }

    const setupEventListeners = () => {
      window.addEventListener('resize', resize);
      gainNode.value.gain.value = volume.value;
    }

    watch(volume, newV => gainNode.value.gain.setTargetAtTime(newV, context.value.currentTime, 0.1));
    watch(bass, newV => baseEQ.value.gain.setTargetAtTime(newV, context.value.currentTime, 0.1));
    watch(bass, newV => midEQ.value.gain.setTargetAtTime(newV, context.value.currentTime, 0.1));
    watch(bass, newV => trebleEQ.value.gain.setTargetAtTime(newV, context.value.currentTime, 0.1));

    onMounted(() => {
      context.value = new AudioContext();
      analyzerNode.value = new AnalyserNode(context.value, {fftSize: 256});
      gainNode.value = new GainNode(context.value, {gain: volume.value});
      baseEQ.value = new BiquadFilterNode(context.value, {
        type: 'lowshelf',
        frequency: 500,
        gain: bass.value
      });
      midEQ.value = new BiquadFilterNode(context.value, {
        type: 'peaking',
        Q: Math.SQRT1_2,
        frequency: 1500,
        gain: mid.value
      });
      trebleEQ.value = new BiquadFilterNode(context.value, {
        type: 'highshelf',
        frequency: 3000,
        gain: treble.value
      });
      setupContext();
      setupEventListeners();
      resize();
      drawVisualizer();
    });

    return {
      volume,
      bass,
      mid,
      treble,
      visualizer
    }
  }
}
</script>

<style scoped>
.grid {
  padding: 50px 100px;
  display: grid;
  grid-template-columns: auto min-content;
  justify-content: center;
  justify-items: end;
  align-items: center;
}

canvas {
  position: fixed;
  right: 0;
  top: 0;
  width: calc(100vw - 100px);
  height: 100vh;
  pointer-events: none;
}

input {
  margin: 0;
}
</style>