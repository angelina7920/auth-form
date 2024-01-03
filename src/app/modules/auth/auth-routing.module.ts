import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegPageComponent } from './pages/reg-page/reg-page.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: 'full',
    redirectTo:'registration'
  },
  {
    path:'registration',
    component:RegPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
