(function() {
  $(function() {

    /*  Globals
    -------------------------------------------------- */
    var PROPERTIES =               ['translateX', 'translateY', 'opacity', 'scale'],
        $window =                  $(window),
        $body =                    $('body'),
        wrappers =                 [],
        currentWrapper =           null,
        scrollTimeoutID =          0,
        bodyHeight =               0,
        windowHeight =             0,
        windowWidth =              0,
        prevKeyframesDurations =   0,
        scrollTop =                0,
        relativeScrollTop =        0,
        currentKeyframe =          0,
        keyframes = [
          {
            'wrapper' : '#intro',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.name',
                'translateY'  : -140,
                'opacity'     : 0
              } , {
                'selector'    : '.byline',
                'translateY'  : -110,
                'opacity'     : 0
              } , {
                'selector'    : '.twitter',
                'opacity'     : [1, 0]
              }
            ]
          } , {
            'wrapper' : '#explosion',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.explosion-byline',
                'translateY'  : '-25%',
                'opacity'     : [0, 1.75] // hack to accelrate opacity speed
              } , {
                'selector'    : '#domExplosionList',
                'translateY'  : '-70%',
                'opacity'     : [0, 1] // hack to accelrate opacity speed
              }, {
                'selector'    : '#crete_squares',
                'translateY'  : '-25',
                'opacity'     : [0, 1]
              }
            ]
          } , {
            'wrapper' : '#explosion',
            'duration' : '75%',
            'animations' :  [
              {
                'selector'    : '.dei-1',
                'translateY'  : '-15%',
                'translateX'  : '-10%',
                'opacity'     : [1, 0],
                'scale'       : 2,
              } , {
                'selector'    : '.dei-2',
                'translateY'  : '-5%',
                'translateX'  : '-4%',
                'opacity'     : [1, 0] // hack to decelrate opacity speed
              } , {
                'selector'    : '.dei-3',
                'translateY'  : '-9%',
                'translateX'  : '2%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.2,
              } , {
                'selector'    : '.dei-4',
                'translateY'  : '-17%',
                'translateX'  : '8%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.5,
              } , {
                'selector'    : '.dei-5',
                'translateY'  : '-2%',
                'translateX'  : '-15%',
                'opacity'     : [1, 0],
                'scale'       : 2,
              } , {
                'selector'    : '.dei-6',
                'translateY'  : '-1%',
                'translateX'  : '-7%',
                'opacity'     : [1, 0], // hack to decelrate opacity speed
                'scale'       : 1.2,
              } , {
                'selector'    : '.dei-7',
                'translateY'  : '-4%',
                'translateX'  : '2%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.1,
              } , {
                'selector'    : '.dei-8',
                'translateY'  : '-3%',
                'translateX'  : '12%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.8,
              } , {
                'selector'    : '.dei-9',
                'translateY'  : '3%',
                'translateX'  : '-12%',
                'opacity'     : [1, 0],
                'scale'       : 1.5,
              } , {
                'selector'    : '.dei-10',
                'translateY'  : '5%',
                'translateX'  : '-4%',
                'opacity'     : [1, 0] // hack to decelrate opacity speed
              } , {
                'selector'    : '.dei-11',
                'translateY'  : '8%',
                'translateX'  : '6%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.4,
              } , {
                'selector'    : '.dei-12',
                'translateY'  : '1%',
                'translateX'  : '20%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.9,
              } , {
                'selector'    : '.dei-13',
                'translateY'  : '8%',
                'translateX'  : '-12%',
                'opacity'     : [1, 0],
                'scale'       : 1.8,
              } , {
                'selector'    : '.dei-14',
                'translateY'  : '4%',
                'translateX'  : '-3%',
                'opacity'     : [1, 0], // hack to decelrate opacity speed
                'scale'       : 1.3,
              } , {
                'selector'    : '.dei-15',
                'translateY'  : '14%',
                'translateX'  : '5%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.7,
              } , {
                'selector'    : '.dei-16',
                'translateY'  : '6%',
                'translateX'  : '9%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 2,
              }
            ]
          },  {
            'wrapper' : '#explosion',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.explosion-byline',
                'translateY'  : ['-25%', '-40%'],
                'opacity'     : [1, 0] // hack to accelrate opacity speed
              }, 
              {
                'selector'    : '#crete_squares',
                'translateY'  : ['-40%'],
                'opacity'     : [1, 0]
              }
            ]
          }, {
            'wrapper' : '#data',
            'duration' : '50%',
            'animations' :  [
               {
                'selector'    : '.data-byline',
                'translateY'  : '-25%',
                'opacity'     : [0, 1.75]
              }, {
                'selector'    : '#crete_data',
                'translateY'  : '-25',
                'opacity'     : [0, 1]
              }
            ]
          },  {
            'wrapper' : '#data',
            'duration' : '50%',
            'animations' :  []
          },  {
            'wrapper' : '#data',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.data-byline',
                'translateY'  : ['-25%', '-40%'],
                'opacity'     : [1, 0] // hack to accelrate opacity speed
              }, 
              {
                'selector'    : '#crete_data',
                'translateY'  : ['-40%'],
                'opacity'     : [1, 0]
              }
           ]
          }, {
            'wrapper' : '#sat_repo',
            'duration' : '50%',
            'animations' :  [
               {
                'selector'    : '.sat-data-byline',
                'translateY'  : ['-25%', '5%'],
                'opacity'     : [0, 1]
              }, {
                'selector'    : '#sat_data',
                'translateY'  : ['-90%', '5%'],
                'opacity'     : [0, 1]
              }
             ]
            }, {
            'wrapper' : '#sat_repo',
            'duration' : '50%',
            'animations' :  []
          }, {
            'wrapper' : '#sat_repo',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.sat-data-byline',
                'translateY'  : ['5%', '-40%'],
                'opacity'     : [1, 0] // hack to accelrate opacity speed
              }, {
                'selector'    : '#sat_data',
                'translateY'  : ['-40%'],
                'opacity'     : [1, 0]
              }
             ]
            }, {
            'wrapper' : '#webgis',
            'duration' : '50%',
            'animations' :  [
               {
                'selector'    : '.maps-byline',
                'opacity'     : [0, 2],
                'scale'       : [.8, 1]
              }, {
                'selector'    : '#maps',
                'opacity'     : [0, 2],
                'scale'       : [.8, 1]
              }
             ]
            }, {
            'wrapper' : '#webgis',
            'duration' : '50%',
            'animations' :  []
          }, {
            'wrapper' : '#webgis',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.maps-byline',
                'translateY'  : ['5%', '-40%'],
                'opacity'     : [1, 0] // hack to accelrate opacity speed
              }, {
                'selector'    : '#maps',
                'translateY'  : ['-40%'],
                'opacity'     : [1, 0]
              }
             ]
            }, {
            'wrapper' : '#web_app1',
            'duration' : '50%',
            'animations' :  [
               {
                'selector'    : '.web_app1_byline',
                'opacity'     : [0, 2],
                'scale'       : [.8, 1]
              }, {
                'selector'    : '#e_urban',
                'translateY'  : ['-90%', '5%'],
                'opacity'     : [0, 1]
              }
             ]
            }, {
            'wrapper' : '#web_app1',
            'duration' : '50%',
            'animations' :  []
          }, {
            'wrapper' : '#web_app1',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.web_app1_byline',
                'translateY'  : ['5%', '-40%'],
                'opacity'     : [1, 0] // hack to accelrate opacity speed
              }, {
                'selector'    : '#e_urban',
                'translateY'  : ['-40%'],
                'opacity'     : [1, 0]
              }
             ]
            }, {
            'wrapper' : '#web_app2',
            'duration' : '50%',
            'animations' :  [
               {
                'selector'    : '.web_app2_byline',
                'opacity'     : [0, 2],
                'scale'       : [.8, 1]
              }, {
                'selector'    : '#in_or_out',
                'translateY'  : ['-90%', '5%'],
                'opacity'     : [0, 1]
              }
             ]
            }, {
            'wrapper' : '#web_app2',
            'duration' : '50%',
            'animations' :  []
          }, {
            'wrapper' : '#web_app2',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.web_app2_byline',
                'translateY'  : ['5%', '-40%'],
                'opacity'     : [1, 0] // hack to accelrate opacity speed
              }, {
                'selector'    : '#in_or_out',
                'translateY'  : ['-40%'],
                'opacity'     : [1, 0]
              }
             ]
            }, {
            'wrapper' : '#images',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.images-byline',
                'translateY'  : '-25%',
                'opacity'     : [0, 1.75] // hack to accelrate opacity speed
              } , {
                'selector'    : '#mediumHomepage',
                'translateY'  : '-90%'
              } , {
                'selector'    : '.iphone',
                'translateY'  : '-66%'
              }
            ]
          } , {
            'wrapper' : '#images',
            'duration' : '50%',
            'animations' :  []
          } , {
            'wrapper' : '#images',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.images-byline',
                'translateY'  : ['-25%', '-25%'],
                'scale'       : .7,
                'opacity'     : [1.75, -.75] // hack to accelrate opacity speed
              }, {
                'selector'    : '#mediumHomepage',
                'translateY'  : ['-90%', '-90%'],
                'scale'       : .8,
                'opacity'     : -.75
              },  {
                'selector'    : '#medium-profile-iphone',
                'scale'       : .9,
                'translateX'  : '20%',
              } ,  {
                'selector'    : '.iphone',
                'translateY'  : ['-66%', '5%'],
                //'translateX'  : ['-2%', '-2%'],
                //'scale'       : [1.3, 1.3]
              } 
              
            ]
          }, /* {
            'wrapper' : '#images',
            'duration' : '150%',
            'animations' :  [
              {
                'selector'    : '.images-byline-2',
                'opacity'     : [1, .5],
                'translateY'  : ['-15%', '50%'],
                'opacity'     : [1, -2]
              } 
              , {
                'selector'    : '#medium-profile-iphone',
                'translateX'  : ['20%', '20%']
              } , {
                'selector'    : '#davegamache-dot-com',
                'scale'       : [1, 1]
              }
              
            ]*/
           {
            'wrapper' : '#links',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '#links',
                'opacity'     : [0, 2],
                'scale'       : [.8, 1]
              }
            ]
          } , {
            'duration' : '50%',
            'animations' :  []
          }
        ]

    /*  Construction
    -------------------------------------------------- */
    init = function() {
      scrollIntervalID = setInterval(updatePage, 10);
      setupValues();
      //$window.resize(throwError)
      //if(isTouchDevice) {
       // $window.resize(throwError)
     // }
    }

    setupValues = function() {
      scrollTop = $window.scrollTop();
      windowHeight = $window.height();
      windowWidth = $window.width();
      convertAllPropsToPx();
      buildPage();
    }

    buildPage = function() {
      var i, j, k;
      for(i=0;i<keyframes.length;i++) { // loop keyframes
          bodyHeight += keyframes[i].duration;
          if($.inArray(keyframes[i].wrapper, wrappers) == -1) {
            wrappers.push(keyframes[i].wrapper);
          }
          for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
            Object.keys(keyframes[i].animations[j]).forEach(function(key) { // loop properties
              value = keyframes[i].animations[j][key];
              if(key !== 'selector' && value instanceof Array === false) {
                var valueSet = [];
                valueSet.push(getDefaultPropertyValue(key), value);
                value = valueSet;
              }
              keyframes[i].animations[j][key] = value;
            });
          }
      }
      $body.height(bodyHeight);
      $window.scroll(0);
      currentWrapper = wrappers[0];
      $(currentWrapper).show();
    }

    convertAllPropsToPx = function() {
      var i, j, k;
      for(i=0;i<keyframes.length;i++) { // loop keyframes
        keyframes[i].duration = convertPercentToPx(keyframes[i].duration, 'y');
        for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
          Object.keys(keyframes[i].animations[j]).forEach(function(key) { // loop properties
            value = keyframes[i].animations[j][key];
            if(key !== 'selector') {
              if(value instanceof Array) { // if its an array
                for(k=0;k<value.length;k++) { // if value in array is %
                  if(typeof value[k] === "string") {
                    if(key === 'translateY') {
                      value[k] = convertPercentToPx(value[k], 'y');
                    } else {
                      value[k] = convertPercentToPx(value[k], 'x');
                    }
                  }
                } 
              } else {
                if(typeof value === "string") { // if single value is a %
                  if(key === 'translateY') {
                    value = convertPercentToPx(value, 'y');
                  } else {
                    value = convertPercentToPx(value, 'x');
                  }
                }
              }
              keyframes[i].animations[j][key] = value;
            }
          });
        }
      }
    }

    getDefaultPropertyValue = function(property) {
      switch (property) {
        case 'translateX':
          return 0;
        case 'translateY':
          return 0;
        case 'scale':
          return 1;
        case 'opacity':
          return 1;
        default:
          return null;
      }
    }

    /*  Animation/Scrolling
    -------------------------------------------------- */
    updatePage = function() {
      window.requestAnimationFrame(function() {
        setScrollTops();
        if(scrollTop > 0 && scrollTop <= (bodyHeight - windowHeight)) {
          animateElements();
          setKeyframe();
        }
      });
    }

    setScrollTops = function() {
      scrollTop = $window.scrollTop();
      relativeScrollTop = scrollTop - prevKeyframesDurations;
    }

    animateElements = function() {
      var animation, translateY, translateX, scale, opacity;
      for(var i=0;i<keyframes[currentKeyframe].animations.length;i++) {
        animation   = keyframes[currentKeyframe].animations[i];
        translateY  = calcPropValue(animation, 'translateY');
        translateX  = calcPropValue(animation, 'translateX');
        scale       = calcPropValue(animation, 'scale');
        opacity     = calcPropValue(animation, 'opacity');

        $(animation.selector).css({
          'transform':    'translate3d(' + translateX +'px, ' + translateY + 'px, 0) scale('+ scale +')',
          'opacity' : opacity
        })
      }
    }

    calcPropValue = function(animation, property) {
      var value = animation[property];
      if(value) {
        value = easeInOutQuad(relativeScrollTop, value[0], (value[1]-value[0]), keyframes[currentKeyframe].duration);
      } else {
        value = getDefaultPropertyValue(property);
      }
      // value = +value.toFixed(2) 
      // TEMPORARILY REMOVED CAUSE SCALE DOESN'T WORK WITHA AGRESSIVE ROUNDING LIKE THIS
      return value;
    }

    easeInOutQuad = function (t, b, c, d) {
      //sinusoadial in and out
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    };

    setKeyframe = function() {
      if(scrollTop > (keyframes[currentKeyframe].duration + prevKeyframesDurations)) {
          prevKeyframesDurations += keyframes[currentKeyframe].duration;
          currentKeyframe++;
          showCurrentWrappers();
      } else if(scrollTop < prevKeyframesDurations) {
          currentKeyframe--;
          prevKeyframesDurations -= keyframes[currentKeyframe].duration;
          showCurrentWrappers();
      }
    }

    showCurrentWrappers = function() {
      var i;
      if(keyframes[currentKeyframe].wrapper != currentWrapper) {
        $(currentWrapper).hide();
        $(keyframes[currentKeyframe].wrapper).show();
        currentWrapper = keyframes[currentKeyframe].wrapper;
      }
    }

    /*  Helpers
    -------------------------------------------------- */

    convertPercentToPx = function(value, axis) {
      if(typeof value === "string" && value.match(/%/g)) {
        if(axis === 'y') value = (parseFloat(value) / 100) * windowHeight;
        if(axis === 'x') value = (parseFloat(value) / 100) * windowWidth;
      }
      return value;
    }

    throwError = function() {
      $body.addClass('page-error')
    }

    isTouchDevice = function() {
      return 'ontouchstart' in window // works on most browsers 
      || 'onmsgesturechange' in window; // works on ie10
    }

    init();

  })
}).call(this);
