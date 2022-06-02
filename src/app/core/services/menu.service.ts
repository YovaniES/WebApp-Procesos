import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { API_MENU } from '../constants/url.constants';
import { Menu } from '../models/menu.models';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // verticalLogo = './assets/images/logos/cardano.svg';
  toggleUserPanel = new EventEmitter<boolean>();
  activeMenuMobile = new EventEmitter<boolean>();
  sectionTitle = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  // ACTUALIZA EL MENÚ EN EL LOCAL STORAGE DESDE UN API
  // updateMenu(): Observable<boolean> {
  //   return (
  //     this.http.get(API_MENU).pipe
  //       // .firstValueFrom()
  //       .map((resp: Menu[]) => {
  //         const menu = resp.map((m) => {
  //           return { ...m, submenus: m.submenus.sort(this.compare) };
  //         });

  //         this.setSessionItem('menu', menu);
  //         return Promise.resolve(true);
  //       })
  //   );
  // }


  // menu: Menu[] = [];

  // // Función de configuración del menú de acuerdo al token. Se invoca en aside y header
  // setMenu(): Promise<boolean> {
  //   // Validar si se tiene un menú guardado
  //   const menu_local_version = this.getSessionItem('menu');
  //   if (menu_local_version.code == true) {
  //     return Promise.resolve(true);
  //   } else {
  //     // No tiene menú guardado: Actualizarlo
  //     return this.updateMenu();
  //   }
  // }

  getMenu(): Observable<any> {
    return this.http.get(API_MENU);

    // const menu = this.getSessionItem('menu');
    // if (menu.code == true) return menu.object;
    // else return [];
  }

  getSessionItem(name: string): { code: boolean; object?: any } {
    try {
      //const item =  this.decryptData(sessionStorage.getItem(name));
      const item: any = localStorage.getItem(name);
      const object = JSON.parse(item);
      if (!!object) {
        return { code: true, object: object };
      } else {
        return { code: false };
      }
    } catch (error) {
      return { code: false };
    }
  }

  setSessionItem(name: string, item: any) {
    const data = JSON.stringify(item);

    localStorage.setItem(name, data);
    return true;
  }

  private compare(a: Menu, b: Menu) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }
}
