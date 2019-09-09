<template>
  <div id="app">
    <myTable />
  </div>
</template>

<script>
import myTable from "./components/myTable.vue";

export default {
  name: "app",
  components: {
    myTable
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

// custom icon font
@font-face {
  font-family: "icomoon";
  src: url("./assets/fonts/icomoon.eot?lvv940");
  src: url("./assets/fonts/icomoon.eot?lvv940#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/icomoon.ttf?lvv940") format("truetype"),
    url("./assets/fonts/icomoon.woff?lvv940") format("woff"),
    url("./assets/fonts/icomoon.svg?lvv940#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"],
[class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: "icomoon" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-call:before {
  content: "\e900";
}
.icon-envelope:before {
  content: "\e901";
}
</style>
