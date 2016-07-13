class NavbarController  {
	constructor($scope, $mdDialog) {

		$scope.showCart= () => {
			const cart = $mdDialog.confirm({
				locals: {
					parentScope: $scope
				},
				controller: ($scope, parentScope) => {
					$scope.parentScope = parentScope;

					$scope.close = () => {
						$mdDialog.cancel();
					};
				},
				template: `
					<md-dialog aria-label="Your Cart" ng-cloak>
						<form>
							<md-toolbar>
								<div class="md-toolbar-tools">
									<h2>Your Cart</h2>
								</div>
							</md-toolbar>
							<md-dialog-content>
								<div class="md-dialog-content">
									<h3>Cart Contents</h3>
								</div>
							</md-dialog-content>
							<md-dialog-actions layout="row" layout-align="end">
								<md-button ng-click="close()">Close</md-button>
							</md-dialog-actions>
						</form>
					</md-dialog>
				`
			});

			$mdDialog.show(cart);
		};

	}
}

export default {
	name: 'navbar',
	config: {
		bindings: {
			data: '<',
			cartItems: '<'
		},
		controller: ['$scope', '$mdDialog', NavbarController],
		template: `
			<md-toolbar class="md-toolbar-tools" layout="row" id="navbar-container">
				<h1>{{$ctrl.data.appName}}</h1>
				<span flex></span>
				<md-button aria-label="View Cart" ng-click="showCart()">
						<md-icon>
								<i class="material-icons md-48 md-light">shopping_cart</i>
						</md-icon>
						<span ng-if="$ctrl.cartItems">{{$ctrl.cartItems}} Item(s)</span>
				</md-button>
			</md-toolbar>
		`
	}
};