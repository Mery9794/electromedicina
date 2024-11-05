import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdmiService } from '../../../servicios/admi.service'; 
import { Observable } from 'rxjs';
import { UserProfesional } from '../../../models';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  userId!: string;
  usuario$!: Observable<UserProfesional | null>;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: AdmiService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.usuario$ = this.firebaseService.getUserById(this.userId);
  }
}