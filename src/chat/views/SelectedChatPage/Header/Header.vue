<script setup lang="ts">
import {useChatStore} from "@/chat/domain/chatStore.js";
import {getChatName} from "@/chat/domain/Chat.js";

import AppHeader from "@/ui-kit/AppHeader/AppHeader.vue";
import ChatImage from "@/chat/views/common/Image/Image.vue";

const chatStore = useChatStore();
</script>

<template>
  <AppHeader>
    <div class="selected-chat-header">
      <div class="selected-chat-header__title" v-if="chatStore.chat">
        <ChatImage :url="chatStore.chat.image.url" :letters="getChatName(chatStore.chat)[0]" />
        <div class="selected-chat-header__name">{{ getChatName(chatStore.chat) }}</div>
      </div>
      <q-btn class="selected-chat-header__more" round flat icon="more_vert">
        <q-menu auto-close :offset="[110, 0]">
          <q-list style="min-width: 150px">
            <q-item clickable>
              <q-item-section>Contact data</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Block</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Select messages</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Silence</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Clear messages</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Erase messages</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </AppHeader>
</template>

<style lang="scss" scoped>
.selected-chat-header {
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &__title {
    display: flex;
    align-items: center;
    gap: 20px;
    width: calc(100% - 50px);
  }

  &__name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  &__more {
    width: 30px;
  }
}

@media (min-width: 691px) {
  .selected-chat-header {
    &__drawer-open {
      display: none;
    }
  }
}
</style>