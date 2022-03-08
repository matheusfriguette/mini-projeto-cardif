import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { School } from 'src/app/shared/models/school';
import { AuthState } from 'src/app/shared/stores/auth/auth.state';
import { Schools } from 'src/app/shared/stores/schools/schools.actions';
import { SchoolsState } from 'src/app/shared/stores/schools/schools.state';
import TinyColor from 'tinycolor2';
import { Color } from 'src/app/shared/interfaces/color';
import { Students } from 'src/app/shared/stores/students/students.actions';
import { Teachers } from 'src/app/shared/stores/teachers/teachers.actions';
import { Grades } from 'src/app/shared/stores/grades/grades.actions';
import { Users } from 'src/app/shared/stores/users/users.actions';

@Component({
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  @Select(SchoolsState.getData) schools$!: Observable<School[]>;
  @Select(AuthState.getCurrentSchool)
  currentSchool$!: Observable<School>;

  primaryColor: string = '#000000';
  primaryColorPalette: Color[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.currentSchool$.subscribe((currentSchool) => {
      this.store.dispatch([
        new Schools.List(),
        new Students.List(),
        new Teachers.List(),
        new Grades.List(),
        new Users.List(),
      ]);
      this.primaryColorPalette = this.computeColors(currentSchool.brandColor);
      this.updateTheme(this.primaryColorPalette);
    });
  }

  computeColors(hex: string): Color[] {
    return [
      this.getColorObject(TinyColor(hex).lighten(52), '50'),
      this.getColorObject(TinyColor(hex).lighten(37), '100'),
      this.getColorObject(TinyColor(hex).lighten(26), '200'),
      this.getColorObject(TinyColor(hex).lighten(12), '300'),
      this.getColorObject(TinyColor(hex).lighten(6), '400'),
      this.getColorObject(TinyColor(hex), '500'),
      this.getColorObject(TinyColor(hex).darken(6), '600'),
      this.getColorObject(TinyColor(hex).darken(12), '700'),
      this.getColorObject(TinyColor(hex).darken(18), '800'),
      this.getColorObject(TinyColor(hex).darken(24), '900'),
      this.getColorObject(TinyColor(hex).lighten(50).saturate(30), 'A100'),
      this.getColorObject(TinyColor(hex).lighten(30).saturate(30), 'A200'),
      this.getColorObject(TinyColor(hex).lighten(10).saturate(15), 'A400'),
      this.getColorObject(TinyColor(hex).lighten(5).saturate(5), 'A700'),
    ];
  }

  getColorObject(value: TinyColor.Instance, name: string): Color {
    const c = TinyColor(value);
    return {
      name: name,
      hex: c.toHexString(),
      darkContrast: c.isLight(),
    };
  }

  updateTheme(colors: Color[]) {
    colors.forEach((color) => {
      document.documentElement.style.setProperty(
        `--theme-primary-${color.name}`,
        color.hex
      );
      document.documentElement.style.setProperty(
        `--theme-primary-contrast-${color.name}`,
        color.darkContrast ? 'rgba(black, 0.87)' : 'white'
      );
    });
  }
}
