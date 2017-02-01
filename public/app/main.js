import angular from 'angular';
import 'angular-sanitize';
import Navbar from './components/navbar';
import Header from './components/header';
import StarRating from './components/starRating';
import Carousel from './components/carousel';
import Sidebar from './components/sidebar';
import DetailTabs from './components/detailTabs';

class MainController {
  constructor(dataService, $scope) {
    console.info('main loaded');

    $scope.isLoading = true;
    $scope.itemsInCart = 0;

    $scope.updateCart = (newItems) => {
      $scope.itemsInCart = $scope.itemsInCart + newItems;
    };

    dataService.getProductData((data) => {

      // data for navbar component
      $scope.navbarData = {
        appName: 'Ninja Kart'
      };

      // data for header component
      $scope.headerData = {
        reviewCount: data.CustomerReview[0].totalReviews,
        productName: data.title,
        overallRating: parseInt(data.CustomerReview[0].consolidatedOverallRating)
      };

      // data for carousel component
      $scope.carouselData = {
        imageList: this.createImageList(data.Images[0])
      };

      // data for sidebar component
      $scope.sidebarData = {
        price: data.Offers[0].OfferPrice[0].formattedPriceValue,
        productHighlights: data.ItemDescription[0].features,
        purchasingChannelCode: data.purchasingChannelCode
      };

      //data for detailTabs component
      $scope.detailTabsData = {
        manufacturer: data.manufacturer,
        shortDescription: data.shortDescription,
        returnPolicy: data.ReturnPolicy[0].legalCopy,
        productReviews: data.CustomerReview[0].Reviews,
        productDetails: this.createProductDetails(data)
      };

      $scope.isLoading = false;
    });
  }

  createImageList(data) {
    // populate primary image first
    const imageList = [data.PrimaryImage[0].image];

    data.AlternateImages.forEach((item) => {
      imageList.push(item.image);
    });

    return imageList;
  }

  createProductDetails(data) {
    const productDetails = [
      { "title": "Manufacturer", "value": data.manufacturer},
      { "title": "Department", "value": data.webclass},
      { "title": "Part Number", "value": data.manufacturerPartNumber},
      { "title": "UPC", "value": data.UPC}
    ];

    return [...productDetails,...this.cleanDimensionData(data.PackageDimension)];
  }

  cleanDimensionData(data) {
    const dimensionData = [];
    data.forEach((item) => {
      let entry = {};
      entry.title = item.name;
      entry.value = item.value + " " + item.unit;
      dimensionData.push(entry);
    });

    return dimensionData;
  }
}

class DataService {
  constructor($http) {

    this.errorHandler = (response) => {
      console.error(`HTTP request failed: Error Code: ${response.status} Error Status: ${response.statusText}`);
    };

    return {
      getProductData: (callback) => {
        $http
          .get('http://localhost:3000/CatalogEntryView')
          .then((response) => {
            callback(response.data[0]);
          },(response) => {
            this.errorHandler(response);
          });
      }
    };
  }
}

export default angular
  .module('main', ['ngMaterial', 'ngSanitize'])
  .service('dataService', DataService)
  .controller('mainController', MainController)
  .directive('starRating', () => new StarRating())
  .component(Navbar.name, Navbar.config)
  .component(Header.name, Header.config)
  .component(Carousel.name, Carousel.config)
  .component(Sidebar.name, Sidebar.config)
  .component(DetailTabs.name, DetailTabs.config);
