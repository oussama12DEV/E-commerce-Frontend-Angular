import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaddysComponent } from './caddys.component';

describe('CaddysComponent', () => {
  let component: CaddysComponent;
  let fixture: ComponentFixture<CaddysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaddysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaddysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
