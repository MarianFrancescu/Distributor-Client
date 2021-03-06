import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BehaviorSubject } from 'rxjs';
import { Discipline } from '../models/discipline.interface';
import { Preference } from '../models/preference.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-discipline-preferences',
  templateUrl: './discipline-preferences.component.html',
  styleUrls: ['./discipline-preferences.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DisciplinePreferencesComponent implements OnInit {
  viableTimetables = [];
  discipline: Discipline;
  update = new BehaviorSubject<boolean>(false);

  hasSelectedPreferences = false;
  wasPressed = false;

  preferencesForm = new FormGroup({
    options: new FormArray([])
  });

  get dynamicOptions() {
    return this.preferencesForm.controls['options'] as FormArray;
  }

  addOptionForm() {
    const optionForm = new FormGroup({
      option: new FormControl('', [
        Validators.required,
        RxwebValidators.unique({ message: 'You must enter a unique option' })
      ])
    });
    this.dynamicOptions.push(optionForm);
  }

  updateOptionForm(value: string) {
    const optionForm = new FormGroup({
      option: new FormControl(value)
    });
    this.dynamicOptions.push(optionForm);
  }

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchUserPreferences();
    this.update.subscribe((update) =>
      update === true ? this.fetchUserPreferences() : ''
    );
    
  }

  fetchUserPreferences() {
    this.route.paramMap.subscribe((params) => {
      const disciplineID = params.get('disciplineID');
      this.apiService.getDiscipline(disciplineID).subscribe(
        (response) => {
          const res = response as Discipline;
          this.discipline = res;
          this.getUserPreferences();
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  getUserPreferences() {
    this.hasSelectedPreferences = false;
    this.apiService
      .getUserPreferenceByDiscipline(this.discipline._id)
      .subscribe(
        (response) => {
          const res = response as Preference;
          if (res) {
            this.hasSelectedPreferences = true;
            this.dynamicOptions.clear();
            res.options.forEach((option) => this.updateOptionForm(option));
            // if(this.discipline.timetable.length === this.dynamicOptions.value.length) {
            //   this.hasSelectedPreferences = true;
            // }
            return;
          }
          this.initializeDisciplineOptions();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  initializeDisciplineOptions() {
    this.dynamicOptions.clear();
    this.discipline.timetable.forEach(() => {
      this.addOptionForm();
    });
  }

  addUserPreference(disciplineID: string, userOptions: string[]) {
    this.apiService.addUserPreference(disciplineID, userOptions).subscribe(
      (response) => {
        this.snackBar.open(`${response}`, 'Close', {
          duration: 2000
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editUserPreference(disciplineID: string, options: string[]) {
    this.apiService
      .updateUserDisciplinePreference(disciplineID, options)
      .subscribe(
        (response) => {
          this.snackBar.open(`${response}`, 'Close', {
            duration: 2000
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getAvailablePlaces(option: string) {
    return this.discipline.timetable.find(
      (timetable) => timetable.option === option
    ).students.length;
  }

  getStudentOption() {
    const userID = localStorage.getItem('userID');
    return this.discipline?.timetable.find((timetable) =>
      timetable.students.find((student) => student === userID)
    );
  }

  submit() {
    const userOptions: string[] = [];
    this.dynamicOptions.value.forEach((element) =>
      userOptions.push(element.option)
    );
    this.wasPressed = true;
    if (!this.hasSelectedPreferences) {
      this.addUserPreference(this.discipline._id, userOptions);
      return;
    }
    this.editUserPreference(this.discipline._id, userOptions);
  }

  sendPreference() {
    this.apiService.insertUserOptionOnDiscipline(this.discipline._id).subscribe(
      (response) => {
        this.update.next(true);
        this.snackBar.open(`${response}`, 'Close', {
          duration: 2000
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  resetPreferences() {
    this.apiService.resetDisciplinePreferences(this.discipline._id).subscribe(
      (response) => {
        this.update.next(true);
        this.snackBar.open(`${response}`, 'Close', {
          duration: 2000
        });
      },
      (error) => {
        console.log(error);
      }
    );
    this.apiService
      .deletePreferencesByDiscipline(this.discipline._id)
      .subscribe((response) => console.log(response));
  }

  isSentOptionDisabled() {
    return this.wasPressed ? false : true;
  }

  isResetDisabled() {
    return this.getStudentOption() ? false : true;
  }

  getOccupancy(option: string) {
    return (
      (this.getAvailablePlaces(option) * 100) /
      this.discipline.maxNoOfStudentsPerTimetable
    );
  }

  determineColor(option: string) {
    let color = 'green';
    if (this.getOccupancy(option) >= 33 && this.getOccupancy(option) < 70) {
      color = 'orange';
    }
    if (this.getOccupancy(option) >= 70) {
      color = 'red';
    }
    return color;
  }
}
