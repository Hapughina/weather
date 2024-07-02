<template>
  <div>
    <CityWeather
        @showNotification="showNotification"
    />
  </div>
</template>

<script>
import CityWeather from "@/components/cityWeather.vue";

export default {
  components: {CityWeather},
  emits: ['showNotification'],
  methods:{
    showNotification(message, type) {
      this.$emit('showNotification', message, type);
    }
  }
}
</script>

<style scoped>


</style>