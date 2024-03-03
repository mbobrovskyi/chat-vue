import { Notify, Loading } from "quasar";

export default {
  plugins: {
    Notify,
    Loading,
  },
  config: {
    notify: {
      actions: [{ icon: 'close', color: 'white' }],
      group: false,
      iconColor: "white",
      position: "top-right",
      textColor: "white",
      timeout: 10000,
      multiLine: true,
      type: "info",
    },
  },
};
