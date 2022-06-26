import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = this.fb.group({
    idaplicacion:['1'],
    username: ['jjsoto', [Validators.required]],
    password: ['jjsoto', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.loginForm.value)
        .subscribe((resp) => {
          console.log('CREDENCIALES', resp.user);

      if (resp.user.aplicacion == 1 && resp.user.acceso == 1) {
        this.router.navigateByUrl('home');
      } else {
        Swal.fire('Error', 'Credenciales incorrectas', 'error');
      }
    });
  }

  campoNoValido(campo: string): boolean {
    if (
      this.loginForm.get(campo)?.invalid &&
      this.loginForm.get(campo)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }
}
