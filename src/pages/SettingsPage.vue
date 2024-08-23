<template>
  <q-page class="text-center bg-secondary">
    <div class="text-h4 q-py-md">TRASettings</div>

    <div class="row">
      <div class="col-5 text-h6">TRAActivityName</div>
      <div class="col-6">
        <q-input
          outlined
          label="TRAActivityName"
          v-model="activityName"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'TRAActivityNameMissing',
          ]"
          @keyup.enter="activityNameChanged"
          @blur="activityNameChanged"
        />
      </div>
    </div>

    <div class="text-h5">TRAParticipants</div>
    <div
      class="text-warning q-pt-md"
      v-if="participantStore.participants.length === 0"
    >
      TRAParticipantsMissingWarning
    </div>

    <q-form @submit="addParticipant" class="q-gutter-md">
      <div class="row items-start q-pt-md">
        <div class="col-5">
          <q-input
            outlined
            label="TRAName"
            v-model="name"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'TRANameMissing']"
          />
        </div>
        <div class="col-5">
          <q-input
            outlined
            label="TRAMail"
            type="email"
            v-model="mail"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'TRAMailMissing',
              (val, rules) =>
                rules.email(val) || 'Please enter a valid email address',
            ]"
          />
        </div>
        <div class="col">
          <q-btn round color="primary" icon="add" type="submit" />
        </div>
      </div>
    </q-form>
    <div class="row">
      <div class="col">
        <ParticipantsList />
      </div>
    </div>
  </q-page>
</template>

<script setup>
/*
Imports
*/
import { ref } from "vue";
import ParticipantsList from "src/components/ParticipantsList.vue";
import { useParticipantStore } from "src/stores/participant-store";
import { useGeneralSettingsStore } from "src/stores/general-store";

/*
Main setup
*/
const participantStore = useParticipantStore();
const generalSettingsStore = useGeneralSettingsStore();

const activityName = ref(
  generalSettingsStore.generalSettings["ActivityName"] || ""
);

const name = ref("");
const mail = ref("");

/*
Data setup
*/

/*
Actions
*/
function addParticipant() {
  console.log(name.value, mail.value);
  participantStore.addParticipant({
    name: name.value,
    mail: mail.value,
  });
  name.value = "";
  mail.value = "";
}
function activityNameChanged(event) {
  generalSettingsStore.setActivityName(activityName.value);
  event.target.blur();
}
</script>
