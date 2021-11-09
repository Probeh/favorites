import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProfileComponent } from '@profile/profile.component'
import { SearchComponent } from '@search/search.component'

const routes: Routes = [
  { path: 'search' , component:         SearchComponent            },
  { path: 'profile', component:         ProfileComponent           },
  { path: ''       , pathMatch: 'full', redirectTo      : 'search' },
  { path: '**'     , pathMatch: 'full', redirectTo      : ''       }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
