<template>
  <q-table
    dense
    flat
    class="bg-secondary"
    :rows="participantStore.participants"
    :columns="columns"
    row-key="name"
  />
</template>

<script setup>
import { ref } from "vue";
import { useParticipantStore } from "src/stores/participant-store";

/*
Main setup
*/
const participantStore = useParticipantStore();

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
];
</script>
