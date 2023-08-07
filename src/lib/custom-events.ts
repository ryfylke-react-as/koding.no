import { CustomEventChannel } from "typesafe-custom-events";

export const progressChannel = new CustomEventChannel<{
  docId: string;
}>();
