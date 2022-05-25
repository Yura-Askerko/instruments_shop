import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const currentUserBasketState = atom({
  default: [],
  key: "currentUserBasket",
  effects_UNSTABLE: [persistAtom],
});
