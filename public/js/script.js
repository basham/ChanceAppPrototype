$(document).ready(function() {

	$('html').bind('tapone', roll);
	
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
	this.sides = sides;
	this.velocity = 0; // degrees rotation per frame
	this.degrees = 0;
	
	this.roll = function() {
	
		this.velocity = rand(20, 10);	
		this.update();
		
	};
	
	this.update = function() {
		
		if( this.velocity == 0 )
			return;
		
		this.velocity *= .99;
		this.velocity = this.velocity < 1 ? 0 : this.velocity;
		
		this.degrees += this.velocity;
		this.degrees = Math.floor(this.degrees);
		this.degrees %= 360;

		console.log(this.velocity);
		
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
