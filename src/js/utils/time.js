import { Timestamp } from "../db/firestore";
import moment from "moment";

export const createTimeStamp = () => {
  return Timestamp.now().toMillis().toString();
};

export const formatTimeAgo = (timestamp) => {
  return moment(parseInt(timestamp, 10)).fromNow();
};
