import { IPost } from "@/types";
import { atom } from "recoil";

export const postAtom = atom({
  key: "postAtom",
  default: [] as IPost[],
});
