export type IResponse<T> = {
  success: boolean;
  error: string | null;
  data?: T;
};
