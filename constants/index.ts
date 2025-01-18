import { randomId } from "@/helpers";
import { IProfile } from "@/types/profile";
import { IRound } from "@/types/round";

export const INIT_PROFILE: IProfile = {
  round: 0,
  send: [
    { id: randomId(10), value: 0 },
    { id: randomId(10), value: 0 },
    { id: randomId(10), value: 0 },
  ],
  receive: [],
  title: "Chia tiền vào bao",
  description: "Vui lòng chọn số tiền cho mỗi bao (thấp nhất 50k, cao nhất 200k)",
};

export const INIT_ROUND: IRound = {
  round: 0,
  error: null,
  title: "Vòng 1",
  description: "Vui lòng chọn 1 bao lì xì bất kì",
  available: Array.from({ length: 100 }).map(() => ({ id: randomId(10), error: null })),
  nextRoundTime: Date.now() + 15000,
};
