export enum RoundStatus {
  BREAK = "BREAK",
  SETUP = "SETUP",
  FINISHED = "FINISHED",
  IN_PROGRESS = "IN_PROGRESS",
}

export type IRound = {
  id: string;
  value: number;
  startTime: string;
  endTime: string;
  created_at: string;
};

export type IRounds = Array<IRound>;
