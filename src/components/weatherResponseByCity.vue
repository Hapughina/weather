<template>
  <div class="weather-container">
    <div v-if="!cityData">
      <div class="alert alert-primary" role="alert">
        We are waiting for information about the city from you
      </div>

    </div>
    <div v-else>

      <div class="card" style="width: 24rem;">
        <div class="icon">
          <img class="card-img-top" id="cityIcon" alt="City Icon"
               :src="`http://openweathermap.org/img/w/${this.cityData.iconCode}.png`">
        </div>
        <div class="card-body">
          <h4 class="card-title">{{ this.cityData.city }}</h4>
          <p class="card-text">{{ this.cityData.date }}, {{ this.cityData.time }}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Temperature: {{ this.cityData.temperature }} °C</li>
          <li class="list-group-item">Description: {{ this.cityData.description }}</li>
        </ul>
        <div class=" modal-footer">
          <button @click="clearForm"
                  type="submit"
                  class="btn btn-outline-secondary mr-2">Clear</button>
          <button @click="savedWeather"
                  type="submit"
                  class="btn btn-outline-success">Save</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {fetchCityWeathers} from "@/requests/weatherApiRequest.js";
import {addWeatherItem} from "@/requests/weatherDBRequest.js";

export default {
  emits: ['showNotification'],
  props: {
    city: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      cityData: null,
    }
  },
  watch: {
    city: {
      handler(newCity) {
        if (newCity) {
          this.updateCityData();
        }
      },
      immediate: true,
    },
  },
  methods: {
    async updateCityData() {
      try {
        const fetchResult = await fetchCityWeathers(this.city);
        const dateTime = new Date(Date.now());
        this.cityData = {
          date: dateTime.toISOString().split('T')[0],
          time: dateTime.toLocaleTimeString(),
          city: fetchResult.name,
          temperature: Math.trunc(fetchResult.main.temp),
          description: fetchResult.weather[0].description,
          iconCode: fetchResult.weather[0].icon
        }
      } catch (error) {
        console.log(error)
        this.$emit(
            'showNotification',
            error.response.data.message.charAt(0).toUpperCase() + error.response.data.message.slice(1)
            || 'Something was wrong, try later', 'error')
      }
    },
    async savedWeather(){
      try {
        await addWeatherItem({
          date: this.cityData.date,
          time: this.cityData.time,
          city: this.cityData.city,
          temperature: this.cityData.temperature,
          description: this.cityData.description
        })
        this.$emit('showNotification', 'Weather successfully fetched and stored to history', 'success')
      } catch (error) {
        console.log(error)
        this.$emit('showNotification', 'Weather wasn\'t saved to history, try later', 'error')
      }
    },
    clearForm() {
      this.cityData = null;
    }
  },
}

</script>

<style scoped>
.weather-container {
  margin: 3rem 4rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2)
}

.card-img-top {
  width: 80px;
}

.icon {
  position: absolute;
  top: 0;
  right: 0;
}

.card {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

p, li{
  font-size: 1.2rem;
}

button{
  padding: .3rem 2rem;
  font-size: 1.2rem;
}
.alert{
  font-size: 1.1rem;
}

</style>