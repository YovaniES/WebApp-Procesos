import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  fullName: string = '';
  userAbbreviation = '';
  fixedAside: boolean = true;

  constructor(
    private authService: AuthService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.initializeUser();
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

  openMobileMenu() {
    this.menuService.activeMenuMobile.emit(true);
  }

  logout() {
    this.authService.logout();
  }
}
