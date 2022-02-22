import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { StudentsState } from './shared/stores/students/students.state';
import { TeachersState } from './shared/stores/teachers/teachers.state';
import { GradesState } from './shared/stores/grades/grades.state';
import { SchoolsState } from './shared/stores/schools/schools.state';
import { CurrentSchoolState } from './shared/stores/current-school/current-school.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatNativeDateModule,
    NoopAnimationsModule,
    HttpClientModule,
    NgxsStoragePluginModule.forRoot({
      key: 'currentSchool'
    }),
    NgxsModule.forRoot([
      StudentsState,
      TeachersState,
      GradesState,
      SchoolsState,
      CurrentSchoolState,
    ]),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
