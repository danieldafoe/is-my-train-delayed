import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { trainReducers } from './store/reducers/train.reducers';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { TrainEffects } from './store/effects/train.effects';
import { TrainService } from './services/train.service';
import { MessageBannerComponent } from './components/message-banner/message-banner.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TrainStatusRowComponent } from './components/train-status-row/train-status-row.component';
import { FormatRefreshTimePipe } from './pipes/format-refresh-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MessageBannerComponent,
    LoaderComponent,
    TrainStatusRowComponent,
    FormatRefreshTimePipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    EffectsModule.forRoot([TrainEffects]),
    StoreModule.forRoot({serviceUpdate: trainReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [TrainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
