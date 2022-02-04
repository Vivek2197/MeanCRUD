import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent} from './dashboard/dashboard.component'
import { UserProfileComponent} from './user-profile/user-profile.component'
import { UsersComponent} from './users/users.component'
import { IconsComponent} from './icons/icons.component'
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



const routes: Routes = [

  {path:'', redirectTo:'login',pathMatch:'full'},
{
  component:DashboardComponent,
  path:'dashboard'
},
{
  component:UserProfileComponent,
  path:'user-profile'
},
{
  component:UsersComponent,
  path:'users'
},
{
  component:IconsComponent,
  path:'icons'
},
{
  
  path:'login',
  component:LoginComponent,
},
{
 
  path:'signup',
  component:SignupComponent,
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
