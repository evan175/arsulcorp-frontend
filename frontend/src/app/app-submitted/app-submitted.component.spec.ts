import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSubmittedComponent } from './app-submitted.component';

describe('AppSubmittedComponent', () => {
  let component: AppSubmittedComponent;
  let fixture: ComponentFixture<AppSubmittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSubmittedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
