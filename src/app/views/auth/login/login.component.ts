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
    username: [ localStorage.getItem('username') || 'jjsoto', [Validators.required]],
    password: ['jjsoto', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    const { username, password } = this.loginForm.value;

    this.authService.login(username.value, password).subscribe((ok) => {
      console.log('VALOR :', ok);
      console.log('CREDENCIALES', ok);

      if (ok === true) {
        this.router.navigateByUrl('/home');
      } else {
        Swal.fire('Error', 'Credenciales Erroneas', 'error');
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
