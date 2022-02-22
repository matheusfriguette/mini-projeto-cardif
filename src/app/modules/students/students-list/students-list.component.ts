import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/shared/models/student';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Select, Store } from '@ngxs/store';
import { StudentsState } from 'src/app/shared/stores/students/students.state';
import { Observable } from 'rxjs';
import { Students } from 'src/app/shared/stores/students/students.actions';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit {
  @Select(StudentsState.getData) students$!: Observable<Student[]>;

  displayedColumns: string[] = ['name', 'email', 'birthday', 'actions'];

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.store.dispatch(new Students.List());
  }

  onRegisterClick() {
    this.router.navigate(['/students/register']);
  }

  editStudent(id: number) {
    this.router.navigate([`/students/edit/${id}`]);
  }

  deleteStudent(student: Student) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Deseja excluir esse item?',
        text: `O item ${student.name} será excluido.`,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && student.id) {
        this.store.dispatch(new Students.Delete(student.id)).subscribe(() => {
          this.snackBar.open('Item deletado com sucesso!', 'Fechar', {
            duration: 5000,
          });
        });
      }
    });
  }
}
