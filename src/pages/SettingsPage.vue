<template>
  <q-page class="text-center bg-secondary">
    <div class="text-h4 q-py-md">TRASettings</div>

    <div class="row">
      <div class="text-h6 q-py-md float-left">TRAParticipants</div>
    </div>
    <div class="row">
      <div class="col-5">
        <q-input outlined label="TRAName" v-model="name" />
      </div>
      <div class="col-5">
        <q-input outlined label="TRAMail" type="email" v-model="mail" />
      </div>
      <div class="col">
        <q-btn round color="primary" icon="add" @click="addParticipant" />
      </div>
    </div>
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

/*
Main setup
*/
const participantStore = useParticipantStore();

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
</script>
