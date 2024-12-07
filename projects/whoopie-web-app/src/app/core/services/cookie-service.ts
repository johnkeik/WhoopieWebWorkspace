import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class CookieService {

  getCookie(name: string): string {
    const cookies: Array<string> = document.cookie.split(';').map(c => c.replace(/^\s\+/g, '').trim());
    const cookieName = `${name}=`;

    const cookie = cookies.find(c => c.indexOf(cookieName) === 0);
    return cookie ? decodeURIComponent(cookie.substring(cookieName.length)) : '';
  }

  setCookie(name: string, value: string, expireDays = 365, domain?: string) {
    let expires = '';
    if (expireDays) {
      const date = new Date();
      date.setDate(date.getDate() + expireDays);
      expires = date.toUTCString();
    }
    document.cookie = `${encodeURIComponent(name)}=${
      encodeURIComponent(value) || ''
    }; expires=${expires}; path=/; secure=true`;
  }

}