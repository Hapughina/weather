<template>
  <div>
    <HistoryTable
        @showNotification="showNotification"
    />
  </div>
</template>

<script>
import HistoryTable from "@/components/historyTable.vue";

export default {
  components: {HistoryTable},
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