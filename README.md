# Tariff Viewer Application

A simple responsive application to view tariff Data in a easliy accessible list. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

## Technical Details

- Fake API creater: [json-server](https://github.com/typicode/json-server);
- Framework used: [Angular CLI](https://github.com/angular/angular-cli);
- Design responsive component with: [angular-material](https://material.angular.io/);
- concurrent command line operation with: [concurrently](https://github.com/open-cli-tools/concurrently);


## Development server

- Run `npm run start-app` which boots up both **fake-api-server** and **angular dev server**. 
- UI: Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
- API(Optional): If you wish to view raw data navigate to following exposed routes:

**Routes:**

- Resource raw routes
  - http://localhost:3000/countries
  - http://localhost:3000/regions
  - http://localhost:3000/tariffs
- API routes
  - /api/countries -> /countries
  - /api/regions -> /regions
  - /api/tariffs/:regionReferenceId -> /tariffs

  Cheers! you are up with application running.


## Usage
The Application consists of two parts: **Internet comparison form** and **Tariff List**

### Steps

#### Provide Comparison form data
1. Country => Currently supported => `Germany`
2. City => Currently suported => `Heidelberg`, `Mannheim`
> **Note**
> The `form-fields` are equiped with error messages `Show Tariffs` will only enable when form data is valid.

#### Show Tariffs
1. Tariffs with user selected(*region specific*) is visible.
2. User can modify data in `internet-comparison-form` to view changes in list instantly.
2. Following fields can be sorted => `Up Speed`, `Down Speed`, `Tariff Value`.
3. **Global Filter**: Filters all columns with specified value.
4. **Custom Filter**: Following fields can be filtered  => `Name`,`Up Speed`, `Down Speed`, `Tariff Value`.
5. On Smaller screens => handset-screen `benefits` columns is hidden. Will only be available on larger screens.
6. On Smaller screens => handset-screen `Up Speed`, `Down Speed` columnare shown as numeric value. Whereas on larger screens they are shown as progress bar with `currentSpeed` and `maxSpeedLimitPerSelectedArea` values.
> **Note**
> Only exact match in filter renders data.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help


