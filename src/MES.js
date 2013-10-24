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

	MES.Game = {};

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
						var item = MES.Game.pd[key][$(this)[0].id];
						MES.showRate(item.cost/item.rps);
					};
				})(), function (e) { S("#rateModal").hide(); });
		}
	};

	MES.Exploit = function () {
		eval(Game.toString().replace("var pd", "var pd = this.pd").replace("Game", "MESGame"));
		MES.Game = new MESGame();
		gm.do_save();
		MES.Game.do_load();

		for(var key in gm){
			var func = gm[key];
			if(typeof(func) !== 'function') continue;

			gm[key] = (function(){
				var old = func;
				var funcName = key;
				return function (){
					debugger;
					MES.Game[funcName](arguments);
					old(arguments);
				};
			})()
		}
	};

	MES.init = function () {
		MES.Exploit();
		MES.initRate("clickers", "sellers");
	};

	MES.init();
})($);