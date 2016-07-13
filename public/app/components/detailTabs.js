export default {
	name: 'detailTabs',
	config: {
		bindings: {
			data: '<'
		},
		template: `
			<md-tabs md-border-bottom md-no-ink-bar md-dynamic-height md-stretch-tabs="always" class="border-container ts">
				<md-tab label="Product Details" class="ts">
						<md-content layout="column">
								<md-card class="detail-tab-content">
										<md-card-title>
												<md-card-title-text>
														<span class="md-headline">Product Details</span>
												</md-card-title-text>
										</md-card-title>
										<md-card-content>
												<div layout-margin>
													<p><strong>Summary</strong>: {{$ctrl.data.shortDescription}}</p>
													<p ng-repeat="detail in $ctrl.data.productDetails">
															<strong>{{detail.title}}</strong>: {{detail.value}}
													</p>
												</div>
										</md-card-content>
								</md-card>
						</md-content>
				</md-tab>
				<md-tab label="Customer Reviews" class="ts">
						<md-content>
								<md-card ng-repeat="review in $ctrl.data.productReviews" class="detail-tab-content review-container">
										<md-card-title class="review-title-section">
												<md-card-title-text>
														<h3 class="review-title">
																<star-rating rating="review.overallRating"></star-rating> {{review.title}}
														</h3>
												</md-card-title-text>
										</md-card-title>
										<md-card-content layout="column">
												<p class="review-subtitle">
														By {{review.screenName}} on {{review.datePosted.substring(0,10)}}
												</p>
												<p>{{review.review}}</p>
												<div>
														Quality: <star-rating rating="review.RatableAttributes[0].value"></star-rating>
												</div>
												<div>
														Ease of Use: <star-rating rating="review.RatableAttributes[1].value"></star-rating>
												</div>
												<div>
														Value: <star-rating rating="review.RatableAttributes[2].value"></star-rating>
												</div>
												<p class="review-helpful">
														{{review.helpfulVotes}} people found this helpful.
												</p>
										</md-card-content>
								</md-card>
						</md-content>
				</md-tab>
				<md-tab label="Return Policy" class="ts">
						<md-content layout="row">
									<md-card class="detail-tab-content">
											<md-card-title>
													<md-card-title-text>
															<span class="md-headline">Return Policy</span>
													</md-card-title-text>
											</md-card-title>
											<md-card-content layout-margin>
													<p ng-bind-html="$ctrl.data.returnPolicy"></p>
											</md-card-content>
									</md-card>
						</md-content>
				</md-tab>
			</md-tabs>
		`
	}
};