import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { FavoritesComponent } from '@favorites/favorites.component'
import { HeaderComponent } from '@header/header.component'
import { ProfileComponent } from '@profile/profile.component'
import { SearchComponent } from '@search/search.component'
import { AppRoutingModule } from '@source/app-routing.module'
import { AppComponent } from '@source/app.component'

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    ProfileComponent,
    SearchComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  bootstrap: [
    AppComponent
  ],
  providers: []
})
export class AppModule { }
