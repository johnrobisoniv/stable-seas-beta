// issueArea.js
// OEF Stable Seas issue area page data source format
// v0.0

// Requirements:
//



issueArea: {                                    // Independent data source for each page
  metadata: {
    name: 'Rule of Law',
    externalData: ['x.csv','y.json','z.json']  // Immediately load these with .queue() (can you have a dynamically-generated function? Duh but how?)
  },                                            // page-level info
  geo: [{}, {}, {}],                            // Flexibility on number of geo layers to load. Is this just geojson directly? Do we need an array? Or can we store the names of each layer in an array and load a single geojson object that contains all layers?
  cards: [
    { title: 'Name of card',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'Name of card on menu',
      metadata: {},                             // Not sure if we'll need this...
      map: {
          scale: [],
          translate: [],                        // Sets map scale and translate - required for cards to be effective
          highlights: ['countryCode1',
          'countryCode2', 'countryCode3'],      // When card is active these countries are highlighted (for loop - d3.select(map.highlights[i]).classed('active', true);)
      }
      els: [
        {                                   // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
        tag: 'h1',                              // img, p, blockquote, etc. Signals which function to execute
        classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
        text: 'Title of card',
        xxx: ''
        },
        {                                       // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
          tag: 'p',                                   // img, p, blockquote, etc. Signals which function to execute
          classes: 'x y z',                           // This gets placed directly into .classed(classes, true)
          text: 'Lorem ipsum',
          html: 'With <a href=#>link</a>.'            // ^ One or the other...not both. I think often html - then we can get <a> etc easily
        },
        {
          tag: 'links',
          items: [{org: 'String', title: 'String', url: 'http://x.com/x'}, {}, {}],  // How about internal references?????
        },
        {
          tag: 'h2',
          text: 'Section Heading',
        },
        {
          tag: 'blockquote',
          html: 'Some <em>html</em>',
          source: 'Chatham House',
          link: 'http://chathamhouse.org/x'       // What about internal references?
        },
        {
          tag: 'list',
          rows: [['Col1 Title','Col2 Title', 'Col3 Title'],['item1', 'item2', 4.4],[],[]],
        },
        {
          tag: 'ul',
          rows: ['First bullet', 'Second bullet', 'Third bullet'],  // HTML or text?
        },
        {
          tag: 'ol',
          rows: ['First item', 'Second item', 'Third item'],  // HTML or text?
        },
        {
          tag: 'video',
          thumb: './link/to/thumb.png',           // this will need to be independently prepped...or Youtube / Vimeo API?
          url: 'http://www.youtube.com/link/'     // Or just the id of the video? Check with modal-video.js or w/e
        },
        {
          tag: 'img',
          image: './link/to/image.png',           // this will need to be independently prepped...or Youtube / Vimeo API?
          alt: 'alt text for image'               // Or just the id of the video? Check with modal-video.js or w/e
          caption: 'Caption for image.'           // Do we put in a caption? Maybe it's HTML? -(does every image need a caption? If not, separate element below)
        },
        {
          tag: 'caption',
          html: 'Caption for image.'              // Must go beneath every image we want to be captioned
        },
        {                                   // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
          tag: 'd3-pie',                          // img, p, blockquote, etc. Signals which function to execute
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv'                  // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {},                 // If this exists, execute (for custom if nothing else) ???
        },
        {                                   // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
          tag: 'd3-line',                          // img, p, blockquote, etc. Signals which function to execute
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv'                  // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          method: function () {},                 // If this exists, execute (for custom if nothing else) ???
        },
        {                                   // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
          tag: 'd3-bar',                          // img, p, blockquote, etc. Signals which function to execute
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv'                  // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          method: function () {},                 // If this exists, execute (for custom if nothing else) ???
        },
        {
          tag: 'hr'
        }],                                    // Flexibility - each element is put in place in order

    },
    {/* another card */},
    {/* another card */}
  ]
}



// So, applied:
//
// On load of www.stableseas.org/issue-areas/rule-of-law:

// Start to parse JSON
d3.json('../data/rule-of-law.json', function (data) {
  console.log(data);
  // Here we parse data ... ?
});


// Set loading state / icon on page;
var loading = true;
// Also consider some 'intro' UX flow to consume attention while data loads...

// Start d3.queue() of issueArea.metadata.externalData and issueArea.geo arrays
// Concurrency limit? We can get the user started as soon as card1 loads, no need to load every data layer ... ?
  var q = d3.queue();
  var sources = issueArea.metadata.externalData;
  var geosources = issueArea.geo;
  for (var i = 0; sources.length < i; i++ ) {
    q.defer(sources[i]); //?
  }

  for (var i = 0; geosources.length < i; i++ ) {
    q.defer(geosources[i]); //? Deal with different datatypes etc...? Let's try to cut this...
  }

// When loaded, callback should set loading = false and display state0

d3.awaitAll(ready); // This will need quite a lot of work...

  function ready (error, data) {
    if (error) throw error;
    console.log(data);
    // This is where we remove the loading state and icon from the page!
  }

// Set 'cards' variable as array of cards for page:
var cards = issueArea.cards;

// Loop through cards array
for ( var i = 0; i < cards.length; i++ ) {

  // Append each card to the #container div
  var current = 'card' + i;
  var card = d3.select('#container')
    .append('div');

  card.classed('card', true)  // other classes for the card?
    .attr('id', current);     // Set ID = to index of card in array

  // On each card, set 'els' variable as array of elements
  var els = cards[i].els;

  // then build each card's HTML based on the els array:

  for ( var i = 0; i < els.length; i++ ) {  // is if ... else if ... better than case when? Should we use a forEach() function here?

    // For each item in the els array, test which element type it is and
    // pass the current card id and element into the appropriate function

    switch (els[i].tag) {
      case 'h1' || 'h2' || 'h3':
        h (current, els[i]);
        break;
      case 'p':
        p (current, els[i]);
        break;
      case 'links':
        links (current, els[i]);
        break;
      case 'blockquote':
        blockquote (current, els[i]);
        break;
      case 'ranklist':
        ranklist (current, els[i]);
        break;
      case list (current, els[i]);
      break;
        // etc ...
      }
  };

}


// All of our element functions:

function p (card, el) {
  d3.select('#' + current)
    .append('p')
    .classed(el.classes, true)
    .html(el.html);             // What if text?
}

function h (card, el) {
  d3.select('#' + current)
    .append(el.tag)             // This !HAS! to be an HTML tag string ...
    .classed(el.classes, true)
    .text(el.text);             // What if html? Will we have HTML in h1?
}

function links (card, el) {}
function h2 (card, el) {}
function blockquote (card, el) {}
function ranklist (card, el) {}
function list (card, el) {
  var list = d3.select('#' + current)
    .append(el.tag)     // Will create ol or ul depending on tag!
    .classed(el.classes, true);

  // Loop through list items, append to ul or ol element created
  for (var l = 0; l < el.rows; l++) {
    list.append('li')
      .text(el.rows[l]);
  }
}

function video (card, el) {}
function img (card, el) {}
function caption (card, el) {}
function hr (card, el) {}
function d3 (card, el) {}
function custom (card, el) {}
function hr (card, el) {}
