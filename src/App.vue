<template>
  <div>
    <navBar></navBar>
    <router-view
        @showNotification="showNotification"
    ></router-view>
    <notification :message="notificationMessage" :type="notificationType"/>
  </div>
</template>

<script>
import NavBar from "@/components/navBar.vue";
import Notification from "@/components/notification.vue";

export default {
  components: {Notification, NavBar},
  data(){
    return{
      notificationMessage: '',
      notificationType: '',
    }
  },
  methods:{
    showNotification(message, type){
      this.notificationMessage = '';
      this.notificationType = type
      this.$nextTick(() => {
        this.notificationMessage = message;
      })
    }
  }

}
</script>

<style >

</style>