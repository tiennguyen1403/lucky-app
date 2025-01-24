export type ISetupResponse = {
  startTime: string;
};

export type IEnvelope = {
  id: string;
  eid?: string;
  round?: number;
  value?: number;
  sender?: string;
  receiver?: string;
};

export type IEnvelopes = Array<IEnvelope>;
