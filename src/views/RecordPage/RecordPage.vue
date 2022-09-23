<template>
  <ToneSettings />
  <VizualFromMicrofone />
</template>

<script>

import ToneSettings from "@/views/RecordPage/Tone/ToneSettings";
import VizualFromMicrofone from "@/views/RecordPage/VizualFromMicrofone/VizualFromMicrofone";

export default {
  name: "RecordPage",
  components: {VizualFromMicrofone, ToneSettings }
}
</script>

<style scoped>

</style>