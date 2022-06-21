import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Menu } from '../models/menu.models';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  toggleUserPanel = new EventEmitter<boolean>();
  activeMenuMobile = new EventEmitter<boolean>();
  sectionTitle = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  getSessionItem(name: string): { code: boolean; object?: any } {
    try {
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
