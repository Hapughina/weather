<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header>
        <h6 class="modal-header">Delete operation is irreversible!</h6>
        <button
            type="button"
            class="btn-close"
            @click="close"
        >
          x
        </button>
      </header>
      <section class="modal-body">
        <h4>Are you sure you want to delete:</h4>
        <h4>{{ deriveItemString() }}</h4>
      </section>
      <footer class="modal-footer">
        <button
            type="button"
            class="btn btn-outline-secondary mr-3"
            @click="close"
        >
          Cancel
        </button>
        <button
            class="btn btn-outline-danger"
            @click="deleteItem"
        >
          Delete from table
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import {deleteWeatherItem} from "@/requests/weatherDBRequest.js";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  name: 'DeleteModal',
  methods: {
    close() {
      this.$emit('closeModals');
    },
    async deleteItem() {
      try {
        await deleteWeatherItem(this.item.id);
        this.$emit('successfulDeletedItem');
        this.$emit('showNotification', 'Weather successfully deleted from history', 'success');
      } catch (error) {
        console.log(error)
        this.$emit('showNotification', error.response.data.error.message || 'Something was wrong, try later', 'error')
      }
    },
    deriveItemString() {
      return `${this.item.date}  ${this.item.time}  ${this.item.city}  ${this.item.tempWithDegreeSign}  ${this.item.description}`
    }
  },
};
</script>


<style scoped>
.modal-backdrop {
  position: fixed;
  height: 200%;
  width: 200%;
  top: -50px;
  bottom: 0;
  left: -100px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 80;
}

.modal {
  background: #FFFFFF;
  border-radius: 10px;
  width: 50%;
  height: 280px;
  top: 25%;
  left: 25%;
  box-shadow: 2px 2px 20px 1px;
  display: flex;
  flex-direction: column;
  z-index: 90;
}

.modal-header {
  padding: 15px;
  display: flex;
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #000000;
  justify-content: space-between;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 30px 22px;
}

.btn-close {
  margin-right: 20px;
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #000000;
  background: transparent;
}

.btn{
  padding: .3rem 2rem;
  font-size: 1.2rem;
}

</style>