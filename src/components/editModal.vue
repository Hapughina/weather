<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header>
        <h6 class="modal-header">Update operation is irreversible!</h6>
        <button
            type="button"
            class="btn-close"
            @click="close"
        >
          x
        </button>
      </header>
      <section class="modal-body">
        <div class="mb-4">
          <div class="input-block">
            <h4>Date:</h4>
            <input class="modal-input"
                   id="date"
                   v-model="date"
                   @input="validateInput">
          </div>
          <p v-if="!isValidDateFormat">The date must be in the format: YYYY-MM-DD</p>
        </div>
        <div>
          <div class="input-block">
            <h4>Time:</h4>
            <input class="modal-input"
                   id="time"
                   v-model="time"
                   @input="validateTimeInput">
          </div>
          <p v-if="!isValidTimeFormat">The time must be in the format: HH:MM:SS</p>
        </div>
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
            class="btn btn-outline-success"
            :disabled="isButtonDisabled"
            @click="editItem"
        >
          Save changes
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import {editWeatherItem} from "@/requests/weatherDBRequest.js";

export default {
  data() {
    return {
      date: '',
      time: '',
      isValidDateFormat: true,
      isValidTimeFormat: true,
      isButtonDisabled: true,
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  watch:{
    item(newValue) {
      this.date = newValue.date;
      this.time = newValue.time;
    }
  },
  name: "EditModal",
  methods: {
    close() {
      this.$emit('closeModals');
      this.isValidDateFormat = true;
      this.isValidTimeFormat = true;
      this.isButtonDisabled = true;
    },
    validateInput() {
      this.isValidDateFormat = this.$moment(this.date, "YYYY-MM-DD", true).isValid()
      const isDateUnchanged = this.date === this.item.date;
      this.isButtonDisabled = !this.isValidDateFormat || isDateUnchanged;
    },
    validateTimeInput(){
      this.isValidTimeFormat = this.$moment(this.time, "HH:mm:ss", true).isValid();
      const isTimeUnchanged = this.time === this.item.time;
      this.isButtonDisabled = !this.isValidTimeFormat || isTimeUnchanged;
    },
    async editItem() {
      try{
        await editWeatherItem({
          id: this.item.id,
          date: this.date,
          time: this.time,
          city: this.item.city,
          temperature: this.item.temperature,
          description: this.item.description
        })
        this.$emit('successfulEditedItem');
        this.$emit('showNotification', 'Weather successfully changed and stored to history', 'success');
      } catch(error) {
        console.log(error)
        this.$emit('showNotification', error.response.data.error.message || 'Something was wrong, try later', 'error')
      }
      this.isButtonDisabled = true;
    }
  }
}
</script>

<style  scoped>
p{
  color: #d50101;
  margin: 5px 0 0 0;
}
.input-block{
  display: flex;
  align-items: baseline;
}

input{
  font-size: 1.2rem;
  padding: 4px 10px 4px 10px;
  border-radius: 5px;
  border: 1px solid #393939;
}

h4{
  margin-right: 14px;
}

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
  width: 40%;
  height: 350px;
  top: 23%;
  left: 30%;
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
  padding: 15px;
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 30px;
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