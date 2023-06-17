import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteComponent } from './remote.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

describe('RemoteComponent', () => {
  let component: RemoteComponent;
  let fixture: ComponentFixture<RemoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteComponent ],
      providers:[HttpClient, HttpHandler,MatSnackBar, Overlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
