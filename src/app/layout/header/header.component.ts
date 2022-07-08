import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/core/interfaces/auth.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  fullName: string = '';
  nameini!: string;
  userAbbreviation = '';
  fixedAside: boolean = true;
  phtouri = "NONE";


  constructor(
    private authService: AuthService,
    private menuService: MenuService,
    private fb: FormBuilder,

  ) {}

  ngOnInit(): void {
    this.initializeUser();
    this.userFullName();

    // this.userFullName = this.currentUser.user.nombres + ' ' + this.currentUser.user.apellidoPaterno;
  }


  userLoged: FormGroup = this.fb.group({
    username: ['jjsoto'],
    password: ['jjsoto',],
  });

  currentUser: string = ''
  userFullName() {
    this.authService.login(this.userLoged.value)
        .subscribe((resp) => {
          // console.log('USER-AC', resp.user);
          this.currentUser = resp.user.nombres + ' '+resp.user.apellidoPaterno ;
        })
      }


  initializeUser() {
    this.fullName = this.authService.getUsername();

    const names:string[] = this.fullName.split(" ");
    if (names.length > 1){
      this.nameini = names[0].charAt(0) + names[1].charAt(0);
    }else{
      this.nameini = names[0].substr(0,2).toUpperCase();
    }

    // if (this.fullName) {
    //   const fullNameToArray = this.fullName.split(' ').map((item: string) => {
    //     return item.substring(0, 1).toUpperCase();
    //   });
    //   this.userAbbreviation = fullNameToArray.join('');
    // }
  }

  openMobileMenu() {
    this.menuService.activeMenuMobile.emit(true);
  }

  logOut() {
    this.authService.logout();
  }
}
