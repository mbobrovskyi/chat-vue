import { AxiosInstance } from "axios";
import {ApiCore} from "../../infrastructure/api";
import {publicContext} from "../../infrastructure/context";

export class BaseRepo {
  protected apiCore: ApiCore;

  constructor() {
    this.apiCore = publicContext.get<ApiCore>("ApiCore");
  }

  protected get inst(): AxiosInstance {
    return this.apiCore.getInstance();
  }
}
