<script setup lang="ts">
import {reactive, ref} from "vue";
import {useAuthStore} from "@/common/domain/authStore.js";
import {useNotifyStore} from "@/common/domain/notifyStore.ts";
import formValidation from "@/infrastructure/validation/formValidation.ts";
import type {SignUpEntity} from "@/user/domain/SignUpEntity.ts";

const authStore = useAuthStore();
const notifyStore = useNotifyStore();

const emptySignUpEntity: SignUpEntity = {
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  repeatPassword: "",
};

const signUpEntity = reactive<SignUpEntity>({ ...emptySignUpEntity });
const autofillUsername = ref<boolean>(true);
const showPassword = ref<boolean>(false);
const showRepeatPassword = ref<boolean>(false);
const loading = ref<boolean>(false);
const emailError = ref<string>();
const usernameError = ref<string>();

const changeUsername = (val?: string) => {
  if (!autofillUsername.value) {
    return;
  }

  const parts = val?.split("@");
  if (parts && parts[0]) {
    signUpEntity.username = parts[0];
  } else {
    signUpEntity.username = val || "";
  }
};

async function signUp() {
  try {
    loading.value = true;
    await authStore.signUp(signUpEntity);
  } catch (err: any) {
    if (err?.response?.data?.type === 'UserAlreadyCreatedError') {
      if (err?.response?.data?.data?.email) {
        emailError.value = "Email already exist";
      }
      if (err?.response?.data?.data?.username) {
        usernameError.value = "Username already exist";
      }
    } else {
      notifyStore.axiosError(err);
    }
  } finally {
    loading.value = true;
  }
}
</script>

<template>
  <div class="sign-up-page">
    <q-card square class="sign-up-page__card">
      <q-form @submit="signUp">
        <q-card-section>
          <div class="sign-up-page__title">Sign Up</div>
        </q-card-section>
        <q-card-section class="sign-up-page__card-section">
          <q-input
            label="First Name"
            name="firstName"
            required
            v-model="signUpEntity.firstName"
            lazy-rules="ondemand"
            :rules="[
              formValidation.required,
              formValidation.minLength(1),
              formValidation.maxLength(50),
              formValidation.name,
            ]"
          />
          <q-input
            label="Last Name"
            name="lastName"
            required
            v-model="signUpEntity.lastName"
            lazy-rules="ondemand"
            :rules="[
              formValidation.required,
              formValidation.minLength(1),
              formValidation.maxLength(50),
              formValidation.name,
            ]"
          />
          <q-input
            label="Email"
            name="email"
            required
            v-model="signUpEntity.email"
            lazy-rules="ondemand"
            :rules="[
              formValidation.required,
              formValidation.minLength(3),
              formValidation.maxLength(255),
              formValidation.email,
            ]"
            @update:model-value="changeUsername"
            :error="emailError ? true : undefined"
            :error-message="emailError"
          />
          <q-input
            label="Username"
            name="username"
            required
            v-model="signUpEntity.username"
            lazy-rules="ondemand"
            :rules="[
              formValidation.required,
              formValidation.minLength(3),
              formValidation.maxLength(50),
            ]"
            :error="usernameError ? true : undefined"
            :error-message="usernameError"
          />
          <q-input
            label="Password"
            name="password"
            :type="showPassword ? 'text' : 'password'"
            lazy-rules="ondemand"
            required
            v-model="signUpEntity.password"
            :rules="[
              formValidation.required,
              formValidation.minLength(8),
              formValidation.maxLength(255),
              formValidation.password,
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="!showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
          <q-input
            label="Repeat Password"
            name="repeatPassword"
            :type="showRepeatPassword ? 'text' : 'password'"
            required
            v-model="signUpEntity.repeatPassword"
            lazy-rules="ondemand"
            :rules="[
              formValidation.required,
              formValidation.minLength(8),
              formValidation.maxLength(255),
              formValidation.password,
              () => formValidation.comparePasswords(signUpEntity.password, signUpEntity.repeatPassword)
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="!showRepeatPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showRepeatPassword = !showRepeatPassword"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions class="sign-up-page__actions">
          <q-btn
            label="Sign Up"
            class="sign-up-page__btn"
            color="primary"
            type="submit"
            :loading="loading"
          />
        </q-card-actions>
      </q-form>

      <q-card-section class="sign-up-page__have-an-account">
        <div>Have an account?</div>
        <router-link :to="{name: 'sign-in'}">Sign in</router-link>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss" scoped>
.sign-up-page {
  width: 100%;
  max-width: 35rem;
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

  &__card-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }

  &__btn {
    width: 100%;
  }

  &__actions {
  }

  &__have-an-account {
    display: flex;
    gap: 1rem;

    a {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}

@media (max-width: 480px) {
  .sign-up-page {
    height: 100%;

    &__card {
      box-shadow: none;
    }

    &__card-section {
      display: grid;
      grid-template-columns: 1fr;
      column-gap: 1rem;
    }
  }
}
</style>