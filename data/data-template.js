

var data =
{issueArea:
  { metadata:               // Independent data source for each page
    { name: '',
    countryData: [  // This will be the page's values...
      ['SOM', ], ['NGA', ]
      ]
    },                                            // page-level info
    geo: [  // Screw this?
      { card: ,
        path: '.json',
        load: function () {}
      }],                            // Flexibility on number of geo layers to load. Is this just geojson directly? Do we need an array? Or can we store the names of each layer in an array and load a single geojson object that contains all layers?
  cards:[
    { title: 'First card',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'First Card',
      metadata: {},                             // Not sure if we'll need this...
      map: {
        path: '',
        scale: [],
        classes: 'card-***-layer',
        translate: [],
        highlights: [],
        load: function (js) {
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
    } // End of first element of cards object

      ]    // End of els array
    }      // end of issueArea Object
  ]     // End of cards array
}};
