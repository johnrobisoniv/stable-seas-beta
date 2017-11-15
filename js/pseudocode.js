

// Order of operations

// Define global variables
  // Issue Area
  var ia;

  // Map variables
  var width = $(window).width(),
      height = $(window).height(),
      margins = {top: 50, bottom: 50, left: 0, right: 0},
      w = width - margins.left - margins.right,
      h = height - margins.top - margins.bottom;

    var projection = d3.geoMercator()
      .translate([])  // THIS needs to be dynamic! Calculate from w and h ....
      .scale([]);      // ALSO needs to be dynamic!

    var path = d3.geoPath()
      .projection(projection);

    // Set up svg#map :
    var map = d3.select('#map')
      .attr('height', h);
      // ...

    // Set background rect, include callback to reset zoom
    map.append('rect')
      .attr('class', 'background')
      .attr('height', h)
      .attr('width', w)
      .on('click', reset);

    // Add svg group to map variable - everything will go inside this.
    map = map.append('g')
      .classed('map-g', true);

// Content variables

  // Load an JS object with info on each country -


  // Active card handler:
  var active = 0;

// 1 Load page

  // d3.queue card0 data sources
  d3.queue()
    .defer(d3.json, './data/data.js')
    .defer()
    .await()  // Here we need a callback upon asset load
    // on load,
    // Draw svg map,
    // Prep for card0
      // Draw card0 data layer in #g-map
      // Build table for subindex in #card0
      buildIndexTable(issueArea);   // ???

    // Highlight relevant countries
    // Show (animate?) card div

// 2 Tutorial ? (if never loaded ??)

  // Small divs pop up on 3-step walkthrough
    // 1 Issue Area menu
    // 2 Card menu
    // 3 Map & card interactivity

// 3 Event listeners

  // .card-menu divs:
    // on 'click'
    switchCard (  ) // Execute switchCard function, pass in target index ...


// 4 Functions

// Color functions
  function iaColor (issueArea) {
    // Returns IA color hex based on ID:
    switch (issueArea) {
      case 'Rule of Law':
        return '#FF0000'
        break;
      case 'Blue Economy':
        return '#blueEconHex'
        break;
      // ... etc
      }
  }

  // Build monochromatic color ramp function accepting values from 0 to 1.
  function iaColorRamp (issueArea) {
    d3.interpolateLab('white', iaColor(issueArea));
  }


// Master IA load function
  function loadIA (issueArea) {  // where data = data.js format ... so it's an object set as a variable? Or array of objects?



    // Start loading with loadData method
    issueArea.metadata.loadData(); // Also shouldn't this happen sooner?

  // First, set page-scale variables (this is where we'd use React I bet .... )

    // Set title
    d3.select('title')
      .text(function () { return issueArea.metadata.name + ' | Stable Seas Africa'})

    //

    // Loop through cards:
    var cards = issueArea.cards;
    cards.forEach( function (c, index) {
      var constructionCard = 'card' + index;
      var card = d3.select('#content-holder')
        .append('div')
        .attr('class', 'card col-lg-3 col-sm-12')
        .attr('id', constructionCard);

      // Loop through els array, build each element in order
      var els = d.els;
      els.forEach( function (d, i) {
        // Have to select current card or 'this' somehow ...
        buildEl(d, constructionCard);
      })

    })


  }

// Card element Functions

  function buildEl (obj, container) {  // Function to build element from issueArea.cards[i]. object
    switch (obj.tag) {
      case 'h1' :
        buildH(obj, container)
        break;
      case 'p' :
        buildP(obj, container)
        break;
      // ... etc
      default:
        //code block
    }
  }

    // and all the buildEl callbacks:
    function buildH (obj, container) {

      d3.select('#' + container)
        .append(obj.tag)
        .text(obj.text);

      if (obj.execute) {obj.execute};   // if object has a custom method, run it at the end ( ? or beginning )
    }

    function buildP (obj, container) {

    }

    function buildLinks (obj, container) {

    }

    function buildBlockquote (obj, container) {

    }

    function buildTable (obj, container) {

    }

    function buildList (obj, container) {
      d3.select('#' + container)
        .append(obj.tag)
        .data(obj.rows)
        // on the right track ...
    }

    function buildVideo (obj, container) {
      // hook this up with jquery plugin
    }

    function buildImg (obj, container) {

    }

    function buildCaption (obj, container) {

    }

    // the rest is going to be custom - right?

  function buildIndexTable ( issueArea ) {      // issueArea is the 'key' in issue area dataset...

    // First, set local var equal to country list with index values
    var indexData ;   // Here we need the master data format ...
    var table = d3.select('#index-table').selectAll('tr')
    .data(indexData)
    .enter();

    var score = 100;

    // A for() loop? Iterate through array of countries ...
    var trow = table.append('tr');
      // Here would be where to class with iso3 so we can have map - table hover interactivity


      trow.style('border-left', function (d, i) {return '5px solid ' + iaColorRamp(/* that country's index value ... */ / 100);});  // 29 is hard coded. Can we figure this out dynamically so it's always accurate? Yes = dataset.countries.length

      trow.append('td')
        .text( rank(eval('d.country.' + issueArea + '.country'))); // This needs to be a more complex function that sets countries with equal values the same rank
                          // ^ trying to dynamically pull proper index
      trow.append('td')
        .classed('country-name',true)
      //  .classed('')  // This is where we put in the 3-digit ISO codes
        .text(function (d) { return /* name of country */); });

      trow.append('td')
      .text( function (d) {return /* index value */});

      // Final line with trow.on('mouseenter', ... ?? )
  }

  function rank (/* parameter? */) {
    // Calculate rank of country. Or we just include this in the dataset and not calculate dynamically
  }

  function switchCard ( target ) {  // where 'target' is the int of the card we want to load
    var targetCard = '#card' + target;    // '#card1'

    // First, clear all card-specific stuff:
    // Like the card div
    d3.select('#card' + active)
      .classed('invisible', true);  // Here we need a fancy transition!

    // And the active geographic layers (fade out)
    d3.selectAll('.card-layer')
      .classed('invisible', true);

    var c = eval('cards.card' + target);
    c.extent ? zoom(c.extent) : reset();  // Zoom or reset to full extent

    // Now make target card visible
    d3.select(targetCard)
      .classed('invisible', false);       // Again, animate this transition

    // And turn on target card's data layers
    d3.selectAll('.card' + target + '-layer')
      .classed('invisible', false);         // Yep animate again

    // And highlight the relevant countries:
    d3.selectAll('.on').classed('on',false);

    if (c.highlight) {  // Array in card data of iso3 country codes to highlight
      for (var i = 0; i < c.highlight.length; i++) {  // can be way cleaner. forEach()?
        d3.select('.'+c.highlight[i]).classed('on', true);
      }
    }

    active = target;  // Set global 'active' variable to new card index
  }

  // Arrow buttons to step up or down a card.
    // Add keystroke event listener! : leftarrow (stepCardDown()), rightarrow (stepCardUp());
  function stepCardUp () {
    switchCard ( active + 1 );
  }

  function stepCardDown () {
    switchCard ( active - 1 );
  }


// Map functions

  // Buld base map
  function countries (json) {
    // Can this be templated? Does it need to be? This is standard across all pages ...
  }

  function draw (json) {
    // Parse json
    // Call draw method ??
  }
