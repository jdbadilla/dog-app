import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { BreedList } from './BreedList/breed-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BreedList],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  title = 'dog-app';

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        // scroll to the top whenever the user navigates to a new page
        window.scroll(0, 0);
      }
    });
  }
}
