import dayjs from "dayjs";

export const formatDate = (dateTime: Date) => {
  const now = dayjs();
  const givenDate = dayjs(dateTime);
  if (givenDate.isSame(now, "day")) {
    return "Today";
  }
  if (givenDate.isSame(now.add(1, "day"), "day")) {
    return "Tomorrow";
  }
  return givenDate.format("DD MMM YYYY");
};
