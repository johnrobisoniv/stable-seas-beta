

var data =
{issueArea:
  { metadata:               // Independent data source for each page
    { name: 'Rule of Law',
    loadData: function () { /* custom method to load data ... ? */},  // Immediately load these with .queue() (can you have a dynamically-generated function? Duh but how?)
        //  ^forget this. We just need to write a custom method for each issue area that loads the right data.
        // But can we set up an array of all the page's data layers to queue on page load ? Then when they're all loaded we drop into the app ready to go ?
    countryData: [
      ['SOM', 44], ['NGA', 55]
      ]
    },                                            // page-level info
    geo: [  // Screw this?
      { card: 1,
        path: './data/eez_low_res.json',
        load: function () {}
      }],                            // Flexibility on number of geo layers to load. Is this just geojson directly? Do we need an array? Or can we store the names of each layer in an array and load a single geojson object that contains all layers?
  cards:[
    { title: 'First card',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'First Card',
      metadata: {},                             // Not sure if we'll need this...
      map: {
        path: './data/grid.json',
        scale: [],
        classes: 'card-1-layer card-4-layer', // ### is this the best way? No - what if we re-arrange cards array??
        translate: [],                        // Sets map scale and translate - required for cards to be effective
        highlights: ['SOM',
        'KEN', 'TZA'],      // When card is active these countries are highlighted (for loop - d3.select(map.highlights[i]).classed('active', true);)
        load: function (js) {
          var classes = this.classes;
          d3.json(js, function (error, cells) {
          //  if (error) throw error;
            var c = cells.features;
            //console.log(c);
            var gridg = mapg.append('g')
              .attr('class', classes)
              .classed('card-layer', true)
              .classed('invisible', true)
              .classed('grid', true);
              //.attr('style','display: none;');

            gridg.selectAll('rect')
                .data(c).enter()
              .append('rect')
                .attr('x', function (d) { return projection(d.geometry.coordinates)[0]; })
                .attr('y', function (d) { return projection(d.geometry.coordinates)[1]; })
                .attr('width', '6')
                .attr('height', '6')

                //.attr('class','cell')
                .style('fill', function (d) {
                  return rampColor(1-(d.properties.catch_all_ / 174000))
                });
          })
        }

          },
      els: [

        { tag: 'h1',                                   // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                       // img, p, blockquote, etc. Signals which function to execute
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
          text: 'Rule of Law',
          xxx: '',
          execute: function () {}
        },
        { tag: 'h3',
          text: 'Challenges and Opportunities'
        },

        { tag: 'p',                                       // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                            // img, p, blockquote, etc. Signals which function to execute
          classes: '',                           // This gets placed directly into .classed(classes, true)
          text: 'Lorem ipsum',
          //html: 'With <a href=#>link</a>.'            // ^ One or the other...not both. I think often html - then we can get <a> etc easily
        },
        { tag: 'links',
          items: [{org: 'String', title: 'String', url: 'http://x.com/x'}, {org: 'String', title: 'String', url: 'http://x.com/x'}, {org: 'String', title: 'String', url: 'http://x.com/x'}],  // How about internal references?????
        },
        { tag: 'h2',
          text: 'Section Heading',
        },
        { tag: 'blockquote',
          html: 'Some <em>html</em>',
          source: 'Chatham House',
          link: 'http://chathamhouse.org/x'       // What about internal references?
        },
        { tag: 'table',
          rows: [['Col1 Title','Col2 Title', 'Col3 Title'],['item1', 'item2', 4.4],['a','b','c'],['d','d','f']],
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
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
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
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
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
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
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
    { title: 'Name off card',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'Name off card on menu',
      metadata: {},                             // Not sure if we'll need this...
      map: {
        path: './data/grid.json',
        scale: [],
        classes: 'card-1-layer card-4-layer',
        translate: [],                        // Sets map scale and translate - required for cards to be effective
        highlights: ['SOM',
        'KEN', 'TZA'],      // When card is active these countries are highlighted (for loop - d3.select(map.highlights[i]).classed('active', true);)
        load: function (js) {
          var classes = this.classes;
          d3.json(js, function (error, cells) {
          //  if (error) throw error;
            var c = cells.features;
            //console.log(c);
            var gridg = mapg.append('g')
              .attr('class', classes)
              .classed('card-layer', true)
              .classed('invisible', true)
              .classed('grid', true);
              //.attr('style','display: none;');

            gridg.selectAll('rect')
                .data(c).enter()
              .append('rect')
                .attr('x', function (d) { return projection(d.geometry.coordinates)[0]; })
                .attr('y', function (d) { return projection(d.geometry.coordinates)[1]; })
                .attr('width', '6')
                .attr('height', '6')

                //.attr('class','cell')
                .style('fill', function (d) {
                  return rampColor(1-(d.properties.catch_all_ / 174000))
                });
          })
        }

          },
      els: [

        { tag: 'h1',                                   // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                       // img, p, blockquote, etc. Signals which function to execute
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
          text: 'Rule of Law',
          xxx: '',
          execute: function () {}
        },
        { tag: 'h3',
          text: 'Challenges and Opportunities'
        },

        { tag: 'p',                                       // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                            // img, p, blockquote, etc. Signals which function to execute
          classes: '',                           // This gets placed directly into .classed(classes, true)
          text: 'Lorem ipsum',
          //html: 'With <a href=#>link</a>.'            // ^ One or the other...not both. I think often html - then we can get <a> etc easily
        },
        { tag: 'links',
          items: [{org: 'String', title: 'String', url: 'http://x.com/x'}, {org: 'String', title: 'String', url: 'http://x.com/x'}, {org: 'String', title: 'String', url: 'http://x.com/x'}],  // How about internal references?????
        },
        { tag: 'h2',
          text: 'Section Heading',
        },
        { tag: 'blockquote',
          html: 'Some <em>html</em>',
          source: 'Chatham House',
          link: 'http://chathamhouse.org/x'       // What about internal references?
        },
        { tag: 'table',
          rows: [['Col1 Title','Col2 Title', 'Col3 Title'],['item1', 'item2', 4.4],['a','b','c'],['d','d','f']],
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
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
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
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
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
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
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
    { title: 'Name of card',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'Name of card on menu',
      metadata: {},                             // Not sure if we'll need this...
      map: {
          path: './data/incidents.csv',
          classes: 'card-0-layer card-4-layer',
          scale: [],
          extent: [[15,22],[109,-35]],
          translate: [],                        // Sets map scale and translate - required for cards to be effective
          highlights: ['countryCode1',
          'countryCode2', 'countryCode3'],      // When card is active these countries are highlighted (for loop - d3.select(map.highlights[i]).classed('active', true);)
          load: function gIncidents (csv) {
            var classes = this.classes;

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

            var g = mapg.append('g')
              .attr('class', classes)
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
                .style('fill', iaColor(1));
            });
          }
        },
      els: [
        { tag: 'h1',                                   // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                       // img, p, blockquote, etc. Signals which function to execute
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
          text: 'Rule off Law',
          xxx: '',
          execute: function () {}
        },
        { tag: 'h3',
          text: 'Challenges and Opportunities'
        },
        { tag: 'p',                                       // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                            // img, p, blockquote, etc. Signals which function to execute
          classes: '',                           // This gets placed directly into .classed(classes, true)
          text: 'Lorem ipsum',
          //html: 'With <a href=#>link</a>.'            // ^ One or the other...not both. I think often html - then we can get <a> etc easily
        },
        { tag: 'links',
          items: [{org: 'String', title: 'String', url: 'http://x.com/x'}, {org: 'String', title: 'String', url: 'http://x.com/x'}, {org: 'String', title: 'String', url: 'http://x.com/x'}],  // How about internal references?????
        },
        { tag: 'h2',
          text: 'Section Heading',
        },
        { tag: 'blockquote',
          html: 'Some <em>html</em>',
          source: 'Chatham House',
          link: 'http://chathamhouse.org/x'       // What about internal references?
        },
        { tag: 'table',
          rows: [['Col1 Title','Col2 Title', 'Col3 Title'],['item1', 'item2', 4.4],['a','b','c'],['d','d','f']],
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
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
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
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
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
          classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
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
    } // end of
  ] // End of cards array
}};
