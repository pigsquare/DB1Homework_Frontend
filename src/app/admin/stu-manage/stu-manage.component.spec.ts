import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuManageComponent } from './stu-manage.component';

describe('StuManageComponent', () => {
  let component: StuManageComponent;
  let fixture: ComponentFixture<StuManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
