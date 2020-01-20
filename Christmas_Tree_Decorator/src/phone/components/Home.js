// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available

console.log($scope.app);
var firMap = new Map();
firMap.set("Small", 1);
firMap.set("Medium", 1.2);
firMap.set("Tall", 1.5);

currentGlobe = "Globe-2";

var text = "";


var radius = 5; 
var start = 0; 
var end = Math.PI * 2; 
var dragging = false;

var ctx;

var cc;
var ready = false;

var act = false;

//$scope.app.view.Home.wdg["image-2"].height = $scope.app.view.Home.wdg["draw"].height;

$scope.ChangeFir = function()
{
  firType = $scope.app.view.Home.wdg["dropdown"].value;
  
  $scope.app.view.Home.wdg["Small"].scale = 0.01;
  $scope.app.view.Home.wdg["Medium"].scale = 0.01;
  $scope.app.view.Home.wdg["Tall"].scale = 0.01;
  
  $scope.app.view.Home.wdg[firType].scale = firMap.get(firType);
}


$scope.MoveH = function(offset)
{
  $scope.app.view.Home.wdg[currentGlobe].x += offset*0.005;    
}
$scope.MoveV = function(offset)
{

  $scope.app.view.Home.wdg[currentGlobe].y += offset*0.005;    
}

$scope.ChangeCurrentGlobe = function()
{
  console.log($scope.app);
  currentGlobe = this["widgetId"];
  //console.log(this.evtName);
}


$scope.clickHandler = function(event) {
     console.log("Tap on HH = " + event.pageX + ", pageY = " + event.pageY);
}

/*$scope.engage = function(e){
  	text = "Click la: " + parseInt(e.offsetY) + " " +  parseInt(e.offsetX);
  	console.log(text);
  	//$scope.app.view.Home.wdg["3DLabel-1"].text = e.gesture.center.pageX + " " +  e.gesture.center.pageY;  	  
  	
}*/


$scope.Update = function() {  
  
    /*
     * This is a recursive function which calls itself once each 100ms.
	 */
                
    $scope.UpdateText();
    $scope.intervalPromise = $interval($scope.Update, 100, 1, true);
  
  
  	
  
  	if((act === false) && $scope.canvas.id.length > 0)
    {
      $scope.setCanvas($scope.canvas.id);
      act = true;
    }
  
  	$scope.canvas = document.getElementById('canvas');
  	 text = "not working cc";
  
  	if(cc != null)
    {
      
       text = "not working ctx";
      ctx = cc.getContext('2d');
     
     // console.log(context);
      if(ctx != null)
      {
        //context.clearColor(1.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  		//context.clear(context.COLOR_BUFFER_BIT);
        
        ctx.beginPath();
        ctx.rect(20, 20, 150, 100);        
        ctx.stroke();
        text = "working";
        
        
      }
    }
}

$scope.UpdateText = function()
{
	$scope.app.view.Home.wdg["3DLabel-1"].text = text;
}


$scope.init = function(){	

  	$scope.canvas = document.querySelector("twx-dt-view");
 	
	//$scope.canvas.addEventListener("mousedown", $scope.engage);
    //$scope.canvas.addEventListener("mouseup", $scope.disengage);
   // $scope.canvas.addEventListener("mousemove", $scope.putPoint);
  	//context = $scope.canvas.getContext('2d');*/
  	$scope.Update();
  
    //var x = document.getElementById("twx-dt-view");
    console.log($scope.canvas);
  
  	
  
  	//const canvas2 = document.querySelector("canvas");
  	var canvas2 = document.querySelector('canvas');
  	
  	console.log(canvas2);
  
  	//var canvas = document.getElementById('twxDtView1576673325932_CreoViewCanvas0');
	//var ctx = canvas.getContext('2d');
  
  
}

angular.element(document).ready($scope.init);

$scope.setCanvas = function(id)
{
  cc = document.getElementById(id + "_CreoViewCanvas0");

  console.log(cc.width);
  //context = cc.getContext('2d');
  
  /*context.beginPath();
  context.rect(20, 40, 50, 50);
  context.fill();
  context.closePath();*/
  
  console.log(cc);
  
  //context = cc.getContext('webgl');
  //console.log(context);
  
  ready = true;
}
  




$scope.putPoint = function(e){
  	if(ready){
      if(dragging){
          context.lineTo(e.offsetX, e.offsetY);
          context.stroke();
          context.beginPath(); //請把這條beginPath到fill一起看
          context.arc(e.offsetX, e.offsetY, radius, start, end);
          context.fill();  //填滿它
          context.beginPath();
          context.moveTo(e.offsetX, e.offsetY);
      }
    }
}

$scope.engage = function(e){
  if(ready){
	dragging = true;
	$scope.putPoint(e);
  }
}

$scope.disengage = function(){
  if(ready){
	dragging = false;
	context.beginPath();
  }
}



























