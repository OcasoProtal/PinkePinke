<template>
  <q-table
    dense
    flat
    title="TRAActivities"
    class="bg-secondary"
    :rows="activityStore.activities"
    :columns="columns"
    row-key="row.id"
  />
  <div class="row" v-if="total">
    <div class="col-2 text-right text-h6">TRATotal:</div>
    <div class="col-1"></div>
    <div class="col text-left text-h6">{{ total }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useActivityStore } from "src/stores/activity-store";

/*
Main setup
*/
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
    name: "lenders",
    label: "TRALenders",
    field: (row) => row.lenders.map((l) => l.lender.label).join(", "),
    sortable: true,
  },
  {
    name: "id",
    label: "TRAAmount",
    field: (row) =>
      row.lenders.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
      ),
    sortable: true,
    sort: (a, b) => parseFloat(a, 10) - parseFloat(b, 10),
  },
];

const total = computed(() => {
  console.log(JSON.parse(JSON.stringify(activityStore.activities)));
  return activityStore.activities.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );
});
</script>
