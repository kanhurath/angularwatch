import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../constants/app-constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getHomeMenu() {
    const empCode = this.authService.getUserId();
    return this.http.post(API_URLS.SUBMENU_URL, { login_Id: empCode }).pipe(
      tap((data) => console.log(data)),
      map((data: any[]) => {
        let menu = [];
        data.forEach((item) => {
          let itemIndex = menu.findIndex((el) => el.menu_id === item.menu_id);
          if (menu.length && itemIndex !== -1) {
            menu[itemIndex]['sub_menus'].push(item.submenuBean);
          } else {
            const el = {
              menu_id: item.menu_id,
              menu_Name: item.menu_Name,
              sub_menus: [item.submenuBean],
            };
            menu.push(el);
          }
        });
        return menu;
      }),
      tap((data) => console.log(data))
    );
  }

  

  public getHomeMenuXXX() {

    let empCode = this.authService.getUserId();
    alert(sessionStorage.getItem("userType"));
    //first check is it guest login
    if(sessionStorage.getItem("userType") == 'GUEST')
    {
    empCode = sessionStorage.getItem("GUESTLOGIN");       
    }
    alert(empCode);
    return this.http.post(API_URLS.SUBMENU_URL, { login_Id:empCode }).pipe(
      tap((data) => console.log(data)),
      map((data: any[]) => {
        let menu = [];
        data.forEach((item) => {
          let itemIndex = menu.findIndex((el) => el.menu_id === item.menu_id);
          if (menu.length && itemIndex !== -1) {
            menu[itemIndex]['sub_menus'].push(item.submenuBean);
          } else {
            const el = {
              menu_id: item.menu_id,
              menu_Name: item.menu_Name,
              sub_menus: [item.submenuBean],
            };
            menu.push(el);
          }
        });
        return menu;
      }),
      tap((data) => console.log(data))
    );
  }
}
