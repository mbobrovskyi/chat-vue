<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useAuthStore} from "@/common/domain/authStore.js";
import {useNotifyStore} from "@/common/domain/notifyStore.ts";

const authStore = useAuthStore();

const username = ref<string>("");
const password = ref<string>("");
const loading = ref<boolean>(false);

async function signIn() {
  try {
    loading.value = true;
    await authStore.signIn(username.value, password.value);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="sign-in-page">
    <q-card square class="sign-in-page__card">
      <q-form @submit="signIn">
        <q-card-section>
          <div class="sign-in-page__title">Sign In</div>
        </q-card-section>
        <q-card-section>
          <q-input
            label="Email or username"
            name="username"
            required
            autofocus
            v-model="username"
          />
          <q-input
            label="Password"
            name="password"
            type="password"
            required
            v-model="password"
          />
        </q-card-section>
        <q-card-actions class="sign-in-page__actions">
          <q-btn
            label="Sign In"
            class="sign-in-page__btn"
            color="primary"
            type="submit"
            :loading="loading"
          />
        </q-card-actions>
      </q-form>

      <q-card-section class="sign-in-page__sign-up">
        <div>Don't have an account?</div>
        <router-link :to="{name: 'sign-up'}">Sign up</router-link>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss" scoped>
.sign-in-page {
  width: 100%;
  max-width: 25rem;
  max-height: 100%;

  &__title {
    font-size: 1.4rem;
    font-weight: 500;
  }

  &__card {
    height: max-content;
    width: 100%;
    padding: 1rem 1rem;
  }

  &__btn {
    width: 100%;
  }

  &__actions {
  }

  &__sign-up {
    display: flex;
    gap: 1rem;

    a {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}

@media (max-width: 400px) {
  .sign-in-page {
    height: 100%;

    &__card {
      box-shadow: none;
    }
  }
}
</style>