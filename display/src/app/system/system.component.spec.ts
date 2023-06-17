import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemComponent } from './system.component';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('SystemComponent', () => {
  let component: SystemComponent;
  let fixture: ComponentFixture<SystemComponent>;
  let httpClient:HttpClient;
  let httpTestingController: HttpTestingController;
  let request:TestRequest

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemComponent ],
      imports:[HttpClientTestingModule]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient)
    httpTestingController=TestBed.inject(HttpTestingController)
    fixture = TestBed.createComponent(SystemComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); // don't trigger the ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request data',()=>{
    const testData = {tmp:10, ram_usage:12, cpu_usage:1,local_ip:"123.123.123.123"}
    component.updateData()
    request= httpTestingController.expectOne("http://localhost:12345/system/data")
    request.flush(testData)
    expect(request.request.method).toBe('GET');
    expect(component.temp).toBe(testData.tmp)
    expect(component.ram).toBe(testData.ram_usage)
    expect(component.cpu).toBe(testData.cpu_usage)
    expect(component.ip).toBe(testData.local_ip)
  });

  it('should request last boot time',()=>{
    const testData = {tmp:10, ram_usage:12, cpu_usage:1,local_ip:"123.123.123.123"}
    component.updateData()
    request= httpTestingController.expectOne("http://localhost:12345/system/data")
    request.flush(testData)
    expect(request.request.method).toBe('GET');
    expect(component.temp).toBe(testData.tmp)
    expect(component.ram).toBe(testData.ram_usage)
    expect(component.cpu).toBe(testData.cpu_usage)
    expect(component.ip).toBe(testData.local_ip)
  });

  it('should request last boot time',()=>{
    const testData = {lastboot:"10.123123"}
    component.updateBootTime()
    request= httpTestingController.expectOne("http://localhost:12345/system/lastboot")
    request.flush(testData)
    expect(request.request.method).toBe('GET');
    expect(component.last_boot).toBe(testData.lastboot)
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

});
