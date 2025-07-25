import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  private selectorOrg = signal<string>('Scroll');
  private selector = this.selectorOrg.asReadonly();
  private isExpanded = signal<boolean>(true);
  private isCardExpanded = this.isExpanded.asReadonly();

  changeSelector(option: string) {
    this.selectorOrg.set(option);
  }
  getSelector() {
    return this.selector();
  }

  getIsExpandedState() {
    return this.isCardExpanded();
  }
  toggleCardExpansion(isExpanded: boolean) {
    this.isExpanded.set(isExpanded);
  }
}
