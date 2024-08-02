<template>
  <q-layout view="hHh lpR fFf">
    <!-- <q-layout view="lHh Lpr lFf"> -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Pinke Pinke</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="bg-secondary"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      elevated
    >
      <q-list>
        <q-item-label header> Übersicht </q-item-label>
        <q-item
          v-for="link in linksList"
          :key="link.title"
          :to="link.link"
          clickable
          v-ripple
          exact
        >
          <q-item-section avatar>
            <q-icon color="primary" :name="link.icon" />
          </q-item-section>

          <q-item-section>
            {{ link.title }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Start",
    caption: "Current project",
    icon: "home",
    link: "/",
  },
  {
    title: "Settings",
    caption: "All the settings",
    icon: "settings",
    link: "/settings",
  },
  {
    title: "Export",
    caption: "Do the export",
    icon: "upgrade",
    link: "/export",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
