
// ----------------index-----------------
// 初始化slide
angular.module("myApp")
	.controller('myCtrl_slide', ['$scope','$http','$rootScope','$timeout',
	  function($scope,$http,$rootScope,$timeout){
		// 轮播图
		$scope.slide = []

		// 菜单
		$scope.menu = []
		// hot sale
		$scope.hotSaleData = [];
	    $scope.quickBuy = [];
	    $scope.quickBuyGoods = [];

		$http.get("http://h5.yztctech.net/api/axf/apihome.php").success(function (data){
			$scope.slide = data.data.slide.filter((item,index)=>index!=0 && index!=data.data.slide.length-1)
			$scope.menu = data.data.menu
			// 初始化swiper
			
			var imgNum = 0
			for (var i=0; i<$scope.slide.length; i++){

				var imgObj = new Image()
				imgObj.src = $scope.slide[i].activity.img
				imgObj.onload = function (){

					imgNum++
					if (imgNum == $scope.slide.length){
						var mySwiper = new Swiper ('.swiper-container', {
						    loop: true,
						    autoplay:2000,
						    // 如果需要分页器
						    pagination: '.swiper-pagination'
						}) 
					}
				}
			}
		})
// //  save goods in cart 
// 		$rootScope.cartGoodsAll = [];
// 		// add goods in all ease
// 		function saveGoodsInCart(item){
// 			for(let i=0; i<$rootScope.cartGoodsAll.length; i++){
// 				if($rootScope.cartGoodsAll[i] == item){
// 					item.count++;
// 					console.log($rootScope.cartGoodsAll);
// 					return;
// 				}
// 			}
// 			$rootScope.cartGoodsAll.push(item);
// 			console.log($rootScope.cartGoodsAll);
// 		}
// 		$rootScope.saveGoodsInCart = saveGoodsInCart;
// 		$scope.saveGoodsInCart = saveGoodsInCart;
		// $scope.saveGoodsInCart = $rootScope.saveGoodsInCart;

		// 热卖数据
	    $http.get("http://h5.yztctech.net/api/axf/apihomehot.php").success(data => {
	        $scope.hotSaleData = data.data.slice(0,12);
	    })
	// 秒杀数据

	    $http.get("http://h5.yztctech.net/api/axf/apimiaosha.php").success(data => {
	        $scope.quickBuy = data;
	        $scope.quickBuyGoods = data.product.slice(0,12);
	    })
	    // set animation of addGoods to cart in home 
	    function addThisTocartInHome(item){
	    	// judging goods was saved in cart
	    	$rootScope.saveGoodsInCart(item);

	    	let x = event.clientX;
			let y = event.clientY;
			let img= new Image();
			img.src = item.img;
			img.style=`
				left: ${x-event.target.parentElement.offsetWidth 
					+ event.target.parentElement.previousElementSibling.offsetLeft}px;
				top: ${y-event.target.parentElement.offsetHeight
					-event.target.parentElement.previousElementSibling.offsetHeight}px;
			`;
			img.setAttribute('class','addGoods');
			document.body.appendChild(img);
			$timeout(function(){
				document.body.removeChild(img);
			},500);
			$rootScope.cartGoodsCount++;
			$rootScope.addGoodsCountActive = true;
			$rootScope.cartGoodsCountMethod();
			$timeout(function(){
				$rootScope.addGoodsCountActive = false;
				$rootScope.cartGoodsCountMethod();
			},200);
	    }
	    $scope.addThisTocartInHome = addThisTocartInHome;
	}])
	.controller('myCtrl_market',['$scope','$http',"$rootScope","$timeout",function($scope,$http,$rootScope,$timeout){
			// initial market's nav-icon
		($rootScope.judgeNavActive)();
			// ----------------market---------------
		// init datas
		$scope.marketMenu = [];
		$scope.marketGoods = [];
		$scope.marketGoodsTrans =[];
		$scope.marketGoodsAll = [];
		$scope.category_nav_active = 0;

		$scope.aroundActiveOther = false;
		$scope.aroundActiveOne = false;
		$scope.categoryTurnItemOtherItemCount = 0;
		$scope.categoryTurnItemOneItemCount = 0;
		$scope.dataCount = 0;
		


		$http.get('../../datas/market-data.json').success(function(data){
			$scope.marketMenu = data.data.categories;
			$scope.marketGoodsAll = data.data.products;
			categoryNavActive(0);
		})

		function categoryNavActive(index){
			$scope.category_nav_active = index;
			$scope.aroundActiveOther = false;
			$scope.aroundActiveOne = false;
			$scope.marketGoods = $scope.marketGoodsAll[$scope.marketMenu[index].id];
			$scope.marketGoodsTrans = new Array(...($scope.marketGoodsAll[$scope.marketMenu[index].id]));
			$scope.marketGoodsVariety = $scope.marketMenu[index].cids;
			$scope.categoryTurnItemOtherItemCount = 0;
			$scope.categoryTurnItemOneItemCount = 0;
			$scope.categoryTurnItemOtherTitle = '全部类别';
			categoryTurnItemOtherItem(0);
			categoryTurnItemOneItem(0);
			$scope.myFilters = /.*/;

		}
		$scope.categoryNavActive = categoryNavActive;

		// aroundActiveOther || aroundActiveOne
		// ng-click='categoryTurnItem()'

		$scope.categoryTurnItemOther = function(){
			$scope.aroundActiveOther = !$scope.aroundActiveOther;
			$scope.aroundActiveOne = $scope.aroundActiveOne ? 
										!$scope.aroundActiveOne :
										$scope.aroundActiveOne;
		}
		$scope.categoryTurnItemOne = function(){
			$scope.aroundActiveOne = !$scope.aroundActiveOne;
			$scope.aroundActiveOther = $scope.aroundActiveOther ? 
										!$scope.aroundActiveOther :
										$scope.aroundActiveOther;
		}

		// close category varietied cover of title items
		$scope.closeCoverWrap = ()=>{
			$scope.aroundActiveOther = false;
			$scope.aroundActiveOne = false;
		}

		// categoryTurnItemOtherItemCount | categoryTurnItemOtherItem($index)
			// categoryTurnItemOneItemCount | categoryTurnItemOneItem(0)
		// set category that filter
		let categoryTurnItemOtherItem = (index,ele)=>{
			$scope.aroundActiveOther = false;
			$scope.aroundActiveOne = false;
			$scope.categoryTurnItemOtherItemCount = index;
			$scope.dataCount = ele ? ele.id :0;
			scrollToTop();
			$scope.myFilters = $scope.dataCount;
			$scope.categoryTurnItemOtherTitle = ele?ele.name:'全部类别';
		}
		let categoryTurnItemOneItem = index=>{
			$scope.aroundActiveOther = false;
			$scope.aroundActiveOne = false;
			$scope.categoryTurnItemOneItemCount = index;
			if (index == 0) {
				$scope.marketGoods = new Array(...$scope.marketGoodsTrans);
				$scope.categoryTurnItemOneItemTitle = "综合排序";
				scrollToTop();
			};
			if (index == 1) {
				sortOfItems($scope.marketGoods,-1);
				$scope.categoryTurnItemOneItemTitle = "价格最高";
				scrollToTop();
			};
			if (index == 2) {
				sortOfItems($scope.marketGoods,1);
				$scope.categoryTurnItemOneItemTitle = "价格最低";
				scrollToTop();
			};
		}
		$scope.categoryTurnItemOneItem = categoryTurnItemOneItem;
		$scope.categoryTurnItemOtherItem = categoryTurnItemOtherItem;

		// set sort of items
		let sortOfItems = (arr,i)=>{
			arr.sort((a,b)=>{
				return (a.price -b.price)*i;
			})
		}
		// set animation of addGoods to cart
		$scope.addThisTocart = function(item){
	    	$rootScope.saveGoodsInCart(item);

			let x = event.clientX;
			let y = event.clientY;
			let img= new Image();
			img.src = item.img;
			img.style=`
				left: ${x-event.target.parentElement.offsetWidth
					- event.target.parentElement.parentElement.firstElementChild.offsetWidth}px;
				top: ${y-event.target.parentElement.offsetHeight}px;
			`;
			img.setAttribute('class','addGoods');
			document.body.appendChild(img);
			$timeout(function(){
				document.body.removeChild(img);
			},500);
			$rootScope.cartGoodsCount++;
			$rootScope.addGoodsCountActive = true;
			$rootScope.cartGoodsCountMethod();
			$timeout(function(){
				$rootScope.addGoodsCountActive = false;
				$rootScope.cartGoodsCountMethod();
			},200);
		}

	//  let scroll to top
		function scrollToTop(){
			let spe = document.querySelector('.category_body_items').firstElementChild;
			spe.scrollTop = 0;
		}
		$scope.scrollToTop = scrollToTop;
		

	}])
	.controller("myCtrl_cart",["$scope","$rootScope",
			function($scope,$rootScope){
		// ------------------shop cart--------------//
		$scope.GoodsCountInCart = $rootScope.cartGoodsCount;







	}])