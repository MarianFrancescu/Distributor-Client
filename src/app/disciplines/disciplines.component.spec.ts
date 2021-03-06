import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinesComponent } from './disciplines.component';

describe('DashboardComponent', () => {
  let component: DisciplinesComponent;
  let fixture: ComponentFixture<DisciplinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisciplinesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
