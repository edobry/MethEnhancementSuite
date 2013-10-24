;(function ($) {
	window.MES = window.MES || {};
	MES.Util = MES.Util || {};
	var S = MES.Util.S = (function () {
	    var cache = {};
	    var select = function (selector, fresh) {
	    	if(cache.hasOwnProperty(selector) && !fresh)
	    		return cache[selector];
	    	else {
	    		var jObject = $(selector);
	    		return jObject.length > 0 ? (cache[selector] = jObject) : [];
	    	}
	    };
	    select.clear = function () { cache = {}; };
	    return select;
	})();

	MES.showRate = function(rate) {
		var modal = S("#rateModal");
		if(modal.length == 0) 
			modal = $("<div>").attr("id", "rateModal").css({
				"height": 18,
				"padding": 5,
				"display": "none",
				"border": "1px solid black",
				"border-radius": 5,
				"background-color": "white",
				"position": "fixed",
				"top": 28,
				"right": 21
			}).appendTo(S(".tabs"));

		modal.text("Rate: " + pretty_int(rate)).show();
	};

	MES.initRate = function () {
		for(var i in arguments){
			var tab = arguments[i];
			var div = S("#" + tab);
			if(div.length > 0)
				div.find(".s_div").hover((function (){
					var key = tab;
					return function (e){
						var item = gm.pd[key][$(this)[0].id];
						MES.showRate(item.cost/item.rps);
					};
				})(), function (e) { S("#rateModal").hide(); });
		}
	};

	MES.Exploit = function () {
		gm.do_save();
		eval(Game.toString().replace("var pd", "var pd = this.pd"));
		window.gm = new Game();

		[tmr, sec_tmr, save_tmr, event_tmr, ver_tmr].forEach(clearInterval);
	    tmr = setInterval("gm.tick()", tick_ms);
	    sec_tmr = setInterval("gm.sec_tick()", 1000);
	    save_tmr = setInterval("gm.do_save()", 30000);
	    event_tmr = setInterval("gm.check_events()", 120000);
	    ver_tmr = setInterval("gm.check_version()", 620000);
	    gm.do_load();
	    message('Welcome to '+gm.get_title()+', bitch.');

	    $('#make_btn').off().click(function(e) { 
	        gm.do_make_click();
	        var elc = $('.make_up:first').clone()
	        elc.html('+'+pretty_int(gm.get_click_make_amount()));
	        $('#make_div').append(elc);
	        elc.show();
	        elc.offset({left:e.pageX-30, top:e.pageY-50});
	        var end_y = e.pageY-150;
	        elc.css('opacity',100);
	        if(last_float == 1) { 
	            var this_float = e.pageX;
	            last_float = 0;
	        } else { 
	            var this_float = e.pageX - 60;
	            last_float = 1; 
	        }
	        elc.animate({'top':end_y.toString()+'px', 'opacity':0, 'left':this_float.toString()+'px'}, 750, function() { 
	            $(this).remove();
	        });
	    });
	    $('#sell_btn').off().click(function(e) { 
	        var sale = gm.do_sell_click();
	        if(sale == 0) { 
	            return;
	        }
	        var elc = $('.sell_up:first').clone()
	        elc.html('$'+pretty_int(sale*gm.get_widget_roi()));
	        $('#sell_div').append(elc);
	        elc.show();
	        elc.offset({left:e.pageX-30, top:e.pageY-50});
	        var end_y = e.pageY-150;
	        elc.css('opacity',100);
	        if(last_float == 1) { 
	            var this_float = e.pageX;
	            last_float = 0;
	        } else { 
	            var this_float = e.pageX - 60;
	            last_float = 1; 
	        }
	        elc.animate({'top':end_y.toString()+'px', 'opacity':0, 'left':this_float.toString()+'px'}, 750, function() { 
	            $(this).remove();
	        });
	    });
	    $('#sell_btn').off().click(function(e) { 
	        var sale = gm.do_sell_click();
	        if(sale == 0) { 
	            return;
	        }
	        var elc = $('.sell_up:first').clone()
	        elc.html('$'+pretty_int(sale*gm.get_widget_roi()));
	        $('#sell_div').append(elc);
	        elc.show();
	        elc.offset({left:e.pageX-30, top:e.pageY-50});
	        var end_y = e.pageY-150;
	        elc.css('opacity',100);
	        if(last_float == 1) { 
	            var this_float = e.pageX;
	            last_float = 0;
	        } else { 
	            var this_float = e.pageX - 60;
	            last_float = 1; 
	        }
	        elc.animate({'top':end_y.toString()+'px', 'opacity':0, 'left':this_float.toString()+'px'}, 
	            750, 
	            function() { 
	                $(this).remove();
	            }
	        );
    	});
	};

	MES.init = function () {
		MES.Exploit();
		MES.initRate("clickers", "sellers");
	};

	MES.init();
})($);