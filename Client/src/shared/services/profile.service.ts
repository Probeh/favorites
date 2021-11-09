import { BehaviorSubject, Observable, Subscriber } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@config/environment'
import { Profile } from '@models/profile'
import { IRequest } from '@models/request'
import { IResponse } from '@models/response'

@Injectable({ providedIn: 'root' })
export class ProfileService {
  // ============================= //
  private _profiles: Profile[];
  private $profiles: BehaviorSubject<Profile[]>;
  // ============================= //
  constructor(private http: HttpClient) {
    this._profiles = new Array<Profile>();
    this.$profiles = new BehaviorSubject<Profile[]>(undefined);
  }
  // ============================= //
  public async fetchProfiles(args?: IRequest): Promise<IResponse<Profile>> {
    const params = args ? (`?${Object.keys(args).map(key => `${key.toLowerCase()}=${args[key]}`).join('&')}`) : undefined;
    const result = await this.http
      .get<IResponse<Profile>>(`${environment.provider}${params ?? ''}`)
      .toPromise();

    if (this._profiles && this._profiles?.length > 0) {
      result.data.slice().forEach(update => {
        const index = this._profiles.findIndex(item => item.id == update.id);
        if (index > -1) {
          this._profiles.splice(index, 1, update);
        }
      })
    }
    else this._profiles = result.data;

    this.$profiles.next(this._profiles.slice());
    return result;
  }
  // ============================= //
  public getProfile(filter: number): Observable<Profile> {
    return new Observable<Profile>((subscriber: Subscriber<Profile>) => {
      let index: (id?: number) => number = (id: number = filter) => this._profiles.slice().findIndex(x => x.id == filter);
      this.$profiles.subscribe({
        next: (update: Profile[]) => {
          if (update && index() > -1) {
            subscriber.next(update.slice()[index()]);
          }
        }
      });
    })
  }
  public getProfiles(): Observable<Profile[]> {
    return new Observable<Profile[]>((subscriber: Subscriber<Profile[]>) => {
      this.$profiles.subscribe({
        next: (update: Profile[]) => {
          if (update && update.length > 0) {
            subscriber.next(update.slice());
          }
        }
      });
    })
  }
  public getFavorites(): Observable<Profile[]> {
    return new Observable<Profile[]>((subscriber: Subscriber<Profile[]>) => {
      this.$profiles.subscribe({
        next: (update: Profile[]) => {
          if (update && update.length > 0) {
            subscriber.next(update.slice().filter(x => x.isFavorite));
          }
        }
      });
    })
  }
  public updateProfiles(...profiles: Profile[]) {
    if (profiles) {
      profiles?.forEach(async profile => {
        await this.http.put<Profile>(environment.provider, profile).toPromise();
        const index = this._profiles.findIndex(x => x.id == profile.id);
        this._profiles.splice(index, 1, profile)
      });
      this.$profiles.next(this._profiles.slice());
    }
  }
}
