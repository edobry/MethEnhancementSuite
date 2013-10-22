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
						var item = pdro[key][$(this)[0].id];
						MES.showRate(item.cost/item.rps);
					};
				})(), function (e) { S("#rateModal").hide(); });
		}
	};

	MES.init = function () {
		MES.initRate("clickers", "sellers");
	};

	MES.init();
})($);