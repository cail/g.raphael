Raphael.fn.g.line_hover=function(e,a){var g=this;a=g.g.mergeoptions({hover_type:"popup",hover_attr:{opacity:0.6},line_attr:{},tip_text:function(k,j,h){return" "+Math.round(j.values[h]*100)/100},stack_cumulative:false,leave_timer:1000,enter_timer:300,animate_tags:true},a);e.tag=g.set();e.tag.push(g.path(["M",0,0,"l",0,0]));e.tag[0].attr(a.line_attr);for(var b=0,d=e.valuesy.length;b<d;b++){e.tag.push(g.g[a.hover_type](0,0," "))}e.tag.attr(a.hover_attr);var c;var f;e.hoverColumn(function(){var h=this;clearTimeout(c);clearTimeout(f);f=setTimeout(function(){e.tag[0].animate({path:["M",h.x,h.attr("y"),"l",0,h.attr("height")]},100);var l=-1;for(var j=0,k=h.y.length;j<k;j++){var m=h.y[j];if(a.stack_cumulative){if(j==0){m+=(h.attr("height")-h.y[0])/2}else{m+=(h.y[j-1]-h.y[j])/2}l=m}if(j+1<e.tag.length){e.tag[j+1][1].attr({text:a.tip_text(e,h,j)});e.tag[j+1].update(h.x,m,a.animate_tags);e.tag[j+1].show()}}e.tag.attr({opacity:1});e.tag.attr(a.hover_attr);e.tag.insertBefore(h);for(var j=h.y.length;j<e.lines.length;j++){e.tag[j+1].hide()}},a.enter_timer)},function(){c=setTimeout(function(){e.tag.animate({opacity:0},500)},a.leave_timer)})};