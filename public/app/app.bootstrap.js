import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import app from './app.module';

// Manually bootstrap app to avoid screen flicker
angular.element(document).ready(() => {
  angular.module('ninja-kart', ['ngMaterial', app.name])
    .run(() => {
      console.info('bootstrapping app');
    });

  let body = document.getElementsByTagName('body')[0];
  angular.bootstrap(body, ['ninja-kart']);
});