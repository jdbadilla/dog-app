import { Injectable } from '@angular/core';
import { DogBreed } from '../types/dog-breeds.types';

declare global {
  interface Window {
    dataLayer: any;
    gtag: (eventName: string, eventParams: any) => void;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  private gtag;

  constructor() {
    this.gtag = window.gtag;
  }

  /** Used to track what breeds the user sees when the list reloads */
  public trackLoadBreedsListEvent = (dogBreeds: DogBreed[]) => {
    this.gtag('load_content', {
      dogBreedIds: dogBreeds.map((breed) => breed.id),
      customLabel: 'load breed list',
    });
  };

  /** Used to track what breed the user selects */
  public trackSelectBreedEvent = (dogBreed: DogBreed) => {
    this.gtag('select_content', {
      dogBreedSelected: dogBreed,
      customLabel: 'click on breed',
    });
  };

  /** Used to track when the user loads the breed details page */
  public loadBreedDetailEvent = (dogBreed: DogBreed) => {
    this.gtag('load_content', {
      dogBreedDetails: dogBreed,
      customLabel: 'load breed detail',
    });
  };
}
