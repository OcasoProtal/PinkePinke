<template>
  <q-page class="text-center bg-secondary">
    <div class="row">
      <div class="col">
        <!-- Date -->
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
    <div class="row">
      <div class="col">
        <q-input
          outlined
          label="TRAAmount"
          v-model.number="amount"
          class="q-mt-lg"
        />
      </div>
    </div>
    <div class="row q-pt-lg">
      <div class="col">
        <q-btn color="primary" icon="cancel" label="TRAClear" />
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
import { ref } from "vue";
import { useActivityStore } from "src/stores/activity-store";
import ActivityList from "src/components/ActivityList.vue";

/*
Main setup
*/

defineOptions({
  name: "IndexPage",
});

const activityStore = useActivityStore();

/*
Data setup
*/
const date = ref("");
const description = ref("");
const participants = ref(null);
const allPersons = ref([
  { label: "Horst", value: "1" },
  { label: "Schorsch", value: "2" },
  { label: "Dieter", value: "3" },
]);
const amount = ref(0.0);

/*
Actions
*/
function addActivity() {
  console.log(date.value);
  activityStore.addActivity({
    date: date.value,
    description: description.value,
    participants: participants.value,
    amount: amount.value,
  });
}
</script>
