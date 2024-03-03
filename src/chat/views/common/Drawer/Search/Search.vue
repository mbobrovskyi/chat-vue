<script lang="ts" setup>
import {useChatsStore} from "@/chat/domain/chatsStore.ts";

const chatsStore = useChatsStore();
</script>

<template>
  <q-toolbar class="drawer-search">
    <q-input
      rounded
      outlined
      dense
      clearable
      debounce="500"
      class="chat__field full-width"
      bg-color="white"
      v-model="chatsStore.search"
      placeholder="Search"
      :loading="chatsStore.isLoading"
      @update:model-value="chatsStore.getChats"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
  </q-toolbar>
</template>

<style lang="scss" scoped>
.drawer-search {
  background-color: #f5f5f5;
}
</style>
