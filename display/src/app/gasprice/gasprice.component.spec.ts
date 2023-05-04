import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaspriceComponent } from './gasprice.component';

describe('GaspriceComponent', () => {
  let component: GaspriceComponent;
  let fixture: ComponentFixture<GaspriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaspriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaspriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
