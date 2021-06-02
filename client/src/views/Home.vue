<template>
  <div class="home">
    <myTable />
    <customDialog />
  </div>
</template>

<script>
// @ is an alias to /src
import myTable from "@/components/myTable.vue";
import customDialog from "@/components/customDialog.vue";

export default {
  name: "home",
  components: {
    myTable,
    customDialog
  }
};
</script>
