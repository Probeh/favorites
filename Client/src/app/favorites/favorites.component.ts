import { Subscription } from 'rxjs'
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core'
import { Profile } from '@models/profile'
import { ProfileService } from '@services/profile.service'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy, DoCheck {
  // ============================= //
  private _subscriptions: Subscription[];
  // ============================= //
  public favorites: Profile[] = [];
  // ============================= //
  constructor(private service: ProfileService) {
    const sub = this.service.getFavorites().subscribe({
      next: (result: Profile[]) => this.favorites = result
    });
    this._subscriptions = [sub];
  }
  ngOnInit() { }
  ngDoCheck() { }
  ngOnDestroy() { this._subscriptions?.forEach(x => x.unsubscribe()); }
  // ============================= //
  public toggleFavorite(profile: Profile) {
    profile.isFavorite = !profile.isFavorite;
    this.service.updateProfiles(profile);

  }
}
