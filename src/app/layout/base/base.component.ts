import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  fixedAside: Boolean = false;
  menuError: boolean = false;
  message: string = 'Preparando contenido...';
  loading: boolean = true;
  fullName: string = '';
  userAbbreviation = '';
  sideNavState = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeUser();
  }

  changeSideFixed(event: Boolean) {
    this.fixedAside = event;
  }

  initializeUser() {
    this.fullName = this.authService.getUsername();
    if (this.fullName) {
      const fullNameToArray = this.fullName.split(' ').map((item: string) => {
        return item.substring(0, 1).toUpperCase();
      });
      this.userAbbreviation = fullNameToArray.join('');
    }
  }
}
