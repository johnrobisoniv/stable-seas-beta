// STABLE Seas
// ONE EARTH FUTUREee
// v0.0.6

// Define global variables
// Issue Area
var iaIndex = issueAreaData[issueArea].metadata.index;

// Card
var cIndex;
// Included Countries
var includedCountries = ['AGO', 'BEN', 'CMR', 'CPV', 'COM', 'COG', 'DJI', 'COD', 'GNQ', 'GAB', 'GMB', 'GHA', 'GIN', 'GNB', 'CIV', 'KEN', 'LBR', 'MDG', 'MUS', 'MOZ', 'NAM', 'NGA', 'STP', 'SEN', 'SYC', 'SLE', 'SOM', 'ZAF', 'TZA', 'TGO'];

// Color variables
// var colorBrew = d3.scaleOrdinal(d3.schemeCategory20);// I don't think we need this any more...
var colorBrew = [
  ['#a6cee3', '#1f78b4'],
  ['#b2df8a', '#33a02c'],
  ['#fb9a99', '#e31a1c'],
  ['#fdbf6f', '#ff7f00'],
  ['#cab2d6', '#6a3d9a']
];
var iaColorSelection = issueAreaData[issueArea].metadata.color;
var rampColor = d3.interpolateLab('white', iaColorSelection);

// Map variables
var width = $(window).width(),
  height = $(window).height(),
  margins = {
    top: 50,
    bottom: 40,
    left: 0,
    right: 0
  },
  w = width - margins.left - margins.right,
  h = height - margins.top - margins.bottom;

var pi = Math.PI,
  tau = 2 * pi;

var projection = d3.geoMercator()
  .translate([width / 5.5, height / 2.3])
  .scale([w / 4]);

var path = d3.geoPath()
  .projection(projection);

// Set up #map-svg with scalability
var map = d3.select('#map-svg')
  .attr('viewBox', function() {
    return '0 0 ' + w + ' ' + h
  });

// Set <pattern> element at top:
map.append('defs')
  .append('pattern')
  .attr('id', 'pattern-stripe')
  .attr('patternUnits', 'userSpaceOnUse')
  .attr('width', '10')
  .attr('height', '10')
  .attr('patternTransform', 'rotate(45)');
map.append('mask')
  .attr('id', 'mask-stripe')
  .append('rect')
  .attr('x', '0')
  .attr('y', '0')
  .attr('width', '100%')
  .attr('fill', 'url(#pattern-stripe)');

// Set background rect, include callback to reset zoom
map.append('rect')
  .attr('class', 'background')
  .attr('height', '100%')
  .attr('width', '100%')
  .on('click', reset);

// Add svg group to map variable - everything will go inside this.
map = map.append('g')
  .classed('map-g', true);

var mapg = d3.select('.map-g');

// Set up the tooltip:
var tooltip = d3.select('body').append('div')
  .attr('class', 'hidden tooltip col-sm-1');

tooltip.append('h1');
var tooltipRow = tooltip.append('div')
  .classed('row tooltip-body', true);

tooltipRow.append('span')
  .classed('country-score', true);

tooltipRow.append('span')
  .classed('units', true);

// tooltipRow.append('div')
//   .classed('col-lg-6 left', true);
// tooltipRow.append('div')
//   .classed('col-lg-6 right', true);
// tooltip.append('svg')
//   .classed('tool', true);


function tooltip(geoObj) {



  if ($.inArray(d.properties.ISO_A3_EH, includedCountries) != -1) {
    var coords = path.bounds(geoObj);
    var tooltip = d3.select('div.tooltip');
    //  console.log(coords);

    tooltip.style('left', function() {
        var x = coords[0][0];
        //console.log(x);
        return x + 'px';
      })
      .style('top', function() {
        var y = coords[0][1] + 40;
        //  console.log(y)
        return y + 'px';
      })
      .classed('hidden', false);

    var idx = issueAreaData[issueArea].metadata.indexData
      .filter(function(obj) {
        return obj.iso3 == d.properties.ISO_A3_EH;
      })[0];

    tooltip.select('h1')
      .text(idx.country);

    var tooltipBody = tooltip.select('.tooltip-body');
    //var left = d3.select('.left').html('');
    //  var right = d3.select('.right').html('');

    tooltipBody.select('.country-score').text(idx.val);
    tooltipBody.select('.units').text(' units');
  }
}

// ... and the modals
$('#resizeModal').modal({
  show: false
});

// Active card handler:
var activeCard = 0;



// 1 Load page

// Promises, I hope I never break em

// Add a few sheets and js files
$('head').append('<link href="../../css/fancybox.css" rel="stylesheet">');
$('body').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.25/jquery.fancybox.min.js"></script>');

if (width > 1199 || window.navigator.userAgent.indexOf('MSIE') != -1) {

  buildMap('../../data/map-layer.js')
    .then(function(resolution) {
      // console.log(resolution);
      // If buildMap() resolves, execute:
      return loadIA(issueAreaData, activeCard); // returns loadIA promise
    }).then(function(resolution) {
      // console.log(resolution);
      setTimeout(switchCard(activeCard), 500);
    })
    .catch(function(error) {
      // console.log(error);
    });

} else { // redirect to PDF if on a small screen !
  window.location.href = "../stable-seas-executive-brief.html";
}


// 2 Tutorial ? (if never loaded ??) Will we implement this? Not MVP ...

// Small divs pop up on 3-step walkthrough
// 1 Issue Area menu
// 2 Card menu
// 3 Map & card interactivity


// Ad hoc elements - ### Add these to templates !

$('#resources-menu').prepend('<li><a href="../../stable-seas-executive-brief.pdf" target="_blank">Executive Summary</a></li>');


// 3 Event listeners

$('#content-holder').on('click', '.js-video-button', function() {
  var videoChannel = this.getAttribute('data-channel');
  $('.js-video-button').modalVideo({
    object: videoChannel
  });
});

$('#content-holder').on('click', '.internal-ref', function(e) {
  e.preventDefault();
  var target = this.getAttribute('data-link');
  switchCard(parseInt(target));
});

$('#map-svg').on('mouseenter', '.stableseas', function(e) {
  //var iso3 = e.getAttribute('data-iso3');
  var iso3 = d3.select(this).attr('data-iso3');
  pulse(iso3);
});

$('#map-svg').on('mouseleave', '.stableseas', function() {
  var iso3 = d3.select(this).attr('data-iso3');
  unpulse(iso3);
});

// Window Resize:
$(window).resize(function() {
  if ($(window).width() < 1200) {
    console.log('what!?');
    $('#resizeModal').modal('show');
  }
});

d3.selectAll('.stableseas')
  .on('mouseenter', pulse)
  .on('mousemove', function(d) {
    var mouse = d3.mouse(map.node()).map(function(d) { // map. ???
      return parseInt(d);
    })
  })
  .on('mouseout', function() {
    unpulse();
  });

// d3.selectAll('.label')
//   .on('mouseenter', function () {
//     d3.select(this)
//       .classed('invisible', false);
//   })

$('#content-holder').on('click', '.table-expand', function() {
  // e.preventDefault();
  if ($('.ranked-list').hasClass('collapsed')) {

    $('.hid').show();

    d3.select('.table-expand p')
      .text('Collapse...');

    d3.select('.ranked-list')
      .classed('collapsed', false)
      .classed('expanded', true);


  } else if ($('.ranked-list').hasClass('expanded')) {
    $('.hid').hide();

    d3.select('.table-expand p')
      .text('Expand to see more...');

    d3.select('.ranked-list')
      .classed('collapsed', true)
      .classed('expanded', false);

  } // this will break if we use more than one ranked list

});

function clearTooltip() {
  var ttip = d3.select('#tooltip-below-menu');

  ttip.select('.country-name')
    .classed('muted', true)
    .text('Country');

  ttip.select('.country-score')
    .classed('muted', true)
    .text('Score /')
  ttip.select('.units')
    .classed('muted', true)
    .text(' units');
}


// 4 Functions
// Master IA load function
function loadIA(data, card) { // where data = data.js format ... so it's an object set as a variable? Or array of objects?
  return new Promise(function(resolve, reject) {

    // Set title
    d3.select('title')
      .text(function() {
        return issueAreaData[issueArea].metadata.name + ' | Stable Seas Africa'
      })

    d3.select('head')
      .append('meta')
      .attr('name', 'description')
      .attr('content', issueAreaData[issueArea].metadata.description);

    d3.select('.navbar-brand')
      .attr('href', '../overview');
    // Color main ia nav ribbon:
    // console.log(iaNav);

    $('head').append('<script async src="https://www.googletagmanager.com/gtag/js?id=UA-107179985-1"></script>');

    d3.select('head')
      .append('script')
      .html("window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments)};gtag('js', new Date());gtag('config', 'UA-107179985-1');");

    $('footer .container').empty();
    $('footer .container').append("<p class=\"text-muted\">Stable Seas is a project of <a target='_blank' href='http://oneearthfuture.org/'>One Earth Future</a>.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To learn more contact Curtis Bell, project lead, at <a href=\"mailto:info@oneearthfuture.org\" target=\"_blank\">info@oneearthfuture.org</a>.<span id='social'><a href='https://www.facebook.com/oneearthfuture/' target=\"+_blank\"><i class='fa fa-facebook'></i></a>&nbsp;&nbsp;<a href='https://twitter.com/oeforg' target=\"_blank\"><i class='fa fa-twitter'></i></a>&nbsp;&nbsp;<a href='https://www.youtube.com/user/OEFResearch'><i class='fa fa-youtube'></i></a>&nbsp;&nbsp;<a href='https://twitter.com/hashtag/StableSeas' target=\"_blank\"><i class='fa fa-hashtag'></i></a></span> </p>");

    var iaNav = $('.ia-btn');
    $('.menu-navigation-p').remove();

    var iaMainNav = d3.select('#ia-main-nav');

    iaMainNav.append('div')
      .classed('ia ia-buffer col-lg-1', true);


    for (ia in issueAreaData) {
      var metadata = issueAreaData[ia].metadata;
      var index = metadata.index - 1;
      var iaPath = metadata.path;
      var iaCode = metadata.code;
      var iaColor = metadata.color;
      var iaText = metadata.name;

      var iaLink = iaMainNav.append('a')
        .attr('href', function() {
          return '../issue-areas/' + iaPath;
        });

      var iaDiv = iaLink.append('div')
        .attr('id', function() {
          return 'ia-' + iaCode;
        })
        .classed('ia ia-btn col-xs-1', true)
        //  .transition().delay(i )  // ### can we figure out how to get the animated nav reveal again?
        .style('background-color', iaColor);

      iaDiv.append('p')
        .text(iaText);

    }

    iaMainNav.append('div')
      .classed('ia ia-buffer col-xs-1', true);

    var iaBtn = d3.select('#ia-' + issueArea);

    iaBtn.style('background-color', function () {
        return rampColor(0.6);
      })
      .style('border-bottom', function() {
        return "5px solid " + iaColorSelection;
      });

    // Pull target card index from URL anchor:
    var hash = window.location.hash;
    if (hash) {
      hash = parseInt(hash.substring(1));
      if (Math.floor(hash) == hash && $.isNumeric(hash) && hash < issueAreaData[issueArea].cards.length) {
        activeCard = hash;
      }
    }

    // Load page-level data:
    issueAreaData[issueArea].load(issueAreaData[issueArea].metadata.csv, function(result) {

      // Loop through cards:
      var cards = issueAreaData[issueArea].cards; // Array of card objects

      cards.forEach(function(card, cardIndex) { // don't use single letter variables!!!!
        cIndex = cardIndex;
        // Set up for selector
        var constructionCard = 'card' + cardIndex;

        d3.select('#map-menu')
          .append('div')
          .attr('id', function() {
            return 'card-' + cardIndex + '-menu'
          })
          .attr('data-card', cardIndex)
          .attr('class', 'switch')
          .text(function() {
            return cardIndex == 0 ? card.menu : cardIndex + ' ' + card.menu;
          })
          .on('click', function() {
            switchCard(parseInt(this.getAttribute('data-card')));
          }); // ### click handler menu item ...


        // Load map data...
        var mapDataPath = card.map.path;
        if (card.map.load) {
          card.map.load(cardIndex, mapDataPath);
        }

        // Add card to #content-holder
        var cardUnderConstruction = d3.select('#content-holder')
          .append('div')
          .attr('id', constructionCard)
          .classed('card col-lg-4 col-sm-12 invisible', true)
          .style('border-left', function() {
            return '5px solid ' + rampColor(1);
          });

        if (cardIndex != 0) {
          cardUnderConstruction
            .append('h4')
            .text(issueAreaData[issueArea].metadata.name)
            .classed('card-header', true);
        }

        // Now for the els array: loop through els array, build each element in order
        var els = card.els;

        els.forEach(function(el, elIndex) {
          buildEl(el, constructionCard, cardIndex, elIndex);
        }); // End els loop

        for (ia in issueAreaData) {
          d3.selectAll('.inline.' + issueAreaData[ia].metadata.path)
            .style('background-color', function() {
              return d3.interpolateLab('white', issueAreaData[ia].metadata.color)(0.2);
            });
        }

      });

      $('#ia-maritimeMixedMigration')
        .parent()
        .attr('href', '../issue-areas/maritime-mixed-migration');

      buildModals();

      setTimeout(function() {
        resolve('loadIA resolved');
      }, 0);
    });
  }); // end of Promise
}

// Build Modals:
function buildModals() {
  var resizeModalHTML = '<div class="modal fade" id="resizeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Under Construction</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">Thanks so much for exploring our interface.<br><br>This beta version of the site does not support dynamic resizing. If you\'d like to view our Issue Area summary paper for mobile, click <a href="../maritime-enforcement/m/stable-seas-maritime-enforcement-summary.pdf">here</a>.<br><br>If you\'d like to use the interactive desktop version of the site maximize your browser window and reload.<br><br>If you have any feedback please email info@stableseas.org.<br><br>Thank you!</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>';

  $('body').prepend(resizeModalHTML);


}

// Card element Functions
function buildEl(obj, container, cardIndex, elIndex) { // Function to build element from issueArea.cards[i]. object
  switch (obj.tag) {
    case 'p':
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
      buildSimple(obj, container, cardIndex, elIndex)
      break;
    case 'ol':
    case 'ul':
      buildList(obj, container, cardIndex, elIndex)
      break;
    case 'legend':
      buildLegend(obj, container, cardIndex, elIndex)
      break;
    case 'links':
      buildLinks(obj, container, cardIndex, elIndex)
      break;
    case 'blockquote':
      buildBlockquote(obj, container, cardIndex, elIndex)
      break;
    case 'bigtext':
      buildBigText(obj, container, cardIndex, elIndex)
      break;
    case 'table':
      buildTable(obj, container, cardIndex, elIndex)
      break;
    case 'img':
      buildImg(obj, container, cardIndex, elIndex)
      break;
    case 'caption':
      buildCaption(obj, container, cardIndex, elIndex)
      break;
    case 'hr':
      d3.select('#' + container)
        .append('hr');
      break;
    case 'indexTable':
      buildIndexTable(obj, container, cardIndex, elIndex)
      break;
    case 'overviewIndexTable':
      buildOverviewIndexTable(obj, container, cardIndex, elIndex)
      break;
    case 'video':
      buildVideo(obj, container, cardIndex, elIndex)
      break;
    case 'd3':
      break;
    default:
      console.log('One of the els objects did not match our switch statement in the buildEl() function.')
  }
}

// and all the buildEl callbacks:
function buildSimple(obj, container, cardIndex, elIndex) {

  var selector = '#' + container;
  var s = d3.select(selector)
    .append(obj.tag);

  if (obj.classes) {
    s.classed(obj.classes, true);
  }
  obj.html ? s.html(obj.html) : s.text(obj.text);

  if (obj.execute) {
    obj.execute();
  };
}


function buildLinks(obj, container, cardIndex, elIndex) {
  var selector = '#' + container;
  var linksDiv = d3.select(selector)
    .append('div')
    .classed('links', true);

  linksDiv.append('h3')
    .text('Notes');

  var links = obj.items;
  links.forEach(function(link) {
    var a = linksDiv.append('a')
      .attr('href', link.url)
      .attr('target', '_blank')
      .append('div')
      .classed('link', true)
      .style('background-color', function() {
        return rampColor(0.3);
      })
      .style('border-right', function() {
        return '5px solid ' + rampColor(1);
      });

    a.append('p')
      .classed('title', true)
      .text(link.title);

    a.append('p')
      .classed('source', true)
      .html(link.org);
  })
}

function buildLegend(obj, container, cardIndex, elIndex) {

  var selector = '#' + container;
  var id = container + '-legend';
  var contDiv = id + '-div';
  var legendDiv = d3.select(selector)
    .append('div')
    .attr('id', id)
    .attr('class', 'panel-group legend')
    .attr('role', 'tablist')
    .attr('aria-multiselectable', 'true')
    .style('background-color', function() {
      return rampColor(0.2);
    })
    .style('border-left', function() {
      return '5px solid ' + rampColor(1);
    });

  var a = legendDiv.append('a')
    .attr('role', 'button')
    .attr('data-toggle', 'collapse')
    .attr('data-parent', function() {
      return '#' + id
    })
    .attr('href', function() {
      return '#' + contDiv
    })
    .attr('aria-expanded', 'true')
    .attr('aria-controls', contDiv);

  a.append('div')
    .attr('class', 'panel-heading')
    .attr('role', 'tab')
    .attr('id', function() {
      return id + '-heading';
    })
    .append('h3').attr('class', 'legend-title')
    .text(obj.text)
    .append('span')
    .attr('class', 'glyphicon glyphicon-info-sign')
    .attr('aria-hidden', 'true');

  var legendContent = legendDiv.append('div')
    .attr('id', contDiv)
    .attr('class', 'panel-collapse collapse in')
    .attr('role', 'tabpanel')
    .attr('aria-labelledby', function() {
      return id + '-heading';
    })
    .append('div')
    .classed('legend-body', true);

  legendContent.html(obj.legendContent);
}

function buildBlockquote(obj, container, cardIndex, elIndex) {
  var selector = '#' + container;
  var bqDiv = d3.select(selector)
    .append('div')
    .attr('class', 'block col-lg-12')
    .style('background-color', function() {
      return rampColor(0.2);
    })
    .style('border-left', function() {
      return '5px solid ' + rampColor(1);
    });

  bqDiv.append('p')
    .html(obj.html);

  bqDiv.append('span')
    .classed('attribution', true)
    .append('a')
    .attr('href', obj.link)
    .attr('target', '_blank')
    .html(obj.source);
}

function buildBigText(obj, container, cardIndex, elIndex) {
  var selector = '#' + container;
  var bigText = d3.select(selector)
    .append('div')
    .attr('class', 'big-text col-lg-12');


  bigText.append('p')
    .html(obj.html)
    .style('border-top', function() {
      return '2px solid ' + rampColor(0.3);
    })
    .style('border-bottom', function() {
      return '2px solid ' + rampColor(0.3);
    });;

}

function buildTable(obj, container, cardIndex, elIndex) {
  var selector = '#' + container;
  var table = d3.select(selector)
    .append('table')
    .classed('ranked-list', true);

  var trs = obj.rows;

  trs.forEach(function(row) {
    var tr = table.append('tr');

    row.forEach(function(cell) {
      tr.append('td')
        .text(cell);
    })
  })
}

function buildList(obj, container, cardIndex, elIndex) {

  if (obj.build) {
    obj.build(container);
  }

  var list = d3.select('#' + container)
    .append(obj.tag);
  var items = obj.rows;
  items.forEach(function(item) {
    list.append('li')
      .html(item);
  })
}

function buildVideo(obj, container, elIndex) {

  var videoThumb = d3.select('#' + container)
    .append('div')
    .classed('video-thumb js-video-button col-lg-12', true)
    .attr('data-video-id', obj.videoId)
    .attr('data-channel', obj.channel ? obj.channel : 'youtube');

  if (obj.gif) {

    videoThumb.append('img')
      .attr('src', obj.thumb)
      .classed('video-gif', true);

  } else {

    videoThumb.append('img')
      .attr('src', obj.thumb)
      .classed('background-video-image', true);
    //
    // videoThumb.append('img')
    //   .classed('inner-thumb', true)
    //   .attr('src', '../assets/play-icon.png');
  }

}

function buildImg(obj, container, cardIndex, elIndex) {

  var selector = '#' + container;
  var img;

  if (obj.link) {
    img = d3.select(selector)
      .append('a')
      .attr('href', obj.link)
      .attr('target', '_blank');
  } else {
    img = d3.select(selector)
      .append('a')
      .attr('data-fancybox', 'gallery')
      .attr('href', obj.src);
  }

  img.append('img')
    .classed('img-responsive', true)
    .attr('src', obj.src)
    .attr('alt', obj.alt);

  d3.select(selector)
    .append('div')
    .classed('caption', true)
    .append('p')
    .html(obj.caption);
}

function buildCaption(obj, container, cardIndex, elIndex) {

  var selector = '#' + container;

  var p = d3.select(selector)
    .append('div')
    .classed('caption', true)
    .append('p');

  p.html(obj.text);
}

// the rest is going to be custom - right?

function buildIndexTable(obj, container, cardIndex, elIndex) {
  // Set variable equal to data pulled in from CSV in issueAreaData[issueArea].load();
  var metadata = issueAreaData[issueArea].metadata;
  var order = metadata.order;
  var tableData = metadata.countryData;
  var csvSelector = 'ia' + metadata.index + 'c' + cardIndex;

  tableData = tableData.sort(function(x, y) {
    return d3.descending(x[csvSelector], y[csvSelector]); // ### This needs to be refactored as x[cardCol], y[cardCol]
  });

  var listLength = tableData.length;
  var tableArray = [];

  tableData.forEach(function(row) {
    tableArray.push(row[csvSelector]);
  });
  var tableMax = d3.max(tableArray),
    tableMin = d3.min(tableArray);

  var table = d3.select('#' + container)
    .append('table')
    .attr('id', function() {
      return container + '-list';
    })
    .classed('ranked-list collapsed', true)
    .selectAll('tr')
    .data(tableData)
    .enter();

  var trow = table.append('tr')
    .attr('data-iso3', function(d) {
      return d.iso3
    })
    .attr('class', function(d, i) {
      if (i < 5) {
        return d.iso3
      } else {
        return d.iso3 + ' hid'
      };
    })
    .classed('country-rank', true)
    .on('mouseenter', function() {
      var iso3 = d3.select(this).attr('data-iso3');
      pulse(iso3);
    })
    .on('mouseleave', unpulse);
  // ^ from https://bl.ocks.org/lhoworko/7753a11efc189a936371


  trow.append('td')
    .text(function(d, i) {
      return i + 1;
    });

  trow.append('td')
    .classed('country-name', true)
    //  .classed('')  // This is where we put in the 3-digit ISO codes
    .text(function(d) {
      return d.country
    })
    .style('border-left', function(d, i) {
      if (metadata.order == -1) {
        return '30px solid ' + rampColor(1 - ((d[csvSelector] - tableMin) / (tableMax - tableMin)));
      } else {
        return '30px solid ' + rampColor(((d[csvSelector] - tableMin) / (tableMax - tableMin)));
      }


    });

  trow.append('td')
    .text(function(d) {
      return Math.floor(d[csvSelector] * 100);
    });

  d3.selectAll('.hid')
    .style('display', 'none');

  d3.select('#' + container).append('div')
    .classed('table-expand', true)
    .style('background-color', function() {
      return rampColor(0.2);
    })
    .append('p')
    .text('Expand to see more...');
}

function buildOverviewIndexTable(obj, container, cardIndex, elIndex) {
  // Set variable equal to data pulled in from CSV in issueAreaData[issueArea].load();
  var metadata = issueAreaData[issueArea].metadata;
  var order = metadata.order;
  var tableData = metadata.countryData;
  //  var csvSelector = 'ia' + metadata.index + 'c' + cardIndex;

  tableData = tableData.sort(function(x, y) {
    return d3.ascending(x['country'], y['country']); // ### This needs to be refactored as x[cardCol], y[cardCol]
  });

  var col = obj.col;

  var listLength = tableData.length;
  var tableArray = [];

  // tableData.forEach(function (row) {
  //   tableArray.push(row[csvSelector]);
  // });
  // var tableMax = d3.max(tableArray),
  //   tableMin = d3.min(tableArray);

  var table = d3.select('#' + container)
    .append('table')
    .attr('id', 'overview-list')
    .classed('ranked-list collapsed', true)
    .selectAll('tr')
    .data(tableData)
    .enter();

  var trow = table.append('tr')
    .attr('data-iso3', function(d) {
      return d.iso3
    })
    .attr('class', function(d, i) {
      if (i < 5) {
        return d.iso3
      } else {
        return d.iso3 + ' hid'
      };
    })
    .classed('country-' + col, true)
    .on('mouseenter', function() {
      var iso3 = d3.select(this).attr('data-iso3');
      pulse(iso3);
    })
    .on('mouseleave', unpulse);
  // ^ from https://bl.ocks.org/lhoworko/7753a11efc189a936371


  // trow.append('td')
  //   .text(function (d, i) { return i + 1;});

  trow.append('td')
    .classed('country-name', true)
    //  .classed('')  // This is where we put in the 3-digit ISO codes
    .text(function(d) {
      return d.country
    })
    .style('border-left', function(d, i) {
      return '25px solid ' + issueAreaData[d[col]].metadata.color;
      // if (metadata.order == -1) {
      //   return '30px solid ' + rampColor( 1 - ( ( d[csvSelector] - tableMin ) / ( tableMax - tableMin ) ) );
      // } else {
      //   return '30px solid ' + rampColor( ( ( d[csvSelector] - tableMin ) / ( tableMax - tableMin ) ) );
      // }


    });

  trow.append('td')
    .text(function(d) {
      return issueAreaData[d[col]].metadata.name;
    });

  d3.selectAll('.hid')
    .style('display', 'none');

  d3.select('#' + container).append('div')
    .classed('table-expand', true)
    .style('background-color', function() {
      return rampColor(0.2);
    })
    .append('p')
    .text('Expand to see more...');
}

// Highlighting functions for table x map
function pulse(iso3) {
  var a;
  //console.log(d3.select(this).attr('data-iso3'));
  if (iso3) {
    a = '.' + iso3;
  } else {
    a = '.' + d3.select(this).attr('data-iso3');
  }

  d3.selectAll(a)
    .classed('pulse', true);
}

function unpulse() {
  d3.selectAll('.pulse')
    .classed('pulse', false);
}

// Map functions
function floor(k) {
  return Math.pow(2, Math.floor(Math.log(k) / Math.LN2));
}

function buildMap(json) { // ### Need some way to attach EEZ layer to specific cards for display ...
  return new Promise(function(resolve, reject) {
    d3.json(json, function(error, geoData) {
      if (error) {
        reject(error);
      }

      // First, EEZ:
      var eezg = mapg.append('g')
        .classed('card-layer card-eez-layer', true); // These become dynamic

      eezg.selectAll('.eez')
        .data(topojson.feature(geoData, geoData.objects.eez).features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d) {
          var classlist = 'eez ';
          //      console.log(d.properties);
          if (d.properties.Pol_type === 'Disputed' && includedCountries.contains(d.properties.ISO_Ter1)) {
            classlist += ' disputed included';
          } else if (includedCountries.contains(d.properties.ISO_Ter1)) {
            classlist += d.properties.ISO_Ter1 + ' stableseas';
          } else {
            classlist += d.properties.ISO_Ter1;
          }
          //console.log(classlist);
          return classlist;
        })
        .attr('data-iso3', function(d) {

          if (d.properties.Pol_type === 'Disputed') {
            return null;
          } else {
            return d.properties.ISO_Ter1;
          }
        })
        .on('mouseenter', function(d) {
          //  console.log(d);
          if (d.properties.Pol_type != 'Disputed') {
            d3.select('.label.' + d.properties.ISO_Ter1)
              .classed('invisible', false);
          }
        })
        .on('mouseout', function(d) {
          d3.select('.label.' + d.properties.ISO_Ter1)
            .classed('invisible', true);
        })
        .on('click', function(d) {});


      // Countries
      var countries = topojson.feature(geoData, geoData.objects.countries).features,
        neighbors = topojson.neighbors(geoData.objects.countries.geometries);

      var g = mapg.append('g')
        .attr('class', 'countries');

      var labels = mapg.append('g').attr('class', 'labels');

      g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr('class', function(d) {
          if (d.properties.NAME == 'France') {
            console.log(d);
          }
          if ($.inArray(d.properties.ISO_A3_EH, includedCountries) != -1) {
            return d.properties.ISO_A3_EH + ' country in';
          } else if (d.properties.ISO_A3_EH == 'ATA') {
            return d.properties.ISO_A3_EH + ' country out invisible';

          } else {
            return d.properties.ISO_A3_EH + ' country out';

          }
        }) // This is where we could add a class to included countries...
        .attr("d", path)
        .attr('title', function(d) {
          //console.log(d);
          console.log(d.properties.SOVEREIGNT);

          return d.properties.SOVEREIGNT;


        })
        .on('mouseenter', function(d) {
          //console.log(d);
          if (issueAreaData[issueArea].cards[activeCard].map.tooltip) {

            if ($.inArray(d.properties.ISO_A3_EH, includedCountries) != -1) {
              var coords = path.bounds(d);
              var tooltip = d3.select('div.tooltip');
              //  console.log(coords);
              var idx = issueAreaData[issueArea].metadata.indexData
                .filter(function(obj) {
                  return obj.iso3 == d.properties.ISO_A3_EH;
                })[0];

              tooltip.style('left', function() {
                  var x = coords[0][0];
                  return x + 'px';
                })
                .style('top', function() {
                  var y = coords[0][1] + 40;
                  return y + 'px';
                })
                .classed('hidden', function () {
                  if (idx["c" + activeCard]) {
                    return false;
                  } else {
                    d3.selectAll('.label.' + d.properties.ISO_A3_EH)
                      .classed('invisible', false);
                    return true;
                  }
                });



              tooltip.select('h1')
                .text(idx.country);

              var tooltipBody = tooltip.select('.tooltip-body');
              tooltipBody.select('.country-score').text(idx["c" + activeCard]);
              tooltipBody.select('.units').text(' units');



            } else {
              //  console.log(d.properties.ISO_)
              d3.selectAll('.label.' + d.properties.ISO_A3_EH)
                .classed('invisible', false);
              //  console.log(d);
            }
          }
        })
        .on('mouseout', function(d) {
          d3.select('.label.' + d.properties.ISO_A3_EH)
            .classed('invisible', true);
          d3.select('div.tooltip').classed('hidden', true);
        });

      var wSaharaCoords = [
        [-8.67, 27.67],
        [-13.17, 27.67]
      ];
      g.append('line')
        .attr('x1', function() {
          return projection(wSaharaCoords[0])[0];
        })
        .attr('y1', function() {
          return projection(wSaharaCoords[0])[1];
        })
        .attr('x2', function() {
          return projection(wSaharaCoords[1])[0];
        })
        .attr('y2', function() {
          return projection(wSaharaCoords[1])[1];
        })
        .attr('stroke-dasharray', '2,2')
        .classed('w-sahara-line', true);

      labels.selectAll('.label')
        .data(countries).enter()
        .append('text')
        .attr("class", function(d) {
          //      console.log(includedCountries.contains(d.properties.ISO_A3_EH));
          if ($.inArray(d.properties.ISO_A3_EH, includedCountries) != -1) {
            return "invisible label " + d.properties.ISO_A3_EH;
          } else {
            return "invisible label out " + d.properties.ISO_A3_EH;
          }
        })
        .attr('x', function(d) {
          return path.centroid(d)[0]; // We can do custom label placement ... as a separate script ... ###
        })
        .attr('y', function(d) {
          return path.centroid(d)[1];
        })
        .style('text-anchor', 'middle')
        .text(function(d) {
          // console.log(d);
          if (d.properties.NAME != 'W. Sahara') {
            return d.properties.NAME;

          }
        });

      resolve('finished buildMap');
    });
  }) // end of Promise
}


// Interactivity functions
function switchCard(target) {
  // First, remove highlighted menu item

  d3.selectAll('.active')
    .attr('style', null) // what did this just break??
    .classed('active', false);

  d3.selectAll('.included')
    .transition()
    .attr('style', null)

  clearBGImg();

  var targetCard = '#card' + target;


  d3.selectAll('.card')
    .classed('invisible', true);

  d3.select('.card.active')
    .classed('active', false);

  // And the active geographic layers (fade out)
  d3.selectAll('.card-layer')
    .classed('invisible', true);

  // Now make target card visible
  d3.select(targetCard)
    .classed('invisible', false)
    .classed('active', true);

  window.scrollTo(0, 0); // do we want the toolbar to expand if they haven't hovered on it or scrolled up? Kinda no...

  var mapObj = issueAreaData[issueArea].cards[target].map;

  d3.selectAll('.card-' + target + '-layer')
    .classed('invisible', false);

  if (mapObj.switch) {
    mapObj.switch(target);
  } // ### This has to be on every card - no 'if' statement needed??

  // And turn on target card's data layers


  // And highlight the relevant countries:
  d3.selectAll('.on').classed('on', false);
  // ### Then loop through cards[i].map.highlights,
  var highlights = issueAreaData[issueArea].cards[target].map.highlights;
  if (highlights) {
    highlights.forEach(function(highlight, i) {
      d3.selectAll('.' + highlight)
        .classed('active', true)
        .transition().delay(10 * i)
        .style('fill', function() {
          return rampColor(0.5);
        })
        .style('stroke', function() {
          return rampColor(1);
        });
      //.classed('on', true);

    })
  }

  d3.select('#card-' + target + '-menu')
    .classed('active', true)
    .style('background-color', function() {
      return rampColor(0.3);
    })
    .style('border-left', function() {
      return '5px solid ' + rampColor(1);
    });

  var cardMapObj = issueAreaData[issueArea].cards[target].map;
  cardMapObj.extent ? zoom(cardMapObj.extent) : reset();

  activeCard = target;
}

// Arrow buttons to step up or down a card.
// Add keystroke event listener! : leftarrow (stepCardDown()), rightarrow (stepCardUp());
function stepCardUp() {
  switchCard(activeCard + 1);
}

function stepCardDown() {
  switchCard(activeCard - 1);
}


// Check if value is in array:
Array.prototype.contains = function(needle) {
  for (i in this) {
    if (this[i] == needle) return true;
  }
  return false;
}


function switchMainIndex(cardIndex) {
  if (!cardIndex) {
    cardIndex = 0;
  }

  var target = 'card-' + cardIndex + '-layer';
  var metadata = issueAreaData[issueArea].metadata;
  var vals = metadata.countryData;
  var valsArr = []
  var csvSelector = 'ia' + metadata.index + 'c' + cardIndex;
  vals.forEach(function(d) {
    valsArr.push(d[csvSelector]); // again, must use iaIndex and index
  })

  var max = d3.max(valsArr);
  var min = d3.min(valsArr);
  var range = max - min;

  vals.forEach(function(d, i) { // ### this is a misuse of D3! or is it?!
    var highlightedCountry = d3.selectAll('.eez.' + d.iso3);

    // highlightedCountry.classed('highlighted', true);
    highlightedCountry.transition()
      .delay(i * 10)
      .style('fill', function() {
        return rampColor((d[csvSelector] - min) / (max - min));
      });
  });

  d3.select('.' + target)
    .classed('invisible', false);
}

function switchMainIndexInverse(cardIndex) {
  var target = 'card-' + cardIndex + '-layer';
  var metadata = issueAreaData[issueArea].metadata;
  var vals = metadata.countryData;
  var valsArr = []
  var csvSelector = 'ia' + metadata.index + 'c' + cardIndex;

  vals.forEach(function(d) {
    valsArr.push(d[csvSelector]);
  })

  var max = d3.max(valsArr);
  var min = d3.min(valsArr);
  var range = max - min;

  vals.forEach(function(d, i) { // ### this is a misuse of D3! or is it?!
    var highlightedCountry = d3.selectAll('.eez.' + d.iso3);

    highlightedCountry.classed('included', true);
    highlightedCountry.transition()
      .delay(i * 10)
      .style('fill', function() {
        return rampColor(1 - ((d[csvSelector] - min) / (max - min)));
      });
  });

  d3.select('.' + target)
    .classed('invisible', false);
}

function setBGImg(imagePath) {
  d3.select('.bgimg img')
    .attr('src', imagePath);

  d3.select('.bgimg')
    .classed('invisible', false);
}

function clearBGImg() {
  d3.select('.bgimg')
    .classed('invisible', true);
}

function zoom(coordinates) { // Where coordinates is 2D array of UR and LL coords. Work on variable names with this.

  var coords = [projection(coordinates[0]), projection(coordinates[1])];
  var bounds = coords,
    dx = bounds[1][0] - bounds[0][0],
    dy = bounds[1][1] - bounds[0][1],
    x = (bounds[0][0] + bounds[1][0]) / 2,
    y = (bounds[0][1] + bounds[1][1]) / 2,
    scale = .9 / Math.max(dx / width, dy / height),
    translate = [width / 2 - scale * x, height / 2 - scale * y];

  mapg.transition()
    .duration(750)
    .style("stroke-width", 1.5 / scale + "px")
    .attr("transform", "translate(" + translate + ")scale(" + scale + ")");

}

function reset() {
  mapg.transition()
    .duration(750)
    .style("stroke-width", null)
    .attr("transform", "");
}


// Load functions

function init() {
  window.addEventListener('scroll', function(e) {
    var ia = d3.selectAll('.ia'),
      distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 30;

    if (distanceY > shrinkOn) {
      ia.selectAll('p')
        .classed('invisible', true);
      ia.classed('small', true);
      d3.select('#map-menu-wrapper')
        .transition()
        .style('margin-top', '30px');
    } else {
      d3.select('#map-menu-wrapper')
        .transition()
        .style('margin-top', '70px');

      ia.classed('small', false);
      ia.selectAll('p').classed('invisible', false);
    }
  });
}

window.onload = init();

// Landing screen
function openNav() {
  document.getElementById("landing-screen").style.height = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("landing-screen").style.height = "0%";
}

d3.select('#ia-main-nav').on('mouseenter', function() {
  var ia = d3.selectAll('.ia'),
    distanceY = window.pageYOffset || document.documentElement.scrollTop,
    shrinkOn = 30;

  d3.select('#map-menu-wrapper')
    .transition()
    .style('margin-top', '70px');

  ia.selectAll('p')
    .classed('invisible', false);

  ia.classed('small', false);
});
