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

  public trackLoadBreedsListEvent = (dogBreeds: DogBreed[]) => {
    this.gtag('load_content', {
      dogBreedIds: dogBreeds.map((breed) => breed.id),
    });
  };

  public trackSelectBreedEvent = (dogBreed: DogBreed) => {
    this.gtag('select_content', {
      dogBreedSelected: dogBreed,
    });
  };
}
