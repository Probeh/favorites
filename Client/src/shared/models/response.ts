import { Model } from '@models/abstract';

export interface IResponse<T extends Model> {
  // ============================= //
  data       : T[]   ;
  page       : number;
  per_page   : number;
  total      : number;
  total_pages: number;
  // ============================= //
}
