$(document).ready(function() {

	$('body').bind('tapone', roll);
	
	var dice = [];
	
	$('.dice').each(function() {
		dice.push( new Dice($(this), 6) );
	})
	
	function roll() {
		$.each(dice, function(index, value) {
			value.roll();
		});
	}
	
});

// Disabled scrolling
// http://stackoverflow.com/q/9802366
document.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);

function Dice($target, sides) {
	
	this.$target = $target;
	this.isRolling = false;
	this.delay = 0;
	this.sides = sides;
	
	this.roll = function() {
		
		var delay = 0;
		var sideMin = 100;
		var sideMax = 200;
		var rollMax = 1000;
		// Most duration of a throw is sideMax + rollMax
		
		while(delay < rollMax) {
			
			var rd = rand(sideMax, sideMin);
			sideMin += 100;
			sideMax += 100;
			
			var timer = setTimeout(function() {
				// Don't allow repeating random numbers
				var options = range(sides, 1, parseInt($target.text()));
				var rn = options[rand(options.length, 0)];
				$target.text(rn);
				$target.removeClass('s1 s2 s3 s4 s5 s6').addClass('s' + rn);
			}, delay);
			
			delay += rd;
		
		}
	};
	
}

function rand(max, min) {
	return Math.floor(Math.random() * (max-min)) + min;
}

function range(max, min, exclude) {
	var a = [];
	for( var i = min; i <= max; i++ )
		if( i != exclude)
			a.push(i);
	return a;
}
