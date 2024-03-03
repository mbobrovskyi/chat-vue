import dayjs from "@/infrastructure/utils/dayjs.ts";
import {DATE_FORMAT, DAY_FORMAT, TIME_FORMAT} from "@/infrastructure/constants/dateFormat.ts";

export function formatDate(date: Date): string {
  const inst = dayjs(date);
  if (inst.isAfter(dayjs().subtract(1, "minute"))) {
    return "Just now";
  } else if (inst.isAfter(dayjs().subtract(1, "day"))) {
    return inst.format(TIME_FORMAT);
  } else if (inst.isAfter(dayjs().subtract(1, "week"))) {
    return inst.format(DAY_FORMAT);
  } else {
    return inst.format(DATE_FORMAT);
  }
}