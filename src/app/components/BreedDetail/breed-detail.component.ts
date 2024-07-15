import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { titleCase } from '../../helpers/titleCase';
import { DogBreedService } from '../../services/dog-breed-service';
import { DogBreedDetails } from '../../types/dog-breeds.types';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'breed-detail',
  standalone: true,
  templateUrl: 'breed-detail.component.html',
  styleUrl: 'breed-detail.component.css',
  imports: [NgOptimizedImage, RouterLink, MatButtonModule, MatChipsModule],
})
export class BreedDetail {
  constructor(private router: Router, private route: ActivatedRoute) {}
  dogBreedService = inject(DogBreedService);
  breedDetails: DogBreedDetails = {
    name: '',
    imageUrl: '',
    id: '',
    relatedSubBreeds: [],
  };

  onBackClick = () => {
    this.router.navigate(['/breeds']);
  };

  setTitleCase = (str?: string) => {
    if (!str) {
      return '';
    }

    return titleCase(str);
  };

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.dogBreedService
        .getDogBreedDetailsById(params['id'])
        .then((dogBreedDetails) => {
          this.breedDetails = dogBreedDetails;
        });
    });
  }
}
