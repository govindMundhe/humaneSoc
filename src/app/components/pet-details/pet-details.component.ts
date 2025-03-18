import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';import { NotificationService } from '../../services/notification.service';
``

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
})
export class PetDetailsComponent implements OnInit {
  pet: any;

  constructor(private route: ActivatedRoute, private petService: PetService, private notification: NotificationService) {}

  ngOnInit() {
    const petId = Number(this.route.snapshot.paramMap.get('id'));
    this.petService.getPetById(petId).subscribe(data => {
      this.pet = data;
    });
  }

  adoptPet() {
    this.petService.adoptPet(this.pet.id).subscribe(() => {
      this.pet.adopted = true;
      this.notification.showNotification("You've adopted this pet!")
    });
  }
}
