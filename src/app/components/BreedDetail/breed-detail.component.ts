import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { titleCase } from '../../helpers/titleCase';
import { DogBreedService } from '../../services/dog-breed-service';
import { DogBreedDetails } from '../../types/dog-breeds.types';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { GoogleAnalyticsService } from '../../services/google-analytics-service';

const DEFAULT_NUMBER_OF_IMAGES_SHOWN = 3;

/**
 * Breed Detail Component - Retrieves breed-specific details using the Dog Breed Service
 */
@Component({
  selector: 'breed-detail',
  standalone: true,
  templateUrl: 'breed-detail.component.html',
  styleUrl: 'breed-detail.component.css',
  imports: [
    NgOptimizedImage,
    RouterLink,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
  ],
})
export class BreedDetail {
  constructor(private router: Router, private route: ActivatedRoute) {}
  dogBreedService = inject(DogBreedService);
  analyticsService = inject(GoogleAnalyticsService);
  breedDetails: DogBreedDetails = {
    name: '',
    imageUrls: [],
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

  fetchDogBreedDetails = () => {
    this.route.params.subscribe((params) => {
      this.dogBreedService
        .getDogBreedDetailsById({
          breedId: params['id'],
          numberOfImages: DEFAULT_NUMBER_OF_IMAGES_SHOWN,
        })
        .then((dogBreedDetails) => {
          this.breedDetails = dogBreedDetails;
          this.analyticsService.loadBreedDetailEvent(dogBreedDetails);
        });
    });
  };

  ngOnInit() {
    this.fetchDogBreedDetails();
  }
}
