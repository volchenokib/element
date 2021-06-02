<template>
  <!-- Add/Change Dialog -->
  <el-dialog
    :visible="isVisible"
    :title="dialogTitle"
    top="8vh"
    width="30%"
    lock-scrol
    @close="onDialogClose"
  >
    <formDialog />
  </el-dialog>
</template>

<script>
import formDialog from "@/components/formDialog";
export default {
  name: "customDialog",
  components: {
    formDialog
  },
  computed: {
    isVisible() {
      return this.$store.getters.getIsVisible;
    },
    dialogTitle() {
      if (this.$store.state.newGuest) {
        return "Add User";
      } else if (this.$store.state.currentGuest) {
        return "Change User";
      } else {
        return "";
      }
    }
  },
  methods: {
    onDialogClose() {
      this.$store.commit("DIALOG", false);
      this.$store.commit("CLEARNEWGUEST");
      this.$store.commit("CLEARCURRENTGUEST");
      this.$refs.form.resetFields();
      this.resetServerError();
    }
  }
};
</script>