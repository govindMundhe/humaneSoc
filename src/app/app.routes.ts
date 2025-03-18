import { Routes } from '@angular/router';
import { PetListComponent } from './components/pet-list/pet-list.component';
import { PetDetailsComponent } from './components/pet-details/pet-details.component';

export const routes: Routes = [
  { path: '', component: PetListComponent },
  { path: 'details/:id', component: PetDetailsComponent }
];
