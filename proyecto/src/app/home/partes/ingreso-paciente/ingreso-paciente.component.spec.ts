import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoPacienteComponent } from './ingreso-paciente.component';

describe('IngresoPacienteComponent', () => {
  let component: IngresoPacienteComponent;
  let fixture: ComponentFixture<IngresoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
