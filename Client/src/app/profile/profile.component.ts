import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Profile } from '@models/profile';
import { ProfileService } from '@services/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy, DoCheck {
  // ============================= //
  private _subscriptions: Subscription[] = [];
  // ============================= //
  public profile: Profile;
  // ============================= //
  constructor(private service: ProfileService, private route: ActivatedRoute, private router: Router) {
    const sub1 = this.route.queryParamMap.subscribe({
      next: (param: ParamMap) => {
        if (param.has('id')) {
          const sub2 = this.service.getProfile(+param.get('id')).subscribe({
            next: (result: Profile) => {
              this.profile = result;
            }
          });
          this._subscriptions.push(sub2);
        }
        else this.router.navigate(['../']);
      }
    });
    this._subscriptions.push(sub1);
  }
  ngOnInit() { }
  ngDoCheck() { }
  ngOnDestroy() { this._subscriptions?.forEach(x => x.unsubscribe()); }
  // ============================= //
  public toggleFavorite() {
    this.profile.isFavorite = !this.profile.isFavorite;
    this.service.updateProfiles(this.profile)
  }
  // ============================= //
}