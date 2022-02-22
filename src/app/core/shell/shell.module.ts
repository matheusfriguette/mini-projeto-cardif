import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { ShellRoutingModule } from './shell-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    ShellRoutingModule,
    MatListModule,
    MatButtonModule,
    SharedModule,
    MatMenuModule,
  ],
  declarations: [ShellComponent, SidebarComponent],
})
export class ShellModule {}
