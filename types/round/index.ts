export type IAvailable = {
  id: string;
  error: string | null;
};

export type IRound = {
  round: number;
  error: string | null;
  available: Array<IAvailable>;
  title: string;
  description: string;
  nextRoundTime: number;
};
