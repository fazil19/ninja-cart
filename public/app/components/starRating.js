class StarRating {
  constructor() {
    this.restrict = 'EA';

    this.template =
      `<ul class="star-rating">
        <li ng-repeat="star in stars" class="star">
          <i class="material-icons md-17" ng-class="{starFilled: star.filled}">star_rate</i>
        </li>
      </ul>`;

    this.scope = {
      rating: '='
    };
  }

  link(scope) {
    function updateStars() {
      scope.stars = [];
      for (let i = 0; i < 5; i++) {
        scope.stars.push({
          filled: i < scope.rating
        });
      }
    }
    scope.$watch('rating', () => {
      updateStars();
    });
  }
}

export default StarRating;