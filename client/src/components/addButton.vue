<template>
  <!-- add button -->
  <el-button type="primary" size="mini" plain @click="openCreateDialog">Add</el-button>
</template>

<script>
export default {
  name: "addButton",
  data() {
    return {
      confirmPopover: false
    };
  },
  computed: {
    selectedGuests() {
      if (this.$store.getters.getSelectedGuests.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  },

  methods: {
    openCreateDialog() {
      this.$store.commit("CREATENEWGUEST");
      this.$store.commit("DIALOG", true);
    }
  }
};
</script>