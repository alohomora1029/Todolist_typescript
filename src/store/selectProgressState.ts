import { selector } from "recoil";

import { progressFilterState } from "./recoil/progressFilterState";
import { todosListState } from "./recoil/todosListState";

export const selectProgressState = selector({
  key: "selectProgressState",
  get: ({ get }) => {
    const filters = get(progressFilterState);
    const list = get(todosListState);

    switch (filters) {
      case "All":
        return list;
      case "notStarted":
        return list.filter((item) => item.progress === "未着手🐑");
      case "inProgress":
        return list.filter((item) => item.progress === "着手❤️‍🔥");
      case "done":
        return list.filter((item) => item.progress === "完了💮");
      default:
        return list;
    }
  }
});
