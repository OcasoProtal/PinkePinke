<template>
  <q-table
    dense
    flat
    class="bg-secondary"
    :rows="participantStore.participants"
    :columns="columns"
    row-key="name"
  >
    <template v-slot:body-cell-actions="mail">
      <q-td :props="mail">
        <q-btn
          round
          size="xs"
          color="primary"
          icon="delete"
          type="submit"
          @click="confirmDelete(mail.value)"
        />
      </q-td>
    </template>
  </q-table>
  <q-dialog
    v-model="deleteConfirm"
    persistent
    backdrop-filter="blur(4px) saturate(50%)"
    transition-show="slide-down"
  >
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="question_mark" color="primary" text-color="white" />
        <span class="q-ml-sm text-h6">TRAConfirmDelete</span>
      </q-card-section>

      <q-card-section class="row items-left">
        <span class="q-ml-sm">{{ deleteName }}:</span>
        <span class="q-ml-sm">{{ deleteMail }}</span>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn
          flat
          label="OK"
          color="primary"
          v-close-popup
          @click="deleteParticipant"
        />
        <q-btn flat label="Cancel" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useParticipantStore } from "src/stores/participant-store";

/*
Main setup
*/
const participantStore = useParticipantStore();
const deleteConfirm = ref(false);
const deleteName = ref("");
const deleteMail = ref("");

/*
Data Setup
*/
const columns = [
  {
    name: "name",
    required: true,
    label: "TRAName",
    align: "left",
    field: "name",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "mail",
    label: "TRAMAIL",
    align: "left",
    field: "mail",
    sortable: true,
  },
  ,
  {
    name: "actions",
    align: "right",
    required: true,
    field: "mail",
  },
];

/*
Methods
*/
function confirmDelete(mail) {
  deleteName.value = "Lorem";
  deleteMail.value = mail;
  deleteConfirm.value = true;
}
function deleteParticipant(mail) {
  participantStore.deleteParticipant(deleteMail.value);
}
</script>
