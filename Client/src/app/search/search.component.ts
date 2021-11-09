import { Subscription } from 'rxjs'
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core'
import { Profile } from '@models/profile'
import { IResponse } from '@models/response'
import { ProfileService } from '@services/profile.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy, DoCheck {
  // ============================= //
  private _subscriptions: Subscription[];
  // ============================= //
  public results: IResponse<Profile>;
  public per_page: number = 6;
  public page_num: number = 1;
  public paginate: Array<number> = [];
  // ============================= //
  constructor(private service: ProfileService) {
    this.initialize();
    const sub = this.service.getProfiles().subscribe({
      next: (profiles: Profile[]) => {
        this.results?.data?.forEach(profile => {
          profile = profiles.find(x => x.id == profile.id)
        })
      }
    });
    this._subscriptions = [sub];
  }
  ngOnInit() { }
  ngDoCheck() { }
  ngOnDestroy() { this._subscriptions?.forEach(x => x.unsubscribe()); }
  // ============================= //
  private async initialize() {
    this.results = await this.service.fetchProfiles({ page: this.page_num, per_Page: this.per_page });
    this.paginate = new Array(this.results.total_pages);
  }
  // ============================= //
  public toggleFavorite(profile: Profile) {
    profile.isFavorite = !profile.isFavorite;
    this.service.updateProfiles(profile)
  }
  public async updatePage(page: number) {
    this.page_num = page;
    await this.initialize();
  }
  public async updateCount() {
    this.page_num = 1;
    await this.initialize();
  }
}
