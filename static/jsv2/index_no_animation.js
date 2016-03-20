function layout(){
	var screenwidth = $(window).width(),
	    screenheight = $(window).height(),
	    ratio = (screenwidth)/screenheight,
	    svgcontainerwidth = $("svg").width(),
	    svgcontainerheight = $("svg").height(),
	    wordwidth = $("#word").width(),
	    limitation= svgcontainerwidth/2+wordwidth,
	    p1width = $("#project1").width(),
	    p2width = $("#project2").width(),
	    rwidth = $("#resume").width(),
	    p1height = $("#project1").height(),
	    p2height = $("#project2").height(),
      snowflakebefore = 60; 
      
	    //adjust the width of word for avoiding words to overlap with the svgtree
        if (ratio > 1){
        	if (limitation > svgcontainerwidth){
	        	wordwidth = 272.2,
		    	$("#word").css("width","272.2px")
		    	$("#word").css("font-size","35px")
	        }
	    }
	    containerposition_w = (screenwidth-svgcontainerwidth)/2+(svgcontainerwidth-wordwidth)/2;
	    containerposition_h = svgcontainerheight*3.2/4;
	    $(".container").css("margin-left", containerposition_w);
	    $(".container").css("margin-top",containerposition_h);
	    $("#project1").css("margin-left", (screenwidth-svgcontainerwidth)/2+svgcontainerwidth/4-p1width+snowflakebefore);
	    $("#project1").css("margin-top",svgcontainerheight*3/8-p1height); 
	    $("#project2").css("margin-left", (screenwidth-svgcontainerwidth)/2+svgcontainerwidth*3/4-p2width+snowflakebefore); 
	    $("#project2").css("margin-top",svgcontainerheight*3/8-p2height); 
	    $("#resume").css("margin-left", (screenwidth-svgcontainerwidth)/2+svgcontainerwidth/2-rwidth+snowflakebefore); 
	    $("#resume").css("margin-top",svgcontainerheight*3.7/4); 
        console.log(ratio)
	    // ratio>1, svg margin-top:0, adjust for mobile devices == put the svg on the center of screen 
	    if (ratio<1){	    	
	    	$(".container--ph").css("width","100%")    	
	    	svgcontainerwidth = $("svg").width(); 
	    	svgcontainerheight = $("svg").height();  	
	    	var mobileheight = (screenheight-svgcontainerheight)/2; 	    	    
	    	containerposition_h = mobileheight + svgcontainerheight*3.2/4;
	    	$("svg").css("margin-top",mobileheight);
	    	$(".container").css("margin-top",containerposition_h);
        $("#project1").css("margin-left", (screenwidth-svgcontainerwidth)/2+svgcontainerwidth/4-p1width+snowflakebefore/1.5);
		    $("#project1,#project2").css("margin-top",svgcontainerheight*3/8-p1height+mobileheight); 
        $("#project2").css("margin-left", (screenwidth-svgcontainerwidth)/2+svgcontainerwidth*3/4-p2width+snowflakebefore); 		 
		    $("#resume").css("margin-top",svgcontainerheight*3.8/4+mobileheight); 
        	    	
	    }
};

 
//layout();
var xlinkns = "http://www.w3.org/1999/xlink";
// makes SVG object <type>
function SVG(type){
   return document.createElementNS('http://www.w3.org/2000/svg', type);
}

function makeTree(depth, angle, gId) {
  
   var defs   	= document.getElementById("defs");
   var prevId 	= '';
   var id     	= '';

    for (var i = 1; i <= depth; i++){
    	prevId = (i-1) + '_' + gId;
    	id =     i + '_' + gId;

	    var g = SVG("g");
	    	g.setAttributeNS(null, "id", id);
	    	defs.appendChild(g);
	    	//console.log(id)
	    
	    
	    var use1 = SVG("use");
	    	use1.setAttributeNS(xlinkns, "xlink:href", "#"+ prevId);
	    	use1.setAttributeNS(null, "transform", "translate(0, -1) rotate(-"+ angle +") scale(.7)");
	    	//console.log(angle,prevId)

	    var use2 = SVG("use");
	    	use2.setAttributeNS(xlinkns, "xlink:href", "#"+ prevId);
	    	use2.setAttributeNS(null, "transform","translate (0, -1) rotate(+"+ angle +") scale(.7)");

	    var use3 = SVG("use");
	    	use3.setAttributeNS(xlinkns, "xlink:href", "#stem");
	   
	    g.appendChild(use1);
	    g.appendChild(use2);
	    g.appendChild(use3);
	}
}

function growTree(depth, uId){
    var i = 0;
    var id = ''
    var intervalId = window.setInterval( function(){ 	
    	id = i == 0 ? i : i + '_' + uId
 		document.getElementById(uId).setAttributeNS(xlinkns, "xlink:href", "#"+id);
 	 	if (++i > depth) clearInterval(intervalId)
    }, 120);
}

/*function getIDs(angles){
	var IDs = []
	for (var i in angles)
		IDs.push(angles[i]+'deg')
	return IDs
}*/

function drawtree(angleid) {
	var angles=[25],
	    IDs=[angleid+'deg']; 
	//var angles = [angle];
	//var IDs	   = getIDs(angles);
	var depth  = 9;

	for (var i in angles){
		makeTree(depth, angles[i], IDs[i]);
		growTree(depth, IDs[i]);
	}
}; 

// typing text 
var
  words = ["Hi,I am Sharon"," I stuided metaphor and brain at NTU", "For me, web is a playground","where I can have fun","and let my ideas go wild","So I taught myself to code","If you have time", "I want to show you an amusement park I built ","Welcome to see my colletion","Sharon's Collection"],
  part,
  i = 0,
  offset = 0,
  len = words.length,
  forwards = true,
  skip_count = 0,
  skip_delay = 5,
  speed = 50;

//var workflick=setInterval(function(){type()},speed);   
function type(){
     if (forwards) {
        if(offset >= words[i].length){
          ++skip_count;
          if (skip_count == skip_delay) {
            forwards = false;
            skip_count = 0;
          }
        }
      }
      else {
         if(offset == 0){
            forwards = true;
            i++;
            offset = 0;
            if(i==2){
              //drawtree(15);
              //$.fn.snow();     
              //$("svg line").css({stroke:"black",opacity:1});
              //$("#project1").css("display","block");
            }else if (i==5){
              //drawtree(25);
              //$.fn.snow(); 
              //$("#project2").css("display","block");
            }else if(i==len-1){
             // drawtree(35);
             //$("#resume").css("display","block");              
            }else{
              	
            }
         }
      }
      part = words[i].substr(0, offset);
      if (skip_count == 0) {
        if (forwards) {
          offset++;
          //console.log(offset)
        }
        else {
          if (i==len-1){
          	clearInterval(workflick)
          }
          offset--;
        }
      }
    	$('#word').text(part);
}; 
 /*$('a').click(function(e) {
   e.preventDefault();
   newLocation = this.href;
   $('body').fadeOut(300, newpage);
   });
  function newpage() {
   window.location = newLocation;
  }*/
(function($){
  
  $.fn.snow = function(options){
  
      var $flake      = $('<div id="flake" />').css({'position': 'absolute', 'top': '-50px'}).html('&#10052;'),
        documentHeight  = $(document).height(),
        documentWidth = $(document).width(),
        defaults    = {
                  minSize   : 30,
                  maxSize   : 50,
                  newOn     : 50,
                  flakeColor  : "lightblue" //#FFFFFFF
                },
        options     = $.extend({}, defaults, options);
        
      
      var interval    = setInterval( function(){
        var startPositionLeft   = Math.random() * documentWidth - 100,
          startOpacity    = 0.5 + Math.random(),
          sizeFlake     = options.minSize + Math.random() * options.maxSize,
          endPositionTop    = documentHeight - documentHeight/4,
          endPositionLeft   = startPositionLeft - 100 + Math.random() * 200,
          //durationFall    = documentHeight * 10 + Math.random() * 500;
          durationFall = 8500;
        $flake
          .clone()
          .appendTo('body')
          .css(
            {
              left: startPositionLeft,
              opacity: startOpacity,
              'font-size': sizeFlake,
              color: options.flakeColor
            }
          )
          .animate(
            {
              top: endPositionTop,
              left: endPositionLeft,
              opacity: 0.2
            },
            durationFall,
            'linear',
            function() {
              $(this).remove()
            }
          );
      }, 500);//options.newOn
      function myStopFunction() {
          var timerStart=new Date(); 
          var timer = setInterval(tick,3000); 
          function tick(){
             var time = new Date(); 
             var counting = time - timerStart;
             if (counting>3000){   
             //console.log(counting)             
             clearInterval(interval);
             }                      
          }
      }; 
      myStopFunction();
    };
})(jQuery);

