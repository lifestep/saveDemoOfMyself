function resetFontSize(){
	// 获取屏幕的宽度
	var windowW = document.documentElement.clientWidth
	// 是以iphone5作为参考
	var scale = windowW/320
	var newSize = 10*scale
	document.getElementsByTagName("html")[0].style.fontSize=newSize+"px"
}
window.addEventListener("resize", resetFontSize, false)
resetFontSize()    

// 初始化ng
var app = angular.module("myApp",[])
app.controller('myCtrl', ['$scope','$http', function($scope,$http){
	
	// 轮播图
	$scope.slide = []

	// 菜单
	$scope.menu = []

	$http.get("http://h5.yztctech.net/api/axf/apihome.php").success(function (data){
		console.log(data)
		$scope.slide = data.data.slide.filter((item,index)=>index!=0&&index!=data.data.slide.length-1)
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
					    
					    // 如果需要分页器
					    pagination: '.swiper-pagination'
					}) 
				}
			}
		}
	})
}])


