import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { School } from 'src/app/shared/models/school';
import { Schools } from 'src/app/shared/stores/schools/schools.actions';

@Component({
  selector: 'app-schools-register',
  templateUrl: './schools-register.component.html',
  styleUrls: ['./schools-register.component.scss'],
})
export class SchoolsRegisterComponent implements OnInit {
  schoolForm: FormGroup;
  isEditing = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store
  ) {
    this.schoolForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      brandColor: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      streetName: ['', [Validators.required]],
      streetNumber: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.checkIfIsEditing();
  }

  checkIfIsEditing() {
    if (!!this.activatedRoute.snapshot.params['id']) {
      const id = this.activatedRoute.snapshot.params['id'];
      this.isEditing = true;
      this.store.dispatch(new Schools.GetOne(id)).subscribe(() => {
        const school = this.store.selectSnapshot<School>(
          (state) => state.schools.school
        );
        this.schoolForm.setValue({
          id: school.id,
          name: school.name,
          phone: school.phone,
          brandColor: school.brandColor,
          cep: school.cep,
          streetName: school.streetName,
          streetNumber: school.streetNumber,
          neighborhood: school.neighborhood,
          city: school.city,
          state: school.state,
        });
      });
    }
  }

  goToList() {
    this.router.navigate(['/schools']);
  }

  onSubmit() {
    if (this.isEditing) {
      this.store.dispatch(new Schools.Update(this.schoolForm.value)).subscribe({
        next: this.handlerSaveSuccess.bind(this),
      });
    } else {
      this.store.dispatch(new Schools.Register(this.schoolForm.value)).subscribe({
        next: this.handlerSaveSuccess.bind(this),
      });
    }
  }

  handlerSaveSuccess() {
    this.snackBar.open('Item salvo com sucesso!', 'Fechar', {
      duration: 5000,
    });
    this.router.navigate(['/schools']);
  }
}
