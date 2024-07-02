<template>
  <transition name="fade">
    <div v-if="show" class="notification" :class="type">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: ['message', 'type'],
  data() {
    return {
      show: false
    };
  },
  methods: {
    displayNotification() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    }
  },
  watch: {
    message: {
      handler(newVal) {
        if (newVal !== '') {
          this.displayNotification();
        }
      },
      immediate: true,
    }
  }
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 6%;
  right: 8%;
  padding: 10px 20px;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  z-index: 99;
  font-size: 1.2rem;
}
.notification.success {
  border-color: #1dbc21;
  color: #215c23;
  z-index: 99;
}
.notification.error{
  border-color: #ff0000;
  color: #ff0000;
  z-index: 99;
}
</style>