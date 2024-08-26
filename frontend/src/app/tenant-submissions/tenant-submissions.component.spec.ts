import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantSubmissionsComponent } from './tenant-submissions.component';

describe('TenantSubmissionsComponent', () => {
  let component: TenantSubmissionsComponent;
  let fixture: ComponentFixture<TenantSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantSubmissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
