// v0.0.6
var issueAreaData = { // ### replace data with something more descriptive. issueAreaData?
  overview: {
    metadata: {
      name: 'Overview',
      updates: true,
      version: '0.0.2',
      /*
      here is where you write updates
      do one line per update, like
      added legend to card 3
      added citations to card 5
      input thumbnail path to card 4
      loaded point data

      */
      index: 1,
      code: 'overview',
      path: 'overview',
      countryData: [],
      csv: '../../data/overview/overview.csv',
      color: '#FC4C02',
      order: -1,
      description: 'The index maps and measures global threats to maritime governance and analyzes challenges like piracy, smuggling, and capacity-building.'
    },
    load: function(csv, callback) {
      var md = issueAreaData[issueArea].metadata;
      d3.csv(csv, function(vals) {
        vals.forEach(function(d) {
          d.ia1c0 = +d.ia1c0;
          d.ia1c1 = +d.ia1c1;
          d.ia1c2 = +d.ia1c2;
          d.ia1c3 = +d.ia1c3;
          d.ia1c4 = +d.ia1c4;
        });
        md.countryData = vals;
        callback('overview load csv function callback');
      });

      d3.csv('../../data/' + md.path + '/indexValues.csv', function(vals) {
        vals.forEach(function(d) {
          for (key in d) {
            if (key != "country" && key != "iso3") {
              d[key] = +d[key];
            }
          }
        });
        issueAreaData[issueArea].metadata.indexData = vals;

      });
    },
    cards: [{ // Card 0
        title: 'Introducing Stable Seas',
        menu: 'Introducing Stable Seas',
        metadata: {
          owner: 'Curtis Bell',
          description: 'This will be the title card that introduces the website.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, csv) { // ### *** This only should be for the first card ...
            // Class EEZ with card-0-layer to enable switch() method
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            //  switchMainIndexInverse(index); // ### will this work elsewhere??
            var target = 'card-' + index + '-layer';
            var vals = issueAreaData[issueArea].metadata.countryData;

            vals.forEach(function(val, i) {

              d3.selectAll('.country.' + val.iso3)
                .classed('active', true)
                .transition().delay(10 * i)
                .style('fill', rampColor(0.5))
                .style('stroke', rampColor(1));

              d3.selectAll('.eez.' + val.iso3)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('stroke', rampColor(1));
              //  function () {
              //   return d3.interpolateLab('white', color)(0.5);
              // });


            });

            d3.select('.' + target)
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Introducing Stable Seas',
          },
          {
            tag: 'caption',
            text: '<em>A new effort to measure and map maritime security in sub-Saharan Africa</em>'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>The 30 shaded countries and EEZs will be included in the inaugural Stable Seas Maritime Security Index</em>'
          },
          {
            tag: 'p',
            html: 'The Stable Seas Maritime Security Index is a first-of-its-kind effort to measure and map a range of threats to maritime governance. By bringing diverse challenges like <a class="piracy inline" href="../../piracy">piracy</a>, <a class="illicit-trade inline" href="../../illicit-trade">smuggling</a>, and <a class="maritime-enforcement inline" href="../../maritime-enforcement">capacity-building</a> into one comprehensive analysis, we can better understand how these issues intersect to affect maritime security.'
          },
          {
            tag: 'video',
            videoId: 'AXQHK213mFA',
            thumb: '../../assets/overview/stable-seas-main-video-thumb.png' // ###
          },
          {
            tag: 'caption',
            text: '<em>Introducing the Stable Seas Maritime Security Index.</em>'
          },
          {
            tag: 'p',
            html: 'The inaugural edition of our report covers the 30 exclusive economic zones (EEZs) that envelop sub-Saharan Africa from the mid-Atlantic to the Gulf of Aden. Countries in this region face unique maritime security challenges and overcoming them will require   <a class="international-cooperation inline" href="../../international-cooperation">international coordination</a> and careful consideration of the interdependencies linking these maritime threats. This site highlights these linkages by combining quantitative measures with close examinations of important case studies from across the region.'
          },
          {
            tag: 'p',
            html: 'Through new maritime security strategies like the Yaoundé and Djibouti Codes of Conduct, African states have redefined maritime security as a constellation of complicated and intersecting issues. To support efforts to disentangle these activities and bring sustainable maritime security, our team is working toward a new index that will measure progress toward each of these related goals. We are creating these measures by partnering with African governments, international organizations, non-governmental organizations, and other stakeholders with an intimate understanding of the African maritime security environment. We plan to release the inaugural report in late 2017.'
          },
          // { tag: 'overviewIndexTable',
          //   col: 'weakness'
          // },
          // { tag: 'caption',
          //   text: 'Note: This table lists the issue area on which each country receives its lowest regional ranking.'
          // },
          // { tag: 'p',
          //   html: 'The measures presented here reflect the best available information about complex and under-reported issues occurring in expansive remote areas. Some issue scores necessarily reflect best-faith estimates rather than exact and verifiable figures. More technical details about the Stable Seas Maritime Security Index can be found in our <a href="https//www.stableseas.org../../data" target="_blank">technical notes</a>'
          // },
          ///###Add Link to data and documentation page
        ] // end of els array
      },
      { // Card 1
        title: 'A Substantial Challenge',
        menu: 'A Substantial Challenge',
        metadata: {
          owner: 'Curtis Bell',
          description: 'Introduce the mission in greater detail, talking specifically about how maritime security must be approached as a multi-faceted problem and how it relates to peace.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          translate: [],
          load: function(index, csv) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            // color countries categorically based on data in csv
            var target = 'card-' + index + '-layer';
            var metadata = issueAreaData[issueArea].metadata;
            var vals = metadata.countryData;


            vals.forEach(function(d, i) { // ### this is a misuse of D3! or is it?!

              if (d.ia1c1 != 0) {

                d3.selectAll('.country.' + d.iso3)
                  .classed('active', true)
                  .transition().delay(i * 10)
                  .style('fill', colorBrew[d.ia1c1][0])
                  .style('stroke', colorBrew[d.ia1c1][1]);

                d3.selectAll('.eez.' + d.iso3)
                  .classed('active', true)
                  .transition().delay(i * 10)
                  .style('stroke', colorBrew[d.ia1c1][1]);
              }

            });

            d3.select('.' + target)
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'A Substantial Challenge',
          },
          {
            tag: 'caption',
            text: 'Sustainable maritime security will require continued multilateral coordination'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<div class="brew-20 legend-entries light">Sub-Saharan members of the Djibouti Code of Conduct</div><br /><div class="brew-10 legend-entries light">Sub-Saharan members of the Yaoundé Code of Conduct</div>'
          },
          {
            tag: 'p',
            html: 'Weak maritime governance drives governments and criminals into very different patterns of behavior. Most efforts to increase maritime security focus mainly on addressing a fairly narrow problem like <a class="piracy inline" href="../../piracy">piracy</a> or <a class="fisheries inline" href="../../fisheries#1">illegal fishing.</a> On the other hand, the ease with which criminal networks can operate in these spaces allows them to shift their activities to dodge such efforts. A counter-piracy mandate can disincentivize hijackings, but it can also drive criminals into trafficking and smuggling activities that narrowly avoid these mandates.'
          },
          {
            tag: 'img',
            src: '../../assets/overview/issue_areas_graphic.png', // This should be on the Stable Seas Deck - comments
          },

          {
            tag: 'bigtext',
            html: 'At 11.4 million square kilometers, sub-Saharan Africa\'s EEZs are larger than the total land area of Europe.'
          },
          {
            tag: 'p',
            html: 'To achieve sustainable maritime security, then, it is necessary to adopt a more holistic approach. By measuring and mapping these threats, the Stable Seas Maritime Security Index will allow analysts to answer questions like:'
          },
          {
            tag: 'ul',
            rows: ['What kinds of maritime crimes are substitutes, and which are complementary? Can addressing one threat lead to an increase in another threat?', 'What kinds of crimes are adequately solved by international agreements, and which require significant investments in surveillance and maritime domain awareness?', 'What have some countries done to address maritime security threats? What “lessons learned” might be adapted for the maritime spaces of other countries?']
          }
        ] // end of els array
      },
      { // Card 2
        title: 'Indian Ocean Overview',
        menu: 'Indian Ocean Overview',
        metadata: {
          owner: 'Ben Lawellin',
          description: 'Introduces the maritime threat and crime environment in east Africa.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, csv) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            // Just DCoC members ###
            var selector = 'ia1c' + index;
            var jeddah = issueAreaData[issueArea].metadata.countryData;

            jeddah.forEach(function(country, i) {

              if (country.ia1c2 != 0) {
                d3.selectAll('.eez.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('stroke', colorBrew[2][1]);

                d3.selectAll('.country.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('fill', colorBrew[2][0])
                  .style('stroke', colorBrew[2][1]);
              }

            });
          }
        },
        els: [{
            tag: 'h1',
            text: 'Indian Ocean Overview',
          },
          {
            tag: 'caption',
            text: 'Coordinating through the Djibouti Code of Conduct'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<div class="brew-20 legend-entries light">Sub-Saharan members of the Djibouti Code of Conduct</div>'
          },
          {
            tag: 'p',
            html: 'Africa’s share of the Indian Ocean Basin includes the Gulf of Aden, the waters off the Horn of Africa, the vast expanse of the Western Indian Ocean, and the Mozambique Channel. The issues facing coastal countries in this region are as diverse and complex as the geographies of these maritime spaces. The ten sub-Saharan governments with territorial waters in this area coordinate through regional efforts like the Djibouti Code of Conduct and the Indian Ocean Tuna Commission, among others.'
          },
          {
            tag: 'img',
            src: '../../assets/overview/maritime_instability_somalia.jpg',
            alt: 'Special protection unit in Berbera, Somaliland. Photo: Jean-Pierre Larroque, OEF.',
            caption: 'Special protection unit in Berbera, Somaliland.<br />Photo: Jean-Pierre Larroque, OEF.'
          },
          {
            tag: 'p',
            html: 'From the Gulf of Aden to South Africa, <a class="maritime-mixed-migration inline" href="../../maritime-mixed-migration">maritime mixed migration</a> is nearly omnipresent. Some of those seeking better socioeconomic conditions head south along the Tanzanian and Mozambican coasts for South Africa. Many more take the dangerous journey north through Somalia or Djibouti toward the Arabian Peninsula. At all stages, they are vulnerable to forced labor, sex trafficking, and other forms of degradation.'
          },
          {
            tag: 'bigtext',
            html: 'Maritime insecurity in the Western Indian Ocean has global repercussions.'
          },
          {
            tag: 'p',
            html: 'The transnational criminal networks in this area are entrenched and their activities fuel conflict around the globe. <a class="illicit-trade inline" href="../../illicit-trade">Illicit trading in arms, wildlife, drugs, and contraband</a> links East African ports to distant markets in the Middle East, Southeast Asia, and beyond. These activities provide weapons for African insurgent groups, fill the coffers of separatists and drug cultivators in South Asia, and corrupt the massively important seaports that oversee the majority of Africa’s international commerce.'
          },
          {
            tag: 'bigtext',
            html: 'Though Somali piracy has declined, war in Yemen is bringing new maritime threats.'
          },
          {
            tag: 'p',
            html: 'The waters in the north, in the Gulf of Aden and around Somalia, are possibly some of the most unstable on the planet. Besides the latent threat of <a class="piracy inline" href="../../piracy">Somali pirates,</a> several military vessels have been targeted and hit by anti-ship missiles supposedly from militants in Yemen. Seaborne improvised explosive devices resembling sea mines have been spotted, and there have been incidents of <a class="piracy inline" href="../../piracy#5">attempted maritime terrorism</a> against shipping and oil terminals in the region. These events have the potential to affect international shipping traffic through the Red Sea, which is among the world’s most important global transportation chokepoints.'
          },

          {
            tag: 'p',
            html: 'Throughout the island nations off the east coast of Africa,   <a class="fisheries inline" href="../../fisheries#1">illegal, unreported, and unregulated (IUU) fishing</a> is one of the primary concerns. These islands have operated as tax havens, which attracts so-called “white-collar crime” and provides money-laundering services for the area’s transnational criminal networks. Many of these states have taken significant measures to combat money laundering and other financial crimes, and in the process have strengthened their banking sectors.'
          },
          {
            tag: 'p',
            html: 'Farther south, the waters are calmer and more stable. Criminals exploit weak maritime enforcement capacity and engage in smuggling out of some of Africa’s largest ports, but the problems are less severe than they are in the northwest Indian Ocean. With the recent reduction in size of the piracy High Risk Area, some of the private security contractors employed to protect vessels and oil rigs are going out of business.'
          },
          {
            tag: 'p',
            html: 'Many gaps exist in combating these threats primarily due to the lack of effective governance over the maritime space and the underdeveloped capacities of maritime law enforcement and the supporting agencies. But new developments, including the 2017 Jeddah Amendment to the Djibouti Code of Conduct, will enhance regional cooperation and increase the likelihood that multinational efforts to improve maritime security will be successful.'
          }
        ] // end of els array
      },
      { // Card 3
        title: 'Gulf of Guinea Overview',
        menu: 'Gulf of Guinea Overview',
        metadata: {
          owner: 'Greg Clough',
          description: 'This card introduces Yaounde and major issues in these states.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, csv) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            // class according to Yaounde ratification
            var selector = 'ia1c' + index;
            var yaounde = issueAreaData[issueArea].metadata.countryData;

            yaounde.forEach(function(country, i) {
              /// #### need to come back tot his map!
              if (country.ia1c3 == 1) {
                // d3.selectAll('.country.' + country.iso3)
                //   .classed('active', true)
                //   .transition()
                //   .delay(i * 10)
                //   .style('fill', function () {
                //     if (country[selector] != 0) {
                //       return rampColor(1 - (country[selector] - min) / (max - min));
                //     } else { return null; }
                //   });
                //   // .style('stroke', function () {
                //   //   if (country[selector] != 0) {
                //     return 'black';
                //   } else { return null; }
                // });

                d3.selectAll('.country.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('fill', colorBrew[1][0])
                  .style('stroke', colorBrew[1][1]);

                d3.selectAll('.eez.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('stroke', colorBrew[1][1]);
              }
            });
          }
        },
        els: [{
            tag: 'h1',
            text: 'Gulf of Guinea Overview',
          },
          {
            tag: 'caption',
            text: 'Coordinating through the Yaoundé Code of Conduct'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<div class="brew-10 legend-entries light">Sub-Saharan members of the Yaoundé Code of Conduct</div>'
          },
          {
            tag: 'p',
            html: 'Twenty one sub-Saharan countries line the long coastline that stretches from the waters off Senegal to South Africa’s Cape of Good Hope. The heart of the region, the Gulf of Guinea, faces what is perhaps the world’s most severe maritime security challenge. Tremendous natural resources, proximity to onshore violent non-state actors, and limited maritime law enforcement capabilities leave countries vulnerable to <a class="piracy inline" href="../../piracy">piracy</a>, <a class="piracy inline" href="../../piracy#4">crude oil-related crime</a>, smuggling, and more.'
          },
          {
            tag: 'img',
            src: '../../assets/overview/oil_platform_Niger_delta_PiusUtomiEkpei_getty.jpg',
            alt: 'Oil platform in the Niger delta. Photo: Pius Utomi Ekpei, AFP/Getty Images.',
            caption: 'Oil platform in the Niger delta. Photo: Pius Utomi Ekpei, AFP/Getty Images.'
          },

          {
            tag: 'bigtext',
            html: 'Oil wealth boosts national incomes, but also attracts transnational crime.'
          },
          {
            tag: 'p',
            html: 'There have been repeated attacks against shipping and oil infrastructure both at sea and on shore within the Niger Delta. These events have the potential to affect international shipping traffic. Even more worrisome for the workers who either transit the Gulf of Guinea as seafarers or as employees of extractive industries is the highly efficient system of kidnapping for ransom that has developed over the last few years. The frequency and violence of these kidnappings have earned the Gulf of Guinea the reputation of being some of the world’s most dangerous waters.'
          },
          {
            tag: 'p',
            html: 'For many coastal states in West Africa,   <a class="fisheries inline" href="../../fisheries#1">illegal, unregulated, and unreported (IUU) fishing</a> is threatening the long-term sustainability of the <a class="blue-economy inline" href="../../blue-economy">Blue Economy</a>. IUU fishing reduces the catch available for local artisanal fishers and threatens local food security while allowing foreign fishing vessels to profit through what is in effect resource theft. Though extensive legal regimes are in place, enforcement capacity varies and in too many areas proves to be insufficient.'
          },
          {
            tag: 'p',
            html: '<a class="illicit-trade inline" href="../../illicit-trade#2">Drug smuggling</a>, <a class="illicit-trade inline" href="../../illicit-trade#3">weapons trafficking</a>, <a class="illicit-trade inline" href="../../illicit-trade#4">illicit trade in wildlife</a>, and <a class="maritime-mixed-migration inline" href="../../maritime-mixed-migration">human trafficking</a> are also common in the West African maritime space. Combating each of these crimes presents unique challenges. While the world’s most trafficked animal, the pangolin, makes its home in African states and its illicit trade can be countered at its point of origin, the drug trade often uses African states as a transshipment point en route to Europe. These activities undermine good governance while funding narcotics networks that stretch from the Americas to West Africa and Europe.'
          },
          {
            tag: 'bigtext',
            html: 'Maritime enforcement capacity is improving, but the Gulf of Guinea continues to suffer from high rates of piracy and armed robbery at sea.'
          },
          {
            tag: 'p',
            html: 'Fortunately, Africa’s Atlantic coast is also home to some of the region’s best-established multilateral maritime security strategies. Through agreements like the <a class="international-cooperation inline" href="../../international-cooperation#3">Yaoundé Code of Conduct</a>, coastal countries are increasing maritime domain awareness and coordinating their responses to the region’s maritime security challenges.'
          }
        ] // end of els array
      },
      { // Card 4
        title: 'Continental Cooperation',
        menu: 'Continental Cooperation',
        metadata: {
          owner: 'Ben Lawellin',
          description: 'Introduces the difficulties in combatting these crimes across Africa.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, csv) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer'; // Class EEZs or countries?
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            // class according to Lome ratification
            var lome = issueAreaData[issueArea].metadata.countryData;

            lome.forEach(function(country, i) {
              if (country.ia1c4 == 1) {
                d3.selectAll('.country.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('fill', rampColor(0.5))
                  .style('stroke', rampColor(1));

                d3.selectAll('.eez.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('stroke', function() {
                    return rampColor(1);
                  });
              }
            });

          }
        },
        els: [{
            tag: 'h1',
            text: 'Continental Cooperation',
          },
          {
            tag: 'caption',
            text: 'Working toward Africa-wide solutions'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Highlights represent sub-Saharan countries that have signed the AU\'s Lomé Charter</em>'
          },

          {
            tag: 'p',
            html: 'African law enforcement and security institutions are faced with problems common throughout the continent: corruption, lack of professionalization of the security sector, limited resources, underdeveloped port infrastructure, and the dynamic and adaptive nature of violent non-state actors.'
          },
          {
            tag: 'img',
            src: '../../assets/overview/continental_cooperation.jpg',
            alt: 'First technical meeting to evaluate the Yaoundé Code of Conduct. Photo credit: Jean-Pierre Larroque',
            caption: 'First technical meeting to evaluate the Yaoundé Code of Conduct.<br />Photo credit: Jean-Pierre Larroque'
          },
          {
            tag: 'p',
            html: 'Several African-led initiatives are making progress against these problems. While many of these initiatives are still in their infancy, they show great promise in developing Africa’s <a class="blue-economy inline" href="../../blue-economy">Blue Economy</a> and the protections necessary to safeguard it.'
          },
          {
            tag: 'p',
            html: 'The African Peace and Security Architecture (APSA) guides all multilateral security affairs in the African Union. Within the APSA, the principle pillar is the Peace and Security Council, which is in turn supported by a variety of structures centered on decision-making processes related to the prevention, management, and resolution of crises and conflicts along with post-conflict reconstruction and development in the continent. These structures include the Commission, the Panel of the Wise, the Continental Early Warning System (CEWS), the African Standby Force (ASF), and the Peace Fund. While the maritime component of the APSA is small, the ASF, the CEWS, and other entities do incorporate modest maritime structures into the larger peace and security architecture.'
          },
          {
            tag: 'p',
            html: 'The ASF is a continental multilateral peacekeeping force operating throughout mainland Africa. The ASF consists of military, police, and civilian components, with very minimal maritime components, operating under the guidance of the African Union. Stood up in order to act in times of crisis such as the Rwandan genocide, the ASF was created to prevent subsequent atrocities from occurring. The ASF comprises five Standby Brigades divided into different geographic zones throughout the continent. Currently, only the East Africa Standby Brigade has an operational maritime component. However, as in many institutions throughout Africa, there is a significant lack of capacity in both the ASF land and maritime components. As of late 2017, no ASF brigade has deployed in support of an ongoing conflict.'
          },
          {
            tag: 'p',
            html: 'The Lomé Charter is another continent-wide peace and security framework, but it deals more explicitly in the maritime realm. The aim of the charter was to make the maritime sector a key driver of Africa’s economic and social development. The charter is a binding agreement among 30 countries on maritime safety and security signed in October 2016 in Lomé, Togo. One of the most significant facets of the charter is the linkage of the development of the <a class="blue-economy inline" href="../../blue-economy">Blue Economy</a> to the necessary <a class="maritime-enforcement inline" href="../../maritime-enforcement">protections</a> to secure these vital resources. For instance, without protections set in place to secure fishing grounds from IUU fishing, currently abundant fishing areas could quickly become overfished if law enforcement mechanisms or resource management plans are not put in place.'
          }
        ] // end of els array
      },
      { // Card 5
        title: 'Our Team',
        menu: 'Our Team',
        metadata: {
          owner: 'Curtis Bell',
          description: 'Briefly introduce the three organizations.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          extent: [
            [-80, -80],
            [180, 80]
          ],
          translate: [],
          highlights: ['SOM', 'KEN', 'FRA', 'ETH', 'SYC', 'MUS', 'MDG', 'MOZ', 'GAB', 'GHA', 'CMR', 'TGO', 'COG', 'DJI',
            'UGA', 'ITA', 'GBR', 'COL', 'BEL', 'AUT', 'ZAF', 'IDN', 'BHR', 'TZA', 'CHN', 'CHE', 'MLT', 'VNM', 'CAN', 'USA', 'CPV'
          ],
          load: function(index, csv) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer'; // Class EEZs or countries?



          },
          switch: function(index) {
            var offices = ['USA', 'GBR', 'SOM', 'KEN', 'COL'];

            offices.forEach(function(office, i) {
              d3.selectAll('.country.' + office)
                .classed('active', true)
                .style('stroke', 'black');
            });
          }
        },
        els: [{
            tag: 'h1',
            text: 'Our Team',
          },
          {
            tag: 'caption',
            text: 'Working towards peace through governance'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Highlighted countries show locations where we have worked to promote good maritime governance in support of this project.</em>'
          },
          {
            tag: 'img',
            src: '../../assets/stable_seas_intro_oef_logo.png'
          },
          {
            tag: 'p',
            html: '<em>The Stable Seas Maritime Security Index</em> is being developed by One Earth Future (OEF) through its programs OEF Research, Oceans Beyond Piracy and Secure Fisheries. OEF is a self-funded, private operating foundation that seeks to create a more peaceful world through collaborative, data-driven programs that contribute to thought leadership on global issues. OEF is based in the United States in Broomfield, Colorado, with field staff operating in Somalia, Kenya, and Colombia.'
          },
          {
            tag: 'img',
            src: '../../assets/oceans_beyond_piracy_logo.png'
          },
          {
            tag: 'p',
            html: '<strong>Oceans Beyond Piracy</strong> believes that the solutions for addressing piracy and maritime crime should come from within the community of stakeholders. We work with an extensive—and growing—number of experts to find solutions to maritime crime. Through meetings and workshops we host, our research and analysis, on-the-ground regional involvement in areas affected by piracy and maritime crime, and our development and encouragement of new cross-sector partnerships, we support the international community in efforts to bring an end to contemporary maritime piracy. More information can be found at <a href="http://www.obp.ngo" target="_blank">www.obp.ngo</a>'
          },
          {
            tag: 'img',
            src: '../../assets/oef_research_logo.png'
          },
          {
            tag: 'p',
            html: '<strong>OEF Research</strong> produces empirical and actionable research for the purpose of eliminating the root causes of war. Related OEF Research products include investigations of the behavior of private firms operating in fragile states, the long-term impact of maritime piracy on seafarers and their families, and the role of non-state actors in maritime governance. More information can be found at <a href="http://oefresearch.org" target="_blank">www.oefresearch.org</a>'
          },
          {
            tag: 'img',
            src: '../../assets/secure_fisheries_logo.png'
          },
          {
            tag: 'p',
            html: '<strong>Secure Fisheries</strong> combines science-based research with a policy-oriented approach to combat illegal fishing and support sustainable fisheries. Operating primarily in Somalia, Somaliland, and the Lake Victoria region, we serve as a bridge between security efforts at sea and stability and prosperity efforts on land. More information can be found at <a href="http://www.securefisheries.org" target="_blank">www.securefisheries.org</a>'
          }
          //###ADD DROPDOWNS FOR PUBLICATIONS FOR EACH PROGRAM.
        ] // end of els array
      }
    ]
  },
  internationalCooperation: {
    metadata: {
      version: '0.0.2', // Independent data source for each page
      name: 'International Cooperation',
      updates: true,
      /*
           here is where you write updates
           do one line per update, like
           added legend to card 3
           added citations to card 5
           input thumbnail path to card 4
           loaded point data

           */
      index: 2,
      code: 'internationalCooperation',
      path: 'international-cooperation',
      countryData: [],
      csv: '../../data/international-cooperation/internationalCooperation.csv',
      color: '#3CB2C1',
      order: -1,
      description: 'Maritime instability in African waters cause ripples that undermine global economies, international security, and strong social networks.'
    },
    load: function(csv, callback) {
      d3.csv(csv, function(vals) {
        vals.forEach(function(d) {
          d.ia2c0 = +d.ia2c0;
          d.ia2c1 = +d.ia2c1;
          d.ia2c2 = +d.ia2c2;
          d.ia2c3 = +d.ia2c3;
          d.ia2c4 = +d.ia2c4;
          d.ia2c7 = +d.ia2c7;
          d.ia2c7 = +d.ia2c7;

        });
        issueAreaData[issueArea].metadata.countryData = vals;
        callback('internationalCooperation load csv function callback');
      });
    },
    cards: [{ // Card 0
        title: 'International Cooperation',
        menu: 'International Cooperation',
        metadata: {
          owner: 'Curtis Bell',
          description: 'Introduce the issue.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, csv) { // ### *** This only should be for the first card ...
            // Class EEZ with card-0-layer to enable switch() method
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            // switchMainIndexInverse(index);
            var unclos = issueAreaData[issueArea].metadata.countryData;

            unclos.forEach(function(country, i) {
              if (country.ia2c0 == 1) {
                d3.selectAll('.country.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('fill', function() {
                    return rampColor(0.5);
                  })
                  .style('stroke', rampColor(1));

                d3.selectAll('.eez.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('stroke', function() {
                    return rampColor(1);
                  });
              }
            });

          }
        },
        els: [{
            tag: 'h1',
            text: 'International Cooperation',
          },
          {
            tag: 'caption',
            text: 'Transnational challenges demand multilateral efforts'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Highlighted countries are party to all parts of UNCLOS, including Part XI.'
          },
          {
            tag: 'p',
            html: 'The security and governance of African waters is not an interest exclusive to African nations. Maritime instability causes economic, security, and social problems with effects that ripple across the globe. Acknowledging this interdependency, a variety of international actors—from individual states to global institutions—have facilitated programs which aim to build a more secure African maritime domain.'
          },
          {
            tag: 'h3',
            text: 'UNCLOS in Africa',
          },
          // { tag: 'caption',
          //   text: 'Enhanced sovereignty over maritime resources'
          // },
          //  { tag: 'legend',
          //     text: 'Map Legend',
          //    legendContent: '<em></em>.'
          //    },
          {
            tag: 'p',
            html: 'The United Nations Convention on the Law of the Sea (UNCLOS) codified the growing preference among countries to have increased legal rights to govern larger maritime spaces, reducing conflict over competing claims to offshore resources.'
          },
          {
            tag: 'img',
            src: '../../assets/international-cooperation/maritime_zones_eez.png', // ### need image path and in assets/international-cooperation/
            alt: 'The legal definition definition of \'exclusive economic zone\' was established under UNCLOS.',
            caption: 'The legal definition definition of \'exclusive economic zone\' was established under UNCLOS.'
          },
          {
            tag: 'p',
            html: 'This historic advance in maritime governance was actively shaped and supported by African nations. African states were especially strong advocates for UNCLOS III and the establishment of Exclusive Economic Zones (EEZs), which grant states the right to govern space and resources up to 200 nautical miles from their shores. African support allowed this concept to be adopted into international law<sup>1</sup> despite the concerns of many developed nations that had become accustomed to having unfettered access to resources off the coasts of developing nations.'
          },
          {
            tag: 'p',
            html: 'The main ramification of UNCLOS for sub-Saharan Africa was economic. Suddenly, African nations had a legal framework within which they could assert their rights to govern and share in the profits of the resources off of their shores. Potential financial gains for African states from the taxation of maritime resources continue to be massive, but equally significant is the assertion of sovereignty to govern these resources in a manner which protects the long-term economic, environmental, and security interests of their people.'
          },
          {
            tag: 'p',
            html: 'Protecting the rights of African maritime states under UNCLOS needs to be a priority for all actors interested in maintaining maritime security. The case of Somali piracy demonstrates how failure to observe the rights to maritime governance established in UNCLOS III can generate grievances<sup>2</sup> which give rise to other threats. Rather than exploiting the inability of many sub-Saharan states to effectively enforce their sovereignty in their maritime domains, actors interested in maritime security need to partner with such states in order to build capacity to govern and enforce law in these spaces.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>1</sup> “Reflections on Africa and the Law of the Sea Regime,” <em>CEMLAWS Blog</em>, 24 November 2016,',
                url: 'http://www.cemlawsafrica.com/blog/reflections-africa-and-law-sea-regime-part-i'
              },
              {
                org: '<sup>2</sup> Peter Kerins, “Somali Perspectives on Piracy and Illegal Fishing,” Oceans Beyond Piracy,',
                url: 'http://oceansbeyondpiracy.org/publications/somali-perspectives-piracy-and-illegal-fishing'
              }
            ]
          }
          // { tag: 'h3',
          //   text: 'The International Cooperation Score'
          // },
          // {tag: 'indexTable'
          // },
          // { tag: 'caption',
          //   text: 'Note: scores are rounded to the nearest whole number.'
          // },
          // { tag: 'p',
          //    html: 'Unlike other scores in this index, an International Cooperation Score can be greatly improved without vast material capabilities. The lowest-scoring states are among the few abstainers to important international maritime legal agreements, such as the UN Fish Stocks Agreement and the Convention for the Suppression of Unlawful Acts against the Safety of Maritime Navigation. More states signing, ratifying, and complying with these kinds of agreements would boost global and regional efforts to improve African maritime governance.'
          // },
        ] // end of els array
      }, // End of first element of cards object
      // {  // Card 1
      //   title: 'The UN Convention on the Law of the Sea and Sub-Saharan Africa',
      //   menu: 'The UN Convention on the Law of the Sea and Sub-Saharan Africa',
      //   metadata: {
      //     owner: 'Jay Benson',
      //     description: 'Discuss effects of UNCLOS on SSA.'
      //   },
      //   map: {
      //     scale: [],
      //     classes: 'card-eez-layer',
      //     translate: [],
      //     highlights: [],
      //     load: function (index, csv) {  // ### *** This only should be for the first card ...
      //       // Class EEZ with card-0-layer to enable switch() method
      //       var layer = 'card-'+index+'-layer';
      //       d3.select('.card-eez-layer')
      //         .classed(layer, true);
      //     },
      //     switch: function (index) {
      //
      //       var unclos = issueAreaData[issueArea].metadata.countryData;
      //
      //       unclos.forEach( function ( country, i ) {
      //         if (country.ia2c1 == 1) {
      //           d3.selectAll('.country.' + country.iso3)
      //             .classed('active', true)
      //             .transition()
      //             .delay(i * 10)
      //             .style('fill', function () {
      //               return rampColor(1);
      //             })
      //             .style('stroke', 'grey');
      //
      //           // d3.selectAll('.eez.' + country.iso3)
      //           //   .classed('active', true)
      //           //   .transition()
      //           //   .delay(i * 10)
      //           //   .style('fill', function () {
      //           //     return rampColor(0.6);
      //           //   });
      //         }
      //       });
      //     }
      //   },
      //   els: [
      //     // { tag: 'h1',
      //       // text: 'The UN Convention on the Law of the Sea and Sub-Saharan Africa',
      //     // },
      //     // { tag: 'caption',
      //     //   text: 'UNCLOS provides Africa with enhanced sovereignty over maritime resources'
      //     // },
      //     // // { tag: 'legend',
      //     // //   text: 'Map Legend',
      //     // //   legendContent: '<em></em>.'
      //     // // },
      //     // { tag: 'p',
      //     //   html: 'Prior to the adoption of the United Nations Convention on the Law of the Sea (UNCLOS) in 1982, the maritime space beyond a narrow strip of coastal waters was governed not by law, but by those who had the most maritime technology and power. UNCLOS codified the growing preference among countries to have increased legal rights to govern larger maritime spaces, reducing conflict over competing claims to offshore resources.'
      //     // },
      //     // { tag: 'p',
      //     //    html: 'This historic advance in maritime governance was actively shaped and supported by African nations. African states were especially strong advocates for UNCLOS III and the establishment of Exclusive Economic Zones (EEZs), which grant states the right to govern space and resources up to 200 nautical miles from their shores. This expansion greatly benefited developing states that had limited capacity to exploit offshore hydrocarbons and fisheries. African support allowed this concept to be adopted into international law<sup>1</sup> despite the concerns of many developed nations that had become accustomed to having unfettered access to resources off the coasts of developing nations.'
      //     // },
      //     // { tag: 'p',
      //     //    html: 'The main ramification of UNCLOS for sub-Saharan Africa was economic. Suddenly, African nations had a legal framework within which they could assert their rights to govern and share in the profits of the resources off of their shores. Potential financial gains for African states from the taxation of maritime resources continue to be massive, but equally significant is the assertion of sovereignty to govern these resources in a manner which protects the long-term economic, environmental, and security interests of their people.'
      //     // },
      //     // { tag: 'p',
      //     //    html: 'Protecting the rights of African maritime states under UNCLOS needs to be a priority for all actors interested in maintaining maritime security. The case of Somali piracy demonstrates how failure to observe the rights to maritime governance established in UNCLOS III can generate grievances<sup>2</sup> which give rise to other threats. Rather than exploiting the inability of many sub-Saharan states to effectively enforce their sovereignty in their maritime domains, actors interested in maritime security need to partner with such states in order to build capacity to govern and enforce law in these spaces.'
      //     // },
      //     // { tag: 'p',
      //     //    html: 'Regional support for UNCLOS remains to this day, with every maritime nation in sub-Saharan Africa having signed and ratified UNCLOS III, though a few have not yet signed on to the subsequent Part XI and UN Fish Stocks Agreement.'
      //     // },
      //     // { tag: 'links',
      //     //   items: [
      //     //   {org: '<sup>1</sup> “Reflections on Africa and the Law of the Sea Regime,” <em>CEMLAWS Blog</em>, 24 November 2016,', url: 'http://www.cemlawsafrica.com/blog/reflections-africa-and-law-sea-regime-part-i'},
      //     //   {org: '<sup>2</sup> Peter Kerins, “Somali Perspectives on Piracy and Illegal Fishing,” Oceans Beyond Piracy,', url: 'http://oceansbeyondpiracy.org/publications/somali-perspectives-piracy-and-illegal-fishing'},
      //     //   ]
      //     //},
      //     //###Insert graphics, video, and blockquote
      //   ] // end of els array
      // },
      { // Card 2
        title: 'Ongoing Disputes',
        menu: 'Ongoing Disputes',
        metadata: {
          owner: 'Jay Benson',
          description: 'Highlight maritime disputes.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          path: '../../data/international-cooperation/maritime-border-disputes.csv',
          translate: [],
          load: function(index, csv) { // ### *** This only should be for the first card ...
            // Class EEZ with card-0-layer to enable switch() method


            var layer = 'card-' + index + '-layer';

            d3.csv(csv, function(rows) {
              rows.forEach(function(d) {
                d.lat = +d.lat;
                d.lon = +d.lon;
              });

              var disputes = mapg.append('g')
                .classed('card-layer maritime-disputes invisible ' + layer, true);

              disputes.selectAll('rect')
                .data(rows).enter()
                .append('rect')
                .attr('x', function(d) {
                  return projection([d.lon, d.lat])[0] - 20;
                })
                .attr('y', function(d) {
                  return projection([d.lon, d.lat])[1] - 20;
                })
                .attr('width', '40px')
                .attr('height', '40px')
                .style('stroke', colorBrew[2][1])
                .classed('maritime-dispute', true);


              //console.log(JSON.stringify(rows));

              // var labels = mapg.append('g')
              //   .classed('disputed-labels', true);
              //
              // labels.selectAll('.disputed.label')
              //   .data(rows).enter()
              //   .append('text')
              //     .attr('x', function (d) { console.log(d);return projection([d.lon, d.lat])[0]; } )
              //     .attr('y', function (d) { return projection([d.lon, d.lat])[1]; } )
              //     .text( function (d) { return d.dispute; } )
              //     .attr('class', function (d) {
              //       return 'disputed label invisible card-layer';
              //     });

            });

            d3.select('.card-eez-layer')
              .classed(layer, true);

          },
          switch: function(index) {
            var countries = ['SOM', 'GHA', 'CIV', 'AGO', 'KEN', 'GAB', 'GNQ', 'COD', 'COG', 'YEM', 'DJI', 'MUS', 'GBR', 'FRA', 'MDG', 'ATF', 'COM', 'MYT'];
            countries.forEach(function(country) {
              d3.selectAll('.country.' + country)
                .classed('active', true)
                .style('fill', rampColor(0.5))
                .style('stroke', rampColor(1));
            })

          }
        },
        els: [{
            tag: 'h1',
            text: 'Ongoing Disputes',
          },
          {
            tag: 'caption',
            text: 'Disputes undermine maritime security, governance, and the Blue Economy'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Red boxes outline areas of maritime border disputes.<br />Highlighted countries are involved in these disputes.</em>'
          },
          {
            tag: 'p',
            html: 'International legal developments including UNCLOS have reduced the potential for conflict by establishing common definitions and guidelines pertaining to maritime claims and resources. This work has provided states with many non-violent methods for overcoming contested claims and most African states have entered formal agreements with their neighbors that establish mutually recognized maritime borders.'
          },
          {
            tag: 'img',
            src: '../../assets/international-cooperation/Jubilee_Oil_Field_of_the_Ghana_National_Petroleum_Corporation_GNPC_and_National_Petroleum_Authority.png', // This should be on the Stable Seas Deck - comments
            alt: 'The Jubilee Oil field straddles the contested boundary between Cote d\'Ivoire and Ghana.',
            caption: 'The Jubilee Oil field straddles the contested boundary between Cote d\'Ivoire and Ghana.'
          },

          {
            tag: 'p',
            html: 'The multifaceted drivers of the region\'s ongoing disputes are typified by the disagreement over the maritime boundary between Ghana and Côte d’Ivoire.<sup>3</sup> The border between these former British and French colonies was never fully demarcated, laying the groundwork for the dispute, but what had previously been a low-profile issue took on new significance after the discovery of the massive Jubilee <a class="blue-economy inline" href="../../blue-economy#6">oil and gas field</a> which straddles the contested border. Both sides have since granted competing operating licenses to international oil companies.'
          },
          {
            tag: 'p',
            html: 'These disputes have not become militarized, but they pose a problem for governance and security in African waters in two ways. First, unresolved maritime boundaries hamper regional security by encouraging states to look at maritime security from the perspective of national defense as opposed to that of <a class="maritime-enforcement inline" href="../../maritime-enforcement#3">law enforcement</a>, which is better suited to the security threats faced in African waters. In addition, non-demarcated maritime boundaries mean states cannot fully develop their <a class="blue-economy inline" href="../../blue-economy">Blue Economy</a>, including industries such as <a class="fisheries inline" href="../../fisheries">fisheries</a>, <a class="blue-economy inline" href="../../blue-economy#6">hydrocarbon</a>, <a class="blue-economy inline" href="../../blue-economy#2">tourism</a>, and <a class="blue-economy inline" href="../../blue-economy#3">shipping</a>.'
          },
          {
            tag: 'p',
            html: 'The region primarily uses two models for maritime dispute resolution. The first relies on international legal institutions to resolve disputes. This is the model used in the aforementioned case of Ghana and Côte d’Ivoire, which is at the international Tribunal on the Law of the Sea, as well as the case of Kenya and Somalia, whose dispute is on trial at the International Court of Justice.<sup>4</sup> Alternatively, some states have chosen to shelve issues of sovereignty and establish frameworks and institutions for joint development and governance of maritime industries in the disputed areas. As both the <a class="international-cooperation inline internal-ref" data-link="6">African Union</a> and <a class="international-cooperation inline internal-ref" data-link="3">sub-regional organizations</a> turn their attention to governance of the maritime space, there may be room for both to further develop frameworks for maritime dispute resolution which facilitate cooperative economic development and security.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>3</sup> Barthélemy Blédé and André Diouf, “The First Verdict in the Ghana-Côte d’Ivoire Maritime Border Dispute Will be Delivered Tomorrow,” Institute for Security Studies, 24 April 2015,',
                url: 'https://issafrica.org/iss-today/gulf-of-guinea-who-will-win-the-oil-battle'
              },
              {
                org: '<sup>4</sup> David Mwere, “Kenya-Somalia Maritime Boundary Dispute Proceeds to Full Trail, ICJ Rules,” The Star, 2 February 2017,',
                url: 'https://www.the-star.co.ke/news/2017/02/02/kenya-somalia-maritime-boundary-dispute-proceeds-to-full-trial-icj_c1499658'
              },
            ]
          },
          //###Insert image and Video for card
        ] // end of els array
      },
      { // Card 3
        title: 'International Fishing Agreements',
        menu: 'International Fishing Agreements',
        metadata: {
          owner: 'Kelsey Soeth',
          description: 'Map will talk about international cooperation around fishing.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, csv) { // ### *** This only should be for the first card ...

            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
            // Loop through highlights array and class each country with layer??

          },
          switch: function(index) {
            // Setup is right, just need updated data file from Curtis

            var fishing = issueAreaData[issueArea].metadata.countryData;

            fishing.forEach(function(country, i) {
              if (country.ia2c2 == 1) {
                d3.selectAll('.country.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('fill', colorBrew[0][0]) // ### what colors??
                  .style('stroke', colorBrew[0][1]);

                d3.selectAll('.eez.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('stroke', colorBrew[0][1]); // ### what colors?? Also EEZ opacity is meh ...
                //  .style('stroke', 'grey');

              } else if (country.ia2c2 == 2) {
                // code for Cat2
                d3.selectAll('.country.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('fill', colorBrew[2][0]) // ### what colors??
                  .style('stroke', colorBrew[2][1]);

                d3.selectAll('.eez.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('stroke', colorBrew[2][0]); // ### what colors Also EEZ opacity is meh ...??
                //  .style('stroke', 'grey');


              } else if (country.ia2c2 == 3) {
                // code for Cat3
                d3.selectAll('.country.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('fill', colorBrew[4][0]) // ### what colors??
                  .style('stroke', colorBrew[4][1]);

                d3.selectAll('.eez.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('stroke', colorBrew[4][0]); // ### what colors?? Also EEZ opacity is meh ...
                //      .style('stroke', 'grey');


              }
            });

          }
        },
        els: [{
            tag: 'h1',
            text: 'International Fishing Agreements',
          },
          {
            tag: 'caption',
            text: 'Sustainable management through regional cooperation'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<div class="brew-00 legend-entries light">Ratified UN Fish Stocks Agreement</div><br /><div class="brew-20 legend-entries light">Ratified Port State Measures Agreement</div><br /><div class="brew-40 legend-entries light">Ratified both</div><br />'
          },
          //###Kelsey would like a map of different RFMOs in SSA. She has sent a file with the corresponding data to John.
          {
            tag: 'p',
            html: 'According to the UN Food and Agriculture Organization, the value of marine fisheries in Africa exceeds $15 billion.<sup>5</sup> The efficient management of these resources is imperative to the continued growth of sub-Saharan African economies as well as to long-term food security.'
          },

          {
            tag: 'p',
            html: 'However, fisheries management cannot be regulated by sovereign states alone. Many fish species are highly migratory, and marine fisheries on the high seas are subject to international, not sovereign, jurisdiction. International cooperation by coastal states and fishing nations is therefore necessary to conserve and promote the sustainable use of fish stocks and other marine resources. Since the late 1960s, this cooperation has often taken the form of regional fisheries management organizations (RFMOs) in sub-Saharan Africa.'
          },
          {
            tag: 'bigtext',
            html: 'RMFO: Regional Fisheries Management Organization'
          },
          {
            tag: 'p',
            html: 'RFMOs are international organizations dedicated to the sustainable management of fishery resources in a particular region of international waters, or of a highly migratory species. Most RFMOs with sub-Saharan African membership are focused on tuna, a particularly valuable fish with a vast global market. RFMOs split management of this species into geographic areas. Governing the Atlantic Ocean since 1969 is the International Commission for the Conservation of Atlantic Tunas (ICCAT). In 1993, the Indian Ocean Tuna Commission (IOTC) and the Commission for the Conservation of Southern Bluefin Tuna (CCSBT) were established. They are responsible for the management of tuna and tuna-like species in the Indian Ocean and for the southern bluefin tuna throughout its distribution, respectively. Membership in one RFMO does not preclude membership in another with a focus on a different species or geography. South Africa, for example, is an active member of all three tuna-related RFMOs.'
          },

          {
            tag: 'p',
            html: 'Some RFMOs have much broader mandates. The Commission for the Conservation of Antarctic Marine Living Resources (CCAMLR) was established in 1982. The South East Atlantic Fisheries Organization (SEAFO) is an intergovernmental fisheries science and management body with the primary purpose of ensuring the long-term conservation and sustainable use of all living marine resources in the southeast Atlantic Ocean as well as the environment and marine ecosystems in which the resources occur. The objectives of the South Indian Ocean Fisheries Agreement (SIOFA) are to ensure the long-term conservation and sustainable use of fishery resources including fish, mollusks, crustaceans, and other species and to promote the development of sustainable fisheries. This agreement, which entered into force in 2012, signals increasing understanding of the interconnectedness of marine resources and their importance to the sustainable development of coastal economies.'
          },
          {
            tag: 'p',
            html: 'Without decades of significant international cooperation, fish stocks and other marine resources off the African coast would be at far greater risk of decimation than they are today. Thanks to RFMOs and their member states, fishing on the high seas is not a free-for-all without any state accountability. Fishing, particularly of tuna, is a highly regulated commercial activity. RFMOs are a triumph of the international community, demonstrating how states from around the world can work together to build mutually beneficial regulatory systems.'
          },
          {
            tag: 'links',
            items: [{
              org: '<sup>5</sup> Gertjan de Graaf and Luce Garibaldi, “The Value of African Fisheries,” FAO Fisheries and Aquaculture Circular No. 1093 (2014): 3.',
              url: 'http://www.fao.org/3/a-i3917e.pdf'
            }, ]
          }
        ] // end of els array
      },
      { // Card 4
        title: 'Yaoundé Process',
        menu: 'Yaoundé Process',
        metadata: {
          owner: 'Jay Benson',
          description: 'How the zones and regional centers are set up, describe patrols and success.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          translate: [],
          extent: [
            [],
            []
          ],
          highlights: [],
          tooltip: true,
          load: function(index, file) { // ### *** This only should be for the first card ...

            var layer = 'card-' + index + '-layer';

            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            var yaounde = issueAreaData[issueArea].metadata.countryData;

            yaounde.forEach(function(country, i) {
              //  console.log(country);
              var cat = country.ia2c3 - 1;
              if (cat >= 0) {
                //  console.log(country.ia2c3);
                d3.selectAll('.country.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('fill', colorBrew[cat][0])
                  .style('stroke', colorBrew[cat][1]); // ### what colors??
                //  .style('stroke', 'white');

                d3.selectAll('.eez.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('stroke', colorBrew[cat][0]); // ### what colors?? Also EEZ opacity is meh ...
                //    .style('opacity', '0.5')
                //  .style('stroke', 'white');
              }
            });

          }
        },
        els: [{
            tag: 'h1',
            text: 'Yaoundé Process',
          },
          {
            tag: 'caption',
            text: 'A model for regional maritime security cooperation'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<p>Yaoundé Code of Conduct multi-national level information sharing zones:</p><div class="brew-00 legend-entries light">Zone A</div><br /><div class="brew-10 legend-entries light">Zone D</div><br /><div class="brew-20 legend-entries light">Zone E</div><br /><div class="brew-30 legend-entries light">Zone F</div><br /><div class="brew-40 legend-entries light">Zone G</div><br />'
          },
          //###Insert Graphic: There is a graphic below called information sharing in West Africa I would like to try and use that, but I am not sure if that is possible in the web format. If not we can use that as an image within the card. In that case I think it would be good to have a map zoomed into west/central Africa with two components. First is a shaded map with ECOWAS countries in one color and ECCAS countries in another and corresponding labels. The second would be points which show the centers for the ICC, CRESMAC and CRESMAO. All country lists, labels and GPS coordinates will be in the excel file I will send.
          {
            tag: 'p',
            html: 'In response to the rising threat of piracy and other forms of maritime crime, states and regional institutions in the Gulf of Guinea (GoG) developed the Yaoundé process, a series of regional arrangements which provide for enhanced cooperation in the area of maritime security.'
          },
          {
            tag: 'p',
            html: 'The central agreement of the Yaoundé process is the Yaoundé Code of Conduct (YCoC). The YCoC was agreed to in 2013 by 25 states in West and Central Africa. The agreement outlines commitments for combating maritime crime, and proposed the creation of the Interregional Coordination Centre (ICC), the institution responsible for overseeing the implementation of the objectives laid out in the YCoC. The subsequent Yaoundé Memorandum of Understanding lays out the organizational structure of the ICC.'
          },
          {
            tag: 'img',
            src: '../../assets/international-cooperation/information-sharing-in-West-Africa.png', // This should be on the Stable Seas Deck - comments
          },
          {
            tag: 'p',
            html: 'The ICC coordinates activities for the entire GoG between two regionally based centers, the Regional Center for Maritime Security in Central Africa (CRESMAC) and the Regional Center for Maritime Security in West Africa (CRESMAO). The structure is then further divided into five zones (three in CRESMAO and two in CRESMAC) of three to five states, each with its own Multinational Maritime Coordination Center (MMCC).'
          },
          {
            tag: 'p',
            html: 'The Yaoundé process takes a comprehensive approach to maritime security, identifying 12 different forms of maritime crime in the YCoC. The process provides a structure for enhancing all-around maritime security in the GoG through regional information-sharing, capacity building, and coordination of multinational maritime security operations. By improving the sharing of information regarding emerging and ongoing threats and ensuring that regional maritime security actors have the institutional and logistical arrangements in place for multinational operations, the region can better respond to the transnational nature of maritime crime.'
          },
          {
            tag: 'p',
            html: 'The Yaoundé process is still early in its development. Key steps need to be taken to build the capacity of not only state maritime security forces, but also of CRESMAC, CRESMAO, and the MMCCs. That said, the Yaoundé process has several characteristics which may make it a valuable model for the coordination of regional maritime security.'
          },
          {
            tag: 'p',
            html: 'The first aspect is its comprehensiveness. The process recognizes the interconnected nature of various forms of maritime crime and puts forward priorities for combating each. A focus on a single, high-visibility issue risks ignoring other crimes such as maritime pollution or illegal, unreported, and unregulated fishing which have significant, long-term effects on the economic and social wellbeing of a region.'
          },
          {
            tag: 'p',
            html: 'The process also makes use of existing regional institutions such as the Economic Community of West African States (ECOWAS) and the Economic Community of Central African States (ECCAS). By building upon these established institutions, the ICC can leverage existing relationships with individual states and the larger African Union system, gaining some level of access to their resources and enhancing its sustainability beyond a period of particular insecurity or the decline of an individual maritime threat.'
          },
          {
            tag: 'p',
            html: 'Though the Yaoundé process is still young and many of the functions envisioned within it still need to be developed, it may serve as a useful model for regions that have a large number of states to coordinate to refer to in confronting a variety of transnational maritime security threats.'
          },
          //###Insert video, quote, and image
        ] // end of els array
      },
      { // Card 5
        title: 'East Africa',
        menu: 'East Africa',
        metadata: {
          owner: 'Jay Benson',
          description: 'Multilateralism off the horn of Africa.'
        },
        map: {
          scale: [],
          classes: '',
          //path: '../../data/international-cooperation/irtc.json',
          //    extent: [[38,2],[71,21]], // ### is this the right zoom level?
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, file) { // ### *** This only should be for the first card ...

            var layer = 'card-' + index + '-layer';

            d3.select('.card-eez-layer')
              .classed(layer, true);

          },
          switch: function(index) {

            var dcoc = issueAreaData[issueArea].metadata.countryData;

            dcoc.forEach(function(member, i) {
              if (member.ia2c4 == 1) {
                d3.selectAll('.country.' + member.iso3)
                  .classed('active', true)
                  .transition().delay(i * 10)
                  .style('fill', function() {
                    return rampColor(0.5);
                  })
                  .style('stroke', function() {
                    return rampColor(1);
                  });

                d3.selectAll('.eez.' + member.iso3)
                  .classed('active', true)
                  .transition().delay(i * 10)
                  //  .style('fill', function () {return rampColor(0.1);})
                  .style('stroke', function() {
                    return rampColor(1);
                  })
                  .style('stroke-width', '2px');
              }
            });

            d3.selectAll('.card-' + index + '-layer')
              .classed('invisible', false);

          }
        },
        els: [{
            tag: 'h1',
            text: 'East Africa',
          },
          {
            tag: 'caption',
            text: 'An emerging cross-continental consensus'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Highlighted countries are sub-Saharan members of the Djibouti Code of Conduct</em>.'
          },
          //##Insert Map: Similar to above it would be great to use the East African Info sharing image below. If not, it would be great to have all of the DCoC countries highlighted as well as the location of the information exchange centers. The excel file will have all the countries, labels for information sharing centers and corresponding coordinates.
          {
            tag: 'p',
            html: 'In the mid- to late 2000s, the Western Indian Ocean was the setting for the world’s most high-profile maritime security crisis. In a matter of a few years, piracy grew from a nascent criminal enterprise to a mature industry which was seizing cargo ships and tankers far out into the ocean. In response, states agreed to the Djibouti Code of Conduct (DCoC) in an effort to enhance cooperative regional maritime security.'
          },
          {
            tag: 'p',
            html: 'Twenty countries signed the DCoC in 2009, including all the 10 countries bordering the Indian Ocean studied in this report. The agreement was further strengthened in 2010 with the establishment of an international trust fund financed by donor states in order to build regional capacity and implementation of the agreement.<sup>6</sup> In January 2017, signatory states agreed to the Jeddah Amendment to the DCoC which expanded the scope of maritime crimes to be addressed and incorporated efforts to build the Blue Economy.<sup>7</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/international-cooperation/EastAfricaInfoSharingMap-01.png', // This should be on the Stable Seas Deck - comments
          },

          {
            tag: 'p',
            html: 'The DCoC’s primary tools for addressing these threats thus far have been regional capacity building and information sharing. Toward these ends, the agreement lays out plans for signatories to exchange ship riders and other maritime law enforcement officials and establishes National Focal Points for each signatory as well as three multinational information exchange centers. These information exchange centers are based in Sana’a, Mombasa, and Dar es Salaam, and lead coordination efforts among northern, central, and southern groupings of signatory states respectively. In addition, the DCoC places a premium on <a class="maritime-enforcement inline" href="../../maritime-enforcement#1">maritime domain awareness</a>, and efforts are being made in conjunction with a variety of international partners across the Western Indian Ocean to put in place additional automatic identification and radar systems in order to provide regional maritime security forces with a clearer picture of their operating environment.'
          },
          {
            tag: 'p',
            html: 'The DCoC has had some success in countering piracy and armed robbery in the Western Indian Ocean. However, the Jeddah Amendment changes the scope of the agreement to include cooperation on a wider range of maritime crimes and governance. It is yet to be seen if the DCoC can be effective in addressing this larger issue area. If it is to meet this new challenge, it will have to overcome several other challenges first.'
          },
          {
            tag: 'p',
            html: 'Most of the challenges presented by this change of scope are due to the DCoC’s origin as a response to the dramatic increase in piracy. The urgency of the situation meant that signatory states were eager to cooperate to address the pressing security threat, but it is yet to be seen if there is sufficient political will to pivot toward a broader framework for cooperative maritime governance. The urgent nature of its formation also means that the DCoC is not rooted in existing regional organizations such as the Intergovernmental Authority on Development. This means DCoC efforts cannot utilize the broader resources and political leverage of such organizations. Finally, if the DCoC is to realize the expanded objectives of the Jeddah Amendment, it will need to establish a sustainable source of funding. As the threat of piracy in the Western Indian Ocean becomes an increasingly distant memory, fewer and fewer donors are likely to prioritize giving to the DCoC’s trust fund. Without a sustainable source of funding, implementing  the expanded agenda will be extremely difficult.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>6</sup> “Project Implementation Unit,” International Maritime Organization, accessed 25 August 2017,',
                url: 'http://www.imo.org/en/OurWork/Security/PIU/Pages/Project-Implementation-Unit.aspx'
              },
              {
                org: '<sup>7</sup> “Regional Maritime Piracy Agreement Broadened to Cover Other Illicit Maritime Activity,” International Maritime Organization, 13 January 2017,',
                url: 'http://www.imo.org/en/mediacentre/pressbriefings/pages/4-dcoc-widened.aspx'
              },
            ]
          },
          //###Insert graphics
        ] // end of els array
      },
      { // Card 6
        title: 'Operation Copper',
        menu: 'Operation Copper',
        metadata: {
          owner: 'Jay Benson',
          description: 'Multinational anti-piracy efforts in the Mozambican straits.'
        },
        map: {
          scale: [],
          path: '../../data/international-cooperation/south-indian-piracy.csv',
          classes: '',
          translate: [],
          extent: [
            [30, -40],
            [100, 10]
          ],
          highlights: [],
          tooltip: true,
          load: function(index, csv) { // ### *** This only should be for the first card ...

            var layer = 'card-' + index + '-layer';
            d3.csv(csv, function(vals) {
              vals.forEach(function(d) {
                d.lat = +d.lat;
                d.lon = +d.lon;
                d.weight = +d.weight;
              });

              var copper = mapg.append('g')
                .classed('card-layer copper-incidents invisible ' + layer, true);

              copper.selectAll('circle')
                .data(vals).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', '3px')
                .style('fill', function(d, i) {
                  return rampColor(i / vals.length);
                })
                // .style('fill-opacity', function (d, i) {
                //   return i / vals.length;                // ### this doesn't communicate what it is meant to . . . maybe different colors for different years ??
                // })
                .classed('copper-incident', true);
            })

          },
          switch: function(index) {
            d3.selectAll('.card-' + index + '-layer')
              .classed('invisible', false);

          }
        },
        els: [{
            tag: 'h1',
            text: 'Operation Copper',
          },
          {
            tag: 'caption',
            text: 'Neighbors help neighbors fight pirates'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Points indicate the coordinates of West Indian Ocean piracy-related incidents reported by the International Maritime Organization south of the equator, 2006 - 2016. Lighter points represent older events</em>.'
          },
          //###Insert map: Zoom into Mozambique channel and color all the EEZs differently. I feel like that might help convey the complexity of different jurisdictions in the channel
          {
            tag: 'p',
            html: 'The rise of piracy off the coast of Somalia catalyzed several high-profile efforts by international actors to <a class="piracy inline" href="../../piracy#2">protect shipping and improve maritime security in the region</a>. It also drove a lesser-known regional operation aimed at stopping the southward spread of piracy into the Mozambique Channel.<sup>8</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/international-cooperation/south-africa-281265_1920.jpg',
            alt: 'South African naval vessels are integral not only to counter-piracy, but also to long-term maritime security.',
            caption: 'South African naval vessels are integral not only to counter-piracy, but also to long-term maritime security.'
          },
          {
            tag: 'p',
            html: 'The threat of increased piracy in the channel threatened the economic and security interests of regional states and the wider international community. The channel is a key transit area for maritime shipping, particularly for South African trade, and the site of major oil and gas reserves which have drawn investment from multinational energy firms.<sup>9</sup> Fears of piracy’s spread to the channel were confirmed in December 2010 when there were several piracy incidents off the coast of Mozambique.<sup>10</sup>'
          },
          {
            tag: 'p',
            html: 'In response to these threats, South Africa spearheaded Operation Copper in 2011.<sup>11</sup> The agreement allowed South African naval vessels to conduct patrols in Mozambican waters, and also conduct multinational training, intelligence gathering, and information sharing. Tanzania later joined and left the operation. The presence of South African frigates, offshore patrol vessels, and air assets greatly increased both <a class="maritime-enforcement inline" href="../../maritime-enforcement#2">maritime domain awareness</a> (MDA) and the assets available to counter piracy in the channel. The operation has been successful in this mission. In April of 2012, a South African naval resupply vessel that was deployed as part of Operation Copper assisted international forces in searching down and arresting seven pirates.<sup>12</sup> These counterpiracy operations are valuable in and of themselves, but even more important to the long-term maritime security of the region are Operation Copper’s maritime domain awareness and capacity-building components.'
          },
          {
            tag: 'p',
            html: 'Operation Copper is a valuable model for intra-regional cooperation and capacity building, though there may be limited opportunities to replicate its success in the near future. From the perspective of national interests, it makes sense for states to attempt to cooperate with and improve the maritime security capacities of their immediate neighbors. Threats to maritime security such as piracy, trafficking, and IUU fishing are fluid and can easily spill across long, difficult-to-monitor maritime boundaries. As such, improving the maritime security of one’s neighbors serves to protect a state’s own maritime space before those same forms of maritime crime spread into one’s own waters.'
          },
          {
            tag: 'p',
            html: 'However, replicating the success of Operation Copper will be fairly difficult. Simply put, there are few maritime security forces in the region with the capacity to maintain robust security in their own maritime spaces while simultaneously sustaining patrols in a neighbor’s waters. Operation Copper has become expensive and difficult to maintain even for the South African Navy.<sup>13</sup>  What may serve a similar purpose at a lower cost is to increase bilateral training and shared MDA efforts. Such an approach would build cooperation between adjacent forces and increase awareness about the potential spread of maritime security threats without incurring the costs of long-range patrols.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>8</sup> Louis Bergeron, “The Forgotten Chokepoint: The Mozambique Channel’s Rich Past and Bright but Uncertain Future,” Center for International Maritime Security, 25 December 2014,',
                url: 'http://cimsec.org/forgotten-chokepoint-mozambique-channels-rich-past-bright-insecure-future/14071'
              },
              {
                org: '<sup>9</sup> Borges Nhamire, “Eni Finalizes $7 Billion Mozambique Gas Project Investment,” <em>Bloomberg</em>, 1 June 2017,',
                url: 'https://www.bloomberg.com/news/articles/2017-06-01/eni-finalizes-7-billion-investment-in-mozambique-gas-project'
              },
              {
                org: '<sup>10</sup> Guy Martin, “Operation Copper Now Only with SA and Mozambique,” <em>DefenceWeb</em>, 20 March 2014,',
                url: 'http://www.defenceweb.co.za/index.php?option=com_content&view=article&id=34071:operation-copper-now-only-with-sa-and-mozambique&catid=108:maritime-security'
              },
              {
                org: '<sup>11</sup> “South Africa and Mozambique Join Forces to Fight Piracy,” <em>BBC</em>, 2 June 2011,',
                url: 'http://www.bbc.com/news/world-africa-13628132'
              },
              {
                org: '<sup>12</sup> South African Navy Helps Catch Pirates,” <em>DefenceWeb</em>, 23 April 2012,',
                url: 'http://www.defenceweb.co.za/index.php?option=com_content&view=article&id=25142:south-african-navy-helps-catch-pirates&catid=108:maritime-security&Itemid=233'
              },
              {
                org: '<sup>13</sup> Dean Wingrin, “Operation Copper Stretching SA Navy,” <em>DefenceWeb</em>, 26 March 2015,',
                url: 'http://www.defenceweb.co.za/index.php?option=com_content&view=article&id=38541:operation-copper-stretching-sa-navy&catid=111:sa-defence&Itemid=242'
              },
            ]
          },
          //###Insert Map and Graphics
        ] // end of els array
      },
      { // Card 7
        title: 'African Union Efforts',
        menu: 'AU Efforts',
        metadata: {
          owner: 'Jay Benson',
          description: 'Move to comprehensive continental strategy.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, csv) { // ### *** This only should be for the first card ...

            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);

          },
          switch: function(index) {
            var lome = issueAreaData[issueArea].metadata.countryData;

            lome.forEach(function(country, i) {
              //  console.log(country);
              if (country.ia2c6 == 1) {
                d3.selectAll('.eez.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('stroke', function() {
                    return rampColor(1);
                  });

                d3.selectAll('.country.' + country.iso3)
                  .classed('active', true)
                  .transition()
                  .delay(i * 10)
                  .style('stroke', function() {
                    return rampColor(1);
                  })
                  .style('fill', function() {
                    return rampColor(0.5);
                  });
              }
            });
          }
        },
        els: [{
            tag: 'h1',
            text: 'African Union Efforts',
          },
          {
            tag: 'caption',
            text: 'An ambitious plan for governing African waters'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Highlights represent sub-Saharan countries that have signed the African Union\'s Lomé Charter</em>.'
          },
          //###Insert Map: This one is tough. Do you think it would be possible to recalculate the scores in the enforcement section but based on the AU’s five regions (only 4 of which are relevant to SSA)? I think it could be interesting for getting an idea of what larger regions in SSA have the capacity to really improve governance towards AIMS
          {
            tag: 'p',
            html: 'In January of 2014, the African Union (AU) adopted Africa’s Integrated Maritime Strategy (AIMS).<sup>14</sup>  AIMS was created with the goals of providing a framework for enhanced governance in Africa’s maritime domain, developing a platform for shared maritime policy, and facilitating the development of the <a class="blue-economy inline" href="../../blue-economy">Blue Economy</a>. Implementation of the ambitious strategy will be challenging, but the economic, security, and governance ramifications of its success have the potential to transform the African maritime space.'
          },
          {
            tag: 'p',
            html: 'Like maritime spaces around the world, the African maritime domain has been confronted with a variety of security and governance challenges from <a class="piracy inline" href="../../piracy">piracy</a> to <a class="maritime-mixed-migration inline" href="../../maritime-mixed-migration">human trafficking</a> and <a class="maritime-enforcement inline" href="../../maritime-enforcement#2">waste dumping</a> to <a class="fisheries inline" href="../../fisheries#1">IUU Fishing</a>. AIMS was created as an effort to build a comprehensive, unified set of maritime policies designed to address these challenges and thereby develop the Blue Economy. AIMS is wide-ranging, addressing issues of economic development, environmental protection, maritime crime, disaster management, and maritime law, to name a few.<sup>15</sup>'
          },
          {
            tag: 'p',
            html: 'The document serves as a vision of shared policy. But if it is to become reality, there is still a tremendous amount of work to be done. Coordinated efforts will need to be made in the areas of:'
          },
          {
            tag: 'ul',
            rows: ['Developing political will. AIMS suggests several areas in which domestic laws regarding maritime governance should be synchronized and even puts forward the concept of a Combined Exclusive Maritime Zone of Africa. This level of integration on maritime policy will require substantial political will and the resolution of Africa’s ongoing maritime boundary disputes.', 'Data collection and research. There is a dearth of data and basic research on many maritime issues in Africa. AIMS identifies rectifying this gap as being key to the formation of empirically informed policies.', 'Infrastructure and equipment. In order to implement AIMS, states and other actors in the region will need to significantly upgrade equipment and infrastructure necessary for maritime governance such as patrol vessels, port facilities, and remote sensing systems which enhance maritime domain awareness.', 'In addition to having the necessary physical equipment, African actors will need to train a population of maritime professionals in skillsets such as fisheries management, navigation, and maritime law.']
          },
          {
            tag: 'p',
            html: 'Perhaps the best way to ensure the success of AIMS would be to establish an institutional home for efforts toward its implementation. The AU currently has no office or department focused exclusively on its maritime initiatives. The establishment of a well-resourced and politically influential entity to oversee these efforts would greatly improve AIMS implementation.'
          },
          {
            tag: 'p',
            html: 'The ramifications of full implementation of AIMS make tackling these formidable challenges worth the effort. Successful AIMS implementation has the potential to drastically improve maritime security and governance and unlock the potential of Africa’s Blue Economy.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>14</sup> “African Maritime Action Plan Adopted,” <em>Maritime Executive</em>, 2 February 2014.',
                url: 'http://www.maritime-executive.com/article/African-Maritime-Action-Plan-Adopted-2014-02-02'
              },
              {
                org: '<sup>15</sup> “2050 Africa’s Integrated Maritime Strategy,” African Union, 2012, Version 1.0.',
                url: 'http://cggrps.org/wp-content/uploads/2050-AIM-Strategy_EN.pdf'
              },
            ]
          },
          //###Insert image, video, and quote
        ] // end of els array
      },
      { // Card 8
        title: 'A Global Effort',
        menu: 'A Global Effort',
        metadata: {
          owner: 'Curtis Bell',
          description: 'A Global Effort'
        },
        map: {
          scale: [],
          classes: 'card-8-layer',
          translate: [],
          highlights: null,
          load: function(index, file) { // ### *** This only should be for the first card ...
            // Color EEZ according to master Stable Seas index
            var layer = 'card-' + index + '-layer';

            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            var values = issueAreaData[issueArea].metadata.countryData;

            values.forEach(function(row, i) {
              if (row.ia2c7 == 1) {
                d3.selectAll('.country.' + row.iso3)
                  .classed('active', true)
                  .transition().delay(i * 10)
                  .style('fill', rampColor(0.5))
                  .style('stroke', rampColor(1));



                d3.selectAll('.eez.' + row.iso3)
                  .classed('active', true)
                  .transition().delay(i * 10)

                  .style('stroke', rampColor(1));
              }

            })
            //  switchMainIndex(0);
          }
        },
        els: [{
            tag: 'h1',
            text: 'A Global Effort'
          },
          {
            tag: 'caption',
            text: 'How global partners complement Africa\'s maritime security strategies'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Highlighted countries are party to the Convention for the Suppression of Unlawful Acts against the Safety of Maritime Navigation.</em>'
          },
          {
            tag: 'p',
            html: 'African maritime governance is of material interest to stakeholders well beyond the African continent. International institutions, non-African states, and private stakeholders are important participants in the global effort to improve sub-Saharan maritime security.'
          },
          {
            tag: 'img',
            src: '../../assets/international-cooperation/EUCAP-NESTOR-Djibouti-joint-training.jpg', // This should be on the Stable Seas Deck - comments
            alt: 'Command exercise, Crew of EU Naval Force frigate FGS Augsburg, police officers with EUCAP NESTOR and Djibouti Navy. Photo credit: European Union Naval Force',
            caption: 'Command exercise, Crew of EU Naval Force frigate FGS Augsburg, police officers with EUCAP NESTOR and Djibouti Navy. Photo credit: European Union Naval Force'
          },

          {
            tag: 'p',
            html: 'UN organizations play a very valuable role, primarily through the <a href="https://www.unodc.org/unodc/en/piracy/index_new.html" target="_blank">UN Office on Drugs and Crime (UNODC)</a> and the <a href="http://www.imo.org/en/Pages/Default.aspx" target="_blank">International Maritime Organization (IMO)</a>. The UNODC seeks to build national capacities for maritime law enforcement through the Global Maritime Crime Program, which, for example, is working with the Federal Government of Somalia to build the nascent state justice system. IMO does a variety of work, much of it focused on maritime law and the building of regional maritime institutions.'
          },
          {
            tag: 'p',
            html: 'Regional bodies also play an important role. The EU, for example, has three different programs in the realm of African maritime governance and security. The Program to Promote Maritime Security is EU-funded but implemented by regional institutions. It seeks to counteract piracy and crime in the Western Indian Ocean by building local maritime security capacity and undermining the root causes of these activities. Similarly, EUCAP Somalia builds capacity through providing training in relevant skillsets. Additionally, EU NAVFOR has deployed European naval vessels to protect vital shipping routes threatened by the rise of piracy off the Somali coast.'
          },
          {
            tag: 'p',
            html: 'More purpose-specific coalitions also contribute. Maritime Domain Awareness for Trade—Gulf of Guinea, an initiative of the French and British navies, serves as a maritime information-sharing center in the Gulf of Guinea, helping to mitigate the general lack of maritime domain awareness in African waters. The Combined Maritime Forces is another multilateral initiative comprised of 31 states which patrols the Western Indian Ocean on counter-piracy and counter-terrorism missions.'
          },
          {
            tag: 'p',
            html: 'Finally, individual states can also partner with local actors to improve maritime security. U.S. Naval Forces Africa provides training to African maritime security forces and puts on <a class="maritime-enforcement inline" href="../../maritime-enforcement#4">annual naval exercises</a> aimed at improving regional interoperability. Similarly, the French ASECMAR project supports reform of maritime security institutions in the Gulf of Guinea.'
          },
          {
            tag: 'p',
            html: 'This is by no means an exhaustive list. Across the globe, individual states, civil society workers, multilateral institutions, business associations, academics, security professionals, and a host of others are collaborating to help address the complex security and governance challenges faced in African waters.'
          },
          //###Insert images, videos, and quotes
        ]
      },

      //   ]
      // }
    ] // End of cards array
  },
  ruleOfLaw: {
    metadata: { // Independent data source for each page
      version: '0.0.2',
      name: 'Rule of Law',
      updates: true,
      /*
           here is where you write updates
           do one line per update, like
           added legend to card 3
           added citations to card 5
           input thumbnail path to card 4
           loaded point data

           */
      index: 3, //Issue Area #3, index 2...

      code: 'ruleOfLaw',
      countryData: [],
      csv: '../../data/rule-of-law/ruleOfLaw.csv',
      path: 'rule-of-law',
      color: '#6E497E',
      order: -1,
      description: 'Where the rule of law is strong, governments can be confident that legal efforts to address maritime crime and violence will yield results.'
    },
    load: function(csv, callback) {
      // Load index value data from CSV - page-wide data!
      d3.csv(csv, function(vals) {
        vals.forEach(function(d) {
          d.ia3c0 = +d.ia3c0;
          d.ia3c1 = +d.ia3c1;
          d.ia3c2 = +d.ia3c2;
          d.ia3c3 = +d.ia3c3;
          d.ia3c5 = +d.ia3c5;
        });
        issueAreaData[issueArea].metadata.countryData = vals; // Master data load - csv file into 'data' object
        callback('hey this is the csv callback');
      });
    },
    cards: [{ // Card 0
        title: 'Rule of Law',
        menu: 'Rule of Law',
        metadata: {
          owner: 'Curtis Bell',
          description: 'Introduce the issue.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, csv) { // ### *** This only should be for the first card ...
            // Class EEZ with card-0-layer to enable switch() method
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

            var values = issueAreaData[issueArea].metadata.countryData;

            var valsArr = [];

            values.forEach(function(row, i) {
              valsArr.push(row.ia3c0);
            });

            var max = d3.max(valsArr);
            var min = d3.min(valsArr);
            var range = max - min;

            values.forEach(function(row, i) {
              d3.selectAll('.eez.' + row.iso3)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('fill', rampColor(1 - ((row.ia3c0 - min) / range)))
                .style('stroke', rampColor(1));
            });
          }
        },
        els: [{
            tag: 'h1',
            text: 'Rule of Law',
          },
          {
            tag: 'caption',
            text: 'Addressing the legal finish'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Lighter shades indicate countries with a better Corruption Perceptions Index score. <br />Source: <a href="https://www.transparency.org/" target="_blank">Transparency International</a></em>'
          },
          {
            tag: 'p',
            html: 'To achieve lasting maritime security and good maritime governance, countries must have officials and institutions that reliably enforce government policy. Where these structures are undermined by corruption, inefficiency, and discriminatory practices, legal efforts to improve maritime security will have little effect.'
          },
          // { tag: 'h3',
          //   text: 'The Rule of Law Scores'
          // },
          // {tag: 'indexTable'
          // },
          // { tag: 'caption',
          //   text: 'Note: scores are rounded to the nearest whole number.'
          // },
          // { tag: 'p',
          //   html: 'Our Rule of Law score considers five factors: corruption, government efficacy, government efficiency, judicial integrity, and inclusive governance. This year’s scores reveal strong governments across the region, though there are significant areas of concern in the southern Gulf of Guinea and the Horn of Africa. For more information about how these scores are calculated, please see our <a class="rule-of-law inline internal-ref" data-link="5">Methodology</a> page.'
          // },
          {
            tag: 'p',
            html: 'Where the rule of law is strong, governments can be confident that legal efforts to address maritime crime and violence will yield results. These states can establish effective bodies to regulate industries like fishing and hold bureaucrats accountable for faithfully implementing policy. Such states are often better at monitoring and reporting so that policies can be reviewed and improved.'
          },
          {
            tag: 'p',
            html: 'Countries with weak rule of law suffer from a disjuncture between policy and practice. Efforts to improve maritime security are impeded by poor norms and reporting structures, and this provides opportunities for corruption, bribe-seeking, and illicit economic activity. Additionally, these states lack the ability to effectively review, amend, and enforce new policies.'
          },
        ] // end of els array
      }, // End of first element of cards object
      // Card 1
      {
        title: 'Fighting Corruption',
        menu: 'Fighting Corruption',
        metadata: {
          owner: 'Curtis Bell',
          description: 'Corruption remains high, but efforts like EITI are making meaningful progress. Highlight Nigeria.'
        },
        map: {
          path: './data/main.csv',
          scale: [],
          classes: 'card-eez-layer',
          translate: [],
          //  highlights: ['NGA'],
          load: function(index, js) {
            // Color EEZ according to change in Corruption Perceptions Index
            d3.select('.card-eez-layer')
              .classed('card-' + index + '-layer', true);
          },
          switch: function(index) {
            //  ### We gotta figure out how to depict this with neg and pos values
            var target = 'card-' + index + '-layer';
            var vals = issueAreaData[issueArea].metadata.countryData; // ###
            var valsArr = [];
            var hex = issueAreaData[issueArea].metadata.color;

            var posRamp = d3.interpolateLab('white', hex);
            var negRamp = d3.interpolateLab('white', colorBrew[2][1]);

            vals.forEach(function(d) {
              valsArr.push(d.ia3c1);
            });

            var max = d3.max(valsArr);
            var min = d3.min(valsArr);


            //  console.log(valsArr);
            vals.forEach(function(d, i) {
              if (d.ia3c1 > 0) {
                // positive ramp
                d3.selectAll('.eez.' + d.iso3)
                  .classed('active', true)
                  .transition().delay(i * 0)
                  .style('fill', posRamp((d.ia3c1 / max)));

              } else if (d.ia3c1 <= 0) {
                // negative ramp
                d3.selectAll('.eez.' + d.iso3)
                  .classed('active', true)
                  .transition().delay(i * 0)
                  .style('fill', negRamp((Math.abs(d.ia3c1) / Math.abs(min))));
              }
              //
              // d3.selectAll('.eez.' + d.iso3)
              //   .transition()
              //   .delay(i * 10)
              //   .style('fill', function () {
              //     return rampColor(((d.ia3c1 + Math.abs(min) ) / max));
              //   });
            });

            d3.select('.' + target).classed('invisible', false);
          }
        }, // end of 'map' object
        els: [{
            tag: 'h1',
            text: 'Fighting Corruption'
          },
          {
            tag: 'caption',
            text: 'When dishonesty and bribery undermine legal efforts'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Changes in the Corruption Perceptions Index, 2012-2016. Darker purple countries show improving conditions, while darker red countries show worsening. White-shaded countries saw no change during this period. <br />Source: <a href="https://www.transparency.org" target="_blank">Transparency International</a> </em>'
          },
          {
            tag: 'p',
            html: 'Corruption remains the greatest threat to effective policy implementation in sub-Saharan Africa. It is especially threatening in the maritime domain due to weak state presence, proximity to international borders, and the great concentration of wealth that occurs at important seaports. Where the rule of law is weak, local officials take bribes, profit from selective enforcement of fisheries and environmental regulations, and permit black market trading and trafficking. According to Transparency International, corruption is especially acute in major states like Ghana and South Africa. The good news, however, is that many sub-Saharan countries have made significant progress against corruption over the last five years.'
          },
          {
            tag: 'p',
            html: 'Where the rule of law is weak, local officials take bribes, profit from selective enforcement of fisheries and environmental regulations, and permit black market trading and trafficking. The good news, however, is that many sub-Saharan countries have made significant progress against corruption over the last five years.'
          },
          {
            tag: 'img',
            src: '../../assets/rule-of-law/eiti_members-01.png',
            alt: 'Map of EITI African member states'
          },
          {
            tag: 'caption',
            text: 'These countries are African members of the <a href="https://eiti.org/" target="_blank"> Extractive Industries Transparency Initiative</a>'
          },
          {
            tag: 'h3',
            text: 'Nigeria: Overcoming Corruption in the Oil Industry'
          },
          // { tag: 'p',
          //   html: 'It isn’t coincidental that the countries receiving many of the region’s harshest corruption scores are also the region’s most important offshore oil producers. Unique challenges for this industry, including crude oil theft and opaque processes for licensing and rewarding contracts, hamstring economies that should be among Africa’s strongest. Still, success stories like Nigeria’s show that governments in this region can make considerable progress toward reducing corruption.'
          // },
          {
            tag: 'p',
            html: 'Nigeria, the region’s largest oil producer, was also the first sub-Saharan state to embrace the Extractive Industries Transparency Initiative (EITI) framework. Member states subject themselves to periodic reviews of their extractive industry management and are then held accountable for making progress toward any areas of concern. Following the January 2017 review, Fredrik Reinfeldt, Chair of the EITI Board, said of Nigeria:'
          },
          {
            tag: 'blockquote',
            html: '“Nigeria has repeatedly demonstrated how the EITI process can be used to achieve important, tangible results for its citizens. Swiftly addressing the corrective actions identified through Validation should help Nigeria continue to demonstrate regional leadership and make a full transition to the EITI standard.”<br /><em>- Fredrik Reinfeldt, Chair of the EITI Board</em>',
            source: ''
            //link: '#'       // What about internal references?
          },
          {
            tag: 'p',
            text: 'EITI’s review of 34 aspects of good extractives governance found inadequate progress in only one area (policy on contract disclosure), but found that Nigeria made meaningful or satisfactory strides in areas like public debate, distribution of revenues, and civil society engagement. With further work within this framework, Nigeria will build stronger institutions and deepen norms of good, corruption-free governance.'
          },
          {
            tag: 'p',
            text: 'Approximately half of coastal sub-Saharan states are now participating in the EITI process. Two oil-rich states that have seen the worst trends in corruption, Angola and Equatorial Guinea, are not among them.'
          }
        ]
      }, // End of second  object in cards array
      // Card 2
      {
        title: 'The Perils of Bureaucratic  Red Tape',
        menu: 'Red Tape',
        metadata: {
          owner: 'Curtis Bell',
          description: 'Why is corruption linked to bureaucratic burdens, opportunities for bribery. Highlight firm behavior report.'
        },
        map: {
          path: '../../data/main.csv',
          scale: [],
          classes: 'card-2-layer',
          translate: [],
          highlights: null,
          load: function(index, js) { // ### do we need the 'js' parameter??
            // Color EEZ -- Ease of Trade score
            var layer = 'card-' + index + '-layer';

            d3.select('.card-eez-layer')
              .classed(layer, true); // in the data.issueArea.cards array
          },
          switch: function(index) {
            // Map the Ease of Trade score (WB)
            var target = 'card-' + index + '-layer';
            var vals = issueAreaData[issueArea].metadata.countryData;
            var valsArr = [];

            vals.forEach(function(d) {
              valsArr.push(d.ia3c2);
            });

            var max = d3.max(valsArr);
            var min = d3.min(valsArr);
            var range = max - min;

            vals.forEach(function(d, i) {
              d3.selectAll('.eez.' + d.iso3)
                .transition()
                .delay(i * 10)
                .style('fill', function() {
                  return rampColor(((d.ia3c2 - min) / range)) // ### waiting for data
                });
            })

            d3.select('.' + target).classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'The Perils of Bureaucratic Red Tape'
          },
          {
            tag: 'caption',
            text: 'Bureaucracy and bribe-seeking'
          },
          //###insert corruption infographic from Andrea
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Lighter shades indicate lower barriers and restrictions on international trade <br> Source: <a href="https://www.doingbusiness.org/" target="_blank">2017 World Bank Doing Business Report</a></em>'
          },
          {
            tag: 'p',
            html: 'To effectively fight corruption and curtail bribe-seeking, states can review their bureaucracies and eliminate points where these activities are most likely to occur. Seaports should be a focal point in this search. Because more than 90% of sub-Saharan Africa’s international trade flows through its seaports, port administrators are uniquely positioned to demand bribes, permit illicit economic activity, and undermine good governance. A recent report by <em> The Economist </em> went as far as to call this behavior “onshore piracy.”<sup>1</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/rule-of-law/cross_border_corruption.png',
            alt: 'Pie graph showing African / non-Africa cross-border corruption.',
            caption: 'Source: United Nations Economic Commission for Africa'
          },
          {
            tag: 'p',
            html: 'Where the rule of law is weak, administrative gatekeepers can demand bribes before goods can continue to their next destination. The World Bank estimates that the resulting transit delays cost African economies billions of dollars each year, so it is no surprise that recent anti-graft efforts in Kenya, Tanzania, Mozambique, and elsewhere have resulted in high-profile removals of customs officials and port directors.<sup>2</sup>'
          },
          {
            tag: 'p',
            html: 'Solving this problem will require compliance from both African and non-African actors, as most of this kind of rent-seeking occurs as a transaction between an African recipient and non-African firm. Cooperation from the many multi-national corporations doing business in African seaports will be especially important. A 2016 report <sup>3</sup> from the United Nations Economic Commission for Africa found more than 99% of known cases of cross-border corruption in the region since 1994 involved non-African firms. These cases included simple bribery of port and customs authorities as well as more elaborate illicit financial schemes involving kickbacks, insurance fraud, money laundering, and selective enforcement of trade regulations.'
          },
          {
            tag: 'p',
            html: 'The cross-border corruption occurring in African seaports has detrimental spillover effects for other sectors. Preferential treatment of foreign firms, norms of rent-seeking, and corrupt officials can negatively influence the regulatory environment for domestic businesses that are far removed from international trade.'
          },
          {
            tag: 'img',
            src: '../../assets/rule-of-law/firm-behavior.jpeg',
            alt: 'Firm Behavior in Fragile States',
            caption: 'Firm Behavior in Fragile States by Dr Victor Owuor',
            link: 'http://oefresearch.org/publications/firm-behavior-fragile-states'
          },
          {
            tag: 'p',
            html: 'The recent <em> Firm Behavior in Fragile States </em> report on the issues facing small firms in fragile sub-Saharan economies highlights how excessive bureaucracy and regulation suppress business growth, impose unnecessary “facilitation fees,” and weaken judicial integrity. The report, based on field research in Somaliland, the Democratic Republic of the Congo, and South Sudan, strongly argues that informal non-governmental arrangements like business collectives, sector-specific cooperatives, and public-private partnerships must be part of the solution.'
          },
          {
            tag: 'p',
            html: 'Unless governments can rein in corruption and improve maritime trade governance, it will be difficult for governments, private associations, and institutions to promote a stronger rule of law and healthier business environment.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>1</sup> “Africa’s Ports: The Bottleneck,” The Economist, 19 March 2016.',
                url: 'https://www.economist.com/news/middle-east-and-africa/21695054-new-investment-alone-will-not-fix-africas-ports-governments-need-deal'
              },
              {
                org: '<sup>2</sup> Sandra Sequeria, “Investigating and Tackling Corruption in African Ports,” <em>Research Impact: Making a Difference</em> (The London School of Economics and Political Science, 2015).',
                url: 'http://www.lse.ac.uk/researchAndExpertise/researchImpact/PDFs/Sequeria.pdf'
              },
              {
                org: '<sup>3</sup> UN Economics Commission for Africa, “Measuring Corruption in Africa: The International Dimension Matters,” African Governance Report IV (2016).',
                url: 'https://www.uneca.org/sites/default/files/PublicationFiles/agr4_eng_fin_web.pdf'
              },
            ]
          }
        ]
      }, // End of third object in cards array
      // Card 3
      {
        title: 'Exploiting the Bijagós', //###Bijagos special character
        menu: 'Exploiting the Bijagós', //### Bijagos special character
        metadata: {
          owner: 'Kelsey Soeth',
          description: 'Highlight an area that is under weak state control, poor governance - maybe the Bijagós in guinea-bissau.'
        },
        map: {
          path: '../../data/main.csv',
          scale: [],
          classes: 'card-eez-layer',
          translate: [],
          extent: [
            [-20, 14],
            [-3, 7]
          ], // ### Guinea Bissau
          highlights: ['GNB'], // Guinea Bissau
          load: function(index, js) {
            var layer = 'card-' + index + '-layer';
            // d3.select('.card-eez-layer')
            //   .classed(layer, true)
          },
          switch: function(target) {
            //  ### Need to figure out what this map will look like
            var freedomHouse = issueAreaData[issueArea].metadata.countryData;

            var values = [];

            freedomHouse.forEach(function(row, i) {
              values.push(row.ia3c3);
            });

            var max = d3.max(values),
              min = d3.min(values),
              range = max - min;

            freedomHouse.forEach(function(row, i) {
              d3.selectAll('.eez.' + row.iso3)
                .classed('active', true)
                .style('fill', function() {
                  return rampColor(((row.ia3c3 - range) / (max - min)))
                })

            });
          }
        },
        els: [{
            tag: 'h1',
            text: 'Exploiting the Bijagós' //### Bijagos Special character
          },
          {
            tag: 'caption',
            text: 'Weak local control undermines regional stability'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>The Bijagos are the island group off the coast of Guinea-Bissau.</em>'
          },

          {
            tag: 'p',
            html: 'Weak state control is a particular problem for states with offshore territories, such as Guinea-Bissau. The Bijagós Islands are a group of 88 islands and islets located in the Atlantic Ocean. Only 23 of the islands are inhabited.<sup>4</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/rule-of-law/packets_cocaine_guinea_bissau.jpg', // This should be on the Stable Seas Deck - comments
            alt: 'Packets of seized cocaine at a police station in Guinea-Bissau. Photo: Issouf Sanogo/AFP/Getty Images',
            caption: 'Packets of seized cocaine at a police station in Guinea-Bissau. Photo: Issouf Sanogo/AFP/Getty Images'
          },
          {
            tag: 'blockquote',
            html: '“The greatest fragility we have is the islands, many of them uninhabited, but still the drug traffickers use them as a depot and then transport [the drug] to the continent. On the other hand, even in those that are inhabited the presence of the state is weak, or in some cases nonexistent.” —Mamadu Djalo Pires, Minister of Justice, Guinea-Bissau, 2009; translated<sup>5</sup>', //### need closed brackets around the words "the drug" in this blockquote
            link: 'http://***.org/***' // What about internal references?
          },
          {
            tag: 'p',
            html: 'Since the early 2000s, the isolated and practically autonomous islands have proven an attractive lure for Latin American drug cartels to use as a waystation for <a class="illicit-trade inline" href="../../illicit-trade#2">drug-smuggling operations</a> into Europe and Africa. The large swaths of uninhabited land are physically ideal for hiding drugs and speedboats, and the easy money of harboring drug smugglers is attractive to residents who have little to nothing to fear from a faraway authority with little capacity to enforce the law. The few patrol vessels belonging to Guinea-Bissau are not able to effectively monitor the islands due to their limited resources.<sup>6</sup>'
          },
          {
            tag: 'p',
            html: 'To weaken transnational crime in the Bijagós Islands, Guinea-Bissau will need to continue to improve its offshore communications infrastructure and allocate resources to more effectively patrol its maritime territory. While Guinea-Bissau is ultimately responsible for maintaining the rule of law over the Bijagós Islands, combatting transnational crime requires international partnerships.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>4</sup> Adam Nossiter, "Bijagós, a Tranquil Haven in a Troubled Land," <em>The New York Times</em>, 4 November 2009,',
                url: 'http://www.nytimes.com/2009/11/08/travel/08Bijagos.html?mcubz=1'
              },
              {
                org: '<sup>5</sup> S.A, RTP, Rádio e Televisão de Portugal 2009 LUSA Agência de Notícias de Portugal. “Arquipélago Dos Bijagós Utilizado Como Depósito Dos Narcotraficantes.” Accessed September 28, 2017.',
                url: 'https://www.rtp.pt/noticias/mundo/arquipelago-dos-bijagos-utilizado-como-deposito-dos-narcotraficantes_n302245.'
              },
              {
                org: '<sup>6</sup> Amy Corbin and Ashley Tindall, "Bijagós Archipelago,” Sacred Land Film Project, 1 September 2007,',
                url: 'http://www.sacredland.org/bijagos-archipelago/'
              },
            ]
          }
        ]
      }, // End of fourth  object in cards array
      // Card 4
      {
        title: 'Gender Equality',
        menu: 'Gender Equality',
        metadata: {
          owner: 'Kelsey Soeth',
          guest: 'Our Secure Future',
          description: 'Partner with OSF to talk about inclusion of women, perhaps in national security strategies.'
        },
        map: {
          path: '../../data/main.csv',
          scale: [],
          classes: 'card-4-layer',
          translate: [],
          highlights: null,
          load: function(index, js) {
            // Color map with 'some aspect of inclusion' chloropleth ...
            d3.select('.card-eez-layer')
              .classed('card-' + index + '-layer', true);
          },
          switch: function(index) {
            var target = 'card-' + index + '-layer';
            var vals = issueAreaData[issueArea].metadata.countryData;
            var valsArr = [];
            vals.forEach(function(val) {
              valsArr.push(parseFloat(val.ia3c4));
            });

            var max = d3.max(valsArr);
            var min = d3.min(valsArr);
            var range = max - min;

            vals.forEach(function(d, i) {
              console.log(d.ia3c4);
              d3.selectAll('.eez.' + d.iso3)
                .transition()
                .delay(i * 10)
                .style('fill', function() {
                  return rampColor(1 - ((d.ia3c4 - min) / range));
                });
            });

            d3.select('.' + target)
              .classed('invisible', false);

            //setBGImg();
          }
        },
        els: [{
            tag: 'h1',
            text: 'Gender Equality'
          },
          {
            tag: 'caption',
            text: 'Inclusion of women strengthens the rule of law'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Lighter shades indicate more gender-inclusive political systems. <br> Source: <a href="https://www.v-dem.net/en/" target="_blank">Varieties of Democracy</a></em>'
          },
          {
            tag: 'p',
            html: 'Equal treatment under the law regardless of ethnicity, socioeconomic status, religion, subnational region, or gender is the basis of inclusive governance. Levels of inclusion vary greatly along the sub-Saharan coastline, though many states have made notable progress in this area, especially with regard to greater inclusion of women.'
          },
          {
            tag: 'img',
            src: '../../assets/rule-of-law/NetumboNandi-Ndaitwah_03-2015.jpg', // This should be on the Stable Seas Deck - comments
            alt: 'Deputy Prime Minister of Namibia Netumbo Nandi-Ndaitwah shakes hands with politician Penehupifo Pohamba. Photo: Benutzer:Chtrede',
            caption: 'Deputy Prime Minister of Namibia Netumbo Nandi-Ndaitwah shakes hands with politician Penehupifo Pohamba. Photo: Benutzer:Chtrede'
          },
          {
            tag: 'p',
            html: 'As of 2016, 19 members<sup>7</sup> of the African Union had developed and adopted National Action Plans on Women, Peace, and Security, including several of the top-ranking coastal states included in this analysis. The objective of these National Action Plans is the implementation of UN Security Council Resolution 1325, which calls for increased participation and representation of women at all levels of decision-making in an effort to empower women to participate as equals in preventing conflict and peacebuilding. These agreements do not speak specifically to the role of women in improving maritime governance, but they are an important step toward formalizing women’s inclusion.'
          },
          {
            tag: 'p',
            html: 'Several countries have improved women’s representation through new legislation and development-oriented partnerships with regional and global organizations. Senegal, for example, has been particularly successful at incorporating gender parity into its governance structures.'
          },
          {
            tag: 'p',
            html: 'Following the 2010 adoption of a new law requiring gender parity for candidates for elected positions, women’s participation in local government tripled from 15.9% in 2009 to 47.2% in 2015. Furthermore, 20% of ministerial-level positions were held by women as of 2015. According to the most recent data from the Inter-Parliamentary Union and the World Bank, The Gambia, Ghana, Guinea-Bissau, Namibia, and Nigeria have even higher proportions of women in high-level political positions.<sup>8</sup>'
          },
          {
            tag: 'p',
            html: 'As Sierra Leone emphasized in its national security strategy following its devastating civil war, poverty and a lack of social cohesion are national security threats that require civilian engagement to counter. To this end, Somalia is promoting women’s economic empowerment through a number of fisheries projects by the Food and Agriculture Organization of the United Nations (FAO). These projects include training women boat-builders and adding value to post-harvest fish catches. One community organizer working with the project notes:'
          },
          {
            tag: 'blockquote',
            html: '“It is important to have women involved in these activities since their contributions have a big influence on ensuring stronger household level financial management and food security that will directly benefit their families.”',
            source: 'Ms. Shukri Ahmed Mohamed, community organizer with FAO Somalia<sup>9</sup',
            link: '#'
          },
          {
            tag: 'p',
            text: 'Programs like this, when coupled with equal property and business rights for women, can greatly expand licit opportunities in coastal economies. Equal application of the rule of law across society is necessary for good governance. Whether gender equality is achieved through legislated parity or economic initiatives, the equal application of the rule of law can only help the region achieve peace and security and alleviate poverty.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>7</sup> Semiha Abdulmelik, “Implementation of the Women, Peace, and Security Agenda in Africa,” The African Union Commission, July 2016.',
                url: 'http://www.un.org/en/africa/osaa/pdf/pubs/2016womenpeacesecurity-auc.pdf'
              },
              {
                org: '<sup>8</sup> Ibid.'
              },
              {
                org: '<sup>9</sup> "Promoting Gender in Fisheries Activities in Somalia," Food and Agriculture Organization of the United Nations, accessed 28 August 2017.',
                url: 'http://www.fao.org/blogs/blue-growth-blog/promoting-gender-in-fisheries-activities-in-somalia/en/'
              },
            ]
          }
        ]
      }, // End of fifth  object in cards array

      // // Card 5
      // { title: 'Methodology',
      //   menu: 'Methodology',
      //   metadata: {
      //     owner: 'Curtis Bell',
      //     description: 'Methods.'
      //   },
      //   map: {
      //     scale: [],
      //     classes: 'card-5-layer',
      //     translate: [],
      //     highlights: null,
      //     load: function (index, csv) {  // ### *** This only should be for the first card ...
      //       // Color EEZ according to master Stable Seas index
      //       var layer = 'card-'+index+'-layer';
      //
      //       d3.select('.card-eez-layer')
      //         .classed(layer, true);
      //     },
      //     switch: function (index) {
      //       switchMainIndex(0);
      //
      //       // var target = 'card-'+index+'-layer';
      //       // var vals = data.issueArea.metadata.countryData;
      //       // vals.forEach(function (d, i) {
      //       //   d3.selectAll('.' + d.iso3)
      //       //     .transition()
      //       //     .delay(i * 10)
      //       //     .style('fill', function () { return rampColor(d.ia3c1); });
      //       // });
      //       //
      //       // d3.select('.' + target)
      //       //   .classed('invisible', false);
      //     }
      //   },
      //   els: [
      //     { tag: 'h3',
      //       text: 'Methodology'
      //     },
      //     // { tag: 'legend',
      //     //   text: 'Map Legend',
      //     //   legendContent: '<em>Lighter shades indicate higher Rule of Law scores.</em>'
      //     // },
      //     // { tag: 'p',
      //     //    html: 'The Rule of Law score considers five concepts that are central to good governance: corruption, government efficacy, government efficiency, judicial integrity, and inclusion. We calculate these five scores and then average them across the five areas. We provide an overview of our methodology below and a complete summary in the <a href="../../data" target="_blank">Technical Notes</a>.'
      //     // },
      //     // { tag: 'h4',
      //     //   text: 'Corruption'
      //     // },
      //     // { tag: 'p',
      //     //    html: 'Corrupt officials fail to enforce policy and thus enable transnational crime, and corruption in maritime governance and maritime trade is especially problematic because nearly all of Africa’s international economic activity—both legitimate and illicit—transits the maritime space. Many organizations have created corruption measures already, so we adapt the Corruption Perceptions Index by Transparency International (TI). This measure averages 13 other corruption indicators and scores states on a scale from 0 to 100, with more corrupt countries earning lower scores. TI’s methodology prevents nearly every state from exceeding 80, so we divide each country’s score by 80 to achieve a more reasonable high benchmark.'
      //     // },
      //     // { tag: 'h4',
      //     //   text: 'Government Efficacy'
      //     // },
      //     // { tag: 'p',
      //     //   html: 'Ineffective governments cannot enforce policy, which hinders a state’s ability to secure its maritime space and prevent illicit maritime activities. We measure efficacy by rescaling the Functioning of Government score from Freedom House. This score, published as part of the annual <em> Freedom in the World report </em>, reflects expert responses to questions like “Do non-state actors, including criminal gangs, the military, and foreign governments, interfere with or prevent elected representatives from adopting and implementing legislation and making meaningful policy decisions?” and “Are there independent and effective auditing and investigative bodies that function without impediment or political pressure or influence?”'
      //     // },
      //     // { tag: 'h4',
      //     //   text: 'Government Efficiency'
      //     // },
      //     // { tag: 'p',
      //     //   html: 'Governments that have unnecessary administrative and bureaucratic hurdles provide more opportunities for bribery and corruption, especially as these systems relate to trade, customs, and international migration. Each year, the World Bank gauges government efficiency in several areas, one of which is “Trading Across Borders.” This score is computed from expert estimates of the amount of time and money required to move a standard shipping container into the country. The measure is especially relevant for efficiency in African maritime governance, as the region’s international trade transits almost exclusively through seaports.'
      //     // },
      //     // { tag: 'h4',
      //     //   text: 'Judicial Integrity'
      //     // },
      //     // { tag: 'p',
      //     //   html: 'Judicial integrity is important to the enforcement of existing laws and ensuring that the de jure regulations are de facto conditions. Where judges are bribed and laws go unenforced, the rule of law is too weak for policies aimed at the maritime domain to be effective. We capture this concept using three variables from the Varieties of Democracy Project, a leading dataset on the strength of governance around the world. Specifically, we create a Judicial Integrity score from three measures that score how often (1) the government attacks the judiciary in public, (2) corrupt or inept judges are held accountable and removed from office, and (3) individuals and businesses pay bribes in return for favorable or speedy decisions.'
      //     // },
      //     // { tag: 'h4',
      //     //   text: 'Inclusion'
      //     // },
      //     // { tag: 'p',
      //     //   html: 'We gauge political inclusion with five measures from the Varieties of Democracy Project. These data are collected both globally and annually and they cover unequal treatment of the law according to social group identification (i.e., ethnic groups), subnational region, religion, socioeconomic status, and gender. Note that this is a measure of equal treatment under the law, and not the absolute provision of liberal and transparent governance. Non-democratic states can score well if the law is equally applied across all five of these social divisions.'
      //    }
    ]
  }, // End of sixth  object in cards array
  //  ]    // End of cards array
  //  },      // end of issueArea Object
  maritimeEnforcement: { // Checked out by Sean
    metadata: { // Independent data source for each page
      version: '0.0.1',
      name: 'Maritime Enforcement',
      updates: true,
      /*
           here is where you write updates
           do one line per update, like
           added legend to card 3
           added citations to card 5
           input thumbnail path to card 4
           loaded point data

           */
      index: 4,
      code: 'maritimeEnforcement',
      path: 'maritime-enforcement',
      countryData: [],
      csv: '../../data/maritime-enforcement/maritimeEnforcement.csv',
      color: '#354EA1',
      order: -1,
      description: 'In states where maritime enforcement is employed, smugglers and traffickers cannot operate freely and fisheries laws are enforced.'
    },
    load: function(csv, callback) {
      // Load index value data from CSV - page-wide data!
      d3.csv(csv, function(vals) {
        vals.forEach(function(d) {
          d.ia4c0 = +d.ia4c0;
          d.ia4c1 = +d.ia4c1;
          d.ia4c4 = +d.ia4c4;
        });
        issueAreaData[issueArea].metadata.countryData = vals; // Master data load - csv file into 'data' object
        callback('maritimeEnforcement load csv callback');
      });
    },
    cards: [
      // Card 0
      {
        title: 'Maritime Enforcement',
        menu: 'Maritime Enforcement',
        metadata: {
          owner: 'Curtis Bell',
          description: 'Introduce the issue.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, csv) { // ### *** This only should be for the first card ...
            // Class EEZ with card-0-layer to enable switch() method
            var layer = 'card-' + index + '-layer';
            var l = d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {

            var values = issueAreaData[issueArea].metadata.countryData;
            var valsArr = [];

            values.forEach(function(row, i) {
              valsArr.push(row.ia4c0);
            });

            var max = d3.max(valsArr),
              min = d3.min(valsArr),
              range = max - min;

            values.forEach(function(row, i) {
              d3.selectAll('.eez.' + row.iso3)
                .classed('active', true)
                .style('fill', function() {
                  return rampColor(1 - ((row.ia4c0 - min) / range));
                });

            })
          }
        },
        els: [{
            tag: 'h1',
            text: 'Maritime Enforcement'
          },
          {
            tag: 'caption',
            text: 'Building capacity to enhance maritime governance'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Lighter shades indicate a greater number of coastal patrol vessels Source: 2016 Military Balance Report</em>'
          },
          // { tag: 'legend',
          //   text: 'Map Legend',
          //   legendContent: '<em>Lighter shades indicate greater maritime enforcement capability.<br> <a class="maritime-enforcement inline internal-ref" data-link"7">Methodology</a></em>'
          // },
          {
            tag: 'p',
            html: 'Good maritime governance is not possible without navies and coast guards that are adequate for monitoring territorial waters and exclusive economic zones. Where states are up to this task, smugglers and traffickers cannot operate freely and fisheries laws are enforceable. However, inadequate capacity to govern the maritime space can hamper a country’s efforts to regulate maritime activity and effectively render any maritime legislation irrelevant. Poor capacity in this area provides tempting opportunities for those who seek to profit from the absence of real enforcement of maritime law.'
          },
          // { tag: 'h3',
          //   text: 'The Maritime Enforcement Scores'
          // },
          // {tag: 'indexTable'
          // },
          // { tag: 'caption',
          //   text: 'Note: scores are rounded to the nearest whole number.'
          // },
          // { tag : 'p',
          //   html: 'We conceptualize maritime enforcement capability as being a function of a country’s maritime assets combined with the level of assistance it receives from international partners and the unique geographical attributes of its particular maritime space. More specifically, we derive the subindex score from the following five inputs:  (1) geography of the Exclusive Economic Zone (EEZ), (2) relations with maritime neighbors, (3) coastal patrol assets, (4) an naval capability assessment, and (5) an international assistance assessment. More details can be found on the <a class="maritime-enforcement inline internal-ref" data-link="7">Methodology</a>'
          // },
          //   { tag: 'p',
          //    html: 'Nigeria and South Africa, the only countries in the region with fleets capable of regularly conducting sustained law enforcement operations far from shore, lead the Maritime Enforcement section of the Stable Seas Maritime Security Index. These regional powers are followed by other countries that have invested in maritime enforcement, such as Cameroon, Djibouti, and Kenya, as well as several countries that are short on resources but have relatively small maritime spaces to govern (e.g., The Gambia). The lowest levels of maritime enforcement are found in Somalia, the Southwest Indian Ocean, and off the coasts of Liberia and Sierra Leone.'
          //  }

          {
            tag: 'p',
            html: 'Naval, coastguard, and maritime police capacities in sub-Saharan Africa vary widely. Navies like those of Nigeria and South Africa are comparatively robust, but the gap separating these states from all other coastal sub-Saharan states is quite large.'
          },
          {
            tag: 'img',
            src: '../../assets/maritime-enforcement/global_military_spending-01.png',
            alt: 'Pie graph'
            //caption: 'al estimate.'
          },
          {
            tag: 'p',
            html: 'According to the <a href=\'https://www.iiss.org/-/media/documents/publications/the%20military%20balance/military%20balance%202016/mb2016%20further%20assessments.pdf?la=en.\' target=\'_blank\'>2016 Military Balance report</a>, Nigeria has more than five times as many vessels as any other country in the region. South Africa operates the region’s only submarines and is the only state with the capacity to engage in any kind of naval warfare. The disparity also applies to naval personnel, with the navies of just three countries (Nigeria, South Africa, and the Democratic Republic of the Congo comprising more than 60% of the region’s sailors.'
          },
          {
            tag: 'p',
            html: 'Conversely, the vast majority of sub-Saharan maritime security actors are extremely under-resourced. Liberia has a 50-member coast guard to patrol an EEZ larger than the land area of the United Kingdom. Thirteen states in the region have fewer than ten vessels each with which to provide security to their massive maritime domains, and these tend to be small inshore vessels incapable of providing more than basic coastal patrol operations.'
          },
          {
            tag: 'p',
            html: 'Enforcement capabilities are generally low given the severity of the maritime security threats seen across the region. The thirty sub-Saharan countries covered in this report have approximately 36,000 sailors in total, nearly 10,000 fewer than Japan’s Maritime Self-Defense Force.<sup>1</sup> This lack of capacity is a result of both limited resources and an understandable tendency across the region to focus on land-based security threats. Total sub-Saharan military spending in 2016 was $19.2 billion, just 1.1% of estimated global military spending,<sup>2</sup> despite the presence of several of the globe’s most active conflicts. Given the urgency with which African states must address security threats on shore, a relatively small share of African military spending is available to maintain maritime enforcement capability.'
          },
          {
            tag: 'img',
            src: '../../assets/maritime-enforcement/south_africa_navy_ltcommander_501416590.png',
            alt: 'Lieutenant Commander Zimasa Mabela aboard South African naval vessel. Photo credit: Rodger Bosch/AFP/Getty Images.',
            caption: 'Lieutenant Commander Zimasa Mabela aboard South African naval vessel. Photo credit: Rodger Bosch/AFP/Getty Images.'
          }, //###Insert image
          {
            tag: 'p',
            html: 'Despite this lack of resources, enforcement capacity in the region is steadily improving. The acquisition of additional maritime security assets and the continued development of actors’ human capital through investments in training, capacity building, and <a class="maritime-enforcement inline internal-ref" data-link="5">multilateral exercises</a> is giving regional forces the ability to more actively govern their maritime domains. This has resulted in an increasing number of enforcement operations countering maritime security threats such as <a class="fisheries inline" href="../../fisheries">illegal, unreported, and unregulated (IUU) fishing</a>, <a class="illicit-trade inline" href="../../illicit-trade">illicit trades</a>, and <a class="piracy inline" href="../../piracy">piracy</a>. Continuing to improve the region’s enforcement capacity will require additional resources, training, and regional cooperation.'
          },
          {
            tag: 'img',
            src: '../../assets/maritime-enforcement/bosaaso-port-police.jpg',
            alt: 'Boasasso Port Police. Photo credit: Oceans Beyond Piracy.', // ### Spelling on Bosasso?
            caption: 'Boasasso Port Police. Photo credit: Oceans Beyond Piracy.'
          }, //###Insert image
          {
            tag: 'links',
            items: [{
                org: '<sup>1</sup> Céline Pajon, “Japan’s Coast Guard and Maritime Self-Defense Force: Cooperation among Siblings,” <em>Maritime Awareness Project</em>, December 1, 2016,',
                url: 'http://maritimeawarenessproject.org/2016/12/01/japans-coast-guard-and-maritime-self-defense-force-cooperation-among-siblings/'
              },
              {
                org: '<sup>2</sup> Nan Tian, Aude Fleurant, Pieter D. Wezeman and Siemont T Wezeman, “Trends in World Military Expenditure, 2016,” SIPRI, April 2017, p. 4',
                url: 'https://www.sipri.org/sites/default/files/Trends-world-military-expenditure-2016.pdf'
              },
            ],
          }

        ] // end of els array
      }, // End of first element of cards object
      // Card 1
      // { title: 'Investing in Capacity',
      //   menu: 'Investing in Capacity',
      //   metadata: {
      //     owner: 'Jay Benson',
      //     description: 'Describe the rating system, discuss variation.'
      //   },
      //   map: {
      //     path: '',
      //     scale: [],
      //     classes: 'card-eez-layer',
      //     translate: [],
      //     highlights: [],
      //     load: function (index, file) {
      //       // Color EEZ according to change in Corruption Perceptions Index
      //       d3.select('.card-eez-layer')
      //         .classed('card-' + index + '-layer', true);
      //     },
      //     switch: function (index) {
      //       switchMainIndexInverse(index);
      //     }
      //   },  // end of 'map' object
      //   els: [
      //     { tag: 'h3',
      //       text: 'Investing in Capacity'
      //     },
      //     { tag: 'caption',
      //       text: 'Improving maritime security requires investment in enforcement'
      //     },
      //      { tag: 'legend',
      //        text: 'Map Legend',
      //        legendContent: '<em>Lighter shades indicate a greater number of coastal patrol vessels Source: 2016 Military Balance Report</em>'
      //      },
      //     { tag: 'p',
      //       html: 'Naval, coastguard, and maritime police capacities in sub-Saharan Africa vary widely. Navies like those of Nigeria and South Africa are comparatively robust, but the gap separating these states from all other coastal sub-Saharan states is quite large.'
      //     },
      //     { tag: 'img',
      //       src: '../../assets/maritime-enforcement/global_military_spending.png',
      //       alt: 'Pie graph'
      //       //caption: 'al estimate.'
      //     },
      //     { tag: 'p',
      //       html: 'According to the <a href=\'https://www.iiss.org/-/media/documents/publications/the%20military%20balance/military%20balance%202016/mb2016%20further%20assessments.pdf?la=en.\' target=\'_blank\'>2016 Military Balance report</a>, Nigeria has more than five times as many vessels as any other country in the region. South Africa operates the region’s only submarines and is the only state with the capacity to engage in any kind of naval warfare. The disparity also applies to naval personnel, with the navies of just three countries (Nigeria, South Africa, and the Democratic Republic of the Congo comprising more than 60% of the region’s sailors.'
      //     },
      //     { tag: 'p',
      //       html: 'Conversely, the vast majority of sub-Saharan maritime security actors are extremely under-resourced. Liberia has a 50-member coast guard to patrol an EEZ larger than the land area of the United Kingdom. Thirteen states in the region have fewer than ten vessels each with which to provide security to their massive maritime domains, and these tend to be small inshore vessels incapable of providing more than basic coastal patrol operations.'
      //     },
      //     { tag: 'p',
      //       html: 'Enforcement capabilities are generally low given the severity of the maritime security threats seen across the region. The thirty sub-Saharan countries covered in this report have approximately 36,000 sailors in total, nearly 10,000 fewer than Japan’s Maritime Self-Defense Force.<sup>1</sup> This lack of capacity is a result of both limited resources and an understandable tendency across the region to focus on land-based security threats. Total sub-Saharan military spending in 2016 was $19.2 billion, just 1.1% of estimated global military spending,<sup>2</sup> despite the presence of several of the globe’s most active conflicts. Given the urgency with which African states must address security threats on shore, a relatively small share of African military spending is available to maintain maritime enforcement capability.'
      //     },
      //     { tag: 'img',
      //       src: '../../assets/maritime-enforcement/south_africa_navy_ltcommander.png',
      //       alt: 'Lieutenant Commander Zimasa Mabela aboard South African naval vessel. Photo credit: Rodger Bosch/AFP/Getty Images.',
      //       caption: 'Lieutenant Commander Zimasa Mabela aboard South African naval vessel. Photo credit: Rodger Bosch/AFP/Getty Images.'
      //     }, //###Insert image
      //     { tag: 'p',
      //       html: 'Despite this lack of resources, enforcement capacity in the region is steadily improving. The acquisition of additional maritime security assets and the continued development of actors’ human capital through investments in training, capacity building, and <a class="maritime-enforcement inline internal-ref" data-link="5">multilateral exercises</a> is giving regional forces the ability to more actively govern their maritime domains. This has resulted in an increasing number of enforcement operations countering maritime security threats such as <a class="fisheries inline" href="../../fisheries">illegal, unreported, and unregulated (IUU) fishing</a>, <a class="illicit-trade inline" href="../../illicit-trade">illicit trades</a>, and <a class="piracy inline" href="../../piracy">piracy</a>. Continuing to improve the region’s enforcement capacity will require additional resources, training, and regional cooperation.'
      //     },
      //     { tag: 'img',
      //       src: '../../assets/maritime-enforcement/bosaaso-port-police.jpg',
      //       alt: 'Boasasso Port Police. Photo credit: Oceans Beyond Piracy.', // ### Spelling on Bosasso?
      //       caption: 'Boasasso Port Police. Photo credit: Oceans Beyond Piracy.'
      //     }, //###Insert image
      //     { tag: 'links',
      //       items: [
      //          {org: '<sup>1</sup> Céline Pajon, “Japan’s Coast Guard and Maritime Self-Defense Force: Cooperation among Siblings,” <em>Maritime Awareness Project</em>, December 1, 2016,', url: 'http://maritimeawarenessproject.org/2016/12/01/japans-coast-guard-and-maritime-self-defense-force-cooperation-among-siblings/'},
      //           {org: '<sup>2</sup> Nan Tian, Aude Fleurant, Pieter D. Wezeman and Siemont T Wezeman, “Trends in World Military Expenditure, 2016,” SIPRI, April 2017, p. 4', url: 'https://www.sipri.org/sites/default/files/Trends-world-military-expenditure-2016.pdf'},
      //       ],
      //     }
      //]
      //}, // End of second  object in cards array
      // Card 2
      {
        title: 'Maritime Domain Awareness',
        menu: 'Maritime Domain Awareness',
        metadata: {
          owner: 'Jay Benson',
          description: 'Importance of not only vessels, but communications and monitoring equipment.'
        },
        map: {
          path: '../../data/maritime-enforcement/information-sharing-centers.js',
          scale: [],
          classes: 'card-2-layer',
          translate: [],
          highlights: null,
          load: function(index, file) {
            // Location and capability estimates of
            // information sharing centers across Africa.
            var layer = 'card-' + index + '-layer';
            d3.json(file, function(error, locations) {

              var centers = mapg.append('g')
                .classed('card-layer invisible ' + layer, true);

              centers.selectAll('.centers')
                .data(locations).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', function(d) {
                  return d.names.length * 6 + 'px';
                })
                .attr('class', function(d) {
                  return d.type;
                })
                .classed('center-location', true)
                .style('fill', function(d) {
                  if (d.type == 'national') {
                    return colorBrew[0][0];
                  } else if (d.type == 'regional') {
                    return colorBrew[1][0];

                  } else if (d.type == 'both') {
                    return colorBrew[2][0];

                  }
                })
                .style('stroke', function(d) {
                  if (d.type == 'national') {
                    return colorBrew[0][1];
                  } else if (d.type == 'regional') {
                    return colorBrew[1][1];

                  } else if (d.type == 'both') {
                    return colorBrew[2][1];

                  }
                });


            })

            // Load file

            // Class loaded GIS layer with layer

          },
          switch: function(index) {
            // Show loaded GIS layer
            var target = 'card-' + index + '-layer';

            d3.select('.' + target).classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Maritime Domain Awareness'
          },
          {
            tag: 'caption',
            text: 'A prerequisite for effective maritime governance'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<div class="brew-00">National information sharing centres.</div><br /><div class="brew-10">Regional information sharing centres.</div><br /><div class="brew-20">Both national and regional information sharing centres.</div><br />Circle diameter represents the number of centres present in a location.'
          },
          {
            tag: 'p',
            html: 'Maritime domain awareness (MDA) is the ability to collect, analyze, and disseminate information on a variety of activities in the maritime domain which may affect safety, security, the environment, and economic activity. The sheer size of the maritime space (Mozambique, for example, has an EEZ larger than the land area of Metropolitan France), the limited resources, and the high level of activity makes having even a basic level of MDA incredibly challenging.'
          },
          {
            tag: 'img',
            src: '../../assets/maritime-enforcement/yaounde-information-sharing.jpg',
            alt: 'Naval officers using SeaVision, a web-based system that supports developing MDA.',
            caption: 'Naval officers using SeaVision, a web-based system that supports developing MDA.' // from http://www.crimario.eu/en/2017/02/16/visualising-maritime-data-in-madagascar/
          },
          {
            tag: 'p',
            html: 'MDA in the region is in need of further development. Few states have the number of vessels, aircraft, and remote sensing or communication systems necessary to maintain an accurate picture of activity in their respective maritime spaces. However, important steps are being taken to improve state and regional MDA capabilities.'
          },
          {
            tag: 'p',
            html: 'One of many examples at the level of the state is the donation made to Seychelles by EUCAP Somalia of imagery analysis software and training.<sup>3</sup> These tools should significantly enhance capacity for maritime intelligence collection. Further capacity building of this kind will be critical to developing the tools and skills necessary for accurate MDA in African waters.'
          },
          {
            tag: 'video',
            videoId: 'Ih6M-NfLybc',
            thumb: '../../assets/maritime-enforcement/eu-crimario-video-thumb.png' // ###
          },
          {
            tag: 'caption',
            text: 'EU CRIMARIO - Video on information sharing.'
          },
          {
            tag: 'p',
            html: 'MDA is also being built at a regional level. A prime example of this is the Critical Maritime Routes (CMR) initiative, an EU-funded program to enhance MDA in the Western Indian Ocean region and Gulf of Guinea. The program includes the development of a new information-sharing platform, the IORIS Network,<sup>4</sup> as well as trainings for individuals from regional maritime agencies on subjects such as data collection/analysis and information sharing which build MDA capabilities.<sup>5</sup> Similar information-sharing efforts are being made in the Gulf of Guinea via the <a class="international-cooperation inline" href="../../international-cooperation#4">Yaoundé Process</a>.'
          },
          {
            tag: 'p',
            html: 'Continuing to commit resources  to improved MDA both locally and through external capacity-building is critical, as it serves as the basis for addressing all other challenges to maritime governance and security in African waters.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>3</sup> DefenceWeb, “European Union Enhances Maritime Awareness of Seychelles Air Force,” April 7, 2014,',
                url: 'http://www.defenceweb.co.za/index.php?option=com_content&view=article&id=34272:european-union-enhances-maritime-awareness-of-seychelles-air-force&catid=35:Aerospace&Itemid=107'
              },
              {
                org: '<sup>4</sup> CRIMARIO, “The IORIS Network,” 2016,',
                url: 'http://www.crimario.eu/en/information-sharing/the-ioris-network/'
              },
              {
                org: '<sup>5</sup> CRIMARIO, “Achievements,” 2017,',
                url: 'http://www.crimario.eu/en/training/achievements/'
              },
            ],
          }
          // { tag: 'img',
          //   src: '../../assets/maritime-enforcement/mda-center.jpg',
          //   alt: 'MDA systems.',
          //   caption: 'MDA systems from www.imagesatintl.com.'
          // }
        ]
      }, // End of third object in cards array
      // Card 2
      {
        title: 'Toxic Waste Dumping',
        menu: 'Toxic Waste Dumping',
        metadata: {
          owner: 'Sarah Glaser',
          description: 'Electronics dumping as an example of lack of MDA, and debunking assumptions in Horn of Africa.'
        },
        map: {
          path: '../../data/maritime-enforcement/toxic-dumping-locations.csv',
          scale: [],
          classes: '',
          translate: [],
          load: function(index, csv) {
            var layer = 'card-' + index + '-layer';

            d3.csv(csv, function(locations) {
              locations.forEach(function(row) {
                row.lat = +row.lat;
                row.lon = +row.lon;
              })

              var locg = mapg.append('g')
                .classed('card-layer toxic-dumping-locations invisible ' + layer, true);

              locg.selectAll('circle')
                .data(locations)
                .enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', '8px')
                .classed('toxic-dumping-incident', true)
                .style('fill', function() {
                  return rampColor(1);
                });

            })
          },
          switch: function(target) {
            var layer = 'card-' + target + '-layer';
            d3.select(layer)
              .classed('invisible', false);

          }
        },
        els: [{
            tag: 'h1',
            text: 'Toxic Waste Dumping'
          },
          {
            tag: 'caption',
            text: 'Not pervasive but significant'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: 'Points on the map represent potential coastal sources of toxic contamination of the maritime environment. Sites are designated as such due to the presence of agrofuel and biomass energy plants, E-waste, waste importation zones, chemical industries, toxic waste treatment, uncontrolled dump sites, mineral processing, mine tailings, and thermal power plants. <br>Source: <a href="https://ejatlas.org/" target="_blank">Environmental Justice Atlas</a>'
          },
          {
            tag: 'p',
            text: 'The Yaoundé Code of Conduct, the Djibouti Code of Conduct, and the Lomé Charter recognize illegal dumping of toxic waste as part of transnational organized crime in the maritime domain. A lack of comprehensive numbers, and the illegal nature of the problem, obscures understanding of how widespread this problem really is.'
          },
          {
            tag: 'img',
            src: '../../assets/maritime-enforcement/mauritania-ship-graveyard.jpg',
            alt: '.',
            caption: 'Ship graveyard in Mauritania. Photo credit: Sebastián Losada.'
          },
          {
            tag: 'p',
            text: 'In some cases, the perception of the problem is far greater than the reality. But weak maritime enforcement and monitoring capacity have enabled some high- profile illegal dumping cases:'
          },
          {
            tag: 'p',
            html: 'There are few confirmed cases of dumping. In 2006, a ship flagged in Panama but chartered by a multinational company docked in the Port of Abidjan, C&ocirc;te d\'Ivoire, carrying 500 tons of hazardous waste, which was later dumped into the water illegally. Ultimately, 100,000 people sought medical attention, the company responsible settled a lawsuit, and several Ivoirian officials were forced to resign.<sup>6</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/maritime-enforcement/toxic-waste-protesters.png',
            caption: 'Protesters of toxic waste following the incident when an international oil-trader dumped 500 tons of toxic waste off the coast of Côte d’Ivoire. Photo credit: Issouf Sanogo/AFP/Getty Images.'
          }, //###Make sure image is in
          {
            tag: 'p',
            html: 'Dumping in Somalia has long been alleged but difficult to prove. A series of reports in the 1990s suggested  inland toxic waste dumping by Italian and other European groups in Somalia was widespread. Several reports suggested waste was also dumped at sea; after the 2004 Indian Ocean tsunami, waste canisters washed up on Somali beaches. The Environmental Justice Atlas reports the appearance of rashes, fish kills, groundwater pollution, and even deaths as a result of this dumping. But to date, widespread dumping in Somali waters has not been confirmed.<sup>7</sup>'
          },
          {
            tag: 'p',
            html: 'In Africa, illegal dumping of toxic waste threatens public health, water quality, and environmental justice. Developed nations exploit the less stringent environmental regulations in African countries and weaknesses in maritime domain awareness. As a result, toxic waste—including e-waste from electronics, a significant fraction of which originates in Western nations—enters African nations legally and illegally.'
          },
          {
            tag: 'h4',
            text: 'Legal Efforts'
          },
          {
            tag: 'p',
            html: 'Three international legal instruments attempt to control the movement of hazardous waste across national boundaries. The London Convention of 1972 permanently banned the dumping of radioactive and industrial waste in the world’s oceans. The Basel Convention of 1989 aimed to reduce the generation of hazardous waste and encourage environmentally sound disposal and treatment. In 1991, twelve African nations negotiated the Bamako Convention, which addressed weaknesses in the Basel Convention and explicitly banned importation of hazardous and radioactive waste. Regardless, hundreds of thousands of tons of waste are shipped to Africa each year, some of which ends up illegally dumped at sea or in ports.'
          },
          {
            tag: 'p',
            html: 'Ultimately, waste dumping and importation in Africa appears to be largely a terrestrial problem. Recent toxic leakage from ship graveyards in West Africa<sup>8</sup> is cause for concern, but overall the threat posed is believed to be neither systemic nor widespread.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>6</sup> BBC, “Trafigura Found Guilty of Exporting Toxic Waste,” 23 July 2010,',
                url: 'http://www.bbc.com/news/world-africa-10735255'
              },
              {
                org: '<sup>7</sup> Chris Milton, “Somalia Used as Toxic Dumping Ground,” <em>The Ecologist</em>, 1 March 2009,',
                url: 'http://www.theecologist.org/News/news_analysis/268581/somalia_used_as_toxic_dumping_ground.html'
              },
              {
                org: '<sup>8</sup> Daniel Cressey, “West Africa’s Toxic Problem,” <em>Nature</em>, 20 January 2011,',
                url: 'http://www.nature.com/news/2011/110120/full/news.2011.35.html'
              },
            ]
          }
        ]
      }, // End of fourth  object in cards array
      // Card 3
      {
        title: 'Coast Guards',
        menu: 'Coast Guards',
        metadata: {
          owner: 'Jay Benson',
          description: 'Most states lack committed coast guards.'
        },
        map: {
          path: '',
          scale: [],
          classes: 'card-4-layer',
          translate: [],
          highlights: null,
          load: function(index, file) {
            // Color map with 'some aspect of inclusion' chloropleth ...
            d3.select('.card-eez-layer')
              .classed('card-' + index + '-layer', true);


          },
          switch: function(index) {
            var layer = 'card-' + index + '-layer';
            // Class countries per .xls 4.5 sheet

            var navies = ['CIV', 'ZAF', 'TGO', 'AGO', 'BEN', 'COG', 'COD', 'GNQ', 'GAB', 'GMB', 'GIN', 'GNB', 'MDG', 'MOZ', 'NAM', 'SLE', 'TZA'],
              lawEnf = ['CPV', 'LBR', 'MUS', 'SYC', 'SOM'], // ### what about the small islands? Can hardly see them colored in ...
              both = ['CMR', 'GHA', 'KEN', 'NGA', 'DJI', 'SEN'];

            navies.forEach(function(country, i) {
              d3.selectAll('.country.' + country)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('fill', colorBrew[0][0])
                .style('stroke', colorBrew[0][1]);

              d3.selectAll('.eez.' + country)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('stroke', colorBrew[0][1]);
            });

            lawEnf.forEach(function(country, i) {
              d3.selectAll('.country.' + country)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('fill', colorBrew[2][0])
                .style('stroke', colorBrew[2][1]);

              d3.selectAll('.eez.' + country)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('stroke', colorBrew[2][1]);
            });

            both.forEach(function(country, i) {
              d3.selectAll('.country.' + country)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('fill', colorBrew[4][0])
                .style('stroke', colorBrew[4][1]);

              d3.selectAll('.eez.' + country)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('stroke', colorBrew[4][1]);
            });
          }
        },
        els: [{
            tag: 'h1',
            text: 'The Role of Coast Guards'
          },
          {
            tag: 'caption',
            text: 'Policing African Waters'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<div class="brew-00 legend-entries">Countries with a navy.</div><br /><div class="brew-20 legend-entries">Countries that have a coast guard.</div><br /><div class="brew-40 legend-entries">Countries with both a navy and a coast guard.</div><br /> <br> Source: <a href=\'https://www.iiss.org/-/media/documents/publications/the%20military%20balance/military%20balance%202016/mb2016%20further%20assessments.pdf?la=en.\' target=\'_blank\'>2016 Military Balance report</a>'
          },
          {
            tag: 'p',
            html: 'Most states in sub-Saharan Africa have navies, but relatively few have forces such as coast guards dedicated to maritime law enforcement. While navies are built primarily for national defense and warfighting, maritime law enforcement is intended to counter a variety of illicit activities at sea, including but not limited to <a href="../../piracy" class="piracy inline">piracy</a>, <a href="../../human-trafficking" class="maritime-mixed-migration inline"> maritime mixed migration</a>, <a href="../../fisheries" class="fisheries inline">IUU fishing</a>, and transport of drugs, arms, and wildlife.<sup>9</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/maritime-enforcement/cameroon-coast-guard.jpg',
            alt: 'Cameroon Coast Guard',
            caption: 'Centre for Multinational Coordination (CMC) in Douala, Cameroon. Photo by Jean-Pierre Larroque, OEF.'
            // from http://www.ghananewsagency.org/social/ghana-and-u-s-maritime-forces-complete-combined-operation-73501
          },
          {
            tag: 'p',
            text: 'Maritime law enforcement also requires unique skillsets and knowledge in areas such as evidence collection, the conduction of search and rescue operations, and fisheries management which are not core to the primary mission of navies. While navies need to work primarily with other military branches and national defense actors, maritime law enforcement requires effective collaboration with fisheries agencies, police forces, and other civilian actors. All of these differences mean that the use of navies for law enforcement purposes is not natural and at times ineffective. However, using navies for law enforcement also has benefits, which are to avoid splitting the chain of command, and a greater mutualization of scarce assets. Where navies are used for law enforcement, they need adapted assets and specific training.'
          },
          {
            tag: 'p',
            html: 'Thankfully, the region is experiencing an increase in maritime law enforcement capabilities through both internal and external capacity-building. One example of these efforts is South Africa’s Project Biro, which commissioned three inshore and three offshore patrol vessels, increasing the country’s maritime law enforcement capacity and lessening the burden of such patrols for the navy’s frigates, which are significantly more expensive to operate.<sup>10</sup>'
          },
          {
            tag: 'h4',
            text: 'International Partnerships'
          },
          {
            tag: 'p',
            html: 'External capacity-building in this area comes in the form of training and equipment contributed by a variety of state and multilateral actors. One example of such efforts is the Africa Maritime Law Enforcement Partnership (AMLEP) program.<sup>11</sup> AMLEP involves training and multinational operations/boardings which are focused on countering maritime crime, as opposed to national defense. In 2016, AMLEP multinational patrols conducted 32 boardings which identified 50 violations of maritime law, and issued $1.2 million in fines. While these interdictions are valuable in their own right, the skills developed in the course of such operations will be even more critical to creating sustained maritime security in the region.'
          },
          {
            tag: 'video',
            videoId: '9qUiwnR90mE',
            thumb: '../../assets/maritime-enforcement/usns-spearhead-video-thumb.png', // ###
            caption: 'From the USNS Spearhead'
          },
          {
            tag: 'p',
            html: 'African maritime law enforcement is also being strengthened through multilateral assistance, the most prominent example of which is the UNODC’s Global Maritime Crime Programme (GMCP).<sup>12</sup> GMCP has enhanced maritime law enforcement by developing models for prosecuting acts of piracy, training regional legal professionals on issues related to maritime crime, constructing law enforcement facilities, and training coast guard personnel in counter-trafficking and smuggling operations.<sup>13</sup> Like the AMLEP program described above, these kinds of capacity building projects will be crucial to ensuring the region has the infrastructure, equipment, and training to effectively govern its maritime space.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>9</sup> Augustus Vogel, “Navies versus. Coast Guards: Defining the Roles of African Maritime Security Forces,” <em>African Security Brief</em>, No. 2, December 2009, p. 2.'
              },
              {
                org: '<sup>10</sup> Timothy Walker, “Can Project Brio Help Africa to Overcome its Maritime Security Challenges?” <em>Institute for Security Studies</em>, May 4, 2015,',
                url: 'https://issafrica.org/iss-today/can-project-biro-help-africa-to-overcome-its-maritime-security-challenges'
              },
              {
                org: '<sup>11</sup> Africom, “Africa Maritime Law Enforcement Partnership (AMLEP) Program,”',
                url: 'http://www.africom.mil/what-we-do/security-cooperation/africa-maritime-law-enforcement-partnership-amlep-program'
              },
              {
                org: '<sup>12</sup> UNODC,”UNODC Global Maritime Crime Programme,”',
                url: 'https://www.unodc.org/unodc/en/piracy/index.html'
              },
              {
                org: '<sup>13</sup> UNODC, “Maritime Crime Programme- Indian Ocean,”',
                url: 'https://www.unodc.org/unodc/en/piracy/indian-ocean-division.html'
              },
            ]
          }
        ]
      }, // End of fifth  object in cards array
      // Card 4
      {
        title: 'The Role of Multinational Exercises',
        menu: 'The Role of Multinational Exercises',
        metadata: {
          owner: 'Emina Sadic',
          description: 'What kinds of exercises are being used to increase capacity?'
        },
        map: {
          scale: [],
          classes: 'card-5-layer',
          translate: [],
          highlights: null,
          load: function(index, file) { // ### *** This only should be for the first card ...
            // Class GIS layer with layer.
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            // ### Still need to work out how to represent countries that are in multiple lists!
            var cutlass = ['DJI', 'MUS', 'MOZ', 'COM', 'KEN', 'MDG', 'SYC', 'UGA', 'USA'],
              obangame = ['AGO', 'CPV', 'COG', 'COD', 'CIV', 'GNQ', 'GIN', 'GNB', 'LBR', 'NAM', 'STP', 'SEN',
                'SLE', 'BEN', 'CMR', 'GAB', 'GHA', 'NGA', 'TGO', 'USA'
              ],
              nemo = ['FRA', 'BEN', 'CMR', 'GAB', 'GHA', 'NGA', 'TGO']; // ### lots of overlap with obangame!

            cutlass.forEach(function(member, i) {
              d3.selectAll('.country.' + member)
                .classed('active', true) // flag so style gets cleared...!
                .transition().delay(i * 10)
                .style('fill', colorBrew[0][0])
                .style('stroke', colorBrew[0][1]);


              d3.selectAll('.eez.' + member)
                .classed('active', true) // flag so style gets cleared...!
                .transition().delay(i * 10)
                .style('stroke', colorBrew[0][1]);
            });

            obangame.forEach(function(member, i) {
              d3.selectAll('.country.' + member)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('fill', colorBrew[1][0])
                .style('stroke', colorBrew[1][1]);


              d3.selectAll('.eez.' + member)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('stroke', colorBrew[1][1]);
            });

            nemo.forEach(function(member, i) {
              d3.selectAll('.country.' + member)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('fill', colorBrew[2][0])
                .style('stroke', colorBrew[2][1]);


              d3.selectAll('.eez.' + member)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('stroke', colorBrew[2][1]);
            });
          }
        },
        els: [{
            tag: 'h1',
            text: 'The Role of Multinational Exercises'
          },
          //###NEED THUMBNAILS FOR BOTH VIDEOS
          {
            tag: 'caption',
            text: 'Building capacity and interoperability'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<div class="brew-00 legend-entries">Cutlass Express participants.</div><br /><div class="brew-10 legend-entries">Obangame Express participants.</div><br /><div class="brew-20 legend-entries">Nemo & Obangame participants.</div><br />'
          },
          {
            tag: 'p',
            text: 'Maritime security threats require cooperation and coordination among African navies and international actors. Coastal states are able to enhance their capacity-building efforts and interoperability measures through international exercises conducted on both coasts of Africa.'
          },
          {
            tag: 'blockquote',
            html: '“We know that the issues of maritime security involves a lot of people and a lot of issues across many agencies in each of our governments. So, there has to be cooperation within our governments as well as cooperation between our count[r]ies. Exercises like this are extremely important to make that possible.”',
            source: 'Andrew Haviland, Charge d\' Affaires<br />U.S. Embassy Côte  d\'Ivoire<sup>14</sup>',
            link: 'http://www.navy.mil/submit/display.asp?story_id=99689' // What about internal references?
          },
          {
            tag: 'p',
            html: 'Falling under the umbrella of the African Partnership Station, East Africa’s Cutlass Express and West Africa’s Obangame Express are annual regionally focused exercises facilitated by the U.S. Naval Forces Europe-Africa/U.S. 6th Fleet.<sup>15</sup> Obangame Express is designed to improve regional cooperation, maritime domain awareness, information-sharing practices, and tactical interdiction expertise among signatories of the Yaoundé Code of Conduct.<sup>16</sup> Collaboration with international actors allows these regional forces to learn how to counter illicit sea-based activity.<sup>17</sup>'
          },
          {
            tag: 'video',
            videoId: 'vkFQOqaxjP8',
            thumb: '../../assets/maritime-enforcement/multinational_cooperation_video.jpg'
          },
          {
            tag: 'caption',
            html: 'American and Senegalese sailors conduct visit, board, search, and seizure training aboard Senegalese naval vessel PHM Njambuur during Obangame Express 2016.'
          },
          {
            tag: 'p',
            html: 'Further efforts to assist West African countries in their fight against <a class="piracy inline" href="../../piracy">piracy</a> and <a class="fisheries inline" href="../../fisheries">IUU fishing </a> include Exercise NEMO, a French initiative. The exercise seeks to strengthen a 2013 agreement between the Economic Community of Central African States (ECCAS) and the Economic Community of West African States (ECOWAS) to fight piracy in the Gulf of Guinea.<sup>18</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/maritime-enforcement/us-navy-cameroon-obangame.jpg',
            alt: 'US Navy and Cameroonian sailors during a simulated boarding of a suspect vessel for Obangame Express.  Photo credit: John Herman/US Navy.',
            caption: 'US Navy and Cameroonian sailors during a simulated boarding of a suspect vessel for Obangame Express.  Photo credit: John Herman/US Navy.'
          },
          {
            tag: 'p',
            html: 'In a similar vein, Cutlass Express is an exercise that serves to assess and improve the maritime law enforcement capacity of East African coastal and island states, promote regional security, and inform planning and operations. In order to achieve these goals, focused scenarios include the interdiction of illicit arms, drugs, natural resources, and people that pose a threat to regional stability. Partners in this exercise include Comoros, Djibouti, Kenya, Mauritius, Mozambique, Seychelles, Uganda, and the United States.<sup>19</sup>'
          },
          {
            tag: 'blockquote',
            html: '“We must continue in good spirit of partnership and alliances to support our continent and ensure that trade can advance freely. No one nation can deal with the challenges that we face in the world today. The ocean is so vast that a united effort is required to make sure that our oceans are safe.”',
            source: 'Rear Adm. B.K. Mhlana, Fleet Flag Officer<br />South African Navy<sup>20</sup>',
            link: 'http://www.navy.mil/submit/display.asp?story_id=99689' // What about internal references?
          },

          {
            tag: 'p',
            html: 'International exercises highlight the willingness of affected countries to enhance their coast guard and naval capacity to adequately respond to maritime threats ranging from piracy to human smuggling. By simulating real-life scenarios of the potential maritime threats existing in each region, international exercises can test the abilities of participating states to respond to these threats, highlighting areas of capacity strength and offering opportunities to improve upon weaker points.'
          },
          {
            tag: 'video',
            videoId: '593TZ8oVd08',
            thumb: '../../assets/maritime-enforcement/exercise_cutlass_express_video.jpg', // ###
            caption: 'Maritime forces of Djibouti and Sudan prepare to board a ship during exercise Cutlass Express 2016.<sup>21</sup>'
          },
          {
            tag: 'caption',
            html: 'Maritime forces of Djibouti and Sudan prepare to board a ship during exercise Cutlass Express 2016.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>14</sup> U.S. 6th Fleet Public Affairs, “Exercise Obangame Express 2017 Concludes with Closing Ceremonies,” United States Navy, 3 April 2017,',
                url: 'http://www.navy.mil/submit/display.asp?story_id=99689'
              },
              {
                org: '<sup>15</sup> Africom, “Exercise Cutlass Express 2017 Concludes,” <em>DefenceWeb</em>, 9 February 2017,',
                url: 'http://www.defenceweb.co.za/index.php?option=com_content&view=article&id=46748:exercise-cutlass-express-2017-concludes&catid=51:Sea&Itemid=106'
              },
              {
                org: '<sup>16</sup> Africom, “Obangame Express,” United States Africa Command, accessed 29 August 2017,',
                url: 'http://www.africom.mil/what-we-do/exercises/obangame-express'
              },
              {
                org: '<sup>17</sup> Barthélemy Blédé, “US and West Africa Join Forces on Maritime Security,” Institute for Security Studies, 7 April 2017,',
                url: 'https://issafrica.org/iss-today/us-and-west-africa-join-forces-on-maritime-security'
              },
              {
                org: '<sup>18</sup> Ronald Mutum, “Nigerian, French Navy in Joint Exercise,” <em>AllAfrica.com</em>, 12 September 2016,',
                url: 'http://allafrica.com/stories/201609130110.html'
              },
              {
                org: '<sup>19</sup> Africom, “Cutlass Express,” United States Africa Command, accessed 29 August 2017,',
                url: 'http://www.africom.mil/what-we-do/exercises/cutlass-express'
              },
              {
                org: '<sup>20</sup> David Rider, “Exercise Cutlass Express 2015,” <em>Maritime Security Review</em>, 21 November 2014,',
                url: 'http://www.marsecreview.com/2014/11/exercise-cutlass-express-2015/'
              },
              {
                org: '<sup>21</sup> United States Navy, “Maritime Forces of Djibouti and Sudan Prepare to Board a Ship During Exercise Cutlass Express 2016,” 3 February 2016,',
                url: 'http://www.navy.mil/view_imagex.asp?id=210947&t=1'
              },
            ]
          }
        ]
      },
      // Card 5
      {
        title: 'Training Together',
        menu: 'Training Together',
        metadata: {
          owner: 'Emina Sadic',
          description: 'Success story: togo/Ghana/US/Nigeria.'
        },
        map: {
          scale: [],
          classes: 'card-6-layer',
          translate: [],
          extent: [
            [-10, 23],
            [51, -8]
          ],
          highlights: ['NGA', 'STP', 'BEN', 'TGO', 'GHA'],
          load: function(index, file) { // ### *** This only should be for the first card ...
            // Load GIS data from file

            // Class GIS data with layer
            var layer = 'card-' + index + '-layer';

          },
          switch: function(index) {
            d3.select('.card-' + index + '-layer')
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Training Together'
          },
          {
            tag: 'caption',
            text: 'The case of the MT Maximus'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Highlighted countries participated in USNS Spearhead</a>'
          },
          {
            tag: 'p',
            html: 'The significance of the multinational training exercises in the Gulf of Guinea was highlighted in 2016 when MT <i>Maximus</i> was hijacked by fourteen pirates 70 nm south of Côte d’Ivoire in an attempt to steal 4,700 metric tons of diesel fuel cargo.'
          },
          {
            gif: true,
            tag: 'video',
            videoId: 'iOrjS1qmNDk',
            thumb: '../../assets/maritime-enforcement/Maximus-Hijacking.gif'
          },

          {
            tag: 'p',
            html: 'At the same time that pirates hijacked the vessel and took 18 crew members hostage, the Ghanaian navy was conducting Africa Maritime Law Enforcement Partnership  operations with the United States’ USNS <i>Spearhead</i>. USNS <i>Spearhead</i> assisted the regional navies by tracking the vessel for two days as it sailed from Ivoirian to Ghanaian waters, at which point the tracking mission was handed over to the Ghanaian navy. While Benin and Togo were unable to mobilize a response effort, Nigeria was able to dispatch two naval vessels, NNS <i>Okpabana</i> and NNS <i>Sagbama</i>, reinforced with detachments of the Nigerian Special Boat Service, to recapture <i>Maximus</i>. <sup>22</sup> Nigerian forces subsequently apprehended six pirates.<sup>23</sup>'
          },
          {
            tag: 'blockquote',
            html: '“The training and exercises, as well as the combined operations that have taken place over the years, directly contributed to the successful interception and takedown of the pirates onboard the MAXIMUS.”<br /><br />Lt. Cdr. Todd Behney,  U.S. Africa Command maritime programs officer<br />US Coast Guard<sup>24</sup>',
            //  source: '',
            //    link: '### need a URL!'       // What about internal references?
          },
          {
            tag: 'p',
            html: 'As a model of regional cooperation under the Yaoundé Code of Conduct, the mission demonstrated that regional actors possess the coordination capacity to effectively respond to maritime threats. Similarly, the mission validated the effectiveness and significance of multinational exercises conducted with international navies, such as the Obangame Express exercise series, which contributed to the ability of regional naval actors to quickly respond to the situation.'
          },
          {
            tag: 'video',
            videoId: 'c5sCpFqv2Kw',
            thumb: '../../assets/maritime-enforcement/nigerian_navy_video_thumb.png' // ### put in GIF animation and thumbNAILS John Hoopes
          },
          {
            tag: 'p',
            html: 'Previous efforts by the United States and France to help develop the national maritime operation centers of four Gulf of Guinea countries, Benin, Ghana, Nigeria, and Togo, including the use of remote sensors, radars, automated information systems, and databases, led these respective states to have the ability to track the vessel as it traversed the waters of those countries nearly 800 miles from its starting point.<sup>25</sup>'
          },
          {
            tag: 'blockquote',
            html: '“International cooperation is the new mantra for maritime security. We cannot go it alone.”',
            source: 'Rear Admiral Henry Bablola<br />Nigerian Navy<sup>26</sup>',
            link: '### need a URL!' // What about internal references?
          }, //###CUT THIS QUOTE AND PLACE IT INTO VERY TOP OF CARD 2.7 AIMS 2050
          {
            tag: 'links',
            items: [{
                org: '<sup>22</sup> Nathan D. Herring, “West Africa Piracy Case Highlights U.S. Capacity Building Efforts,” United States Africa Command, 11 March 2016,',
                url: 'https://www.africom.mil/media-room/article/28044/west-africa-piracy-case-highlights-u-s-capacity-building-efforts'
              },
              {
                org: '<sup>23</sup> Dirk Steffen, “West African Navies Coming Of Age?” Center for International Maritime Security, 7 March 2016,',
                url: 'http://cimsec.org/coming-of-age-of-the-west-african-navies/22919'
              },
              {
                org: '<sup>24</sup> Herring, “West Africa Piracy Case.”'
              },
              {
                org: '<sup>25</sup> Herring, “West Africa Piracy Case.”'
              },
              {
                org: '<sup>26</sup> Michelle Faul, “Navies From The United States, Ghana, Togo And Nigeria Track Hijacked Tanker Through Waters Off Five Countries Before Nigerian Naval Forces Storm Aboard,” <em>US News and World Report</em>, 27 February 2016,',
                url: 'https://www.usnews.com/news/world/articles/2016-02-26/us-nigerian-navies-ship-rescue-success-for-cooperation'
              },
            ]
          }
        ]
      },
      // // Card 7
      // { title: 'Methodology',
      //   menu: 'Methodology',
      //   metadata: {
      //     owner: 'Curtis Bell',
      //     description: 'Methods.'
      //   },
      //   map: {
      //     scale: [],
      //     classes: 'card-7-layer',
      //     translate: [],
      //     highlights: null,
      //     load: function (index, file) {  // ### *** This only should be for the first card ...
      //       // Color EEZ according to master Stable Seas index
      //       var layer = 'card-'+index+'-layer';
      //
      //       d3.select('.card-eez-layer')
      //         .classed(layer, true);
      //     },
      //     switch: function (index) {
      //       switchMainIndexInverse(0);
      //     }
      //   },
      //   els: [
      //     { tag: 'h3',
      //       text: 'Methodology'
      //     },
      //     // { tag: 'legend',
      //     //   text: 'Map Legend',
      //     //   legendContent: '<em>Lighter shades indicate greater maritiime enforcement capability</em>'
      //     // },
      //     // { tag: 'p',
      //     //    text: 'The Maritime Enforcement score consists of three equally weighted parts: the difficulty of governing the specific maritime space, a quantitative measure of capability based on fleet size, and a qualitative expert assessment of enforcement capacity and international assistance received. Each of these parts is briefly introduced below, with more detailed technical notes in the data documentation available for download.'
      //     // },
      //     // { tag: 'h4',
      //     //   text: 'Geography'
      //     // },
      //     // { tag: 'p',
      //     //    text: 'We score the effect of EEZ geography on a state’s capacity to govern by considering two equally weighted factors: EEZ size and coastline length. Though these two concepts are correlated, they can diverge based on the shape of the coastline and the arrangement of neighboring EEZs. Cameroon, for example, has a very low EEZ-to-coastline ratio because its offshore claims quickly meet those of island neighbors like Equatorial Guinea. Conversely, Cabo Verde’s relative isolation in the mid-Atlantic means it has an EEZ that extends many nautical miles in all directions.'
      //     // },
      //     // { tag: 'p',
      //     //    html: 'Data on EEZ size is drawn from <a href="www.maritimeregions.org" target="_blank">www.maritimeregions.org</a>, an online gazetteer produced by the Flanders Maritime Institute. This resource contains comprehensive geospatial and legal information about maritime spaces around the world. Coastline lengths are taken from the CIA World Factbook.'
      //     // },
      //     // { tag: 'p',
      //     //    text: 'The difficulty score also accounts for the effect poor maritime relations can have on making EEZs more difficult to govern. Two factors inform relations with maritime neighbors: the number of EEZ neighbors and the proportion of those neighbors a state has come to a formal mutual agreement with about the placement of maritime boundaries. We draw both measures from data from the Flanders Maritime Institute. We argue that the difficulty of patrolling a maritime space increases with the number of direct maritime neighbors and further argue that it is even more difficult when borders are disputed or unestablished.'
      //     // },
      //     // { tag: 'h4',
      //     //   text: 'Fleet Size'
      //     // },
      //     // { tag: 'p',
      //     //    html: 'We include data about the number of significant vessels available to federal forces, which may include a navy, coast guard, port police, and/or maritime division of another branch of the armed forces. We derive these ship counts from <i>Military Balance</i>, which is an annual global report from the International Institute for Strategic Studies.'
      //     // },
      //     // { tag: 'p',
      //     //    text: 'We separate two types of vessels to measure two types of naval capacity: coastal patrol vessels, which provide countries with the ability to monitor activity near the coast, and surface warfare craft, which allow for a stronger enforcement presence farther offshore into a state’s exclusive economic zone and beyond.'
      //     // },
      //     // { tag: 'p',
      //     //    text: 'As opposed to other naval power measures that focus on weaponry and the ability to exert force well into neighboring ocean basins, this count of vessels focuses on two skills that help states govern their EEZs: the ability to patrol the coasts and the ability to project force across the deeper waters of an EEZ.'
      //     // },
      //     // { tag: 'p',
      //     //    text: 'Both measures are simple vessel counts that do not take into account age, working condition, or funding, but we address these factors in the expert assessments of capability and international assistance.'
      //     // },
      //     // { tag: 'h4',
      //     //    text: 'Expert Assessment of Capability'
      //     // },
      //     // { tag: 'p',
      //     //    text: 'Counts of vessels and displacement tonnage miss some aspects of naval capability. Equipment can be outdated, support vessels may hinder naval effectiveness, and insufficient ongoing commitments may mean navies are underfunded and undertrained. We use an expert assessment to gauge what activities fall within and beyond the capabilities of African navies.'
      //     // },
      //     // { tag: 'p',
      //     //    html: 'We adopt the Typology for Navies provided by <i>Leadmark: The Navy’s Strategy for 2020</i>, which was completed by the Canadian Navy. Using this 10-tier rating system, we asked four experts to independently evaluate and score the 30 African littoral states. The ratings were correlated at well over 0.90, so the ratings were averaged into a single capability score ranging from 4 (South Africa) to 10 (Somalia). For the purpose of patrolling an EEZ, further developments above “Medium Regional Force Projection” are unnecessary, as levels above that describe the ability to project power out into an ocean basin.'
      //     // },
      //     // { tag: 'p',
      //     //    text: 'Finally, many navies receive substantial international assistance with governing their maritime spaces. This assistance ranges from multilateral naval patrols to donations of training, vessels, and communications equipment. We asked four experts to assess the extent of four kinds of international assistance to each African navy: (1) training, (2) equipment, (3) exercises, and (4) patrols.'
      //     // },
      //     // { tag: 'p',
      //     //    text: 'Respondents classified each of these aspects of international assistance according to the following scale: (0) no evidence of assistance, (1) evidence of infrequent/limited assistance, (2) recipient of minor assistance, (3) recipient of consistent and significant assistance, and (4) major recipient of formalized and large-scale assistance.'
      //     // }
      //   ]
      //} // End of eighth  object in cards array
    ] // End of cards array
  },
  coastalWelfare: {
    metadata: { // Independent data source for each page
      name: 'Coastal Welfare',
      version: '0.0.2',
      updates: true,
      /*
           here is where you write updates
           do one line per update, like
           added legend to card 3
           added citations to card 5
           input thumbnail path to card 4
           loaded point data

           */
      index: 5,
      code: 'coastalWelfare',
      path: 'coastal-welfare',
      countryData: [],
      csv: '../../data/coastal-welfare/coastalWelfare.csv',
      color: '#B89E42',
      order: -1,
      description: 'Maritime security is closely linked to the well-being of the people living in adjacent coastal areas.'
    },
    load: function(csv, callback) {
      d3.csv(csv, function(vals) {
        vals.forEach(function(d) {
          //  d.ia5c0 = +d.ia5c0;
          d.ia5c1 = +d.ia5c1;
          d.ia5c4 = +d.ia5c4;
        });
        issueAreaData[issueArea].metadata.countryData = vals;
        callback('coastalWelfare load csv function callback');
      });
    },
    cards: [{ // Card 0
        title: 'Coastal Welfare',
        menu: 'Coastal Welfare',
        metadata: {
          owner: 'Sasha Egorova',
          description: 'Overview of the sub-index.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          path: '',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, file) {
            // var layer = 'card-'+index+'-layer';
            // var l = d3.select('.card-eez-layer')
            //   .classed(layer, true);
          },
          switch: function(index) {
            // This works because we classed the layer with .card-0-layer

          }
        },
        els: [{
            tag: 'h1',
            text: 'Coastal Welfare',
          },
          {
            tag: 'caption',
            text: 'The primary driver of maritime insecurity'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Dots represent lethal conflict incidents occurring in 2016. Gold incidents occurred within 50km of the coast. <br><a href="https://www.prio.org/Data/Armed-Conflict/UCDP-PRIO/" target="_blank">Source: UCDP/PRIO</a></em>'
          },
          // { tag: 'legend',
          //   text: 'Map Legend',
          //   legendContent: '<em>Lighter shades indicate higher coastal welfare scores.</em><br /><br /><a class="internal-ref coastal-welfare inline" href="#" data-link="6">Methodology</a>'
          // },
          {
            tag: 'p',
            html: 'Maritime security is closely linked to the well-being of the people living in adjacent coastal areas. When coastal residents suffer from violence and poverty on or near the coast, their close proximity to the sea can draw them toward maritime crime and the illicit maritime economy.'
          },
          {
            tag: 'img',
            src: '../../assets/coastal-welfare/coastal_welfare_loop-01.png', // This should be on the Stable Seas Deck - comments
          },

          // { tag: 'h3',
          //   text: 'The Coastal Welfare Scores'
          // },
          // {tag: 'indexTable'
          // },
          // { tag: 'caption',
          //   text: 'Note: scores are rounded to the nearest whole number.'
          // },
          {
            tag: 'p',
            html: 'Violent non-state actors operating on shore are likely to turn to the maritime space to smuggle in <a class="illicit-trade inline" href="../../illicit-trade">arms and illicit goods</a>, as seen in Somalia, Nigeria, the Philippines, and elsewhere. Transnational criminal networks are especially likely to establish themselves along coastlines that are weakly governed and affected by <a class="internal-ref inline coastal-welfare" href="#" data-link="3">armed conflict and other forms of violence</a>.'
          },
          // { tag: 'p',
          //   html: 'Our Coastal Welfare score captures the physical and economic security of coastal and nationwide populations. The highest-ranking countries are not experiencing civil war, and have lower homicide rates and lower infant mortality and higher per capita incomes, life expectancies, and levels of education attainment. They also have profitable and sustainable maritime industries.'
          // },
          // { tag: 'p',
          //    html: 'In 2017, coastal welfare is highest among African island states, in the western Gulf of Guinea, and in the southern cone. High levels of violence near the coast dramatically reduce scores near the Niger River Delta and on the Horn of Africa.'
          // },
          {
            tag: 'p',
            html: 'We are only starting to learn about the complex relationships between coastal conditions and various maritime crimes. While many criminal networks flourish in situations of poor coastal welfare, the enabling conditions often vary based on the crime. For example, <a class="piracy inline" href="../../piracy">piracy activities</a> often need a semblance of stability and functioning markets, as seen in parts of Somalia. If conditions are too violent and unstable, pirates and criminal networks have difficulty operating.<a class="maritime-mixed-migration inline" href="../../maritime-mixed-migration">Human smuggling</a> benefits from civil war, as seen in Libya. However, some crimes, such as <a class="illicit-trade inline" href="../../illicit-trade">illicit trades</a>, flourish in more sophisticated economies and stable environments, such as South Africa.'
          },
          {
            tag: 'p',
            html: 'The nature of maritime crime can shift depending on the changing conditions and opportunities on shore. Recognizing what these conditions are and how they might impact or be impacted by maritime crimes is important for identifying vulnerable locations, ports, and shorelines and intervening to prevent an escalation of illicit activity.'
          },
          // Insert infographic here ###
          // { tag: 'p',
          //   html: 'For more information about how these scores are calculated, please see our <a class="internal-ref coastal-welfare inline" href="#" data-link="6">Methodology</a> page.'
          // }

        ] // end of els array

      },
      { // Card 1
        title: 'The Economic Insecurity Trap',
        menu: 'The Economic Insecurity Trap',
        metadata: {
          owner: 'Sasha Egorova',
          description: 'Feedback loop between crime and economic insecurity.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          path: '',
          highlights: [],
          tooltip: true,
          load: function(index, file) {
            var layer = 'card-' + index + '-layer';
            var l = d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            //  switchMainIndex(index);
            var artisanalFishing = issueAreaData[issueArea].metadata.countryData;

            var values = [];

            artisanalFishing.forEach(function(row, i) {
              values.push(row.ia5c1);
            });

            var max = d3.max(values),
              min = d3.min(values),
              range = max - min;
            artisanalFishing.forEach(function(row, i) {
              d3.selectAll('.eez.' + row.iso3)
                .classed('active', true)
                .style('fill', function() {
                  return rampColor(1 - ((row.ia5c1 - range) / (max - min)))
                })

            });
          }
        },
        els: [{
            tag: 'h1',
            text: 'The Economic Insecurity Trap',
          },
          {
            tag: 'caption',
            text: 'How maritime crime hurts local economies'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Lighter shades indicate greater artisanal fishing opportunities.<br />Source: <a href="http://www.oceanhealthindex.org/" target="_blank">Ocean Health Index</a></em>'
          },
          {
            tag: 'p',
            html: 'Strong fisheries, tourism, and other maritime industries provide coastal populations with an opportunity to thrive in the <a class="blue-economy inline" href="../../blue-economy">legal maritime economy</a>.<sup>1</sup> When such opportunities diminish or are not available, people are more likely to join criminal networks and to exploit maritime resources through illegal means.'
          },
          {
            tag: 'p',
            html: 'The relationship between recruitment for piracy and unemployment in fisheries is a striking example. Pirates recruit from local fishing communities, among other sectors, since fishers possess the navigational knowledge, skills, and resources that pirates need to execute their attacks. Stable and abundant income opportunities in the fishing sector keep people away from criminal activity. On the other side, poor fish catches can propel more people to join pirate networks.<sup>2</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/coastal-welfare/al_faxti_fishing.jpg',
            alt: 'Stable income opportunities in the fishing sector keep people away from criminal activity. Photo: Al Faxti Fishing, Jean-Pierre Larroque, OEF. ',
            caption: 'Stable income opportunities in the fishing sector keep people away from criminal activity. Photo: Al Faxti Fishing, Jean-Pierre Larroque, OEF. '
          },
          {
            tag: 'p',
            html: 'However, while poor coastal economic welfare enables maritime crimes, maritime crimes also disrupt local economies. Large injections of capital acquired through illicit means have effects similar to those of the “resource curse.”<sup>3</sup> Large illicit capital inflows, such as ransom payments, lead to inflation. Inflation in turn undermines local manufacturing industries and exports. The service industry booms, and imports grow. While advantageous in the short term, this effect undermines long-term development and fosters a dependency on the illicit sectors.'
          },
          {
            tag: 'blockquote',
            html: '"Ransom revenues appear to largely fuel investment in services, real estate, finance or criminal sectors. Little appears to go into pastoral or export sectors."',
            source: 'Authors Steven Oliver, Ryan Jablonski, and Justin V. Hastings<br />The Tortuga Disease<sup>4</sup>',
            link: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2233959' // What about internal references?
          },
          {
            tag: 'p',
            html: 'The effect has been strong in Puntland, which has seen a significant decline in exports in comparison to Somaliland since 2005, despite having trade figures that were tracking very closely to Somaliland’s prior to the onset of piracy.<sup>5</sup>'
          },
          // Insert graph of Change in export volumes ###
          {
            tag: 'img',
            src: '../../assets/coastal-welfare/change_export_volumes.jpg',
          },
          {
            tag: 'p',
            html: 'As a result of the effects of ransom revenues on the economy, employment opportunities in manufacturing, agriculture, and other export industries decrease. As unemployment and poverty rise, people start seeing more opportunity in the illicit economy.'
          },
          {
            tag: 'p',
            html: 'One result of these dynamics is the inception of a feedback loop between poor coastal welfare and illicit maritime activity; the more maritime crime develops, the more it can take a toll on economic development. The more economic development stagnates, the more people are inclined to move into illicit activities and crimes.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>1</sup> Ryan Jablonski and Steven Oliver, “The Political Economy of Plunder: Economic Opportunity and Modern Piracy,” <em>Journal of Conflict Resolution</em> 57, no. 4 (2012): 682–708.'
              },
              {
                org: '<sup>2</sup> Mattias Fluckiger and Markus Ludwig, “Economic Shocks in the Fisheries Sector and Maritime Piracy,” <em>Journal of Development Economics</em> 114 (2015): 107–125.'
              },
              {
                org: '<sup>3</sup> Steven Oliver, Ryan Jablonski, and Justin V. Hastings, “The Tortuga Disease: The Perverse Effects of Illicit Foreign Capital,” <em>International Studies Quarterly<em> (forthcoming, 2017), accessed 28 August 2017,',
                url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2233959'
              },
              {
                org: '<sup>4</sup> Ibid.'
              },
              {
                org: '<sup>5</sup> Ibid.'
              },
            ]
          }
        ] // end of els array

      },
      { // Card 2
        title: 'Somali Livelihoods',
        menu: 'Somali Livelihoods',
        metadata: {
          owner: 'Sasha Egorova',
          description: 'Focus on economic livelihoods in Somalia.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          path: '../../data/blue-economy/world-port-index.csv',
          extent: [
            [37, 14],
            [76, -9]
          ], // ### Guinea Bissau
          //    highlights: ['SOM'],
          load: function(index, file) {

            var layer = 'card-' + index + '-layer';
            d3.csv(file, function(vals) {
              vals.forEach(function(d) {
                d.lat = +d.lat;
                d.lon = +d.lon;
                d.Harbor_2ize_code = +d.Harbor_2ize_code;
              });

              var wpi = mapg.append('g')
                .classed('card-layer wpi-layer invisible ' + layer, true);

              wpi.selectAll('circle')
                .data(vals).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', function(d) {
                  return d.Harbor_2ize_code * 2;
                })
                .classed('wpi-port', true)
                .style('fill', function() {
                  return rampColor(1);
                });
            });
          },
          switch: function(index) {
            //  switchMainIndexInverse(0);
            d3.select('.card-' + index + '-layer')
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Somali Livelihoods',
          },
          {
            tag: 'caption',
            text: 'Supporting coastal communities amid drought'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Larger dots indicate larger ports, smaller dots indicate smaller ports. <br> Source: World Port Index</em>'
          },
          // { tag: 'legend',
          //   text: 'Map Legend',
          //   legendContent: '<em>Somalis suffer from the region\'s lowest coastal welfare score <br> <a class="internal-ref inline coastal-welfare" href="#" data-link="6">Methodology</a></em>' //###Fix this map if we have time its ugly
          // },
          {
            tag: 'p',
            html: 'The 2017 drought and famine have forced many Somalis to turn to the sea to support their livelihoods. As livestock and crops died, and with the reach of humanitarian assistance limited, many turned to fishing to feed their families. Conversely, illicit maritime activities might have also been fueled by the drought.'
          },
          {
            tag: 'blockquote',
            html: '“What we\'re seeing is that migration is increasing exponentially in all directions. People are leaving the region however they can. Some are going through Libya and across the Mediterranean and some are going to Yemen.”',
            source: 'Nichole Sobecki<sup>6</sup><br />Photojournalist',
            link: 'http://www.npr.org/sections/goatsandsoda/2017/06/17/533050733/photos-of-somalia-surviving-in-one-of-the-worlds-driest-places' // What about internal references?
          },
          {
            tag: 'p',
            html: '<a class="maritime-mixed-migration inline" href="../../maritime-mixed-migration">Human smuggling</a>is one of the key maritime crimes associated with the deteriorating coastal welfare off the coast of Somalia. Most Somalis do not have the financial means to be smuggled abroad and feel they have to migrate internally within Somalia.<sup>7</sup> As famine conditions worsen, many who can do so choose to be smuggled to other countries from Somali ports in order to escape the drought.'
          },
          {
            tag: 'p',
            html: 'Somalia is just one example of how a change in coastal welfare and livelihoods can contribute to growing maritime insecurity. Amid crises like these, links between poor coastal welfare and maritime crimes can be addressed by supporting coastal development.'
          },
          { // Get this thumbnail!
            tag: 'video',
            videoId: '9U7fD3JkB60',
            thumb: '../../assets/coastal-welfare/AgriFood_video.jpg' // ###
          },
          {
            tag: 'p',
            html: 'These links between poor coastal welfare and maritime crime also mean that improved coastal opportunities could improve maritime security. For example, <a href="http://shuraako.org/" target="_blank">Shuraako</a>, a program of One Earth Future, has been supporting agriculture, fishing, and other businesses across the Somali regions through investments to create livelihood opportunities and foster economic growth. By boosting the formal economy, this work provides viable alternatives to illicit activities that undermine international security.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>6</sup> Jason Beaubien, “Photos Of Somalia: The Drought, the People, the Captured Porcupine,” <em>NPR</em>, 17 July 2017,',
                url: 'http://www.npr.org/sections/goatsandsoda/2017/06/17/533050733/photos-of-somalia-surviving-in-one-of-the-worlds-driest-places'
              },
              {
                org: '<sup>7</sup> The Research and Evidence Facility Consortium, “Migration between the Horn of Africa and Yemen,” 25 July 2017,',
                url: 'https://www.soas.ac.uk/ref-hornresearch/research-papers/file122639.pdf'
              }
            ]
          }
        ] // end of els array

      },
      { // Card 3
        title: 'War and Maritime Crimes',
        menu: 'War and Maritime Crimes',
        metadata: {
          owner: 'Sasha Egorova',
          description: 'How maritime crime funds violent non-state actors'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          extent: [
            [5, 20],
            [111, -41]
          ],
          path: '../../data/ia5c3.csv',
          highlights: [],
          tooltip: true,
          load: function(index, file) {

            var layer = 'card-' + index + '-layer';
            d3.csv(file, function(vals) {
              vals.forEach(function(d) {
                d.lat = +d.lat;
                d.lon = +d.lon;
                d.deaths = +d.deaths;
              });

              var incidents = mapg.append('g')
                .classed('card-layer card-0-layer coastal-incidents ' + layer, true);

              incidents.selectAll('circle')
                .data(vals)
                .enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', '3px')
                .attr('class', function(d) {
                  return d.type;
                });

            });


          },
          switch: function(index) {
            var layer = 'card-' + index + '-layer';
            d3.select('.' + layer)
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'War and Maritime Crimes',
          },
          {
            tag: 'caption',
            text: 'Vicious cycles of violence and insecurity'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Dots represent lethal conflict incidents occurring in 2016. Gold incidents occurred within 50km of the coast. <br><a href="https://www.prio.org/Data/Armed-Conflict/UCDP-PRIO/" target="_blank">Source: UCDP/PRIO</a></em>'
          },
          {
            tag: 'p',
            html: 'Sub-Saharan Africa is the most war-torn region of the world. Just in 2016, 10 out of 30 countries covered by our Stable Seas Maritime Security Index were affected by civil war. A total of 1,039 armed clashes occurred throughout their territories; 256 of them occurred within 50 kilometers of the coast, including in the vicinities of key coastal towns, ports, and other critical maritime infrastructure.<sup>8</sup>'
          },
          {
            tag: 'img', // Add graph ###
            src: '../../assets/coastal-welfare/coastal_welfare_conflict_events.png',
          },
          {
            tag: 'p',
            html: 'There is a complex relationship between armed conflict and maritime crimes. First of all, civil war can facilitate and drive illicit activities. Active conflict creates the opportunities illicit networks need to flourish: low government penetration and weak control of insurgent territories, weak rule of law, a proliferation of arms, and ample networks that can be tapped into to support illicit activities.'
          },
          {
            tag: 'p',
            html: 'Moreover, war is a great market opportunity for illicit activities. Maritime arms trade and human smuggling are especially profitable in environments affected by civil war due to the demand for arms and the volume of refugees fleeing the violence.'
          },
          {
            tag: 'p',
            html: 'Conversely, criminal activities can also facilitate war by funding insurgent campaigns.<sup>9</sup> Attacking oil tankers and <a class="piracy inline" href="../../piracy">kidnapping for ransom</a> have proven to be lucrative strategies for financing insurgency in the Gulf of Guinea. The Movement for the Emancipation of the Niger Delta (MEND) has attacked oil tankers and infrastructure off the coast of Nigeria regularly since 2008. Attacks prompted the government to come to the negotiation table, but, most importantly, financed the group’s activities through ransom payments and the sale of stolen oil on the black market.<sup>10</sup>'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>8</sup> Ralph Sundberg and Erik Melander, “Introducing the UCDP Georeferenced Event Dataset,” <em>Journal of Peace Research</em> 50, no.4 (2013): 523–532; Mihai Croicu and Ralph Sundberg, “UCDP GED Codebook version 17.1,” Department of Peace and Conflict Research, Uppsala University, 2017.'
              },
              {
                org: '<sup>9</sup> Ursula Daxacker and Brandon C. Prins, “Financing Rebellion: Using Piracy to Explain and Predict Conflict Intensity in Africa and Southeast Asia,” <em>Journal of Peace Research</em> 54, no. 2 (2017): 215–230.'
              },
              {
                org: '<sup>10</sup> Ibid.'
              }
            ]
          }
          // How about internal references????? ###

        ] // end of els array
      },
      { // Card 4
        title: 'Women and Coastal Welfare',
        menu: 'Women and Coastal Welfare',
        metadata: {
          owner: 'Sasha Egorova',
          description: 'Gender aspect of coastal welfare. Structural impediments towards women equally participating in coastal economies.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          path: '',
          highlights: [],
          tooltip: true,
          load: function(index, file) {

            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);

          },
          switch: function(index) {

            var values = issueAreaData[issueArea].metadata.countryData;
            var valArr = [];
            values.forEach(function(d) {
              valArr.push(d.ia5c4);
            });

            var max = d3.max(valArr);
            var min = d3.min(valArr);
            var range = max - min;

            values.forEach(function(row, i) {
              d3.selectAll('.eez.' + row.iso3)
                .classed('active', true)
                .style('fill', rampColor(1 - ((row.ia5c4 - min) / range)));
            });

            var layer = 'card-' + index + '-layer';
            d3.select('.' + layer)
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Women and Coastal Welfare',
          },
          {
            tag: 'caption',
            text: 'Secure coastlines for all'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Lighter shades indicate greater women\'s economic security. <br> Source: <a href="http://wbl.worldbank.org/" target="_blank">World Bank Women, Business, and the Law Dataset</a></em>'
          },
          {
            tag: 'p',
            html: 'Women’s active participation in coastal economies helps create more stable, secure, and profitable coastal areas for all. However, there are many obstacles to their full participation in the economy, and maritime industries in particular.'
          },
          {
            tag: 'blockquote',
            html: '“Women today represent about 50 percent of the world’s population and, for the past two decades, about 50 percent of the labor force. Yet there are stark differences in the outcomes they achieve: women are only half as likely as men to have a full-time wage-earning job. The women who do have paid jobs earn as much as one-third less than men. Fewer women than men are involved in trade or own registered companies. And women are more likely to work in low-productivity activities or informal employment.”',
            source: 'Cecile Fruman, Author<br />Why Gender Equality in Doing Business Makes Good Economic Sense<sup>11</sup>',
            link: 'http://blogs.worldbank.org/psd/why-gender-equality-doing-business-makes-good-economic-sense' // What about internal references?
          },
          {
            tag: 'p',
            html: 'Maritime industries are no exception to this overall trend. There are fewer female seafarers than male ones, fewer women serving in navies and marine authorities, and fewer female members of coast guards.<sup>12</sup> Women’s participation in fisheries value chains is often limited to roles in processing and marketing, rather than fishing and resource management, which are considered to be traditionally male roles.<sup>13</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/coastal-welfare/women_fisheries_west_africa.jpg', // This should be on the Stable Seas Deck - comments
            alt: 'A woman cooks in Youpwe fishing village, Cameroon. Photo: Jean-Pierre Larroque, OEF',
            caption: 'A woman cooks in Youpwe fishing village, Cameroon. Photo: Jean-Pierre Larroque, OEF'
          },
          {
            tag: 'p',
            html: 'These differences in outcomes between men and women in business and the job market largely stem from the legal systems of their respective states. In sub-Saharan Africa in particular, women face multiple obstacles to equal participation in the economy:<sup>14</sup>'
          },
          {
            tag: 'ul',
            rows: ['In 5 out of 30 countries considered in the index, there are extra procedures for women to start a business compared to the procedures required for men.<sup>15</sup>', 'In 17 out of 30 countries, equal remuneration for work of equal value is not legally mandated.', 'In 21 out of 30 countries, nondiscrimination based on gender in hiring is not legally mandated.', 'In 18 out of 30 countries, non-pregnant women can’t do the same jobs as men.', 'In 2 out of 30 countries, non-pregnant women cannot work in the same occupations as men.']
          },
          {
            tag: 'p',
            html: 'In addition to unequal legal rights in terms of employment, women also face a lack of protection against different forms of violence:<sup>16</sup>'
          },
          {
            tag: 'ul',
            rows: ['In 17 out of 30 countries, there are no clear criminal penalties for domestic violence.', 'In 8 out of 30 countries, there is no legislation that addresses sexual harassment.', 'In 20 out of 30 countries, marital rape is not criminalized.']
          },
          {
            tag: 'p',
            html: 'Removing obstacles to women’s participation in the economy and establishing functioning regulatory frameworks to protect women from violence are key steps toward having inclusive, sustainable, and secure coastal economies and welfare.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>11</sup> Cecile Fruman, “Why Gender Equality in Doing Business Makes Good Economic Sense,” the World Bank Private Sector Development Blog, 17 November 2016,',
                url: 'http://blogs.worldbank.org/psd/why-gender-equality-doing-business-makes-good-economic-sense'
              },
              {
                org: '<sup>12</sup> Timothy Walker, “Why We Need More Women in Maritime Industries,” <em>World Economic Forum Agenda</em>, 4 September 2015,',
                url: 'https://www.weforum.org/agenda/2015/09/why-we-need-more-women-in-maritime-industries/'
              },
              {
                org: '<sup>13</sup>  Angela Lentisco and Robert Ulric Lee, <em>A Review of Women’s Access to Fish in Small-scale Fisheries</em> (Rome: Food and Agricuture Organization of the United Nations, 2015),',
                url: 'http://www.fao.org/3/a-i4884e.pdf'
              },
              {
                org: '<sup>14</sup> “Women, Business, and the Law 2016: Getting to Equal,” the World Bank, available at',
                url: 'http://wbl.worldbank.org/'
              },
              {
                org: '<sup>15</sup> The Doing Business Project, “Starting a Business,” the World Bank, 2017, accessed 28 August 2017,',
                url: 'http://www.doingbusiness.org/data/exploretopics/starting-a-business'
              },
              {
                org: '<sup>16</sup> “Women, Business, and the Law 2016: Getting to Equal,” the World Bank, available at',
                url: 'http://wbl.worldbank.org/'
              },
            ]
          }
        ] // end of els array
      },
      // { // Card 5
      //   title: 'Progress in Ghana',
      //   menu: 'Progress in Ghana',
      //   metadata: {
      //     owner: 'Sasha Egorova',
      //     description: 'Lessons learned on what makes high coastal welfare in Ghana.'
      //   },
      //   map: {
      //     scale: [],
      //     classes: '',
      //     translate: [],
      //     path: '',
      //     extent: [[-5,14],[17,-2]],
      //     highlights: ['GHA'],
      //     load: function (index, file) {
      //       var layer = 'card-'+index+'-layer';
      //       d3.select('.card-eez-layer')
      //         .classed(layer, true);
      //
      //     },
      //     switch: function (index) {
      //       var layer = 'card-'+index+'-layer';
      //       d3.select('.' + layer)
      //         .classed('invisible', false);
      //       switchMainIndex(0);
      //     }
      //   },
      //   els: [
      //     { tag: 'h3',
      //       text: 'Progress in Ghana',
      //     },
      //     { tag: 'caption',
      //       text: 'Leading the Gulf of Guinea'
      //     },
      //     // { tag: 'legend',
      //     //   text: 'Map Legend',
      //     //   legendContent: '<em>Ghana enjoys one of the highest coastal welfare scores in sub-Saharan Africa.<br><a class="internal-ref inline coastal-welfare" href="#" data-link="6">Methodology</a><em>'
      //     // },
      //     { tag: 'p',
      //       html: 'Ghana has long been hailed as a success story for stability and growth in Africa, and for good reason. Since the institutionalization of a democratic political system in the early 1990s, the state has seen stable economic growth, a significant reduction of poverty, continuously climbing life expectancies and attainment of education, and steady progress towards other development goals.<sup>17</sup>'
      //     },
      //     { tag: 'img', // Add image ###
      //       src: '../../assets/placeholder.jpg',
      //       alt: '',
      //       caption: 'Caption for picture to be added###.'
      //     },
      //     { tag: 'p',
      //        html: 'Unlike in many of its neighbors, people in Ghana also enjoy a high degree of physical security. The country has not experienced a civil war, and has a low homicide rate of just 1.70, which puts it in the company of Canada, Kosovo, Malawi, Kuwait, and Bulgaria on the global scale. This is a remarkable level of physical security for a country that has been in close proximity to war and violent political change in recent memory.'
      //     },
      //     { tag: 'p',
      //        html: 'Ghana’s coastal areas are some of the most prosperous areas in the country, at least in part due to the location of the capital, Accra, on the coast. Maritime industries such as mariculture, commercial fishing, shipping, tourism, and others keep up with incomes and employment trends in other industries across the country, providing coastal populations with stable jobs and incomes.'
      //     },
      //     // { tag: 'p',
      //     //    html: 'Yet, having a high level of coastal welfare does not shield the country from maritime crime originating in neighboring countries. Ghana receives an unfavorable “high” ranking on both our  <a class="piracy inline" href="../../piracy">Piracy</a> and <a class="illicit-trade inline" href="../../illicit-trade">Illicit Trades</a> scores, in part because it shares the Gulf of Guinea with major piracy and maritime crime hotspots such as Nigeria. Ghana has become a significant hub for <a class="internal-ref inline illicit-trade" href="#" data-link="2">illicit trades in drugs and contraband</a>. This is due, at least in part, to internal challenges like corruption, insufficient capacity for enforcement of regulations, and growing internal demand for illicit goods.<sup>18</sup> Because coastal welfare is strong in Ghana relative to neighboring states, it is a destination country for economic migrants, which increases opportunities for trafficking and exploitation.'
      //     // },//###Make ssure links format color correctly in above paragraph
      //     { tag: 'p',
      //        html: 'Though Ghana faces challenges, citizens living along the coast are more secure, both physically and economically, than they are elsewhere in the Gulf of Guinea region. For this reason, Ghana is in a strong position to make gains against these problems and to continue leading regional efforts to secure the Gulf of Guinea maritime environment.'
      //     },
      //     { tag: 'links',
      //       items: [
      //         {org: '<sup>17</sup> “Ghana,” the World Bank, accessed 1 September 2017,', url: 'http://data.worldbank.org/country/ghana'},
      //         {org: '<sup>18</sup> U.S. Department of State, “Ghana,” Bureau of International Narcotics and Law Enforcement Affairs 2014 International Narcotics Control Strategy Report, accessed 1 September 2017,', url: 'https://www.state.gov/j/inl/rls/nrcrpt/2014/vol1/222893.htm.'},
      //       ]  // How about internal references????? ###
      //     }
      //   ] // end of els array
      // },
      //{ // Card 6
      // title: 'Methodology',
      // menu: 'Methodology',
      // metadata: {
      //   owner: 'Curtis Bell',
      //   description: 'Methods.'
      // },
      // map: {
      //   scale: [],
      //   classes: 'card-6-layer',
      //   translate: [],
      //   highlights: null,
      //   load: function (index, file) {  // ### *** This only should be for the first card ...
      //     // Color EEZ according to master Stable Seas index
      //     var layer = 'card-'+index+'-layer';
      //
      //     d3.select('.card-eez-layer')
      //       .classed(layer, true);
      //   },
      //   switch: function (index) {
      //     switchMainIndexInverse(0);
      //   }
      // },
      // els: [
      // { tag: 'h3',
      //   text: 'Methodology'
      // },
      // { tag: 'legend',
      //   text: 'Map Legend',
      //   legendContent: '<em>Lighter shades indicate higher coastal welfare scores.</em>'
      // },
      // { tag: 'p',
      //    html: 'The Coastal Welfare Score gauges physical security and economic security, both throughout a country and specifically along the coast. This section briefly summarizes how each concept is measured. More technical details are included in the data documentation available for download.'
      // },
      // { tag: 'h4',
      //   text: 'Physical Security'
      // },
      // { tag: 'p',
      //    html: 'We use four inputs to measure physical security: the severity of coastal armed conflicts, the severity of nationwide armed conflicts, nationwide homicide rates, and an analysis of women’s physical security.'
      // },
      // { tag: 'p',
      //    html: 'The first two of these inputs are derived from data from a joint initiative of the Uppsala Conflict Data Program and the Peace Research Institute of Oslo. The georeferenced event dataset produced by this initiative includes geocoded information about specific lethal instances of armed conflict, such as battles between governments and rebels or use of violence against civilians.<sup>19</sup> The project codebook defines a qualifying event as: “An incident where armed force was used by an organized actor against another organized actor, or against civilians, resulting in at least one direct death at a specific location and a specific date.”<sup>20</sup>'
      // },
      // { tag: 'p',
      //    html: 'Counts of nationwide events by country were used to create the nationwide armed-conflict severity measure for each state. In 2016 the 30 coastal sub-Saharan countries collectively experienced 1,039 qualifying events. To isolate political violence occurring near the coastline, we used geographic event data to identify events occurring within 50 kilometers of a country’s coastline. This reduced the number of events to 256, and those are spread across six countries. Some countries, like Somalia and Angola, experienced most of their lethal conflict events near the coast. Others, like the Democratic Republic of the Congo and Cameroon, suffered conflict in interior regions but not in coastal areas.'
      // },
      // { tag: 'p',
      //    html: 'The third measure of physical security is the nationwide homicide rate as recorded by the United Nations Office on Drugs and Crime. Homicide data was taken for the most recent available year for each country. In most cases, 2015 was the most recent year used.'
      // },
      // { tag: 'p',
      //    html: 'The fourth measure is an analysis of women’s physical security, derived from the Women, Business, and the Law data from the World Bank. To create this measure, we used the data from the Protecting Women indicator in the dataset, which “examines the existence of legislation on domestic violence and sexual harassment”<sup>21</sup> in each country. '
      // },
      // { tag: 'h4',
      //   text: 'Economic Security'
      // },
      // { tag: 'p',
      //    html: 'We use five inputs to measure economic security on the coast and nationwide: artisanal fishing opportunities, coastal livelihoods and economies, the Human Development Index, infant mortality rate, and women’s economic security. We use three data sources to measure economic security: the Ocean Health Index (OHI) for coastal livelihoods and economies and artisanal fishing opportunities, the United Nations Development Programme for the Human Development Index, and the World Bank for infant mortality rate data and the Women, Business, and the Law dataset.'
      // },
      // { tag: 'p',
      //    html: 'The first measure is the <a href="http://www.oceanhealthindex.org/methodology/components/artisanal-fishing-need" target="_blank">Artisanal Fishing Opportunities Index</a> collected by OHI. The index measures “whether people who need to fish on a small, local scale have the opportunity to do so.”<sup>22</sup> In other words, it captures whether the demand for fishing opportunities is met on the coast in a lawful and sustainable manner.'
      // },
      // { tag: 'p',
      //    html: 'Second, the “Livelihoods and Economies” measure from OHI, weighted by the Human Development Index, assesses jobs and revenue produced from marine-related industries relative to national trends in employment and GDP. The score thus captures the relative economic well-being of coastal areas in comparison to the rest of the country. The industries considered in the measure are: (1) commercial fishing, (2) mariculture, (3) tourism and recreation, (4) shipping and transportation, (5) whale watching, (6) ports and harbors, (7) ship and boat building, and (8) renewable energy production (wind and wave).'
      // },
      // { tag: 'p',
      //    html: 'Third, the Human Development Index (HDI) is a composite measure of the overall social well-being of citizens in each country and includes data on life expectancy, education, and per capita income. This measure is an excellent indicator for economic welfare across a country. We multiply it by the Livelihoods and Economies score to proxy coastal development.'
      // },
      // { tag: 'p',
      //    html: 'Fourth, infant mortality rate is an ideal measure of social welfare because it reflects the state of healthcare, women’s education, and the availability of sufficient nutrition, transportation infrastructure, and shelter. These data are used with the HDI to gauge economic security at the country level.'
      // },
      // { tag: 'p',
      //    html: 'Finally, the fifth measure is an analysis of women’s economic security derived from the Women, Business, and the Law data from the World Bank. To create this measure, we use the data from the “Getting a Job” indicator in the dataset, which “assesses restrictions on women’s work, such as prohibitions on working at night or in certain jobs. This indicator also covers laws on work-related maternity, paternity, parental benefits, retirement ages, equal remuneration for work of equal value and nondiscrimination in hiring.”<sup>23</sup>'
      // },
      // { tag: 'links',
      //   items: [
      //     {org: '<sup>19</sup> Sundberg and Melander, “Introducing the UCDP Georeferenced Event Dataset.'},
      //     {org: '<sup>20</sup> Ibid., pg. 2'},
      //     {org: '<sup>21</sup> The Women, Business, and the Law Project, “All Indicators,” the World Bank, accessed 1 September 2017,', url: 'http://wbl.worldbank.org/data/exploretopics/all-indicators'},
      //     {org: '<sup>22</sup> “Artisanal Fishing Opportunities,” the Ocean Health Index, accessed 1 September 2017,', url: 'http://www.oceanhealthindex.org/methodology/goals/artisanal-fishing-opportunities'},
      //     {org: '<sup>23</sup> The Women, Business, and the Law Project, “All Indicators,” the World Bank, accessed 1 September 2017,', url: 'http://wbl.worldbank.org/data/exploretopics/all-indicators'},
      //   ],  // How about internal references????? ###
      // }

      //   ]
      // } // End of seventh object in cards array
    ]
  },
  blueEconomy: {
    metadata: { // Independent data source for each page
      version: '0.0.1',
      name: 'Blue Economy',
      updates: true,
      /*
           here is where you write updates
           do one line per update, like
           added legend to card 3
           added citations to card 5
           input thumbnail path to card 4
           loaded point data

           */
      index: 6,
      code: 'blueEconomy',
      path: 'blue-economy',
      countryData: [],
      csv: '../../data/blue-economy/blueEconomy.csv',
      color: '#307ABD',
      order: 1,
      description: 'The contributions ocean-based commercial sectors make to a state’s overall economic health can lead to a less violent society.'
    },
    load: function(csv, callback) {
      d3.csv(csv, function(vals) {
        vals.forEach(function(d) {
          d.ia6c1 = +d.ia6c1;
          d.ia6c2 = +d.ia6c2;
          d.ia6c4 = +d.ia6c4;
          d.ia6c5 = +d.ia6c5;
          d.ia6c6 = +d.ia6c6;
        });
        issueAreaData[issueArea].metadata.countryData = vals;
        callback('blueEconomy load csv function callback');
      });
    },
    cards: [{ // Card 0 //###version 1.0
        title: 'Blue Economy',
        menu: 'Blue Economy',
        metadata: {
          owner: 'Sarah Glaser',
          description: 'Overview of the sub-index.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          path: '',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, file) {
            // var layer = 'card-'+index+'-layer';
            // var l = d3.select('.card-eez-layer')
            //   .classed(layer, true);
          },
          switch: function(index) {
            //  switchMainIndex(index); // ### will this work elsewhere??

            // Let's keep this code in case not ...


          }
        },
        els: [{
            tag: 'h1',
            text: 'Blue Economy',
          },
          {
            tag: 'caption',
            text: 'Making the most of our oceans'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Larger dots indicate larger ports, smaller dots indicate smaller ports</em>.'
          },
          // { tag: 'legend',
          //   text: 'Map Legend',
          //   legendContent: '<em></em>.'
          // },
          //###<<The map complementing this section will be a choropleth map showing the Blue Economy Sub-Index Score.>>
          {
            tag: 'p',
            html: 'Economic growth is a pillar of national security. Nations with strong economies are less likely to go to war. Nations with weak economies are more likely to face conditions that precipitate or escalate violence.<sup>1</sup> The Blue Economy has recently emerged as a framework for understanding the economic contribution ocean-based sectors make to a state’s overall economic health.'
          },
          // { tag: 'p',
          //    html: 'Our Blue Economy Score considers six factors: fisheries, marine and coastal tourism, maritime transportation and shipping, offshore oil and gas, adjusted net savings, and vulnerability to climate change. This year’s scores range from 20 to 62 on a scale of 0 to 100; this truncated range shows the potential for substantial growth in the Blue Economy that exists for the African nations considered in this year’s study as compared to the rest of the world. For more information about how these scores are calculated, please see our “Methodology” page.'
          // },
          // { tag: 'h3',
          //   text: 'The Blue Economy Sub-index'
          // },
          // {tag: 'indexTable'
          // },
          // { tag: 'caption',
          //   text: 'Note: scores are rounded to the nearest whole number.'
          // },
          {
            tag: 'p',
            html: 'The ocean is an increasingly important source of economic opportunity, holding potential in the fields of energy (both renewable and non-renewable), food, tourism, coastal protection from storms, transportation that links the global economy, and natural products that promise advances in medicine. It is frequently lamented—with awe—that our maps of the seafloor are less detailed and complete than our maps of Mars.<sup>2</sup> Yet, with technology in sonar, satellite mapping and tracking, deep sea exploration, and remotely operated vehicles all advancing rapidly, the ocean and its riches present a new frontier. Greater access also brings greater risks, however: the threat of overfishing, destructive drilling and extraction, conflict over shared or disputed spaces, and difficult trade-offs to make between coastal development and conservation.'
          },
          {
            tag: 'p',
            html: 'The Blue Economy framework goes beyond simple metrics of national economic growth or wealth and assesses the sustainability and equity of ocean-based economic sectors. That’s why simple national measures such as gross domestic product fall short in capturing what the Blue Economy means. The Blue Economy borrows ideas and orientations from green movements that recognize that economic opportunity must take into account natural limits on growth, that economic growth is most stable when it benefits a wide range of participants (including women, youth, and racial minorities), and that human activities can undermine long-term economic well-being with short-sighted policies and implementation.'
          },
          {
            tag: 'p',
            html: 'In Africa, the Blue Economy includes sectors that are untapped, inefficiently leveraged, or that produce more economic gain for foreign industries and thus represents an important area of growth that could contribute significantly to long-term resilience and security.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>1</sup> Christopher Blattman and Eduard Miguel, “Civil War,” <em>Journal of Economic Literature</em> 48 (2010), doi: 10.1257/jel.48.1.3.'
              },
              {
                org: '<sup>2</sup> John Copley, “Just How Little Do We Know About the Ocean Floor,” Scientific American, 9 October 2014,',
                url: 'https://www.scientificamerican.com/article/just-how-little-do-we-know-about-the-ocean-floor/'
              },
            ]
          }
        ] // end of els array
      },
      { // Card 1
        title: 'The Future of Aquaculture',
        menu: 'The Future of Aquaculture',
        metadata: {
          owner: 'Sarah Glaser',
          description: 'Future potential for aquaculture and cost benefit analysis (sustainability issue).'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          path: '',
          highlights: [],
          tooltip: true,
          load: function(index, file) {
            var layer = 'card-' + index + '-layer';
            var l = d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            var target = 'card-' + index + '-layer';
            var vals = issueAreaData[issueArea].metadata.countryData;

            vals.forEach(function(d, i) { // ### this is a misuse of D3! or is it?!
              if (d.ia6c1 == 1) {
                d3.selectAll('.country.' + d.iso3)
                  .classed('active', true)
                  .transition().delay(i * 10)
                  .style('fill', rampColor(0.5))
                  .style('stroke', rampColor(1));

                d3.selectAll('.eez.' + d.iso3)
                  .classed('active', true)
                  .transition().delay(i * 10)
                  .style('stroke', rampColor(1));
              }
            });

            d3.select('.' + target)
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'The Future of Aquaculture',
          },
          {
            tag: 'caption',
            text: 'Ensuring economic and food security '
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Highlighted countries had active mariculture industries in 2015.</em>'
          },
          //###<<The map complementing this section will be a choropleth map highlighting the countries that currently have active mariculture sectors.>>
          {
            tag: 'p',
            html: 'In 2015, the United Nations Food and Agriculture Organization estimated worldwide production of fish from aquaculture surpassed—for the first time in history—production of fish from the wild.<sup>3</sup> The history of aquaculture is fraught: while many laud it as the inevitable and welcome progress of time and a shift that will increase global food production, others see it as a threat to the environment, to sustainable livelihoods, and to ways of life. Both sides are likely correct.'
          },
          {
            tag: 'blockquote',
            html: '“[T]he extent of the damage to the ocean is many decades shy of the impact of industrialisation on land, and there is still time, if we act now, to get the principles and the framework for the development of the ocean economy right. Business as usual is clearly not an option.” <br />- The Economist Intelligence Unit Limited, 2015'
          },

          {
            tag: 'p',
            html: 'Most aquaculture produced today comprise freshwater species such as tilapia and carp. Marine aquaculture, or mariculture, is a rapidly expanding and highly varied industry with elements that can range from high-tech floating cages that grow bluefin tuna worth thousands of dollars each to low-tech shrimp farms that produce 90 percent of all shrimp imported to the United States. Generally, large-scale studies of aquaculture are conflicting and often inconclusive.<sup>4</sup>'
          },
          {
            tag: 'bigtext',
            html: 'Mariculture: The cultivation of marine species, such as fish and shrimp, in enclosures filled with seawater.'
          },
          //Insert graph from comms
          {
            tag: 'p',
            html: 'On the one hand, the future of aquaculture is promising: small-scale fish-farming can provide alternative forms of employment for wild fishers and farmers alike, creating economic resilience in communities vulnerable to economic and natural resource shocks.<sup>5</sup> Aquaculture may also provide new employment avenues for women, who are often overlooked in the value chains of <a class="blue-economy inline internal-ref" data-link="4">wild fisheries.</a>'
          },
          //###<<<insert video of Mama Winnie, aquaculture entrepreneur from Kenya>>>
          {
            tag: 'p',
            html: 'Aquaculture also has drawbacks. It is capital-intensive and requires significant access to and familiarity with technology and investment dollars. Mariculture typically occurs directly in marine habitats, such as mangroves or estuaries, and the resulting water pollution and habitat destruction have negative impacts for wild fisheries and the marine ecosystem in general. Finally, as aquaculture markets and demand both grow, the value chain for fisheries will be affected, and women and small-scale (i.e., poor) fishers may lose out on the market altogether.<sup>6</sup>'
          },
          {
            tag: 'p',
            html: 'Ultimately, aquaculture epitomizes the coming conflicts over usage of the marine space. Should habitats be protected for wild fish stocks, or capitalized to produce higher yields of fish that may end up feeding cows and other terrestrial animals? Should aquaculture be encouraged in order to increase the supply of (relatively) cheap, healthy protein, or should profits be maximized by encouraging production of high-value species that tend to promote market monopolization?'
          },
          {
            tag: 'p',
            html: 'In our study, only 10 of 30 countries have reported income from mariculture activities, while only Somalia did not report income from aquaculture. Aquaculture is ubiquitous, but marine aquaculture is nascent. South Africa and Madagascar are two exceptions; South Africa reported over USD$43 million from mariculture in 2015, while Madagascar reported over USD$20 million.<sup>7</sup> For Madagascar especially, this represents a significant contribution to the domestic economy. South Africa primarily grows mussels and <a class="illicit-trade inline" href="../../illicit-trade#5">abalone</a>; these stocks of bivalves are typically highly sustainable in terms of growth, feeding, and harvesting. Madagascar, on the other hand, relies on shrimp aquaculture<sup>8</sup> that is implicated in significant mangrove deforestation and water pollution. The future of aquaculture in other African nations could follow the lead of South Africa in promoting sustainable approaches to cultivating high-value species, if the global market will support it.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>3</sup> United Nations Food and Agriculture Organization, “The State of World Fisheries and Aquaculture,” 2016.',
                url: 'http://www.fao.org/3/a-i5555e.pdf'
              },
              {
                org: '<sup>4</sup> John Bostock, Brendan McAndrew, Randolph Richards, Kim Jauncey, Trevor Telfer, Kai Lorenzen, David Little, Lindsay Ross, Neil Handisyde, Iain Gatward, and Richard Corner, “Aquaculture: Global Status and Trends.” ,em>Philosophical Transactions of the Royal Society</em> 265, no. 1554 (2010): 2897–912, doi:10.1098/rstb.2010.0170.'
              },
              {
                org: '<sup>5</sup>   Randall Brummett, Jerome Lazard, and John Moehl, “African Aquaculture: Realizing the Potential,” <em>Food Policy</em> 33 (2008): 371–385, doi:10.1016/j.foodpol.2008.01.005.'
              },
              {
                org: '<sup>6</sup> Christophe Béné, Robert Arthur, Hannah Norbury, Edward Allison, Malcolm Beveridge, Simon Bush, Liam Campling, Will Leschen, David Little, Dale Squires, Shakuntala Thilsted, Max Troell, and Meryl Williams, “Contribution of Fisheries and Aquaculture to Food Security and Poverty Reduction: Assessing the Current Evidence.” <em>World Development</em> 79 (2016): 177–196, doi:10.1016/j.worlddev.2015.11.007.'
              },
              {
                org: '<sup>7</sup> United Nations Food and Agriculture Organization, “Fisheries and Aquaculture Global Statistical Collection,” 2017.',
                url: 'http://www.fao.org/fishery/statistics/en'
              },
              {
                org: '<sup>8</sup> Fisheries and Aquaculture Department, “National Aquaculture Sector Overview: Madagascar,” Food and Agriculture Organization of the United Nations, accessed 14 September 2017.',
                url: 'http://www.fao.org/fishery/countrysector/naso_madagascar/en'
              },
            ]
          }
        ] // end of els array
      },
      { // Card 2
        title: 'Marine Tourism',
        menu: 'Marine Tourism',
        metadata: {
          owner: 'Sean Duncan',
          description: 'The impact of maritime insecurity on tourism (Seychelles as impacted by piracy, Nigeria as impacted by insecurity).'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          path: '',
          highlights: [],
          tooltip: true,
          load: function(index, file) {
            // Define what the map should be.
            d3.select('.card-eez-layer')
              .classed('card-' + index + '-layer', true);
          },
          switch: function(index) {
            // Figure out what to switch to.
            var values = issueAreaData[issueArea].metadata.countryData;

            var valsArr = [];

            values.forEach(function(row, i) {
              valsArr.push(row.ia6c2);
            });

            var max = d3.max(valsArr);
            var min = d3.min(valsArr);
            var range = max - min;

            values.forEach(function(row, i) {
              d3.selectAll('.eez.' + row.iso3)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('fill', rampColor(1 - ((row.ia6c2 - min) / range)))
                .style('stroke', rampColor(1));
            });
          }
        },
        els: [{
            tag: 'h1',
            text: 'Marine Tourism',
          },
          {
            tag: 'caption',
            text: 'Why increasing maritime security pays off'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Lighter shades indicate stronger maritime tourism industries. <br> Source: <a href="http://www.oceanhealthindex.org/" target="_blank">Ocean Health Index</em>.'
          },
          {
            tag: 'p',
            html: 'Ten years ago, the emerging threat of piracy off the coast of Somalia devastated the coastal tourism industry across East Africa. In 2008, well-reported hijackings and kidnappings led to a 95 percent decrease in Kenyan cruise ship tourism.<sup>9</sup> In 2009, Seychelles concluded that piracy and armed robbery were costing the local tourism industry roughly USD$12 million per year.<sup>10</sup> These changes had immediate economic impacts. In Kenya, the loss of cruise ships removed 40,000 tourists from the economy.<sup>11</sup> In Seychelles, the reduction in tourism equated to a 1.5 percent contraction in national gross domestic product.'
          },
          {
            tag: 'img',
            src: '../../assets/blue-economy/Marle_Hullot_flicr.jpg', // This should be on the Stable Seas Deck - comments
            alt: 'Photo credit: Jean-Marle Hullot',
            caption: 'Photo credit: Jean-Marle Hullot'
          },
          {
            tag: 'bigtext',
            html: 'A recent rebound in East African maritime tourism suggests the Gulf of Guinea could see a sharp increase in tourists if maritime security issues were addressed.'
          },
          {
            tag: 'p',
            html: 'But the trends are reversible. Since instances of piracy and armed robbery off the coast of Somalia sharply decreased in 2012, the economy of Seychelles has rebounded. GDP in 2015 reached approximately USD$1.4 billion—up from the 2009 low point of USD$847 million. Since 2011, the Kenyan tourism industry has rebounded slightly, with roughly 5,000 tourists visiting by cruise ship in 2013.<sup>12</sup>'
          },

          {
            tag: 'p',
            html: 'These trends in East Africa suggest maritime insecurity in the Gulf of Guinea could be deterring tourism today. Foreigners avoid visiting high-risk locations, and the Gulf of Guinea is quickly overtaking the Western Indian Ocean as sub-Saharan Africa’s most piracy-prone <a href="http://oceansbeyondpiracy.org/reports/sop" target="_blank">maritime space.</a> Regional waters are plagued not only by piracy but also by extractives-related crime, trafficking, and other illicit activities. Tourism revenues are unlikely to be maximized until these well-publicized security threats are addressed.'
          },
          {
            tag: 'p',
            html: 'While West Africa’s tourism potential has remained largely untapped, flourishing crime and a lack of maritime governance will only inhibit the growth and development of a thriving tourism industry in the future. As the African Development Bank group has concluded, countries in West Africa lag behind other African countries when it comes to tourism.<sup>13</sup> This is a missed opportunity, as the coastal states in West Africa have unique cultures, heritages, landscapes, and goods that would appeal to tourists coming from both inside and outside the continent. The Gambia, for instance, has 80 km of beaches and rich coastal reserves that few get the chance to enjoy. Gabon is home to beautiful white-sand beaches, and an astounding 11.25 percent of the country has been set aside as national park land. Each country has something special to offer visitors. Consequently, securing the maritime environment in the Gulf of Guinea—and the rest of sub-Saharan Africa—would bolster economic development and allow the region to function more efficiently.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>9</sup> “Piracy Forces Kenya Cruise Tourism Down 95 Percent,” <em>VOA News</em>, accessed 28 August 2017,',
                url: 'https://www.voanews.com/a/piracy-forces-kenya-cruise-tourism-down-95-percent-95324914/154676.html'
              },
              {
                org: '<sup>10</sup> Robert Haywood and Roberta Spivak, <em>Maritime Piracy</em> (Abingdon: Routledge, 2012).'
              },
              {
                org: '<sup>11</sup> Joseph Akwiri, “Kenya to Build Cruise Ship Terminal at Its Biggest Port,” <em>Reuters</em>, 18 November 2015,',
                url: 'http://af.reuters.com/article/topNews/idAFKCN0T71SW20151118'
              },
              {
                org: '<sup>12</sup> Ibid.'
              },
              {
                org: '<sup>13</sup> “Tourism in West Africa: An Economic, Social and Cultural Opportunity,” African Development Bank, accessed 31 August 2017,',
                url: 'https://www.afdb.org/en/blogs/measuring-the-pulse-of-economic-transformation-in-west-africa/post/tourism-in-west-africa-an-economic-social-and-cultural-opportunity-14479/'
              },
            ]
          }
        ] // end of els array
      },
      { // Card 3
        title: 'Port Development in the Blue Economy',
        menu: 'Port Development',
        metadata: {
          owner: 'Sean Duncan',
          description: 'Describes port development in Gulf of Guinea (capacity and connetivity, overview of projects in Ghana, Togo, Benin, Nigeria, and Cameroon) and East Africa (capacity and connectivity, overview of projects in Somalia, Tanzania, Kenya, and Djibouti).'
        },
        map: {
          scale: [],
          classes: '',
          extent: [
            [-20, -45],
            [137, 27]
          ],
          translate: [],
          path: '../../data/blue-economy/world-port-index.csv',
          highlights: [],
          tooltip: true,
          load: function(index, file) {

            // What about adding a choropleth - total port capacity (all port scores added up)??
            var layer = 'card-' + index + '-layer';
            d3.csv(file, function(vals) {
              vals.forEach(function(d) {
                d.lat = +d.lat;
                d.lon = +d.lon;
                d.Harbor_2ize_code = +d.Harbor_2ize_code;
              });

              var wpi = mapg.append('g')
                .classed('card-layer wpi-layer card-0-layer ' + layer, true);

              wpi.selectAll('circle')
                .data(vals).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', function(d) {
                  return d.Harbor_2ize_code * 2;
                })
                .classed('wpi-port', true)
                .style('fill', function() {
                  return rampColor(1);
                });
            });
            // Load point data
            // Class point data with layer

          },
          switch: function(index) {
            // Figure out what to switch to.
            d3.select('.card-' + index + '-layer')
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Port Development in the Blue Economy',
          },
          {
            tag: 'caption',
            text: 'Africa\'s links to the global economy'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Larger dots indicate larger ports, smaller dots indicate smaller ports</em>.'
          },
          //###<<The map complementing this section will be a point map showing identifying small, medium, and large ports in our area of study.>>
          {
            tag: 'p',
            html: 'Foreign direct investment (FDI) in Africa has increased significantly in recent years, with a large portion of the money going into port and infrastructure development. Port investment will promote economic development through trade while reducing risks to ships entering ports around the continent.'
          },
          {
            tag: 'p',
            html: 'For instance, Dubai-based company DP World will develop the port of Berbera, a concession by Somaliland that will last for 30 years with an automatic 10-year extension.<sup>14</sup> As a result of the deal, DP World will invest up to USD$442 million in three phases to expand port infrastructure and will own 65 percent of a joint venture with Somaliland.'
          },
          {
            tag: 'p',
            html: 'This influx of FDI is positive. African ports remain largely underdeveloped overall, and the lack of proper port infrastructure continues to contribute to expensive delays stemming from the increased amount of time that vessels need to spend in port or waiting to enter a crowded port.<sup>15</sup> However, without proper maritime security and safety in these developing ports, vessels can be vulnerable to threats such as piracy and armed robbery.'
          },
          //###<<< video: https://www.youtube.com/watch?v=vM_f2g0jXTg>>>
          {
            tag: 'p',
            html: 'These threats can be detrimental to maritime trade and port revenue. For example, commerce in the Gulf of Guinea was significantly impacted during 2011 when more than 20 attacks were recorded off the coast of Benin. The port of Cotonou, which handles approximately 90 percent of the country’s foreign trade and accounts for roughly 80 percent of national fiscal revenue, experienced a steep 70 percent decline in port traffic due to piracy and armed robbery,<sup>16</sup> leading to an estimated loss of USD$81 million in customs revenue for the year as the shipping industry moved business operations to other ports and anchorages in the Gulf of Guinea.<sup>17</sup>'
          },
          {
            tag: 'p',
            html: 'Similarly, the large number of piracy and armed robbery–related incidents recorded in the Gulf of Guinea in 2015 likely had something to do with the dramatic decreases in gross tonnage handled at Nigerian ports. The Rivers and Delta port complexes recorded the largest declines in volume throughout the year, with decreases in gross tonnage of 29 percent and 33.5 percent respectively.<sup>18</sup> Enhancing port capacity would decrease the amount of time vessels spend in port and waiting to enter port, and would likely lead to increased port revenue stemming from enhanced efficiency.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>14</sup> Matina Stevis and Asa Fitch, “Dubai’s DP World Agrees to Manage Port in Somaliland for 30 Years,” <em>The Wall Street Journal</em>, 30 May 2016,',
                url: 'https://www.wsj.com/articles/dubais-dp-world-agrees-to-manage-port-in-somaliland-for-30-years-1464549937'
              },
              {
                org: '<sup>15</sup> Savahna Nightingale, “IHS Maritime: The African Paradigm Shift and the Importance of Maritime Development,” Youtube video posted 6 June 2013 by IHSChannel,',
                url: 'https://www.youtube.com/watch?v=vM_f2g0jXTg'
              },
              {
                org: '<sup>16</sup> United Nations Security Council, “Report of the United Nations Assessment Mission on Piracy in the Gulf of Guinea (7 to 24 November 2011),” United Nations Security Council Report S/2012/45, 19 January 2012,',
                url: 'http://www.securitycouncilreport.org/atf/cf/%7B65BFCF9B-6D27-4E9C-8CD3-CF6E4FF96FF9%7D/AUUN%20S%202012%2045.pdf'
              },
              {
                org: '<sup>17</sup> Ibid.'
              },
              {
                org: '<sup>18</sup> “2015 Full Year Report,” Nigerian Ports Authority, accessed 28 August 2017,',
                url: 'https://www.nigerianports.org/dynamicdata/uploads/YearlyReports/2015-FULL-YEAR-REPORT.pdf'
              },
            ]
          }
        ] // end of els array
      },
      { // Card 4
        title: 'The Invisible Fishers',
        menu: 'The Invisible Fishers',
        metadata: {
          owner: 'Laura Burroughs',
          description: 'Women\'s work goes unrecognized in fisheries sector; highlight women\'s role in processing in Sierra Leone and related challenges.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          path: '',
          extent: [
            [-15, 15],
            [8, -1]
          ],
          highlights: [],
          tooltip: true,
          load: function(index, file) {
            var layer = 'card-' + index + '-layer';
            // Load higher resolution Sierra Leone layer

            // Load point data

            // Class point & GIS data with layer
            d3.select('.card-eez-layer')
              .classed(layer, true);

          },
          switch: function(index) {
            // Figure out what to switch to.
            var values = issueAreaData[issueArea].metadata.countryData;

            var valsArr = [];

            values.forEach(function(row, i) {
              valsArr.push(row.ia6c4);
            });

            var max = d3.max(valsArr);
            var min = d3.min(valsArr);
            var range = max - min;

            values.forEach(function(row, i) {
              d3.selectAll('.eez.' + row.iso3)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('fill', rampColor(1 - ((row.ia6c4 - min) / range)))
                .style('stroke', rampColor(1));
            });
          }

        },
        els: [{
            tag: 'h1',
            text: 'The Invisible Fishers',
          },
          {
            tag: 'caption',
            text: 'The overlooked role of women in fisheries supply chains'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Lighter shades indicate greater opportunities for artisanal fishing<br />\
              Source: <a href="http://www.oceanhealthindex.org/" target="_blank">Ocean Health Index</a></em>.'
          },
          {
            tag: 'bigtext',
            html: '“[T]he extent of the damage to the ocean is many decades shy of the impact of industrialisation on land, and there is still time, if we act now, to get the principles and the framework for the development of the ocean economy right. Business as usual is clearly not an option.” - The Economist Intelligence Unit Limited, 2015'
          },
          //###<<<The map complementing this section will be a zoom in on Sierra Leone>>>
          {
            tag: 'p',
            html: 'Imagine a person who makes their living from fisheries. The picture is likely of a “fisherman” traveling out to sea in a boat to catch fish. However, the fisheries value chain consists of many important links, from the mending of nets to the drying of fish for sale, and women make up a large and vital portion of this sector. In fisheries, women comprise the majority of processing and post-harvest workers worldwide; the Food and Agriculture Organization of the United Nations (FAO) estimates over 90 percent of this sector is women.<sup>19</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/blue-economy/Youpwe_Fishing_Village8S6A6034_JP.jpg',
            alt: 'Women play a key role in the fisheries value chain. Photo: Jean-Pierre Larroque',
            caption: 'Women play a key role in the fisheries value chain. Photo: Jean-Pierre Larroque'
          },
          {
            tag: 'p',
            html: 'Despite the vital roles women play in the fisheries value chain, fishing is most often perceived to be men’s work. Women’s work in the fisheries sector often goes unrecognized by creditors, policymakers, development programs, and in research, resulting in a lack of support for their work, lack of access to markets, and exclusion from fisheries management and policy decisions. This is problematic for women’s livelihoods and empowerment, and it distorts fisheries data and results in misinformed management measures. Women’s work in the fisheries sector must be understood and supported in order to advance gender equity, food security, and effective fisheries management.'
          },
          //###<<<photo of women fishers in Sierra Leone>>>
          {
            tag: 'p',
            html: 'In Sierra Leone, the fisheries sector provides substantial revenue and employment, supporting over 500,000 people.<sup>20</sup> Around 85 percent of those employed in fisheries processing are women.<sup>21</sup> Women and men generally occupy complementary roles in the value chain. Men catch fish from canoes or work from shore in groups to pull in nets of fish.<sup>22</sup> Once they come into port, they sell their catch to women who then perform the post-harvest activities, such as cleaning and drying the fish or bringing it directly to markets for sale. Much of the fish is obtained from family members and most of the processing work is conducted within the home rather than in formal facilities.'
          },
          {
            tag: 'p',
            html: 'Beyond post-harvest work, some women also catch fish directly, using nets to catch small fish in rivers and other small water bodies. Some women even lease boats and own fishing companies.<sup>23</sup> The fisheries sector and processing in particular provide important livelihood opportunities for women. However, their incomes are still much lower than those of their male counterparts,<sup>24</sup> and many women report struggling with other restrictive factors.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>19</sup> Food and Agriculture Organization of the United Nations, “Promoting Gender in Fisheries Activities in Somalia,” <em>Blue Growth Blog</em>, 5 June 2016,',
                url: 'http://www.fao.org/blogs/blue-growth-blog/promoting-gender-in-fisheries-activities-in-somalia/en/'
              },
              {
                org: '<sup>20</sup> “Sierra Leone News: Revitalizing the Fishing Sector,” <em>Awoko Newspaper</em>, 22 June 2017,',
                url: 'http://awoko.org/2017/06/22/sierra-leone-news-revitalizing-the-fishing-sector/'
              },
              {
                org: '<sup>21</sup> Andy Thorpe, Nicky Pouw, Andrew Baio, Ranita Sandi, Ernest Ndomahina, and Thomas Lebbie, “\'Fishing Na Everybody Business\’: Women\’s Work and Gender Relations in Sierra Leone\’s Fisheries,” <em>Feminist Economics</em> 20, no. 3 (April 2014): 53–77,',
                url: 'http://dx.doi.org/10.1080/13545701.2014.895403'
              },
              {
                org: '<sup>22</sup> Larry Tucker, “What We Can Learn from Artisanal Fishermen, Fish-women in Sierra Leone,” SwitSalone, 15 February 2017,',
                url: 'http://www.switsalone.com/24920_what-we-can-learn-from-artisanal-fishermen-fish-women-in-sierra-leone/'
              },
              {
                org: '<sup>23</sup> P.B. Browne, “Women Do Fish: A Case Study on Gender and the Fishing Industry in Sierra Leone” in <em>Global Symposium on Women in Fisheries</em>, eds. M.J. Williams, N.H. Chao-Liao, P.S. Choo, K. Matics, M.C. Nandeesha, M. Shariff, I. Saison, E. Tech, J.M.C Wong (Penang, Malaysia: ICLARM—The World Fish Centre, 2002): 169–172,',
                url: 'http://pubs.iclarm.net/resource_centre/WF_328.pdf'
              },
              {
                org: '<sup>24</sup> Ibid.'
              },
            ]
          }
        ] // end of els array
      },
      { // Card 5
        title: 'Sustainability in the Blue Economy',
        menu: 'Sustainability in the Blue Economy',
        metadata: {
          owner: 'Sean Duncan',
          description: 'Sustainable vs unsustainable economic growth, focus on Cabo Verde, Namibia, Guinea, Liberia.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          path: '',
          highlights: [],
          tooltip: true,
          load: function(index, file) {
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            var values = issueAreaData[issueArea].metadata.countryData;

            var valsArr = [];

            values.forEach(function(row, i) {
              valsArr.push(row.ia6c4);
            });

            var max = d3.max(valsArr);
            var min = d3.min(valsArr);
            var range = max - min;

            values.forEach(function(row, i) {
              if (row.ia6c5 > 0) {

                d3.selectAll('.eez.' + row.iso3)
                  .classed('active', true)
                  .transition().delay(i * 10)
                  .style('fill', rampColor(1 - ((row.ia6c5 - min) / range)))
                  .style('stroke', rampColor(1));
              }
            });
          }

        },
        els: [{
            tag: 'h1',
            text: 'Sustainability in the Blue Economy',
          },
          {
            tag: 'caption',
            text: 'Toward a more accurate measure of development'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Lighter shades indicate higher Adjusted Net Savings (ANS) scores.<br />Source: <a href="https://data.worldbank.org/products/data-books/little-green-data-book" target="_blank">World Bank</a></em>.'
          },
          {
            tag: 'blockquote',
            html: '“The extent of the damage to the ocean is many decades shy of the impact of industrialisation on land, and there is still time, if we act now, to get the principles and the framework for the development of the ocean economy right. Business as usual is clearly not an option.” <br />Source: The Economist Intelligence Unit Limited, 2015'
          },
          {
            tag: 'p',
            html: 'So begins an extensive—and ultimately optimistic—recent review of the Blue Economy framework by The Economist Intelligence Unit for the World Ocean Summit. The Blue Economy is more than a system of accounting and dollar signs attached to ocean-based enterprises. It is an aspirational framework that seeks to guide maritime development in a manner that is sustainable and equitable. Consequently, the Blue Economy framework includes progressive and novel metrics that provide a more holistic view of economic growth.'
          },
          {
            tag: 'video',
            videoId: 'sQCon-JSpfA',
            thumb: '../../assets/blue-economy/drought_famine_video.jpg' // ###
          },
          {
            tag: 'p',
            html: 'Adjusted net savings (ANS) measures sustainable development by examining changes in comprehensive wealth after accounting for depletion of natural resources and investments in human capital.<sup>26</sup> One of the core principles behind ANS is that it is necessary for countries to create a surplus investment in order to escape low-level subsistence—which is particularly relevant in the African context.'
          },
          {
            tag: 'p',
            html: 'High values of ANS suggest that a country’s degradation of natural resources and changes in human capital are being balanced by net savings—indicating sustainable growth. In our study, Cabo Verde and Namibia had the highest ANS scores in 2016. Both nations benefited from high gross domestic savings, and Namibia saw large investments into education. Conversely, if ANS numbers are negative over multiple years, it indicates that the country is on an unsustainable path. Guinea, for instance, had the lowest measured value out of any country in the world. This is because Guinea suffers from resource depletion (represented by high rates of both mineral and net forest depletion), but also from negative gross domestic savings—indicating that the Guinean economy is expending more income than it produces.'
          },

          {
            tag: 'p',
            html: 'Climate change presents varied risks to sustainable economic development: depending on the underlying biome and other geophysical considerations, a given nation may experience more or less rainfall in the future, the rise in sea surface temperature may be minor or major, and sea-level rise may or may not threaten coastal developments. The risk of conflict is strongly related.<sup>27</sup>  The ND-GAIN climate vulnerability index<sup>28</sup> accounts for 75 different climate-related variables.'
          },
          {
            tag: 'p',
            html: 'The Somali region ranks last in this measure of climate vulnerability, indicating that the economy and people are the most vulnerable to the impacts of climate change in the future. In the Horn of Africa, the physical connections between ocean dynamics like temperature and terrestrial dynamics like rainfall are strongly linked. The Somali region is currently facing one of the worst droughts in its history—over 22 million people are at risk of starvation. And while short-term climate impacts are most profound—and visible—on land, the impacts on the ocean will not be avoided. Just when the Somali fishing sector is attracting both domestic and international investment, the species that inhabit Somali waters might migrate elsewhere and short-circuit this nascent economic sector.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>25</sup> The Economist Intelligence Unit, <em>“The Blue Economy: Growth, Opportunity and a Sustainable Ocean Economy,”</em> Briefing Paper presented at the World Ocean Summit 2015,',
                url: 'https://www.eiuperspectives.economist.com/sustainability/blue-economy'
              },
              {
                org: '<sup>26</sup> Environmental Department of the World Bank, “Beyond GDP: Measuring Progress, True Wealth, and the Well Being of Nations,” contribution to Beyond GDP Virtual Indicator Expo, 29 June 2012,',
                url: 'http://ec.europa.eu/environment/beyond_gdp/download/factsheets/bgdp-ve-ans.pdf'
              },
              {
                org: '<sup>27</sup> Cullen Hendrix and Idean Salehyan, “Climate Change, Rainfall, and Social Conflict in Africa,” <em>Journal of Peace Research</em> 49 (2012), doi: 10.1177/0022343311426165.'
              },
            ]
          }
        ] // end of els array
      },
      { // Card 6
        title: 'Oil and Gas',
        menu: 'Oil and Gas',
        metadata: {
          owner: 'John Filitz',
          description: 'Oil and gas.'
        },
        map: {
          path: '../../data/blue-economy/offshore-oil.json',
          scale: [],
          classes: '',
          extent: [
            [-20, -65],
            [105, 50]
          ],
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, file) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';
            d3.json(file, function(error, offshoreOil) {

              var oilInfrastructure = mapg.append('g')
                .classed('card-layer invisible ' + layer, true);

              oilInfrastructure.selectAll('.offshore-oil')
                .data(topojson.feature(offshoreOil, offshoreOil.objects.offshoreOil).features)
                .enter()
                .append('path')
                .attr('d', path)
                .style('fill', function() {
                  return rampColor(0.5);
                })
                .style('stroke', 'white')
                .classed('offshore-oil', true);
            })
            // Load offshore oil infrastructure layer

            // Class with layer

          },
          switch: function(index) {
            d3.selectAll('.card-' + index + '-layer')
              .classed('invisible', false);
          }
        },

        els: [{
            tag: 'h1',
            text: 'Oil and Gas',
          },
          {
            tag: 'caption',
            text: 'Africa’s natural resource bonanza'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: 'Light blue polygons represenet known offshore oil and gas deposits in sub-Saharan Africa. <br> Source: PRIO'
          },
          //###<<<The map complementing this section will be a choropleth map of the offshore oil and gas producing nations in our study>>>
          {
            tag: 'p',
            html: 'Sub-Saharan Africa may hold 203 billion barrels of recoverable oil resources, and the region accounted for 30 percent of global oil and gas discoveries made from 2009 to 2014.<sup>29</sup> These discoveries have boosted the reserves of major oil producers like Nigeria and Angola (the world’s 16th and 17th largest producers, respectively)<sup>30</sup> while also bringing new countries into the international oil and gas trade, including Kenya, Madagascar, and Mozambique.<sup>31</sup>'
          },
          {
            tag: 'bigtext',
            html: 'Sub-Saharan Africa accounted for 30 percent of global oil and gas discoveries made from 2009 to 2014.'
          },
          {
            tag: 'p',
            html: 'Although some of these recent discoveries are, at this stage, deemed to be non-transformative, these resources could potentially play a key role in meeting the current and future domestic energy demands of sub-Saharan African countries in addition to being a key earner in foreign exchange. Realizing sub-Saharan Africa’s natural resource energy potential requires continuing investment in further exploration, shortening the transition from exploration to production, and creating a more certain political and regulatory environment. Arguably the most challenging binding constraint in this sector concerns the high levels of corruption and rent-seeking in sub-Saharan African natural resource–rich states: for example, Africa’s largest oil and gas producers, Nigeria and Angola, ranked poorly as 136th and 164th out of 176 countries, respectively, according to <a href="https://www.transparency.org/research/cpi/overview" target="_blank">Transparency International’s 2016 Corruption Perceptions Index</a>.<sup>32</sup>'
          },
          {
            tag: 'p',
            html: 'While governance challenges remain, Africa’s oil and gas bounty will nevertheless undoubtedly play a crucial role in the future social and economic development of the continent. This was underscored at the 37th Ordinary Southern African Development Community (SADC) Summit, when the newly elected Chair of the SADC, South Africa’s President Jacob Zuma, noted:'
          },
          {
            tag: 'blockquote',
            html: '“One of the potential game-changers for the region is the discovery of globally significant natural gas resources both onshore and offshore in a number of our member states. As a new initiative, we are proposing the establishment of an Inter-state Natural Gas Committee to share learning for regional gas development and to prepare for the development of the wider gas economy. As such, the inclusion and promotion of gas into the regional energy mix will facilitate an increase in universal access to energy, as well as industrial development in SADC.”<sup>33</sup>'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>28</sup> International Energy Agency, “Africa Energy Outlook: A Focus on Energy Prospects in Sub-Sharan Africa,” World Energy Outlook Special Report, 2014,',
                url: 'https://www.iea.org/publications/freepublications/publication/WEO2014_AfricaEnergyOutlook.pdf'
              },
              {
                org: '<sup>29</sup> Ibid.'
              },
              {
                org: '<sup>30</sup> “Corruption Perceptions Index 2016,” Transparency International, 25 January 2017,',
                url: 'https://www.transparency.org/news/feature/corruption_perceptions_index_2016'
              },
              {
                org: '<sup>31</sup> Jacob Zuma, “Acceptance Speech by President Jacob Zuma on the Occasion of the 37th SADC Summit of Heads of State and Government, Pretoria, 19th of August 2017,” The Presidency of the Republic of South Africa,',
                url: 'http://www.thepresidency.gov.za/speeches/acceptance-speech-president-jacob-zuma-occasion-37th-sadc-summit-heads-state-and-government'
              },
              {
                org: '<sup>32</sup> “Corruption Perceptions Index 2016,” Transparency International, 25 January 2017,',
                url: 'https://www.transparency.org/news/feature/corruption_perceptions_index_2016'
              },
            ]
          }
          //###INSERT BLOCKQUOTE: “One of the potential game-changers for the region is the discovery of globally significant natural gas resources both onshore and offshore in a number of our member states. As a new initiative, we are proposing the establishment of an Inter-state Natural Gas Committee to share learning for regional gas development and to prepare for the development of the wider gas economy. As such, the inclusion and promotion of gas into the regional energy mix will facilitate an increase in universal access to energy, as well as industrial development in SADC.”<sup>33</sup>
        ] // end of els array
      },
      // { // Card 7
      //   title: 'Methodology',
      //   menu: 'Methodology',
      //   metadata: {
      //     owner: 'Curtis Bell',
      //     description: 'Methods.'
      //   },
      //   map: {
      //     scale: [],
      //     classes: 'card-7-layer',
      //     translate: [],
      //       //highlights: null,
      //     load: function (index, file) {  // ### *** This only should be for the first card ...
      //       // Color EEZ according to master Stable Seas index
      //       var layer = 'card-'+index+'-layer';
      //
      //       d3.select('.card-eez-layer')
      //         .classed(layer, true);
      //     },
      //     switch: function (index) {
      //       switchMainIndex(0);
      //     }
      //   },
      //   els: [
      // { tag: 'h1',
      //   text: 'Methodology'
      // },
      // { tag: 'p',
      //   text: 'The Blue Economy Score incorporates six central concepts: fisheries, marine and coastal tourism, maritime transportation and shipping, offshore oil and gas, adjusted net savings, and climate change. These variables were chosen after a review of the literature pertaining to the Blue Economy generally (i.e., globally) and the Blue Economy in Africa specifically. These variables were commonly cited as being the most important components of the Blue Economy and most relevant to current and future trends in Africa. We calculate these six scores and then average them across the six areas. We provide an overview of our methodology below and a more complete technical summary in the supporting materials for download.'
      // },
      // { tag: 'h3',
      //   text: 'Inputs'
      // },
      // { tag: 'h4',
      //   text: 'Fisheries'
      // },
      // { tag: 'p',
      //   text: 'Fisheries are an important part of the economy throughout Africa. In some countries, fisheries products are the top-grossing export. In others, the income from artisanal and small-scale fisheries are important for livelihoods. We combine the value (in U.S. dollars) of wild-caught fisheries and mariculture (aquaculture occurring in the marine environment or of marine species) for this input. Value of wild-caught fish for a given country (i.e., excluding fish caught by foreign-flagged vessels) was obtained from the Sea Around Us program. Value of mariculture by a given country was obtained from the UN Food and Agriculture Organization’s Global Statistical collection. The values were summed and then standardized by dividing by total population of the given country as reported by the World Bank.'
      // },
      // { tag: 'h4',
      //   text: 'Marine and Coastal tourism'
      // },
      // { tag: 'p',
      //   text: 'Sustainable coastal tourism supports jobs and livelihoods in coastal communities. We use the score from the Tourism and Recreation Score in the Ocean Health Index.<sup>34</sup> The Ocean Health Index  measures countries on biological, physical, economic, and social factors to assess how sustainably humans are using the ocean. The Tourism and Recreation Score measures the proportion of the total labor force engaged in the coastal tourism and travel sector, factoring in unemployment and sustainability. Countries where such employment was 9.5 percent or greater of the total labor force received a perfect score (100). The Ocean Health Index collects data for all countries of the world and issues annual updates. We used the Tourism and Recreation Score directly.'
      // },
      // { tag: 'h4',
      //   text: 'Marine Transportation and Shipping'
      // },
      // { tag: 'p',
      //   text: 'Maritime ports and the shipping and commerce they support are pillars of the Blue Economy. Large, well-functioning ports support larger volumes of shipping and greater export and import markets, and link national economies to the global economy. We calculated this score by combining two sub-scores: port quantity and port quality. Port quantity was calculated from the Liner Shipping Connectivity Index, a national-level metric developed by the United Nations Conference on Trade and Development which accounts for number of ships, container capacity of those ships, maximum vessel size, number of services, and number of companies that operate in ports. We developed our own port quality metric that accounted for harbor size plus availability of the following services: first port of entry, tug assist, air and rail communications, medical facilities, water and fuel supplies, and dry-dock repair. The overall transportation score was calculated by equally weighting the port quantity and quality sub-scores.'
      // },
      // { tag: 'h4',
      //   text: 'Offshore Oil and Gas'
      // },
      // { tag: 'p',
      //   text: 'Offshore oil and natural gas development contributes substantially to the economies of some African nations, like Nigeria, but the distribution is highly skewed: of the 30 nations included in this report, 17 of them gain no income from offshore oil or gas. For oil, we placed nations into one of five tiers based on volume of proven reserves, ultimately recoverable oil, cumulative production, and remaining recoverable resources. Tier 1 countries had high volumes of offshore oil, while Tier 5 countries had no proven reserves or current production. For natural gas we placed nations into one of four tiers based on the same criteria. Tiers were converted to scores between 0 and 1 and the oil and gas scores were averaged.'
      // },
      // { tag: 'h4',
      //   text: 'Adjusted Net Savings'
      // },
      // { tag: 'p',
      //   text: 'Adjusted net savings (ANS) is a measure of true savings in a country after taking into account depletion of natural resources and damages, as well as investments in human capital.<sup>35</sup> .  Many economists have adopted ANS as a metric that overcomes some shortfalls in using gross domestic product to measure economic growth and development. ANS is derived from the standard national accounting measure of gross saving by making four adjustments: consumption of fixed capital is deducted to obtain net national saving; current public expenditure on education is added to account for investment in human capital; estimates of the depletion of a variety of natural resources are deducted to reflect the decline in asset values associated with extraction and depletion; and deductions are made for damages from carbon dioxide and particulate emissions. We use ANS measures from the World Bank’s World Development Indicators <i>Little Green Data Book</i>. Values for 23 of the countries here were used, and the regional average was used for countries without ANS values. Raw scores ranged from −47.8 to 36.9, so we normalized scores and benchmarked regional values to the global range.'
      // },
      // { tag: 'h4',
      //   text: 'Climate Vulnerability'
      // },
      // { tag: 'p',
      //   text: 'Several components of the Blue Economy, such as fisheries and tourism, may be affected by global climate change. To account for this risk, we included a measure of vulnerability to climate change. We used the University of Notre Dame’s Global Adaptation Index<sup>37</sup>   (known as ND-GAIN). The index measures a country’s vulnerability to climate change based on: (1) exposure to climate-related or climate-exacerbated hazards, (2) sensitivity to the hazard’s impacts, and (3) capacity to adapt or manage to the impacts. We use the ND-GAIN Vulnerability score which is calculated at a national scale and updated annually.'
      // },
      // { tag: 'links',
      //   items: [
      //     {org: '<sup>32</sup> “The Ocean Health Index,” Ocean Health Index, accessed 1 September 2017,', url: 'http://www.oceanhealthindex.org'},
      // /// ### added http to the website as original did not include it. Please check if valid.
      //     {org: '<sup>33</sup> World Bank, <em>The Little Green Data Book 2017</em>, World Development Indicators (Washington, DC: World Bank, 2017),', url: 'https://openknowledge.worldbank.org/handle/10986/27466 License: CC BY 3.0 IGO'},
      //     {org: '<sup>34</sup> Ibid.'},
      //   ]
      // }
      //   ]
      // }
    ]
  },
  fisheries: {
    metadata: { // Independent data source for each page
      version: '0.0.2',
      name: 'Fisheries',
      updates: true,
      /*
           here is where you write updates
           do one line per update, like
           added legend to card 3
           added citations to card 5
           input thumbnail path to card 4
           loaded point data

           */
      index: 7,
      code: 'fisheries',
      path: 'fisheries',
      countryData: [],
      csv: '../../data/fisheries/fisheries.csv',
      color: '#06A89D',
      order: -1,
      description: 'Fish are one of the last remaining wild sources of protein on the planet, and are a critical component of both food and economic security.'
    },
    load: function(csv, callback) {
      console.log('no fisheries data yet')
      d3.csv(csv, function(vals) {
        vals.forEach(function(d) {
          d.ia7c0 = +d.ia7c0;
          d.ia7c2 = +d.ia7c2;
        });
        issueAreaData[issueArea].metadata.countryData = vals;
        callback('coastalWelfare load csv function callback');
      });
    },
    cards: [{ // Card 0
        title: 'Fisheries',
        menu: 'Fisheries',
        metadata: {
          owner: 'Sarah Glaser',
          description: 'Introduces the issue.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          path: '',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, file) {
            var layer = 'card-' + index + '-layer';
            var l = d3.select('.card-eez-layer')
              .classed(layer, true);

          },
          switch: function(index) {
            d3.selectAll('.eez')
              .classed('active', true);

            switchMainIndex(index);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Fisheries',
          },
          {
            tag: 'caption',
            text: 'A critical component of food and economic security'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Lighter shades indicate a lower share of the reported marine fishing catch is caught by foreign fishing vessels</em> <br> Source: <a href="http://www.seaaroundus.org/" target="_blank">Sea Around Us</a>'
          },
          {
            tag: 'p',
            html: 'Fish are one of the last remaining wild sources of protein on the planet and they are a critical component of both food and economic security around the world. Fish provide a low-fat source of vitamins, iron, and calcium for billions of people, especially in countries designated as Low-Income Food-Deficit Countries by the UN Food and Agriculture Organization (FAO).<sup>1</sup>'
          },

          // { tag: 'h3',
          //   text: 'The Fisheries Scores'
          // },
          // {tag: 'indexTable'
          // },
          // { tag: 'caption',
          //   text: 'Note: scores are rounded to the nearest whole number.'
          // },
          {
            tag: 'p',
            html: 'In Africa, fisheries employ 5.6 million people as fishers or fish farmers and international trade in fisheries products is a pillar of national economies, particularly in Cabo Verde and Seychelles.<sup>2</sup>'
          },
          {
            tag: 'p',
            html: 'Tuna and small, schooling fishes like sardines and anchovies make up the vast majority of global fish catch, and these migratory species tend to ignore national borders. As fish stocks face shortages and even collapse, competition for fishing grounds and for this mobile resource is growing.'
          },
          {
            tag: 'p',
            html: 'At sea, fisheries conflict can include violent attacks by foreign industrial vessels on domestic artisanal vessels; illegal, unreported, and unregulated (IUU) fishing; <a class="inline maritime-mixed-migration" href="../../maritime-mixed-migration#5">forced labor and slavery;</a> and <a class="inline international-cooperation" href="../../international-cooperation#2">territorial disputes</a> between and within national borders.'
          },
          {
            tag: 'p',
            html: 'Fishing vessels can also be used to surreptitiously transport weapons, drugs, and other illicit goods. Fisheries therefore contribute directly and indirectly to maritime security by stoking territorial and resource-based conflicts and by providing food and income that produce community resilience and reduce the root causes of conflict.'
          },
          // { tag: 'p',
          //    html: 'Our Fisheries Score considers five factors: presence of foreign fishing fleets, domestic fisheries law, membership in relevant regional fisheries management organizations (RFMOs), coastal pollution, and ecological health of fisheries. For more information about how these scores are calculated, please see our <a class="internal-ref inline fisheries" href="#" data-link="6">Methodology</a>'
          //  },
          {
            tag: 'p',
            html: 'When fisheries are abundant and well managed, they can contribute to maritime security by boosting national economies, local livelihoods, and nutrition. Nations that have formal governance mechanisms and strong fisheries laws are better able to monitor and enforce policies that support healthy fisheries. Likewise, clean waters and healthy fish stocks support economic growth and reinforce governance norms.'
          },
          {
            tag: 'p',
            html: 'Nations that do not prioritize fisheries management and governance are not fully leveraging a critical natural resource and may lose profits and food to larger, faster foreign and distant-water fishing fleets.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>1</sup> Low-Income Food-Deficit Countries, or LIFDCs, are defined by the UN FAO as countries that have an annual net income per person at a level that qualifies for International Development Association assistance (currently $1,395 per person) and are net importers of food; “Low-Income Food-Deficit Countries,” The Food and Agriculture Organization of the United Nations, accessed 1 September 2017.',
                url: 'http://www.fao.org/focus/e/SpeclPr/LIFDCs.htm'
              },
              {
                org: '<sup>2</sup> <em>The State of World Fisheries and Aquaculture 2016</em> (Rome: The Food and Agriculture Organization of the United Nations, 2016).',
                url: 'http://www.fao.org/3/a-i5555e.pdf'
              },
            ]
          }
        ] // end of els array
      },
      { // Card 1
        title: 'IUU Fishing',
        menu: 'IUU Fishing',
        metadata: {
          owner: 'Sarah Glaser',
          description: 'How IUU fishing undermines security, with link to maritime mixed migration and slavery at sea.'
        },
        map: {
          path: '../../data/ia7c1.csv',
          scale: [],
          classes: '',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, file) {
            var layer = 'card-' + index + '-layer';
            // Load point data from Stimson Center research
            d3.csv(file, function(rows) {
              rows.forEach(function(d) {
                d.lat = +d.lat;
                d.lon = +d.lon;
              });

              var iuuIncidents = mapg.append('g')
                .classed('card-layer invisible ' + layer, true);

              iuuIncidents.selectAll('.iuu-incidents')
                .data(rows)
                .enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', '8px')
                .classed('iuu-incidents', true);

            })
            // Class GIS layer with layer:
            d3.select(layer)
              .classed('invisible', true);
          },
          switch: function(index) {
            d3.select('.card-' + index + '-layer')
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            html: 'Illegal, Unreported, and Unregulated Fishing',
          },
          {
            tag: 'caption',
            text: 'Fueling maritime insecurity'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Reported incidents of IUU fishing that converge with US national or regional security in sub-Saharan Africa during 2016. <br> Source: <a href="https://www.stimson.org/" target="_blank">Stimson Center</a></em>'
          },
          {
            tag: 'p',
            html: 'Illegal, unreported, and unregulated (IUU) fishing exacerbates maritime insecurity and fuels armed conflict at sea, undermines national and international governance, and threatens the sustainability of fisheries. IUU fishing costs Mauritania, Senegal, The Gambia, Guinea-Bissau, and Sierra Leone $2.3 billion per year.<sup>3</sup>  About 37% of all fish catch off West Africa and 18% off East Africa is considered illegal or unreported.<sup>4</sup>  Foreign unregulated fishing accounts for twice as much fish catch as that made by the domestic artisanal fishing fleet in Somali waters.<sup>5</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/fisheries/legal-vs-illegal-fishing.png', // This should be on the Stable Seas Deck - comments
            alt: 'Source: Agnew, et al, (2009) Estimating the Worldwide Extent of Illegal Fishing, PLoS One, 4(2)',
            caption: 'Source: Agnew, et al, (2009) Estimating the Worldwide Extent of Illegal Fishing, PLoS One, 4(2)'
          },
          {
            tag: 'p',
            html: 'While good estimates can be difficult to make, the emerging picture is clear: IUU fishing deprives African fishers of a significant source of income, and much of it is driven by distant-water fishing fleets from Europe and Asia.'
          },
          {
            tag: 'p',
            html: 'Illegal fishing occurs in contravention of local, national, regional, or international law and can include fishing with banned gear, in closed locations or seasons, or without proper permission. Unreported fishing refers to fish catch that is not fully recorded or reported to proper authorities, often entering an illegal market. Unregulated fishing is that which occurs in areas lacking regulations to ensure resource sustainability and good management.'
          },
          //Possibly delete paragraph above if comms can produce usable infographic
          {
            tag: 'p',
            html: 'Fortunately, growing attention to the challenge represented by IUU fishing and strong international will to solve this problem have produced a host of projects, alliances, and policies. The non-profit organization, <a href="https://stopillegalfishing.com/" target="_blank">Stop Illegal Fishing</a>, has made significant progress in Africa by bringing attention to the problem of illegal fishing and partnering with governments, NGOs, civil society, and the fishing industry to stop illegal fishing in African waters. The <a href="http://www.naturalsecurityforum.org/" target="_blank">Stimson Center’s Natural Security Forum</a> is tracking and mapping IUU fishing around the world. <a href="http://www.globalfishingwatch.org" target="_blank">Global Fishing Watch</a>, a partnership between the Leonardo DiCaprio Foundation, Oceana, Google, and SkyTruth, is using satellite data to track and monitor fishing vessels around the world.'
          },
          {
            tag: 'p',
            html: 'Additionally, in 2016 the Port State Measures Agreement (PSMA) entered into force with ratification by 25 countries, including Cabo Verde, Gabon, The Gambia, Ghana, Guinea, Madagascar, Mauritius, Mozambique, Sao Tome & Principe, Senegal, Seychelles, Somalia, South Africa, and Togo. The PSMA is an international treaty written by the UN Food and Agriculture Organization that strengthens enforcement and monitoring capabilities at ports to reduce the amount of IUU fish entering global marketplaces. The strong support from African nations is a promising sign of political will to increase maritime domain awareness around fisheries issues and to prioritize the health of wild fisheries.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>3</sup> Alkaly Doumbouya, Ousmane T. Camara, Josephus Mamie, Jeremias F. Intchama, Abdoulie Jarra, Salifu Ceesay, Assane Guye, Diene Ndiaye, Elye Beibou, Allan Padilla, and Dyhia Belhabib, “Assessing the Effectiveness of Monitoring Control and Surveillance of Illegal Fishing: The Case of West Africa,” <em>Frontiers in Marine Science</em> 50, no. 4 (2017), doi: 10.3389/fmars.2017.00050.'
              },
              {
                org: '<sup>4</sup> D.J. Agnew, J. Pearce, G. Pramod, T. Peatman, R.A. Watson, J.R. Beddington, and T.J. Pitcher, “Estimating the Worldwide Extent of Illegal Fishing,” <em>PloS One</em> 4, no. 2 (2009), e4570.',
                url: 'http://doi.org/10.1371/journal.pone.0004570'
              },
              {
                org: '<sup>5</sup> Sarah Glaser, Paige Roberts, Robert Mazurek, Kaija Hurlburt, and Liza Kane-Hartnett, <em>Securing Somali Fisheries</em> (Denver: One Earth Future, 2015), doi: 10.18289/OEF.2015.001.'
              },
            ]
          }
        ] // end of els array
      },
      { // Card 2
        title: 'Fisheries Laws',
        menu: 'Fisheries Laws',
        metadata: {
          owner: 'Kelsey Soeth',
          description: 'How we define good policy, development of legislation, enforcement.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          path: '',
          highlights: [],
          tooltip: true,
          load: function(index, file) {

            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            switchMainIndex(index);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Fisheries Laws',
          },
          {
            tag: 'caption',
            text: 'National efforts to protect a vital resource'
          },

          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Lighter shades indicate stronger national fisheries legislation.</em>'
          },
          {
            tag: 'p',
            html: 'Minimizing conflict around fisheries requires strong national policies and resource governance, and most African states have enacted domestic fisheries legislation. We identified key factors these policies should include: legislative provisions that remain in force, an observer program, data collection, foreign-vessel licensing, restrictions on foreign vessels, gear restrictions, endangered species protections, artisanal fisher protections, and catch limits based on maximum sustainable yield (MSY).<sup>6</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/fisheries/Somaliland_fisherman_8S6A1185_JP_photo.jpg',
            alt: '',
            caption: ''
          },

          // { tag: 'p',
          //   html: 'By our criteria, the African nations considered here scored well. More than one-third of the states had provisions for at least seven of nine factors in their fisheries legislation. All countries but Cameroon, which recently repealed their domestic fisheries legislation without replacement, have current federal fisheries legislation in place. Gear restrictions and provisions for the collection of scientific and statistical data were commonly mandated. Two-thirds of countries have also included foreign-vessel licensing and protections for artisanal fishers in their legislation.'
          // },
          {
            tag: 'blockquote',
            html: '“Seeing the results of the Pristine Seas expedition made me realize that our marine ecosystems were as rich and as precious as our better-known rain forests, and that we had to do for the oceans what my father, the late President Omar Bongo Ondimba, did for the forests when he created 13 national parks in 2002.” — President Ali Bongo Ondimba of Gabon'
          },
          {
            tag: 'p',
            html: 'Endangered species protection was the only legislative factor included by fewer than one-third of states. However, a lack of endangered species protection in fisheries legislation does not necessarily indicate a lack of commitment to the protection of the marine environment. Gabon, for example, lacks explicit provisions for endangered species protection in its fisheries legislation, but Gabonese president Ali Bongo Ondimba announced at the 2017 UN Oceans Conference the creation of one of the African continent’s largest marine protected areas. The network of marine parks and aquatic reserves will protect 53,000 square kilometers of ocean, 27% of Gabon’s territorial waters. Gabon joins South Africa, Kenya, and Mauritius, among others, in hosting a marine protected area within its EEZ.'
          },
          //   { tag: 'p',
          //   html: 'While strong scores imply fairly robust fisheries management systems across the majority of African coastal states, in many cases they belie reality. Legislation alone is not indicative of capacity to enforce. Though the will to manage fisheries using modern legislative provisions is evident, and a heartening development after the purely mercantilist nature of colonial-era fisheries legislation, it is not sufficient for African fisheries to be managed solely on paper. States must proactively use these legislative provisions to cut down on illegal fishing activity and protect their resources.'
          // },
          {
            tag: 'links',
            items: [{
              org: '<sup>6</sup> Paige M. Roberts, Laura C. Burroughs, and Robert H. Mazurek, “An Exploration of Federal Fisheries Management Agencies in Eastern Africa,” Secure Fisheries, 2017.',
              url: 'http://dx.doi.org/10.18289/OEF.2017.014'
            }, ]
          }
        ] // end of els array
      },
      { // Card 3
        title: 'FISH-i Africa',
        menu: 'FISH-i Africa',
        metadata: {
          owner: 'Robert Mazurek',
          description: 'Description and case study from Fish-I Africa, a partnership and information sharing center comprised of 8 east African nations with a focus on IUU fishing in Western Indian Ocean.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          extent: [
            [15, -60],
            [120, 45]
          ],
          //          highlights: [],
          tooltip: true,
          load: function(index, file) {
            // There might not be any load on this??
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            var layer = 'card-' + index + '-layer';
            var incl = ['COM', 'KEN', 'MDG', 'MUS', 'MOZ', 'SYC', 'SOM', 'TZA'];
            var color = rampColor(1);
            d3.selectAll('.eez.active')
              .classed('style', null)
              .classed('invisible', true);

            incl.forEach(function(iso3, i) {


              d3.selectAll('.eez.' + iso3) // ### wtf
                .classed('active', true)
                .transition().delay(i * 20)
                .style('stroke', function() {
                  //console.log(iso3);
                  return rampColor(1);
                });

              d3.selectAll('.country.' + iso3)
                .classed('active', true)
                .transition().delay(i * 20)
                .style('fill', function() {
                  return rampColor(0.5);
                })
                .style('stroke', rampColor(1));
            });
          }
        },
        els: [{
            tag: 'h1',
            text: 'The Success of FISH-i Africa',
          },
          {
            tag: 'caption',
            text: 'Information sharing and international coordination'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Shaded countries are participants in FISH-i Africa</em>'
          },

          {
            tag: 'p',
            html: 'The Western Indian Ocean is one of the world’s hotspots for illegal fishing and, in 2012, FISH-i Africa  was formed to improve cooperation and intelligence-sharing in order to combat illegal fishing operators. FISH-i Africa comprises eight countries—Comoros, Kenya, Madagascar, Mauritius, Mozambique, Seychelles, Somalia, and the United Republic of Tanzania. These task force countries work principally through national fisheries enforcement officers using cooperation, coordination, and shared tools to take legal action against illegal fishing vessels.'
          },
          {
            tag: 'video',
            videoId: 'CHbVYBllqtI',
            thumb: '../../assets/fisheries/Fish-i-Africa_video.jpg'
          },
          {
            tag: 'blockquote',
            html: '“We are very proud of the success we have had in tackling illegal fishing in the Western Indian Ocean. Unless we can create compliant fisheries, all efforts for a sustainable seafood sector are undermined.” —Per Erik Bergh, FISH-i Africa'
          },
          {
            tag: 'p',
            html: 'Since its inception, FISH-i Africa has coordinated law enforcement responses to suspected IUU fishing vessels. In 2015, the task force started tracking <em>Poseidon</em> and <em>Al-Amal</em>, two fishing vessels exhibiting suspicious behavior off Somalia and Kenya.  In response, FISH-i Africa:'
          },
          {
            tag: 'ul',
            rows: ['identified <em>Poseidon</em> and <em>Al-Amal</em> as high-risk vessels;', 'analyzed additional satellite tracking data and investigated company ownership;', 'engaged partners at the FAO, the UN Office on Drugs and Crime, the European Union’s counter-piracy military operation off the Horn of Africa (EUNAVFOR), Secure Fisheries, and the Kenyan authorities; and', 'provided support to Kenyan and Somali authorities during inspections of the vessels.']
          },
          {
            tag: 'p',
            html: 'In January 2015, Somali authorities arrested <em>Poseidon</em> for illegal fishing, and a $1.5 million fine was reportedly paid for the ship’s release. The ship then left with <em>Al-Amal</em> for Kenya. Inspections by Kenyan authorities raised questions about possible illegal transshipments (unreported transfers of fish) by the two vessels in Somali waters; <em>Poseidon</em> had been operating for six weeks at sea but the vessel did not contain any fish. Analysis of the movements of the vessel, undertaken by FISH-i Africa, also indicated transshipment activity. The registrations of both vessels were unclear, as was the validity of their fishing licenses.'
          },
          {
            tag: 'p',
            html: 'The evidence uncovered by FISH-i Africa and partners likely made it more difficult for these two vessels to offload their catch. Today, <em>Al-Amal</em> is sunk off the coast of Somalia and <em>Poseidon</em> is for sale in Yemen.'
          },
          {
            tag: 'links',
            items: [{
              org: '<sup>7</sup> FISH-i Africa, “Investigation No. 6: Mysterious Operations on the Somali Coast,” 2017.',
              url: 'https://www.fish-i-africa.org/what-we-do/fish-i-investigations/'
            }, ]
          }
        ] // end of els array
      },
      { // Card 4
        title: 'Coastal Resources in Mogadishu',
        menu: 'Coastal Resources in Mogadishu',
        metadata: {
          owner: 'Paige Roberts',
          description: 'Visualizing the interactions among disparate uses of the marine space means they can be managed effectively to support economic sustainability in all the relevant sectors and avoid conflict over this multi-use space.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          extent: [
            [45, 1.9],
            [46.3, 2.1]
          ],
          path: '../../data/fisheries/mogadishu-updated.js',
          highlights: [],
          tooltip: true,
          load: function(index, file) {
            var layer = 'card-' + index + '-layer';

            var mogg = mapg.append('g')
              .classed('card-layer mogadishu-resources ' + layer, true);

            d3.json(file, function(error, json) {
              var bufferJSON = json.buffer,
                coralJSON = json.coral,
                landingJSON = json.landing;


              var coral = mogg.append('g')
                .classed('mog-coral', true);

              var buffer = mogg.append('g')
                .classed('mog-buffer', true);

              var landing = mogg.append('g')
                .classed('mog-landing', true);



              buffer.selectAll('.buffer-24nm')
                .data(bufferJSON.features)
                .enter()
                .append('path')
                .attr('d', path)
                .classed('buffer-24nm', true);

              //  console.log(coralJSON);
              coral.selectAll('.coral')
                .data(coralJSON.features)
                .enter()
                .append('path')
                .attr('d', path)
                .classed('coral', true)
                .style('fill', function(d) {
                  return rampColor(d.properties.THREAT / 1500); // 1500 is the max value of THREAT
                });

              landing.selectAll('.landing-sites') // circles?? ###
                .data(landingJSON.features)
                .enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection(d.geometry.coordinates)[0];
                })
                .attr('cy', function(d) {
                  return projection(d.geometry.coordinates)[1];
                })
                .attr('r', function(d) {
                  var radius;
                  if (d.properties.Boats == 0) {
                    radius = '0.07px'
                  } else {
                    radius = (d.properties.Boats) / 510 + 'px'
                  }
                  return radius;
                })
                .style('fill', function() {
                  return rampColor(1);
                })
                .classed('landing-sites', true);

            });

            d3.json('../../data/fisheries/mog-roads.json', function(error, json) {
              // Make this file smaller and roll it in with the mogadisu.js ... ###
              var roads = mogg.append('g')
                .classed('mog-roads', true);

              roads.selectAll('.mog-roads')
                .data(topojson.feature(json, json.objects.roads).features)
                .enter()
                .append('path')
                .attr('d', path)
                .classed('mog-road', true)
                .style('stroke-width', '0.002px');
            });

            var mogCoords = [45.25, 2.09];
            d3.select('.labels').append('text')
              .classed('mogadishu-label card-layer invisible', true)
              .attr('x', function() {
                return projection(mogCoords)[0];
              })
              .attr('y', function() {
                return projection(mogCoords)[1];
              })
              .text('Mogadishu');

            d3.select('.' + layer)
              .classed('invisible', true);
          },
          switch: function(index) {
            d3.selectAll('.card-' + index + '-layer')
              .classed('invisible', false);

            d3.select('.mogadishu-label')
              .classed('active', true)
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Managing Coastal Resources in Mogadishu',
          },
          {
            tag: 'caption',
            text: 'Mapping potential conflict triggers'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: 'Circles represent Somali fish landing sites. Larger circles indicate more boats. Blue cells show coral reefs. Light blue represents undisturbed reefs and dark blue represents reefs most at risk of degradation from human activities. <br>Source: <a href="http://securefisheries.org/somali-coastal-resources" target="_blank">Project Badweyn.</a>'
          },
          {
            tag: 'p',
            html: 'Healthy fisheries are about more than just the fish; fisheries are the nexus between the fish and the people who depend on them for their livelihoods. Fisheries involve every level of the value chain: catching fish, processing them, selling them, exporting them, and eating them. Maintaining healthy fisheries therefore requires a comprehensive view of the marine environment, the fishes, and the associated human activities.'
          },
          {
            tag: 'img',
            src: '../../assets/fisheries/managing_coastal_resources.png',
          },
          {
            tag: 'p',
            html: 'On the Somali coast, fisheries present potential for development, especially at the small, artisanal scale. But the fish stocks coastal communities depend upon are at risk if they are not managed well. An exercise in which the overlaps among various uses of the marine space are literally visualized can promote effective management and economic sustainability by identifying relevant sectors and minimizing conflict over this multi-use space.'
          },
          {
            tag: 'p',
            html: '<em><a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2233959" target="_blank">Project Badweyn: Mapping Somali Coastal Resources</a></em> provides a tool for understanding the marine environment and how it is impacted by human activities such as shipping and coastal development.'
          },
          {
            tag: 'p',
            html: 'Mogadishu is an area that demonstrates how different uses of the marine space overlap and where actions might be taken to improve governance and sustainable use of the space. Mogadishu is a major coastal urban area with a rapidly growing population of over 2 million.<sup>8</sup>  Somali waters support this capital city by providing food from fisheries and jobs in many sectors, including in fisheries and at the large port.'
          },
          {
            tag: 'p',
            html: 'The growing city also poses a threat to the marine habitats that are home to the fish the artisanal fishing sector depends on. Coral reefs off the coast of Mogadishu support highly diverse marine life, but the ecosystem is sensitive and can be irreparably damaged by pollution, physical destruction, and overfishing.<sup>9</sup> Not only will increased fishing and shipping traffic<sup>10</sup> impact coral reefs, increasing pollution from the city will further degrade the health of this ecosystem, possibly beyond repair.'
          }, //###insert photo of mogadishu
          {
            tag: 'p',
            html: 'The vision for the future of the waters and fisheries around Mogadishu must account for the potential impacts of intense urban and industrial growth. Regulations on shipping lanes and traffic intensity could guide maritime traffic to avoid artisanal fishing areas and coral reefs while limiting ecosystem damage. Infrastructure must be in place to limit urban pollution such as drainage and sewage. The fishery itself must be protected from overfishing and other destructive fishing practices through placing limits on catch and the use of destructive gear. Implementing this type of holistic management now will protect these vital resources for the future.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>8</sup> Helen Massy-Beresford, “Where is the Fastest-Growing City in the World?” <em>The Guardian</em>, 18 November 2015.',
                url: 'https://www.theguardian.com/cities/2015/nov/18/where-is-the-worlds-fastest-growing-city-batam-niamey-xiamen'
              },
              {
                org: '<sup>9</sup> Laura Burke, Kathleen Reytar, Mark Spalding, and Allison Perry, <em>Reefs at Risk Revisited</em> (Washington, D.C.: World Resources Institute, 2011): chap. 3.',
                url: 'http://www.wri.org/sites/default/files/pdf/reefs_at_risk_revisited.pdf'
              },
              {
                org: '<sup>10</sup> “Marine Problems: Shipping,” the World Wildlife Federation, accessed 8 August 2017.',
                url: 'http://wwf.panda.org/about_our_earth/blue_planet/problems/shipping/'
              },
            ]
          }
        ] // end of els array
      },
      // { // Card 5
      //   title: 'Methodology',
      //   menu: 'Methodology',
      //   metadata: {
      //     owner: 'Sarah Glaser',
      //     description: 'Methods.'
      //   },
      //   map: {
      //     scale: [],
      //     classes: 'card-5-layer',
      //     translate: [],
      //     highlights: null,
      //     load: function (index, file) {  // ### *** This only should be for the first card ...
      //       // Color EEZ according to master Stable Seas index
      //       var layer = 'card-'+index+'-layer';
      //
      //       d3.select('.card-eez-layer')
      //         .classed(layer, true);
      //     },
      //     switch: function (index) {
      //       switchMainIndex(0);
      //     }
      //   },
      //   els: [
      // { tag: 'h1',
      //   text: 'Methodology'
      // },
      // { tag: 'legend',
      //   text: 'Map Legend',
      //   legendContent: '<em>Map showing subindx scores</em>'
      // },
      // { tag: 'p',
      //    html: 'The Fisheries Score incorporates five factors relevant to fisheries-related conflict and healthy fisheries: presence of foreign fishing vessels, strength of domestic fisheries law, membership in regional fisheries management organizations (RFMOs), marine pollution, and biological health of the fishery. We calculate scores for these five factors and then average them with equal weighting for each factor. We provide an overview of our methodology below and a more complete technical summary in the supporting materials for download.'
      // },
      // { tag: 'h4',
      //    text: 'Foreign Fishing'
      // },
      // { tag: 'p',
      //    html: 'The presence of foreign fishing vessels in EEZ waters can be a cause of maritime insecurity and conflict. In African waters, domestic fishing fleets tend to be small-scale and artisanal, using small boats and gear. Foreign vessels, especially those from distant-water fleets that have traveled thousands of miles to fish, are larger, faster, and use larger gear. This can cause direct conflict between domestic and foreign vessels. In some African countries, foreign vessels have been accused of destroying artisanal gear, crowding out smaller boats, destroying marine habitat, and depleting fisheries resources. Case studies in both East and West Africa demonstrate IUU fishing is often related to, and even caused by, the presence of foreign fishing vessels in a nation’s waters. This is not universally true, and some nations that host large foreign fleets have low levels of IUU fishing. Likewise, not all foreign vessels perpetuate conflict. Given the lack of a comprehensive and comparative estimate of IUU fishing in EEZs, we calculate the percent of total fish catch made by foreign vessels within an EEZ. We use data collected and maintained by the Sea Around Us that assigns all fish catch in an EEZ to a given country based on the flag of the ship catching fish.'
      // },
      // { tag: 'h4',
      //    text: 'Domestic Fisheries Law'
      // },
      // { tag: 'p',
      //    html: 'Strong domestic fisheries laws include clear directives for management, provisions for enforcement, and mandates for data collection that inform fisheries management plans. When governments have strong fisheries laws, conflict is minimized through clear guidelines on access rights and approved fishing methods. We measure the strength of domestic fisheries laws by coding each piece of legislation, which are housed online by the FAO,<sup>11</sup>  for mandates on the following: the existence of a law, an observer program, data collection, foreign-vessel licensing, restrictions on foreign vessels, gear restrictions, endangered species protections, protections for artisanal (domestic) fishers, and catch limits based on maximum sustainable yield. The sub-score is calculated by summing the number of mandates in each piece of legislation and dividing by the maximum possible.'
      // },
      // { tag: 'h4',
      //    html: 'Regional Fisheries Management Organization Membership'
      // },
      // { tag: 'p',
      //    html: 'Governments that engage and collaborate with international fisheries bodies are more likely to adopt norms around fisheries management and scientific data collection and to adopt best practices for monitoring, control, and surveillance. Regional fisheries management organizations (RMFOs) are international bodies with voluntary membership for those countries whose fishing interests fall within RFMO jurisdiction. Some RFMOs are defined solely by geographic extent, while others are defined by the scope of the fishes they manage (e.g., tuna and other highly migratory species). We use maps showing the boundaries of four RFMOs—the Indian Ocean Tuna Commission, the International Commission for the Conservation of Atlantic Tunas, the Commission for the Conservation of Southern Bluefin Tuna, and the South East Atlantic Fisheries Organisation—to identify overlap between RFMO jurisdiction and EEZs. Scores were calculated by counting the number of RFMO memberships a country had from the pool of RFMOs that had overlapping jurisdictions (i.e., countries did not get penalized for not joining RFMOs outside their EEZs). (Note: ratification of the Port State Measures Agreement is relevant to this topic, but it was included in our International Cooperation  score.)'
      // },
      // { tag: 'h4',
      //    text: 'Marine Pollution'
      // },
      // { tag: 'p',
      //    text: 'Marine pollution can negatively impact fisheries by disrupting breeding or feeding areas, reducing reproduction, or introducing diseases. It is also a proxy for coastal development which disrupts marine habitat like seagrass beds and coral reefs. We use the score from the Clean Waters goal in the Ocean Health Index. The Ocean Health Index   measures countries on biological, physical, economic, and social factors to assess how sustainably humans are using the ocean. The Clean Waters goal measures pollution from chemicals, nutrients (agriculture), pathogens, and trash (including plastics) in EEZ waters. The Ocean Health Index collects data for all countries of the world and issues annual updates. We used the Clean Waters score directly.'
      // },
      // { tag: 'h4',
      //    text: 'Fisheries Health'
      // },
      // { tag: 'p',
      //   html: 'We used the score from the Wild-Caught Fisheries sub-goal of the Food Provision goal in the Ocean Health Index (see “Marine Pollution” above). The Fisheries sub-goal measures how well a nation achieves optimal sustainable production of seafood compared to a biological baseline. The target is for a given nation to maintain a fish population at the level that produces maximum sustainable yield (known as BMSY). Countries are penalized for both underfishing and overfishing. Thus, this metric is not solely one of conservation—a nation that does not fish will not earn the highest score, because they are leaving potential revenue in the water. We used the Wild-Caught Fisheries score directly.'
      // },
      // { tag: 'links',
      //   items: [
      //     {org: '<sup>11</sup> “FAO Document Depository,”', url: 'http://www.fao.org/documents/search/en/'},
      //     {org: '<sup>12</sup> “The Ocean Health Index,” Ocean Health Index, accessed 1 September 2017,', url: 'www.oceanhealthindex.org'},
      //   ]
      // }
      //  ]
      //  }
    ]
  },
  piracy: {
    // not prepped?
    metadata: { // Independent data source for each page
      version: '0.0.5',
      name: 'Piracy',
      updates: true,
      /*
           0.0.2:
             1 footnotes
             2 legends
             3 maps ready to go


           */
      index: 8,
      code: 'piracy',
      path: 'piracy',
      countryData: [],
      csv: '../../data/piracy/piracy.csv',
      color: '#B6782A',
      order: -1,
      description: 'Most maritime crime continues to be piracy and armed robbery. These acts endanger seafarers, threaten commerce, and fund criminal networks.'
    },
    load: function(csv, callback) {
      //    console.log('no piracy data yet');
      d3.csv(csv, function(vals) {
        vals.forEach(function(d) {
          d.ia8c0 = +d.ia8c0;
        });
        issueAreaData[issueArea].metadata.countryData = vals;
        callback('piracy load csv function callback');
      });
    },
    cards: [{ // Card 0
        title: 'Piracy and Armed Robbery',
        menu: 'Piracy and Armed Robbery',
        metadata: {
          owner: 'Maisie Pigeon',
          description: 'Card will introduce the issue.'
        },
        map: {
          path: '../../data/piracy/piracy-incidents.csv',
          scale: [],
          classes: '',
          translate: [],
          //    extent: [[27,-26],[94,30]],
          //  highlights: ,
          load: function(index, file) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';

            d3.csv(file, function(incidents) {
              incidents.forEach(function(d) {
                d.lat = +d.lat;
                d.lon = +d.lon;
              });

              var incidentsLayer = mapg.append('g')
                .classed('card-layer piracy-incidents card-0-layer card-3-layer ' + layer, true);

              incidentsLayer.selectAll('circle')
                .data(incidents).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', '3px')
                .attr('fill', function() {
                  return rampColor(0.2);
                })
                .attr('stroke', function() {
                  return rampColor(1);
                })
                .attr('class', function(d) {
                  return 'a' + d.id
                })
                .classed('piracy-incident', true);

            });
          },
          switch: function(index) {
            d3.selectAll('.card' + index + '-layer')
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Piracy and Armed Robbery',
          },
          // {tag: 'indexTable'
          // },
          // { tag: 'caption',
          //   text: 'Note: scores are rounded to the nearest whole number.'
          // },
          {
            tag: 'caption',
            text: 'An evolving threat on both coasts'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Dots represent known piracy and armed robbery incidents in 2016. <br> Source: <a href="http://obp.ngo/" target="_blank">Oceans Beyond Piracy</a></em>'
          },
          {
            tag: 'p',
            html: 'The threat of violence from non-state actors constitutes the clearest challenge to effective maritime governance and security. Though terrorism is a growing concern in some regions, the majority of violent maritime crime continues to be acts of piracy and armed robbery. These violent crimes endanger seafarers, threaten commerce, and can even fund violent political actors and transnational criminal networks.'
          },
          {
            tag: 'img',
            src: '../../assets/piracy/piracy_models-01.png',
          },
          {
            tag: 'h3',
            html: 'Kidnap for Ransom'
          },
          {
            tag: 'p',
            html: 'In kidnap-for-ransom attacks, perpetrators aim to capture a vessel and its crew and hold them— sometimes onshore—until a ransom payment is received. Historically, kidnap-for-ransom attacks are most closely associated with East African pirate groups, but a considerable increase in the number of these attacks was observed in West Africa in 2016.<sup>1</sup>'
          },
          {
            tag: 'p',
            html: 'Kidnapping for ransom entails less risk to the criminal groups than some of the other models of piracy and can result in substantial returns to the perpetrators. The rise in attacks of this kind is clearly a troubling development as kidnappings typically involve greater violence to the crews held hostage.'
          },
          {
            tag: 'p',
            html: 'Some regional variations of this model exist: in East Africa, pirate groups generally take the entire crew and their vessel hostage, whereas in West Africa, kidnappers tend to target high-ranking members of the crew, such as the captain or other officers. The durations of the kidnappings also vary; West African kidnappers normally only hold their hostages for a few weeks, though the victims are often subjected to considerable amounts of cruel treatment in that time.'
          },
          {
            tag: 'h3',
            html: 'Hijacking for Cargo Theft'
          },
          {
            tag: 'p',
            html: 'Hijacking for cargo theft entails perpetrators attacking a tanker and siphoning its oil while the crew is temporarily held captive onboard. Typically, the oil is then sold through black market channels. This form of piracy has been especially prevalent in the Gulf of Guinea.'
          },
          {
            tag: 'h3',
            html: 'Robberies'
          },
          {
            tag: 'p',
            html: 'Robberies occur when perpetrators steal ship stores, equipment, and personal effects from the crew. Robberies of this kind most often take place in port or at anchorage and differ from kidnappings in that profits come from the sale of stolen goods rather than the ransoming of a ship, its crew, or its cargo.'
          },
          {
            tag: 'p',
            html: 'As with other crimes perpetrated at sea, piracy and armed robbery are quite challenging to address. To date in West Africa, no prosecutions for piracy or armed robbery have occurred. This is further complicated by the fact that vast underreporting of this set of crimes is suspected because there are a multitude of disincentives to reporting, meaning that the full scope of the problem is not yet understood.'
          },
          {
            tag: 'links',
            items: [{
              org: '<sup>1</sup> Pigeon, Maisie et al., “State of Maritime Piracy 2016,” 3 May 2017,',
              url: 'http://oceansbeyondpiracy.org/reports/sop'
            }, ]
          }
        ] // end of els array
      }, // End of first element of cards object
      { // Card 1
        title: 'Re-emergence in Somalia?',
        menu: 'Re-emergence in Somalia?',
        metadata: {
          owner: 'Maisie Pigeon',
          description: 'Feature Somali Waters report, talk about recent uptick in Somali piracy.'
        },
        map: {
          path: '../../data/piracy/piracy-2017-incidents.csv',
          scale: [],
          classes: '',
          translate: [],
          extent: [
            [43, -6],
            [68, 22]
          ],
          //  highlights: ,
          load: function(index, file) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';

            d3.csv(file, function(incidents) {
              incidents.forEach(function(d) {
                d.lat = +d.lat;
                d.lon = +d.lon;
              });

              var incidentsLayer = mapg.append('g')
                .classed('card-layer piracy-2017-incidents invisible ' + layer, true);

              incidentsLayer.selectAll('circle')
                .data(incidents).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', '1.5px')
                .attr('fill', function() {
                  return rampColor(0.2);
                })
                .attr('stroke', function() {
                  return rampColor(1);
                })
                .attr('class', function(d) {
                  return 'a' + d.id
                })
                .classed('piracy-2017-incident', true);

            });
          },
          switch: function(index) {
            d3.selectAll('.card' + index + '-layer')
              .classed('invisible', false);
          }
        },
        els: [

          {
            tag: 'h1',
            text: 'Re-emergence in Somalia?'
          },
          {
            tag: 'caption',
            text: 'An unusually active 2017'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Vessels hijacked in 2017. <br> Source: <a href="http://obp.ngo/" target="_blank">Oceans Beyond Piracy</a></em>'
          },

          {
            tag: 'p',
            html: 'In response to the piracy threat, the international community spent billions of dollars to protect vessels transiting the High Risk Area in the Western Indian Ocean: a number of international navies deployed to the region, East African judicial systems absorbed much of the impact of piracy trials, and merchant vessels began to apply vessel self-protection measures, including re-routing around or increasing speeds through the High Risk Area.'
          },
          {
            tag: 'img',
            src: '../../assets/piracy/ITS_espero_escorts_aris-13.jpg', // This should be on the Stable Seas Deck - comments
            alt: 'ITS Espero escorts Aris-13 after hijacking incident. Photo: EUNAVFOR',
            caption: ' ITS Espero escorts Aris-13 after hijacking incident. Photo: EUNAVFOR'
          }, {
            tag: 'p',
            html: 'At its peak, piracy off the coast of Somalia posed a major threat to international shipping traffic transiting the Western Indian Ocean region. Between 2008 and 2012, thousands of seafarers and their vessels were taken hostage by pirate groups and held in miserable conditions, sometimes for years at a time.'
          },

          // { tag: private <a href="http://oceansbeyondpiracy.org/sites/default/files/attachments/Privately_Contracted_Armed_Maritime_Security_IssuePaper.pdf" target="_blank"></a>
          //   html: 'With the decrease in acts of piracy against merchant vessels came an unexpected boost for the pirates: the international community’s perception of risk declined. Some naval mandates to address piracy were not renewed beyond 2016, removing naval forces from the region, and many vessels no longer employ vessel self-protection measures with the stringency observed during the peak of piracy, opening a window of opportunity for pirate groups. Our Piracy and Armed Robbery Scores, which show activity in the 2016 calendar year, reflect the final period before a sudden change.'
          // },
          {
            tag: 'p',
            html: 'In the spring of 2017, after almost five years without a successful attack on a merchant vessel, pirates hijacked <em>Aris-13</em> and its crew off the coast of Somalia and held them for three days. In the weeks that followed, pirate groups operating off the coast of Somalia hijacked four additional vessels.',
          },
          {
            tag: 'p',
            html: 'Calling the incidents in the spring of 2017 a “re-emergence” is a bit of a misnomer. While no merchant vessels were hijacked between 2012 and 2017, pirate groups took a number of smaller, more vulnerable vessels, demonstrating their continued intention to hijack ships and their crews. Several fishing dhows and their crews were captured during this period, including <em>Siraj</em>, crewmembers of which remain in captivity two and a half years after their initial capture.',
          }
        ] // end of els array
      },
      { // Card 2
        title: 'Counter-Piracy',
        menu: 'Counter-Piracy',
        metadata: {
          owner: 'Kelsey Soeth',
          description: 'Highlight international efforts to reduce piracy, but talk to Jay to avoid too much overlap.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          //  highlights: ,
          load: function(index, file) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
            // Class loaded layer with card-0-layer to enable switch() method

            //.classed(layer, true);
          },
          switch: function(index) {
            // d3.selectAll('.card' + index + '-layer')
            //   .classed('invisible', false);

            // Need to review these highlights with Ben !!
            var highlights = ['SOM', 'DJI', 'SYC', 'KEN', 'MDG', 'TZA', 'MUS', 'COM', 'ZAF', 'MOZ', 'COG', 'COD', 'NGA', 'TGO', 'CMR', 'GHA', 'SLE', 'SEN', 'CIV', 'GAB', 'GIN', 'GNB', 'GNQ', 'BEN', 'LBR', 'GMB', 'AGO', 'NAM', 'CPV'];

            highlights.forEach(function(iso3, i) {
              d3.selectAll('.eez.' + iso3)
                .classed('active', true)
                .transition().delay(10 * i)
                .style('stroke', rampColor(1));

              d3.selectAll('.country.' + iso3)
                .classed('active', true)
                .transition().delay(10 * i)
                .style('fill', rampColor(0.5))
                .style('stroke', rampColor(1));
            })
          }
        },

        els: [{
            tag: 'h1',
            text: 'Counter-Piracy',
          },
          {
            tag: 'caption',
            text: 'International efforts to address piracy off Africa\’s coasts'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Highlights represent sub-Saharan countries with ongoing maritime capacity-building projects. <br> Source: <a href="http://obp.ngo/" target="_blank">Oceans Beyond Piracy</a></em>'
          },
          {
            tag: 'p',
            html: 'The unanimous adoption of UN Security Council Resolution 1851 in 2008 resulted in the formation of the Contact Group on Piracy off the Coast of Somalia (CGPCS) to facilitate the discussion and coordination of actions among states and organizations to suppress Somali piracy. The resolution called for participants to cooperate in the fight against piracy and armed robbery at sea off the Somali coast by deploying naval vessels and seizing boats and arms used in the commission of attacks.'
          },
          {
            tag: 'p',
            html: 'More than 60 countries and organizations have joined the CGPCS, and their accomplishments include facilitation of the operational coordination of an unprecedented international naval effort from more than 30 countries; the creation of partnerships with the shipping industry to improve and promote Best Management Practices that merchant ships and crews can take to avoid, deter, delay, and counter pirate attacks; and the strengthening of regional capacity to counter piracy.'
          },
          {
            tag: 'img',
            src: '../../assets/piracy/Togolese_PM_Dussey_cgpcs.jpg',
            alt: 'Togolese Prime Minister Robert Dussey speaks at a CGPCS meeting. ###Ask Maisie for photo credit',
            caption: 'Togolese Prime Minister Robert Dussey speaks at a CGPCS meeting. Photo credit: Jérôme Michelet'
          },
          {
            tag: 'p',
            html: 'Another UN initiative, the United Nations Office on Drugs and Crime’s Maritime Crime Programme, supports a number of counter-piracy causes with a particular focus on the provision of a regional criminal justice response. The International Police Organization is also involved in counter-piracy efforts; the INTERPOL Maritime Piracy Task Force utilizes a three-pronged approach to countering maritime piracy through the improvement of evidence collection, facilitation of data exchange, and the provision of support for regional capabilities.'
          },
          {
            tag: 'p',
            html: 'The EU has also become active by partnering with the UN on the Program to Promote Regional Maritime Security (MASE). Active from 2012 to 2018, the objective of MASE is to enhance maritime security in the eastern and southern Africa and Indian Ocean regions.'
          },
          {
            tag: 'p',
            html: 'In 2012, the EU launched EUCAP Nestor, a civilian mission which assisted host countries in the Horn of Africa with developing self-sustaining capacity for enhancement of maritime security. In 2015, EUCAP pivoted to focus on Somalia. Today, EUCAP Somalia contributes to establishing and building the capacity of maritime civilian law enforcement capabilities. The EU also launched the Critical Maritime Routes program in 2010 with two main objectives: to secure the sea lanes of communication and protect the economy of the EU.'
          },
          {
            tag: 'p',
            html: 'The latest iteration of this initiative, CRIMARIO, goes beyond these initial objectives and aims to enhance maritime security and safety in the wider Indian Ocean region by supporting coastal countries in the establishment of maritime situational awareness, which is defined as the sharing and fusion of data from various maritime sources to achieve an understanding of the maritime domain in order to enable the improvement of maritime security and safety and the maritime environment.'
          },
          {
            tag: 'img',
            src: '../../assets/piracy/EUCAP_Nestor_Bosasso_port_police.jpg',
            alt: 'EUCAP Nestor working with Bosasso Port Police for logistical assistance. Photo: EUNAVFOR',
            caption: 'EUCAP Nestor working with Bosasso Port Police for logistical assistance. Photo: EUNAVFOR'
          },
          {
            tag: 'p',
            html: 'The EU’s support of maritime security in African waters extends to the Gulf of Guinea, where it supported the Critical Maritime Routes in the Gulf of Guinea project (CRIMGO). In 2016, the EU and several West African coastal countries launched the Gulf of Guinea Inter-regional Network (GoGIN) to replace CRIMGO. GoGIN aims to facilitate cooperation between the 19 Gulf of Guinea coastal countries from Senegal to Angola by setting up an effective and technically-efficient network for the exchange of information to improve and coordinate maritime security strategy in the region.'
          },
          {
            tag: 'p',
            html: 'The international community has come together in a multitude of venues, from the UN Security Council to regional capacity-building programs, to combat piracy in the Horn of Africa and the Gulf of Guinea. Throughout the world, nations are working in tandem to counter threats to their maritime security in order to ensure safe passage on the high seas and foster economic development.'
          }
        ] // end of els array
      },
      { // Card 3
        title: 'The New Hotspot',
        menu: 'The New Hotspot',
        metadata: {
          owner: 'Kelsey Soeth',
          description: 'Track rise of piracy in GoG, feature State of Piracy report.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          extent: [
            [-20, -34],
            [46, 28]
          ],
          highlights: [],
          tooltip: true,
          load: function(index, file) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';

            // Load up point map GIS layer - geojson

            // Class loaded layer with layer to enable switch() method

            //.classed(layer, true);
          },
          switch: function(index) {
            d3.selectAll('.card' + index + '-layer')
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'The New Hotspot',
          },
          {
            tag: 'caption',
            text: 'Piracy and Armed Robbery in the Gulf of Guinea'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Known piracy and armed robbery incidents during 2016. <br> Source: <a href="http://obp.ngo/" target="_blank">Oceans Beyond Piracy</a></em>'
          },
          {
            tag: 'p',
            html: 'Modern-day piracy burst into the public consciousness in the late 2000s when large merchant vessels were attacked off the coast of Somalia. The vessels and their crews were taken ashore and held for extended periods of time in deplorable conditions while their captors awaited enormous payoffs. In response, the international community banded together to counter the activity. Through multinational military deployments, the increasing prevalence of private armed security teams, and the implementation of Best Management Practices, piracy was gradually reduced to near-zero levels around the Horn of Africa. However, just as piracy dropped off in the Western Indian Ocean, it was exploding in the Gulf of Guinea.'
          },
          {
            tag: 'img',
            src: '../../assets/piracy/piracy_costs-01.png', // This should be on the Stable Seas Deck - comments
          },
          {
            tag: 'p',
            html: 'Oceans Beyond Piracy’s <em>2013 State of Maritime Piracy</em> report concluded that attacks in West Africa occurred at much higher frequency than in East Africa. There were 100 estimated attacks in the Gulf of Guinea in 2013 compared to 23 off the Somali coast. Furthermore, the attacks in West Africa were more violent than those in East Africa.<sup>2</sup>  This trend has continued. In 2016, 95 attacks were reported in the Gulf of Guinea compared to 27 attacks reported in the Horn of Africa. This difference is particularly significant in terms of the human cost. Nearly 1,400 more seafarers were subjected to attacks in the Gulf of Guinea than were attacked off the coast of Somalia.<sup>3</sup>  The Gulf of Guinea has the reputation of being the most dangerous area of transit in the world for seafarers.'
          },
          {
            tag: 'img',
            src: '../../assets/piracy/piracy_incidents_west_africa-01.png', // This should be on the Stable Seas Deck - comments
          },
          {
            tag: 'p',
            html: 'While the number of attacks has remained high in recent years, the model of piracy that is most commonly used has gradually shifted. The Niger Delta is home to an abundance of oil wealth, and criminal networks have historically turned to a piracy practice known as bunkering, or oil siphoning, for a cut of the region’s riches. Bunkering is time-consuming and logistically complex. It requires spending several days at sea and having a second vessel to carry the stolen oil.'
          },
          {
            tag: 'p',
            html: 'As oil prices declined and security efforts in the region stepped up, bunkering declined and kidnap-for-ransom attacks increased. In 2014, there were 5 incidents of bunkering and 15 kidnap-for-ransom attacks. By 2016, bunkering incidents had dropped by 80 percent while kidnap-for-ransom attacks rose by nearly 30 percent.'
          },
          {
            tag: 'p',
            html: 'In the Gulf of Guinea, the model of kidnap for ransom is less complicated than in the Horn of Africa; pirates tend to capture only high-value crew members and take them ashore, abandoning the vessel. The hostages are usually released after two to four weeks. While captured crew members spend relatively little time in captivity, the high turnover of hostages and the frequency of armed attacks results in a high level of violence.'
          },
          {
            tag: 'p',
            html: 'The international community has been tremendously successful in reducing piracy off the Somali coast, but piracy in the Gulf of Guinea is proving more difficult. Through actions formalized by UN Resolution 2446, Somali waters are patrolled by multiple international navies. The littoral states of the Gulf of Guinea are all sovereign nations with the rights to patrol their own territorial waters, but naval capacity is limited and no UN resolution exists for countering piracy there.'
          },
          {
            tag: 'p',
            html: 'Private armed security teams proved to be a powerful deterrent to Somali pirates, but these teams are prohibited by law from entering Nigeria’s territorial waters (where two-thirds of piracy attacks in the Gulf of Guinea occur). These challenges all contributed to the rise of piracy in the Gulf of Guinea, and they now contribute to the extraordinary difficulty of combating it.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>2</sup> Madsen, Jens Vestergard, et al. “State of Maritime Piracy 2013,” 8 May 2017,',
                url: 'http://oceansbeyondpiracy.org/sites/default/files/attachments/SoP2013-2PagerDigital_0.pdf'
              },
              {
                org: '<sup>3</sup> Pigeon, Maisie et al., “State of Maritime Piracy 2016,” 3 May 2017,',
                url: 'http://oceansbeyondpiracy.org/reports/sop'
              },
            ]
          }
        ] // end of els array
      },
      { // Card 4
        title: 'Hijacking for Cargo Theft',
        menu: 'Hijacking for Cargo Theft',
        metadata: {
          owner: 'Kelsey Soeth',
          description: 'Focus mostly on Gulf of Guinea.'
        },
        map: {
          path: '../../data/piracy/bunkering-incidents.csv',
          scale: [],
          classes: '',
          extent: [
            [-12, -19],
            [50, 17]
          ],
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, file) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';

            d3.csv(file, function(incidents) {
              incidents.forEach(function(d) {
                d.lat = +d.lat;
                d.lon = +d.lon;
              });

              var incidentsLayer = mapg.append('g')
                .classed('card-layer bunkering-incidents invisible ' + layer, true);

              incidentsLayer.selectAll('circle')
                .data(incidents).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', '3px')
                .attr('fill', function() {
                  return rampColor(0.2);
                })
                .attr('stroke', function() {
                  return rampColor(1);
                })
                .classed('bunkering-incident', true);

            });

          },
          switch: function(index) {
            d3.selectAll('.card-' + index + '-layer')
              .classed('invisible', false);
          }
        },

        els: [{
            tag: 'h1',
            text: 'Hijacking for Cargo Theft',
          },
          {
            tag: 'caption',
            html: 'Taking Advantage of Resource Wealth'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Known incidents of hijacking for cargo theft (2013-2016). <br> Source: <a href="http://obp.ngo/" target="_blank">Oceans Beyond Piracy</a></em>'
          },
          {
            tag: 'p',
            html: 'As global oil prices rose above $100 a barrel in the early 2000s, oil theft became a very lucrative business. In the Niger Delta, a region both marred by poverty and blessed by vast oil reserves. Though the oil boom has earned the Nigerian government billions of dollars since operations began in the 1980s, the riches have failed to trickle down to local communities. Furthermore, the environmental degradation caused by oil companies operating under corruption and weak government regulation has spoiled traditional industries such as farming and fishing. With those opportunities gone and unemployment persistently high, stealing crude oil is an attractive alternative.'
          },
          {
            tag: 'img',
            src: '../../assets/piracy/hijacking_oil_theft_model-01.png', // This should be on the Stable Seas Deck - comments
          },
          {
            tag: 'p',
            html: 'Hydrocarbon theft takes many forms, from small-scale theft and illegal refining to theft at export terminals, as well as piracy and oil tanker hijackings.'
          },
          {
            tag: 'p',
            html: 'The Niger Delta’s swamps and shallow waters are crisscrossed in a grid-like pattern by oil pipelines linking the region’s 22 petroleum storage depots and 4 refineries.<sup>4</sup>  This infrastructure is most frequently targeted for theft by the tapping of oil pipelines or wellheads; much of it is hidden from inspectors as it takes place underwater. This method diverts a percentage of the oil flow, and the oil is then pumped onto waiting vessels. While approximately 25 percent of the stolen oil is refined in artisanal refineries and sold within the delta, 75 percent is transported to coastal tankers for export to the global market. “White collar” oil theft occurs at export terminals. Excess oil products beyond the amount licensed are transferred to tankers through manipulation of meters and forgery of bills of lading.'
          },
          {
            tag: 'p',
            html: 'Hijacking for hydrocarbons occurs when a vessel is commandeered, its tracking devices are disabled, and its cargo is siphoned off onto a smaller ship in an isolated location and sold on the black market. This process can take days and the crew is often held captive for the duration. Since 2013, the number of attacks on oil tankers in the Gulf of Guinea has fallen drastically. This can be attributed to both the global drop in oil prices and the significantly increased naval activity in the region.'
          },
          {
            tag: 'img',
            src: '../../assets/piracy/oil_attacks_niger_delta.jpg', // This should be on the Stable Seas Deck - comments
            alt: 'One of the armed militant groups attacking oil installations in the Niger Delta. Photo: Pius Utomi Ekpei/AFP/Getty Images',
            caption: 'One of the armed militant groups attacking oil installations in the Niger Delta. Photo: Pius Utomi Ekpei/AFP/Getty Images'
          },
          {
            tag: 'p',
            html: 'A significant amount of oil theft in the delta can be attributed to regional rebel groups. Their stated goal is to force the foreign oil companies out in favor of turning control of oil operations over to local people. They are well-armed with machine guns, rocket launchers, and speedboats for attacks on offshore oil infrastructure. In 2016, successful attacks on high-value, strategic targets by rebel groups included Shell’s Forcados oil pipeline, Chevron’s Okan platform, and the largest export terminal in Nigeria, ExxonMobil’s Qua Iboe.'
          },
          {
            tag: 'p',
            html: 'Continued low prices have discouraged the hijacking and bunkering of fuel tankers by reducing profits. Nigerian president Muhammadu Buhari has also made cracking down on oil theft a hallmark of his administration since 2015. In light of these factors, illicit networks have abandoned these activities in favor of kidnapping for ransom. However, as oil prices rise in 2017, pirate groups may return to the lucrative activities of bunkering and oil theft.'
          },
          {
            tag: 'links',
            items: [{
              org: '<sup>4</sup> West Sands Advisory Intel, “Nigeria\'s Oil Theft Epidemic,” OilPrice.com, Oil Price, 6 June 2017,',
              url: 'http://oilprice.com/Energy/Crude-Oil/Nigerias-Oil-Theft-Epidemic.html'
            }, ]
          }
        ] // end of els array
      },
      { // Card 5
        title: 'Violence in the Bab el-Mandeb',
        menu: 'Violence in the Bab el-Mandeb',
        metadata: {
          owner: 'Maisie Pigeon',
          description: 'Be sensitive about how we describe emerging threats of terrorism in the Red Sea and Gulf of Aden.'
        },
        map: {
          scale: [],
          classes: '',
          path: '../../data/piracy/politically-motivated-incidents.csv',
          translate: [],
          extent: [
            [40, 8],
            [51, 16]
          ],
          //extent: [[45,24],[88,-15]],
          highlights: [],
          tooltip: true,
          load: function(index, file) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';

            d3.csv(file, function(incidents) {
              incidents.forEach(function(d) {
                d.lat = +d.lat;
                d.lon = +d.lon;
              });

              var incidentsLayer = mapg.append('g')
                .classed('card-layer political-piracy-incidents invisible ' + layer, true);

              incidentsLayer.selectAll('circle')
                .data(incidents).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', '0.5px')
                .attr('fill', function() {
                  return rampColor(0.2);
                })
                .attr('stroke', function() {
                  return rampColor(1);
                })
                .classed('political-incident', true);

            });
          },
          switch: function(index) {
            d3.selectAll('.card-' + index + '-layer')
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Violence in the Bab el-Mandeb',
          },
          {
            tag: 'caption',
            text: 'An emerging threat'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Politically motivated maritime security incidents (2016). <br> Source: <a href="http://obp.ngo/" target="_blank">Oceans Beyond Piracy</a></em>'
          },
          {
            tag: 'p',
            html: 'While the Horn of Africa is often associated with Somali pirates, observers have recently noted a different emerging threat: maritime terrorism. '
          },
          {
            tag: 'p',
            html: 'Attacks on five separate vessels in the Bab el-Mandeb strait in the last quarter of 2016 raised concerns over increasing maritime instability there. On 1 October, an anti-ship missile fired from shore inflicted damage on HSV-2 <em>Swift</em>, a high-speed vessel operated by the United Arab Emirates and previously owned by the U.S. military. Eight days later a similar incident targeted U.S. Navy-guided missile destroyer USS <em>Mason</em> in the first of three attacks against it; another attack against the <em>Mason</em> occurred later that day, and there was a final attack against it three days later.'
          },
          {
            tag: 'p',
            html: 'On 25 October, a small skiff loaded with explosives reportedly attacked <em>Galicia Spirit</em>. Saudi coalition forces reported responding to an attack against tanker vessel <em>Melati Satu</em> on 26 October. Finally, in December of 2016, an unconfirmed attack in the lower Red Sea against Iranian freighter MV <em>Joya 8</em> left six crewmembers missing and presumed dead.'
          },
          {
            tag: 'p',
            html: 'The trend continues into 2017; Oceans Beyond Piracy has recorded an increase in suspicious activity in the Bab el-Mandeb over the first half of the year, including sightings of naval mines and marine-borne improvised explosive devices.<sup>5</sup>'
          },
          {
            gif: true,
            tag: 'video',
            videoId: 'Dscw8gv4maY',
            thumb: '../../assets/piracy/bab-al-mandeb-attacks.gif'
          },
          {
            tag: 'caption',
            html: 'Note - this is not the correct video, just wanted to indicate functionality of the gif. Try clicking on it ;) ###'
          },
          {
            tag: 'p',
            html: 'The attack against HSV-2 <em>Swift</em> was claimed by Houthi rebels, but the majority of the incidents have gone unclaimed, despite most having originated from Houthi-held territory in Yemen. The attacks in the region are therefore most likely attributable to spillover from the conflict in Yemen. As discussed in the <em>Stable Seas: Somali Waters</em>  report, this has myriad implications for shipping traffic in the region.' //### add hyperlink to somali waters report
          },
          {
            tag: 'p',
            html: 'First, many naval operations deployed to address piracy are currently winding down or have ended already: EU NAVFOR’s Operation Atalanta was extended through the end of 2018, but NATO’s Operation Ocean Shield concluded its mission at the end of 2016<sup>6</sup> leaving limited naval forces in the area available for response. Complicating this further is the fact that the Combined Maritime Forces operations in the region are the only ones with a mandate that explicitly includes combating these evolving maritime terrorism threats.<sup>7</sup>'
          },
          {
            tag: 'p',
            html: 'Second, the response required to counter an attack of this nature differs considerably from the response necessary to protect a vessel from a pirate attack. Oceans Beyond Piracy asks if recommendations established to counter piracy in <em>Best Management Practices (Version 4)</em> need to be reevaluated to fit an evolving threat, and similarly, if private security teams require training to combat an array of risks in addition to piracy.<sup>8</sup>'
          },
          {
            tag: 'p',
            html: 'Finally, vessels may decide to re-route around the Bab el-Mandeb strait entirely in order to avoid any potential dangers—a decidedly expensive and difficult option for the shipping industry to take.'
          },
          {
            tag: 'p',
            html: 'The full extent to which these violent incidents might impact the international community has yet to be seen, but vessel traffic transiting the Gulf of Aden must continue to be vigilant.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>5</sup> NYA International, “Special Advisory: Naval mines and MBIEDs off Yemen,” 19 May 2017.',
                url: 'https://www.ukpandi.com/fileadmin/uploads/uk-pi/LP%20Documents/LP_Bulletins/170519_NYA_M_Special_Advisory_Yemen.pdf'
              },
              {
                org: '<sup>6</sup> North Atlantic Treaty Organization, “NATO Concludes Successful Counter-piracy Mission,” 15 December 2016.',
                url: 'http://www.nato.int/cps/en/natohq/news_139420.htm'
              },
              {
                org: '<sup>7</sup> Combined Maritime Forces, “About CMF,” accessed 31 August 2017.',
                url: 'https://combinedmaritimeforces.com/about/'
              },
              {
                org: '<sup>7</sup> Oceans Beyond Piracy, “Addressing Maritime Insecurity in the Horn of Africa: Can the Existing Counter-Piracy Framework Help Address the Evolving Maritime Threat?” Oceans Beyond Piracy Issue Paper, accessed 29 August 2017.',
                url: 'http://oceansbeyondpiracy.org/sites/default/files/attachments/Maritime_Insecurity_HornofAfrica_Issue_Paper.pdf'
              },
            ]
          }
        ] // end of els array
      },
      // {  // Card 6
      //   title: 'Methodology',
      //   menu: 'Methodology',
      //   metadata: {
      //     owner: 'Curtis Bell',
      //     description: 'Card will provide basic methodology info.'
      //   },
      //   map: {
      //     scale: [],
      //     classes: '',
      //     translate: [],
      //     highlights: [],
      //     load: function (index, file) {  // ### *** This only should be for the first card ...
      //       var layer = 'card-'+index+'-layer';
      //
      //       d3.selectAll('.card-eez-layer')
      //         .classed(layer, true);
      //
      //     },
      //     switch: function (index) {
      //       switchMainIndex(0);
      //     }
      //   },
      //   els: [
      // { tag: 'h1',
      //   text: 'Methodology',
      // },
      // { tag: 'p',
      //   html: 'The Piracy and Armed Robbery Score measures instances of these events within and around each country’s exclusive economic zone (EEZ). Our definition of piracy is that established by the United Nations Convention on the Law of Sea, as follows, and our definition of armed robbery is taken from that of the International Maritime Organization, as seen below.'
      // },
      // { tag: 'p',
      //   html: 'Piracy: “Any illegal acts of violence or detention, or any act of depredation, committed for private ends by the crew or the passengers of a private ship or a private aircraft, and directed:'
      // },
      // { tag: 'ul',
      //    rows: ['on the high seas, against another ship or aircraft, or against persons on property on board such ship or aircraft;', 'against a ship, aircraft, persons, or property in a place outside the jurisdiction of any state.”<sup>11</sup>']
      // },
      // { tag: 'p',
      //   html: 'Armed Robbery: “Unlawful act of violence or detention or any act of depredation, or threat thereof, other than an act of piracy, committed for private ends and directed against a ship or against persons or property on board such a ship, within a state’s internal waters, archipelagic waters and territorial sea.” '
      // },
      // { tag: 'p',
      //   html: 'Legally, then, these activities are very similar and are mainly distinguished by where they occur. Events occurring within the territorial waters of a state, typically within 12 nautical miles of the shoreline, are acts of armed robbery at sea. Incidents occurring farther from the coast, including those occurring within an EEZ, are acts of piracy at sea.',
      // },
      // { tag: 'p',
      //   html: 'The score includes two inputs. The first is the number of piracy and armed robbery incidents occurring within a state’s territorial waters or exclusive economic zone during the 2016 calendar year. We use data collected in the State of Piracy report, an annual evaluation of global piracy trends from Oceans Beyond Piracy. Using geographic information systems (GIS) methodology, we cross-reference the latitudes and longitudes of each qualifying incident with geographic shapefiles of each EEZ.'
      // },
      // { tag: 'p',
      //   html: 'States can still face a threat of piracy even if events are not occurring in their own waters. Many attacks occur against international vessels operating just beyond a state’s exclusive economic zone, so we also include a measure or proximity to piracy attacks.'
      // },
      // { tag: 'p',
      //   html: 'Using GIS, we calculate the minimum distance between every EEZ and every incident occurring around the African continent. Distances are measured as the minimum from the latitude and longitude of the incident to the closest border of the EEZ. Events occurring within an EEZ receive a distance score of 0. Then, we identify each country’s set of closest incidents and take the average distance of each incident in the set to the EEZ boundary. Closer events are given a higher score and we log-transform these distances so that more distant events have a much smaller influence on a state’s proximity-to-piracy score than events occurring very close to the EEZ. We measure distances in hundreds of kilometers and set a maximum distance of 1,000 kilometers, meaning anything occurring farther than that cannot count against a state’s proximity score.'
      // },
      // { tag: 'p',
      //   html: 'More technical details are provided in the data documentation available for download.'
      // }, // ### add link to data downloads page
      //
      //   ] // end of els array
      // }
    ] // end of cards array
  },
  illicitTrade: {
    // PREPPED
    metadata: { // Independent data source for each page
      version: '0.0.4',
      name: 'Illicit Trades',
      updates: true,
      /*
             added

             */
      index: 9,
      code: 'illicitTrade',
      path: 'illicit-trade',
      countryData: [],
      csv: '../../data/illicit-trade/illicitTrade.csv',
      color: '#098895',
      order: -1,
      description: 'Criminal networks leverage new technologies to deal in the markets of narcotics, weapons, wildlife, and black market pharmaceuticals.'
    },
    load: function(csv, callback) {
      d3.csv(csv, function(vals) {
        vals.forEach(function(d) {
          d.ia9c0 = +d.ia9c0;
        });
        issueAreaData[issueArea].metadata.countryData = vals;
        callback('illicitTrade load csv function callback');
      });
    },
    cards: [{ // Card 0
        title: 'Illicit Trades',
        menu: 'Illicit Trades',
        metadata: {
          owner: 'Curtis Bell',
          description: 'Introduce the issue.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, csv) {
            // Class EEZ with card-0-layer to enable switch() method
            var layer = 'card-' + index + '-layer';
            var l = d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            switchMainIndexInverse(index);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Illicit Trades',
          },
          {
            tag: 'caption',
            text: 'Trafficking in African Waters'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Lighter shades indicate the country\'s shadow economy is smaller relative to total gross domestic product.<br />Source: <a href="http://www.imf.org/" target="_blank">International Monetary Fund</a></em>'
          },
          {
            tag: 'p',
            html: 'Forces of globalization, such as advancements in communication and transportation technology, have facilitated the integration of formerly isolated domestic markets. However, these same forces have also fueled the rise of transnational organized crime.'
          },
          // {tag: 'indexTable'
          // },
          // { tag: 'caption',
          //   text: 'Note: scores are rounded to the nearest whole number.'
          // },
          {
            tag: 'bigtext',
            html: 'Criminal networks leverage new technologies to facilitate the trafficking of contraband and the laundering of any proceeds.'
          },
          {
            tag: 'p',
            html: 'Criminal networks leverage new technologies to facilitate the trafficking of contraband and the laundering of any proceeds. They couple these new strategies with timeless tactics; among them threatening violence against rival criminal networks and agents of the state, bribery of corrupt port authorities and law enforcement officials, and co-optation of local communities.<sup>1</sup>'
          },
          {
            tag: 'p',
            html: 'As transnational networks become entrenched, some expand and diversify their activities. It is not uncommon to find linkages between various trafficking activities. Some criminal networks directly fund non-state actors engaged in rebellion and terror.<sup>2</sup>'
          },
          // { tag: 'p',
          //   html: 'Our Illicit Trades score reflects expert evaluations of trade in four categories: arms, drugs, contraband, and wildlife. They reflect not only the scale of each problem but also the extent to which it exists in the maritime domain. High scores reflect the diversity in the types of illicit maritime trade rather than the volume, which is impossible to estimate reliably due to the nature of black markets.'
          // },
          {
            tag: 'p',
            html: 'Sub-Saharan Africa has become an important consumer economy for contraband, but these scores also reflect the fact that many African ports have become preferred transshipment hubs for traffickers across a range of illicit economy sectors. This is evident in the global narcotics trade, with East Africa becoming the single largest conduit for heroin from Afghanistan to countries throughout the world. West Africa, too, is playing a leading role in the transshipment of cocaine from South America to Europe.<sup>3</sup>'
          }, //###above two paragraphs flagged for significant review
          {
            tag: 'links',
            items: [{
                org: '<sup>1</sup> Robert J. Kelly, Jess Maghan, and Joseph D. Serio, <em>Illicit Trafficking: A Reference Handbook</em> (Santa Barbara, California: ABC-CLIO, 2005).'
              },
              {
                org: '<sup>2</sup> The Globalization of Crime: A Transnational Organized Crime Threat Assessment,” United Nations Office on Drugs and Crime, 2010,',
                url: 'https://www.unodc.org/documents/data-and-analysis/tocta/TOCTA_Report_2010_low_res.pdf'
              },
              {
                org: '<sup>3</sup> Ibid.'
              }
            ]
          }
        ] // end of els array
      },
      { // Card 1
        title: 'Narcotics Globalized',
        menu: 'Narcotics Globalized',
        metadata: {
          owner: 'John Filitz',
          description: 'Focuses on Indian Ocean routes to / from China.'
        },
        map: {
          scale: [],
          path: '../../data/illicit-trade/smack-track.csv',
          classes: '',
          translate: [],
          highlights: [],
          tooltip: true,
          extent: [
            [15, -65],
            [150, 60]
          ],
          load: function(index, csv) { // ### *** This only should be for the first card ...
            // Load flow map layer
            var layer = 'card-' + index + '-layer';
            // Load topoJSON of flow map
            d3.csv(csv, function(vals) {
              vals.forEach(function(d) {
                d.lat = +d.lat;
                d.lon = +d.lon;
              });

              var smack = mapg.append('g')
                .classed('card-layer smack-track invisible ' + layer, true);

              smack.selectAll('circle')
                .data(vals).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', '5px')
                //  .transition().delay(i * 10)
                .style('fill', function(d, i) {
                  return rampColor(1 - (i / vals.length))
                })
                .classed('smack-track-point', true);

            });

            // Class with layer
          },
          switch: function(index) {
            // Simply show target layer
            d3.select('.card-' + index + '-layer')
              .classed('invisible', false);

          }
        },
        els: [{
            tag: 'h1',
            text: 'Narcotics Globalized',
          },
          {
            tag: 'caption',
            text: 'The importance of Africa’s seaports to the global illicit economy'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Dots represent the primary drug route from South Asia to East African ports.</em>'
          },
          //###flag for comms (stable seas card deck doesn't have card 9.1 so I'll wait to hear from them to make sure this is correct)
          {
            tag: 'p',
            html: 'The global narcotics trade is becoming more sophisticated and diversified in the quest for improved efficiencies in trafficking routes and new markets. The increasing prevalence of synthetic drugs, the advent of genetically modified poppy seeds being used in the production of heroin, and increased coca cultivation in Colombia have boosted narcotics production and trafficking globally.<sup>4</sup> Sub-Saharan seaports are crucial hubs in this trade.'
          },
          {
            tag: 'img',
            src: '../../assets/illicit-trade/heroin-trafficking-flows.png', // This should be on the Stable Seas Deck - comments
          },
          {
            tag: 'h3',
            text: 'The East and Southern African-Afghani Connection',
          },
          {
            tag: 'p',
            html: 'A large share of the opiates produced in central Asia transit the “southern route” through the Arabian Sea region and toward East African ports. Referred to colloquially as the “Smack Track,” this route begins on the Makran Coast of Balochistan shared by the Islamic Republic of Iran and Pakistan.<sup>5</sup> The route then heads for the coastlines of Kenya, the United Republic of Tanzania, and Mozambique, which are being increasingly favored by heroin and hashish traffickers due to low rates of seizure and severely constrained maritime law enforcement capacities.<sup>6</sup>'
          },
          {
            tag: 'bigtext',
            html: 'The Indian Ocean drug trade typically avoids remote stretches of coastline and instead infiltrates East Africa\'s largest seaports.'
          },
          {
            tag: 'p',
            html: 'Individuals involved in trafficking are often of Pakistani and Iranian nationality as well as East African, including Kenyans and Tanzanians.<sup>7</sup> The extent of heroin trafficking in southern Africa is unknown, but South African authorities have declared East Africa to be the primary source of heroin in South Africa.<sup>8</sup> Four maritime interdictions led by the Combined Maritime Forces in the Indian Ocean between April 2012 and May 2013 seized 1,194 kg of high-purity heroin.<sup>9</sup> South Africa is also increasingly becoming a transshipment hub due to its sophisticated financial services sector and international transportation linkages.<sup>10</sup>'
          },
          //### Insert Graph 1: Number of heroin shipments to East African countries detected in Pakistan between 2000 and 2011 Source: “Transnational Organized Crime in Eastern Africa: A Threat Assessment,” United Nations Office on Drugs and Crime, 2013, https://www.unodc.org/documents/data-and-analysis/Studies/TOC_East_Africa_2013.pdf
          //### Insert Map 1: Heroin Trafficking Routes Source: Illicit Trade: Converging Criminal Networks, 2015, OECD, https://illicittrade.com/reports/downloads/illicit-trade-converging-criminal-networks.pdf
          {
            tag: 'p',
            html: 'Small dhows are commonly used to transport narcotics across Arabian Sea and Indian Ocean waters. These small vessels can easily evade detection and dock at non-commercial ports, including islands. In Kenya, Pemba Island and Shimoni Island are routinely used as initial drop-off points. Heroin, in particular, is then repackaged and transported by speedboat to Mombasa.<sup>11</sup> In April 2014, <em>HMAS Darwin</em> seized 1,032 kg of heroin 27 nautical miles off the coast of Mombasa, making it the largest seizure of its kind ever recorded in Africa. In July 2014, at least 343 kg of heroin (800 kg was reported by the UN)<sup>12</sup> was seized from unflagged MV Al Noor (or MV Amin Darya) off the Lamu archipelago north of Mombasa.<sup>13</sup> The purity of the drugs seized in these types of incidents is usually high, indicating greater opportunities for dilution and onward transshipment. Once narcotics arrive at large ports, commercial ships can be used to transport them around the world.<sup>14</sup> Use of Africa’s busiest commercial ports makes detection less likely due to the high number of containers being processed daily.<sup>15</sup>'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>4</sup> “World Drug Report 2017,” United Nations Office on Drugs and Crime, 2017,',
                url: 'https://www.unodc.org/wdr2017/index.html'
              },
              {
                org: '<sup>5</sup> “The Afghan Opiate Trade and Africa 2016: A Baseline Assessment,” United Nations Office on Drugs and Crime, 2017,',
                url: 'https://www.unodc.org/documents/data-and-analysis/Afghanistan/Afghan_Opiate_trade_Africa_2016_web.pdf'
              },
              {
                org: '<sup>6</sup> Ibid.'
              },
              {
                org: '<sup>7</sup> “Transnational Organized Crime in Eastern Africa: A Threat Assessment,” United Nations Office on Drugs and Crime, 2013,',
                url: 'https://www.unodc.org/documents/data-and-analysis/Studies/TOC_East_Africa_2013.pdf'
              },
              {
                org: '<sup>8</sup> Ibid.'
              },
              {
                org: '<sup>9</sup> “The Afghan Opiate Trade and Africa 2016,” United Nations Office on Drugs and Crime.'
              },
              {
                org: '<sup>10</sup> Ibid.'
              },
              {
                org: '<sup>11</sup> Margarita Dimova, “A New Agenda for Policing: Understanding the Heroin Trade in Eastern Africa,” University of London School of Economics and Political Science, N.D., available at,',
                url: 'https://ecpr.eu/Filestore/PaperProposal/9e9dd3da-27fa-42cb-96c6-0bc8b5639c99.pdf'
              },
              {
                org: '<sup>12</sup> “UN Security Council Report of the Monitoring Group on Somalia and Eritrea pursuant to Security Council Resolution 2244 (2015): Somalia,” United Nations Security Council S/2016/919, 28 September 2016,',
                url: 'http://www.securitycouncilreport.org/atf/cf/%7B65BFCF9B-6D27-4E9C-8CD3-CF6E4FF96FF9%7D/s_2016_919.pdf'
              },
              {
                org: '<sup>13</sup> Dimova, “A New Agenda for Policing.”'
              },
              {
                org: '<sup>14</sup> “Transnational Organized Crime in Eastern Africa,” United Nations Office on Drugs and Crime.'
              },
              {
                org: '<sup>15</sup> Dimova, “A New Agenda for Policing.”'
              }
            ]
          }
        ] // end of els array
      },
      { // Card 2
        title: 'Coca Crossing Oceans',
        menu: 'Coca Crossing Oceans',
        metadata: {
          owner: 'John Filitz',
          description: 'Focuses on Atlantic trade, West Africa.'
        },
        map: {
          scale: [],
          classes: '',
          path: '../../data/illicit-trade/narcotics-west-africa.csv',
          translate: [],
          extent: [
            [-40, -15],
            [70, 40]
          ],
          highlights: [],
          tooltip: true,
          load: function(index, csv) { // ### *** This only should be for the first card ...
            // Load flow map layer

            // ### I don't love this map
            var layer = 'card-' + index + '-layer';
            // Load topoJSON of flow map
            d3.csv(csv, function(rows) {
              rows.forEach(function(row, i) {
                row.lat = +row.lat;
                row.lon = +row.lon;
              });

              var narcotics = mapg.append('g')
                .classed('west-africa-narcotics-routes card-layer invisible ' + layer, true);

              narcotics.selectAll('circle')
                .data(rows).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', '4px')
                .attr('class', function(d) {
                  return d.route;
                })
                .style('fill', function(d) {
                  if (d.route == 'main') {
                    return rampColor(1);
                  } else if (d.route == 'southern') {
                    return colorBrew[0][1];
                  } else if (d.route == 'eastern') {
                    return colorBrew[1][1];
                  } else if (d.route == 'northern') {
                    return colorBrew[2][1];
                  }
                })
                .on('mouseenter', function() {
                  var route = d3.select(this).attr('class');
                  d3.selectAll('.' + route + '.route-label')
                    .classed('invisible', false)
                })
                .on('mouseleave', function() {
                  var route = d3.select(this).attr('class');
                  d3.selectAll('.' + route + '.route-label')
                    .classed('invisible', true)
                });

              var labels = [{
                  title: 'Southern Route',
                  class: 'southern',
                  coords: [0, 17.5]
                },
                {
                  title: 'Northern Route',
                  class: 'northern',
                  coords: [-16.3, 15.76]
                },
                {
                  title: 'Eastern Route',
                  class: 'eastern',
                  coords: [-15.2, 23.9]
                }
              ];



              var routeLabels = mapg.append('g')
                .classed('route-labels', true);

              routeLabels.selectAll('.route-label')
                .data(labels).enter()
                .append('text')
                .attr('x', function(d) {
                  return projection(d.coords)[0];
                })
                .attr('y', function(d) {
                  return projection(d.coords)[1];
                })
                .text(function(d) {
                  return d.title
                })
                .attr('class', function(d) {
                  return 'route-label invisible ' + d.class
                });
            });

            // Class with layer
          },
          switch: function(index) {
            // Simply show target layer
            d3.select('.card-' + index + '-layer')
              .classed('invisible', false);

          }
        },
        els: [{
            tag: 'h1',
            text: 'Coca Crossing Oceans',
          },
          {
            tag: 'caption',
            text: 'From South America to West Africa and beyond'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>This map shows transit points on the West African coast and overland routes linking these ports to European consumers.</em>'
          },
          {
            tag: 'h3',
            text: 'Cocaine Trafficking in West African Waters',
          },
          {
            tag: 'p',
            html: 'West African ports have been important transshipment points in the global narcotics trade for decades, though the nature and volume of the trade has been very dynamic. The earliest evidence of Africa’s involvement in the Atlantic Ocean narcotics trade involved Lebanese traffickers sending heroin via Nigeria to the United States in 1952.<sup16</sup> The 1960s saw the region dominate the supply of African marijuana to Europe. Shortly thereafter, in the 1970s and 1980s, Ghanaian and Nigerian traffickers secured a foothold in the supply of cocaine to the United States and Europe.<sup>17</sup> According to a 2007 report by the United Nations Office on Drugs and Crime (UNODC), the region supplied over one-quarter of the 135 to 145 tons of annual cocaine demand in Europe that year.<sup>18</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/illicit-trade/cocaine-trafficking-west-Africa.png', // This should be on the Stable Seas Deck - comments
          },
          {
            tag: 'p',
            html: 'According to a 2013 report by the UNODC, there are three main hubs for the trafficking of cocaine in West Africa; the northern hub comprising Guinea-Bissau, Guinea, The Gambia, and Senegal; the southern hub, comprising Nigeria at the core but also including Benin, Togo, and Ghana; and the eastern hub of Mali and Mauritania.<sup>19</sup>'
          },
          {
            tag: 'p',
            html: 'A notable spike in the frequency and volume of cocaine being trafficked to West Africa was reported in the period 2004–2009, with bulk shipments in excess of 100 kg common.<sup>20</sup> The west coast of Africa has historically played an integral role in the trafficking of narcotics to European countries.<sup>21</sup> The increased prominence in recent years is attributed to improved law enforcement oversight in narcotics-trafficking states in the Caribbean, the fragility of West African states and state institutions making them susceptible to co-optation by narcotics traffickers, and the geographic proximity of South America to the west coast of Africa making it the shortest point for crossing the Atlantic.<sup>22</sup>'
          },
          {
            tag: 'p',
            html: 'It is here that Guinea-Bissau established itself as Africa’s first “narco-state,” with senior-ranking public officials being implicated in the cocaine trade. Guinea, The Gambia, Sierra Leone, and Mauritania also came to be seen as a cocaine-trafficking hubs.<sup>23</sup> The involvement of senior public officials from these countries in narcotics trafficking laid bare the vulnerability of this region to the global narcotics trade.'
          },
          {
            tag: 'p',
            html: 'Of particular concern is the linking of narcotics trafficking to insurgent groups; in the Sahel region, al-Qaeda in the Islamic Maghreb and Colombian drug traffickers exchange cash for heavily armed escorts through Mauritania, Mali, and Algeria in order to access European markets.<sup>24</sup> Similarly, Boko Haram in Nigeria routinely facilitates the trafficking of heroin and cocaine across its territories.<sup>25</sup>'
          },
          //###BREAK TEXT TALK TO FILITZ AND CURTIS
          {
            tag: 'h3',
            text: 'Emerging Trends',
          },
          {
            tag: 'p',
            html: 'The modus operandi used in the trafficking of narcotics is ever-evolving; although according to a 2013 UNODC report maritime trafficking of cocaine has seen a notable decline since its peak in 2004–2009 due to an absence of regular seizures, perception of a decline should be met with skepticism.<sup>26</sup>'
          },
          {
            tag: 'p',
            html: 'In December 2016, Spanish and Moroccan authorities seized 2,575 kg of cocaine off the coast of the Western Sahara en route to Europe, underscoring the continuing importance of West African waters to the bulk trafficking of cocaine.<sup>27</sup>'
          },
          {
            tag: 'p',
            html: 'There has been a noteworthy shift by Nigerian narcotics traffickers to using commercial ships and shipping containers for trafficking, including their playing an increasingly important role in trafficking heroin to European markets. The use of commercial shipping makes detection significantly more difficult due to the large volume of goods moving through African seaports.<sup>28</sup>'
          },
          {
            tag: 'p',
            html: 'Of further concern is the shift being seen as sub-Saharan African countries including Nigeria, Guinea, Niger, and South Africa move from being net consumers of methamphetamine to establishing methamphetamine production capabilities with the intention to service domestic as well as export markets, including Southeast Asia.<sup>29</sup>'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>16</sup> Stephen Ellis, “West Africa’s International Drug Trade,” African Affairs 108 (2009): 171–196.'
              },
              {
                org: '<sup>17</sup> Ibid.'
              },
              {
                org: '<sup>18</sup> Ibid.'
              },
              {
                org: '<sup>19</sup> “Transnational Organized Crime in Eastern Africa,” United Nations Office on Drugs and Crime.'
              },
              {
                org: '<sup>20</sup> Peter McGuire, “Narcotics Trafficking in West Africa: A Governance Challenge,” <em>The Pardee Papers</em> No. 9, March 2010,',
                url: 'http://www.bu.edu/pardee/files/2010/03/Pardee_Paper-9-Narcotics-Trafficking.pdf'
              },
              {
                org: '<sup>21</sup> Ellis, “West Africa’s International Drug Trade.”'
              },
              {
                org: '<sup>22</sup> “Cocaine Trafficking in Western Africa: Situation Report,” United Nations Office on Drugs and Crime, October 2007,',
                url: 'https://www.unodc.org/documents/data-and-analysis/Cocaine-trafficking-Africa-en.pdf'
              },
              {
                org: '<sup>23</sup> McGuire, “Narcotics Trafficking in West Africa.”'
              },
              {
                org: '<sup>24</sup> Colin P. Clarke, “Drugs and Thugs: Funding Terrorism through Narcotics Trafficking,” <em>Journal of Strategic Security</em> 9, no.3. (2016), available at',
                url: 'http://scholarcommons.usf.edu/cgi/viewcontent.cgi?article=1536&amp;context=jss'
              },
              {
                org: '<sup>25</sup> “World Drug Report 2017,” United Nations Office on Drugs and Crime.'
              },
              {
                org: '<sup>26</sup> “Transnational Organized Crime in West Africa: A Threat Assessment,” United Nations Office on Drugs and Crime, 2013,',
                url: 'https://www.unodc.org/toc/en/reports/TOCTAWestAfrica.html'
              },
              {
                org: '<sup>27</sup> Christopher Woody, “Spanish and Moroccan Police Seized 5,700 Pounds of Cocaine in the Middle of a High-Seas Trafficking Corridor,” <em>Business Insider</em>, 6 December 2016,',
                url: 'http://www.businessinsider.com/spanish-police-seize-cocaine-morocco-2016-12.'
              },
              {
                org: '<sup>28</sup> “Transnational Organized Crime in West Africa,” United Nations Office on Drugs and Crime.'
              },
              {
                org: '<sup>29</sup> Ibid.'
              }
            ]
          }
        ] // end of els array
      },
      { // Card 3
        title: 'Weapons of War',
        menu: 'Weapons of War',
        metadata: {
          owner: 'Sean Duncan',
          description: 'Gulf of Aden.'
        },
        map: {
          path: '../../data/illicit-trade/weapons-of-war.csv',
          scale: [],
          classes: '',
          translate: [],
          extent: [
            [40, 15],
            [65, -20]
          ],
          highlights: [],
          tooltip: true,
          load: function(index, file) { // ### *** This only should be for the first card ...
            // Load flow map layer

            var layer = 'card-' + index + '-layer';
            // Load topoJSON of flow map
            d3.csv(file, function(rows) {
              rows.forEach(function(row, i) {
                row.lat = +row.lat;
                row.lon = +row.lon;
              });

              // console.log(rows);
              var arms = mapg.append('g')
                .classed('east-africa-arms-flows card-layer invisible ' + layer, true);

              arms.selectAll('circle')
                .data(rows).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', '3px')
                .attr('class', 'east-africa-arms-route')
                .style('fill', function(d, i) {
                  return rampColor(i / rows.length);
                });
              // .on('mouseenter', function () {
              //   var route = d3.select(this).attr('class');
              //   d3.selectAll('.' + route + '.route-label')
              //     .classed('invisible', false)
              // })
              // .on('mouseleave', function () {
              //   var route = d3.select(this).attr('class');
              //   d3.selectAll('.' + route + '.route-label')
              //     .classed('invisible', true)
              // });
              //
              var label = {
                title: 'Port of Mombasa',
                coords: [40.66, -3.06]
              };





              var mombasa = d3.select('.labels');

              mombasa.append('text')
                .attr('x', function(d) {
                  return projection(label.coords)[0];
                })
                .attr('y', function(d) {
                  return projection(label.coords)[1];
                })
                .text(function(d) {
                  return label.title;
                })
                .attr('class', function(d) {
                  return 'mombasa label invisible card-layer';
                });
            });


            // Class with layer
          },
          switch: function(index) {
            // Simply show target layer
            d3.select('.card-' + index + '-layer')
              .classed('invisible', false);

            d3.select('.mombasa.label')
              .classed('invisible', false)
              .classed('active', true);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Weapons of War',
          }, //###need images
          {
            tag: 'caption',
            text: 'How maritime insecurity benefits violent non-state actors'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Major routes linking arms from East African ports to conflict zones in central Africa.</em>'
          },
          {
            tag: 'p',
            html: 'In a 2015 statement to the UN Security Council,<sup>30</sup> ambassador Tete Antonio noted that of the 500 million illicit small and light weapons (SALW) in circulation globally, over 100 million were in circulation in Africa.<sup>31</sup> The illicit trade for these goods fuels political violence and instability throughout the world and in Africa in particular,<sup>32</sup> with former Secretary-General of the United Nations Ban Ki-moon noting that SALW were at the center of the devastation wrought by the 250 global conflicts in the past decade.<sup>33</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/illicit-trade/arms-trafficking.png'
          },
          {
            tag: 'p',
            html: 'In Africa, the accessibility of SALW makes them “real weapons of mass destruction.”<sup>34</sup> The African Union attributes at least 5 million fatalities in Africa to SALW since 1950.<sup>35</sup> The proliferation of weapons in Africa and the associated deaths have no doubt had a significant and deleterious impact on the social, economic, and political stability of the affected countries.<sup>36</sup>'
          },
          {
            tag: 'p',
            html: 'As part of the African Union’s Agenda 2063, the continental body has set an ambitious goal of ending all wars on the continent by 2020 under an effort labelled Vision 2020, also known as “Silencing the Guns.” Key to achieving this milestone is curtailing the accessibility and availability of SALW.<sup>37</sup>'
          },
          {
            tag: 'h3',
            text: 'Rule of Law Efforts',
          },
          {
            tag: 'p',
            html: 'There are a growing number of bilateral and multilateral agreements aimed at curbing the illicit trade in SALW, though until recently few of them focused explicitly on what occurs in the maritime space.<sup>38</sup> More recently, however, the regional Yaoundé Code of Conduct, the Djibouti Code of Conduct, and the African Union’s Lomé Charter underscore the importance of maritime governance in stemming the flow of illicit weapons to the continent.'
          },
          {
            tag: 'h3',
            text: 'Geographic Areas of Importance',
          },
          {
            tag: 'p',
            html: 'The Horn of Africa region, according to the United Nations Somalia and Eritrea Monitoring Group, remains a key weapons trafficking and transshipment point in Africa.<sup>39</sup> A range of weapons including rocket-propelled grenades and heavy machine guns are trafficked to the region for clients within Africa and beyond. The weapons originate from a variety of groups and include items of Ukrainian, Iranian, and Chinese origin.<sup>40</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/illicit-trade/arms-in-circulation.png'
          },
          {
            tag: 'p',
            html: 'Compounding the challenge of curbing weapons trafficking is the fact that the increasing utilization of commercial cargo vessels makes detecting trafficking more difficult.<sup>41</sup> Some of East Africa’s largest ports have been cited as being key weapons transshipment points servicing neighboring countries that are in the throes of seemingly intractable violent conflicts, including Uganda and South Sudan.<sup>42</sup>'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>30</sup> “Small Arms: The Human Cost of the Illicit Transfer, Destabilizing Accumulation and Misuse of Small Arms and Light Weapons” (Statement by Ambassador Tete Antonio to the United Nations Security Council, New York, 13 May 2015),',
                url: 'http://archive.au.int/collect/newyorko/import/English/Statement%20By%20Amb%20Tete%20Antonio%20in%20Security%20Council%20Debat_E.pdf'
              },
              {
                org: '<sup>31</sup> Dahida D. Philip and Akangbe Oluwabamidele Moses, “Arms, Light Weapons and Rebel Insurgency Across Africa: Impact on Neighboring States,” <em>Public Policy and Administration Research</em> 3, No.10 (2013).'
              },
              {
                org: '<sup>32</sup> “Human Cost of Illicit Flow of Small Arms, Light Weapons Stressed in Security Council Debate,” SC/11889, United Nations Security Council 7442nd Meeting,13 May 2015,',
                url: 'https://www.un.org/press/en/2015/sc11889.doc.htm'
              },
              {
                org: '<sup>33</sup> Manasseh Wepundi, Eliud Nthiga, Eliud Kabuu, Ryan Murray, and Anna Alvazzi del Frate, “Availability of Small Arms and Perceptions of Security in Kenya: An Assessment,” <em>Small Arms Survey Special Report</em>, June 2012,',
                url: 'http://www.smallarmssurvey.org/fileadmin/docs/C-Special-reports/SAS-SR16-Kenya.pdf'
              },
              {
                org: '<sup>34</sup> “Small Arms Survey 2001: Profiling the Problem,” <em>Small Arms Survey</em> (Oxford: Oxford University Press, 2001),',
                url: 'http://www.smallarmssurvey.org/fileadmin/docs/A-Yearbook/2001/en/Small-Arms-Survey-2001-Executive-Summary-EN.pdf'
              },
              {
                org: '<sup>35</sup> “Silencing the Guns, Owning the Future: Realizing a Conflict-Free Africa” (report on the proceedings of the Fifth African Union High-Level Retreat on the Promotion of Peace, Security and Stability in Africa, 21–23 October 2014, Arusha, Tanzania), African Centre for the Constructive Resolution of Disputes, 2015,',
                url: 'http://www.peaceau.org/uploads/arusha-au-high-level-retreat-report-web.pdf'
              },
              {
                org: '<sup>36</sup> Ibid.'
              },
              {
                org: '<sup>37</sup> Ibid.'
              },
              {
                org: '<sup>38</sup> Ibid.'
              },
              {
                org: '<sup>39</sup> “UN Security Council Report of the Monitoring Group on Somalia and Eritrea pursuant to Security Council Resolution 2244 (2015): Somalia,” United Nations Security Council S/2016/919.'
              },
              {
                org: '<sup>40</sup> Jonah Leff and Emile LeBrun, “Following the Thread: Arms and Ammunition Tracing in Sudan and South Sudan,” <em>Small Arms Survey 2014</em> (Geneva: Graduate Institute of International and Development Studies, 2014),',
                url: 'http://www.smallarmssurveysudan.org/fileadmin/docs/working-papers/HSBA-WP32-Arms-Tracing.pdf'
              },
              {
                org: '<sup>41</sup> Hugh Griffiths and Michael Jenks, “Maritime Transport and Destabilizing Commodity Flows,” Stockholm International Peace Institute, January 2012,',
                url: 'https://www.sipri.org/publications/2012/sipri-policy-papers/maritime-transport-and-destabilizing-commodity-flows'
              },
              {
                org: '<sup>42</sup> Wepundi et al., “Availability of Small Arms and Perceptions of Security in Kenya.”'
              }
            ]
          }
          //### Video to embed: https://www.youtube.com/watch?v=7dJEHB_aY0Y
        ] // end of els array
      },
      { // Card 4
        title: 'The Wildlife Trafficking Crisis',
        menu: 'The Wildlife Trafficking Crisis',
        metadata: {
          owner: 'Sean Duncan',
          description: 'Southern Africa.'
        },
        map: {
          scale: [],
          path: '../../data/illicit-trade/illicit-trade-c4.csv',
          classes: '',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, csv) { // ### *** This only should be for the first card ...
            // Load flow map layer
            var layer = 'card-' + index + '-layer';

            d3.csv(csv, function(vals) {
              vals.forEach(function(d, i) {
                d.lat = +d.lat;
                d.lon = +d.lon;
              });

              var wildlife = mapg.append('g')
                .classed('card-layer invisible wildlife-ports ' + layer, true);

              wildlife.selectAll('.wildlife-port')
                .data(vals).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', '8px')
                .style('fill', function(d) {
                  if (d.region == 'west') {
                    return colorBrew[0][1];
                  } else if (d.region == 'east') {
                    return colorBrew[1][1];
                  } else if (d.region == 'southern') {
                    return colorBrew[2][1];
                  }
                })
                .style('stroke', function(d) {
                  if (d.region == 'west') {
                    return colorBrew[0][0];
                  } else if (d.region == 'east') {
                    return colorBrew[1][0];
                  } else if (d.region == 'southern') {
                    return colorBrew[2][0];
                  }
                })
                .attr('class', function(d) {
                  return d.region + '-africa-wildlife-ports'
                });
            });

            var capeTownCoords = [18.466, -34];

            d3.select('.labels').append('text')
              .classed('cape-town-label card-layer invisible', true)
              .attr('x', function() {
                return projection(capeTownCoords)[0];
              })
              .attr('y', function() {
                return projection(capeTownCoords)[1];
              })
              .text('Cape Town');


            // Class with layer
          },
          switch: function(index) {
            // Simply show target layer
            d3.select('.cape-town-label')
              .classed('active', true)
              .classed('invisible', false);

          }
        },
        els: [{
            tag: 'h1',
            text: 'The Wildlife Trafficking Crisis',
          },
          {
            tag: 'caption',
            text: 'A key law enforcement priority for African countries'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Major wildlife trafficking hubs in East, West, and Southern Africa.</em>'
          },
          {
            tag: 'p',
            html: 'The illicit trade in wildlife and protected species is global in scale but particularly prevalent across sub-Saharan Africa. Reptiles, big cats, apes, parrots, ivory, rhino horn, pangolin scales,  teak wood, and rosewood<sup>44</sup> are only some of the plant and wildlife species trafficked in Africa. Rhino horn and ivory comprise most of the global illicit market, with a market value of between USD$5 and $23 billion annually.<sup>45</sup> The vast majority of trafficked wildlife and related products are destined for markets in Asia.<sup>46</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/illicit-trade/rhino_poaching_infographic.png', // This should be on the Stable Seas Deck - comments
          },
          {
            tag: 'p',
            html: 'South Africa is considered the leading source of the illicit trade in rhino horn, with rhino poaching increasing from an average of 13 rhinos per year<sup>47</sup> in the period 2000–2007 to an average of 849 per year in the period 2010–2016.<sup>48</sup> The trade in rhino horn and ivory is incredibly lucrative; rhino horn sells for USD$65,000 per kilogram, typically weighing 1–3 kg, while ivory sells for approximately USD$2,100 per kilogram with the typical elephant tusk weighing approximately 20 kg.<sup>49</sup> Linkages to other organized crime subsectors such as money laundering and arms, narcotics, and human trafficking are common.<sup>50</sup> Militias in the Democratic Republic of the Congo, the Central African Republic, Chad, Niger, and South Sudan also rely on the illicit wildlife trade as a key revenue stream.<sup>51</sup>'
          },
          {
            tag: 'p',
            html: 'Maritime shipping is an integral component of this trade: most of the rhino horn is trafficked out of South African ports, with Mozambique’s Maputo port and Nigeria’s Lagos port playing increasingly important roles. The contraband is usually containerized and concealed as timber or agricultural products.<sup>52</sup> Between 2009 and 2013, 72 percent of ivory seizures by weight were from cargo containers at sea.<sup>53</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/illicit-trade/rhino_and_ivory_values.png', // This should be on the Stable Seas Deck - comments
          },
          {
            tag: 'p',
            html: 'In 2008, the ports of Lagos, Nigeria; Douala, Cameroon; and Accra, Ghana served as the main West African maritime trafficking hubs for ivory. The ports of Mombasa, Kenya and Maputo, Mozambique were prominent maritime trafficking hubs on the eastern and southern coastlines. South Africa’s port of Durban, however, was the single largest conduit for ivory trafficking on the continent, with Tanzania’s ports of Dar es Salaam and Zanzibar combined serving as the second largest conduit.<sup>54</sup>'
          },
          {
            tag: 'p',
            html: 'Due to increased law enforcement efforts by the South African and Singaporean authorities in the period 2009–2012, a shift in the pattern of ivory trafficking across the African continent was observed.<sup>55</sup> Kenya became the leading hub for trafficking ivory out of Africa, followed by Tanzania. Togo, on the west coast, also emerged as a new and important player in the illicit ivory trade. Several large-scale ivory seizures in Togo revealed that ivory trafficked there was destined for Malaysia via western Europe.<sup>56</sup> Also noteworthy were the ivory seizures in Kenya, Tanzania, and Uganda in 2013, which for the first time exceeded seizures in Asia.<sup>57</sup>'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>43</sup> “World Wildlife Crime Report: Trafficking in Protected Species,” United Nations Office on Drugs and Crime, 2016,',
                url: 'https://www.unodc.org/documents/data-and-analysis/wildlife/World_Wildlife_Crime_Report_2016_final.pdf'
              },
              {
                org: '<sup>44</sup> “Forest Governance and Timber Trade Flows Within, To and From Eastern and Southern African Countries: Kenya Country Study,” the European Commission, February 2014,',
                url: 'https://europa.eu/capacity4dev/file/21144/download?token=eNn21m25'
              },
              {
                org: '<sup>45</sup> Channing May, “Transnational Crime and the Developing World,” Global Financial Integrity, March 2017,',
                url: 'http://www.gfintegrity.org/wp-content/uploads/2017/03/Transnational_Crime-final.pdf'
              },
              {
                org: '<sup>46</sup> <em>Illicit Trade: Converging Criminal Networks</em> (Paris: Organisation for Economic Co-operation and Development, 2016),',
                url: 'http://dx.doi.org/10.1787/9789264251847-en'
              },
              {
                org: '<sup>47</sup> Ibid.'
              },
              {
                org: '<sup>48</sup> “Poaching Statistics,” Save the Rhino, accessed 5 September 2017,',
                url: 'https://www.savetherhino.org/rhino_info/poaching_statistics'
              },
              {
                org: '<sup>49</sup> <em>Illicit Trade: Converging Criminal Networks</em>, Organisation for Economic Co-operation and Development.'
              },
              {
                org: '<sup>50</sup> May, “Transnational Crime and the Developing World.”'
              },
              {
                org: '<sup>51</sup> “Illegal Trade in Wildlife and Timber Products Finances Criminal and Militia Groups, Threatening Security and Sustainable Development,” United Nations Environment Programme, 24 June 2014,',
                url: 'groups-threatening-security'
              },
              {
                org: '<sup>52</sup> <em>Illicit Trade: Converging Criminal Networks</em>, Organisation for Economic Co-operation and Development.'
              },
              {
                org: '<sup>53</sup> Varun Vira, Thomas Ewing, and Jackson Miller, “Out of Africa: Mapping the Global Trade in Illicit Elephant Ivory,” C4Adsand Born Free USA, August 2014,',
                url: 'http://www.wwf.se/source.php/1578610/out%20of%20africa.pdf'
              },
              {
                org: '<sup>54</sup> <em>Illicit Trade: Converging Criminal Networks</em>, Organisation for Economic Co-operation and Development.'
              },
              {
                org: '<sup>55</sup> Ibid.'
              },
              {
                org: '<sup>56</sup> Ibid.'
              },
              {
                org: '<sup>57</sup> Ibid.'
              }
            ]
          }
          //### Video to embed: https://www.youtube.com/watch?v=Ss58fP7qxEA&list=***Graphic***:  See map for rhino trade:  https://visionscarto.net/routes-of-rhino-horn
        ] // end of els array
      },
      { // Card 5
        title: 'Illicit Abalone',
        menu: 'Illicit Abalone',
        metadata: {
          owner: 'Sean Duncan',
          description: 'Describes the illicit abalone trade occurring in the southern cone of Africa.'
        },
        map: {
          scale: [],
          classes: '',
          extent: [
            [18, -35.90803],
            [20.41995, -32.90803]
          ],
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, csv) { // ### *** This only should be for the first card ...
            // Load flow map layer
            var layer = 'card-' + index + '-layer';
            // Load topoJSON of flow map
            var capeTownCoords = [18.466, -34];

            d3.select('.labels').append('text')
              .classed('cape-town-label card-layer invisible', true)
              .attr('x', function() {
                return projection(capeTownCoords)[0];
              })
              .attr('y', function() {
                return projection(capeTownCoords)[1];
              })
              .text('Cape Town');


            // Class with layer
          },
          switch: function(index) {
            // Simply show target layer
            d3.select('.cape-town-label')
              .classed('active', true)
              .classed('invisible', false);

          }
        },
        els: [{
            tag: 'h1',
            text: 'Illicit Abalone',
          },
          {
            tag: 'caption',
            text: 'Africa\'s "white gold"'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Cape Town is considered a hotspot for the illicit abalone trade.</em>'
          },
          {
            tag: 'p',
            html: 'Abalone, a shellfish known also as “white gold,” is one of South Africa’s most valuable marine resources.<sup>58</sup> The price for legally sourced South African abalone can reach over USD$30–$50 per kilogram, and in 2015 the sector was valued at USD$73,434,900.<sup>59</sup> South African abalone in particular is prized as a delicacy, and abalone is valued in some cultures for its perceived medicinal and aphrodisiacal properties.<sup>60</sup> Illegal harvesting was banned in 2007 under the Convention on International Trade in Endangered Species of Wild Fauna and Flora, but the protection on abalone was removed again in 2010.<sup>61</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/illicit-trade/abalone_flickr.jpg', // This should be on the Stable Seas Deck - comments
          },
          {
            tag: 'p',
            html: 'South Africa is the third-largest producer of farmed abalone after China and South Korea; however, there is also a thriving illicit trade in wild abalone. The illegal abalone market is said to be worth USD$440 million annually.<sup>62</sup> To put this in perspective, wild, legally harvested abalone in South African waters during 2015 amounted to 105 tons, with poached abalone amounting to 3,477 tons.<sup>63</sup> South Africa’s Department of Agriculture, Forestry and Fisheries has placed the value of the illicit abalone trade at roughly USD$33 million a year.<sup>64</sup>'
          },
          {
            tag: 'p',
            html: 'Most of the abalone from South Africa ends up in Asian markets, specifically in Hong Kong and China. The link between international organized-crime groups such as the Triads and the illicit abalone industry in South Africa is well established.<sup>65</sup> In at least one case, poachers exchanged the abalone they harvested for ingredients to make methamphetamine. The leader of the notorious gang involved in the trade was quoted in 2007 as saying that he could trade $43,000 worth of abalone for roughly $64,000 worth of methamphetamine.<sup>66</sup>'
          },
          {
            tag: 'p',
            html: 'While not all poachers are drug users or dealers, the abalone trade helps drive transnational organized crime subsectors such as narcotics that are controlled by highly organized criminal groups in Asia. Trafficking of abalone is conducted using multiple transportation methods, including refrigerated shipping containers. The risk of detection is significantly lower when using refrigerated containers given the significant replacement and compensation costs for authorities seizing legitimate refrigerated cargo.<sup>67</sup>'
          },
          {
            tag: 'p',
            html: 'Protecting this valuable resource requires cooperation between producers and consumer countries that serve as destinations for illicit abalone. Despite a number of prosecutions related to illicit abalone trafficking on both continents, the trade continues relatively unabated.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>58</sup> “South African Abalone,” South African National Biodiversity Institute, accessed 5 September 2017,',
                url: 'https://www.sanbi.org/creature/south-african-abalone'
              },
              {
                org: '<sup>59</sup> “Maximizing Niche Markets: South African Abalone,” Trade and Industrial Policy Strategies policy brief, April 2016,',
                url: 'http://bit.ly/2gnry46'
              },
              {
                org: '<sup>60</sup> Khalil Goga, “The Illegal Abalone Trade in the Western Cape,” Institute of Security Studies Paper 261, August 2014,',
                url: 'https://www.files.ethz.ch/isn/183159/Paper261.pdf'
              },
              {
                org: '<sup>61</sup> International Union for Conservation of Nature and Natural Resources, “South African Abalone,” <em>The Red List</em>,',
                url: 'http://support.iucnredlist.org/species/south-african-abalone'
              },
              {
                org: '<sup>62</sup> Crystal Chow, “The Ecological, Industrial and Drug War Behind the Abalone on Your Dinner Table,” Africa-China Reporting Project, 31 May 2017,',
                url: 'http://africachinareporting.co.za/2017/05/the-ecological-industrial-and-drug-war-behind-the-abalone-on-your-dinner-table/'
              },
              {
                org: '<sup>63</sup> Paul Steyn, “Poaching for Abalone, Africa’s \'White Gold,\' Reaches Fever Pitch,” National Geographic, 14 February 2017,',
                url: 'http://news.nationalgeographic.com/2017/02/wildlife-watch-abalone-poaching-south-africa/'
              },
              {
                org: '<sup>64</sup> Food and Agricultural Organization of the United Nations, “Abalone Production Continues to Grow, Coupled with Continuing Demand, Prices High and Stable,” <em>GLOBEFISH</em>, 3 July 2017,',
                url: 'http://www.fao.org/in-action/globefish/market-reports/resource-detail/en/c/902597/'
              },
              {
                org: '<sup>65</sup> Jonny Steinberg, “The Illicit Abalone Trade in South Africa,” Institute of Security Studies Paper 105, April 2005,',
                url: 'https://www.files.ethz.ch/isn/99200/105.pdf'
              },
              {
                org: '<sup>66</sup> Goga, “The Illegal Abalone Trade in the Western Cape.”'
              },
              {
                org: '<sup>67</sup> Ibid.'
              }
            ]
          }
        ] // end of els array
      },
      { // Card 6
        title: 'Black Market Pharmaceuticals',
        menu: 'Black Market Pharmaceuticals',
        metadata: {
          owner: 'John Filitz',
          description: 'Special focus on the pharmaceutical trade.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          highlights: ['SEN', 'GNB', 'GIN', 'SLE', 'LBR', 'CIV', 'GHA', 'TGO', 'BEN', 'NGA', 'CMR', 'GAB', 'COG', 'COD', 'AGO', 'NAM', 'ZAF', 'MOZ', 'TZA', 'KEN'],
          load: function(index, csv) { // ### *** This only should be for the first card ...
            // Load points layer with boxes
            var layer = 'card-' + index + '-layer';

            // Class with layer

          },
          switch: function(index) {
            // Simply show target layer
            d3.select('.card-' + index + '-layer')
              .classed('invisible', false);

          }
        },
        els: [{
            tag: 'h1',
            text: 'Black Market Pharmaceuticals',
          },
          {
            tag: 'caption',
            text: 'The health crisis of counterfeit medicines in Africa'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Highlighted countries have recorded a major seizure of black market pharmaceuticals in recent years.</em>'
          },
          {
            tag: 'p',
            html: 'Counterfeit and pirated goods are classified as the most valuable illicit economy subsector, with estimates of annual revenue ranging between USD$923 billion and $1.13 trillion. Counterfeit pharmaceuticals and medicines comprise approximately 25 percent of this market, and are valued at between USD$70 and $200 billion annually.<sup>68</sup> It is also the only counterfeiting sector that completely displaces original products from the market.<sup>69</sup>'
          },
          {
            tag: 'p',
            html: 'China is the largest single source of counterfeit medicines, with substantial factories also reported in India and Russia.<sup>70</sup> Most of the counterfeit medicines emanate from commercial shipping ports and are transported in containers.<sup>71</sup> Recently, Nigeria has been cited as a key emerging source of counterfeit medicine production and distribution in Africa.<sup>72</sup>'
          },

          {
            gif: true,
            tag: 'video',
            videoId: 'nGL85NkTbUg',
            thumb: '../../assets/illicit-trade/Counterfeit-Medicine-Flows.gif' // ###
          },

          //###Insert JP's GIF
          {
            tag: 'p',
            html: 'The prevalence of counterfeit medicines is a particular challenge for sub-Saharan African countries, with estimates indicating that on average, 30 percent of medicines available are counterfeit. According to critics, the impact of counterfeit medicines, with specific reference to anti-malarials, should be viewed as a crime against humanity as they deliberately derail efforts to prevent the 660,000 annual deaths attributed to Malaria.<sup>73</sup> For instance, 59 percent of the anti-malarial medication monitored in the period 2002–2010 in Burkina Faso, Chad, Cameroon, the Democratic Republic of the Congo, Ghana, Kenya, Nigeria, Rwanda, and Senegal failed chemical analysis. Governance, consumer awareness, and education are central to combating this problem.<sup>74</sup>'
          },
          {
            tag: 'h3',
            text: 'Law Enforcement Efforts',
          },
          {
            tag: 'p',
            html: 'There are ongoing efforts by sub-Saharan African countries and international development agencies to address the challenge of counterfeit medicine. Four law enforcement operations led by the World Customs Organization and the International Institute of Research Against Counterfeit Medicines in partnership with African countries have yielded significant successes, with an average interception rate of 78 percent. The seized counterfeit medications include antibiotics and painkillers as well as anti-malarial, anti-inflammatory, anti-cancer, and diabetes medications that posed direct threats to human health. Starting in 2012, 869 million counterfeit medicines have been seized by the four enforcement operations, with the seized contraband valued at an estimated USD$569 million.<sup>75</sup>'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>68</sup> May, “Transnational Crime and the Developing World.”'
              },
              {
                org: '<sup>69</sup> “The Economic Impact of Counterfeiting and Piracy: Report Prepared for BASCAP and INTA,” Frontier Economics, 2017,',
                url: 'https://www.inta.org/Communications/Documents/2017_Frontier_Report.pdf'
              },
              {
                org: '<sup>70</sup> “The Globalization of Crime,” United Nations Office on Drugs and Crime.'
              },
              {
                org: '<sup>71</sup> Ibid.'
              },
              {
                org: '<sup>72</sup> Ibid.'
              },
              {
                org: '<sup>73</sup> Kaliyaperumal Karunamoorthi, “The Counterfeit Anti-Malarial is a Crime Against Humanity: A Systematic Review of the Scientific Evidence,” <em>Malaria Journal</em> 13 (209): 2014, doi: 10.1186/1475-2875-13-209. '
              },
              {
                org: '<sup>74</sup> <em>Illicit Trade: Converging Criminal Networks</em>, Organisation for Economic Co-operation and Development.'
              },
              {
                org: '<sup>75</sup> “Operation Vice Grips 2: Record Seizure of Counterfeit Medicines in Africa, Alert to Public Health Emergency,” International Institute of Research Against Counterfeit Medicines, 25 October 2012,',
                url: 'http://www.iracm.com/en/vice-grips-2-2/'
              }
            ]
          }
        ] // end of els array
      },
      // { // Card 7
      //   title: 'Methodology',
      //   menu: 'Methodology',
      //   metadata: {
      //     owner: 'Curtis Bell',
      //     description: 'Card will provide basic methodology info.'
      //   },
      //   map: {
      //     scale: [],
      //     classes: '',
      //     translate: [],
      //     highlights: [],
      //     load: function (index, csv) {  // ### *** This only should be for the first card ...
      //       // Load flow map layer
      //       var layer = 'card-'+index+'-layer';
      //       // Load topoJSON of flow map
      //       d3.select('.card-eez-layer')
      //         .classed(layer, true);
      //       // Class with layer
      //     },
      //     switch: function (index) {
      //       // Simply show target layer
      //       switchMainIndex(0);
      //       // d3.select('.card-' + index + '-layer')
      //       //   .classed('invisible', false);
      //
      //     }
      //   },
      //   els: [
      //     { tag: 'h1',
      //       text: 'Methodology',
      //     },
      //     { tag: 'p',
      //       html: 'We created an Illicit Trade Score for each of the 30 coastal countries by asking experts to evaluate the severity of illegal trades in arms, drugs, contraband, and wildlife. For each issue and country, respondents assessed the severity of the problem, the extent to which each trade is a maritime issue (rather than land-based or air-based), and the likely trajectory of the problem over the next three to five years. In this way, these scores reflect the median answer to 360 response items spanning three aspects of four issues across 30 countries.'
      //     },
      //     { tag: 'p',
      //        html: 'We weight all answers equally, so in effect countries with higher scores have more kinds of illegal trades, those trades are occurring primarily at sea, and the problems are getting worse. Beyond the expert assessment of the severity of the problem, these scores do not reflect any estimates of or assumptions about the volume or value of these trades. These data are impossible to obtain due to the nature of black markets and the irregularity of major seizures.'
      //     },
      //     { tag: 'p',
      //        html: 'We provide more information about each survey item, including disaggregated data about each illicit trade, in the data documentation available for download.' //### insert link
      //     },
      //     { tag: 'h3',
      //       text: 'Arms',
      //     },
      //     { tag: 'p',
      //        html: 'The first issue area analyzed, arms trafficking, focuses on illegal transfers of weapons and ammunition across state borders. It does not cover legal arms sales between governments, but instead aims to capture illegal flows that primarily involve non-state actors. Most of these arms are categorized as small arms and light weapons. The buyers are often—though not always— violent non-state actors operating in the region in question.'
      //     },
      //     { tag: 'h3',
      //       text: 'Drugs',
      //     },
      //     { tag: 'p',
      //        html: 'Drug trafficking analysis highlights international transfers of illegal narcotics and other banned substances, primarily heroin, cocaine, and methamphetamines. Sections of the report show that sub-Saharan Africa has recently transitioned from being not only a transcontinental transport hub, but also a major consumer of these drugs and, increasingly, a producer of methamphetamines.'
      //     },
      //     { tag: 'h3',
      //       text: 'Contraband',
      //     },
      //     { tag: 'p',
      //        html: 'Contraband trafficking is a diverse set of activities described as the illegal trade or movement of legal substances. These substances vary widely around the continent, but include pharmaceuticals, sugar, charcoal, and electronics. The quantitative scores show the severity of any one of these trades in a country’s maritime space, but the report also discusses several discrete problems that are specific to particular countries or subregions.'
      //     },
      //     { tag: 'h3',
      //       text: 'Wildlife',
      //     },
      //     { tag: 'p',
      //        html: 'The final issue area analyzed, wildlife trafficking, covers poaching of protected species and illicit transfers of animals (e.g., exotic pets) as well as animal products (e.g., ivory and pelts) acquired through illegal means. Though the illegal trade in rhinoceros and elephant ivory is the best-known outside of Africa, the score also reflects lesser-known issues like the poaching of abalone in southern Africa and of pangolins in central and western Africa.'
      //     }
      //   ] // end of els array
      // }
    ]
  }, // checked out by Sean  // Checked out by Sean
  maritimeMixedMigration: {
    // not prepped?
    metadata: { // Independent data source for each page
      version: '0.0.2',
      name: 'Mixed Migration',
      updates: true,
      /*
           here is where you write updates
           do one line per update, like
           added legend to card 3
           added citations to card 5
           input thumbnail path to card 4
           loaded point data

           */
      index: 10,
      code: 'maritimeMixedMigration',
      path: 'maritime-mixed-migration',
      countryData: [],
      csv: '../../data/maritime-mixed-migration/maritimeMixedMigration.csv',
      color: '#896F33',
      order: -1,
      description: 'Migrants hoping for better economic opportunities are susceptible to being victims of crimes such as human trafficking, slavery, and the illicit sex trade.'
    },
    load: function(csv, callback) {
      d3.csv(csv, function(vals) {
        vals.forEach(function(d) {
          d.ia10c0 = +d.ia10c0;
          d.ia10c4 = +d.ia10c4;
          d.ia10c5 = +d.ia10c5;
        });
        issueAreaData[issueArea].metadata.countryData = vals;
        callback('maritime mixed migration load csv function callback');
      });
    },
    cards: [{ // Card 0
        title: 'Maritime Mixed Migration',
        menu: 'Maritime Mixed Migration',
        metadata: {
          owner: 'Curtis Bell',
          description: 'Card will introduce the section, define smuggling and trafficking.'
        },
        map: {
          scale: [],
          classes: 'card-eez-layer',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, csv) { // ### *** This only should be for the first card ...
            // Class EEZ with card-0-layer to enable switch() method
            var layer = 'card-' + index + '-layer';
            d3.select('.card-eez-layer')
              .classed(layer, true);
          },
          switch: function(index) {
            var target = 'card-' + index + '-layer';
            var vals = issueAreaData[issueArea].metadata.countryData;

            vals.forEach(function(d, i) { // ### this is a misuse of D3! or is it?!
              d3.selectAll('.country.' + d.iso3)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('fill', colorBrew[d.ia10c0][0])
                .style('stroke', colorBrew[d.ia10c0][1]);
              //   .style('fill', colorBrew[d.ia10c0][0])
              //  .style('stroke', colorBrew[d.ia10c0][1]);

              d3.selectAll('.eez.' + d.iso3)
                .classed('active', true)
                .transition().delay(i * 10)
                .style('stroke', colorBrew[d.ia10c0][1]);

            });

            d3.select('.' + target)
              .classed('invisible', false);

          }
        },
        els: [{
            tag: 'h1',
            text: 'Maritime Mixed Migration',
          },
          {
            tag: 'caption',
            text: 'Trafficking and smuggling in persons'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<div class="brew-10 legend-entries light">Tier 2</div><br /><div class="brew-30 legend-entries light">Tier 2 Watchlist</div><br /><div class="brew-20 legend-entries light">Tier 3</div><br /><div class="brew-40 legend-entries light">Special Case</div><br />Source: <a href="https://www.state.gov/j/tip/rls/tiprpt/2017/" target="_blank">2017 Trafficking in Persons Report, United States Department of State</a>'
          },
          {
            tag: 'p',
            html: 'Experts in human security have long realized the complex and inseparable nature of activities like human smuggling, human trafficking, slavery, economic migration, asylum-seeking, and the global illicit sex trade. Individual migrants who leave their home countries for economic opportunities elsewhere may find themselves both voluntarily paying smugglers and involuntarily paying bribes and ransoms before they reach their destinations. Others will never arrive, and will instead endure long periods of forced labor or subjugation to sex traffickers. Some will see their families divided among transnational criminal networks that exploit vulnerable migrants.'
          },
          {
            tag: 'p',
            html: 'Following the lead of the International Organization for Migration, we describe these inter-related activities as <em>mixed migration</em>, and further describe the presence of these activities at sea and in ports as <em>maritime mixed migration.</em> '
          }, // ### Add hyperlink: <<link https://www.iom.int/files/live/sites/iom/files/Country/docs/Mixed-Migration-HOA.pdf>>
          // { tag: 'h3',
          //   text: 'The Maritime Mixed Migration Score'
          // },
          // {tag: 'indexTable'
          // },
          // { tag: 'caption',
          //   text: 'Note: scores are rounded to the nearest whole number.'
          // },
          {
            tag: 'p',
            html: 'This section focuses on the extent to which these activities occur at sea, with a special emphasis on issues like slavery in the fishing industry, the smuggling of economic migrants, child trafficking, and international efforts to address these issues. We also show how events in and around Africa, such as famine and war in Yemen, are changing routes and endangering migrants from across the region.'
          },
          // { tag: 'p',
          //    html: 'To learn more about how these scores are calculated, please visit our “Methodology” page.'
          // }
        ] // end of els array
      }, // End of first element of cards object
      { // Card 1
        title: 'Beyond the Med',
        menu: 'Beyond the Med',
        metadata: {
          owner: 'Emina Sadic',
          description: 'Overview of routes outside the Med.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, file) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';

            var labels = [
              [-15.5, 29.2],
              [8.2, 4.88],
              [47.8, 12.6],
              [39, -18],
              [45, -9]
            ];

            var labelg = mapg.append('g')
              .classed('card-layer invisible ' + layer, true);

            labels.forEach(function(label, i) {
              labelg.append('rect')
                .attr('x', function() {
                  return projection(label)[0];
                })
                .attr('y', function() {
                  return projection(label)[1];
                })
                .classed('migration-label', true)
                .style('fill', function() {
                  return colorBrew[i][0];
                });
              //        .style('stroke', function () { return colorBrew[i][1];});

              labelg.append('text')
                .attr('x', function() {
                  return projection(label)[0] + 14;
                })
                .attr('y', function() {
                  return projection(label)[1] + 29;
                })
                .style('fill', function() {
                  return colorBrew[i][1];
                })
                .classed('migration-label-text', true)
                .text(i + 1);

            })

            // Load up flow map GIS layer - geojson

            // Class loaded layer with card-0-layer to enable switch() method

            //.classed(layer, true);
          },
          switch: function(index) {
            d3.selectAll('.card' + index + '-layer')
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Beyond the Med',
          },
          {
            tag: 'caption',
            text: 'Maritime economic migration occurs in every part of sub-Saharan Africa'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Number squares correspond with the route descriptions offered below</em>'
          },
          {
            tag: 'p',
            html: 'The surge in migrants leaving Africa for Europe has garnered global attention, but significant migration routes also surround sub-Saharan Africa, and these routes receive far less attention. This section highlights some of the major African migration routes beyond the Mediterranean Basin.'
          },
          {
            tag: 'img',
            src: '../../assets/maritime-mixed-migration/beyond_the_med_routes-01.png', // This should be on the Stable Seas Deck - comments
          },

          {
            tag: 'h3',
            classes: 'migration-heading ia10c1-1',
            text: '1 To the Canary Islands',
          },
          {
            tag: 'p',
            html: 'Nearly a decade ago, the West African route that links Senegal and Mauritania to the Spanish Canary Islands was frequently utilized for migrants smuggled in small wooden fishing boats. When its popularity peaked in 2006, nearly 32,000 migrants made the journey and an estimated 20 percent died in the attempt.<sup>1</sup> Increased patrolling efforts by Spain, Senegal, and Mauritania over the last decade have reduced the popularity of this route by 98 percent; in 2016, these countries identified just 671 known travelers.<sup>2</sup>'
          },
          {
            tag: 'h3',
            classes: 'migration-heading ia10c1-2',
            text: '2 West Africa to Gabon',
          },
          {
            tag: 'p',
            html: 'While the majority of West African migrants travel north to the Mediterranean Sea, some turn south to seek work in oil-rich Gabon and Equatorial Guinea. Calabar, a port city in southeastern Nigeria, is a known launching point for those heading south to find work in oil hubs. As West African members of ECOWAS permit free movement between member states, an unknown number of economic migrants take this route from Benin, Burkina Faso, Mali, Nigeria, and elsewhere.'
          },
          {
            tag: 'h3',
            classes: 'migration-heading ia10c1-3',
            text: '3 Somalia to Yemen, and Back',
          },
          {
            tag: 'p',
            html: 'Over 200,000 migrants from the Horn of Africa crossed the Red Sea or Gulf of Aden to reach Yemen over the last decade, but ongoing conflict and increasing travel costs have caused a sharp drop in the popularity of this route. The severity of Yemen’s ongoing humanitarian disaster and stronger labor laws around the Arabian Peninsula have instead generated a growing reverse flow back to the Horn of Africa. Since 2015, nearly 100,000 people are believed to have migrated to Africa from this war zone.'
          },
          {
            tag: 'h3',
            classes: 'migration-heading ia10c1-4',
            text: '4 East Africa to South Africa',
          },
          {
            tag: 'p',
            html: 'South Africa receives around 15,000 migrants per year from the Horn of Africa.<sup>3</sup> They travel a maritime route that transits Kenya and Tanzania to arrive in Mozambique. From there, migrants travel over land to South Africa. Approximately 97 percent of the migrants on this route use smuggling networks.<sup>4</sup>'
          },
          {
            tag: 'h3',
            classes: 'migration-heading ia10c1-5',
            text: '5 Comoros and Madagascar to Mayotte',
          },
          {
            tag: 'p',
            html: 'Each year, the French territorial island of Mayotte draws migrants from neighboring countries including Comoros and Madagascar. This draw increased when Mayotte became France’s 101<sup>st</sup> department in 2011. This new political status brought higher wages, higher standards of health and education, and the practice of birthright citizenship, which allows non-French citizens born in Mayotte to apply for citizenship upon attaining adulthood.<sup>5</sup> Migrants often travel by night in small overcrowded boats called <em>kwassa-kwassa</em>; this makes the risky journey even more perilous by increasing the risk of capsizing.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>1</sup> Walter Kemp, “Learning from the Canaries: Lessons from the ‘Cayucos’ Crisis,” New York: International Peace Institute, May 2016, 3.'
              },
              {
                org: '<sup>2</sup> Jorgen Carling and Maria Hernandez-Carretero. “Protecting Europe and Protecting Migrants? Strategies for Managing Unauthorised Migration from Africa,” <em>British Journal of Politics and International Relations</em> 13 (2011): 43, doi:10.1111/j.1467-856X.2010.00438.x.'
              },
              {
                org: '<sup>3</sup> Bram Frouws and Christopher Horwood, “Smuggled South,” Regional Mixed Migration Secretariat, March 2017,2,',
                url: 'http://regionalmms.org/images/briefing/Smuggled_South.pdf'
              },
              {
                org: '<sup>4</sup> Frouws and Horwood, “Smuggled South,” 15.'
              },
              {
                org: '<sup>5</sup> Simon Massey, “A Hidden Catastrophe: Irregular Migration within the Comoros Archipelago,” in <em>Eurafrican Migration: Legal, Economic and Social Responses to Irregular Migration</em>, eds. Simon Massey and Rino Coluccello (London: Palgrave Pivot, 2015), 109.'
              }
            ]
          }
          //(http://www.aljazeera.com/programmes/aljazeeraworld/2016/02/island-death-160203115053532.html, documentary, boat scenes starting 22:42, 30:30)
        ] // end of els array
      },
      { // Card 2
        title: 'Across the Gulf of Aden',
        menu: 'Across the Gulf of Aden',
        metadata: {
          owner: 'Alex Amling',
          description: 'How conflict affects things in the horn of Africa, includes a Somali Waters plug.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          path: '../../data/maritime-mixed-migration/gulf-of-aden-routes.csv',
          extent: [
            [42, 3],
            [60, 20]
          ],
          highlights: [],
          tooltip: true,
          load: function(index, file) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';

            d3.csv(file, function(vals) {
              vals.forEach(function(d) {
                d.lat = +d.lat;
                d.lon = +d.lon;
              });

              var aden = mapg.append('g')
                .classed('card-layer invisible ' + layer, true);

              aden.selectAll('circle')
                .data(vals).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr('r', '1px')
                .style('fill', function(d) {
                  if (d.class == 'southerly') {
                    return colorBrew[1][1];
                  } else if (d.class == 'northerly') {
                    return colorBrew[2][1];
                  }
                })
                .attr('class', function(d) {
                  return d.class;
                });

            });

          },
          switch: function(index) {
            d3.selectAll('.card' + index + '-layer')
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Across the Gulf of Aden',
          },
          {
            tag: 'caption',
            text: 'How migration in conflict zones fuels humanitarian crises'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Green dots represent southbound trafficking routes. <br />Red dots represent northbound trafficking routes.</em>'
          },
          {
            tag: 'p',
            html: 'Violence and political instability around the Gulf of Aden are driving migration patterns in some unexpected ways. Many migrants begin their journeys to escape conflict, but many also find themselves in conflict zones as they seek out established smuggling networks that can facilitate maritime passage. In this way, political violence both repels and attracts migrants. This is apparent near the Gulf of Aden.'
          },
          {
            gif: true,
            tag: 'video',
            videoId: 'bRm4-RUi42M',
            thumb: '../../assets/maritime-mixed-migration/migration-gulf-of-aden.gif' // ###
          },
          {
            tag: 'p',
            html: 'Smuggling and trafficking networks thrive where poor governance and weak border controls ease transnational travel. These conditions, the 2017 <a href="http://oefresearch.org/publications/stable-seas-somali-waters" target="_blank">Stable Seas: Somali Waters</a> report found, have made Djibouti and the northern Somali coastline preferred points of transit for migrants trying to reach the Arabian Peninsula. However, the route is dynamic, changing in response to violence, humanitarian crises, economic opportunity, and even drought.'
          },

          {
            tag: 'p',
            html: 'Obock, Djibouti, was the central hub for African migrants heading for the Arabian Peninsula until 2014, but changing conditions shifted some traffic eastward toward northern Somalia around that time. These changes included recurrent incidents of violence against migrants in Obock, a growing reverse flow of migrants from the Arabian Peninsula to the Somali coast, and, of course, the outbreak of a major civil war in Yemen.<sup>6</sup>'
          },
          {
            tag: 'p',
            html: 'The best available statistics on Gulf of Aden migration indicate that the flow of migrants into Yemen dropped briefly at the beginning of the war, but increased slightly again thereafter. Pervasive violence complicates the task of counting migrants, but the best information available suggests the long drought is hindering migration once again. Smuggling and trafficking networks are in place, but many in the Horn of Africa can no longer afford the fee to cross the Gulf of Aden.<sup>7</sup>' //### JPS Video will go here
          },
          {
            tag: 'p',
            html: 'While weak maritime enforcement capacity<sup>8</sup> supports smuggling and trafficking, it increases the vulnerabilities of migrants at the same time. Violence against maritime migrants, including murder, sexual violence, and forced evacuations of boats far from any shore, is common.<sup>9</sup> Even when migrants and asylum-seekers make it to Yemen, they remain physically and economically insecure. Migrants must face the perils of being in a war-torn country that is suffering from severe drought and a new cholera epidemic. The lawlessness of the area also facilitates extortion, kidnapping, smuggling, forced labor, and sex trafficking.'
          },
          {
            tag: 'p',
            html: 'Migration will occur so long as the potential economic gains outweigh the expense and danger of the journey, so making real progress against this problem will require a very broad strategy that addresses these core motivations. Otherwise, as seen around the Gulf of Aden, migrants will shift routes and smuggling networks will quickly reestablish themselves to accommodate—and exploit—these vulnerable travelers.'
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>6</sup> “Regional Mixed Migration in the Horn of Africa and Yemen in 2012: 1st Quarter Trend Summary and Analysis,” Regional Mixed Migration Secretariat, accessed 11 September 2017,',
                url: 'http://www.regionalmms.org/trends/RMMS%20Mixed%20Migration%20Trends%20Q1%202012.pdf'
              },
              {
                org: '<sup>6</sup> “Ethiopia Country Profile,” Regional Mixed Migration Secretariat,  accessed 11 September 2017.',
                url: 'http://www.regionalmms.org/images/CountryProfile/Ethiopia/EthiopiaCountryProfile.pdf'
              }, // this uses the same citation number (6) twice - is that ok? ###
              {
                org: '<sup>7</sup> “Regional Mixed Migration in East Africa and Yemen in 2017: 1st Quarter Trend Summary and Analysis,” Regional Mixed Migration Secretariat, accessed 21 August 2017,',
                url: 'http://regionalmms.org/trends/RMMS%20Mixed%20Migration%20Trends%20Q1%202017.pdf'
              },
              {
                org: '<sup>8</sup> Thean Potgieter and Reiner Pommerin, <em>Maritime Security in Southern African Waters</em> (Stellenbosch, South Africa: AFRICAN SUN MeDIA, 2009).'
              },
              {
                org: '<sup>9</sup> Christopher Horwood, “The Migration Compact: A Robust Triangle of Victims and Perpetrators,” Regional Mixed Migration Secretariat, 7 November 2016,',
                url: 'http://regionalmms.org/index.php/research-publications/feature-articles/item/55-the-migration-compact-a-robust-triangle-of-victims-and'
              }
            ]
          }
        ] // end of els array
      },
      { // Card 3
        title: 'Closing the Canaries',
        menu: 'Closing the Canaries',
        metadata: {
          owner: 'Emina Sadic',
          description: 'Efficacy of maritime patrols in closing route.'
        },
        map: {
          scale: [],
          path: '../../data/maritime-mixed-migration/ia10c3-migration-routes.json',
          classes: '',
          translate: [],
          extent: [
            [-30, -7],
            [70, 40]
          ],
          highlights: [],
          tooltip: true,
          load: function(index, file) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';




            d3.json(file, function(error, vals) {

              var canaryRoutes = mapg.append('g')
                .classed('canary-routes card-layer invisible ' + layer, true);

              var guineaCanary = canaryRoutes.append('g')
                .classed('guinea-canary-route', true);

              guineaCanary.selectAll('circle')
                .data(vals.guineaCanary).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection(d)[0];
                })
                .attr('cy', function(d) {
                  return projection(d)[1];
                })
                .attr('r', '4px')
                .style('fill', function(d, i) {
                  return rampColor(i / vals.guineaCanary.length);
                })
                .classed('guinea-canary', true)
                .on('mouseenter', function() {
                  d3.selectAll('.guinea-canary.route-label')
                    .classed('invisible', false);
                })
                .on('mouseleave', function() {
                  d3.selectAll('.guinea-canary.route-label')
                    .classed('invisible', true);
                });


              var mauritaniaCanary = canaryRoutes.append('g')
                .classed('mauritania-canary-route', true);

              mauritaniaCanary.selectAll('circle')
                .data(vals.mauritaniaCanary).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection(d)[0];
                })
                .attr('cy', function(d) {
                  return projection(d)[1];
                })
                .attr('r', '4px')
                .style('fill', function(d, i) {
                  return rampColor(i / vals.mauritaniaCanary.length);
                })
                .classed('mauritania-canary', true)
                .on('mouseenter', function() {
                  d3.selectAll('.mauritania-canary.route-label')
                    .classed('invisible', false);
                })
                .on('mouseleave', function() {
                  d3.selectAll('.mauritania-canary.route-label')
                    .classed('invisible', true);
                });

              var senegalCanary = canaryRoutes.append('g')
                .classed('senegal-canary-route', true);

              senegalCanary.selectAll('circle')
                .data(vals.senegalCanary).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection(d)[0];
                })
                .attr('cy', function(d) {
                  return projection(d)[1];
                })
                .attr('r', '4px')
                .style('fill', function(d, i) {
                  return rampColor(i / vals.senegalCanary.length);
                })
                .classed('senegal-canary', true)
                .on('mouseenter', function() {
                  d3.selectAll('.senegal-canary.route-label')
                    .classed('invisible', false);
                })
                .on('mouseleave', function() {
                  d3.selectAll('.senegal-canary.route-label')
                    .classed('invisible', true);
                });


              var transSaharan = canaryRoutes.append('g')
                .classed('trans-saharan-canary-route', true);

              transSaharan.selectAll('circle')
                .data(vals.transSaharan).enter()
                .append('circle')
                .attr('cx', function(d) {
                  return projection(d)[0];
                })
                .attr('cy', function(d) {
                  return projection(d)[1];
                })
                .attr('r', '4px')
                .style('fill', function(d, i) {
                  return rampColor(i / vals.transSaharan.length);
                })
                .classed('trans-saharan', true)
                .on('mouseenter', function() {
                  d3.selectAll('.trans-saharan.route-label')
                    .classed('invisible', false);
                })
                .on('mouseleave', function() {
                  d3.selectAll('.trans-saharan.route-label')
                    .classed('invisible', true);
                });

              var labels = [{
                  title: 'Senegal-Canary Route',
                  class: 'senegal-canary',
                  coords: [-16.3, 15.76]
                },
                {
                  title: 'Trans-Saharan Route',
                  class: 'trans-saharan',
                  coords: [0, 17.5]
                },
                {
                  title: 'Mauritania-Canary Route',
                  class: 'mauritania-canary',
                  coords: [-16.2, 21.1]
                },
                {
                  title: 'Guinea-Canary Route',
                  class: 'guinea-canary',
                  coords: [-15.2, 11.4]
                }
              ];

              var routeLabels = mapg.append('g')
                .classed('route-labels', true);

              routeLabels.selectAll('.route-label')
                .data(labels).enter()
                .append('text')
                .attr('x', function(d) {
                  return projection(d.coords)[0];
                })
                .attr('y', function(d) {
                  return projection(d.coords)[1];
                })
                .text(function(d) {
                  return d.title
                })
                .attr('class', function(d) {
                  return 'route-label invisible ' + d.class
                });

            });

            // Load up flow map GIS layer - geojson

            // Class loaded layer with card-0-layer to enable switch() method

            //.classed(layer, true);
          },
          switch: function(index) {
            d3.selectAll('.card' + index + '-layer')
              .classed('invisible', false);
          }
        },
        els: [{
            tag: 'h1',
            text: 'Closing the Canaries',
          },
          {
            tag: 'caption',
            text: 'When one route is closed, migrants and smuggling networks often find others'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em> Shifting migration routes in West Africa. Markers are lighter near origin countries and grow darker as migrants near their intended destinations.</em>'
          },
          {
            tag: 'p',
            html: 'Not all routes to Europe cross the Mediterranean. In 2005, Spain revised immigration laws, granting amnesty to irregular migrants for a period of time. African migrants, believing they would be allowed to stay if they could only reach Spain, sought new routes to nearby Spanish holdings, including the exclaves of Ceuta and Melilla on the Moroccan coast. These are well-secured and far from West Africa,<sup>10</sup> so the “route of least resistance” went to Spain’s Canary Islands, which lie just 50 miles off Morocco’s Atlantic coast. However, journeys starting in Mauritania or Senegal must cover more than 300 miles.'
          },
          {
            tag: 'img',
            src: '../../assets/maritime-mixed-migration/migrants_canary_islands.jpg', // This should be on the Stable Seas Deck - comments
            alt: 'Migrants arriving on the Spanish Canary Islands in 2004. Photo: Noborder Network',
            caption: 'Migrants arriving on the Spanish Canary Islands in 2004. Photo: Noborder Network'
          },
          {
            tag: 'p',
            html: 'Fewer than 5,000 people were smuggled to the Canary Islands by boat in 2005,<sup>11</sup>  but nearly 32,000 arrived in 2006. 6,000 more died while attempting the crossing.<sup>12</sup>  Nearly half of these migrants originated from Senegal, though significant numbers also came from The Gambia, Côte d’Ivoire, and Guinea-Bissau.<sup>13</sup>'
          },
          {
            tag: 'p',
            html: 'The bilateral African-European response to the crisis was to enhance security measures in the Atlantic. Hera II, the first operation coordinated by Frontex—the European Union’s border control agency—was launched in 2006 to surveil the waters of Mauritania, Senegal, and Cabo Verde; further patrols followed by subsequent agreements with The Gambia, Guinea-Bissau, and Guinea.<sup>14</sup>'
          },
          // ### document says:  [frontex chart…number of migrants reaching Canary Islands from West Africa] here
          {
            tag: 'p',
            html: 'While patrols successfully reduced the number of people attempting this particular crossing, they did not deter migrants overall. Instead, the routes have shifted.<sup>15</sup> Migrants from West Africa represented a large portion of those attempting the Central Mediterranean route in 2016. This shift exposes the shortcomings of using security forces to deter and intercept migrants relative to strategies aimed at addressing root causes of migration such as poverty, poor human rights, and pervasive unemployment.'
          },
          // ### [altai arrivals chart--pg 55, nationalities]. https://www.youtube.com/watch?v=KOXdY9YaapA

          {
            tag: 'links',
            items: [{
                org: '<sup>10</sup> “Migrants in Morocco,” Doctors Without Borders, 8 September 2010,',
                url: 'www.doctorswithoutborders.org/news-stories/briefing-document/migrants-morocco'
              },
              {
                org: '<sup>11</sup> Dale Fuchs, “Canary Islands Fear Disaster as Number of Migrants Soars,” <em>The Guardian</em>, 3 September 2006,',
                url: 'www.theguardian.com/world/2006/sep/04/spain.mainsection'
              },
              {
                org: '<sup>12</sup> Carling and Carretero. “Protecting Europe and Protecting Migrants?” 43.'
              },
              {
                org: '<sup>13</sup> Kemp, “Learning from the Canaries,” 3.'
              },
              {
                org: '<sup>14</sup> Carling and Carretero, “Protecting Europe and Protecting Migrants?” 48.'
              },
              {
                org: '<sup>15</sup>   Carling and Carretero, “Protecting Europe and Protecting Migrants?” 49; Derek Lutterbeck, “Small Frontier Island: Malta and the Challenge of Irregular Immigration,” <em>Mediterranean Quarterly</em> 20, no. 1 (2009): 119–144, 123; Europa Press, “Frontex Justifica El Descenso De Inmigración Por Vía Marítima a Canarias En Un ‘Efecto Desplazamiento’ a Italia,” <em>Europa Press</em>, 30 July 2008.', // Is this right?
                url: 'http://www.europapress.es/nacional/noticia-frontex-justifica-descenso-inmigracion-via-maritima-canarias-efecto-desplazamiento-italia-20080730115309.html'
              },
            ]
          }

        ] // end of els array
      },
      { // Card 4
        title: 'Minors for Sale',
        menu: 'Minors for Sale',
        metadata: {
          owner: 'Emina Sadic',
          description: 'Child trafficking.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, file) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';

            d3.selectAll('.card-eez-layer')
              .classed(layer, true);

          },
          switch: function(index) {
            //switchMainIndex(index);

            var target = 'card-' + index + '-layer';
            var vals = issueAreaData[issueArea].metadata.countryData;

            vals.forEach(function(val, i) {
              if (val.ia10c4 == 1) {
                d3.selectAll('.country.' + val.iso3)
                  .classed('active', true)
                  .transition().delay(10 * i)
                  .style('fill', rampColor(0.5))
                  .style('stroke', rampColor(1));

                d3.selectAll('.eez.' + val.iso3)
                  .classed('active', true)
                  .transition().delay(i * 10)
                  .style('stroke', rampColor(1));
                //  function () {
                //   return d3.interpolateLab('white', color)(0.5);
                // });
              }
            });

          }
        },
        els: [{
            tag: 'h1',
            text: 'Minors for Sale',
          },
          {
            tag: 'caption',
            text: 'How trafficking affects the most vulnerable victims'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>Highlighted countries have ratified the Optional Protocol to the Convention on the Rights of the Child on the Involvement of Children in Armed Conflict.</em>'
          },
          {
            tag: 'p',
            html: 'UNICEF estimates that 24 percent of global trafficking victims are children, but for sub-Saharan Africa this estimate rises to 64 percent.<sup>16</sup>  Children are often vulnerable following negotiations to transport them for work, education, or formal training in another city or country. Their parents are sometimes aware of the circumstances involved. Additionally, porous borders and lax regulatory environments allow for trafficking of children to flourish.<sup>17</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/maritime-mixed-migration/Gabon_oil_economy_migrants.jpg', // This should be on the Stable Seas Deck - comments
            alt: ' Port-Gentil in Gabon. Photo: Justin Tallis/AFP/Getty Images',
            caption: 'Port-Gentil in Gabon. Photo: Justin Tallis/AFP/Getty Images'
          },

          {
            tag: 'p',
            html: 'In oil-rich Gabon and Equatorial Guinea, children are trafficked into the oil industry, domestic servitude, or the commercial sex trade.<sup>18</sup>  Many of these victims arrive by cramped boat from southern Nigeria. These migrations take several days and there is a high risk of boats capsizing.<sup>19</sup>  Due to limited monitoring services, few statistics are available to prove exactly how many children begin and complete this journey.'
          },
          {
            tag: 'p',
            html: 'In Gabon, girls are trafficked through middlepersons, including women called “aunties,” who facilitate opportunities for girls to work for wealthy African or European families.<sup>20</sup> The risks of sexual abuse and forced child labor are severe. Often, girls fleeing situations of forced domestic labor fall into prostitution and pedophilia networks.<sup>21</sup>  Young girls from neighboring countries also run the risk of becoming child brides in Gabon. Boys who come to Gabon seeking work can be lured into unpaid and unsafe jobs, or forced into street begging.<sup>22</sup>  Others are trafficked in the fishing sector, forced into dangerous jobs on the open sea.<sup>23</sup>'
            // insert video ### https://www.youtube.com/watch?v=QGEXAW4alBE
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>16</sup> Jan Beise, Anna Grojec, Claus Bech Hansen, Jens Matthes, Sarah Rosengaertner, and Danzhen You, “A Child is a Child: Protecting Children on the Move from Violence, Abuse and Exploitation,” UNICEF, May 2017, 36.',
                url: 'https://data.unicef.org/wpcontent/uploads/2017/05/UNICEF_A_child_is_a_child_May_2017_EN.pdf'
              },
              {
                org: '<sup>17</sup> “Borderline Slavery,” <em>Human Rights Watch</em>, 1 April 2003.',
                url: 'http://www.hrw.org/report/2003/04/01/borderline-slavery/child-trafficking-togo;'
              },
              {
                org: '<sup>17</sup> United Nations General Assembly, “Report of the Special Rapporteur on Trafficking in Persons, Especially Women and Children, Joy Ngozi Ezeilo,” United Nations Human Rights Council Twenty-Third Session A/HRC/23/48/Add.2, 24 May 2013, 3,',
                url: 'https://documents-dds-ny.un.org/doc/UNDOC/GEN/G13/139/70/PDF/G1313970.pdf?OpenElement'
              },
              {
                org: '<sup>18</sup> IRIN News, “Africa: High Cost of Child Trafficking,” <em>ReliefWeb</em>, 25 January 2012,',
                url: 'http://reliefweb.int/report/gabon/africa-high-cost-child-trafficking'
              },
              {
                org: '<sup>19</sup> “Borderline Slavery,” <em>Human Rights Watch</em>.'
              },
              {
                org: '<sup>20</sup> ### Need citation!! ###'
              },
              /// ###footnote missing in original copy-edited document.
              {
                org: '<sup>21</sup> Serge Rinkel, “Piracy and Maritime Crime in the Gulf of Guinea: Experience-Based Analyses of the Situation and Policy Recommendations,” Institute for Security Policy at Kiel University working paper 41, August 2015, 6.'
              },
              {
                org: '<sup>22</sup> Ibid.'
              },
              {
                org: '<sup>23</sup> “Trafficked Boys in Ghana Are Forced into Early Marriage,” <em>Deutsch Welle</em>, 2 May 2016.',
                url: 'www.dw.com/en/trafficked-boys-in-ghana-are-forced-into-early-marriage/a-19229198'
              },

            ]
          }
        ] // end of els array
      },
      { // Card 5
        title: 'Slavery at Sea',
        menu: 'Slavery at Sea',
        metadata: {
          owner: 'Alex Amling',
          description: 'Forced labor / fishing, Gulf of Guinea.'
        },
        map: {
          scale: [],
          classes: '',
          translate: [],
          highlights: [],
          tooltip: true,
          load: function(index, file) { // ### *** This only should be for the first card ...
            var layer = 'card-' + index + '-layer';

            d3.selectAll('.card-eez-layer')
              .classed(layer, true);

          },
          switch: function(index) {

            var target = 'card-' + index + '-layer';
            var vals = issueAreaData[issueArea].metadata.countryData;

            vals.forEach(function(val, i) {
              if (val.ia10c5 == 1) {
                d3.selectAll('.country.' + val.iso3)
                  .classed('active', true)
                  .transition().delay(10 * i)
                  .style('fill', rampColor(0.5))
                  .style('stroke', rampColor(1));

                d3.selectAll('.eez.' + val.iso3)
                  .classed('active', true)
                  .transition().delay(i * 10)
                  .style('stroke', rampColor(1));
                //  function () {
                //   return d3.interpolateLab('white', color)(0.5);
                // });
              }
            });

          }
        },
        els: [{
            tag: 'h1',
            text: 'Slavery at Sea',
          },
          {
            tag: 'caption',
            text: 'Forced labor in marine fisheries'
          },
          {
            tag: 'legend',
            text: 'Map Legend',
            legendContent: '<em>In sub-Saharan Africa, only Angola, Congo, and South Africa have ratified the International Labor Organization\'s Work in Fishing Convention of 2007 (No. 188)</em>'
          },
          {
            tag: 'p',
            html: 'Forced labor is a significant problem in the fishing industry in the Gulf of Guinea, where both adults and children can suffer severe physical abuse, starvation, and sickness due to labor exploitation.<sup>24</sup>  At the time of writing, there are no legal instruments in place that regulate living and working conditions on fishing vessels, making the fishing sector “particularly susceptible to human trafficking.”<sup>25</sup>'
          },
          {
            tag: 'p',
            html: 'In many cases, fishing vessels are registered in states that do not enforce international protocols and treaties on human smuggling and trafficking.<sup>26</sup>  Trafficking victims have no access to legal recourse, are stripped of identification documents, and are often stuck on fishing vessels against their will for prolonged periods of time.<sup>27</sup>'
          },
          {
            tag: 'p',
            html: 'The U.S. State Department’s 2017 <em>Trafficking in Persons Report</em> lists several countries where human trafficking is directly linked to the fishing industry. Among the listed countries, South Africa and Ghana stand out for different reasons.<sup>28</sup>'
          },
          {
            tag: 'p',
            html: 'In South Africa, young, mostly South and Southeast Asian men<sup>29</sup> are deceived by recruitment agencies specializing in the fishing industry.<sup>30</sup>  Once on board the fishing vessels, these men suffer from beatings and verbal abuse they cannot escape due to their isolation at sea.<sup>31</sup>'
          },
          {
            tag: 'p',
            html: 'In Ghana, traffickers exploit the traditional practice of leasing young boys to fishing boats, beating and denying food and education to children as young as six who have been knowingly turned over by their parents due to extreme poverty.<sup>32</sup>  The violence these boys are subjected to is especially heinous “because trafficked children [are] considered dispensable due to the poverty of their families and the ease of acquiring more children” to work.<sup>33</sup>  While pressure from the international community has led to significant changes in other industries that have relied predominantly on child labor and child trafficking (e.g., cocoa), legislation is non-existent for boys in the artisanal fishing industry on Lake Volta.<sup>34</sup>'
          },
          {
            tag: 'img',
            src: '../../assets/maritime-mixed-migration/fishing_vessel_illegal_ghana.jpg', // This should be on the Stable Seas Deck - comments
            alt: 'U.S. and Ghanaian law enforcement inspect a fishing vessel suspected of illicit activity. U.S. Navy photo by Kwabena Akuamoah-Boateng.',
            caption: 'U.S. and Ghanaian law enforcement inspect a fishing vessel suspected of illicit activity. U.S. Navy photo by Kwabena Akuamoah-Boateng.'
          },

          {
            tag: 'p',
            html: 'In both artisanal inland and sea-based fishing, it remains unclear to what extent human trafficking for forced labor as a cost-saving feature influences the pricing of fish.<sup>35</sup>  What is clear, however, is the fact that human trafficking networks thrive where there is high demand for cheap labor and poor enforcement of labor protections.<sup>36</sup> '
          },
          {
            tag: 'links',
            items: [{
                org: '<sup>24</sup> International Labour Organization, <em>Caught at Sea: Forced Labour and Trafficking in Fisheries</em> (Geneva, Switzerland: ILO, 2013),',
                url: 'http://www.ilo.org/wcmsp5/groups/public/---ed_norm/---declaration/documents/publication/wcms_214472.pdf'
              },
              {
                org: '<sup>25</sup> Interpol, <em>Study on Fisheries Crime in the West African Coastal Region</em> (Lyon, France: Interpol Environmental Security Sub-Directorate, 2014),',
                url: 'http://globalinitiative.net/wp-content/uploads/2017/01/interpol-illegal-fishing-study.pdf'
              },
              {
                org: '<sup>26</sup> United Nations Office on Drugs and Crime, <em>Transnational Organized Crime in the Fishing Industry – Focus on: Trafficking in Persons, Smuggling of Migrants, Illicit Drugs Trafficking</em> (Vienna, Austria: United Nations, 2011),',
                url: 'https://www.unodc.org/documents/human-trafficking/Issue_Paper_-_TOC_in_the_Fishing_Industry.pdf'
              },
              {
                org: '<sup>27</sup> Ibid.'
              },
              {
                org: '<sup>28</sup> U.S. Department of State, <em>Trafficking in Persons Report</em> (Washington, D.C.: U.S Department of State, June 2017),',
                url: 'https://www.state.gov/documents/organization/271339.pdf'
              },
              {
                org: '<sup>29</sup> Melanie Gosling, “’Slave Ships’ Seized off Cape Coast,” <em>Independent Online</em>, 24 January 2014,',
                url: 'https://www.iol.co.za/news/south-africa/western-cape/slave-ships-seized-off-cape-coast-1636266'
              },
              {
                org: '<sup>30</sup> Seafish, <em>Seafish Ethics Profile: South Africa</em> (Grimsby, UK: Seafish Industry Authority, 2015),',
                url: 'http://www.seafish.org/media/publications/SouthAfricaEthicsProfile_201509.pdf'
              },
              {
                org: '<sup>31</sup> Rebecca Surtees, <em>In African Waters: The Trafficking of Cambodian Fishers in South Africa</em> (Geneva, Switzerland and Washington, D.C.: IOM and Nexus Institute, 2014),',
                url: 'http://un-act.org/publication/view/in-african-waters-the-trafficking-of-cambodian-fishers-in-south-africa/'
              },
              {
                org: '<sup>32</sup> Sharon LaFraniere, “Africa’s World of Forced Labor, in a 6-Year-Old’s Eyes,” <em>The New York Times</em>, 29 October 2006,',
                url: ' http://www.nytimes.com/2006/10/29/world/africa/29ghana.html'
              },
              {
                org: '<sup>33</sup> Kirsten Singleton, Katrina B. Stone, and Julie Stricker, <em>Child Trafficking into Forced Labor on Lake Volta, Ghana: A Mixed Methods Assessment</em> (Washington, D.C.: International Justice Mission, 2016),',
                url: 'https://www.ijm.org/sites/default/files/resources/ijm-ghana-report.pdf'
              },
              {
                org: '<sup>34</sup> Ibid.'
              },
              {
                org: '<sup>35</sup> International Labour Organization, <em>Caught at Sea</em>; Singleton, Stone, and Stricker, <em>Child Trafficking into Forced Labor on Lake Volta, Ghana</em>.'
              },
              {
                org: '<sup>36</sup> Christopher Horwood, <em>In Pursuit of the Southern Dream: Victims of Necessity: Assessment of the Irregular Movement of Men from East Africa and the Horn to South Africa</em> (Geneva, Switzerland: International Organization for Migration, 2009),',
                url: 'http://publications.iom.int/system/files/pdf/iomresearchassessment.pdf'
              }
            ]
          }
        ] // end of els array
      },
      // {  // Card 6
      //   title: 'Methodology',
      //   menu: 'Methodology',
      //   metadata: {
      //     owner: 'Curtis Bell',
      //     description: 'Card will provide basic methodology info.'
      //   },
      //   map: {
      //     scale: [],
      //     classes: '',
      //     translate: [],
      //     highlights: [],
      //     load: function (index, file) {  // ### *** This only should be for the first card ...
      //       var layer = 'card-'+index+'-layer';
      //
      //       d3.selectAll('.card-eez-layer')
      //         .classed(layer, true);
      //
      //     },
      //     switch: function (index) {
      //       switchMainIndex(0);
      //     }
      //   },
      //   els: [
      //     // { tag: 'h1',
      //     //   text: 'Methodology',
      //     // },
      //     // { tag: 'p',
      //     //   html: 'The Maritime Mixed Migration Score characterizes the severity of human smuggling and trafficking at sea (30 percent), the prevalence of international maritime migration (30 percent), legal protections for migrants and victims of forced labor or sex trafficking (20 percent), and a population’s vulnerability to trafficking as measured by baseline socio-political conditions (20 percent). Countries with low scores have the weakest legal protections, the most vulnerable populations, and the greatest existing challenges related to maritime mixed migration.'
      //     // },
      //     // { tag: 'h3',
      //     //   text: 'Maritime Activity (30 percent)'
      //     // },
      //     // { tag: 'p',
      //     //    html: 'The first component of the score captures the severity of the issue in each country, as well as the extent to which these problems occur in a country’s maritime space. We accomplish this by scoring the severity of various problems and then weighting these severity scores according to whether they occur predominantly at sea, predominantly on land, or both on and off shore.'
      //     // },
      //     // { tag: 'p',
      //     //    html: 'Because these scores focus on maritime activity, they will not always align with other reports that focus on onshore smuggling, trafficking, internally displaced persons, and refugees. The Democratic Republic of the Congo, for example, has well-known challenges in these areas; however, there is very little maritime smuggling and trafficking due to the coastal area of the country being small, remote, and very far from the humanitarian challenges occurring in the distant eastern part of the country.'
      //     // },
      //     // { tag: 'p',
      //     //   text: 'We calculate activity scores with the following five inputs.'
      //     // },
      //     // { tag: 'h4',
      //     //   text: 'Types of Activity'
      //     // },
      //     // { tag: 'p',
      //     //   text: 'Rather than rely on inconsistent estimates of the number of victims, we account for the diversity in the types of trafficking occurring in a given country. More specifically, we use the Trafficking in Persons Report from the United States Department of State and other secondary sources to create eight scores. These scores capture the presence of two types of trafficking, sex and forced labor, across four populations, men, women, boys, and girls. If these sources elaborate on a specific form of trafficking against a specific population (e.g., sex trafficking of girls, boys trafficked for forced labor, etc.), then we code this as a significant activity. Possible scores range from zero (no discussion of any kind of trafficking) to eight (significant numbers of men, women, girls, and boys are all victims of both sex trafficking and forced labor).'
      //     // },
      //     // { tag: 'h4',
      //     //   text: 'Prevalence of Forced Labor Among Men and Women'
      //     // },
      //     // { tag: 'p',
      //     //   text: 'The Varieties of Democracy project asks expert respondents the extent to which both women and men are “free from servitude and other kinds of forced labor.” Responses are scored on a five-value scale ranging from these activities being “non-existent” to “widespread.” These scores reflect the actual practice of these activities rather than legal responses to them.'
      //     // },
      //     // { tag: 'h4',
      //     // text: 'Transit Country'
      //     // },
      //     // { tag: 'p',
      //     // text: 'Migrants are most likely to be subjected to a form of trafficking within a country if it is recognized as an important transit hub in the <em>Trafficking in Persons Report</em>. Countries are classified as “transit countries” when international migrants pass through in their journeys to be smuggled to other countries. For example, Libya is an important transit country for migrants making their way from West Africa to Europe via the Mediterranean routes. Migrants passing through a transit country are extremely vulnerable to being sold into forced labor or sex within the transit state.'
      //     // },
      //     // { tag: 'h4',
      //     // text: 'UNHCR Refugee Rate'
      //     // },
      //     // { tag: 'p',
      //     // text: 'We use data from the United Nations High Commissioner on Refugees (UNHCR) to calculate a logged per capita refugee rate. The score is higher when a greater share of a country’s population has sought refugee status in another country in the last year.'
      //     // },
      //     // { tag: 'p',
      //     // text: 'As a final step, we average these five scores and then multiply them by zero if there is no evidence of activity at sea, or by two if the evidence suggests these activities occur almost exclusively at sea or within maritime industries (e.g., sex trafficking to service offshore oil workers or fishers, forced labor in fishing, etc.). '
      //     // },
      //     // { tag: 'h3',
      //     //   text: 'Maritime Transit (30 percent)'
      //     // },
      //     // { tag: 'p',
      //     //   text: 'Accurately and consistently calculating the number of people crossing a specific maritime route is impossible due to the evasive nature of smuggling and illegal migration. However, we can create a proxy measure by using a country’s refugee rate (the number of UNHCR refugee applications divided by population) and an expert assessment of whether most migration from a country occurs by land (as in the Democratic Republic of the Congo) or by sea (as in Comoros). We multiply these scores to get a rough idea of the number of migrants transiting a country’s maritime space.'
      //     // },
      //     // { tag: 'h3',
      //     //   text: 'Legal Protections (20 percent)'
      //     // },
      //     // { tag: 'p',
      //     //   text: 'The legal protections portion of the score accounts for a state’s participation in several relevant international agreements (10 percent). A list of included agreements can be found in the technical notes, which are available for download on the data page. The domestic portion of the score (10 percent) is adapted from the “3P Anti-trafficking Policy Index” by Seo-Young Cho.### This index uses the <em>Trafficking in Persons Report</em> to annually score a state’s legal efforts in the areas of prosecuting traffickers, protecting potential victims, and preventing trafficking networks.  ' //link for triphashes above: http://www.economics-human-trafficking.net/anti-trafficking-3p.html
      //     // },
      //     // { tag: 'h3',
      //     //   text: 'Vulnerability (20 percent)'
      //     // },
      //     // { tag: 'p',
      //     //   text: 'Populations are more vulnerable to trafficking where political systems are ineffective, human capital is low, and socioeconomic conditions are poor. We proxy a population’s vulnerability with two measures: the primary-school completion rate as recorded by the World Bank, and the Vulnerability to Slavery score calculated by the Walk Free Foundation as part of its Global Slavery Index. These scores are averaged to produce the vulnerability score.'
      //     // },
      //     // { tag: 'p',
      //     //   text: 'For more technical information, including formulae for converting these scores to the 0 to 100 scale used in this report, please see the data documentation available for download.###' //Need to link to data download page.
      //     // },
      //   ] // end of els array
      // }
    ] // end of cards array
  }
};
