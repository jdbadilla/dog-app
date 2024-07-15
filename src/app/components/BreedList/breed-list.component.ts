import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { titleCase } from '../../helpers/titleCase';
import { GoogleAnalyticsService } from '../../services/google-analytics-service';
import { DogBreedService } from '../../services/dog-breed-service';
import { DogBreed } from '../../types/dog-breeds.types';

const INIT_PAGE_NUMBER = 1;

@Component({
  selector: 'breed-list',
  standalone: true,
  templateUrl: 'breed-list.component.html',
  styleUrl: 'breed-list.component.css',
  imports: [RouterLink, CommonModule],
})
export class BreedList {
  constructor(private router: Router) {}
  dogBreedService = inject(DogBreedService);
  analyticsService = inject(GoogleAnalyticsService);
  breeds: DogBreed[] = [];
  numberOfPages: number = 0;
  numberOfPagesArray: number[] = [];
  currentPage: number = INIT_PAGE_NUMBER;

  onBreedClick = (breed: DogBreed) => {
    this.analyticsService.trackSelectBreedEvent(breed);
  };
  onPageNumberClick = (pageNumber: number) => {
    this.currentPage = pageNumber;
    this.dogBreedService.getDogBreeds({ pageNumber }).then((dogBreedData) => {
      this.breeds = dogBreedData.dogBreeds;
    });
  };
  setTitleCase = (str: string) => {
    return titleCase(str);
  };

  ngOnInit() {
    this.dogBreedService
      .getDogBreeds({ pageNumber: INIT_PAGE_NUMBER })
      .then((dogBreedData) => {
        this.breeds = dogBreedData.dogBreeds;
        this.numberOfPages = dogBreedData.numberOfPages;
        this.numberOfPagesArray = new Array(this.numberOfPages)
          .fill(0)
          .map((val, idx) => idx + 1);
        this.currentPage = INIT_PAGE_NUMBER;

        this.analyticsService.trackLoadBreedsListEvent(this.breeds);
      });
  }
}
