import { IModel, Model } from '@models/abstract';

export interface IProfile extends IModel {
  // ============================= //
  email     ?: string ;
  first_name?: string ;
  isFavorite?: boolean;
  last_name ?: string ;
  // ============================= //
}
export class Profile extends Model implements IProfile {
  // ============================= //
  public email     : string ;
  public first_name: string ;
  public full_name : string ;
  public isFavorite: boolean;
  public last_name : string ;
  // ============================= //
  constructor(args?: IProfile) { super(args) }
  // ============================= //
}