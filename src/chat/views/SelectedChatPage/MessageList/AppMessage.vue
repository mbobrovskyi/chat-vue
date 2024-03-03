<script setup lang="ts">
import {formatDate} from "@/chat/domain/formatDate.ts";
import {getUserFullName} from "@/common/domain/User.ts";
import {Message} from "@/chat/domain/Message.ts";
import {useAuthStore} from "@/common/domain/authStore.ts";
import Image from "@/chat/views/common/Image/Image.vue";
import {computed} from "vue";

const authStore = useAuthStore();

const props = defineProps<{
  message: Message;
}>();

const sent = computed<boolean>(() => {
  return authStore.user.id === props.message.createdBy;
});
</script>

<template>
  <q-chat-message
    class="app-message"
    :text="[message.text]"
    :stamp="formatDate(message.createdAt)"
    :sent="sent"
    :bg-color="sent ? 'amber-7' : 'primary'"
    :text-color="authStore.user.id !== message.createdBy ? 'white' : undefined"
  >
    <template #name>
      <span>{{getUserFullName(message.creator)}}&nbsp;</span>
      <q-spinner v-if="message.status === 1" />
    </template>

    <template #avatar>
      <Image
        v-if="!sent"
        class="app-message__image-left"
        :url="message.creator?.image.url"
        :letters="`${message.creator?.firstName[0]}`"
      />
    </template>
  </q-chat-message>
</template>

<style lang="scss" scoped>
.app-message {
  &__image-left {
    margin-right: 0.5rem;
  }
}
</style>