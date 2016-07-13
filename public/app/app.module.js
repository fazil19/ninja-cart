import angular from 'angular';
import main from 'app/main';

export default angular
	.module('NinjaKart', ['ngMaterial', main.name])
	.config(($mdThemingProvider) => {
		console.info("app loading");

		$mdThemingProvider.theme('default')
			.primaryPalette('red')
			.accentPalette('blue');
	});
