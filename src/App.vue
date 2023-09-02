<template>
  <MultistepFormApp></MultistepFormApp>
</template>

<script lang="ts">
import MultistepFormApp from "./modules/multistep-form/MultistepForm.vue";

export default {
  components: {
    MultistepFormApp
  },
  data: () => ({})
};
</script>

<style>
@font-face {
  font-family: "IbmPlexSansRegular";
  src: url(./fonts/IBMPlexSans-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "IbmPlexSansBold";
  src: url(./fonts/IBMPlexSans-Bold.ttf) format("truetype");
}
</style>
