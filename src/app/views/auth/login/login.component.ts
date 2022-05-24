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
  public myLoginForm: FormGroup = this.fb.group({
    username: [ localStorage.getItem('username') || 'gherson.perez@telefonica.com', [Validators.required, Validators.email]],
    password: ['hola', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    const { username, password } = this.myLoginForm.value;

    this.authService.login(username, password).subscribe((ok) => {
      console.log('VALOR :', ok);
      if (ok === true) {
        this.router.navigateByUrl('/home');
      } else {
        Swal.fire('Error', 'Credenciales Erroneas', 'error');
      }
    });
  }

  campoNoValido(campo: string): boolean {
    if (
      this.myLoginForm.get(campo)?.invalid &&
      this.myLoginForm.get(campo)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }
}
