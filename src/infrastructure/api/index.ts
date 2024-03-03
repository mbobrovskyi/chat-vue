import axios, {AxiosInstance} from "axios";
import {TOKEN_LOCAL_STORAGE_KEY} from "../constants/localStorage.ts";
import type {Token} from "@/common/domain/Token.ts";

export const API_URL = import.meta.env.VITE_API_URL;

export class ApiCore {
  protected token: Token | null = null;
  protected instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (err) => {
        if (err.response && err.response.status === 401 && !["/auth/sign-in"].includes(err.config.url)) {
          this.removeToken();
          if (this.redirectToSignIn) {
            this.redirectToSignIn();
          }
        }
        return Promise.reject(err);
      }
    );

    this.getTokenFromLocalStorage();

    if (this.token) {
      this.setTokenInHeader();
    }
  }

  public redirectToSignIn = (): void => {
    const url = new URL(`${window.location.origin}/auth/sign-in`);
    window.open(url.toString(), "_self");
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }

  public setToken(token: Token | null) {
    if (!token) {
      return this.removeToken();
    }

    this.token = token || undefined;
    this.setTokenInLocalStorage();
    this.setTokenInHeader();
  }

  public removeToken() {
    this.token = null;
    this.removeTokenFromLocalStorage();
    this.removeTokenFromHeader();
  }

  protected getTokenFromLocalStorage() {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
    this.token = token ? JSON.parse(token) as Token : null;
  }

  protected setTokenInLocalStorage() {
    if (this.token) {
      localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, JSON.stringify(this.token));
    }
  }

  protected removeTokenFromLocalStorage() {
    localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
  }

  protected setTokenInHeader() {
    if (this.token) {
      this.instance.defaults.headers.common["Authorization"] = `Bearer ${this.token.token}`;
    }
  }

  protected removeTokenFromHeader() {
    delete this.instance.defaults.headers.common["Authorization"];
  }
}