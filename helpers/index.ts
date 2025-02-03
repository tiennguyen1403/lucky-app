import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import { RoundState } from "@/types/round";
import { IRounds } from "@/types/round.types";

export const randomId = (length = 6) => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export const randomValue = (min: number, max: number, step: number): number => {
  if (step <= 0) throw new Error("Step must be a positive number");

  const steps = Math.floor((max - min) / step) + 1;

  const randomStep = Math.floor(Math.random() * steps);

  return min + randomStep * step;
};

export const generateRandomId = (length: number): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

export const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (char) {
    const random = (Math.random() * 16) | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
};

export const getRoundState = (rounds: IRounds): RoundState => {
  const now = dayjs();

  rounds.sort((a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf());

  if (now.isBefore(dayjs(rounds[0].startTime))) return RoundState.SETUP;

  for (let i = 0; i < rounds.length; i++) {
    const roundStart = dayjs(rounds[i].startTime);
    const roundEnd = dayjs(rounds[i].endTime);

    if (now.isBetween(roundStart, roundEnd, null, "[]")) return RoundState.IN_PROGRESS;

    if (i < rounds.length - 1) {
      const nextRoundStart = dayjs(rounds[i + 1].startTime);
      if (now.isAfter(roundEnd) && now.isBefore(nextRoundStart)) return RoundState.BREAK;
    }
  }

  return RoundState.FINISHED;
};
