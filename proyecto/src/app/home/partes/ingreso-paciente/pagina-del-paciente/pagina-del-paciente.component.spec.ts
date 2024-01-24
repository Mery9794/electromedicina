import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDelPacienteComponent } from './pagina-del-paciente.component';

describe('PaginaDelPacienteComponent', () => {
  let component: PaginaDelPacienteComponent;
  let fixture: ComponentFixture<PaginaDelPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaDelPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaDelPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
