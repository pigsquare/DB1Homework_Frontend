import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGradeManageComponent } from './course-grade-manage.component';

describe('CourseGradeManageComponent', () => {
  let component: CourseGradeManageComponent;
  let fixture: ComponentFixture<CourseGradeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseGradeManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseGradeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
