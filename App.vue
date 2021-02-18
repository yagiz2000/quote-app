<template>
  <div id="app">
    <AdviceBox />

    <SavedAdvices />
  </div>
</template>

<script>
import AdviceBox from "./components/AdviceBox";
import SavedAdvices from "./components/SavedAdvices";
export default {
  name: "App",
  components: {
    AdviceBox,
    SavedAdvices,
  },
  
};
</script>

<style>

body {
  background: linear-gradient(to right top,#65dfc9, #6cdbeb );
}
</style>
