import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Menu } from 'src/app/core/models/menu.models';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {

  @Output() generalfixedAside = new EventEmitter<Boolean>();
  fixedAside = false;
  menuList: Menu[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.getMenu();
  }

  /**llamammos la lista de menus desde nuestro JSON-SERVER */
  getMenu() {
    this.menuService.getMenu().subscribe((resp) => {
      this.menuList = resp;
      console.log('DATA', resp);
    });
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
