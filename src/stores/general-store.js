import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

export const useGeneralSettingsStore = defineStore("general", () => {
  // State
  const localStoreGeneralSettings =
    JSON.parse(LocalStorage.getItem("General")) || {};
  const generalSettings = ref(localStoreGeneralSettings);

  // Actions
  function setActivityName(activityName) {
    generalSettings.value["ActivityName"] = activityName;
    LocalStorage.setItem("General", JSON.stringify(generalSettings.value));
  }

  function clearAllGeneralSettings() {
    LocalStorage.remove("General");
  }

  return {
    generalSettings,
    setActivityName,
    clearAllGeneralSettings,
  };
});
