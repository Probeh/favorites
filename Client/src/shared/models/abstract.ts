export interface IModel {
  // ============================= //
  avatar?: string;
  id    ?: number;
  // ============================= //
}
export class Model implements IModel {
  // ============================= //
  public avatar: string;
  public id    : number;
  // ============================= //
  constructor(args?: IModel) { this.update(args); }
  // ============================= //
  public update(args?: any) {
    args ? Object.keys(args).forEach(key => this[key] = args[key]) : {};
    return this;
  }
}
