activeCard = 'card0';


// Set up UI color scheme
var iaColor = d3.scaleOrdinal(d3.schemeCategory10);
var rolColor = d3.interpolateLab('white', iaColor(1));

var iaNav = $('.ia-btn');

var home = document.getElementById("card1").offsetTop;


for (var i = 0; i < iaNav.length; i++) {
  var co = (i + 1) * 2 ;
  d3.select(iaNav[i])
    .style('background-color', function () { return iaColor(i + 1); }); // Somehow this isn't taking only even colors, which is what we want...
}



// Map variables:

var width = $(window).width(),
  height = $(window).height(),
  w = width,
  h = height - 90;

var projection = d3.geoMercator()
    // This .translate() method needs work so the map is positioned properly regardless of viewport aspect ...
    .translate([width / 4.5, height / 2]) // these will need to be dynamic
    .scale([400]);

var path = d3.geoPath()
  .projection(projection);


var svg = d3.select('#map-svg')
    .attr('height', h);
  //  .attr('width', width)
  svg.append('rect')
    .attr('class', 'background')
    .attr('height', h)
    .attr('width', w)
    .on('click', reset);

  svg = svg.append('g')
    .classed('map-g', true);

  var sscountries = [['AGO', 'ATF',  'BEN', 'CMR', 'CIV', 'CPV', 'TCD', 'COG', 'COD', 'COM', 'MYT', 'DJI',
    'GAB', 'GMB', 'GIN', 'GHA', 'GNB', 'GNQ', 'KEN', 'KIR', 'LBR', 'MDG', 'MLI', 'MUS', 'MRT',
    'MOZ', 'NAM', 'NGA', 'REU', 'STP', 'SEN', 'SYC', 'SLE', 'SOM', 'ZAF',
    'TZA', 'TGO', 'UGA'],
    ['c99', 'c706', 'c404', 'c834', 'c834', 'c508', 'c710', 'c516', 'c024', 'c180',
    'c178', 'c266', 'c226' ,'c120', 'c566', 'c204', 'c768', 'c288', 'c384', 'c430',
    'c694', 'c324', 'c624', 'c686', 'c270', 'c478']];

  var countryNames = ['Angola', 'Benin', 'Cameroon', 'Cape Verde', 'Comoros', 'Congo (Rep)',
    'Djibouti', 'DRC','Equatorial Guinea', 'Gabon', 'Gambia', 'Ghana', 'Guinea',
    'Guinea-Bissau', 'Ivory Coast', 'Kenya', 'Liberia', 'Madagascar', 'Mauritius',
    'Mozambique', 'Namibia', 'Nigeria', 'Sao Tome & Principe', 'Senegal', 'Seychelles',
    'Sierra Leone', 'Somalia', 'South Africa', 'Tanzania', 'Togo']

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    var randomCountries = shuffle(countryNames);



// Build table
  var table = d3.select('#rol-table').selectAll('tr')
    .data(randomCountries)
    .enter();

  var score = 100;
  var trow = table.append('tr');

    trow.style('border-left', function (d, i) {return '5px solid ' + rolColor(i / 29);});

    trow.append('td')
      .text(function (d, i) { return i;});

    trow.append('td')
      .classed('country-name',true)
    //  .classed('')  // This is where we put in the 3-digit ISO codes
      .text(function (d) {return d});

    trow.append('td')
    .text(function () {
      score = score - Math.floor(Math.random() * 5); return score;});



// Build base map
function countries (json ) {
  d3.json(json, function(error, world) {
      var countries = topojson.feature(world, world.objects.countries).features,
          neighbors = topojson.neighbors(world.objects.countries.geometries);


      var g = svg.append('g')         // Appends <g> to .map-g <g>
        .attr('class', 'countries');

      var incl = sscountries[1];

      g.selectAll(".country")
          .data(countries)
        .enter().insert("path", ".graticule")
          .attr('class', function (d) {
            //console.log(d);
            if (incl.includes('c' + d.id)) {
              //console.log(d.id);
            return 'country in c'+ d.id;  // class .in if in [id,id,id] ...
          } else {return 'country out'; }})
          .attr("d", path);
          // .style("fill", function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return countries[n].color; }) + 1 | 0); });
    });
}

// Functions for various layers
function eez (json) {
  d3.json(json, function(error, eez_lr) {
    var g = svg.append('g')
      .attr('class', 'card0-layer card4-layer')
      .classed('card-layer', true);       // These fields will become dynamic ... or how do we make this entire thing more dynamic?
    //  .attr('style', 'display:visible;');

    g.selectAll('.eez')
  		.data(topojson.feature(eez_lr, eez_lr.objects.eez_lr).features)
  		  .enter()
  		.append('path')
     		.attr('d', path)
        .attr('class', 'eez')
        .attr('class',
          function (d) {
            for (var i = 0; i < sscountries[0].length; i++) {
              if (d.properties.ISO_Ter1 === sscountries[0][i]) {
                return d.properties.ISO_Ter1 + ' in eez';
              } else {return d.properties.ISO_Ter1 + ' out eez';}
        }})
        .style('fill', function (d) {
            for (var i = 0; i < sscountries[0].length; i++) {
              if (d.properties.ISO_Ter1 === sscountries[0][i]) {
                return rolColor(Math.random());
              }
        }});
      //  .style('fill', function (d) {
        //  console.log(d.properties.Sovereign1);//return d3.interpolateRdYlGn(Math.random());
      //  });
    });
}

function fishedAreas (json) {
  d3.json(json, function(error, fished) {
    var g = svg.append('g')
      .attr('class', 'card1-layer')
      .classed('card-layer', true)
      .classed('invisible', true);
      //.style('display', 'none') ;      // These fields will become dynamic ... or how do we make this entire thing more dynamic?

    g.selectAll('.fished')
  		.data(topojson.feature(fished, fished.objects.Yemen_fishing_area).features)
  		  .enter()
  		.append('path')
     		.attr('d', path)
        .style('fill', rolColor(0.3))
        .style('stroke', rolColor(0.7));
      //  .classed('fished', true);
        });



}

function hra (json) {
  d3.json(json, function(error, hra) {
    var g = svg.append('g')
      .attr('class', 'card1-layer')
      .classed('card-layer', true)
      .classed('invisible', true);
    //  .style('display', 'none') ;      // These fields will become dynamic ... or how do we make this entire thing more dynamic?

    g.selectAll('.hra')
  		.data(topojson.feature(hra, hra.objects.hra).features)
  		  .enter()
  		.append('path')
     		.attr('d', path)
        .style('fill', rolColor(0.5))
        .style('stroke', rolColor(1))
//.classed('hra', true);
        });
}

function waterways (json) {
  d3.json(json, function(error, waterways) {
    var g = svg.append('g')
      .attr('class', 'card4-layer')
      .classed('card-layer', true)
      .classed('invisible', true);
    //  .style('display', 'none') ;      // These fields will become dynamic ... or how do we make this entire thing more dynamic?

    g.selectAll('.waterways')
  		.data(topojson.feature(waterways, waterways.objects.waterways).features)
  		  .enter()
  		.append('path')
     		.attr('d', path)
        .classed('waterways', true);
        });
}

function gIncidents (csv) {
  d3.csv(csv, function (data) {
    data.forEach (function (d) {
    //  d.id = +d.id;
      d.noSkiffs = +d.noSkiffs;
      d.pob = +d.pob;
      d.noSeafarers = +d.noSeafarers;
      d.crewSize = +d.crewSize;
      d.lat = +d.lat;
      d.lon = +d.lon;
    });

  var lat = data[2].lat,
    lon = data[2].lon;

  var g = svg.append('g')
    .attr('class', 'card2-layer')
    .classed('card-layer', true)
    .classed('invisible', true);
//    .attr('style', 'display:none;');

  g.selectAll('circle')
      .data(data)
    .enter().append('circle')
      .attr('cx', function (d) { return projection([d.lon, d.lat])[0]; })
      .attr('cy', function (d) { return projection([d.lon, d.lat])[1]; })
      .attr('r', '2px')
      .attr('class', 'incident')
      .style('fill', rolColor(1));
  });
}

function gGrid (json) {
  d3.json(json, function (error, cells) {
    if (error) throw error;
    var c = cells.features;
    var g = svg.append('g')
      .attr('class', 'card3-layer')
      .classed('card-layer', true)
      .classed('invisible', true)
      .classed('grid', true);
      //.attr('style','display: none;');

    g.selectAll('rect')
        .data(c).enter()
      .append('rect')
        .attr('x', function (d) { return projection(d.geometry.coordinates)[0]; })
        .attr('y', function (d) { return projection(d.geometry.coordinates)[1]; })
        .attr('width', '6')
        .attr('height', '6')

        //.attr('class','cell')
        .style('fill', function (d) {
          return rolColor(1-(d.properties.catch_all_ / 174000))
        });
  })
}



    // Load up the data layers
      countries('./data/110m.json');
      gIncidents('./data/incidents.csv');
      gGrid('./data/grid.json');
      eez('./data/eez_low_res.json');
      hra('./data/hra.json');
      fishedAreas('./data/hoa.json');
      waterways('./data/waterways.json');


function switchCard (target) {

  var targetCard = '#' + target;    // '#card1'

// First, clear all card-specific stuff:
  // Like the card div
  d3.select('#' + activeCard)
  //  .transition()
    .classed('invisible', true);

  // And the active geographic layers (fade out)
  d3.selectAll('.card-layer')
    .classed('invisible', true);

  var c = eval('cards.' + target);
  c.extent ? zoom(c.extent) : reset();

  // Now make target card visible
  d3.select(targetCard)
    .classed('invisible', false);

  // And turn on target card's data layers
  d3.selectAll('.' + target + '-layer')
  //  .transition()
    .classed('invisible', false);

  // And highlight the relevant countries:
  d3.selectAll('.on').classed('on',false);
  if (c.highlight) {
    for (var i = 0; i < c.highlight.length; i++) {
      d3.select('.'+c.highlight[i]).classed('on', true);
      console.log(c.highlight[i]);
    }
  } else { d3.selectAll('.on').classed('on', false);}

  activeCard = target;
}

// Additional FUNctionality to build into switchCard():
  // zoom() to desired extent - cards.card*.extent (or reset)

  // highlight appropriate countries (add tooltips?)

  // Zoom and highlight correct things on load !
  var cards = {
    card0 : {},
    card1 : {
      extent: [[50,35],[80,-20]],
      highlight: ['c99', 'c706']
    },
    card2: {
    //  extent: [[-5,24],[95,-20]],
      highlight: ['c566', 'c706']

    },
    card3: {
      highlight: ['c706', 'c404', 'c834'],
      extent: [[45,25],[80,-20]]
    },
    card4: {
      extent: [[20,40],[100,-45]],
      highlight: ['c566', 'c706', 'c710']
    },
    card5: {
    }

  }


// Event handlers
  d3.selectAll('.switch').on('click', function () {
    d3.event.preventDefault();
    var target = d3.select(this).attr('data-card');
    switchCard(target);
    d3.selectAll('.switch').classed('active',false);
    d3.select(this).classed('active',true);

  })

  d3.selectAll('.ia').on('click', function () {
    $('#iaModal').modal('show');
  });

  d3.selectAll('#country-menu li').on('click', function () {
    $('#countryModal').modal('show');
  })



// Highlighting functionality
var included = ['c262', 'c99', 'c706', 'c404', 'c566', 'c024'];

d3.select('#highlight').on('click', highlight);

function highlight () {
  for (var i = 0; i < included.length; i++) {
      var c = included[i];
      var country = d3.select(c);
      console.log(country.classed('highlight'));

      country.classed('in', !country.classed('in'));
  }
}

// Global <g>
var g = d3.select('.map-g');


function reset () {
  g.transition()
      .duration(750)
      .attr("transform", "");
}

function zoom (d) { // Where d is 2D array of UR and LL coords

  // First, convert [[],[]] array from lon, lat to x, y.


  var coords = [projection(d[0]),projection(d[1])];
  console.log(coords);
  var bounds = coords,
     dx = bounds[1][0] - bounds[0][0],
     dy = bounds[1][1] - bounds[0][1],
     x = (bounds[0][0] + bounds[1][0]) / 2,
     y = (bounds[0][1] + bounds[1][1]) / 2,
     scale = .9 / Math.max(dx / width, dy / height),
     translate = [width / 2 - scale * x, height / 2 - scale * y];

  g.transition()
    .duration(750)
    .style("stroke-width", 1.5 / scale + "px")
    .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
}


// Set scrolling nav situation


function init() {
    window.addEventListener('scroll', function(e){
      var ia = d3.selectAll('.ia'),
          distanceY = window.pageYOffset || document.documentElement.scrollTop,
          shrinkOn = 30;

      if (distanceY > shrinkOn) {
        ia.selectAll('p').classed('invisible',true);
        ia.classed('small',true);
        d3.select('#map-menu').transition().style('margin-top', '30px');
      } else {
        d3.select('#map-menu').transition().style('margin-top', '70px');

          ia.classed('small', false);
          ia.selectAll('p').classed('invisible',false);

      }

    });
}

window.onload = init();

d3.select('nav').on('mouseenter', function () {
  var ia = d3.selectAll('.ia'),
      distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 30;

  d3.select('#map-menu').transition().style('margin-top', '70px');
  ia.selectAll('p').classed('invisible',false);
  ia.classed('small', false);
});
