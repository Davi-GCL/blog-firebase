# BlogFirebase

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Configurando a API

1- Crie um projeto no firebase, após criado o projeto, adicione um aplicativo no projeto firebase;

2- Copie o código dentro do "firebaseConfig={}" apresentado pelo firebase, crie o arquivo "environment.ts" na pasta "src/environments/" seguindo o exemplo do arquivo "environment.example.ts" cole o código firebaseconfig;

3- Crie um banco de dados Firestore Database no modo de testes. E crie uma coleção chamada "Posts";

4- Ative no firebase Authentication os provedores de login: email/senha , Google. Depois, vá na aba settings e adicione em dominios autorizados o dominio do site (ex: localhost );

5- Inicie o Cloud Storage no modo de testes;


