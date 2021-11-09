import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Profile } from '@models/profile';
import { ProfileService } from '@services/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, DoCheck {
  // ============================= //
  private _subscriptions: Subscription[];
  // ============================= //
  public profiles: Profile[] = [];
  public favorites: Profile[] = [];
  // ============================= //
  constructor(private service: ProfileService) {
    this.initialize()
    const sub = this.service.getProfiles().subscribe({
      next: (result: Profile[]) => {
        this.profiles = result;
        this.favorites = result.slice()
          .filter(x => x.isFavorite)
          .sort((a, b) => a.id + b.id);
      }
    });
    this._subscriptions = [sub];
  }
  ngOnInit() { }
  ngDoCheck() { }
  ngOnDestroy() { this._subscriptions?.forEach(x => x.unsubscribe()); }
  // ============================= //
  private async initialize() {
    this.profiles = (await this.service.fetchProfiles({ per_Page: 20 })).data;
  }
  // ============================= //
  public updateProfile(profile: Profile) {
    this.service.updateProfiles(profile);
  }
}
