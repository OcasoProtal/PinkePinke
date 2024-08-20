<template>
  <q-page class="text-center bg-secondary">
    <div class="text-h4 q-py-md">TRADeveloper</div>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <q-btn
          class="q-mb-sm"
          icon="delete"
          color="primary"
          label="TRAClearActivities"
          @click="clearActivities"
        />
      </div>
      <div class="col-4"></div>
    </div>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <q-btn
          class="q-mb-sm"
          icon="delete"
          color="primary"
          label="TRAClearParticipants"
          @click="clearParticipants"
        />
      </div>
      <div class="col-4"></div>
    </div>
  </q-page>
</template>

<script setup>
import { useActivityStore } from "src/stores/activity-store";
import { useParticipantStore } from "src/stores/participant-store";

const activityStore = useActivityStore();
const participantsStore = useParticipantStore();

defineOptions({
  name: "DeveloperPage",
});

function clearActivities() {
  activityStore.clearAllActivities();
  console.log("clearDatabase");
}
function clearParticipants() {
  participantsStore.clearAllParticipants();
  console.log("clearDatabase");
}
</script>
