export type ISend = {
  value: number;
  id: string;
};

export type IReceive = {
  value: number;
  id: string;
};

export type IProfile = {
  round: number;
  send: Array<ISend>;
  receive: Array<IReceive>;
  title: string;
  description: string;
};
