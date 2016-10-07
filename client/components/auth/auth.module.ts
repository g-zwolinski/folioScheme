'use strict';

angular.module('folioApp.auth', [
  'folioApp.constants',
  'folioApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
