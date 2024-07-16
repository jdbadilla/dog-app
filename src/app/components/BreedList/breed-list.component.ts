import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GoogleAnalyticsService } from '../../services/google-analytics-service';
import { DogBreedService } from '../../services/dog-breed-service';
import { DogBreed } from '../../types/dog-breeds.types';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BreedListTable } from './breed-list-table/breed-list-table.component';

const DEFAULT_PAGE_NUMBER = 1;

/**
 * Breed List Component - Retrieves the paginated breed list using the Dog Breed Service and displays it
 */
@Component({
  selector: 'breed-list',
  standalone: true,
  templateUrl: 'breed-list.component.html',
  styleUrl: 'breed-list.component.css',
  imports: [
    BreedListTable,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
})
export class BreedList {
  constructor(private router: Router) {}
  dogBreedService = inject(DogBreedService);
  analyticsService = inject(GoogleAnalyticsService);
  breeds: DogBreed[] = [];
  numberOfPages: number = 0;
  numberOfPagesArray: number[] = [];
  currentPage: number = DEFAULT_PAGE_NUMBER;
  isAggregatedView: boolean = true;

  fetchDogBreeds = () => {
    this.dogBreedService
      .getDogBreeds({ pageNumber: this.currentPage })
      .then((dogBreedData) => {
        this.breeds = dogBreedData.dogBreeds;
      });
  };
  onPageNumberClick = (pageNumber: number) => {
    this.currentPage = pageNumber;
    this.fetchDogBreeds();
  };
  onNextPageClick = () => {
    this.currentPage = this.currentPage + 1;
    this.fetchDogBreeds();
  };
  onPreviousPageClick = () => {
    this.currentPage = this.currentPage - 1;
    this.fetchDogBreeds();
  };
  toggleAggregatedView = (isAggregated: boolean) => {
    this.isAggregatedView = isAggregated;
  };

  ngOnInit() {
    this.dogBreedService
      .getDogBreeds({ pageNumber: DEFAULT_PAGE_NUMBER })
      .then((dogBreedData) => {
        this.breeds = dogBreedData.dogBreeds;
        this.numberOfPages = dogBreedData.numberOfPages;
        this.numberOfPagesArray = new Array(this.numberOfPages)
          .fill(0)
          .map((val, idx) => idx + 1);
        this.currentPage = DEFAULT_PAGE_NUMBER;

        this.analyticsService.trackLoadBreedsListEvent(this.breeds);
      });
  }
}
