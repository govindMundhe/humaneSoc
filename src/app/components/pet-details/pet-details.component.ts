import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
})
export class PetDetailsComponent implements OnInit {
  pet: any;
  private _snackBar = inject(MatSnackBar);

  constructor(private route: ActivatedRoute, private petService: PetService, private router: Router) {}

  ngOnInit() {
    const petId = Number(this.route.snapshot.paramMap.get('id'));
    this.petService.getPetById(petId).subscribe(data => {
      this.pet = data;
    });
  }

  adoptPet() {
    this.petService.adoptPet(this.pet.id).subscribe(() => {
      this.pet.adopted = true;
      this._snackBar.open('You have adopted this pet!', 'Dismiss', {duration: 3000})
    });
  }
}
