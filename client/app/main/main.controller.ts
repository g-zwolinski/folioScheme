'use strict';

(function() {

class MainController {
  isCollapsed = true;

  constructor($http, $scope, socket,$document,$rootScope,$timeout, $mdDialog,$mdMedia) {
  
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

    this.isOpen = false;

    $scope.data = {
      cb5: false
    };

    var cursorX;
    var cursorY;

    var goalPosX;
    var goalPosY;
    //get pointer coordinates
    document.onmousemove = function(e){
        goalPosX = e.pageX;
        goalPosY = e.pageY;
        if(goalPosY>(canvas.height)){
          goalPosY = canvas.height;
        }
    }

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
    $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 5000).then(function() {
        console && console.log('You just scrolled to the top!');
      });
    }

    $scope.toSection = function(id) {
      var section = angular.element(document.getElementById(id));
      $document.scrollToElementAnimated(section);
    }
    var section1 = angular.element(document.getElementById('section-1'));
    $scope.toSection1 = function() {
      
      $document.scrollToElementAnimated(section1);
    }

    $scope.scrollTarget = "";
    
    $scope.checkIfScrolled = function(id) {
      //var section = angular.element(document.getElementById(id));
      //$document.scrollToElementAnimated(section);
      $scope.scrollTarget = id;
      $timeout(function(){
          //$scope.toSection($target[0].id);
          if(hasClassName('active','nav-'+$scope.scrollTarget)==false){
            $scope.toSection($scope.scrollTarget);
            $scope.checkIfScrolled($scope.scrollTarget);
          }
        //  console.log(hasClassName('active','nav-'+$scope.scrollTarget));
        },500);
      
    }

    function hasClassName(classname,id) {
     return  String ( ( document.getElementById(id)||{} ) .className )
             .split(/\s/)
             .indexOf(classname) >= 0;
    }

    $rootScope.$on('duScrollspy:becameActive', function($event, $element, $target){
      //Automaticly update location
      
      //$scope.showMenu = true;
      //$scope.$apply();
      //console.log($element, $target[0].id,$scope.showMenu);

        
      
      var hash = $element.prop('hash');
      if (hash) {
        history.replaceState(null, null, hash);
      }
      
      
    });

    //grid
    /*
    this.tiles = buildGridModel({
            title: "Svg-",
            background: ""
          });

    function buildGridModel(tileTmpl){
      var it, results = [ ];

      for (var j=0; j<3; j++) {

        it = angular.extend({},tileTmpl);
        

        switch(j){
          case 0:
            it.title = it.title + (j+1);
            it.title = it.title + 'something'
          break;
          case 1:
            it.title = it.title + (j+1);
            it.title = it.title + 'else'
          break;
          case 2:
            it.title = it.title + (j+1);
            it.title = it.title + 'and another'
          break;
        }

        it.span  = { row : 1, col : 1 };

        switch(j+1) {
          case 1:
            it.background = "deepBlue";
            it.span.row = it.span.col = 2;
            break;

          case 2: it.background = "blue";         break;
          case 3: it.background = "darkBlue";      break;
        }

        results.push(it);
      }
      return results;
    }
  */
  /*
    var canvasAbout = document.getElementById('canvas2');
    var ctxAbout = canvasAbout.getContext('2d');
    canvasAbout.width = $scope.windowWidth;
    canvasAbout.height = document.getElementById('section-1').offsetHeight;
    document.getElementById('section-1').style.background='url('+canvasAbout.toDataURL()+')';
*/

    var canvasBottom = document.getElementById('canvas2');
    var ctxBottom = canvasBottom.getContext('2d');
    // setup
    canvasBottom.width = $scope.windowWidth;
    canvasBottom.height = $scope.windowHeight;

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    // setup
    canvas.width = $scope.windowWidth;
    canvas.height = $scope.windowHeight;

    cursorX = canvas.width/2;
    cursorY = canvas.height*2/3;

    $scope.notifyServiceOnChange = function(){
      canvas = document.getElementById('canvas');
      canvas.width = $scope.windowWidth;
      canvas.height = $scope.windowHeight;
      ctx = canvas.getContext('2d');
      //grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, canvas.height, canvas.width/2+canvas.width/20- cursorX/2, canvas.height/2+canvas.height/20- cursorY/2, canvas.height/8);
      //grd.addColorStop(0, "#f8f8f8");
      //grd.addColorStop(1, "rgba(0,0,0,.1");

      canvasBottom = document.getElementById('canvas2');
      canvasBottom.width = $scope.windowWidth;
      canvasBottom.height = $scope.windowHeight;
      ctxBottom = canvasBottom.getContext('2d');
      if((document.getElementById('section-4').offsetHeight-50)>$scope.windowHeight){
        //console.log($scope.windowHeight,document.getElementById('section-4').offsetHeight,document.getElementById('section-4').clientHeight,document.getElementById('section-4').scrollHeight);
        //console.log(document.getElementById('section-4').offsetHeight-50,$scope.windowHeight);
        canvasBottom.height =document.getElementById('section-4').offsetHeight-50;
      }
      //console.log(canvas.height);
    };
    $scope.showMenu = true;
    $document.on('scroll', function() {
      //console.log('Document scrolled to ', $document.scrollLeft(), $document.scrollTop(), $scope.showMenu);
      if(($document.scrollTop()>=(canvas.height-50))){
        $scope.showMenu = true;
      }else{
        $scope.showMenu = false;
      }
      $scope.$apply();
    });

    var firstRectangle = {x: canvas.width/2, y: canvas.height, width: canvas.width/10, height: canvas.height/5, angle: 270, radius: canvas.height/2};
    var dlt = -0.05;
    //var depth = 0;
    var previousObject = {};

    var angleB = 190
    //var depthB = 0;
    var previousObjectB = {};

    //grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
    //var grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, canvas.height, canvas.width/2+canvas.width/20- cursorX/2, canvas.height/2+canvas.height/20- cursorY/2, canvas.height/8);
    //grd.addColorStop(0, "#f8f8f8");
    //grd.addColorStop(1, "rgba(0,0,0,0.01");
    (function animate() {
      //ctx.clearRect(0, 0, canvas.width, canvas.height);

      //ctxAbout.rect(0,0,canvasAbout.width,canvasAbout.height);
      //ctxAbout.fillStyle = '#333';
      //ctxAbout.fill();
      //document.getElementById('section-1').style.background='url('+canvasAbout.toDataURL()+')';
      //ctx.beginPath();
      ctxBottom.rect(0,0,canvasBottom.width,canvasBottom.height);
      ctxBottom.fillStyle = '#fff';//'#a5c7f8';
      ctxBottom.fill();

      ctx.rect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = '#f8f8f8';
      //grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, canvas.height, canvas.width/2+canvas.width/20- cursorX/2, canvas.height/2+canvas.height/20- cursorY/2, canvas.height/8);
      
      //ctx.fillStyle = grd;
      ctx.fill();
      lineToAngle(ctx, canvas.width, canvas.height, canvas.height/5, firstRectangle.angle,0);

      //lineToAngle(ctxBottom, 0, canvasBottom.height, canvasBottom.height/5, firstRectangle.angle,0);
      lineToAngle(ctxBottom, 1, canvasBottom.height/2, canvasBottom.height/5, (-1)*firstRectangle.angle,0);
      //lineToAngle(ctxAbout, canvas.width/2, 0, canvas.height/5, firstRectangle.angle,0);
      //lineToAngle(ctx, canvas.width/2, 0, canvas.height/5, firstRectangle.angle,0);
      //lineToAngle(ctx, canvas.width/2, canvas.height*2/3, canvas.height/4, angleB,0);
      //lineToAngleB(ctx, canvas.width/2, canvas.height*2/3, canvas.height/4, firstRectangle.angle,0);
      if(goalPosX!=undefined&&goalPosY!=undefined){
        cursorX<goalPosX?cursorX++:cursorX--;
        cursorY<goalPosY?cursorY++:cursorY--;
      }
      

      angleB -= dlt;
      firstRectangle.angle += dlt;
      //document.getElementById('section-1').style.background='url('+canvasAbout.toDataURL()+')';

      requestAnimationFrame(animate);
    })();

    function lineToAngleB(ctxAbout, x1, y1, length, angle, depthB) {

        if(depthB>10){
          x1 = x1 - x1/20 + cursorX/20;
          y1 = y1 - y1/20 + cursorY/20; 
        }else{
          x1 = x1 - x1/30 + cursorX/30;
          y1 = y1 - y1/40 + cursorY/40; 
        }

        if(depthB>0){
          length = length - length*depthB/100;
          //angle = angle;
          x1 = x1 + length * Math.cos(angle*depthB);
          y1 = y1 + length * Math.sin(angle*depthB);

          x2 = x1 + length * Math.cos(angle*depthB);
          y2 = y1 + length * Math.sin(angle*depthB);

        }else{
          angle *= Math.PI / 180;
          
          var x2 = x1 + length * Math.cos(angle*depthB),
              y2 = y1 + length * Math.sin(angle*depthB);
        
        }    

        if((previousObjectB!=null&&previousObjectB!=undefined)&&depthB>0){
          ctxAbout.beginPath();
          ctxAbout.strokeStyle = '#fff';
          ctxAbout.moveTo(x1, y1);
          ctxAbout.lineTo(previousObjectB.x1, previousObjectB.y1);
          ctxAbout.moveTo(x1, y1);
          ctxAbout.lineTo(previousObjectB.x2, previousObjectB.y2);
          ctxAbout.moveTo(x2, y2);
          ctxAbout.lineTo(previousObjectB.x1, previousObjectB.y1);
          ctxAbout.moveTo(x2, y2);
          ctxAbout.lineTo(previousObjectB.x2, previousObjectB.y2);


          ctxAbout.moveTo(previousObjectB.x2, previousObjectB.y2);
          ctxAbout.lineTo(previousObjectB.x1, previousObjectB.y1);

          ctxAbout.closePath();
          ctxAbout.stroke();
        }

        if(depthB>0){
          ctxAbout.fillStyle = 'rgba(0,0,0,'+1/(36-depthB)+')';
          ctxAbout.beginPath();
          ctxAbout.moveTo(x1, y1);
          ctxAbout.lineTo(x2, y2);
          ctxAbout.lineTo(previousObjectB.x2, previousObjectB.y2);
          //console.log(x1,y1,x2,y2,previousObject.x3, previousObject.y3);
          ctxAbout.fill();
          ctxAbout.fillStyle = 'rgba(0,0,0,'+1/(61-depthB*2)+')';
          ctxAbout.beginPath();
          ctxAbout.moveTo(x1, y1);
          ctxAbout.lineTo(x2, y2);
          ctxAbout.lineTo(previousObjectB.x1, previousObjectB.y1);
          ctxAbout.fill();

          ctxAbout.fillStyle = 'rgba(0,0,0,'+1/(86-depthB*3)+')';
          ctxAbout.beginPath();
          ctxAbout.moveTo(x1, y1);
          ctxAbout.lineTo(previousObjectB.x1, previousObjectB.y1);
          ctxAbout.lineTo(previousObjectB.x2, previousObjectB.y2);

          ctxAbout.fillStyle = 'rgba(0,0,0,'+1/(61-depthB*2)+')';
          ctxAbout.beginPath();
          ctxAbout.moveTo(x2, y2);
          ctxAbout.lineTo(previousObjectB.x1, previousObjectB.y1);
          ctxAbout.lineTo(previousObjectB.x2, previousObjectB.y2);
          //console.log(x1,y1,x2,y2,previousObject.x3, previousObject.y3);
          ctxAbout.fill();
        }
        

        previousObjectB={'x1': x1,'y1': y1,'x2': x2,'y2': y2};

        if(depthB<=25){
          depthB++;
          lineToAngleB(ctxAbout, x1, y1, length, angle, depthB);
        }else{
          depthB=0;
        }
        
    }
    
    function lineToAngle(ctx, x1, y1, length, angle,depth) {
        if(cursorX==0||cursorY==0){
          goalPosX = canvas.width/2;
          goalPosY = canvas.height*2/3;
        }

        if(depth>10){
          x1 = x1 - x1/20 + cursorX/20;
          y1 = y1 - y1/20 + cursorY/20; 
        }else{
          x1 = x1 - x1/30 + cursorX/30;
          y1 = y1 - y1/40 + cursorY/40; 
        }

        if(depth>0){
          length = length - length*depth/100;
          //angle = angle;
          x1 = x1 + length * Math.cos(angle*depth);
          y1 = y1 + length * Math.sin(angle*depth);

          x2 = x1 + length * Math.cos(angle*depth);
          y2 = y1 + length * Math.sin(angle*depth);

        }else{
          angle *= Math.PI / 180;
          
          var x2 = x1 + length * Math.cos(angle*depth),
              y2 = y1 + length * Math.sin(angle*depth);
        
        }    

        if((previousObject!=null&&previousObject!=undefined)&&depth>0){
          ctx.beginPath();
          ctx.strokeStyle = '#fff';
          ctx.moveTo(x1, y1);
          ctx.lineTo(previousObject.x1, previousObject.y1);
          ctx.moveTo(x1, y1);
          ctx.lineTo(previousObject.x2, previousObject.y2);
          ctx.moveTo(x2, y2);
          ctx.lineTo(previousObject.x1, previousObject.y1);
          ctx.moveTo(x2, y2);
          ctx.lineTo(previousObject.x2, previousObject.y2);


          ctx.moveTo(previousObject.x2, previousObject.y2);
          ctx.lineTo(previousObject.x1, previousObject.y1);

          ctx.closePath();
          ctx.stroke();
        }

        if(depth>0){
          ctx.fillStyle = 'rgba(0,0,0,'+1/(36-depth)+')';
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineTo(previousObject.x2, previousObject.y2);
          //console.log(x1,y1,x2,y2,previousObject.x3, previousObject.y3);
          ctx.fill();
          ctx.fillStyle = 'rgba(0,0,0,'+1/(61-depth*2)+')';
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineTo(previousObject.x1, previousObject.y1);
          ctx.fill();

          ctx.fillStyle = 'rgba(0,0,0,'+1/(86-depth*3)+')';
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(previousObject.x1, previousObject.y1);
          ctx.lineTo(previousObject.x2, previousObject.y2);

          ctx.fillStyle = 'rgba(0,0,0,'+1/(61-depth*2)+')';
          ctx.beginPath();
          ctx.moveTo(x2, y2);
          ctx.lineTo(previousObject.x1, previousObject.y1);
          ctx.lineTo(previousObject.x2, previousObject.y2);
          //console.log(x1,y1,x2,y2,previousObject.x3, previousObject.y3);
          ctx.fill();
        }
        

        previousObject={'x1': x1,'y1': y1,'x2': x2,'y2': y2};

        if(depth<=25){
          depth++;
          lineToAngle(ctx, x1, y1, length, angle, depth);
        }else{
          depth=0;
        }
        
    }
  }

  $onInit() {
    this.$http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      this.socket.syncUpdates('thing', this.awesomeThings);
    });
  }

  addThing() {

    if(this.msg==undefined||this.msg.name==null||this.msg.name==undefined||this.msg.name ==""){
      if(this.msg!=undefined){
        this.msg.name ="";
       
      }
      angular.element(document.querySelector('input[name="name"]')).addClass( "ng-invalid ng-invalid-required" ); 
    }
    if(this.msg==undefined||this.msg.contact==null||this.msg.contact==undefined||this.msg.contact ==""){
        
      if(this.msg!=undefined){
        this.msg.contact =""; 
        
      }
      angular.element(document.querySelector('input[name="contact"]')).addClass( "ng-invalid ng-invalid-required" );  
    }
    if(this.msg==undefined||this.msg.message==null||this.msg.message==undefined||this.msg.message ==""){
         
      if(this.msg!=undefined){
        this.msg.message =""; 
      }
      angular.element(document.querySelector('input[name="message"]')).addClass( "ng-invalid ng-invalid-required" ); 
    }
    if (this.msg!=null&&this.msg.name!=null&&this.msg.contact!=null&&this.msg.message!=null&&
      this.msg!=undefined&&this.msg.name!=undefined&&this.msg.contact!=undefined&&this.msg.message!=undefined&&
      this.msg!=""&&this.msg.name!=""&&this.msg.contact!=""&&this.msg.message!="") {
      this.$http.post('/api/things', { name: this.msg.name ,contact: this.msg.contact,info: this.msg.message,type: 'msg' });
      this.msg.name ="";
      this.msg.contact ="";
      this.msg.message ="";
      angular.element(document.querySelector('input[name="name"]')).addClass( "ng-untouched ng-not-empty" ); 
      angular.element(document.querySelector('input[name="contact"]')).addClass( "ng-untouched ng-not-empty" ); 
      angular.element(document.querySelector('input[name="message"]')).addClass( "ng-untouched ng-not-empty" );


        /*
      angular.element(document.querySelector('input[name="name"]')).removeClass( "ng-touched ng-empty ng-invalid ng-invalid-required" ); 
      angular.element(document.querySelector('input[name="contact"]')).removeClass( "ng-touched ng-empty ng-invalid ng-invalid-required" ); 
      angular.element(document.querySelector('input[name="message"]')).removeClass( "ng-touched ng-empty ng-invalid ng-invalid-required" ); 
      */

      this.showThanks = true;


    }else{
      angular.element(document.querySelector('input[name="name"]')).removeClass( "ng-untouched ng-not-empty" ); 
      angular.element(document.querySelector('input[name="contact"]')).removeClass( "ng-untouched ng-not-empty" ); 
      angular.element(document.querySelector('input[name="message"]')).removeClass( "ng-untouched ng-not-empty" ); 
      
      angular.element(document.querySelector('input[name="name"]')).addClass( "ng-invalid ng-invalid-required" );
      angular.element(document.querySelector('input[name="contact"]')).addClass( "ng-invalid ng-invalid-required"); 
      angular.element(document.querySelector('input[name="message"]')).addClass( "ng-invalid ng-invalid-required" );
      this.showAlert = true;
    }

  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('folioApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
