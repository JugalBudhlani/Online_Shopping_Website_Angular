import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Navigation/home.component';
import { ShirtComponent } from './Navigation/shirt.component';
import { PantComponent } from './Navigation/pant.component';
import { WatchComponent } from './Navigation/watch.component';
import { LoginComponent } from './Navigation/login.component';
import { CartComponent } from './Navigation/cart.component';
import { RegisterComponent } from './Navigation/register.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'shirt',component:ShirtComponent},
  {path:'pant',component:PantComponent},
  {path:'watch',component:WatchComponent},
  {path:'cart',component:CartComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
