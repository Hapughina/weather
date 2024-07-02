<template>
  <div class="form-row alert">
    <div class="form-group">
      <label for="inputCity">Select a city</label>
      <input type="text"
             :class="resolvePlaceholderClass()"
             id="inputCity"
             :placeholder="resolvePlaceholder()"
             v-model="city">
    </div>
  </div>
  <div class="form-group buttons-block">
    <button type="button"
            class="btn btn-outline-secondary"
            @click="clearForm"
    >Clear</button>
    <button @click="receiveCityName"
            type="submit"
            class="btn btn-outline-primary"
    >Find</button>
  </div>
</template>

<script>

export default {
  emits: ['cityReceived', 'showNotification'],
  data() {
    return {
      city: '',
      mistakeBefore: false,
    };
  },
  methods: {
    resolvePlaceholderClass(){
      if (this.city.length === 0 && this.mistakeBefore) {
        return "form-control red"
      } else {
        return "form-control"
      }
    },
    resolvePlaceholder() {
      if (this.city.length === 0 && this.mistakeBefore) {
        return "City name is required";
      } else {
        return 'Enter the name of the city';
      }
    },
    receiveCityName() {
      if(this.city.length !== 0){
        this.mistakeBefore = false;
        this.$emit('cityReceived', this.city);
        this.city = '';
      } else {
        this.$emit('showNotification', 'City name must be fulfilled', 'error');
        this.mistakeBefore = true;
      }
    },
    clearForm(){
      this.city = '';
    }
  }
}
</script>

<style scoped>

label{
  font-size: 20px;
}

.form-group{
  width: 100%;
}

.form-row{
  padding: 2rem 2rem .5rem 2rem;
}
label{
  margin-bottom: 1rem;
}
input{
  width: 100%;
  font-size: 1.2rem;
}
.buttons-block{
  display: flex;
  justify-content: end;
}
button{
  margin-right: 2rem;
  width: 13%;
  font-size: 1.2rem;
}
.red{
  border: 3px solid #f67474;
}

</style>


