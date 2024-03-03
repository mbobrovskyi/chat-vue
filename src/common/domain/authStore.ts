import {defineStore} from "pinia";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {authContext, userContext} from "../../user/infrastructure/context.ts";
import {UserService} from "../../user/domain/UserService.ts";
import {AuthService} from "../../user/domain/AuthService.ts";
import {ApiCore} from "../../infrastructure/api";
import {User} from "@/common/domain/User.ts";
import {useNotifyStore} from "@/common/domain/notifyStore.ts";
import {SignUpEntity} from "@/user/domain/SignUpEntity.ts";

export const useAuthStore = defineStore("auth", () => {
  const apiCore = authContext.getPublic<ApiCore>("ApiCore");
  const authService = authContext.get<AuthService>("AuthService");
  const userService = userContext.get<UserService>("UserService");

  const router = useRouter();
  const notifyStore = useNotifyStore();

  const isFirstLoading = ref<boolean>(true);
  const isSignInLoading = ref<boolean>(false);
  const isSignUpLoading = ref<boolean>(false);
  const isGetCurrentUserLoading = ref<boolean>(false);

  const user = ref<User | null>(null);

  async function signIn(username: string, password: string): Promise<void> {
    try {
      isSignInLoading.value = true;
      const token = await authService.signIn(username, password);
      user.value = token.user || null;
      delete token.user;
      apiCore.setToken(token);
      await router.push({ name: "main" });
      isFirstLoading.value = false;
    } catch (err: any) {
      if (err.response?.data?.type === "UnauthorizedError") {
        notifyStore.error("Invalid credentials");
      } else {
        notifyStore.axiosError(err);
      }
    } finally {
      isSignInLoading.value = false;
    }
  }

  async function signUp(signUpEntity: SignUpEntity): Promise<void> {
    try {
      isSignUpLoading.value = true;
      const token = await authService.signUp(signUpEntity);
      user.value = token.user || null;
      delete token.user;
      apiCore.setToken(token);
      await router.push({ name: "main" });
      isFirstLoading.value = false;
    } catch (err: any) {
      if (err?.response?.data?.type === 'UserAlreadyCreatedError') {
        throw err;
      } else {
        notifyStore.axiosError(err);
      }
    } finally {
      isSignUpLoading.value = false;
    }
  }

  async function signOut(): Promise<void> {
    try {
      await authService.signOut();
      apiCore.removeToken();
      await router.push({ name: "sign-in" });
    } catch (err: any) {
      notifyStore.axiosError(err);
    }
  }

  async function getCurrentUser(): Promise<void> {
    try {
      isGetCurrentUserLoading.value = true;
      user.value = await userService.getCurrentUser();
    } catch (err: any) {
      notifyStore.axiosError(err);
    } finally {
      isFirstLoading.value = false;
      isGetCurrentUserLoading.value = false;
    }
  }

  function resetStore() {
    isFirstLoading.value = true;
    isSignInLoading.value = false;
    isGetCurrentUserLoading.value = false;
    user.value = null;
  }

  return {
    isFirstLoading,
    isSignInLoading,
    isGetCurrentUserLoading,
    user,
    signIn,
    signUp,
    signOut,
    getCurrentUser,
    resetStore,
  };
});