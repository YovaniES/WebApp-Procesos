import { Component, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Menu } from 'src/app/core/models/menu.models';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styles: [],
})
export class MenuMobileComponent implements OnInit {
  subMenus: Menu[] = [];
  subMenuActive: boolean = false;
  subMenuTitle: string = '';
  active: boolean = false;
  headerLogo = './assets/images/logos/cardano.svg';

  menuList = [
    {
      id: 1,
      code: 'MAN',
      text: 'Mantenimiento',
      order: 1,
      icon: 'business',
      type: 'PAREN',
      link: 'vacantes',
      enable: true,
      module: 'mantenimiento',
      displayed: false,
      submenus: [
        {
          code: 'MAN-001',
          text: 'requerimiento',
          order: 0,
          icon: 'business',
          type: 'ALONE',
          link: 'vacantes/requerimiento',
          enable: true,
          module: 'MAN',
          displayed: false,
        },
        {
          code: 'MAN-002',
          text: 'Entidad',
          order: 20,
          icon: 'people',
          type: 'PAREN',
          link: 'vacantes/tracking',
          enable: true,
          module: 'MAN',
          displayed: false,
        },
      ],
    },

    {
      id: 2,
      code: 'HER',
      text: 'Mantenimiento iniciativa',
      order: 1,
      icon: 'admin_panel_settings',
      type: 'PAREN',
      link: 'registo',
      enable: true,
      module: 'administrador',
      displayed: false,
      submenus: [
        {
          code: 'PAS-001',
          text: 'Registros',
          order: 3,
          icon: 'menu_open',
          type: 'oso',
          link: 'registo/iniciativa',
          enable: true,
          module: 'PAS',
          displayed: false,
        },
        {
          code: 'PAS-003',
          text: 'editar',
          order: 3,
          icon: 'format_list_numbered',
          type: 'oso',
          link: 'registo/editar',
          enable: true,
          module: 'PAS',
          displayed: false,
        },
      ],
    },
  ];

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.menuService.activeMenuMobile.subscribe((e) => (this.active = e));
  }

  close() {
    this.menuService.activeMenuMobile.emit(false);
  }

  closeSubMenu() {
    this.subMenuActive = false;
    this.subMenuTitle = '';
    this.subMenus = [];
  }
  showSubMenu(item: Menu) {
    this.subMenuActive = true;
    this.subMenus = item.submenus;
    this.subMenuTitle = item.text;
  }
  gotoPage(link: string | UrlTree) {
    this.subMenuActive = false;
    this.active = false;
    this.router.navigateByUrl(link);
  }
}
