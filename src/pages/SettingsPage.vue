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
      <ParticipantsList />
    </div>
  </q-page>
</template>

<script setup>
/*
Imports
*/
import { ref } from "vue";
import ParticipantsList from "src/components/ParticipantsList.vue";

/*
Main setup
*/

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
}
</script>
