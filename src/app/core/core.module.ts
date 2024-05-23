import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/reducers/app.reducer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
