import { Context, createContext } from "@/infrastructure/context";

import {AuthRepoImpl} from "../api/AuthRepoImpl.ts";
import {AuthService} from "../domain/AuthService.ts";

import {UserRepoImpl} from "../api/UserRepoImpl.ts";
import {UserService} from "../domain/UserService.ts";

export let authContext: Context;
export let userContext: Context;

export function initAuthContext() {
  authContext = createContext("auth");
  authContext.registry(AuthRepoImpl, "AuthRepo");
  authContext.registry(AuthService, "AuthService");
}

export function initUserContext() {
  userContext = createContext("user");
  userContext.registry(UserRepoImpl, "UserRepo");
  userContext.registry(UserService, "UserService");
}
