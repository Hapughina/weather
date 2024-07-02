<template>
  <div class="card">
    <CityRequestForm
        @cityReceived="handleCity"
        @showNotification="showNotification"
    />
  </div>
  <WeatherResponseByCity
      :key="city"
      :city="city"
      @showNotification="showNotification"
  />
</template>

<script>
import CityRequestForm from "@/components/cityRequestForm.vue";
import WeatherResponseByCity from "@/components/weatherResponseByCity.vue";


export default {
  emits: ['showNotification'],
  components: {WeatherResponseByCity, CityRequestForm},
  data() {
    return {
      city: '',
    };
  },
  methods:{
    handleCity (city) {
      this.city = '';
      this.$nextTick(() => {
        this.city = city;
      })
    },
    showNotification(message, type) {
      this.$emit('showNotification', message, type);
    }
  },

}
</script>

<style scoped>

.card{
  margin: 3rem 4rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>