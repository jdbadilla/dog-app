import { Routes } from '@angular/router';
import { BreedDetail } from './components/BreedDetail/breed-detail.component';
import { BreedList } from './components/BreedList/breed-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'breeds',
    pathMatch: 'full',
  },
  {
    path: 'breeds',
    children: [
      {
        path: '',
        title: 'Dog Breed List',
        component: BreedList,
      },
      {
        path: ':id',
        title: 'Dog Breed Details',
        component: BreedDetail,
      },
    ],
  },
];
