export type IRound = {
  id: string;
  value: number;
  startTime: string;
  endTime: string;
  created_at: string;
};

export type IRounds = Array<IRound>;
