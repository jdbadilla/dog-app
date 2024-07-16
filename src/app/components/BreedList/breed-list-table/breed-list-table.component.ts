import { Component, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventEmitter } from 'stream';
import { titleCase } from '../../../helpers/titleCase';
import { GoogleAnalyticsService } from '../../../services/google-analytics-service';
import { DogBreed } from '../../../types/dog-breeds.types';

@Component({
  standalone: true,
  selector: 'breed-list-table',
  templateUrl: 'breed-list-table.component.html',
  styleUrl: 'bread-list-table.component.css',
  imports: [RouterLink],
})
export class BreedListTable {
  @Input() breeds: DogBreed[] = [];
  @Input() isAggregatedView: boolean = false;
  analyticsService = inject(GoogleAnalyticsService);

  onBreedClick = (breed: DogBreed) => {
    this.analyticsService.trackSelectBreedEvent(breed);
  };
  setTitleCase = (str: string) => {
    return titleCase(str);
  };
}
