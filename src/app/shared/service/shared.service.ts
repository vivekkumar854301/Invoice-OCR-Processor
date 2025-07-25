import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private selectorOrg = signal<string>('Scroll');
  private selector = this.selectorOrg.asReadonly();

  changeSelector(option: string){
    this.selectorOrg.set(option);
  }
  getSelector(){
    return this.selector();
  }
}
