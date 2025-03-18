import { Component, OnInit, ViewChild } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
  standalone: true,
  imports: [RouterLink,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatIconModule]
})
export class PetListComponent implements OnInit {
  pets: any[] = [];
  filteredPets: any[] = [];
  searchText = '';
  genderFilter = 'All';
  typeFilter = 'All';
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private petService: PetService, private router: Router) { }

  ngOnInit() {
    this.petService.getPets().subscribe(data => {
      this.pets = data;
      this.filteredPets = data;
      this.updateDataSource();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilters() {
    this.filteredPets = this.pets.filter(pet => {
      return (
        (this.searchText === '' || pet.name.toLowerCase().includes(this.searchText.toLowerCase()) || pet.breed.toLowerCase().includes(this.searchText.toLowerCase())) &&
        (this.genderFilter === 'All' || pet.gender === this.genderFilter) &&
        (this.typeFilter === 'All' || pet.type === this.typeFilter)
      );
    });

    this.pageIndex = 0;
    this.updateDataSource();
  }

  updateDataSource() {
    this.dataSource.data = this.filteredPets;
    if (this.paginator) {
      this.paginator.firstPage();
      this.paginator.length = this.filteredPets.length;
    }
  }

  goToDetails(petId: number) {
    this.router.navigate(['/details', petId]);
  }
}
