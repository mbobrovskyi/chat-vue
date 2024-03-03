import qs from "qs";

export const paramsSerializer = (params: Record<string, any>): string => {
  return qs.stringify(params, { arrayFormat: "comma", encode: false });
};
