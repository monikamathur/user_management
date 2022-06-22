import { Component, Input } from '@angular/core';

import { User } from '../models';

@Component({
  selector: 'user-preview-list',
  template: `
    <!-- <bc-user-preview *ngFor="let user of user" [user]="user"></bc-user-preview> -->
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
  ],
})
export class UserPreviewListComponent {
  @Input() user!: User[];
}
