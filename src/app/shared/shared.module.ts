import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { MatIconModule } from '@angular/material/icon';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  declarations: [IconComponent, PageTitleComponent, ConfirmDialogComponent],
  exports: [IconComponent, PageTitleComponent, ConfirmDialogComponent],
})
export class SharedModule {}
