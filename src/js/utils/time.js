import { Timestamp } from "../db/firestore";

export const createTimeStamp = () => {
  return Timestamp.now().toMillis().toString();
};
