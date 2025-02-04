import dayjs from "dayjs";

import { IRounds, RoundStatus } from "@/types/round.types";

export const randomId = (length = 6) => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export const generateId = (length: number): string => {
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

type RoundState = {
  roundStatus: RoundStatus;
  nextRound: number | null;
  currentRound: number | null;
  nextRoundTime: string | null;
};

export const getRoundState = (rounds: IRounds): RoundState => {
  const now = dayjs();
  let nextRound = null;
  let currentRound = null;
  let nextRoundTime = null;
  let roundStatus = RoundStatus.FINISHED;

  rounds.sort((a, b) => (dayjs(a.startTime).isBefore(dayjs(b.startTime)) ? -1 : 1));

  for (let i = 0; i < rounds.length; i++) {
    const round = rounds[i];
    const startTime = dayjs(round.startTime);
    const endTime = dayjs(round.endTime);

    if (now.isBefore(startTime)) {
      roundStatus = i === 0 ? RoundStatus.SETUP : RoundStatus.BREAK;
      nextRound = round.value;
      nextRoundTime = startTime.toISOString();
      break;
    }
    if (now.isAfter(startTime) && now.isBefore(endTime)) {
      currentRound = round.value;
      roundStatus = RoundStatus.IN_PROGRESS;
      nextRoundTime = null;
      break;
    }
    if (i === rounds.length - 1) {
      roundStatus = RoundStatus.FINISHED;
      nextRoundTime = null;
    }
  }

  return { currentRound, roundStatus, nextRoundTime, nextRound };
};
