import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useActivityStore = defineStore("activity", () => {
  const activities = ref([]);
  const count = computed(() => activities.value.length);
  function addActivity(activity) {
    activities.value.push(activity);
  }
  return { activities, count, addActivity };
});
