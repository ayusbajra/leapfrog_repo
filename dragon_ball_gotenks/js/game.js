;(function() {
	'use strict';
	var stopGame = false;
	
	function Background() {
		var that = this;
		
		this.element  = document.createElement('div');
		this.element.style.width = '50000px';
		this.element.style.height = '400px';
		this.element.style.background = 'url(images/back-img-dragonball.png) repeat-x';
		
		var marginLeft = 0;
		
		var move = function() {
			marginLeft -= 7;
		};
		
		var render = function() {
			that.element.style.marginLeft = marginLeft + 'px';
		};
		
		this.updateFrame = function() {
			move();
			render();
		};
	};
	
	function Hero() {
		var that = this;
		
		this.element  = document.createElement('div');
		this.element.style.background = 'url(images/gotenks.png)';
		this.element.style.backgroundPosition = '0px 0px';
		this.element.style.position = 'absolute';
		
		this.x = 100;
		this.y = 10;
		
		this.height = 70;
		this.width = 44;

		window.onkeyup = function(event){
			if(event.which === 38){
				that.y -= 20;
				if(that.y<25)
					that.y=25;
			}

		};
		window.onkeydown = function(event){
			if(event.which === 40){
				that.y += 20;
				if(that.y>400-that.height)
					that.y=400-that.height;
			}
		};
		this.updateFrame = function() {
			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
			
			that.element.style.width = that.width + 'px';
			that.element.style.height = that.height + 'px';
		};

		var currentSpriteNoX = 0;
		var animateSprite = function() {
			var currentX = 44 * currentSpriteNoX;
			that.element.style.backgroundPositionX = currentX +'px';
			if(currentSpriteNoX == 6) {
				currentSpriteNoX = 0;
			}
			else {
				currentSpriteNoX += 1;
			}
		};
		this.animation = setInterval(animateSprite,120);

	};
	
	function Gunda() {
		var that = this;
		
		this.element  = document.createElement('div');
		//this.element.style.border = '1px solid red';
		this.element.style.background = 'url(images/bomb.png)';
		this.element.style.position = 'absolute';
		
		this.height = 60;
		this.width = 180;

		var getRandom = function() {
			return (
				Math.floor(Math.random()*(400-that.height))
			)
		};

		this.x = 750; // position of gunda
		this.y = getRandom();
		
		this.move = function() {
			// move left continuously
			that.x -= 10;
		};
		
		this.updateFrame = function() {
			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
			
			that.element.style.width = that.width + 'px';
			that.element.style.height = that.height + 'px';
			that.move();
		};
	};
	
	function LineRunner(gameDiv_) {
		var gameDiv = gameDiv_;
		var interval = 30;
		var background = new Background();
		var hero = new Hero();
		var gundas = [];
		var gameProps = {
			width: 800,//width and height of the game area
			height: 400
		};

		var gameTitle = document.createElement('p');
		gameTitle.innerHTML = "TRUNKS";
		gameTitle.style.position='absolute';
		gameTitle.style.left='330px';
		gameTitle.style.font='bold 35px arial';
		gameTitle.style.color='yellow';
		gameDiv.appendChild(gameTitle);

		var gameSetup = function() {
			gameDiv.style.margin = '0 auto';
			gameDiv.style.position = 'relative';
			gameDiv.style.width = gameProps.width + 'px';
			gameDiv.style.height = gameProps.height + 'px';
			gameDiv.style.border = '1px solid black';
			gameDiv.style.overflow = 'hidden';
			
			//position of hero in the beginning
			hero.y = gameProps.height - hero.height; 
			hero.x = 50;
			
			gameDiv.appendChild(background.element);
			gameDiv.appendChild(hero.element);
		};
		
		var createGunda = function() {
			console.log("creating a gunda");
			var enemy = new Gunda();
			gameDiv.appendChild(enemy.element);
			gundas.push(enemy);
		};
		
		var loopCounter = 0;
		
		var gameLoop = function() {
			if (stopGame!=true){
					loopCounter++;
					
					background.updateFrame();
					hero.updateFrame();
					
					if (loopCounter % 50 === 0) {
						createGunda();	
					}
					
					for (var i=0; i<gundas.length; i++) {
						var gunda = gundas[i];
						gunda.updateFrame();
					}
					collisionDetection();
			}
		};
		
		var collisionDetection = function() {
			// check collision of HERO with ALL ENEMIES
			for (var i=0; i<gundas.length; i++) {
					if ( (gundas[i].x < hero.x + hero.width) &&
						(gundas[i].x + gundas[i].width > hero.x) &&
						(gundas[i].y < hero.y + hero.height) &&
						(gundas[i].y + gundas[i].height > hero.y) ){
								gameOver(i);
					}
			}
		};

		function gameOver(i) {
			stopGame=true;
			clearInterval(hero.animation);
			alert("GAME OVER. Your score is "+100*i);
		};
		gameSetup();
		setInterval(gameLoop, interval);
	};
	
	window.LineRunner = LineRunner;
})();