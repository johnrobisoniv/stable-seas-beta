
var data = {
  issueArea: {
    metadata: {               // Independent data source for each page
        name: 'Rule of Law',
        index: 2, //Issue Area #3, index 2...
        code: 'ruleOfLaw',
        countryData: [],
        csv: './data/ruleOfLaw.csv'
      },                                            // page-level info
      load: function (csv, callback) {
        // Is this where we load the eez data?
        d3.csv(csv, function (vals) {
          vals.forEach(function (d) {
            d.ia3c1 = +d.ia3c1;
            d.ia3c2 = +d.ia3c2;
            d.ia3c3 = +d.ia3c3;
            d.ia3c5 = +d.ia3c5;
          });
          data.issueArea.metadata.countryData = vals; // Master data load - csv file into memory
          callback('hey this is the csv callback');
        });
      },                            // Flexibility on number of geo layers to load. Is this just geojson directly? Do we need an array? Or can we store the names of each layer in an array and load a single geojson object that contains all layers?
  cards:[
    // Card 0
    { title: 'Rule of Law',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'Rule of Law',
      metadata: {
        owner: 'Curtis Bell',
        description: 'Introduce the issue.'
      },                             // Not sure if we'll need this...
      map: {
    //    path: './data/ruleOfLaw.csv',
        scale: [],
        classes: 'card-eez-layer',
        translate: [],
        highlights: [],
        load: function (index, csv) {  // ### *** This only should be for the first card ...
          // Color EEZ according to master Stable Seas index
          var layer = 'card-'+index+'-layer';         // 4 @babyjames this is meant to dynamically class the spatial data layers.
                                                      // building the svgs

          // WWWWWHY isn't this working?!?!?!
          var l = d3.select('.card-eez-layer')
            .classed(layer, true);

          // Include tooltip with country names, values, text?? Link to country page?? ###
            // on hover:
            // on click:
          },
        switch: function (index) {
          switchMainIndex(index);
          // var target = 'card-'+index+'-layer';
          // var vals = data.issueArea.metadata.countryData;
          // var valsArr = []
          // vals.forEach(function (d){
          //   valsArr.push(d.ia3c1);
          // })
          // var max = d3.max(valsArr);
          //
          // vals.forEach(function (d, i) {    // ### this is a misuse of D3! or is it?!
          //   var highlightedCountry = d3.selectAll('.' + d.iso3);
          //   highlightedCountry.classed('included', true);
          //
          //   highlightedCountry.transition()
          //     .delay(i * 10)
          //     .style('fill', function () { return rampColor((1 - d.ia3c1) / max); });
          // });
          //
          // d3.select('.' + target)
          //   .classed('invisible', false);
        }
        },
      els: [

        { tag: 'h1',
          text: 'Rule of Law',
          xxx: '',
          execute: function () {}
        },
        { tag: 'p',
          html: 'To achieve lasting maritime security and good maritime governance, countries must have officials and institutions that reliably enforce government policy. Where these structures are undermined by corruption, inefficiency, and discriminatory practices, legal efforts to improve maritime security will have little effect. These policies can be realized only where the Rule of Law is strong enough to ensure new policies will be enforced in coastal and maritime spaces.<br /><br />Our Rule of Law Score considers five factors: corruption, government efficacy, government efficiency, judicial integrity, and inclusive governance. This year’s scores reveal strong governments across the region, though there are significant areas of concern in the southern Gulf of Guinea and the Horn of Africa. For more information about how these scores are calculated, please see our methodology page.'
        },
        { tag: 'h3',
          text: 'The Rule of Law Sub-index'
        },
        {tag: 'indexTable',
        },
        { tag: 'caption',
          text: 'Note: scores are rounded to the nearest whole number.'
        },
        { tag: 'p',
           html: 'Where the Rule of Law is strong, governments can be confident that legal efforts to address maritime crime and violence will yield results. These states can establish effective bodies to regulate industries like fishing and hold bureaucrats accountable for faithfully implementing policy. Such states are often better at monitoring and reporting so that policies can be reviewed and improved.<br /><br />Countries with a weak Rule of Law suffer from a disjuncture between policy and practice. Efforts to improve maritime security are impeded by poor norms and reporting structures, and this provides opportunities for corruption, bribe-seeking, and illicit economic activity. Additionally, these states lack the ability to effectively review, amend, and enforce new policy.'
        }
      ]                                    // Flexibility - each element is put in place in order
    }, // End of first element of cards object
    // Card 1
    { title: 'Fighting Corruption',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'Fighting Corruption',
      metadata: {
        owner: 'Curtis Bell',
        description: 'Corruption remains high, but efforts like EITI are making meaningful progress. Highlight Nigeria.'
      },                             // Not sure if we'll need this...
      map: {
        path: './data/main.csv',
        scale: [],
        classes: 'card-eez-layer',
        translate: [],
        highlights: ['NGA'],
        load: function (index, js) {
          // Color EEZ according to change in Corruption Perceptions Index
          // Include tooltip with country names, values, text?? Link to country page??
            // on hover:
            // on click:
            d3.select('.card-eez-layer')                      // 5 @babyjames and again here, in the next value (? object)
              .classed('card-' + index + '-layer card-5-layer', true);     // in the data.issueArea.cards array
                                              // ^ ### total hack
          },
        switch: function (index) {
          var target = 'card-' + index + '-layer';
          var vals = data.issueArea.metadata.countryData;
          var valsArr = [];

          vals.forEach( function (d) {
            valsArr.push(d.ia3c2);
          })
          var max = d3.max(valsArr);
          var min = d3.min(valsArr);
          var range = Math.sign(min) == -1 ? max + Math.abs(min) : max - min;

          vals.forEach(function (d, i) {
            d3.selectAll('.' + d.iso3)
              .transition()
              .delay(i * 10)
              .style('fill', function () {
              //  console.log((d.ia3c2 + Math.abs(min) ) / range);
                return rampColor(1 - ((d.ia3c2 + Math.abs(min) ) / range))
              });
            d3.select('.' + target).classed('invisible',false);
          })
        }
        },
      els: [

        { tag: 'h1',
          text: 'Rule of Law',
        },
        { tag: 'h3',
          text: 'Fighting Corruption'
        },

        { tag: 'p',
          html: 'Corruption remains the greatest threat to effective policy implementation in sub-Saharan Africa. It is especially threatening in the maritime domain, due to weak state presence, proximity to international borders, and the great concentration of wealth that occurs at important seaports. Where the Rule of Law is weak, local officials take bribes, profit from the selective enforcement of fisheries and environmental regulations, and permit black market trading and trafficking. According to <a href="https://www.transparency.org/" target="_blank"><em>Transparency International</em></a>, corruption is especially acute in major states like Ghana and South Africa. The good news, however, is that many sub-Saharan countries have made significant progress against corruption over the last five years.'
        },
        { tag: 'h3',
          text: 'Nigeria: Overcoming Corruption in the Oil Industry'
        },
        { tag: 'p',
          html: 'It isn’t coincidental that the countries receiving many of the region’s harshest corruption scores are also the region’s most important offshore oil producers. Unique challenges for this industry, including crude oil theft and opaque processes for licensing and rewarding contracts, hamstring economies that should be among Africa’s strongest.  Still, success stories like Nigeria show that governments in this region can make considerable progress toward reducing corruption.<br /><br /> Nigeria, the region’s largest oil producer, was also the first sub-Saharan state to embrace the <a href="https://eiti.org/" target="_blank">Extractive Industries Transparency Initiative</a> (EITI) framework. Member states subject themselves to periodic reviews of their extractive industry management and are then held accountable for making progress toward any areas of concern. Following the January 2017 review, Fredrik Reinfeldt, Chair of the EITI Board, said of Nigeria:'
        },
        { tag: 'blockquote',
          html: '“Nigeria has repeatedly demonstrated how the EITI process can be used to achieve important, tangible results for its citizens. Swiftly addressing the corrective actions identified through Validation should help Nigeria continue to demonstrate regional leadership and make a full transition to the EITI standard.”',
          source: 'Fredrik Reinfeldt, Chair of the EITI Board (need link to quote!)',
          link: 'http://***.org/***'       // What about internal references?
        },
        { tag: 'p',
          text: 'This review of 34 aspects of good extractives governance found inadequate progress in only one area (policy on contract disclosure), but found that Nigeria made meaningful or satisfactory strides in areas like public debate, distribution of revenues, and civil society engagement. With further work within this framework, Nigeria will build stronger institutions and deepen norms of good, corruption-free governance.'
        },
        { tag: 'img',
          src: './assets/placeholder.jpg',
          alt: 'Map of EITI member states',
          caption: 'EITI member states'
        },
        { tag: 'p',
          text: 'Approximately half of coastal sub-Saharan states are now participating in the EITI process. Two oil-rich states that have seen the worst trends in corruption, Angola and Equatorial Guinea, are not among them.'
        }
      ]                                    // Flexibility - each element is put in place in order
    }, // End of second  object in cards array
    // Card 2
    { title: 'The Perils of Bureaucratic  Red Tape',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'Red Tape',
      metadata: {
        owner: 'Curtis Bell',
        description: 'Why is corruption linked to bureaucratic burdens, opportunities for bribery. Highlight firm behavior report.'
      },                             // Not sure if we'll need this...
      map: {
        path: './data/main.csv',
        scale: [],
        classes: 'card-2-layer',
        translate: [],
        highlights: null,
        load: function (index, js) {
            // Color EEZ -- Ease of Trade score
              d3.select('.card-eez-layer')                      // 5 @babyjames and again here, in the next value (? object)
                .classed('card-' + index + '-layer', true);     // in the data.issueArea.cards array
        },
        switch: function (index) {
          // Map the Ease of Trade score (WB)
          var target = 'card-' + index + '-layer';
          var vals = data.issueArea.metadata.countryData;
          var valsArr = [];
          vals.forEach(function (d) {
            valsArr.push(d.ia3c3);
          });
          var max = d3.max(valsArr);
          var min = d3.min(valsArr);
          var range = max - min;

          vals.forEach(function (d, i) {
            d3.selectAll('.' + d.iso3)
              .transition()
              .delay(i * 10)
              .style('fill', function () {
                return rampColor( (d.ia3c3 - min) / range ) // ### waiting for data
              });
            d3.select('.' + target).classed('invisible',false);
          })

          // Include tooltip with country names, values, text?? Link to country page??
            // on hover:
            // on click:

          }
        },
      els: [
        { tag: 'h1',
          text: 'Rule of Law'
        },

        { tag: 'h3',
          text: 'The Perils of Bureaucratic Red Tape'
        },

        { tag: 'p',
          html: 'To effectively fight corruption and curtail bribe-seeking, states can review their bureaucracies and eliminate points where these activities are most likely to occur. Seaports should be a focal point in this search. Because more than 90% of sub-Saharan Africa’s international trade flows through its seaports, port administrators are uniquely positioned to demand bribes, permit illicit economic activity, and undermine good governance. <a href="https://www.economist.com/news/middle-east-and-africa/21695054-new-investment-alone-will-not-fix-africas-ports-governments-need-deal" target="_blank">A recent report by The Economist</a> went as far as to call this behavior “onshore piracy.”<br /><br /> Where the Rule of Law is weak, administrative gatekeepers can demand bribes before goods can continue on to their next destination. The World Bank estimates the resulting transit delays cost African economies billions of dollars each year, so it is no surprise that recent anti-graft efforts in Kenya, Tanzania, Mozambique, and elsewhere have resulted in high-profile sackings of customs officials and port directors.'
        },
        { tag: 'img',
          src: './assets/placeholder.jpg',
          alt: 'Pie graph showing African / non-Africa cross-border corruption.',
          caption: 'UN data on African / non-Africa cross-border corruption. [pie graph]'
        },
        { tag: 'p',
          html: 'Solving this problem will require compliance from both African and non-African actors, as most of this kind of rent-seeking occurs as a transaction between an African recipient and non-African firm. Cooperation from the many multi-national corporations doing business in African seaports will be especially important. A 2016 report from the United Nations Economic Commission for Africa found more than 99% of known cases of cross-border corruption in the region since 1994 involved non-African firms. These cases included simple bribery of port and customs authorities, as well as more elaborate illicit financial schemes involving kick-backs, insurance fraud, money laundering, and selective enforcement of trade regulations.<br /><br />The cross-border corruption occurring in African seaports has detrimental spillover effects for other sectors. Preferential treatment of foreign firms, norms of rent-seeking, and corrupt officials can negatively influence the regulatory environment for domestic businesses that are far-removed from international trade. A recent report on the issues facing small firms in fragile sub-Saharan economies highlights how excessive bureaucracy and regulation suppress business growth, impose unnecessary “facilitation fees,” and weaken judicial integrity. The report, based on field research in Somaliland, The Democratic Republic of the Congo,, and South Sudan, strongly argues that informal non-governmental arrangements like business collectives and sector-specific cooperatives must be part of the solution. Unless governments can reign in corruption and improve maritime trade governance, it will be very difficult for both governments and private associations institutions to promote a stronger Rule of Law and healthier business environment.'
        },
        { tag: 'img',
          src: './assets/firm-behavior.jpeg',
          alt: 'Firm Behavior in Fragile States',
          caption: 'Firm Behavior in Fragile States by Dr Victor Owuor',
          link: 'http://oefresearch.org/publications/firm-behavior-fragile-states'
        }
      ]                                    // Flexibility - each element is put in place in order
    }, // End of third  object in cards array
    // Card 3
    { title: 'Weak Sovereignty',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'Weak Sovereignty',
      metadata: {
        owner: 'Kelsey Soeth',
        description: 'Highlight an area that is under weak state control, poor governance - maybe the bissagos in guinea-bissau.'
      },                             // Not sure if we'll need this...
      map: {
        path: './data/main.csv',
        scale: [],
        classes: 'card-eez-layer',
        translate: [],
        extent: [[-20,14],[-3,7]],  // ### Guinea Bissau
        highlights: ['GNB'], // Guinea Bissau
        load: function (index, js) {
          // d3.select('.card-eez-layer')
          //   .classed('card-'+index+'-layer', true); // 6 @babyjames and again here (jk)
          // Load points or polygons to highlight in Guinea Bissau
          // Zoom to proper extent
        },
        switch: function (target) {
          // var vals = data.issueArea.metadata.countryData;
          // vals.forEach(function (d) {
          //   d3.selectAll('.' + d.iso3)
          //     .transition()
          //     .delay(i * 10)
          //     .style('fill', function () {
          //       return rampColor(d.ia3c3)
          //     });
            d3.select('.card-eez-layer').classed('invisible', true);
            d3.select('.card-' + target + '-layer').classed('invisible',false);
          }
        }
        ,
      els: [

        { tag: 'h1',
          text: 'Rule of Law',
          xxx: '',
          execute: function () {}
        },
        { tag: 'h3',
          text: 'Weak Sovereignty'
        },

        { tag: 'p',
           text: 'Coming soon...'
        }
      ]                                    // Flexibility - each element is put in place in order
    }, // End of fourth  object in cards array
    // Card 4
    { title: 'Inclusion',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'Inclusion',
      metadata: {
        owner: 'Kelsey Soeth',
        guest: 'Our Secure Future',
        description: 'Partner with OSF to talk about inclusion of women, perhaps in national security strategies.'
      },                             // Not sure if we'll need this...
      map: {
        path: './data/main.csv',
        scale: [],
        classes: 'card-4-layer',
        translate: [],
        highlights: null,
        load: function (index, js) {
          d3.select('.card-eez-layer')
            .classed('card-' + index + '-layer', true);
          // Color map with 'some aspect of inclusion' chloropleth ...
        },
        switch: function (index) {
            var target = 'card-'+index+'-layer';
            var vals = data.issueArea.metadata.countryData;
            vals.forEach(function (d, i) {
              d3.selectAll('.' + d.iso3)
                .transition()
                .delay(i * 10)
                .style('fill', function () { return rampColor(d.ia3c3); });
            });

            d3.select('.' + target)
              .classed('invisible', false);

              setBGImg();


        }
        },
      els: [

        { tag: 'h1',
          text: 'Rule of Law',
          xxx: '',
          execute: function () {}
        },
        { tag: 'h3',
          text: 'Inclusion'
        },

        { tag: 'p',
          html: 'Equal treatment under the law, regardless of ethnicity, socioeconomic status, religion, subnational region, or gender, is the basis of inclusive governance. In poorly governed states, unequal treatment undermines governance and may lead to marginalized groups circumventing unjust state institutions. If the rule of law is not applied consistently across society, these groups may be more likely to seek illicit opportunities and less likely to report criminal activity, effectively further undermining existing governance structures.<br /><br />Levels of inclusion vary greatly along the sub-Saharan coastline, and most states continue to move towards greater levels of inclusion. Many of these states have made particular strides towards inclusive governance by increasing the participation of women. As of 2016, 19 AU member states had developed and adopted National Action Plans on Women, Peace, and Security, including several top-ranking states included in this analysis. The purpose of these plans is the implementation of UN Security Council Resolution 1325, which calls for increased participation and representation of women at all levels of decision-making in an effort to empower women to participate as equals in preventing conflict and building peace in countries threatened and affected by war, violence, and insecurity.<br /><br />Senegal has been particularly successful at incorporating gender inclusivity into its governance structures. Following the 2010 adoption of gender parity for candidates for elected positions, women’s participation in local government tripled (from 15.9% in 2009 to 47.2% in 2015). Furthermore, 20% of ministerial level positions were held by women as of 2015. The Gambia, Ghana, Guinea-Bissau, Namibia, and Nigeria each had an even higher proportion of women in high-level positions.<br /><br />As Sierra Leone emphasized in its national security strategy following its devastating civil war, there is a strong link between security and development, indicating that poverty and a lack of social cohesion are national security threats that require civilian engagement to counter. To this end, Somalia is promoting women’s economic empowerment through a number of FAO fisheries projects. These projects include training women boat builders and adding value to post-harvest fish catches. Ms. Shukri Ahmed Mohamed is one of the community organizers working with the latter project. She notes:'
        },
        { tag: 'blockquote',
          html: '“It is important to have women involved in these activities since their contributions have a big influence on ensuring stronger household level financial management and food security that will directly benefit their families.”',
          source: 'Ms. Shukri Ahmed Mohamed, [what org??###]',
          link: 'http://***.org/***'       // What about internal references?
        },
        { tag: 'p',
          text:'Inclusive governance is necessary to aid African states in governing their maritime spaces. Whether this inclusion is achieved through legislated parity or economic initiatives, the equal application of the rule of law can only help the continent achieve peace, security, and poverty alleviation.'
        }
      ]                                    // end of els array
    }, // End of fifth  object in cards array
    // Card 5
    { title: 'Methodology',                    // Ultimately we have to design a different element object template for each element, and write a h1(), p(), links(),
      menu: 'Methodology',
      metadata: {
        owner: 'Curtis Bell',
        description: 'Methods.'
      },                             // Not sure if we'll need this...
      map: {
        // path: './data/main.csv',
        scale: [],
        classes: 'card-5-layer',
        translate: [],
        highlights: null,
        load: function (index, csv) {  // ### *** This only should be for the first card ...
          // Color EEZ according to master Stable Seas index
          var layer = 'card-'+index+'-layer';         // 4 @babyjames this is meant to dynamically class the spatial data layers.
                                                      // building the svgs
          d3.select('.card-eez-layer')
            .classed(layer, true);

          // Include tooltip with country names, values, text?? Link to country page?? ###
            // on hover:
            // on click:
        },
        switch: function (index) {
          switchMainIndex(index);

            // var target = 'card-'+index+'-layer';
            // var vals = data.issueArea.metadata.countryData;
            // vals.forEach(function (d, i) {
            //   d3.selectAll('.' + d.iso3)
            //     .transition()
            //     .delay(i * 10)
            //     .style('fill', function () { return rampColor(d.ia3c1); });
            // });
            //
            // d3.select('.' + target)
            //   .classed('invisible', false);
          }
        },
      els: [

        { tag: 'h1',
          text: 'Rule of Law',
        },
        { tag: 'h3',
          text: 'Methodology'
        },

        { tag: 'p',
           text: 'The Rule of Law Score incorporates five concepts that are central to good governance: corruption, government efficacy, government efficiency, judicial integrity, and inclusion. We calculate these five scores and then average them after using a “penalty for bottleneck” transformation (PfB) that penalizes countries for especially poor scores in one of the five areas. We provide an overview of our methodology below and a more complete technical summary in the supporting materials for download.'
        },
        { tag: 'h2',
          text: 'Inputs'
        },
        { tag: 'h4',
          text: 'Corruption'
        },
        { tag: 'p',
          html: 'Corrupt officials fail to enforce policy and enable transnational crime, and corruption in maritime governance and maritime trade is especially problematic because nearly all of Africa’s international economic activity---both legitimate and illicit---transits the maritime space. Many organizations have created corruption measures already, so we adapt the Corruption Perceptions Index by Transparency International. This measure averages 13 other corruption indicators and scores states on a scale from 0 to 100, with more corrupt countries earning lower scores. TI’s methodology prevents nearly every state from exceeding 80, so we divide each country’s score by 80 to achieve a more reasonable high benchmark.'
        },
        { tag: 'h4',
          text: 'Government Efficacy'
        },
        { tag: 'p',
          html: 'Ineffective governments cannot enforce policy, and this hinders a state’s ability to secure its maritime space and prevent illicit maritime activities. We measure efficacy by rescaling the “Functioning of Government” score from Freedom House. This score, published as part of the annual Freedom in the World report, reflects expert responses to questions like: Do non-state actors, including criminal gangs, the military, and foreign governments, interfere with or prevent elected representatives from adopting and implementing legislation and making meaningful policy decisions? and Are there independent and effective auditing and investigative bodies that function without impediment or political pressure or influence?'
        },
        { tag: 'h4',
          text: 'Government Efficiency'
        },
        { tag: 'p',
          html: 'Governments with unnecessary administrative and bureaucratic hurdles provide more opportunities for bribery and corruption, especially as these systems relate to trade, customs, and international migration. Each year, the World Bank gauges government efficiency in several areas, one of which is “Trading Across Borders.” This score is computed from expert estimates of the amount of time and money required to move a standard shipping container into the country. The measure is especially relevant for efficiency in African maritime governance, as the region’s international trade transits almost exclusively through seaports.'
        },
        { tag: 'h4',
          text: 'Judicial Integrity'
        },
        { tag: 'p',
          html: 'Judicial integrity is important to the enforcement of existing laws and ensuring that the <em>de jure</em> regulations are <em>de facto</em> conditions. Where judges are bribed and laws go unenforced, the rule of law is too weak for policies aimed at the maritime domain to be effective. We capture this concept using three variables from the Varieties of Democracy Project, a leading dataset on the strength of governance around the world. Specifically, we create a Judicial Integrity score from three measures that score how often (a) the government attacks the judiciary in public, (b) corrupt or inept judges are held accountable and removed from office, and (c) individuals and businesses pay bribes in return for favorable or speedy decisions.'
        },
        { tag: 'h4',
          text: 'Inclusion'
        },
        { tag: 'p',
          html: 'We gauge political inclusion with five measures from the Varieties of Democracy Project. These data are collected both globally and annually and they cover unequal treatment of the law according to social group identification (i.e. ethnic groups), subnational region, religion, socioeconomic status, and gender. Note that this is a measure of equal treatment under the law, and not the absolute provision of liberal and transparent governance. Non-democratic states can score well if the law is equally applied across all five of these social divisions.'
        },



        { tag: 'h3',
          text: 'Calculating the Rule of Law Score'
        },
        { tag: 'p',
          html: 'After rescaling all five measures to the 0-1 interval, we use the Penalty for Bottleneck (PfB) method. This method transforms scores so that countries are docked for especially poor performance in any one area, and in this way a very bad score cannot simply be averaged out by better performance in several other areas. This method means states can most improve their scores by making gains in their greatest area of weakness. To perform the Penalty for Bottleneck, the researcher identifies the minimum value of the five scores (MV) and then transforms each of the other four according to the following formula:<br /><br /><center>TransformedScore = MV+ln(1 + RawScore - MV)</center><br />The Rule of Law Score is the average of the five transformed scores.'
        }
      ]                                    // end of els array
    } // End of sixth  object in cards array
  ]    // End of cards array
    }      // end of issueArea Object
};
