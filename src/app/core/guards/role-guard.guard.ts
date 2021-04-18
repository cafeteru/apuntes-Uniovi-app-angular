import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanLoad {

  canLoad(): boolean {
    return true;
  }
}
