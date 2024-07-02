<template>
  <div class="table-container">
    <EasyDataTable class="customize-table"
                   :headers="headers"
                   :items="items"
                   :sort-by="'dateTime'"
                   :sort-type="'desc'"
                   border-cell
                   alternating
    >

      <template #item-operation="item">
        <img
            alt="icon edit"
            src="../../public/edit.png"
            class="ml-4"
            @click="showEditModal(item)"
            data-toggle="modal" data-target="#exampleModal"
        />
        <img
            class="img-delete ml-4"
            alt="icon delete"
            src="../../public/delete.png"
            @click="showDeleteModal(item)"
        />
      </template>
    </EasyDataTable>
    <DeleteModal
        v-show="isDeleteModalVisible"
        @closeModals="closeModals"
        @successfulDeletedItem="closeModalsAndUpdate"
        @showNotification="showNotification"
        :item="currentElem"
    />
    <EditModal
        v-show="isEditModalVisible"
        @closeModals="closeModals"
        @successfulEditedItem="closeModalsAndUpdate"
        @showNotification="showNotification"
        :item="currentElem"
    />
  </div>
</template>


<script>
import {fetchWeathers} from "@/requests/weatherDBRequest.js";
import DeleteModal from "@/components/deleteModal.vue";
import EditModal from "@/components/editModal.vue";

export default {
  emits: ['showNotification'],
  components: {
    EditModal,
    DeleteModal,
    EasyDataTable: window['vue3-easy-data-table'],
  },
  data() {
    return {
      isDeleteModalVisible: false,
      isEditModalVisible: false,
      currentElem: {},
      headers: [
        {text: "Date and Time", value: "dateTime", sortable: true, },
        {text: "CITY", value: "city",},
        {text: "TEMPERATURE", value: "tempWithDegreeSign", },
        {text: "DESCRIPTION", value: "description", },
        {text: "Operation", value: "operation", },
      ],
      items: [],
    }
  },
  mounted() {
    this.getWeathers();
  },
  methods: {
    showNotification(message, type) {
      this.$emit('showNotification', message, type);
    },
    closeModals: function () {
      this.isDeleteModalVisible = false;
      this.isEditModalVisible = false;
    },
    closeModalsAndUpdate: function () {
      this.closeModals();
      this.getWeathers();
    },
    showDeleteModal(item) {
      this.currentElem = item
      this.isDeleteModalVisible = true;
    },
    showEditModal(item) {
      this.currentElem = item;
      this.isEditModalVisible = true;
    },
    async getWeathers() {
      try {
        const fetchResult = await fetchWeathers()
        fetchResult.forEach(el => {
          el.dateTime = el.date + " " + el.time
          el.tempWithDegreeSign = el.temperature + "°C"
        })
        this.items = fetchResult
      } catch (error){
        this.showNotification(error.response.data.error.message || 'Something was wrong, try later', 'error')
      }
    },
  }
}
</script>

<style scoped>
div {
  margin: 3rem ;
}

img {
  height: 28px;
}

.img-delete{
  height: 36px;
}

.customize-table {
  --easy-table-border: 2px solid #445269;
  --easy-table-row-border: 1px solid #1f252e;

  --easy-table-header-font-size: 1.3rem;
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #2b5995;
  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-row-font-size: 1.1rem;

  --easy-table-footer-font-size: 1rem;
  --easy-table-footer-padding: 22px 10px;
}

button {
  margin-right: 10px;
}


</style>