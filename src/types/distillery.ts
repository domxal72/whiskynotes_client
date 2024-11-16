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
  x_coors?: number
  y_coors?: number
  slug?: string
  founded?: number
  website?: string
  owner?: string
  location?: string
  region?: string
}
