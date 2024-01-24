import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoMedicoComponent } from './ingreso-medico.component';

describe('IngresoMedicoComponent', () => {
  let component: IngresoMedicoComponent;
  let fixture: ComponentFixture<IngresoMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoMedicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresoMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
