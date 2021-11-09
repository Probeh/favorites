import { Subscription } from 'rxjs'
import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { Profile } from '@models/profile'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy, DoCheck {
  // ============================= //
  private _subscriptions: Subscription[];
  // ============================= //
  @Output() public onFavoriteChanged: EventEmitter<Profile> = new EventEmitter();
  @Input() public favorites: Profile[];
  // ============================= //
  constructor() { }
  ngOnInit() { }
  ngDoCheck() { }
  ngOnDestroy() { this._subscriptions?.forEach(x => x.unsubscribe()); }
  // ============================= //
  public toggleFavorite(profile: Profile) {
    this.onFavoriteChanged.next(profile.update({ isFavorite: !profile.isFavorite }));
  }
}
