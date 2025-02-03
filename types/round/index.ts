export type IAvailable = {
  id: string;
  error: string | null;
};

export enum RoundState {
  BREAK = "BREAK",
  SETUP = "SETUP",
  FINISHED = "FINISHED",
  IN_PROGRESS = "IN_PROGRESS",
}

export type IRound = {
  round: number;
  error: string | null;
  available: Array<IAvailable>;
  title: string;
  description: string;
  nextRoundTime: number;
  roundState: RoundState;
};
