import { atom } from "recoil";

export const getsetPage = atom({
  key: "getsetPage",
  default: 0
});

export const getsetTodos = atom({
  key: "mytodos",
  default: []
});
