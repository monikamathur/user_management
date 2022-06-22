import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CollectionPageComponent,
  FindUserPageComponent,
  ViewUserPageComponent,
} from './containers';

export const routes: Routes = [
  {
    path: 'find',
    component: FindUserPageComponent,
    data: { title: 'Find user' },
  },
  {
    path: ':id',
    component: ViewUserPageComponent,
    data: { title: 'User details' },
  },
  {
    path: '',
    component: CollectionPageComponent,
    data: { title: 'Collection' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
