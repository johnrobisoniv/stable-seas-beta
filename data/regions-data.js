var regionsData = {
  overview: {
    metadata: {
      name: 'Regions Overview',
      updates: true,
      version: 0.0,
      index: 0,
      code: 'overview',
      path: 'overview',
      countryData: "",
      regionalCountries:[],
      csv: '../../data/regions/overview/overview.csv',
      color: '',
      //  order: -1,
      description: ''
    },
    load: function(csv, callback) {
      callback('Overview load csv function callback');

    },
    cards: [
      { // Card 0
        title: 'Overview: The African Maritime Space',
        menu: 'Regions Overview',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [],
            []
          ],
        //  highlights: ['CPV', 'SEN', 'GNB', 'GMB', 'GIN', 'SLE', 'LBR'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            // highlight each region with its color
            var i = 0;
            for (key in regionsData) {
              var md = regionsData[key].metadata;
              md.regionalCountries.forEach(function (iso) {
                d3.selectAll('.country.' + iso)
                  .style('fill', function () {
                    return d3.interpolateLab('white', regionsColor[md.index])(0.6);
                  })
                  .classed(key, true);

                d3.selectAll('.eez.'  + iso)
                  .style('stroke', regionsColor[md.index])
                  .classed(key, true);


              });
              i++;

            }

          }
        },
        els: [{
            tag: 'h1',
            text: 'The African Continent'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the continent\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }
        ]
      },
      { // Card 1
      title: 'Region 1',
      menu: 'Region 1',
      metadata: {
        owner: '',
        description: ''
      },
      map: {
        scale: [],
        translate: [],
        extent: [
          [],
          []
        ],
        highlights: [],
        iso3: '',
        load: function(index, csv) {
          var layer = 'card-' + index + '-layer';
          d3.select('.card-eez-layer')
            .classed(layer, true);
        },
        switch: function(index) {
          var hl = ['CPV', 'SEN', 'GNB', 'GMB', 'GIN', 'SLE', 'LBR'];
          hl.forEach(function (iso) {
            //d3.selectAl
          });
        }
      },
      els: [{
          tag: 'h1',
          text: ''
        },
        {
          tag: 'caption',
          text: '<em>A subheading line on the country\'s greatest strength</em>'
        },
        {
          tag: 'p',
          html: 'The first paragraph will introduce the country in the context of the region.'
        },
        {
          tag: 'radar'
        },
        {
          tag: 'video',
          videoId: 'AXQHK213mFA',
          thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
        },
        {
          tag: 'caption',
          text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
        },
        {
          tag: 'h2',
          html: 'Country 1\'s Strengths'
        },
        {
          tag: 'p',
          html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
        },
        {
          tag: 'h2',
          html: 'Challenges Facing Country 1'
        },
        {
          tag: 'p',
          html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
        }
      ]
    }]
  },
  westernCoast: {
    metadata: {
      name: 'Western Coast',
      updates: true,
      version: 0.0,
      index: 1,
      code: 'westernCoast',
      path: 'western-coast',
      countryData: "",
      regionalCountries: ['CPV', 'SEN', 'GNB', 'GMB', 'GIN', 'SLE', 'LBR'],
      csv: '../../data/regions/western-coast/western-coast.csv',
      color: '',
      csv: '',
      radarData: [{}],
      //  order: -1,
      description: ''
    },
    load: function(csv, callback) {
      callback('Western Coast load csv function callback');
    },
    cards: [
      { // Card 0
        title: 'Africa\'s Western Coast',
        menu: 'The Western Coast',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [-33, -20],
            [14.5, 35]
          ],
          highlights: [],
          iso3: '',
          load:  function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);

          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'The Western Coast'
          },
          {
            tag: 'caption',
            text: '<em>A gateway to Europe</em>'
          },
          {
            tag: 'p',
            html: 'Cabo Verde\'s exclusive economic zone covers roughly 800,561 square kilometers of the northeast Atlantic Ocean \
              . This gives Cabo Verde the xth largest EEZ in sub-Saharan Africa. \
              Meanwhile, Cabo Verde\'s Maritime Enforcement Capacity Score indicates Cabo Verde is slightly above \
              the regional average.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'p',
            html: 'Across the nine issues covered by the Stable Seas Maritime Security Index, COUNTRY ranks highest in BEST ISSUE. \
              COUNTRY’s score of NUMBER in this area is high relative to its other issue scores, due in part to SOMETHING RELEVANT \
              AND INTERESTING. COUNTRY can further improve upon this area of relative strength by SUGGESTION BACKED BY THE SUBSCORES.'
          },
          {
            tag: 'bigtext',
            html: 'COUNTRY is also above the regional average in LIST OF ALL ISSUES WHERE COUNTRY RANKS ABOVE 16.'
          },
          {
            tag: 'p',
            html: 'The greatest remaining challenge for COUNTRY is WORST ISSUE RANKING. COUNTRY scores SCORE in this area, and this is slightly/significantly above/below the regional average of regional average for this score. To further improve upon this score, COUNTRY can SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON DOMESTIC POLICY. Further progress can be made by SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON INTERNATIONAL/REGIONAL EFFORT. Through these efforts, COUNTRY can raise its weakest score and work toward comprehensive and lasting maritime security.'
          },
          {
            tag: 'img',
            src: '../../assets/western-coast/radar-sample.png'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }
          // ...
        ]
      },
      { // Card 1
        title: 'Cabo Verde',
        menu: 'Cabo Verde',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [-33, -20],
            [14.5, 35]
          ],
          highlights: ['CPV'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Cabo Verde'
          },
          {
            tag: 'caption',
            text: '<em>An island nation with strong Rule of Law</em>'
          },
          {
            tag: 'p',
            html: 'Cabo Verde\'s exclusive economic zone covers roughly 800,561 square kilometers of the northeast Atlantic Ocean \
                . This gives Cabo Verde the xth largest EEZ in sub-Saharan Africa. \
                Meanwhile, Cabo Verde\'s Maritime Enforcement Capacity Score indicates Cabo Verde is slightly above \
                the regional average.'
          },
          {
            tag: 'p',
            html: 'Across the nine issues covered by the Stable Seas Maritime Security Index, COUNTRY ranks highest in BEST ISSUE. \
                COUNTRY’s score of NUMBER in this area is high relative to its other issue scores, due in part to SOMETHING RELEVANT \
                AND INTERESTING. COUNTRY can further improve upon this area of relative strength by SUGGESTION BACKED BY THE SUBSCORES.'
          },
          {
            tag: 'h2',
            html: 'Cabo Verde Index Sub-scores'
          },
          {
            tag: 'img',
            src: '../../assets/western-coast/radar-sample.png'
          },
          {
            tag: 'bigtext',
            html: 'COUNTRY is also above the regional average in LIST OF ALL ISSUES WHERE COUNTRY RANKS ABOVE 16.'
          },
          {
            tag: 'p',
            html: 'The greatest remaining challenge for COUNTRY is WORST ISSUE RANKING. COUNTRY scores SCORE in this area, and this is slightly/significantly above/below the regional average of regional average for this score. To further improve upon this score, COUNTRY can SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON DOMESTIC POLICY. Further progress can be made by SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON INTERNATIONAL/REGIONAL EFFORT. Through these efforts, COUNTRY can raise its weakest score and work toward comprehensive and lasting maritime security.'
          },
          {
            tag: 'p',
            html: 'Do we want to have links to methods cards here ?'
          }
        ]
      },
      { // Card 2
        title: 'Senegal',
        menu: 'Senegal',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [-33, -20],
            [14.5, 35]
          ],
          highlights: ['SEN'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Senegal'
          },
          {
            tag: 'caption',
            text: '<em>Senegal</em>'
          },
          {
            tag: 'p',
            html: 'Cabo Verde\'s exclusive economic zone covers roughly 800,561 square kilometers of the northeast Atlantic Ocean \
                . This gives Cabo Verde the xth largest EEZ in sub-Saharan Africa. \
                Meanwhile, Cabo Verde\'s Maritime Enforcement Capacity Score indicates Cabo Verde is slightly above \
                the regional average.'
          },
          {
            tag: 'p',
            html: 'Across the nine issues covered by the Stable Seas Maritime Security Index, COUNTRY ranks highest in BEST ISSUE. \
                COUNTRY’s score of NUMBER in this area is high relative to its other issue scores, due in part to SOMETHING RELEVANT \
                AND INTERESTING. COUNTRY can further improve upon this area of relative strength by SUGGESTION BACKED BY THE SUBSCORES.'
          },
          {
            tag: 'bigtext',
            html: 'COUNTRY is also above the regional average in LIST OF ALL ISSUES WHERE COUNTRY RANKS ABOVE 16.'
          },
          {
            tag: 'p',
            html: 'The greatest remaining challenge for COUNTRY is WORST ISSUE RANKING. COUNTRY scores SCORE in this area, and this is slightly/significantly above/below the regional average of regional average for this score. To further improve upon this score, COUNTRY can SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON DOMESTIC POLICY. Further progress can be made by SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON INTERNATIONAL/REGIONAL EFFORT. Through these efforts, COUNTRY can raise its weakest score and work toward comprehensive and lasting maritime security.'
          },
          {
            tag: 'img',
            src: '../../assets/western-coast/radar-sample.png'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      },
      { // Card 3
        title: 'The Gambia',
        menu: 'The Gambia',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [-33, -20],
            [14.5, 35]
          ],
          highlights: ['GMB'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'The Gambia'
          },
          {
            tag: 'caption',
            text: '<em>Gambia</em>'
          },
          {
            tag: 'p',
            html: 'Cabo Verde\'s exclusive economic zone covers roughly 800,561 square kilometers of the northeast Atlantic Ocean \
                . This gives Cabo Verde the xth largest EEZ in sub-Saharan Africa. \
                Meanwhile, Cabo Verde\'s Maritime Enforcement Capacity Score indicates Cabo Verde is slightly above \
                the regional average.'
          },
          {
            tag: 'p',
            html: 'Across the nine issues covered by the Stable Seas Maritime Security Index, COUNTRY ranks highest in BEST ISSUE. \
                COUNTRY’s score of NUMBER in this area is high relative to its other issue scores, due in part to SOMETHING RELEVANT \
                AND INTERESTING. COUNTRY can further improve upon this area of relative strength by SUGGESTION BACKED BY THE SUBSCORES.'
          },
          {
            tag: 'bigtext',
            html: 'COUNTRY is also above the regional average in LIST OF ALL ISSUES WHERE COUNTRY RANKS ABOVE 16.'
          },
          {
            tag: 'p',
            html: 'The greatest remaining challenge for COUNTRY is WORST ISSUE RANKING. COUNTRY scores SCORE in this area, and this is slightly/significantly above/below the regional average of regional average for this score. To further improve upon this score, COUNTRY can SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON DOMESTIC POLICY. Further progress can be made by SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON INTERNATIONAL/REGIONAL EFFORT. Through these efforts, COUNTRY can raise its weakest score and work toward comprehensive and lasting maritime security.'
          },
          {
            tag: 'img',
            src: '../../assets/western-coast/radar-sample.png'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      },
      { // Card 4
        title: 'Guinea-Bissau',
        menu: 'Guinea-Bissau',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [-33, -20],
            [14.5, 35]
          ],
          highlights: ['GNB'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Guinea-Bissau'
          },
          {
            tag: 'caption',
            text: '<em>Guinea-Bissau</em>'
          },
          {
            tag: 'p',
            html: 'Cabo Verde\'s exclusive economic zone covers roughly 800,561 square kilometers of the northeast Atlantic Ocean \
                . This gives Cabo Verde the xth largest EEZ in sub-Saharan Africa. \
                Meanwhile, Cabo Verde\'s Maritime Enforcement Capacity Score indicates Cabo Verde is slightly above \
                the regional average.'
          },
          {
            tag: 'p',
            html: 'Across the nine issues covered by the Stable Seas Maritime Security Index, COUNTRY ranks highest in BEST ISSUE. \
                COUNTRY’s score of NUMBER in this area is high relative to its other issue scores, due in part to SOMETHING RELEVANT \
                AND INTERESTING. COUNTRY can further improve upon this area of relative strength by SUGGESTION BACKED BY THE SUBSCORES.'
          },
          {
            tag: 'bigtext',
            html: 'COUNTRY is also above the regional average in LIST OF ALL ISSUES WHERE COUNTRY RANKS ABOVE 16.'
          },
          {
            tag: 'p',
            html: 'The greatest remaining challenge for COUNTRY is WORST ISSUE RANKING. COUNTRY scores SCORE in this area, and this is slightly/significantly above/below the regional average of regional average for this score. To further improve upon this score, COUNTRY can SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON DOMESTIC POLICY. Further progress can be made by SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON INTERNATIONAL/REGIONAL EFFORT. Through these efforts, COUNTRY can raise its weakest score and work toward comprehensive and lasting maritime security.'
          },
          {
            tag: 'img',
            src: '../../assets/western-coast/radar-sample.png'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      },
      { // Card 5
        title: 'Guinea',
        menu: 'Guinea',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [-33, -20],
            [14.5, 35]
          ],
          highlights: ['GIN'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Guinea'
          },
          {
            tag: 'caption',
            text: '<em>Guinea</em>'
          },
          {
            tag: 'p',
            html: 'Cabo Verde\'s exclusive economic zone covers roughly 800,561 square kilometers of the northeast Atlantic Ocean \
                . This gives Cabo Verde the xth largest EEZ in sub-Saharan Africa. \
                Meanwhile, Cabo Verde\'s Maritime Enforcement Capacity Score indicates Cabo Verde is slightly above \
                the regional average.'
          },
          {
            tag: 'p',
            html: 'Across the nine issues covered by the Stable Seas Maritime Security Index, COUNTRY ranks highest in BEST ISSUE. \
                COUNTRY’s score of NUMBER in this area is high relative to its other issue scores, due in part to SOMETHING RELEVANT \
                AND INTERESTING. COUNTRY can further improve upon this area of relative strength by SUGGESTION BACKED BY THE SUBSCORES.'
          },
          {
            tag: 'bigtext',
            html: 'COUNTRY is also above the regional average in LIST OF ALL ISSUES WHERE COUNTRY RANKS ABOVE 16.'
          },
          {
            tag: 'p',
            html: 'The greatest remaining challenge for COUNTRY is WORST ISSUE RANKING. COUNTRY scores SCORE in this area, and this is slightly/significantly above/below the regional average of regional average for this score. To further improve upon this score, COUNTRY can SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON DOMESTIC POLICY. Further progress can be made by SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON INTERNATIONAL/REGIONAL EFFORT. Through these efforts, COUNTRY can raise its weakest score and work toward comprehensive and lasting maritime security.'
          },
          {
            tag: 'img',
            src: '../../assets/western-coast/radar-sample.png'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      },
      { // Card 6
        title: 'Sierra Leone',
        menu: 'Sierra Leone',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [-33, -20],
            [14.5, 35]
          ],
          highlights: ['SLE'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Sierra Leone'
          },
          {
            tag: 'caption',
            text: '<em>An island nation with strong Rule of Law</em>'
          },
          {
            tag: 'p',
            html: 'Cabo Verde\'s exclusive economic zone covers roughly 800,561 square kilometers of the northeast Atlantic Ocean \
                . This gives Cabo Verde the xth largest EEZ in sub-Saharan Africa. \
                Meanwhile, Cabo Verde\'s Maritime Enforcement Capacity Score indicates Cabo Verde is slightly above \
                the regional average.'
          },
          {
            tag: 'p',
            html: 'Across the nine issues covered by the Stable Seas Maritime Security Index, COUNTRY ranks highest in BEST ISSUE. \
                COUNTRY’s score of NUMBER in this area is high relative to its other issue scores, due in part to SOMETHING RELEVANT \
                AND INTERESTING. COUNTRY can further improve upon this area of relative strength by SUGGESTION BACKED BY THE SUBSCORES.'
          },
          {
            tag: 'bigtext',
            html: 'COUNTRY is also above the regional average in LIST OF ALL ISSUES WHERE COUNTRY RANKS ABOVE 16.'
          },
          {
            tag: 'p',
            html: 'The greatest remaining challenge for COUNTRY is WORST ISSUE RANKING. COUNTRY scores SCORE in this area, and this is slightly/significantly above/below the regional average of regional average for this score. To further improve upon this score, COUNTRY can SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON DOMESTIC POLICY. Further progress can be made by SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON INTERNATIONAL/REGIONAL EFFORT. Through these efforts, COUNTRY can raise its weakest score and work toward comprehensive and lasting maritime security.'
          },
          {
            tag: 'img',
            src: '../../assets/western-coast/radar-sample.png'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      },
      { // Card 6
        title: 'Liberia',
        menu: 'Liberia',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [-33, -20],
            [14.5, 35]
          ],
          highlights: ['LBR'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Liberia'
          },
          {
            tag: 'caption',
            text: '<em>An island nation with strong Rule of Law</em>'
          },
          {
            tag: 'p',
            html: 'Cabo Verde\'s exclusive economic zone covers roughly 800,561 square kilometers of the northeast Atlantic Ocean \
                . This gives Cabo Verde the xth largest EEZ in sub-Saharan Africa. \
                Meanwhile, Cabo Verde\'s Maritime Enforcement Capacity Score indicates Cabo Verde is slightly above \
                the regional average.'
          },
          {
            tag: 'p',
            html: 'Across the nine issues covered by the Stable Seas Maritime Security Index, COUNTRY ranks highest in BEST ISSUE. \
                COUNTRY’s score of NUMBER in this area is high relative to its other issue scores, due in part to SOMETHING RELEVANT \
                AND INTERESTING. COUNTRY can further improve upon this area of relative strength by SUGGESTION BACKED BY THE SUBSCORES.'
          },
          {
            tag: 'bigtext',
            html: 'COUNTRY is also above the regional average in LIST OF ALL ISSUES WHERE COUNTRY RANKS ABOVE 16.'
          },
          {
            tag: 'p',
            html: 'The greatest remaining challenge for COUNTRY is WORST ISSUE RANKING. COUNTRY scores SCORE in this area, and this is slightly/significantly above/below the regional average of regional average for this score. To further improve upon this score, COUNTRY can SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON DOMESTIC POLICY. Further progress can be made by SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON INTERNATIONAL/REGIONAL EFFORT. Through these efforts, COUNTRY can raise its weakest score and work toward comprehensive and lasting maritime security.'
          },
          {
            tag: 'img',
            src: '../../assets/western-coast/radar-sample.png'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      }
    ]
  },
  northernGulf: {
    metadata: {
      name: 'Northern Gulf',
      updates: true,
      version: 0.0,
      index: 2,
      code: 'northernGulf',
      path: 'northern-gulf',
      countryData: [],
      regionalCountries: ['CIV', 'GHA', 'TGO', 'BEN', 'NGA'],
      csv: '../../data/regions/northern-gulf/northern-gulf.csv',
      color: '',
      //  order: -1,
      description: ''
    },
    load: function(csv, callback) {
      callback('Eastern Coast load csv function callback');


    },
    cards: [{ // Card 0
        title: 'The Northern Gulf of Guinea',
        menu: 'The Northern Gulf',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [-10, -33],
            [50, 43]
          ],
          // highlights: ['CIV', 'GHA', 'TGO', 'BEN', 'NGA'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'The Northern Gulf of Guinea'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the region</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }


        ]
      },
      { // Card 1
        title: 'Cote d\'Ivoire',
        menu: 'Cote d\'Ivoire',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [-10, -33],
            [50, 43]
          ],
          highlights: ['CIV'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Cote d\'Ivoire'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }


        ]
      },
      { // Card 2
        title: 'Ghana',
        menu: 'Ghana',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [-10, -33],
            [50, 43]
          ],
          highlights: ['GHA'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Ghana'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }


        ]
      },
      { // Card 3
        title: 'Togo',
        menu: 'Togo',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [-10, -33],
            [50, 43]
          ],
          highlights: ['TGO'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Togo'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }


        ]
      },
      { // Card 4
        title: 'Benin',
        menu: 'Benin',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [-10, -33],
            [50, 43]
          ],
          highlights: ['BEN'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Benin'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }


        ]
      },
      { // Card 5
        title: 'Nigeria',
        menu: 'Nigeria',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [-10, -33],
            [50, 43]
          ],
          highlights: ['NGA'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Ghana'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }


        ]
      }
    ]
  },
  southernGulf: {
    metadata: {
      name: 'Southern Gulf',
      updates: true,
      version: 0.0,
      index: 3,
      code: 'southernGulf',
      path: 'southern-gulf',
      countryData: [],
      regionalCountries: ['CMR', 'GNQ', 'GAB', 'COG', 'COD', 'STP'],
      csv: '../../data/regions/southern-gulf/southern-gulf.csv',
      color: '',
      //  order: -1,
      description: ''
    },
    load: function(csv, callback) {
      callback('Southern Gulf load csv function callback');


    },
    cards: [{ // Card 0
        title: 'The Southern Gulf of Guinea',
        menu: 'The Southern Gulf',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [0, -3],
            [80, 3]
          ],
          highlights: [],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'The Southern Gulf of Guinea'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the region</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }
          // ...
        ]
      },
      { // Card 1
        title: 'Sao Tome and Principe',
        menu: 'Sao Tome and Principe',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [0, -3],
            [80, 3]
          ],
          highlights: ['STP'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Sao Tome and Principe'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }
        ]
      },
      { // Card 2
        title: 'Cameroon',
        menu: 'Cameroon',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [0, -3],
            [80, 3]
          ],
          highlights: ['CMR'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Cameroon'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }
          // ...
        ]
      },
      { // Card 3
        title: 'Equatorial Guinea',
        menu: 'Equatorial Guinea',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [0, -3],
            [80, 3]
          ],
          highlights: ['GNQ'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Equatorial Guinea'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      },
      { // Card 4
        title: 'Gabon',
        menu: 'Gabon',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [0, -3],
            [80, 3]
          ],
          highlights: ['GAB'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Gabon'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }
          // ...
        ]
      },
      { // Card 5
        title: 'Congo',
        menu: 'Congo',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [0, -3],
            [80, 3]
          ],
          highlights: ['COG'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Congo'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      },
      { // Card 6
        title: 'Democratic Republic of the Congo',
        menu: 'Democratic Republic of the Congo',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [0, -3],
            [80, 3]
          ],
          highlights: ['COD'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Democratic Republic of the Congo'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }
        ]
      }
    ]
  },
  southernCoast: {
    metadata: {
      name: 'Southern Coast',
      updates: true,
      version: 0.0,
      index: 4,
      code: 'southernCoast',
      path: 'southern-coast',
      countryData: [],
      regionalCountries: ['AGO', 'NAM', 'ZAF'],
      csv: '../../data/regions/southern-coast/southern-coast.csv',
      color: '',
      //  order: -1,
      description: ''
    },
    load: function(csv, callback) {
      callback('Eastern Coast load csv function callback');


    },
    cards: [
      { // Card 0
        title: 'The Southern Coast',
        menu: 'The Southern Coast',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [[0,-60],[110, 25]],
          highlights: [],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'The Southern Coast'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      },
      { // Card 1
        title: 'Angola',
        menu: 'Angola',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [[0,-60],[110, 25]],
          highlights: ['AGO'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Angola'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      },
      { // Card 2
        title: 'Namibia',
        menu: 'Namibia',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [[0,-60],[110, 25]],
          highlights: ['NAM'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Namibia'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      },
      { // Card 3
        title: 'South Africa',
        menu: 'South Africa',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [[0,-60],[110, 25]],
          highlights: ['ZAF'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'South Africa'
          },
          {
            tag: 'caption',
            text: '<em>A subheading line on the country\'s greatest strength</em>'
          },
          {
            tag: 'p',
            html: 'The first paragraph will introduce the country in the context of the region.'
          },
          {
            tag: 'radar'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      }
    ]
  },
  westIndianOcean: {
    metadata: {
      name: 'West Indian Ocean',
      updates: true,
      version: 0.0,
      index: 5,
      code: 'westIndianOcean',
      path: 'west-indian-ocean',
      countryData: [],
      regionalCountries: ['MDG', 'MUS', 'SYC', 'COM'],
      csv: '../../data/regions/west-indian-ocean/west-indian-ocean.csv',
      color: '',
      //  order: -1,
      description: ''
    },
    load: function(csv, callback) {
      callback('West Indian Ocean load csv function callback');

    },
    cards: [
    { // Card 0
      title: 'West Indian Ocean',
      menu: 'West Indian Ocean',
      metadata: {
        owner: '',
        description: ''
      },
      map: {
        scale: [],
        translate: [],
        extent: [[30,-65],[110, 45]],
        highlights: [],
        iso3: '',
        load: function(index, csv) {
          var layer = 'card-' + index + '-layer';
          d3.select('.card-eez-layer')
            .classed(layer, true);
        },
        switch: function(index) {

        }
      },
      els: [{
          tag: 'h1',
          text: 'The West Indian Ocean'
        },
        {
          tag: 'caption',
          text: '<em>A subheading line on the country\'s greatest strength</em>'
        },
        {
          tag: 'p',
          html: 'The first paragraph will introduce the country in the context of the region.'
        },
        {
          tag: 'radar'
        },
        {
          tag: 'video',
          videoId: 'AXQHK213mFA',
          thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
        },
        {
          tag: 'caption',
          text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
        },
        {
          tag: 'h2',
          html: 'Country 1\'s Strengths'
        },
        {
          tag: 'p',
          html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
        },
        {
          tag: 'h2',
          html: 'Challenges Facing Country 1'
        },
        {
          tag: 'p',
          html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
        }

        // ...

      ]
    },
    { // Card 1
      title: 'Madagascar',
      menu: 'Madagascar',
      metadata: {
        owner: '',
        description: ''
      },
      map: {
        scale: [],
        translate: [],
        extent: [[30,-65],[110, 45]],
        highlights: ['MDG'],
        iso3: '',
        load: function(index, csv) {
          var layer = 'card-' + index + '-layer';
          d3.select('.card-eez-layer')
            .classed(layer, true);
        },
        switch: function(index) {

        }
      },
      els: [{
          tag: 'h1',
          text: 'Madagascar'
        },
        {
          tag: 'caption',
          text: '<em>A subheading line on the country\'s greatest strength</em>'
        },
        {
          tag: 'p',
          html: 'The first paragraph will introduce the country in the context of the region.'
        },
        {
          tag: 'radar'
        },
        {
          tag: 'video',
          videoId: 'AXQHK213mFA',
          thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
        },
        {
          tag: 'caption',
          text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
        },
        {
          tag: 'h2',
          html: 'Country 1\'s Strengths'
        },
        {
          tag: 'p',
          html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
        },
        {
          tag: 'h2',
          html: 'Challenges Facing Country 1'
        },
        {
          tag: 'p',
          html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
        }

        // ...

      ]
    },
    { // Card 2
      title: 'Mauritius',
      menu: 'Mauritius',
      metadata: {
        owner: '',
        description: ''
      },
      map: {
        scale: [],
        translate: [],
        extent: [[30,-65],[110, 45]],
        highlights: ['MUS'],
        iso3: '',
        load: function(index, csv) {
          var layer = 'card-' + index + '-layer';
          d3.select('.card-eez-layer')
            .classed(layer, true);
        },
        switch: function(index) {

        }
      },
      els: [{
          tag: 'h1',
          text: 'Mauritius'
        },
        {
          tag: 'caption',
          text: '<em>A subheading line on the country\'s greatest strength</em>'
        },
        {
          tag: 'p',
          html: 'The first paragraph will introduce the country in the context of the region.'
        },
        {
          tag: 'radar'
        },
        {
          tag: 'video',
          videoId: 'AXQHK213mFA',
          thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
        },
        {
          tag: 'caption',
          text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
        },
        {
          tag: 'h2',
          html: 'Country 1\'s Strengths'
        },
        {
          tag: 'p',
          html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
        },
        {
          tag: 'h2',
          html: 'Challenges Facing Country 1'
        },
        {
          tag: 'p',
          html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
        }

        // ...

      ]
    },
    { // Card 3
      title: 'Seychelles',
      menu: 'Seychelles',
      metadata: {
        owner: '',
        description: ''
      },
      map: {
        scale: [],
        translate: [],
        extent: [[30,-65],[110, 45]],
        highlights: ['SYC'],
        iso3: '',
        load: function(index, csv) {
          var layer = 'card-' + index + '-layer';
          d3.select('.card-eez-layer')
            .classed(layer, true);
        },
        switch: function(index) {

        }
      },
      els: [{
          tag: 'h1',
          text: 'Seychelles'
        },
        {
          tag: 'caption',
          text: '<em>A subheading line on the country\'s greatest strength</em>'
        },
        {
          tag: 'p',
          html: 'The first paragraph will introduce the country in the context of the region.'
        },
        {
          tag: 'radar'
        },
        {
          tag: 'video',
          videoId: 'AXQHK213mFA',
          thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
        },
        {
          tag: 'caption',
          text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
        },
        {
          tag: 'h2',
          html: 'Country 1\'s Strengths'
        },
        {
          tag: 'p',
          html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
        },
        {
          tag: 'h2',
          html: 'Challenges Facing Country 1'
        },
        {
          tag: 'p',
          html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
        }

        // ...

      ]
    },
    { // Card 4
      title: 'Comoros',
      menu: 'Comoros',
      metadata: {
        owner: '',
        description: ''
      },
      map: {
        scale: [],
        translate: [],
        extent: [[30,-65],[110, 45]],
        highlights: ['COM'],
        iso3: '',
        load: function(index, csv) {
          var layer = 'card-' + index + '-layer';
          d3.select('.card-eez-layer')
            .classed(layer, true);
        },
        switch: function(index) {

        }
      },
      els: [{
          tag: 'h1',
          text: 'The West Indian Ocean'
        },
        {
          tag: 'caption',
          text: '<em>A subheading line on the country\'s greatest strength</em>'
        },
        {
          tag: 'p',
          html: 'The first paragraph will introduce the country in the context of the region.'
        },
        {
          tag: 'radar'
        },
        {
          tag: 'video',
          videoId: 'AXQHK213mFA',
          thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
        },
        {
          tag: 'caption',
          text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
        },
        {
          tag: 'h2',
          html: 'Country 1\'s Strengths'
        },
        {
          tag: 'p',
          html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
        },
        {
          tag: 'h2',
          html: 'Challenges Facing Country 1'
        },
        {
          tag: 'p',
          html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
        }

        // ...

      ]
    }]
  },
  easternCoast: {
    metadata: {
      name: 'Eastern Coast',
      updates: true,
      version: 0.0,
      index: 6,
      code: 'easternCoast',
      path: 'eastern-coast',
      countryData: [],
      regionalCountries: ['SOM', 'KEN', 'TZA', 'DJI', 'MOZ'],
      csv: '../../data/regions/eastern-coast/eastern-coast.csv',
      color: '',
      //  order: -1,
      description: ''
    },
    load: function(csv, callback) {
      callback('Eastern Coast load csv function callback');

    },
    cards: [{ // Card 0
        title: 'Africa\'s Eastern Coast',
        menu: 'The Eastern Coast',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [10, -60],
            [130, 45]
          ],
          highlights: [],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);

          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'The Eastern Coast'
          },
          {
            tag: 'caption',
            text: '<em>The Indian Ocean</em>'
          },
          {
            tag: 'p',
            html: 'The eastern coast is strategically situated on the Indian Ocean.  \
              jThis gives Cabo Verde the xth largest EEZ in sub-Saharan Africa. \
              Meanwhile, Cabo Verde\'s Maritime Enforcement Capacity Score indicates Cabo Verde is slightly above \
              the regional average.'
          },
          {
            tag: 'p',
            html: 'Across the nine issues covered by the Stable Seas Maritime Security Index, COUNTRY ranks highest in BEST ISSUE. \
              COUNTRY’s score of NUMBER in this area is high relative to its other issue scores, due in part to SOMETHING RELEVANT \
              AND INTERESTING. COUNTRY can further improve upon this area of relative strength by SUGGESTION BACKED BY THE SUBSCORES.'
          },
          {
            tag: 'bigtext',
            html: 'COUNTRY is also above the regional average in LIST OF ALL ISSUES WHERE COUNTRY RANKS ABOVE 16.'
          },
          {
            tag: 'p',
            html: 'The greatest remaining challenge for COUNTRY is WORST ISSUE RANKING. COUNTRY scores SCORE in this area, and this is slightly/significantly above/below the regional average of regional average for this score. To further improve upon this score, COUNTRY can SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON DOMESTIC POLICY. Further progress can be made by SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON INTERNATIONAL/REGIONAL EFFORT. Through these efforts, COUNTRY can raise its weakest score and work toward comprehensive and lasting maritime security.'
          },
          {
            tag: 'img',
            src: '../../assets/western-coast/radar-sample.png'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }
          // ...
        ]
      },
      { // Card 1
        title: 'Mozambique',
        menu: 'Mozambique',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [10, -60],
            [130, 45]
          ],
          highlights: ['MOZ'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Mozambique'
          },
          {
            tag: 'caption',
            text: '<em>An island nation with strong Rule of Law</em>'
          },
          {
            tag: 'p',
            html: 'Mozambique\'s exclusive economic zone covers roughly 800,561 square kilometers of the northeast Atlantic Ocean \
                . This gives Cabo Verde the xth largest EEZ in sub-Saharan Africa. \
                Meanwhile, Cabo Verde\'s Maritime Enforcement Capacity Score indicates Cabo Verde is slightly above \
                the regional average.'
          },
          {
            tag: 'p',
            html: 'Across the nine issues covered by the Stable Seas Maritime Security Index, COUNTRY ranks highest in BEST ISSUE. \
                COUNTRY’s score of NUMBER in this area is high relative to its other issue scores, due in part to SOMETHING RELEVANT \
                AND INTERESTING. COUNTRY can further improve upon this area of relative strength by SUGGESTION BACKED BY THE SUBSCORES.'
          },
          {
            tag: 'bigtext',
            html: 'COUNTRY is also above the regional average in LIST OF ALL ISSUES WHERE COUNTRY RANKS ABOVE 16.'
          },
          {
            tag: 'p',
            html: 'The greatest remaining challenge for COUNTRY is WORST ISSUE RANKING. COUNTRY scores SCORE in this area, and this is slightly/significantly above/below the regional average of regional average for this score. To further improve upon this score, COUNTRY can SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON DOMESTIC POLICY. Further progress can be made by SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON INTERNATIONAL/REGIONAL EFFORT. Through these efforts, COUNTRY can raise its weakest score and work toward comprehensive and lasting maritime security.'
          },
          {
            tag: 'img',
            src: '../../assets/western-coast/radar-sample.png'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      },
      { // Card 2
        title: 'Tanzania',
        menu: 'Tanzania',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [10, -60],
            [130, 45]
          ],
          highlights: ['TZA'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Senegal'
          },
          {
            tag: 'caption',
            text: '<em>Senegal</em>'
          },
          {
            tag: 'p',
            html: 'Cabo Verde\'s exclusive economic zone covers roughly 800,561 square kilometers of the northeast Atlantic Ocean \
                . This gives Cabo Verde the xth largest EEZ in sub-Saharan Africa. \
                Meanwhile, Cabo Verde\'s Maritime Enforcement Capacity Score indicates Cabo Verde is slightly above \
                the regional average.'
          },
          {
            tag: 'p',
            html: 'Across the nine issues covered by the Stable Seas Maritime Security Index, COUNTRY ranks highest in BEST ISSUE. \
                COUNTRY’s score of NUMBER in this area is high relative to its other issue scores, due in part to SOMETHING RELEVANT \
                AND INTERESTING. COUNTRY can further improve upon this area of relative strength by SUGGESTION BACKED BY THE SUBSCORES.'
          },
          {
            tag: 'bigtext',
            html: 'COUNTRY is also above the regional average in LIST OF ALL ISSUES WHERE COUNTRY RANKS ABOVE 16.'
          },
          {
            tag: 'p',
            html: 'The greatest remaining challenge for COUNTRY is WORST ISSUE RANKING. COUNTRY scores SCORE in this area, and this is slightly/significantly above/below the regional average of regional average for this score. To further improve upon this score, COUNTRY can SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON DOMESTIC POLICY. Further progress can be made by SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON INTERNATIONAL/REGIONAL EFFORT. Through these efforts, COUNTRY can raise its weakest score and work toward comprehensive and lasting maritime security.'
          },
          {
            tag: 'img',
            src: '../../assets/western-coast/radar-sample.png'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      },
      { // Card 3
        title: 'Kenya',
        menu: 'Kenya',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [10, -60],
            [130, 45]
          ],
          highlights: ['KEN'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'The Gambia'
          },
          {
            tag: 'caption',
            text: '<em>Gambia</em>'
          },
          {
            tag: 'p',
            html: 'Cabo Verde\'s exclusive economic zone covers roughly 800,561 square kilometers of the northeast Atlantic Ocean \
                . This gives Cabo Verde the xth largest EEZ in sub-Saharan Africa. \
                Meanwhile, Cabo Verde\'s Maritime Enforcement Capacity Score indicates Cabo Verde is slightly above \
                the regional average.'
          },
          {
            tag: 'p',
            html: 'Across the nine issues covered by the Stable Seas Maritime Security Index, COUNTRY ranks highest in BEST ISSUE. \
                COUNTRY’s score of NUMBER in this area is high relative to its other issue scores, due in part to SOMETHING RELEVANT \
                AND INTERESTING. COUNTRY can further improve upon this area of relative strength by SUGGESTION BACKED BY THE SUBSCORES.'
          },
          {
            tag: 'bigtext',
            html: 'COUNTRY is also above the regional average in LIST OF ALL ISSUES WHERE COUNTRY RANKS ABOVE 16.'
          },
          {
            tag: 'p',
            html: 'The greatest remaining challenge for COUNTRY is WORST ISSUE RANKING. COUNTRY scores SCORE in this area, and this is slightly/significantly above/below the regional average of regional average for this score. To further improve upon this score, COUNTRY can SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON DOMESTIC POLICY. Further progress can be made by SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON INTERNATIONAL/REGIONAL EFFORT. Through these efforts, COUNTRY can raise its weakest score and work toward comprehensive and lasting maritime security.'
          },
          {
            tag: 'img',
            src: '../../assets/western-coast/radar-sample.png'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      },
      { // Card 4
        title: 'Somalia',
        menu: 'Somalia',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [10, -60],
            [130, 45]
          ],
          highlights: ['SOM'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Guinea-Bissau'
          },
          {
            tag: 'caption',
            text: '<em>Guinea-Bissau</em>'
          },
          {
            tag: 'p',
            html: 'Cabo Verde\'s exclusive economic zone covers roughly 800,561 square kilometers of the northeast Atlantic Ocean \
                . This gives Cabo Verde the xth largest EEZ in sub-Saharan Africa. \
                Meanwhile, Cabo Verde\'s Maritime Enforcement Capacity Score indicates Cabo Verde is slightly above \
                the regional average.'
          },
          {
            tag: 'p',
            html: 'Across the nine issues covered by the Stable Seas Maritime Security Index, COUNTRY ranks highest in BEST ISSUE. \
                COUNTRY’s score of NUMBER in this area is high relative to its other issue scores, due in part to SOMETHING RELEVANT \
                AND INTERESTING. COUNTRY can further improve upon this area of relative strength by SUGGESTION BACKED BY THE SUBSCORES.'
          },
          {
            tag: 'bigtext',
            html: 'COUNTRY is also above the regional average in LIST OF ALL ISSUES WHERE COUNTRY RANKS ABOVE 16.'
          },
          {
            tag: 'p',
            html: 'The greatest remaining challenge for COUNTRY is WORST ISSUE RANKING. COUNTRY scores SCORE in this area, and this is slightly/significantly above/below the regional average of regional average for this score. To further improve upon this score, COUNTRY can SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON DOMESTIC POLICY. Further progress can be made by SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON INTERNATIONAL/REGIONAL EFFORT. Through these efforts, COUNTRY can raise its weakest score and work toward comprehensive and lasting maritime security.'
          },
          {
            tag: 'img',
            src: '../../assets/western-coast/radar-sample.png'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      },
      { // Card 5
        title: 'Djibouti',
        menu: 'Djibouti',
        metadata: {
          owner: '',
          description: ''
        },
        map: {
          scale: [],
          translate: [],
          extent: [
            [10, -60],
            [130, 45]
          ],
          highlights: ['DJI'],
          iso3: '',
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

          }
        },
        els: [{
            tag: 'h1',
            text: 'Guinea'
          },
          {
            tag: 'caption',
            text: '<em>Guinea</em>'
          },
          {
            tag: 'p',
            html: 'Cabo Verde\'s exclusive economic zone covers roughly 800,561 square kilometers of the northeast Atlantic Ocean \
                . This gives Cabo Verde the xth largest EEZ in sub-Saharan Africa. \
                Meanwhile, Cabo Verde\'s Maritime Enforcement Capacity Score indicates Cabo Verde is slightly above \
                the regional average.'
          },
          {
            tag: 'p',
            html: 'Across the nine issues covered by the Stable Seas Maritime Security Index, COUNTRY ranks highest in BEST ISSUE. \
                COUNTRY’s score of NUMBER in this area is high relative to its other issue scores, due in part to SOMETHING RELEVANT \
                AND INTERESTING. COUNTRY can further improve upon this area of relative strength by SUGGESTION BACKED BY THE SUBSCORES.'
          },
          {
            tag: 'bigtext',
            html: 'COUNTRY is also above the regional average in LIST OF ALL ISSUES WHERE COUNTRY RANKS ABOVE 16.'
          },
          {
            tag: 'p',
            html: 'The greatest remaining challenge for COUNTRY is WORST ISSUE RANKING. COUNTRY scores SCORE in this area, and this is slightly/significantly above/below the regional average of regional average for this score. To further improve upon this score, COUNTRY can SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON DOMESTIC POLICY. Further progress can be made by SUGGESTION BACKED BY THE SUBSCORES, FOCUSED ON INTERNATIONAL/REGIONAL EFFORT. Through these efforts, COUNTRY can raise its weakest score and work toward comprehensive and lasting maritime security.'
          },
          {
            tag: 'img',
            src: '../../assets/western-coast/radar-sample.png'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png'
          },
          {
            tag: 'caption',
            text: '<em>Do we want videos in this ? Well we can have them anyway ...</em>'
          },
          {
            tag: 'h2',
            html: 'Country 1\'s Strengths'
          },
          {
            tag: 'p',
            html: 'A paragraph on the country\'s strengths, and where it might serve as an example elsewhere in Africa.'
          },
          {
            tag: 'h2',
            html: 'Challenges Facing Country 1'
          },
          {
            tag: 'p',
            html: 'A paragraph on the nature of the subject country\'s weaknesses, and where it might learn some lessons on how to improve.'
          }

          // ...

        ]
      }
    ]
  }







}
