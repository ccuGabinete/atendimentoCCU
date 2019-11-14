import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogadoService {

  public usuario = new Usuario();
  public messageSource = new BehaviorSubject(this.usuario);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  mudarUsuario(usuario: Usuario){
      this.messageSource.next(usuario);
  }
}
