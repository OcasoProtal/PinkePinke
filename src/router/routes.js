import { LocalStorage } from "quasar";

const localStoreParticipants =
  JSON.parse(LocalStorage.getItem("Participants")) || [];

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => {
          if (localStoreParticipants.length) {
            return import("pages/IndexPage.vue");
          } else {
            return import("pages/SettingsPage.vue");
          }
        },
      },
      { path: "/settings", component: () => import("pages/SettingsPage.vue") },
      { path: "/export", component: () => import("pages/ExportPage.vue") },
      { path: "/devel", component: () => import("pages/DeveloperPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
