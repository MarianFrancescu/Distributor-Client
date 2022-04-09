import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit, OnChanges {
  @Input() userDetails: User;
  @Output() updateDetails = new EventEmitter<boolean>();
  selectedValue: string;

  //these shoud be removed and for institutions to be used mockedInstitutions
  institutions = [
    'Universitatea Politehnica Timisoara',
    'Universitatea de Vest Timisoara'
  ];
  faculties = ['Automatica si Calculatoare', 'Telecomunicatii'];
  departments = [
    'Calculatoare si Tehnologia Informatiei',
    'Ingineria Sistemelor',
    'Informatica'
  ];
  years = ['1', '2', '3', '4', '5', '6'];

  detailsForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    registrationNumber: new FormControl('', [Validators.required]),
    studyInstitution: new FormControl('', [Validators.required]),
    faculty: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    studyYear: new FormControl('', [Validators.required])
  });

  hideFlag = true;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  emitUpdateValue(value: boolean) {
    this.updateDetails.emit(value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchUserData();  
  }

  ngOnInit() {
    this.apiService.getIntitutions()
        .subscribe(institutions => console.log(institutions));
  }

  fetchUserData() {
    if (this.userDetails) {
      this.detailsForm.patchValue({
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        registrationNumber: this.userDetails.registrationNumber,
        studyInstitution: this.userDetails.studyInstitution,
        faculty: this.userDetails.faculty,
        department: this.userDetails.department,
        studyYear: this.userDetails.studyYear
      });
    }
  }

  submit() {
    const updatedDetails = {} as User;

    if (this.detailsForm.controls.firstName.touched) {
      updatedDetails.firstName = this.detailsForm.controls.firstName.value;
    }
    if (this.detailsForm.controls.lastName.touched) {
      updatedDetails.lastName = this.detailsForm.controls.lastName.value;
    }
    if (this.detailsForm.controls.registrationNumber.touched) {
      updatedDetails.registrationNumber =
        this.detailsForm.controls.registrationNumber.value;
    }
    if (this.detailsForm.controls.studyInstitution.touched) {
      updatedDetails.studyInstitution =
        this.detailsForm.controls.studyInstitution.value;
    }
    if (this.detailsForm.controls.faculty.touched) {
      updatedDetails.faculty = this.detailsForm.controls.faculty.value;
    }
    if (this.detailsForm.controls.department.touched) {
      updatedDetails.department = this.detailsForm.controls.department.value;
    }
    if (this.detailsForm.controls.studyYear.touched) {
      updatedDetails.studyYear = this.detailsForm.controls.studyYear.value;
    }

    this.apiService.updateUser(this.userDetails._id, updatedDetails).subscribe(
      (response) => {
        this.emitUpdateValue(true);
        this.snackBar.open(`${response}`, 'Close', {
          duration: 2000
        });
        
      },
      (error) => {
        this.detailsForm.reset();
      }
    );
  }
}
