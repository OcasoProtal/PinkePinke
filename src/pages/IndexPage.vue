<template>
  <q-page class="text-center bg-secondary">
    <div class="text-h4 q-py-md">{{ activityName }}</div>
    <div class="row">
      <div class="col">
        <!-- Date -->
        <input type="hidden" name="activityid" :value="id" />
        <q-input
          outlined
          v-model="date"
          label="TRADate"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <!-- Description -->
        <q-input outlined label="TRADescription" v-model="description" />
      </div>
    </div>
    <div class="row items-end q-pb-sm">
      <div class="col-6">
        <!-- Lender -->
        <q-select
          v-model="lender"
          :options="allPersons"
          outlined
          label="TRALender"
          class="q-pt-lg"
        />
      </div>
      <div class="col-4">
        <q-input
          outlined
          label="TRAAmount"
          v-model.number="amount"
          class="q-mt-lg"
        />
      </div>
      <div class="col-2">
        <q-btn
          round
          class="q-mb-sm"
          icon="add"
          color="primary"
          :disable="lenderDisabled"
          @click="addLender"
        />
      </div>
    </div>
    <div class="row" v-show="lenders" v-for="l in lenderList" :key="l.lender">
      <div class="col-6">
        <div class="float-right q-pr-sm">{{ l.lender.label }}</div>
      </div>
      <div class="col-6">
        <div class="float-left q-pl-sm">{{ l.amount }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <!-- Participants -->
        <q-select
          v-model="participants"
          :options="allPersons"
          outlined
          multiple
          label="TRAParticipants"
          class="q-pt-lg"
        />
      </div>
    </div>
    <div class="row q-pt-lg">
      <div class="col">
        <q-btn
          color="primary"
          icon="cancel"
          label="TRAClear"
          @click="clearActivity"
        />
      </div>
      <div class="col">
        <q-btn
          color="primary"
          icon="check_circle"
          label="TRASave"
          @click="addActivity"
        />
      </div>
    </div>
    <ActivityList />
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { uid } from "quasar";
import { useActivityStore } from "src/stores/activity-store";
import ActivityList from "src/components/ActivityList.vue";

/*
Main setup
*/

defineOptions({
  name: "IndexPage",
});

const activityStore = useActivityStore();
const activityName = "ActivityName";

/*
Data setup
*/
const id = ref("");
const date = ref("");
const description = ref("");
const participants = ref(null);
const allPersons = ref(
  [
    { label: "Horst", value: "1" },
    { label: "Schorsch", value: "2" },
    { label: "Dieter", value: "3" },
    { label: "Fröhn", value: "40" },
    { label: "Monaco Franze", value: "11" },
    { label: "Baby Schimmerlos", value: "21" },
  ].sort((a, b) => {
    const nameA = a.label.toUpperCase(); // ignore upper and lowercase
    const nameB = b.label.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  })
);
const amount = ref(0.0);
const lender = ref(null);
const lenderList = ref([]);
let lenders = false;

const lenderDisabled = computed(() => {
  return !lender.value || amount.value <= 0;
});

/*
Actions
*/
function addActivity() {
  if (lender.value && amount.value) {
    lenderList.value.push({ lender: lender.value, amount: amount.value });
  }
  activityStore.addActivity({
    id: id.value ? id.value : uid(),
    date: date.value,
    description: description.value,
    participants: participants.value,
    amount: lenderList.value.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    ),
    lenders: lenderList.value,
  });
  clearActivity();
}

function clearActivity() {
  id.value = "";
  date.value = null;
  description.value = "";
  lender.value = null;
  lenderList.value = [];
  participants.value = null;
  amount.value = 0.0;
  lenders = false;
}

function addLender() {
  lenderList.value.push({ lender: lender.value, amount: amount.value });
  allPersons.value = allPersons.value.filter((p) => {
    return p.label != lender.value.label && p.value != lender.value.value;
  });
  lender.value = null;
  amount.value = null;
  console.log(JSON.parse(JSON.stringify(lenderList.value)));
  lenders = true;
}
</script>
