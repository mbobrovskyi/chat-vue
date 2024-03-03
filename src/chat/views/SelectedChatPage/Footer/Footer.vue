<script setup lang="ts">
import {ref} from "vue";
import {useChatStore} from "@/chat/domain/chatStore.js";

const chatStore = useChatStore();
const message = ref("");

function handleSendMessage() {
  if (message.value.length > 0) {
    chatStore.sendMessage(message.value);
    message.value = "";
  }
}

function handleMic() {
  if (message.value.length === 0) {
    return handleSendMessage();
  }
}
</script>

<template>
  <q-form @submit="handleSendMessage">
    <q-toolbar class="bg-grey-3 text-black row">
      <q-btn round flat icon="attachment" class="q-mr-sm rotate-135" />
      <q-input
        rounded
        outlined
        dense
        class="chat__field col-grow q-mr-sm"
        bg-color="white"
        v-model="message"
        placeholder="Type a message"
      />
      <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
      <q-btn round flat :icon="message.length > 0 ? 'send' : 'mic'" @click="handleMic" />
    </q-toolbar>
  </q-form>
</template>

<style lang="scss"></style>