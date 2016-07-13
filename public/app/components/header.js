export default {
	name: 'header',
	config: {
		bindings: {
			data: '<'
		},
		template: `
			<h1 class="product-title">{{$ctrl.data.productName}}</h1>
			<star-rating rating="$ctrl.data.overallRating"></star-rating>
			<a href="#">{{$ctrl.data.reviewCount}} customer reviews</a>
		`
	}
};