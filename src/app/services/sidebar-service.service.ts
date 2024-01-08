import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isSidebarOpen = new BehaviorSubject<boolean>(false);

  setIsSidebarOpen(isOpen: boolean) {
    this.isSidebarOpen.next(isOpen);
  }

  getIsSidebarOpen() {
    return this.isSidebarOpen.asObservable();
  }
  
  getIsSidebarOpenValue(): boolean {
    return this.isSidebarOpen.value;
  }
}
