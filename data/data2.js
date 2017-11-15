

var data =
{issueArea:
  { metadata: { name: 'Rule of Law' },                              // Independent data source for each page
    geo: [{}, {}, {}],                            // Flexibility on number of geo layers to load. Is this just geojson directly? Do we need an array? Or can we store the names of each layer in an array and load a single geojson object that contains all layers?
    cards:
      [{ title: 'Name of card',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
        menu: 'Name of card on menu',
        map: {
            scale: [],
            translate: [],                        // Sets map scale and translate - required for cards to be effective
            highlights: ['countryCode1',
            'countryCode2', 'countryCode3']      // When card is active these countries are highlighted (for loop - d3.select(map.highlights[i]).classed('active', true);)
          },
        els: [
          { tag: 'h1',                                   // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                         // img, p, blockquote, etc. Signals which function to execute
            classes: 'x y z',                       // This gets placed directly into .classed(classes, true)
            text: 'Rule of Law',
            xxx: ''
          },
          { tag: 'h3',
            text: 'Challenges and Opportunities'
          },
          { tag: 'p',                                       // d3.select('.card').append(els[i].tag).classed(els[i].classes, true)
                                              // img, p, blockquote, etc. Signals which function to execute
            classes: '',                           // This gets placed directly into .classed(classes, true)
            text: 'Lorem ipsum',
            html: 'With <a href=#>link</a>.'            // ^ One or the other...not both. I think often html - then we can get <a> etc easily
          }
      ]                                    // Flexibility - each element is put in place in order
    }]
  }
};
