<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useChatStore} from "@/chat/domain/chatStore.ts";

import AppSpinner from "@/ui-kit/AppSpinner/AppSpinner.vue";
import MessengerLayout from "@/layouts/MessengerLayout.vue";
import Header from "@/chat/views/SelectedChatPage/Header/Header.vue";
import Drawer from "@/chat/views/common/Drawer/Drawer.vue";
import Messages from "@/chat/views/SelectedChatPage/MessageList/MessageList.vue";
import Footer from "@/chat/views/SelectedChatPage/Footer/Footer.vue";

const route = useRoute();
const chatStore = useChatStore();

const isDrawerOpen = ref(false);

onMounted(async () => {
  await chatStore.getChat(Number(route.params.id));
});

onUnmounted(() => {
  chatStore.clear();
});
</script>

<template>
  <MessengerLayout v-model:is-drawer-open="isDrawerOpen">
    <template #header>
      <Header @openDrawer="isDrawerOpen = true" />
    </template>

    <template #drawer>
      <Drawer @closeDrawer="isDrawerOpen = false" />
    </template>

    <q-page class="selected-chat-page">
      <AppSpinner v-if="chatStore.isLoadingChat" size="3em" />
      <Messages v-else-if="chatStore.chat" />
    </q-page>

    <template #footer>
      <Footer />
    </template>
  </MessengerLayout>
</template>

<style lang="scss">
.selected-chat-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-height: calc(100vh - 150px);
  width: 100%;
}
</style>