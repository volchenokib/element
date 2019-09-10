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
    <!-- Dialog form -->
    <el-form
      class="customForm"
      :model="form"
      :rules="rules"
      ref="form"
      label-width="120px"
      size="medium"
    >
      <!-- Name -->
      <el-form-item label="Name" prop="name" :class="{ 'is-error': serverError.name }">
        <el-input v-model="form.name" @change="resetFieldsServerError('name')" autofocus></el-input>
        <div class="serverError">{{this.serverError.name}}</div>
      </el-form-item>

      <!-- Gender -->
      <el-form-item label="Gender" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio
            label="M"
            border
            @change="resetFieldsServerError('gender') "
            :class="{ 'is-error': serverError.name }"
          >Male</el-radio>
          <el-radio
            label="F"
            border
            @change="resetFieldsServerError('gender') "
            :class="{ 'is-error': serverError.name }"
          >Female</el-radio>
        </el-radio-group>
        <div class="serverError">{{this.serverError.gender}}</div>
      </el-form-item>

      <!-- Date  -->
      <el-form-item label="Date" required>
        <el-col :span="11">
          <el-form-item prop="check_in_date" :class="{ 'is-error': serverError.check_out_date }">
            <el-date-picker
              v-model="form.check_in_date"
              type="date"
              placeholder="Check-In"
              :picker-options="startDateOptions"
              style="width: 100%;"
              :clearable="false"
              :editable="false"
              value-format="yyyy-MM-dd"
              @change="resetFieldsServerError('check_in_date')"
            ></el-date-picker>
            <div class="serverError">{{this.serverError.check_in_date}}</div>
          </el-form-item>
        </el-col>

        <el-col class="customForm__dash" :span="2">-</el-col>

        <el-col :span="11">
          <el-form-item prop="check_out_date" :class="{ 'is-error': serverError.check_out_date }">
            <el-date-picker
              v-model="form.check_out_date"
              type="date"
              placeholder="Check-Out"
              style="width: 100%;"
              :picker-options="{
                  firstDayOfWeek: 1
                }"
              :clearable="false"
              value-format="yyyy-MM-dd"
              @change="resetFieldsServerError('check_out_date')"
            ></el-date-picker>
            <div class="serverError">{{this.serverError.check_out_date}}</div>
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- Role -->
      <el-form-item label="Role" prop="role" :class="{ 'is-error': serverError.role }">
        <el-col :span="11">
          <el-select
            v-model="form.role"
            placeholder="please select role"
            @change="resetFieldsServerError('role')"
          >
            <el-option
              v-for="role in this.$store.state.roles"
              v-bind:key="role.id"
              :label="role.name"
              :value="role.id"
            ></el-option>
          </el-select>
          <div class="serverError">{{this.serverError.role}}</div>
        </el-col>
      </el-form-item>

      <!-- Status -->
      <el-form-item label="Status" prop="status" :class="{ 'is-error': serverError.status }">
        <el-col :span="11">
          <el-select
            v-model="form.status"
            placeholder="please select status"
            @change="resetFieldsServerError('status')"
          >
            <el-option
              v-for="status in this.$store.state.statuses"
              v-bind:key="status.id"
              :label="status.name"
              :value="status.id"
            ></el-option>
          </el-select>
          <div class="serverError">{{this.serverError.status}}</div>
        </el-col>
      </el-form-item>

      <!-- Phone -->
      <el-form-item label="Phone" prop="phone" :class="{ 'is-error': serverError.phone }">
        <el-col :span="11">
          <el-input
            v-model="form.phone"
            placeholder="79231234456"
            @change="resetFieldsServerError('phone')"
          ></el-input>
          <div class="serverError">{{this.serverError.phone}}</div>
        </el-col>
      </el-form-item>

      <!-- Email -->
      <el-form-item label="Email" prop="email" :class="{ 'is-error': serverError.email }">
        <el-input v-model="form.email" @change="resetFieldsServerError('email')"></el-input>
        <div class="serverError">{{this.serverError.email}}</div>
      </el-form-item>

      <!-- Distatnce -->
      <el-form-item
        label="Distance"
        prop="distance_to_event"
        :class="{ 'is-error': serverError.distance_to_event }"
      >
        <el-col :span="11">
          <el-input
            v-model="form.distance_to_event"
            @change="resetFieldsServerError('distance_to_event')"
          ></el-input>
        </el-col>
        <div class="serverError">{{this.serverError.distance_to_event}}</div>
      </el-form-item>

      <!-- Max payment -->
      <el-form-item
        label="Max payment"
        prop="max_payment"
        :class="{ 'is-error': serverError.max_payment }"
      >
        <el-col :span="11">
          <el-input v-model="form.max_payment" @change="resetFieldsServerError('max_payment')"></el-input>
        </el-col>
        <div class="serverError">{{this.serverError.max_payment}}</div>
      </el-form-item>

      <!-- Checkboxes -->
      <el-form-item>
        <el-checkbox
          v-model="form.ready_to_share_accommodation"
          label="Ready to share accomodation"
        ></el-checkbox>
        <el-checkbox v-model="form.ready_to_share_room" label="Ready to share room"></el-checkbox>
        <el-checkbox v-model="form.plus_one" label="Plus one"></el-checkbox>
      </el-form-item>

      <!-- Buttons -->
      <el-form-item class="customForm__buttons">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button
          type="primary"
          :disabled="isDisable"
          @click.prevent="submitGuestData('form')"
        >{{dialogSubmitButton}}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "formdDialog",

  data() {
    return {
      newGuest: {},
      serverError: {},
      rules: {
        name: [
          { required: true, message: "Please input name", trigger: "blur" }
        ],
        gender: [
          {
            required: true,
            message: "Please input gender",
            trigger: "blur"
          }
        ],
        check_in_date: [
          {
            required: true,
            message: "Please input check-in date",
            trigger: "blur"
          }
        ],
        check_out_date: [
          {
            required: true,
            message: "Please input check-in date",
            trigger: "blur"
          }
        ],
        role: [
          {
            required: true,
            message: "Please input role ",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "Please input status ",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "Please input phone", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "field must be a valid email address",
            trigger: "blur"
          }
        ],
        distance_to_event: [{ message: "Please input phone", trigger: "blur" }],
        max_payment: [
          {
            type: "number",
            message: "field must be a number",
            trigger: "blur"
          }
        ]
      }
    };
  },

  computed: {
    form() {
      if (this.$store.getters.getIsVisible == "create") {
        this.newGuest = this.$store.getters.emptyGuest;
        console.log("this.newGuest", this.newGuest);
        return this.newGuest;
      } else {
        this.newGuest = this.$store.getters.emptyGuest;
        console.log("this.newGuest else", this.newGuest);
        return this.newGuest;
        // return this.currentGuest;
      }
    },

    startDateOptions() {
      const prop = {
        firstDayOfWeek: 1,
        disabledDate(time) {
          return (
            time.getTime() > Date.parse("2019-07-15") &&
            time.getTime() < Date.parse("2019-07-20")
          );
        }
      };
      return prop;
    },

    isDisable() {
      return this.$store.getters.getIsDisable;
    },

    isVisible() {
      if (
        this.$store.getters.getIsVisible == "create" ||
        this.$store.getters.getIsVisible == "update"
      ) {
        return true;
      } else {
        false;
      }
    },

    dialogTitle() {
      if (this.$store.getters.getIsVisible == "create") {
        return "Add User";
      } else if (this.$store.getters.getIsVisible == "update") {
        return "Change User";
      } else {
        return "";
      }
    },

    dialogSubmitButton() {
      if (this.$store.getters.getIsVisible == "create") {
        return "Add";
      } else if (this.$store.getters.getIsVisible == "update") {
        return "Change";
      } else {
        return "";
      }
    }
  },

  methods: {
    closeDialog() {
      this.$store.commit("DIALOG", false);
    },
    onDialogOpen(attr) {
      this.$store.commit("DIALOG", true);
      this.dialog.title = attr.title;
      this.dialog.submitButton = attr.submitButton;
    },
    onDialogClose() {
      this.$store.commit("DIALOG", false);
      this.$refs.form.resetFields();
      this.resetServerError();
    },
    openCreateDialog() {
      const attr = {
        title: "Create user",
        submitButton: "Create"
      };
      this.onDialogOpen(attr);
    },
    resetFieldsServerError(field) {
      // this.$refs.form.clearValidate(field);
      this.serverError[field] = "";
    },
    submitGuestData(form) {
      console.log("form", this.form);
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.dialog.submitButton === "Create") {
            this.$refs.form.clearValidate();
            this.$store
              .dispatch("createGuest", this.form)
              // server error
              .catch(error => {
                if (error) {
                  this.$store.commit("FAILURE");
                  this.serverError = {
                    name: `${error}`,
                    gender: `${error}`,
                    check_in_date: `${error}`,
                    check_out_date: `${error}`,
                    role: `${error}`,
                    status: `${error}`,
                    email: `${error}`,
                    phone: `${error}`,
                    distance_to_event: `${error}`,
                    max_payment: `${error}`
                  };
                  console.log("serverError", this.serverError);
                }
              });
          } else {
            this.$store.dispatch("updateGuest", this.form);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetServerError() {
      if (this.serverError) {
        this.serverError = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.customForm {
  margin-right: 30px;
  text-align: left;

  &__dash {
    text-align: center;
  }

  &__buttons {
    text-align: right;
  }
}

.serverError {
  color: #f56c6c;
  font-size: 12px;
  left: 0;
  line-height: 1;
  padding-top: 2px;
  position: absolute;
  top: 100%;
}
</style>