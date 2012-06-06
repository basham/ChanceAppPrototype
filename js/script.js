/*
 * https://github.com/eightmedia/hammer.js
 * http://ricostacruz.com/jquery.transit/
 */

$(document).ready(function() {

	//$('html').bind('tapone', drop);
	//$('html').bind('swipeone', roll);
	
	var dice = [];
	
	$('.dice').each(function() {
		dice.push( new Dice($(this), 6) );
	})
	
	$('html').hammer({ prevent_default:true })
	.bind('drag', function(e) {
		
		var maxDistance = 560; // diagonal of 320x460
		
		var distance = e.distance;
		distance = distance > maxDistance ? maxDistance : distance;
		
		$.each(dice, function(index, die) {
			die.crank( distance / maxDistance );
		});
	})
	.bind('dragend tap', function() {
		$.each(dice, function(index, die) {
			die.spin();
		});
	});
	
	function roll(a, b) {

		var maxVelocity = 50;
		var maxDuration = 1000;
		var maxDistance = 560; // diagonal of 320x460
		
		var duration = b.duration;
		duration = duration > maxDuration ? maxDuration : duration;
		var distance = b.delta[0].moved;
		distance = distance > maxDistance ? maxDistance : distance;

		var velocity = maxVelocity * ( .5 * ( 1 - duration / maxDuration ) + .5 * distance / maxDistance );
		console.log(duration + ' ' + distance + ' ' + velocity);
		
		$.each(dice, function(index, value) {
			value.spin();
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
	this.sides = sides;
	this.velocity = 0; // degrees rotation per frame
	this.degrees = 0; // 0-359
	this.primer = 0; // 0.0-1.0
	
	this.crank = function(value) {
		value = value > 1 ? 1 : ( value < 0 ? 0 : value );
		this.primer = value;
		var scale = (1 - value) * .5 + .5;
		this.$target.css({ scale: scale });
	};
	
	this.release = function() {
		if( this.primer == 0 )
			return;
		var _this = this;
		//this.$target.css({ scale: 1 });
		//return;
		this.$target.transition({
			scale: 1,
			opacity: 1,
			complete: function() {
				_this.primer = 0;
			}
		}, 100);
	};
	
	this.spin = function() {
		var maxVelocity = 50;
		this.velocity = this.primer > 0 ? this.primer * maxVelocity : rand(maxVelocity, 5);
		this.release();
		this.update();
	};
	
	this.update = function() {
		
		if( this.velocity <= 1 ) {
			this.velocity = 0;
			this.degrees = Math.floor(this.degrees);
			return;
		}
		/*
		var s = this.$target.css('scale');
		if( s < 1 ) {
			s *= 1.1;
			s = s > 1 ? 1 : s;
			this.$target.css({ scale: s });
		}
		*/
		this.velocity *= 1 - Math.random() / 25; // Deceleration jitter
		this.degrees += this.velocity;
		this.degrees %= 360;
		
		var v = this.value();
		this.$target.text(v).removeClass('s1 s2 s3 s4 s5 s6').addClass('s' + v);
		
		var target = this;
		var timer = setTimeout(function() {
			target.update();
		}, $.fx.interval);
		
	};
	
	this.value = function() {
		return Math.floor( (this.degrees % 360) / (360/this.sides) ) + 1;
	};
	
	this.rolling = function() {
		return velocity != 0;
	};

}

function rand(max, min) {
	return Math.floor(Math.random() * (max-min)) + min;
}
