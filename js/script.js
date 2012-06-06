/*
 * https://github.com/eightmedia/hammer.js
 * http://ricostacruz.com/jquery.transit/
 */

$(document).ready(function() {
	
	var dice = [];
	
	$('.dice').each(function() {
		dice.push( new Dice($(this), 6) );
	})
	
	$('html').hammer({ prevent_default:true })
	.bind('drag', function(e) {
		
		var maxDistance = 560; // diagonal of 320x460
		
		var distance = e.distance;
		distance = distance > maxDistance ? maxDistance : distance;
		//console.log(e);
		$.each(dice, function(index, die) {
			die.crank( distance / maxDistance, e.angle );
		});
	})
	.bind('dragend tap', function() {
		$.each(dice, function(index, die) {
			die.spin();
		});
	});
	
});

// Disabled scrolling
// http://stackoverflow.com/q/9802366
document.addEventListener('touchmove', function(event) {
    //event.preventDefault();
}, false);

function Dice($target, sides) {
	
	this.$target = $target;
	this.sides = sides;
	this.velocity = 0; // degrees rotation per frame
	this.degrees = 0; // 0-359
	this.primer = 0; // 0.0-1.0
	
	this.crank = function(value, angle) {
		value = value > 1 ? 1 : ( value < 0 ? 0 : value );
		this.primer = value;
		var scale = (1 - value) * .5 + .5;
		//this.$target.css({ scale: scale });
		//console.log(angle);
		var maxDistance = 30;
		var distance = value * maxDistance;
		var x = distance;
		var y = distance;
		//this.$target.css({ x:x, y:y });
	};
	
	this.release = function() {
		if( this.primer == 0 )
			return;
		var _this = this;
		//this.$target.css({ scale: 1 });
		//return;
		this.$target.transition({
			x: 0,
			y: 0,
			complete: function() {
				_this.primer = 0;
			}
		}, 100);
	};
	
	this.spin = function() {
		var maxVelocity = 50;
		/*
		if( this.primer > 0 ) {
			this.velocity = this.primer * maxVelocity;
			//this.release();
		}
		else
			this.velocity = rand(maxVelocity, 5);
		*/
		this.velocity = this.primer > 0 ? this.primer * maxVelocity : rand(maxVelocity, 5);
		this.velocity *= Math.round(Math.random()) == 0 ? -1 : 1;
		//this.release();
		this.update();
	};
	
	this.update = function() {
		
		if( this.velocity <= 1 && this.velocity >= -1 ) {
			this.velocity = 0;
			this.degrees = Math.floor(this.degrees);
			return;
		}

		this.velocity *= 1 - Math.random() / 25; // Deceleration jitter
		this.degrees += this.velocity;
		
		// Find the positive equivalent of a negative degree
		while( this.degrees < 0 )
			this.degrees += 360;
			
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
