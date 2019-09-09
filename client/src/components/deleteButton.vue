<template>
  <!-- Delete button -->
  <el-popover placement="top" width="260" v-model="confirmPopover">
    <p>
      Are you sure you want to delete the
      <br />
      {{ this.$store.getters.getSelectedGuests.length }} selected items?
    </p>
    <div style="text-align: right;">
      <el-button size="mini" type="text" @click="confirmPopover = false">Cancel</el-button>
      <el-button type="danger" size="mini" @click="deleteSelectedGuests">Confirm</el-button>
    </div>
    <el-button :disabled="selectedGuests" type="danger" size="mini" plain slot="reference">Delete</el-button>
  </el-popover>
</template>

<script>
export default {
  name: "deleteButton",
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
    deleteSelectedGuests() {
      this.$store.dispatch("deleteGuests");
    }
  }
};
</script>