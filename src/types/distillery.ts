export type TsqlResponseData = {
  command: string;
  rowCount: number;
  oid: null;
  rows: IDistillery[];
  fields: unknown[];
};

export type AxiosResponseSchema<T> = {
  data: T,
  status: number,
  statusText: string,
  headers: object,
  config: object,
  request: object
};

export interface IDistillery {
  id: number
  name: string
  country?: string
  region?: string
  founded?: number
  website?: string
}
