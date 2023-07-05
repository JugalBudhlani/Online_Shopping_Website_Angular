import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JsonServiceComponent } from './ProdService/json-service.component';
import { ShirtComponent } from './Navigation/shirt.component';
import { PantComponent } from './Navigation/pant.component';
import { WatchComponent } from './Navigation/watch.component';
import { HomeComponent } from './Navigation/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GridModule, PageService, ToolbarService, EditService } from '@syncfusion/ej2-angular-grids';
import { LoginComponent } from './Navigation/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopComponentComponent } from './Navigation/login-pop-component.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './Navigation/cart.component';
import { RegisterComponent } from './Navigation/register.component';
import { LoginService } from './Service/login.service';

@NgModule({
  declarations: [
    AppComponent,
    JsonServiceComponent,
    ShirtComponent,
    PantComponent,
    WatchComponent,
    HomeComponent,
    LoginComponent,
    LoginPopComponentComponent,
    CartComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    FormsModule, GridModule,ReactiveFormsModule, BrowserModule,
    AppRoutingModule,FormsModule,
    ReactiveFormsModule, HttpClientModule, NgbModule
    ,MatDialogModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule,BrowserAnimationsModule
  ],
  providers: [PageService, ToolbarService, EditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
