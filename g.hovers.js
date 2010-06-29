/**
 * Hover event for the line charts (with vertical line)
 * applies to each of the line series
 *
 * options:
 *  - hover_attr - custom hover attrs
 *  - line_attr  - vertical line attrs
 *  - hover_type - type of widget (from g.raphael: popup, label, drop, blob).
 *    Default - 'popup'
 *    TODO: unify tooltip interface?
 *  - tip_text: function(chart,column,idx), returning custom tip text.
 *    Default - just a value
 *  - stack_cumulative: if true, value series are treated as cumulative (each next should be above previous)
 *    Tips are positioned in a middle of each serie
 *  - leave_timer: ms to wait before fading out tooltips (1000ms default)
 *  - enter_timer: ms to wait before doing movement of a tooltip (500ms default)
 *  - secure_top: prevent popup to overflow top area
 *  - animate_tags: true if tag movements should be animated
 */
Raphael.fn.g.line_hover = function (chart, options)
{
  var r = this
  options = r.g.mergeoptions({ hover_type: 'popup',
                               hover_attr: {opacity: 0.6},
                               line_attr: {},
                               tip_text: function(chart, column, i){ return " " + Math.round(column.values[i]*100)/100 },
                               stack_cumulative: false,
                               leave_timer: 1000,
                               enter_timer: 300,
                               secure_top: 40,
                               animate_tags: true
                             }, options)
  chart.tag = r.set()
  chart.tag.push( r.path(["M", 0, 0, "l", 0, 0]) )
  chart.tag[0].attr(options.line_attr)

  for(var i = 0, ii = chart.valuesy.length; i < ii; i++) {
    chart.tag.push( r.g[options.hover_type](0, 0, " ") )
  }
  chart.tag.attr(options.hover_attr)

  var leave_timer;
  var move_timer;

  chart.hoverColumn(function(){
    var that = this
    clearTimeout(leave_timer);
    clearTimeout(move_timer);

    move_timer = setTimeout(function () {
        // draw vertical line
        chart.tag[0].animate({path: ["M", that.x, that.attr('y'), "l", 0, that.attr('height')]}, 100)
        var prevy = -1
        for (var i = 0, ii = that.y.length; i < ii; i++) {
          var y = that.y[i]
          // cumulative logic
          if (options.stack_cumulative)
          {
            if (i == 0) {
              y += (that.attr('height') - that.y[0])/2
            }else{
              y += (that.y[i-1]-that.y[i])/2
            }
            //if (prevy != -1 && y < prevy-80) y = prevy - 80;
            prevy = y
          }
          if (y-options.secure_top < 0){
            y = options.secure_top;
          }
          
          if (i+1 < chart.tag.length){
            chart.tag[i+1][1].attr({text: options.tip_text(chart, that, i) })
            chart.tag[i+1].update(that.x, y, options.animate_tags);
            chart.tag[i+1].show();
          }
        }
        chart.tag.attr({opacity: 1});
        chart.tag.attr(options.hover_attr);
        chart.tag.insertBefore(that);
        // remove extra tags
        for(var i = that.y.length; i < chart.lines.length; i++){
          chart.tag[i+1].hide()
        }
      }, options.enter_timer);
  }, function () {
    leave_timer = setTimeout(function () {
        chart.tag.animate({opacity: 0}, 500);
      }, options.leave_timer);
  });
};
