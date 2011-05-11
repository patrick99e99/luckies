Element.addMethods({
	
	glow: function(el, options) {
		var speed = options.speed ? options.speed : 25;
		var amount = options.amount ? options.amount : 1;
		var start = new RGBColor(options.start);
		var end = new RGBColor(options.end);
		var color = Object.clone(start);
		var dest_color = Object.clone(end);
		
		// glow params to_glow can be either string or array of css styles
		var to_glow = (typeof(options.css) == 'string') ? [options.css] : options.css;

		// if only one glow is allowed per element, kill existing glow.
		if (options.limit) { 
			el.stopGlow();
		}
		
		if (!el.glow_data) {
			// store the original style values before changing them...
			el.glow_data = {'original_styles': {}, 'intervals': []};
		
			to_glow.each(function(e) {
				el.glow_data.original_styles[e] = el.getStyle(e);
			});
		}
		
		var interval = setInterval(function() {

			['r', 'g', 'b'].each(function(c) {
				
					if (color[c] < dest_color[c]) {
						color[c] = ((color[c] + amount) > dest_color[c]) ? dest_color[c] : color[c] + amount;
					}
					else if (color[c] > dest_color[c]) {
						color[c] = ((color[c] - amount) < dest_color[c]) ? dest_color[c] : color[c] - amount;
					}
				
			});
			
			if (color.toRGB() == dest_color.toRGB()) {
				if (options.loop) {
					dest_color = (dest_color.toRGB() == end.toRGB()) ? Object.clone(start) : Object.clone(end); 
				}
				else {
					el.stopGlow();
				}
			}
			else {

				var style = {};

				// set the style attribute(s) to the new color
				to_glow.each(function(e) {
					style[e] = color.toRGB();
				});
				
				el.setStyle(style);
			}

		}, speed);
		
		el.glow_data.intervals.push(interval);
	},
	
	stopGlow: function(el) {
		if (el.glow_data) {
			var intervals = el.glow_data.intervals;
			if (intervals.length > 0) {
				intervals.each(function(i) {
					clearInterval(i);
				});
			}

			var styles = {};
			var original_styles = el.glow_data.original_styles;
			// restore original style values
			Object.keys(original_styles).each(function(css) {
				style[css] = original_styles[css];
			});

			// remove glow data
			el.glow_data = undefined;
			el.setStyle(style);
		}
	}
	
});


Event.addBehavior({
	'#box': function() {	
		$('box').glow({start: '#0036ff', 
							end: '#9f52ff', 
							loop: true, 
							speed: 50,
							amount: 1,
							css: 'backgroundColor'});

		$('lucky').glow({start: '#0036ff', 
							end: '#9f52ff', 
							loop: true, 
							speed: 52,
							amount: 1,
							css: 'borderColor'});

		$('box').glow({start: '#4800ff', 
							end: '#755196', 
							loop: true, 
							speed: 50,
							amount: 5,
							css: 'borderLeftColor'});

		$('box').glow({start: '#721fa2', 
							end: '#836bae', 
							loop: true, 
							speed: 50,
							amount: 5,
							css: 'borderRightColor'});

		$('box').glow({start: '#a200ff', 
							end: '#200050', 
							loop: true, 
							speed: 50,
							amount: 5,
							css: 'borderTopColor'});

		$('box').glow({start: '#6366e7', 
							end: '#7200ff', 
							loop: true, 
							speed: 50,
							amount: 5,
							css: 'borderBottomColor'});

		$('header').glow({start: '#f00', 
							end: '#00f', 
							loop: true, 
							amount: 1,
							css: 'color'});

		var w_h = document.viewport.getHeight();
		var w_w = document.viewport.getWidth();
		var container = $('container');
		var c_h = container.getHeight() + 10;
		var c_w = container.getWidth() + 10;
		var x_amount = 1;
		var y_amount = 1;

		setInterval(function() {
			var y_pos = parseInt(container.getStyle('top'), 10);
			var x_pos = parseInt(container.getStyle('left'), 10);

			if ((y_amount > 0 && y_pos > (w_h - c_h)) || (y_amount < 0 && y_pos < 1)) {
				y_amount *= -1;
			}

			if ((x_amount > 0 && x_pos > (w_w - c_w)) || (x_amount < 0 && x_pos < 1)) {
				x_amount *= -1;
			}
		
			var style = {'top': (y_pos + y_amount) + 'px',
							 'left': (x_pos + x_amount) + 'px'};

			$('container').setStyle(style);

		}, 5);
	}

});