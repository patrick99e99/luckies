(function() {
	document.observe("dom:loaded", function() {

		var luckies = $$('.lucky');
		var octopi = $$('.octopus');

		addOptions({'luckies': luckies.length, 'octopi': octopi.length});
		showDefaultLuckies(luckies);
		
		var animations = {};
		var mouse_coords = {};

		Event.observe(document, 'mousemove', function(e) { getcords(e, mouse_coords); });
		$('luckies').observe('change', function(e) {
				showOrHide(this.getValue(), luckies);
		});
		$('octopi').observe('change', function(e) {
				showOrHide(this.getValue(), octopi);
		});
		$('change_pics').observe('click', function(e) {
			luckies.each(function(lucky) {
				lucky.removeClassName($A(lucky.classNames()).last());
				assignLuckyPhoto(lucky);
			});
		});

		prepAnimate([luckies, octopi], mouse_coords, animations);
	});
	
	function showDefaultLuckies(luckies) {
		var lucky_count = luckies.length,
			 half			 = Math.floor(lucky_count / 2);
			
		$('luckies').setValue(half);
		showOrHide(half, luckies);	
	}

	function addOptions(obj){
		Object.keys(obj).each(function(k) {
			for (var i=1; i <= obj[k]; i++) {
				var option = new Element('option', {'value': i}).update(i);
				$(k).insert({'bottom': option});
			}
		});
	}

	function showOrHide(limit, obj) {
		var count = 1;
		obj.each(function(item) {
			if (count > limit) {
				item.hide();
			}
			else if (!item.visible()) {
				item.show();
			}
		count++;
		});
	}

	function prepAnimate(collection, mouse_coords, animations) {
		var pi = Math.PI;

		collection.each(function(obj) {
			obj.each(function(item) {
				var i = 0;
				var deg = randomize(360);
				var radius = randomize(500);
				var dir = randomize(2) == 0 ? -1 : 1;
				var time = randomize(100);

				if (item.classNames().include('lucky')) {
					assignLuckyPhoto(item);
				}
		
				animations[item.identify()] = setInterval(function() {
					i = animateImage(item, i, deg, radius, dir, pi, mouse_coords);
				}, time);
			});
		});
	}

	function assignLuckyPhoto(item) {
		var img_num = randomize(12) + 1;
		item.addClassName('p' + img_num);
	}

	function randomize(max) {
		return Math.floor(Math.random() * max);
	}

	function getcords(e, mouse_coords){
		mouse_coords.x = Event.pointerX(e);
		mouse_coords.y = Event.pointerY(e);
	}

	function animateImage(image, i, deg, radius, dir, pi, mouse_coords) {
		var m_x = mouse_coords.x;
		var m_y = mouse_coords.y;

		var pos = i + deg;
		var x = m_x + (Math.cos(pos * pi / 180) * radius) + 'px';
		var y = m_y + (Math.sin(pos * pi / 180) * radius) + 'px';

		image.setStyle({'top': y, 'left': x});

		if (i > 360) {
			i = 0;
		}
		
		return i + dir;
	}
})();