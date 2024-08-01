<template>
  <q-table
    title="TRAActivities"
    class="bg-secondary"
    :rows="activityStore.activities"
    :columns="columns"
    row-key="name"
  />
</template>

<script setup>
import { ref } from "vue";
import { useActivityStore } from "src/stores/activity-store";

/*
Main setup
*/

defineOptions({
  name: "IndexPage",
});

const activityStore = useActivityStore();
/*
Data Setup
*/
const columns = [
  {
    name: "date",
    required: true,
    label: "TRADate",
    align: "left",
    field: "date",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "description",
    label: "TRADescription",
    align: "left",
    field: "description",
    sortable: true,
  },
  {
    name: "participants",
    label: "TRAParticipants",
    align: "left",
    field: "participants",
    format: (val) =>
      `${val
        .map((v) => v.label)
        .sort()
        .join(", ")}`,
    sortable: true,
  },
  {
    name: "amount",
    label: "TRAAmount",
    field: "amount",
    sortable: true,
    sort: (a, b) => parseFloat(a, 10) - parseFloat(b, 10),
  },
];
</script>
