import { HttpHeaders } from '@angular/common/http';

export class ServiceUtils {

  static getHttpOptions(responseType: string = 'json'): {} {
    return {
      responseType,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: localStorage.authorization,
      })
    };
  }

}
