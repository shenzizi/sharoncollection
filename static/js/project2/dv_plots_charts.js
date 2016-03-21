//legend
function legend(){
var width = 150,
    height = 200

    var svg = d3.select("#legend").append("svg")
    .attr("width", width)
    .attr("height", height)
    //.style("border","1px solid green")
     var ordinal = d3.scale.ordinal()
                   .domain(["新台灣加油", "正晶限時批", "新聞面對面", "新聞龍捲風", "少康戰情室","新聞深喉嚨"])
                   .range([ "rgb(153, 107, 195)", "rgb(56, 106, 197)", "rgb(93, 199, 76)", "rgb(223, 199, 31)", "rgb(234, 118, 47)","rgb(244,149,163)"]);

      var svg = d3.select("#legend").select("svg");

      svg.append("g")
         .attr("class", "legendOrdinal")
         .attr("transform", "translate(20,20)")

      var legendOrdinal = d3.legend.color()  
                            //.shape("path", d3.svg.symbol().type("triangle-up").size(150)())
                            .shapePadding(10)
                            .scale(ordinal);

      svg.select(".legendOrdinal")
         .call(legendOrdinal);
      d3.selectAll(".cell").select("text")
        .style("fill","white")
}; 
function viewing_clickbutton(){
  $("#oneweek").click(function(){
      viewingbubble(hardcode_viewingbubble_json_oneweek,hardcode_viewingbubble_jsonvalue_oneweek)
      piechart(hardcode_pie_barline_data_oneweek)
      barlinechart01(hardcode_pie_barline_data_oneweek)
      barchartwn(hardcode_bardata_oneweek)
  })
  $("#onemonth").click(function(){
    viewingbubble(hardcode_viewingbubble_json_onemonth,hardcode_viewingbubble_jsonvalue_onemonth)
    piechart(hardcode_pie_barline_data_onemonth)
    barlinechart01(hardcode_pie_barline_data_onemonth)
    barchartwn(hardcode_bardata_onemonth)
  })
  $("#oneyear").click(function(){
    viewingbubble(hardcode_viewingbubble_json_oneyear,hardcode_viewingbubble_jsonvalue_oneyear)
    piechart(hardcode_pie_barline_data_oneyear)  
    barlinechart01(hardcode_pie_barline_data_oneyear)
    barchartwn(hardcode_bardata_oneyear)
  })
}


//chart01_viewingbubble
function viewingbubble(dataname1,dataname2){
  // Fake JSON data for viewingbubble,read from data.js
  d3.select("#viewingbubble").select("svg").remove();
  if (bgwidth<768){
      var width = 280,
          height= 300
  }else{
    var width = 550,
        height= 550
  }
  var color = d3.scale.ordinal()
    .range(["#996bc3", "#386ac5", "#5dc74c", "#e9c71f", "#ea762f", "#f495a3"]);

  var svg = d3.select('#viewingbubble').append('svg')
          .attr('width', width)
          .attr('height', height)
          //.style("border","1px solid green")

  var bubble = d3.layout.pack()
        .size([width, height])
        .value(function(d) {return d.size;})
         // .sort(function(a, b) {
        //  return -(a.value - b.value)
        // }) 
        .padding(3);
  
  // generate data with calculated layout values
  var nodes = bubble.nodes(processData(dataname1))
            .filter(function(d) { return !d.children; }); // filter out the outer bubble
 
  var vis = svg.selectAll('circle')
          .data(nodes)

  
  vis.enter().append('g')
      .append('circle')
      .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
      .attr('r', function(d) { return d.r; })
      .attr('class', function(d) { return d.className; })
      .style("fill",function(d,i){return color(i)})
  
  //need to be revised
  vis.append("text")
     .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
     .data(dataname2)
     .text(function(d,i){return d})
     //.style("text-anchor", "end") 

  function processData(data) {
    var obj = data.viewing;

    var newDataSet = [];

    for(var prop in obj) {
      newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
    }
    return {children: newDataSet};
  }
  
    vis.transition()
      .duration(5000)
      .ease('elastic')
      .attr("transform", "translate("+width/30+"," + height / 40 + ")")
      .attr("r", function(d) { return d.r; });    

} 
//chart02__piechart--retrieve data from ajax request
function piechart(dataset){
d3.select("#piechart").select("svg").remove()
if (dataset=="hardcode_pie_barline_data_oneweek"){
  var data=hardcode_pie_barline_data_oneweek
}else if(dataset=="hardcode_pie_barline_data_onemonth"){
  var data=hardcode_pie_barline_data_onemonth
}else{
  var data=hardcode_pie_barline_data_oneyear
}
var data=dataset
if (bgwidth<768){
  var width=280,
      height=280;
}else{
  var width = 360,
      height = 300
}

  var radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#996bc3", "#386ac5", "#5dc74c", "#e9c71f", "#ea762f", "#f495a3"]);

//var color = d3.scale.category10();

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(50);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.response; });

var svg = d3.select("#piechart").append("svg")
    .attr("width", width)
    .attr("height", height)
    //.style("border","1px solid green")
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.name); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.response; });


function type(d) {
  d.response = +d.response;
  return d;
}
};

//chart03__adcost&cpm
function barlinechart01(data){
d3.select("#barlinechart01").select("svg").remove(); 
var data=data

if (bgwidth<768){
var margin = {top: 20, right: 10, bottom: 30, left: 10},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
  }else{
var margin = {top: 20, right: 50, bottom: 30, left: 50},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
  }

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y0 = d3.scale.linear().range([height, 0]);
var y1 = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxisLeft = d3.svg.axis()
    .scale(y0)
    .orient("left")
    .ticks(5);

var yAxisRight = d3.svg.axis()
    .scale(y1)
    .orient("right")
    .ticks(5);

//var valueline = d3.svg.line()
    //.x(function(d) { return x(d.name); })
    //.y(function(d) { return y0(d.adcost); });
    
var svg = d3.select("#barlinechart01")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //.style("border","1px solid green")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  x.domain(data.map(function(d) { return d.name; }));
  y0.domain([0, d3.max(data, function(d) {
    return Math.max(d.adcost); })]); 
  y1.domain([0, d3.max(data, function(d) { 
    return Math.max(d.cpm); })]);


  var xlabels=svg.append("g")
      .attr("class", "x axis")
      .style("fill","white") 
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  xlabels.selectAll("text").remove();

  svg.append("g") 
     .attr("class", "y axis")
     .style("fill","white") 
     .call(yAxisLeft) 
     .append("text")
     .attr("transform", "rotate(-90)") 
     .attr("y", 6) 
     .attr("dy", ".71em") 
     .style("text-anchor", "end") 
     .text("10秒廣告價");

svg.append("g") 
     .attr("class", "y axis")
    .style("fill","white")  
     .attr("transform", "translate("+width+",0)")
     .call(yAxisRight) 
     .append("text") 
     .attr("transform", "rotate(-90)")     
     .attr("y", 6) 
     .attr("dy", ".71em") 
     .style("text-anchor", "end") 
     .text("CPM");

//var color = d3.scale.category10();
var color = d3.scale.ordinal()
    .range(["#996bc3", "#386ac5", "#5dc74c", "#e9c71f", "#ea762f", "#f495a3"]);

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y0(d.adcost); })
      .attr("height", function(d) { return height - y0(d.adcost); })
      .style("fill",function(d,i){return color(i)})

  //put the circle at the center of the bar 
  var circlepadding=width/data.length/2-5; 

   svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("fill", "#3895a3")
    .attr("r", 10)
    .attr('cx', function (d) {return x(d.name)+circlepadding+"px";})
    .attr('cy', function (d) {return y1(d.cpm);});

function type(d) {
  d.adcost = +d.adcost;
  return d;
  }
}; 
 
//chart04__bar chart with negative values--retrieve data from ajax request
function barchartwn(pndataset){
d3.select("#nbar").select("svg").remove();
if (pndataset=="hardcode_bardata_oneweek"){
  var bardata=hardcode_bardata_oneweek
}else if (pndataset=="hardcode_bardata_onemonth"){
  var bardata=hardcode_bardata_onemonth
}else{
  var bardata=hardcode_bardata_oneyear
}
var bardata=pndataset;

if (bgwidth<768){
var margin = {top: 20, right: 10, bottom: 30, left: 10},
    width = 280 - margin.left - margin.right,
    height = 280 - margin.top - margin.bottom;
  }else if (bgwidth>1200){
    var margin = {top: 30, right: 20, bottom: 10, left: 50},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
  }else{
    var margin = {top: 30, right: 10, bottom: 10, left: 50},
    width = 300 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
  }

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .2);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top");

var svg = d3.select("#nbar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //.style("border","1px solid green")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(bardata, function(d) { return d.pnvalue; })).nice();
  y.domain(bardata.map(function(d) { return d.name; }));


var color = d3.scale.ordinal() //d3.scale.category10()
    //.range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b",]);
      .range(["#996bc3", "#386ac5", "#5dc74c", "#e9c71f", "#ea762f", "#f495a3"]);

svg.selectAll(".bar")
      .data(bardata)
    .enter().append("rect")
      .attr("class", function(d) { return d.pnvalue < 0 ? "bar negative" : "bar positive"; })
      .attr("x", function(d) { return x(Math.min(0, d.pnvalue)); })
      .attr("y", function(d) { return y(d.name); })
      .attr("width", function(d) { return Math.abs(x(d.pnvalue) - x(0)); })
      .attr("height", y.rangeBand())
      .style("fill",function(d,i){return color(i)})

  svg.append("g")
      .attr("class", "x axis")
      .style("fill","white")  
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .style("fill","white")  
    .append("line")
      .style("fill","white")  
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y2", height);


function type(d) {
  d.pnvalue = +d.pnvalue;
  return d;
}
}; 
 

  //d3 circosJS
  function circosjs(){
    if (bgwidth>=768){
     var circos = new circosJS({
      container: '#chart',
      width:420,
      height:420
    });
 
  circos
    .layout(
        {
            innerRadius: 160,
            outerRadius: 200,
            ticks: {display: false},
            labels: {
              position: 'center',
              display: true,
              size: 16,
              color: '#000',
              radialOffset: 15,
            },
        },
        hardcode_layout_data
    )
    .heatmap('temperatures', {
        innerRadius: 115,
        outerRadius: 155,
        logScale: false,
        colorPalette: 'YlOrRd',
        //colorPaletteReverse: true
    }, hardcode_viewing)
    .heatmap('days-off', {
        innerRadius: 105,
        outerRadius: 114,
        logScale: false,
        colorPalette: 'Blues',
        //colorPaletteReverse: true
    }, hardcode_cpm)
    .render();
  }else{
     var circos = new circosJS({
      container: '#chart',
      width:280,
      height:280
    });
 
  circos
    .layout(
        {
            innerRadius: 110,
            outerRadius: 140,
            ticks: {display: false},
            labels: {
              position: 'center',
              display: true,
              size: 14,
              color: '#000',
              radialOffset: 15,
            },
        },
        hardcode_layout_data
    )
    .heatmap('temperatures', {
        innerRadius: 90,
        outerRadius: 110,
        logScale: false,
        colorPalette: 'YlOrRd',
        //colorPaletteReverse: true
    }, hardcode_viewing)
    .heatmap('days-off', {
        innerRadius: 80,
        outerRadius: 90,
        logScale: false,
        colorPalette: 'Blues',
        //colorPaletteReverse: true
    }, hardcode_cpm)
    .render();
  }


    var div = d3.select("#chart").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);
    
     d3.select("#chart").selectAll("path") 
        .data(tooltip)     
        .on("mouseover", function(d,i) {  
            div.transition()    
                .duration(200)    
                .style("opacity", .9);    
            div .html("<b>date:" + d.date +"</b><br><b>收視率:" + d.value+"</b>")
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");
                console.log(d3.event.pageX,d3.event.pageY) 
            })          
        .on("mouseout", function(d) {   
            div.transition()    
                .duration(500)    
                .style("opacity", 0);
      });

    var w = 100,
        h= 130
    var svg = d3.select("#heatmaplegend").append("svg")
    .attr("width", w)
    .attr("height", h)
    //.style("border","1px solid green")

    
     //.range(["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026"]);
    var linear = d3.scale.linear()
       //.domain([0,10])
       .range(["rgb(255, 255, 178)", "rgb(177, 0, 38)"]); //YlOrRd[7]

  var svg = d3.select("#heatmaplegend").select("svg");

  svg.append("g")
     .attr("class", "legendLinear")
     .attr("transform", "translate(20,30)")
     .append("text")
     .text("收視率")
     .attr("y",-10)

  var legendLinear = d3.legend.color()
    .shapeWidth(30)
    .orient('vertical')
    .scale(linear);

  svg.select(".legendLinear")
    .call(legendLinear);          
  
  var linear = d3.scale.linear()
       //.domain([0,10])
       .range(["rgb(239, 243, 255)", "rgb(8, 69, 148)"]); //blue[7]
  var svg = d3.select("#heatmaplegend01").append("svg")
    .attr("width", w)
    .attr("height", h)
    //.style("border","1px solid green")

    svg.append("g")
     .attr("class", "legendLinear")
     .attr("transform", "translate(20,30)")
     .append("text")
     .text("C.P.M")
     .attr("y",-10)


    var legendLinear = d3.legend.color()
    .shapeWidth(30)
    .orient('vertical')
    .scale(linear);

    svg.select(".legendLinear")
    .call(legendLinear);                    
   };

  //bar charts with line charts //$(".highcharts-series rect").css("fill","red")
  function highchart_barline(){
   var arr=barlinechart();
   if (arr)
   var arrviewing = arr.filter(function(val) {
     return (val<1);
    });
   var arrcpm = arr.filter(function(val) {
     return (val>1);
    });
   var arrname = arr.filter(
    function (val) {
        return (typeof val === 'string');
    }
  );
   $('#highchart_barline').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: '收視率與C.P.M關係圖'
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: arrname,
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'C.P.M',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: '收視率',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}%',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'center',
            x: 0,
            verticalAlign: 'top',
            y: 50,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: '收視率',
            type: 'column',
            yAxis: 1,
            data: arrviewing, 
            tooltip: {
                valueSuffix: '%'
            }

        }, {
            name: 'C.P.M',
            type: 'spline',
            data: arrcpm, 
            tooltip: {
                valueSuffix: ''
            }
        }]
    });

}; 
            
    //bubblecharts,get data from sample.json
    function highchart_bubble(){
          $.getJSON( "../static/js/project2/dv_sample.json", function(resp) {
            $.each(resp.data,function(key,val){
              var objmarker={}; 
              abbreviation=["嫁妝娘家","甘味人生","戲說台灣","琅琊榜", "親家", "中視新聞", "戀愛鄰距離","民視晚聞","奔跑吧薔薇","台視晚間","哆啦Ａ夢","鹿鼎記","綜藝大熱門","６７點新聞","烏龍派出所","華視晚間", "航海王龐", "民視晚間", "型男大主廚", "花千骨幕"]
              resp.data[key].x=resp.data[key]["收視率"];
              resp.data[key].y=resp.data[key]["網路聲量(%)"];
              var pn=resp.data[key]['P/N'];
              resp.data[key].abb=abbreviation[key]; 
      
      // assign objradius.radius=3 to solve the problem of zero value in p/n 
                if (pn==0){ 
                  resp.data[key].z=0.5;                
                }else{
                  resp.data[key].z=pn;
                }
            });  
             //console.log(resp.data); 
             
    //break points
    Highcharts.wrap(Highcharts.Axis.prototype, 'getLinePath', function (proceed, lineWidth) {
        var axis = this,
            path = proceed.call(this, lineWidth),
            x = path[1],
            y = path[2];

        Highcharts.each(this.breakArray || [], function (brk) {
            if (axis.horiz) {
                x = axis.toPixels(brk.from);
                path.splice(3, 0,
                    'L', x - 4, y, // stop
                    'M', x - 9, y + 5, 'L', x + 1, y - 5, // left slanted line
                    'M', x - 1, y + 5, 'L', x + 9, y - 5, // higher slanted line
                    'M', x + 4, y
                );
            } else {
                y = axis.toPixels(brk.from);
                path.splice(3, 0,
                    'L', x, y - 4, // stop
                    'M', x + 5, y - 9, 'L', x - 5, y + 1, // lower slanted line
                    'M', x + 5, y - 1, 'L', x - 5, y + 9, // higher slanted line
                    'M', x, y + 4
                );
            }
        });
        return path;
    });

    /**
     * On top of each column, draw a zigzag line where the axis break is.
     */
    function pointBreakColumn(e) {
        var point = e.point,
            brk = e.brk,
            shapeArgs = point.shapeArgs,
            x = shapeArgs.x,
            y = this.translate(brk.from, 0, 1, 0, 1),
            w = shapeArgs.width,
            key = ['brk', brk.from, brk.to],
            path = ['M', x, y, 'L', x + w * 0.25, y + 4, 'L', x + w * 0.75, y - 4, 'L', x + w, y];

        if (!point[key]) {
            point[key] = this.chart.renderer.path(path)
                .attr({
                    'stroke-width': 2,
                    stroke: point.series.options.borderColor
                })
                .add(point.graphic.parentGroup);
        } else {
            point[key].attr({
                d: path
            });
        }
    }
      //bubble chart
         $('#bubblechart').highcharts({
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        title: {
            text: '節目收視率與網路聲量關係圖'
        },

        xAxis: {
            title: {
                    enabled: true,
                    text: '收視率(%)'
                },
            gridLineWidth: 1,
            lineWidth:2,
            tickInterval:0.25, 
            breaks:[{
              from:1.75,
              to:4.25,
              breakSize:0.05
            }],
             events: {
                pointBreak: pointBreakColumn
            }
        },

        yAxis: {
            title: {
                    enabled: true,
                    text: '網路聲量(%)'
                },
            startOnTick: false,
            endOnTick: false
        },
        legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 70,
                floating: true,
                backgroundColor: '#FFFFFF',
                borderWidth: 1
            },
         tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h5>{point.節目名稱}</h5></th></tr>' +
                '<tr><th>收視率:</th><td>{point.x}%</td></tr>' +
                '<tr><th>聲量:</th><td>{point.y}%</td></tr>' +
                '<tr><th>討論熱度:</th><td>{point.z}%</td></tr>',
            footerFormat: '</table>',
            followPointer: true
        },

        plotOptions: {
            bubble: {
                minSize:10,
                maxSize:45, 
                dataLabels: {
                    enabled: true,
                    //allowOverlap:true,
                    style:{
                        "textShadow": "0 0 0px"
                    },
                    format:"{point.abb}"     
                }
            },

        },

        series: [{
            /*regression: true ,
                regressionSettings: {
                    type: 'linear',
                    color:  'rgba(223, 83, 83, .9)'
                },*/
            name:"節目",
            data: resp.data,
             marker: {
                color: 'rgba(69,114,167,0.5)',
                fillColor: {
                    radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                    stops: [
                        [0, 'rgba(255,255,255,0.5)'],
                        [1, 'rgba(69,114,167,0.5)']
                    ]
                }
            }
        }]

    });

  //table
      function plottable(){
        if (bgwidth<340){
          $.each(resp.data,function(key,val){
            $("tbody").append("<tr><td>"+val["節目名稱"]+"</td><td>"+val["收視率"]+"</td><td>"+val["網路聲量(%)"]+"</td><td>"+val["Positive"]+"</td><td>"+val["Negative"]+"</td><td>"+val["P/N"]+"</td></tr>"); 
          })
        }else{
           $.each(resp.data,function(key,val){
            $("tbody").append("<tr><td>"+val["排名"]+"</td><td>"+val["台別"]+"</td><td>"+val["節目名稱"]+"</td><td>"+val["收視率"]+"</td><td>"+val["網路聲量(%)"]+"</td><td>"+val["Positive"]+"</td><td>"+val["Negative"]+"</td><td>"+val["P/N"]+"</td></tr>"); 
           })
        }; 
      }; 
    plottable();
  }); 
};



function retrieve_volumn_pndata(pndataset,qdimension){
   var pndataset=pndataset /*the dataset has to be put outside plotting() since the ajax requests has
to be pushed into pndataset incremently,then execute barchartwn(pndataset) -->retrieve_volumn_pndata("negative")&retrieve_volumn_pndata("positive") */
    var solrURL='http://61.220.233.158:7880/solr/news_20151028_2/select',
        dates=collectDates(),
        kws=collectKeywords()
    var dimension=qdimension
    var promiseobj=[]
    //push ajax requests in the promiseobj array dynamically
      $.each(kws, function(i, kw){
          var params={
            q:"+created_time:["+dates[0]+"T00:00:00Z TO "+dates[1]+"T00:00:00Z] +(\""+kw+"\")+"+qdimension+":[0.3 TO *]",
            indent:"true",
            rows:"0",
            wt:"json"
          };
    
          promiseobj.push(
          $.ajax({
              url:solrURL,
              data:params,
              dataType: 'jsonp',
              jsonp: 'json.wrf',
              type: 'GET',
              data: params,
              //beforeSend:progressevent_start()
          })
          )
        })
        $.when.apply(null, promiseobj).done(function() {
          $.each(arguments, function (i, data) { //data is the value returned by each of the ajax requests
            var obj={}
                obj.name=kws[i];
                if (qdimension==="negative"){
                  var pnvalue=-Math.abs(data[0].response.numFound)
                  obj.pnvalue=pnvalue     
                  pndataset.push(obj) 
                }else{
                  var pnvalue=Math.abs(data[0].response.numFound)
                  obj.pnvalue=pnvalue                                    
                  pndataset.unshift(obj) 
                }                    
          })
          //make the pdataset restore the original order
            var pdataset=pndataset.slice(0,pndataset.length/2).reverse(); 
            var ndataset=pndataset.slice(pndataset.length/2,pndataset.length); 
            pndataset=pdataset.concat(ndataset); 
          console.log(pndataset)
         if (pndataset.length==kws.length*2){
           barchartwn(pndataset)
           console.log(pndataset)
           //progressevent_complete();
          }
        })
};

function retrieve_volumn_data(){
      var solrURL='http://61.220.233.158:7880/solr/news_20151028_2/select',
      dates=collectDates(),
      kws=collectKeywords(),
      pndataset=[]; 
      var promiseobj=[],dataset=[]
    //push ajax requests in the promiseobj array dynamically
      $.each(kws, function(i, kw){
          var params={
            q:"+created_time:["+dates[0]+"T00:00:00Z TO "+dates[1]+"T00:00:00Z] +(\""+kw+"\")",
            indent:"true",
            rows:"0",
            wt:"json"
          };

          promiseobj.push(
          $.ajax({
              url:solrURL,
              data:params,
              dataType: 'jsonp',
              jsonp: 'json.wrf',
              type: 'GET',
              data: params,
          })
          )
        })
        $.when.apply(null, promiseobj).done(function() {
          $.each(arguments, function (i, data) { //data is the value returned by each of the ajax requests
            var obj={}
                obj.name=kws[i];
                obj.response=data[0].response.numFound                                              
                dataset.push(obj)     
          })
          piechart(dataset)
          console.log(dataset)
        })
    }    

 
