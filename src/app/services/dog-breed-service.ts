import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DogBreed, DogBreedDetails } from '../types/dog-breeds.types';

const DOG_BREED_BASE_URL = 'http://localhost:3000/breeds';

@Injectable({
  providedIn: 'root',
})
export class DogBreedService {
  constructor(private http: HttpClient) {}

  public getDogBreeds = async ({
    pageNumber,
    resultsPerPage = 10,
  }: {
    pageNumber: number;
    resultsPerPage?: number;
  }): Promise<{ numberOfPages: number; dogBreeds: DogBreed[] }> => {
    return new Promise((resolve, reject) => {
      this.http
        .get<{ numberOfPages: number; dogBreeds: DogBreed[] }>(
          `${DOG_BREED_BASE_URL}/list/all?size=${resultsPerPage}&page=${pageNumber}`
        )
        .subscribe((data) => {
          resolve(data);
        });
    });
  };

  public getDogBreedDetailsById = async (
    breedId: string
  ): Promise<DogBreedDetails> => {
    return new Promise((resolve, reject) => {
      this.http
        .get<DogBreedDetails>(`${DOG_BREED_BASE_URL}/detail/${breedId}`)
        .subscribe((breedDetails) => {
          resolve(breedDetails);
        });
    });
  };
}
