import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Role, User } from 'src/app/shared/models/user';
import { Users } from 'src/app/shared/stores/users/users.actions';
import { UsersState } from 'src/app/shared/stores/users/users.state';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  @Select(UsersState.getData) users$!: Observable<User[]>;

  displayedColumns: string[] = ['user', 'role', 'actions'];

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  onRegisterClick() {
    this.router.navigate(['/users/register']);
  }

  editUser(id: number) {
    this.router.navigate([`/users/edit/${id}`]);
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Deseja excluir esse item?',
        text: `O item ${user.user} será excluido.`,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && user.id) {
        this.store.dispatch(new Users.Delete(user.id)).subscribe(() => {
          this.snackBar.open('Item deletado com sucesso!', 'Fechar', {
            duration: 5000,
          });
        });
      }
    });
  }

  getUserRole(role: Role): string {
    const roleNames = {
      admin: 'Administrador',
      common: 'Comum',
    };

    return roleNames[role];
  }
}
