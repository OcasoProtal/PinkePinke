import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

export const useActivityStore = defineStore("activity", () => {
  const localStoreActivities =
    JSON.parse(LocalStorage.getItem("Activities")) || [];
  const activities = ref(localStoreActivities);
  const count = computed(() => activities.value.length);
  function addActivity(activity) {
    activities.value.push(activity);
    LocalStorage.setItem("Activities", JSON.stringify(activities.value));
  }
  return { activities, count, addActivity };
});
