// src/app/app.ts archivo
import { Component } from '@angular/core';
import { ProviderFormComponent } from './components/provider-form/provider-form';
import { ProviderListComponent } from './components/provider-list/provider-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProviderListComponent],
  template: `
    <app-provider-list></app-provider-list>
    `,
})
export class App {}