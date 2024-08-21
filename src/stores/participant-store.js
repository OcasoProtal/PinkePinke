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

  function deleteParticipant(participantMail) {
    console.log("TBD.", participantMail);
    // participants.value.push(participant);
    // LocalStorage.setItem("Participants", JSON.stringify(participants.value));
  }

  function clearAllParticipants() {
    LocalStorage.remove("Participants");
    localStoreParticipants.value = [];
    participants.value = [];
  }
  return {
    participants,
    count,
    addParticipant,
    deleteParticipant,
    clearAllParticipants,
  };
});
