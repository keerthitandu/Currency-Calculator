# Currency Converter App

This simple application provides a web-based interface for exchanging/converting money from one currency (say EUR) to another currency (say USD) by  using data fetched from an open-source API: [API-Layer] https://apilayer.com/marketplace/fixer-api/.

## How to setup in local

+ Download the package
+ Install nodejs
+ Go to Project directory
+ Run `npm install` to install all initial dependencies from `package.json`
+ Update the `api key` in `currency-service.service.ts` file
+ Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## About the application

#### Home Page

###### Before Conversion
<div align="center"> 
<img style="border:1px solid gray"  src="1.png"/>
</div>

###### Validation
<div align="center"> 
<img style="border:1px solid gray"  src="2.png"/>
</div>

###### After Conversion
<div align="center"> 
<img style="border:1px solid gray"  src="3.png"/>
</div>
#### Detail  Page

<div align="center"> 
<img style="border:1px solid gray"  src="4.png"/>
</div>