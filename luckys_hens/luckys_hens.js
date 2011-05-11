(function() { 
	Event.addBehavior({
		'#new_hen:click': function() {
			Dinner.new_hen();
		},

		'#feed_lucky:click': function() {
			Dinner.feed_lucky();
		}
	});

	var Dinner = {
		feed_lucky: function() {
			if (!$('hen').visible()) {
				alert('you must get more hens before you can feed her!');
				return false;
			}
			var trans = Effect.Transitions.linear;
			var dur = 3;
			new Effect.Morph('swipe', {style: {'width': '0px'}, duration: dur, transition: trans, afterFinish:
				function() {
					$('hen').hide();
				}
			});
		},

		new_hen: function() {
			if ($('hen').visible()) {
				alert('you already have four hens ready for lucky to eat! Feed her!!');
				return false;
			}

			var dur = 1;
					$('hen').show();
			new Effect.Morph('swipe', {style: {'width': '650px'}, duration: dur, transition: Effect.Transitions.spring});
		}
	};
})();