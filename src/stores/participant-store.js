import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

export const useParticipantStore = defineStore("participant", () => {
  const localStoreParticipants =
    JSON.parse(LocalStorage.getItem("Participants")) || [];
  const participants = ref(localStoreParticipants);
  const count = computed(() => participants.value.length);
  function addParticipant(participant) {
    participants.value.push(participant);
    LocalStorage.setItem("Participants", JSON.stringify(participants.value));
  }
  function clearAllParticipants() {
    LocalStorage.remove("Participants");
  }
  return { participants, count, addParticipant, clearAllParticipants };
});
