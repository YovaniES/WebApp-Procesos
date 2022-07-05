import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
})
export class AsideComponent implements OnInit {
  @Output() generalfixedAside = new EventEmitter<Boolean>();
  fixedAside = true; //OBS: Verificar
  menuList = [
    {
      id: 1,
      code: 'MAN',
      text: 'Reporte iniciativa',
      order: 1,
      icon: 'business',
      type: 'PAREN',
      link: 'reporte',
      enable: false,
      module: 'Reporte',
      displayed: false,
      submenus: [
        {
          code: 'MAN-001',
          text: 'reporte',
          order: 0,
          icon: 'business',
          type: 'ALONE',
          link: 'reporte/iniciativa',
          enable: false,
          module: 'MAN',
          displayed: false,
        },
        {
          code: 'MAN-002',
          text: 'Entidad',
          order: 20,
          icon: 'people',
          type: 'PAREN',
          link: 'reporte/dashboard',
          enable: false,
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
      link: 'registro',
      enable: false,
      module: 'administrador',
      displayed: false,
      submenus: [
        {
          code: 'PAS-001',
          text: 'Registros',
          order: 3,
          icon: 'menu_open',
          type: 'PAREN',
          link: 'registro/iniciativa',
          enable: false,
          module: 'PAS',
          displayed: false,
        },
        {
          code: 'PAS-003',
          text: 'reporte',
          order: 3,
          icon: 'format_list_numbered',
          type: 'ALONE',
          link: 'registro/reporte',
          enable: false,
          module: 'PAS',
          displayed: false,
        }
      ],
    },
  ];


  constructor() {}

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
