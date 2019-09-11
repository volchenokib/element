<template>
  <div class="wrapper">
    <!-- Table header-->
    <div class="table__header">
      <div class="table__action">
        <addButton />
        <deleteButton />
      </div>
    </div>
    <!-- Table -->
    <el-table
      style="width: 100%"
      ref="multipleTable"
      empty-text="There are no guests for this event"
      max-height="750"
      row-class-name="rowOnHover"
      border
      :data="listOfGuests"
      :select-on-indeterminate="false"
      @cell-click="cellClickHandler"
      @cell-mouse-enter="cellHoverHandler"
      @cell-mouse-leave="cellLeaveHandler"
      @selection-change="handleSelectionChange"
    >
      <!-- Check boxes -->
      <el-table-column type="selection" width="55" header-align="center" align="center"></el-table-column>

      <!-- Name -->
      <el-table-column label="Name" width="420" show-overflow-tooltip header-align="center">
        <div class="container" slot-scope="scope">
          <div>{{ scope.row.name }}</div>
          <!-- <span class="icon-call"></span> -->

          <div v-if="currentRow.email == scope.row.email">
            <el-button
              type="info"
              icon="icon-call"
              size="mini"
              plain
              @click="guestCall(scope.row.phone)"
            ></el-button>

            <el-button
              type="info"
              icon="icon-envelope"
              size="mini"
              plain
              @click="guestEmail(scope.row.email)"
            ></el-button>
          </div>
        </div>
      </el-table-column>

      <!-- Gender -->
      <el-table-column label="Gender" width="80" header-align="center" align="center">
        <template slot-scope="scope">{{ scope.row.gender }}</template>
      </el-table-column>

      <!-- Check-In -->
      <el-table-column label="Check-In" header-align="center" align="center">
        <template slot-scope="scope">{{ scope.row.check_in_date }}</template>
      </el-table-column>

      <!-- Check-Out -->
      <el-table-column label="Check-Out" header-align="center" align="center">
        <template slot-scope="scope">{{ scope.row.check_out_date }}</template>
      </el-table-column>

      <!-- Role -->
      <el-table-column label="Role" header-align="center" align="center">
        <template slot-scope="scope">{{ scope.row.role}}</template>
      </el-table-column>

      <!-- Status -->
      <el-table-column label="Status" header-align="center" align="center">
        <template slot-scope="scope">{{ scope.row.status}}</template>
      </el-table-column>

      <!-- Phone -->
      <el-table-column
        v-if="hideColumn"
        label="Phone"
        show-overflow-tooltip
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>

      <!-- Email -->
      <el-table-column v-if="hideColumn" label="Email" show-overflow-tooltip header-align="center">
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>

      <!-- Distance -->
      <el-table-column label="Distance" header-align="center" align="center">
        <template slot-scope="scope">{{ scope.row.distance_to_event | distance}}</template>
      </el-table-column>

      <!-- Max payment -->
      <el-table-column label="Max Payment" header-align="center" align="center">
        <template slot-scope="scope">{{ scope.row.max_payment}}</template>
      </el-table-column>

      <!-- Share -->
      <el-table-column label="Share" header-align="center" align="center">
        <!-- Share accommodation -->
        <el-table-column label="Accommodation" header-align="center" align="center">
          <template slot-scope="scope">
            <i
              v-if="scope.row.ready_to_share_accommodation"
              class="el-icon-circle-check text-success"
            ></i>
            <i v-else class="el-icon-circle-close text-warning"></i>
          </template>
        </el-table-column>

        <!-- Share room -->
        <el-table-column label="Room" header-align="center" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.ready_to_share_room" class="el-icon-circle-check text-success"></i>
            <i v-else class="el-icon-circle-close text-warning"></i>
          </template>
        </el-table-column>
      </el-table-column>

      <!-- Plus one -->
      <el-table-column label="Plus One" header-align="center" align="center">
        <template slot-scope="scope">
          <i v-if=" scope.row.plus_one" class="el-icon-circle-check text-success"></i>
          <i v-else class="el-icon-circle-close text-warning"></i>
        </template>
      </el-table-column>
    </el-table>

    <formDialog />
  </div>
</template>

<script>
import formDialog from "@/components/formDialog";
import deleteButton from "@/components/deleteButton";
import addButton from "@/components/addButton";
export default {
  name: "myTable",
  components: {
    formDialog,
    addButton,
    deleteButton
  },
  props: {
    hideColumn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: false,
      selectedGuests: [],
      newGuest: {},

      currentRow: {
        email: ""
      }
    };
  },
  created() {
    this.$store.dispatch("readGuests");
  },
  computed: {
    listOfGuests() {
      return this.$store.getters.getGests;
    },

    isDisable() {
      return this.$store.getters.getIsDisable;
    }
  },
  methods: {
    cellClickHandler(row, column, cell, event) {
      this.$store.commit("CREATECURRENTGUEST", row);
      this.$store.commit("DIALOG", true);
    },

    // select guest
    handleSelectionChange(guests) {
      const selectedGuestsId = guests.map(guest => guest._id);
      this.$store.commit("SELECTEDGUESTS", selectedGuestsId);
    },
    // show guests contacts
    cellHoverHandler(row, column, cell, event) {
      this.currentRow.email = row.email;
    },
    cellLeaveHandler(row, column, cell, event) {
      this.currentRow.email = "";
    },
    guestCall(phone) {
      alert(phone);
    },
    guestEmail(email) {
      alert(email);
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  &__header {
    display: flex;
    margin: 0 15px 10px 15px;
  }
  &__action {
    display: flex;
    justify-content: space-between;
    width: 140px;
  }
}
.container {
  display: flex;
  justify-content: space-between;
}
</style>
