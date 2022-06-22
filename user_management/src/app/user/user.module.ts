import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersRoutingModule } from './user-routing.module';
import {
  UserDetailComponent,
  UserPreviewComponent,
  UserPreviewListComponent,
  UserSearchComponent,
} from './components';
import {
  CollectionPageComponent,
  FindUserPageComponent,
  SelectedUserPageComponent,
  ViewUserPageComponent,
} from './containers';
import { UserEffects, CollectionEffects } from './effects';

import * as fromUsers from './reducers';
import { AngularMaterialModule } from '../angular-material.module';

export const COMPONENTS = [
  UserDetailComponent,
  UserPreviewComponent,
  UserPreviewListComponent,
  UserSearchComponent,
];

export const CONTAINERS = [
  FindUserPageComponent,
  ViewUserPageComponent,
  SelectedUserPageComponent,
  CollectionPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    UsersRoutingModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature(fromUsers.usersFeatureKey, fromUsers.reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([UserEffects, CollectionEffects]),
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class UsersModule {}
