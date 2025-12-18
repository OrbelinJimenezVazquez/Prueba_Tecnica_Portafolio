// src/app/services/ui.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiService {
  private reloadProvidersSource = new Subject<void>();
  reloadProviders$ = this.reloadProvidersSource.asObservable();

  triggerReloadProviders() {
    this.reloadProvidersSource.next();
  }
}