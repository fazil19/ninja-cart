class CarouselController  {
	constructor($scope) {
		$scope.imageList = [];
		$scope.currentIndex = 0;

		$scope.previousImage = () => {
			if ($scope.currentIndex === 0) {
				$scope.currentIndex = $scope.imageList.length - 1;
			} else {
				$scope.currentIndex--;
			}

			$scope.currentImage = $scope.imageList[$scope.currentIndex];
		};

		$scope.nextImage = () => {
			if ($scope.currentIndex === $scope.imageList.length - 1) {
				$scope.currentIndex = 0;
			} else {
				$scope.currentIndex++;
			}
			$scope.currentImage = $scope.imageList[$scope.currentIndex];
		};

		$scope.$watch("$ctrl.data.imageList", (value) => {
			if (value) {
				$scope.imageList = value;
				$scope.currentImage = value[0];
			}
		});
	}
}

export default {
	name: 'carousel',
	config: {
		bindings: {
			data: '<'
		},
		controller: ['$scope', CarouselController],
		template: `
			<div layout="row" layout-align="center stretch" layout-fill flex>
				<div flex="20" layout="column" layout-align="center end">
					<md-button aria-label="Previous image" ng-click="previousImage()">
						<md-icon>
								<i class="material-icons md-light">keyboard_arrow_left</i>
						</md-icon>
				</md-button>
				</div>
				<div flex="60" layout="column" layout-align="center center">
					<div style="background-color: red" flex="10"></div>
					<img ng-src="{{currentImage}}"/>
					<p>{{currentIndex + 1}} of {{imageList.length}}</p>
				</div>
				<div flex="20" layout="column" layout-align="center start">
					<md-button aria-label="Next image" ng-click="nextImage()">
						<md-icon>
								<i class="material-icons md-light">keyboard_arrow_right</i>
						</md-icon>
				</md-button>
				</div>
			</div>
		`
	}
};