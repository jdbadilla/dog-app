# DogApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Before running

This application works in conjunction with the [Dog App Node BFF](<(https://github.com/jdbadilla/dog-app-bff)>). Please make sure you are running that before initializing the development server.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

You will initially arrive at a list of dog breeds served by the Dog API through the Node BFF.

If you click on one of the dog names, you will be redirected to a page containing additional details about the dog breed, such as images and other related dog breeds (if applicable).

## Analytics

This application uses Google Analytics to track events via the `window.dataLayer` object. The script for GA is initialized in the [index.html](https://github.com/jdbadilla/dog-app/blob/main/src/index.html#L4-L12) of the application.

It is used to collect three different user interactions, namely:

- User loads the paginated dog breeds
- User clicks on a specific dog breed
- User loads a specific dog breed's details

## Styling

This application was styled with Angular Material. For more information about its usage, read [here](https://material.angular.io/).

## Further help

For further help, do not hesitate to reach out to José Badilla, creator of the project, at jdbadilla@gmail.com.
