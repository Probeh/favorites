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
  // ============================= //
  constructor(private service: ProfileService) {
    this.service.fetchProfiles({ per_Page: 20 });

    const sub = this.service.getProfiles().subscribe({
      next: (result: Profile[]) => {
        console.log(result)
        this.profiles = result
      }
    });
    this._subscriptions = [sub];
  }
  ngOnInit() { }
  ngDoCheck() { }
  ngOnDestroy() { this._subscriptions?.forEach(x => x.unsubscribe()); }
  // ============================= //
  public getFavorites() {
    return this.profiles.slice()
      .filter(x => x.isFavorite)
      .sort((a, b) => a.id + b.id);
  }
  public updateProfile(profile: Profile) {
    this.service.updateProfiles(profile);
  }
}
