import {AppComponent} from './app.component';
import {AppErrorHandler} from './errors/app-error-handler';
import {AppRoutingModule} from './app-routing.module';
import {AuthorizationInterceptor} from './interceptors/authorization.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ErrorDialogComponent} from './errors/error-dialog/error-dialog.component';
import {ErrorHandler, LOCALE_ID} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoadingComponent} from './shared/components/loading/loading.component';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MaterialModule} from './shared/material.module';
import {NgModule} from '@angular/core';
import {NotFoundPageComponent} from './errors/not-found-page/not-found-page.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    LoadingComponent,
    NotFoundPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'el-GR'},
    {provide: LOCALE_ID, useValue: 'el'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true},
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ]
})

export class AppModule {
}
