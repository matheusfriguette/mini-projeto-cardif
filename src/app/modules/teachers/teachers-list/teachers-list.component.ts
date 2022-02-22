import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Teacher } from 'src/app/shared/models/teacher';
import { Teachers } from 'src/app/shared/stores/teachers/teachers.actions';
import { TeachersState } from 'src/app/shared/stores/teachers/teachers.state';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss'],
})
export class TeachersListComponent implements OnInit {
  @Select(TeachersState.getData) teachers$!: Observable<Teacher[]>;

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getTeachers();
  }

  getTeachers() {
    this.store.dispatch(new Teachers.List());
  }

  onRegisterClick() {
    this.router.navigate(['/teachers/register']);
  }

  editTeacher(id: number) {
    this.router.navigate([`/teachers/edit/${id}`]);
  }

  deleteTeacher(teacher: Teacher) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Deseja excluir esse item?',
        text: `O item ${teacher.name} será excluido.`,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && teacher.id) {
        this.store.dispatch(new Teachers.Delete(teacher.id)).subscribe(() => {
          this.snackBar.open('Item deletado com sucesso!', 'Fechar', {
            duration: 5000,
          });
        });
      }
    });
  }
}
