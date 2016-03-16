 //generate the cirlces for circle animation,home page logo   
     function circlegenerator(){ 
       var dataset=[]; 
          for (var i = 0; i < 65; i++) { 
            var obj = new Object;     
            var colors=["#fde10b","#8ab839","#99e2d3","#a23169","#ef3678","#ae6afc"]; 
            var transparent=[1,0.5,0.8];  
            //var bcr = Math.random()*(285-180) + 180;
            if (bgwidth<768){
              var bcr = Math.random()*(100-50) + 50;
              var r = Math.random()*(10-5) + 5;  
              var angle = Math.random()*(300-100) + 100;  
            }else{
              var bcr = Math.random()*(250-100) + 100;
              var r = Math.random()*(18-5) + 5;  
              var angle = Math.random()*(300-100) + 100; 
            }                    
            var color = colors[Math.floor(Math.random() * colors.length)];
            var opacity = transparent[Math.floor(Math.random() * colors.length)];
            obj.bcr=bcr; 
            obj.r=r; 
            obj.angle=angle; 
            obj.color=color;
            obj.opacity=opacity; 
            dataset.push(obj);    
          }    
          return dataset;      
        };
    
     function circleAnimation(){
       var dataset=circlegenerator();
       if (bgwidth<768){
        var w = 200;
        var h = 200;
       }else{
        var w=600;
        var h=600;
       }       
       var centerX = w/2;
       var centerY = h/2; 
       var svg = d3.select("#circleAnimation")
            .append("svg")
            .attr("width", w)   
            .attr("height", h)

        if (bgwidth<768){
             var bgcircle = svg.append("circle")
                        .attr("cx", 100)
                        .attr("cy", 100)
                        .attr("r", 60)
                        .attr("opacity",0.9)
                        .style("fill","white")
        }else{
             var bgcircle = svg.append("circle")
                        .attr("cx", 280)
                        .attr("cy", 280)
                        .attr("r", 200)
                        .attr("opacity",0.9)
                        .style("fill","white")           
        }      
   
         var circles = svg.selectAll("circle")
                 .data(dataset)
                 .enter()
                 .append("circle")

                 
         circles.attr("cx", function(d,i) {
            return (centerX + 200*Math.cos(d.angle));
         })
         .attr("cy", function(d,i) {
          return (centerY + 200*Math.sin(d.angle)) ;
        })
         .attr("r",function(d,i){
          return d.r;
        })
         .style("fill",function(d,i){
          return d.color;
        })
         .style("opacity",function(d,i){
          return d.opacity;
        });

      if (bgwidth<768){         
        d3.select("#circleAnimation").select("svg")
        .append("text")
        .text("Data")
        .attr("x",80)
        .attr("y",80)
        .style("text-anchor", "middle")
        .style("font-size","40px")
        .style("font-family",'Georgia')

       d3.select("#circleAnimation").select("svg")
        .append("text")
        .text("Visual")
        .attr("x",120)
        .attr("y",140)
        .style("text-anchor", "middle")
        .style("font-size","40px")
        .style("font-family",'Georgia')
      
      }else{
         d3.select("#circleAnimation").select("svg")
        .append("text")
        .text("Data")
        .attr("x",250)
        .attr("y",250)
        .style("text-anchor", "middle")
        .style("font-size","65px")
        .style("font-family",'Georgia')

       d3.select("#circleAnimation").select("svg")
        .append("text")
        .text("Visual")
        .attr("x",350)
        .attr("y",350)
        .style("text-anchor", "middle")
        .style("font-size","65px")
        .style("font-family",'Georgia')
      }


   //circles animation
    circles.transition()
     .delay(500)
     .duration(2500)
     .attr("cx",function(d,i){
           return (centerX + d.bcr*Math.cos(d.angle));
        })
     .attr("cy",function(d,i) {
            return (centerY + d.bcr*Math.sin(d.angle)) ;
        })
     .ease("elastic");
    };
    //page scroll
function scrolling(){
   var $animation_elements = $('.animation-element');
    var $window = $(window);

    function check_if_in_view() {
     var window_height = $window.height();
     var window_top_position = $window.scrollTop();
     var window_bottom_position = (window_top_position + window_height);
 
      $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
      } else {
       $element.removeClass('in-view');
      }
      });
    }

  $window.on('scroll resize', check_if_in_view);
  $window.trigger('scroll');
  }; 