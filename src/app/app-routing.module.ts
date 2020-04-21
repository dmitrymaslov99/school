import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component'
import { AutorizationComponent } from './components/autorization/autorization.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', component: AutorizationComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
