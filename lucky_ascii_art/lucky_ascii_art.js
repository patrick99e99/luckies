Event.addBehavior({
	'#image_container': function() {
		var imageContainer = this,
			 speed          = 1,
			 max            = 100,
			 size           = 100;

		this.setStyle({fontSize: max, lineHeight: max});
		this.appear();

		setInterval(function() {
			if (size == 2) {
				size = -2;
			}

			size -= .5;

			if (size < -(max)) {
				size = Math.abs(size);
			}

			var the_size = Math.abs(size) + 'px';
			imageContainer.setStyle({fontSize: the_size,
									  	  lineHeight: the_size});				
		}, speed);
	}
});