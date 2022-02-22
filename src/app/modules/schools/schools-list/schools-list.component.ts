import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { School } from 'src/app/shared/models/school';
import { Schools } from 'src/app/shared/stores/schools/schools.actions';
import { SchoolsState } from 'src/app/shared/stores/schools/schools.state';

@Component({
  selector: 'app-schools-list',
  templateUrl: './schools-list.component.html',
  styleUrls: ['./schools-list.component.scss'],
})
export class SchoolsListComponent implements OnInit {
  @Select(SchoolsState.getData) schools$!: Observable<School[]>;

  displayedColumns: string[] = ['name', 'phone', 'address', 'actions'];

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getSchools();
  }

  getSchools() {
    this.store.dispatch(new Schools.List());
  }

  onRegisterClick() {
    this.router.navigate(['/schools/register']);
  }

  editSchool(id: number) {
    this.router.navigate([`/schools/edit/${id}`]);
  }

  deleteSchool(school: School) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Deseja excluir esse item?',
        text: `O item ${school.name} será excluido.`,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && school.id) {
        this.store.dispatch(new Schools.Delete(school.id)).subscribe(() => {
          this.snackBar.open('Item deletado com sucesso!', 'Fechar', {
            duration: 5000,
          });
        });
      }
    });
  }

  getSchoolAddress(school: School): string {
    return `${school.streetName}, ${school.streetNumber} - ${school.neighborhood}. ${school.city} - ${school.state}`;
  }
}
