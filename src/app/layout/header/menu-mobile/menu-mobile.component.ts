import { Component, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Menu } from 'src/app/core/models/menu.models';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styles: []
})
export class MenuMobileComponent implements OnInit {
  menuList: Menu[] = [];
  subMenus:Menu[]=[];
  subMenuActive:boolean = false;
  subMenuTitle: string='';
  active:boolean = false;
  headerLogo = './assets/images/logos/cardano.svg';


  constructor(
    private menuService:MenuService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getMenu();
    // this.menuList = this.menuService.getMenu();
    this.menuService.activeMenuMobile.subscribe( (e) => this.active = e);
  }
  getMenu() {
    this.menuService.getMenu().subscribe((resp) => {
      this.menuList = resp;
    });
  }
  close(){
    this.menuService.activeMenuMobile.emit(false);
  }

  closeSubMenu(){
    this.subMenuActive = false;
    this.subMenuTitle = '';
    this.subMenus = [];
  }
  showSubMenu(item:Menu){
    this.subMenuActive = true;
    this.subMenus = item.submenus;
    this.subMenuTitle=item.text;
  }
  gotoPage(link: string | UrlTree){
    this.subMenuActive = false;
    this.active = false;
    this.router.navigateByUrl(link);
  }

}
