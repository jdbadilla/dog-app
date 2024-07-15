import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BreedList } from './BreedList/breed-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BreedList],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'dog-app';

  ngOnInit() {
    this.router.navigate(['/breeds']);
  }
}
