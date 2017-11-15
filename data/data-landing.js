

var data =
{issueArea:
  { metadata:               // Independent data source for each page
    { name: 'Overview',
      index: 0,
      code: 'landing',
      countryData: [  // This will be the page's values...
        ['SOM', ], ['NGA', ]
        ]
    },                                            // page-level info
    geo: [  // Screw this?
      { card: null,
        path: '.json',
        load: function () {}
      }],                            // Flexibility on number of geo layers to load. Is this just geojson directly? Do we need an array? Or can we store the names of each layer in an array and load a single geojson object that contains all layers?
  cards:[
    // Card 0
    { title: 'Stable Seas Index: Overview',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'Stable Seas Index: Overview',
      metadata: {
        owner: 'Curtis Bell',
        description: 'This will be the title card that introduces the website.'
      },                             // Not sure if we'll need this...
      map: {
        path: '',
        scale: [],
        classes: 'card-0-layer',
        translate: [],
        highlights: [],
        load: function (js) {
          // Color EEZ according to master Stable Seas index
          // Include tooltip with country names, values, text?? Link to country page??
            // on hover:
            // on click:
          }
        },
      els: [

        { tag: '***',
          text: 'Rule of Law',
          xxx: '',
          execute: function () {}
        },
        { tag: 'h3',
          text: '***'
        },

        { tag: 'p',
          classes: '',
          // text: '***',
          // html: '*** With <a href=#>link</a>.'
        },
        { tag: 'links',
          items: [{org: '***', title: '***', url: 'http://x.com/#'}],  // How about internal references????? ###
        },
        { tag: 'h2',
          text: '***',
        },
        { tag: 'blockquote',
          html: 'Some <em>html</em>',
          source: '***',
          link: 'http://***.org/***'       // What about internal references?
        },
        { tag: 'table',
          rows: [['Col1 Title','Col2 Title', 'Col3 Title'],['', '', ''],['a','b','c'],['d','d','f']],
        },
        { tag: 'ul',
          rows: ['First bullet', 'Second bullet', 'Third bullet']  // HTML or text?
        },
        { tag: 'ol',
          rows: ['First item', 'Second item', 'Third item']  // HTML or text?
        },
        { tag: 'video',
          thumb: './link/to/thumb.png',           // this will need to be independently prepped...or Youtube / Vimeo API?
          url: 'http://www.youtube.com/link/'     // Or just the id of the video? Check with modal-video.js or w/e
        },
        { tag: 'img',
          image: 'http://placekitten/300/300',           // this will need to be independently prepped...or Youtube / Vimeo API?
          alt: 'alt text for image',              // Or just the id of the video? Check with modal-video.js or w/e
          caption: 'Caption for image.'           // Do we put in a caption? Maybe it's HTML? -(does every image need a caption? If not, separate element below)
        },
        { tag: 'caption',
          html: 'Caption for image.'              // Must go beneath every image we want to be captioned
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'pie',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {}                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'line',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {},                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'bar',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {}                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'hr'
          }
      ]                                    // Flexibility - each element is put in place in order
    },     // end of first cards Object

    // Card 1
    { title: 'Our Mission',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'Our Mission',
      metadata: {
        owner: 'Curtis Bell',
        description: 'Introduce the mission in greater detail, talking specifically about how maritime security must be approached as a multi-faceted problem and how it relates to peace.'
      },                             // Not sure if we'll need this...
      map: {
        path: '',
        scale: [],
        classes: 'card-1-layer',
        translate: [],
        highlights: [],
        load: function (js) {
          // Point map with callout boxes showing conflict zones that are strongly affected by maritime crime
          // Tooltips? Or annotations?
          }
        },
      els: [

        { tag: '***',
          text: 'Rule of Law',
          xxx: '',
          execute: function () {}
        },
        { tag: 'h3',
          text: '***'
        },

        { tag: 'p',
          classes: '',
          // text: '***',
          // html: '*** With <a href=#>link</a>.'
        },
        { tag: 'links',
          items: [{org: '***', title: '***', url: 'http://x.com/#'}],  // How about internal references????? ###
        },
        { tag: 'h2',
          text: '***',
        },
        { tag: 'blockquote',
          html: 'Some <em>html</em>',
          source: '***',
          link: 'http://***.org/***'       // What about internal references?
        },
        { tag: 'table',
          rows: [['Col1 Title','Col2 Title', 'Col3 Title'],['', '', ''],['a','b','c'],['d','d','f']],
        },
        { tag: 'ul',
          rows: ['First bullet', 'Second bullet', 'Third bullet']  // HTML or text?
        },
        { tag: 'ol',
          rows: ['First item', 'Second item', 'Third item']  // HTML or text?
        },
        { tag: 'video',
          thumb: './link/to/thumb.png',           // this will need to be independently prepped...or Youtube / Vimeo API?
          url: 'http://www.youtube.com/link/'     // Or just the id of the video? Check with modal-video.js or w/e
        },
        { tag: 'img',
          image: 'http://placekitten/300/300',           // this will need to be independently prepped...or Youtube / Vimeo API?
          alt: 'alt text for image',              // Or just the id of the video? Check with modal-video.js or w/e
          caption: 'Caption for image.'           // Do we put in a caption? Maybe it's HTML? -(does every image need a caption? If not, separate element below)
        },
        { tag: 'caption',
          html: 'Caption for image.'              // Must go beneath every image we want to be captioned
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'pie',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {}                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'line',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {},                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'bar',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {}                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'hr'
          }
      ]                                    // Flexibility - each element is put in place in order
    }, // End of second cards object

    // Card 2
    { title: 'Overview: The Indian Ocean',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'The Indian Ocean',
      metadata: {
        owner: 'Ben Lawellin',
        description: 'This card introduces Jeddah and major issues in these states. http://www.imo.org/en/OurWork/Security/PIU/Pages/DCoC.aspx.'
      },                             // Not sure if we'll need this...
      map: {
        path: '',
        scale: [],
        classes: 'card-2-layer',  // This? I don't think so...
        translate: [],
        highlights: [],
        load: function (js) {
          // loop through countryData array, class Jeddah signatories as 'active' or whatever
          }
        },
      els: [

        { tag: '***',
          text: 'Rule of Law',
          xxx: '',
          execute: function () {}
        },
        { tag: 'h3',
          text: '***'
        },

        { tag: 'p',
          classes: '',
          // text: '***',
          // html: '*** With <a href=#>link</a>.'
        },
        { tag: 'links',
          items: [{org: '***', title: '***', url: 'http://x.com/#'}],  // How about internal references????? ###
        },
        { tag: 'h2',
          text: '***',
        },
        { tag: 'blockquote',
          html: 'Some <em>html</em>',
          source: '***',
          link: 'http://***.org/***'       // What about internal references?
        },
        { tag: 'table',
          rows: [['Col1 Title','Col2 Title', 'Col3 Title'],['', '', ''],['a','b','c'],['d','d','f']],
        },
        { tag: 'ul',
          rows: ['First bullet', 'Second bullet', 'Third bullet']  // HTML or text?
        },
        { tag: 'ol',
          rows: ['First item', 'Second item', 'Third item']  // HTML or text?
        },
        { tag: 'video',
          thumb: './link/to/thumb.png',           // this will need to be independently prepped...or Youtube / Vimeo API?
          url: 'http://www.youtube.com/link/'     // Or just the id of the video? Check with modal-video.js or w/e
        },
        { tag: 'img',
          image: 'http://placekitten/300/300',           // this will need to be independently prepped...or Youtube / Vimeo API?
          alt: 'alt text for image',              // Or just the id of the video? Check with modal-video.js or w/e
          caption: 'Caption for image.'           // Do we put in a caption? Maybe it's HTML? -(does every image need a caption? If not, separate element below)
        },
        { tag: 'caption',
          html: 'Caption for image.'              // Must go beneath every image we want to be captioned
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'pie',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {}                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'line',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {},                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'bar',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {}                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'hr'
          }
      ]                                    // Flexibility - each element is put in place in order
    },
    // Card 3
    { title: 'Overview: The Atlantic Ocean',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'The Atlantic Ocean',
      metadata: {
        owner: 'Greg Clough',
        description: 'This card introduces Yaounde and major issues in these states.'
      },                             // Not sure if we'll need this...
      map: {
        path: '',
        scale: [],
        classes: 'card-3-layer',  // This? I don't think so...
        translate: [],
        highlights: [],
        load: function (js) {
          // loop through countryData array, class Yaounde signatories as 'active' or whatever
          }
        },
      els: [

        { tag: '***',
          text: 'Rule of Law',
          xxx: '',
          execute: function () {}
        },
        { tag: 'h3',
          text: '***'
        },

        { tag: 'p',
          classes: '',
          // text: '***',
          // html: '*** With <a href=#>link</a>.'
        },
        { tag: 'links',
          items: [{org: '***', title: '***', url: 'http://x.com/#'}],  // How about internal references????? ###
        },
        { tag: 'h2',
          text: '***',
        },
        { tag: 'blockquote',
          html: 'Some <em>html</em>',
          source: '***',
          link: 'http://***.org/***'       // What about internal references?
        },
        { tag: 'table',
          rows: [['Col1 Title','Col2 Title', 'Col3 Title'],['', '', ''],['a','b','c'],['d','d','f']],
        },
        { tag: 'ul',
          rows: ['First bullet', 'Second bullet', 'Third bullet']  // HTML or text?
        },
        { tag: 'ol',
          rows: ['First item', 'Second item', 'Third item']  // HTML or text?
        },
        { tag: 'video',
          thumb: './link/to/thumb.png',           // this will need to be independently prepped...or Youtube / Vimeo API?
          url: 'http://www.youtube.com/link/'     // Or just the id of the video? Check with modal-video.js or w/e
        },
        { tag: 'img',
          image: 'http://placekitten/300/300',           // this will need to be independently prepped...or Youtube / Vimeo API?
          alt: 'alt text for image',              // Or just the id of the video? Check with modal-video.js or w/e
          caption: 'Caption for image.'           // Do we put in a caption? Maybe it's HTML? -(does every image need a caption? If not, separate element below)
        },
        { tag: 'caption',
          html: 'Caption for image.'              // Must go beneath every image we want to be captioned
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'pie',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {}                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'line',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {},                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'bar',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {}                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'hr'
          }
      ]                                    // Flexibility - each element is put in place in order
    },
    // Card 4
    { title: 'Continental Cooperation',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'Continental Cooperation',
      metadata: {
        owner: 'Ben Lawellin',
        description: 'This card introduces African Union efforts.'
      },                             // Not sure if we'll need this...
      map: {
        path: '',
        scale: [],
        classes: 'card-4-layer',  // This? I don't think so...
        translate: [],
        highlights: [],
        load: function (js) {
          // loop through countryData array, class Lome (??) signatories as 'active' or whatever
          }
        },
      els: [

        { tag: '***',
          text: 'Rule of Law',
          xxx: '',
          execute: function () {}
        },
        { tag: 'h3',
          text: '***'
        },

        { tag: 'p',
          classes: '',
          // text: '***',
          // html: '*** With <a href=#>link</a>.'
        },
        { tag: 'links',
          items: [{org: '***', title: '***', url: 'http://x.com/#'}],  // How about internal references????? ###
        },
        { tag: 'h2',
          text: '***',
        },
        { tag: 'blockquote',
          html: 'Some <em>html</em>',
          source: '***',
          link: 'http://***.org/***'       // What about internal references?
        },
        { tag: 'table',
          rows: [['Col1 Title','Col2 Title', 'Col3 Title'],['', '', ''],['a','b','c'],['d','d','f']],
        },
        { tag: 'ul',
          rows: ['First bullet', 'Second bullet', 'Third bullet']  // HTML or text?
        },
        { tag: 'ol',
          rows: ['First item', 'Second item', 'Third item']  // HTML or text?
        },
        { tag: 'video',
          thumb: './link/to/thumb.png',           // this will need to be independently prepped...or Youtube / Vimeo API?
          url: 'http://www.youtube.com/link/'     // Or just the id of the video? Check with modal-video.js or w/e
        },
        { tag: 'img',
          image: 'http://placekitten/300/300',           // this will need to be independently prepped...or Youtube / Vimeo API?
          alt: 'alt text for image',              // Or just the id of the video? Check with modal-video.js or w/e
          caption: 'Caption for image.'           // Do we put in a caption? Maybe it's HTML? -(does every image need a caption? If not, separate element below)
        },
        { tag: 'caption',
          html: 'Caption for image.'              // Must go beneath every image we want to be captioned
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'pie',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {}                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'line',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {},                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'bar',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {}                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'hr'
          }
      ]                                    // Flexibility - each element is put in place in order
    },
    // Card 5
    { title: 'Our Team',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'Our Team',
      metadata: {
        owner: 'Curtis Bell',
        description: 'Briefly introduce the three organizations.'
      },                             // Not sure if we'll need this...
      map: {
        path: '',
        scale: [],
        classes: 'card-5-layer',  // This? I don't think so...
        translate: [],
        highlights: [],
        load: function (js) {
          // ### ???
          }
        },
      els: [

        { tag: '***',
          text: 'Rule of Law',
          xxx: '',
          execute: function () {}
        },
        { tag: 'h3',
          text: '***'
        },

        { tag: 'p',
          classes: '',
          // text: '***',
          // html: '*** With <a href=#>link</a>.'
        },
        { tag: 'links',
          items: [{org: '***', title: '***', url: 'http://x.com/#'}],  // How about internal references????? ###
        },
        { tag: 'h2',
          text: '***',
        },
        { tag: 'blockquote',
          html: 'Some <em>html</em>',
          source: '***',
          link: 'http://***.org/***'       // What about internal references?
        },
        { tag: 'table',
          rows: [['Col1 Title','Col2 Title', 'Col3 Title'],['', '', ''],['a','b','c'],['d','d','f']],
        },
        { tag: 'ul',
          rows: ['First bullet', 'Second bullet', 'Third bullet']  // HTML or text?
        },
        { tag: 'ol',
          rows: ['First item', 'Second item', 'Third item']  // HTML or text?
        },
        { tag: 'video',
          thumb: './link/to/thumb.png',           // this will need to be independently prepped...or Youtube / Vimeo API?
          url: 'http://www.youtube.com/link/'     // Or just the id of the video? Check with modal-video.js or w/e
        },
        { tag: 'img',
          image: 'http://placekitten/300/300',           // this will need to be independently prepped...or Youtube / Vimeo API?
          alt: 'alt text for image',              // Or just the id of the video? Check with modal-video.js or w/e
          caption: 'Caption for image.'           // Do we put in a caption? Maybe it's HTML? -(does every image need a caption? If not, separate element below)
        },
        { tag: 'caption',
          html: 'Caption for image.'              // Must go beneath every image we want to be captioned
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'pie',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {}                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'line',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {},                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'd3',                                  // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                    // img, p, blockquote, etc. Signals which function to execute
          type: 'bar',
          classes: '',                       // This gets placed directly into .classed(classes, true)
          text: '',
          html: '',                               // One or the other...not both
          csv: 'path-to-csv.csv',                 // Is this smart? Will we need this?
          data: [],                               // Some data to parse into a d3 chart or something? Maybe have this be data : {nums: [], method: function () {}}
          url: '',                                // If appropriate. All of what goes into this object depends on the element in question.
          execute: function () {}                 // If this exists, execute (for custom if nothing else) ???
        },
        { tag: 'hr'
          }
      ]                                    // Flexibility - each element is put in place in order
    }

  ]    // End of cards array
    }
};
