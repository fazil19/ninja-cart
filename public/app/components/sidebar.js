class SidebarController  {
	constructor($scope, $mdDialog) {
		$scope.selectedQuantity = 1;
		$scope.showInStorePickup = false;
		$scope.showAddToCart = false;

		// event emitter for additions to cart
		$scope.onAddConfirmation = () => {
			this.onCartChange({
				$event: {
					itemsToAdd: $scope.selectedQuantity
				}
			});
		};

		$scope.$watch("$ctrl.data.purchasingChannelCode", (value) => {
			switch(value) {
				case "0":
					$scope.showInStorePickup = true;
					$scope.showAddToCart = true;
					break;
				case "1":
					$scope.showAddToCart = true;
					break;
				case "2":
					$scope.showInStorePickup = true;
					break;
				default:
					break;
			}
		});

		$scope.showConfirm = (boxType) => {
			const addToCart = $mdDialog.confirm({
				locals: {
					parentScope: $scope,
					boxType: boxType
				},
				controller: ($scope, parentScope, boxType) => {
					$scope.parentScope = parentScope;
					$scope.displayData = {};

					if (boxType === 'Cart') {
						$scope.displayData.title = 'Add To Cart';
						$scope.displayData.confirmButton = 'Add';
						$scope.displayData.message = `add ${$scope.parentScope.selectedQuantity} item(s) to your cart?`;
					} else {
						$scope.displayData.title = 'In Store Pickup';
						$scope.displayData.confirmButton = 'Pickup';
						$scope.displayData.message = `pickup ${$scope.parentScope.selectedQuantity} item(s) in store?`;
					}

					$scope.confirm = () => {
						// notify parent of confirmation
						$scope.parentScope.onAddConfirmation();
						$mdDialog.hide(); // accepts promise
					};

					$scope.cancel = () => {
						$mdDialog.cancel(); // rejects promise
					};
				},
				template: `
					<md-dialog aria-label="Add to cart" ng-cloak>
						<form>
							<md-toolbar>
								<div class="md-toolbar-tools">
									<h2>Add To Cart</h2>
								</div>
							</md-toolbar>
							<md-dialog-content>
								<div class="md-dialog-content">
									<h3>Are you sure you want to {{displayData.message}}</h3>
								</div>
							</md-dialog-content>
							<md-dialog-actions layout="row" layout-align="end">
								<md-button ng-click="cancel()">Cancel</md-button>
								<md-button ng-click="confirm()">{{displayData.confirmButton}}</md-button>
							</md-dialog-actions>
						</form>
					</md-dialog>
				`
			});

			$mdDialog
				.show(addToCart)
				.then(() => {
					// items added, reset quantity to 1
					$scope.selectedQuantity = 1;
				}, () => {
					// canceled, do nothing
				});
		};
	}
}

export default {
	name: 'sidebar',
	config: {
		bindings: {
			data: '<',
			onCartChange: '&'
		},
		controller: ['$scope', '$mdDialog', SidebarController],
		template: `
			<div layout="column">
					<div layout="row" layout-align="space-around start" layout-sm="row" layout-wrap>
							<h2>{{$ctrl.data.price}} <span class="price-subtitle">online price</span></h2>
							<md-input-container class="md-block">
									<label>Quantity</label>
									<input required type="number" ng-model="selectedQuantity" min="1" max="1000"/>
							</md-input-container>
					</div>
					<div layout="row" layout-align="center" id="right">
							<md-button
								flex="80"
								ng-show="showInStorePickup"
								class="md-raised md-primary"
								ng-disabled="!selectedQuantity"
								ng-click="showConfirm('inStore')"
								aria-label="Pick Up In Store">
									Pick Up In Store
								</md-button>
							<md-button
								flex="80"
								ng-show="showAddToCart"
								ng-disabled="!selectedQuantity"
								class="md-raised md-accent"
								ng-click="showConfirm('Cart')"
								aria-label="Add To Cart">
									Add To Cart
							</md-button>
					</div>
					<div layout="column">
							<md-list flex layout-padding>
									<h2 style="text-align:center">Product Highlights</h2>
									<md-list-item ng-repeat="highlight in $ctrl.data.productHighlights" class="product-highlights">
											<p ng-bind-html="highlight"></p>
									</md-list-item>
							</md-list>
					</div>
			</div>
		`
	}
};