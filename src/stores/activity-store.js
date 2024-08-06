import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

export const useActivityStore = defineStore("activity", () => {
  // State
  const localStoreActivities =
    JSON.parse(LocalStorage.getItem("Activities")) || [];
  const activities = ref(localStoreActivities);

  // Getters
  const count = computed(() => activities.value.length);

  // Actions
  function addActivity(activity) {
    activities.value.push(activity);
    LocalStorage.setItem("Activities", JSON.stringify(activities.value));
  }
  return { activities, count, addActivity };
});
