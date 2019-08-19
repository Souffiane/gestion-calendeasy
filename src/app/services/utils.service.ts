import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  generatePassword(): string {
    return Math.random().toString(36).slice(-8);
  }
}
