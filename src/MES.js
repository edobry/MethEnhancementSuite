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

	MES.pd = {};

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
						var item = MES.pd[key][$(this)[0].id];
						MES.showRate(item.cost/item.rps);
					};
				})(), function (e) { S("#rateModal").hide(); });
		}
	};

	MES.pdExploit = function () {
		eval(Game.toString().replace("var pd", "this.pd").replace("Game", "MESGame"));
		MES.pd = new MESGame().pd;
	};

	MES.init = function () {
		MES.pdExploit();
		MES.initRate("clickers", "sellers");
	};

	MES.init();
})($);