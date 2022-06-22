import { Component, Input } from '@angular/core';

import { User } from '../models';

@Component({
  selector: 'user-preview',
  template: `
    <a [routerLink]="['/user', id]">
      <mat-card>
        <mat-card-title-group>
          <img mat-card-sm-image *ngIf="thumbnail" [src]="thumbnail" />
          <mat-card-title>{{ title | bcEllipsis: 35 }}</mat-card-title>
          <mat-card-subtitle *ngIf="subtitle">{{
            subtitle | bcEllipsis: 40
          }}</mat-card-subtitle>
        </mat-card-title-group>
        <mat-card-content>
          <p *ngIf="description">{{ description | bcEllipsis }}</p>
        </mat-card-content>
        <mat-card-footer>
          <bc-user-authors [user]="user"></bc-user-authors>
        </mat-card-footer>
      </mat-card>
    </a>
  `,
  styles: [
    `
      :host {
        display: flex;
      }

      :host a {
        display: flex;
      }

      mat-card {
        width: 400px;
        margin: 15px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
      }

      @media only screen and (max-width: 768px) {
        mat-card {
          margin: 15px 0 !important;
        }
      }
      mat-card:hover {
        box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, 0.5);
      }
      mat-card-title {
        margin-right: 10px;
      }
      mat-card-title-group {
        margin: 0;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      img {
        width: 60px;
        min-width: 60px;
        margin-left: 5px;
      }
      mat-card-content {
        margin-top: 15px;
        margin: 15px 0 0;
      }
      span {
        display: inline-block;
        font-size: 13px;
      }
      mat-card-footer {
        padding: 0 25px 25px;
      }
    `,
  ],
})
export class UserPreviewComponent {
  @Input() user!: User;

  get id() {
    return this.user.id;
  }

  get title() {
    return this.user.volumeInfo.title;
  }

  get subtitle() {
    return this.user.volumeInfo.subtitle;
  }

  get description() {
    return this.user.volumeInfo.description;
  }

  get thumbnail(): string | boolean {
    if (this.user.volumeInfo.imageLinks) {
      return this.user.volumeInfo.imageLinks.smallThumbnail.replace(
        'http:',
        ''
      );
    }

    return false;
  }
}
