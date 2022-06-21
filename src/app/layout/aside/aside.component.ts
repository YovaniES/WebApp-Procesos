import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
})
export class AsideComponent implements OnInit {
  @Output() generalfixedAside = new EventEmitter<Boolean>();
  fixedAside = false;
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
      link: 'bandeja',
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
          link: 'bandeja/operaciones',
          enable: true,
          module: 'PAS',
          displayed: false,
        },
        {
          code: 'PAS-002',
          text: 'buscar',
          order: 3,
          icon: 'format_list_numbered',
          type: 'oso',
          link: 'bandeja/buscar',
          enable: true,
          module: 'PAS',
          displayed: false,
        },
      ],
    },
  ];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
  }


  clickLinkMenu() {
    this.menuList.forEach((item) => {
      item.displayed = false;
    });
  }

  clickToggleMenu(item: any) {
    const final = !item.displayed;
    if (!(this.fixedAside == false && final == false)) {
      this.menuList.map((item) => {
        item.displayed = false;
      });
      item.displayed = final;
    }
    this.toggleAside(true);
  }

  toggleAside(e: boolean) {
    this.fixedAside = e;
    this.generalfixedAside.emit(this.fixedAside);
  }
}
