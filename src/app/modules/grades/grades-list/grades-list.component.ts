import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Grade } from 'src/app/shared/models/grade';
import { Grades } from 'src/app/shared/stores/grades/grades.actions';
import { GradesState } from 'src/app/shared/stores/grades/grades.state';

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.scss'],
})
export class GradesListComponent implements OnInit {
  @Select(GradesState.getData) grades$!: Observable<Grade[]>;

  displayedColumns: string[] = ['name', 'subjects', 'actions'];

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getGrades();
  }

  getGrades() {
    this.store.dispatch(new Grades.List());
  }

  onRegisterClick() {
    this.router.navigate(['/grades/register']);
  }

  editGrade(id: number) {
    this.router.navigate([`/grades/edit/${id}`]);
  }

  deleteGrade(grade: Grade) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Deseja excluir esse item?',
        text: `O item ${grade.name} será excluido.`,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && grade.id) {
        this.store.dispatch(new Grades.Delete(grade.id)).subscribe(() => {
          this.snackBar.open('Item deletado com sucesso!', 'Fechar', {
            duration: 5000,
          });
        });
      }
    });
  }
}
