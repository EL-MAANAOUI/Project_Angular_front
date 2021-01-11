import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component'
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ShopsService } from './services/shops.service'
import { RepasService } from './services/repas.service'
import { AuthService } from './auth/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepasDetailComponent } from './pages/repas-detail/repas-detail.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';

import { myshopsComponent } from './pages/myshops/myshops.component';

import { ResultComponent } from './pages/result/result'



registerLocaleData(en);

@NgModule({

  declarations: [
    AppComponent, 
    HeaderComponent,
    FooterComponent,
    RepasDetailComponent,
    CheckOutComponent,
    myshopsComponent,
    ResultComponent 
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [{ provide: NZ_I18N, useValue: en_US }, ShopsService,RepasService, AuthService],
  bootstrap: [AppComponent],


})

export class AppModule { } 