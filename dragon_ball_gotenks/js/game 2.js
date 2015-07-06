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
		this.velocityY = 0;

		this.height = 111;
		this.width = 70;

		this.updateFrame = function() {
			if(that.velocityY > 0) {
				that.y -= that.velocityY;
			}

			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';

			that.element.style.width = that.width + 'px';
			that.element.style.height = that.height + 'px';
		};

		var currentSpriteNoX = 0;
		
		var animateSprite = function() {
			var currentX = 70* currentSpriteNoX;
			that.element.style.backgroundPositionX = currentX +'px';
			if(currentSpriteNoX == 6) {
				currentSpriteNoX = 0;
			}
			else {
				currentSpriteNoX += 1;
			}
		};
		this.animation = setInterval(animateSprite,100);
	};

	function Gunda() {
		var that = this;

		this.element  = document.createElement('div');
		this.element.style.background = 'url(images/bomb.png)';
		this.element.style.position = "absolute";

		this.height = 46;
		this.width = 39;
		
		this.getRandom = function(){
			var rand =  Math.floor(Math.random()*2 + 1);
			var lowBlock =320;
			var highBLock = 200;
			if (rand === 1)
			{
				return lowBlock;
			}
			else if (rand === 2)
			{
				return highBLock;
			}
		};

		this.x = 750;
		this.y = that.getRandom();

		this.move = function() {
			that.x-=10;
			// move left continuously
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
		var isGameOver=false;
		var gameProps = {
			width: 800,
			height: 400
		};

		var gameTitle = document.createElement('p');
		gameTitle.innerHTML = "GOTENKS";
		gameTitle.style.position='absolute';
		gameTitle.style.left='300px';
		gameTitle.style.fontSize='50px';
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

			window.onkeydown = function(event){
				if(event.which===38){
					jump();
				}
				/***if(event.which===40){
					changeHeight();
				}
				else{
					restoreHeight();
				}***/
			};

			/**window.onkeyup = function(event){
					if(event.which===18){
					restoreHeight();
				}
			};**/


		};
			/*function changeHeight(){
				hero.height=100;
			}
			function restoreHeight(){
				hero.height=70;
				hero.width=44;
			}*/
			function jump() {
				hero.velocityY = 33;

			}

			function gravity() {
				hero.y += 11;
				if(hero.velocityY)
					hero.velocityY -= 2;
				if (hero.y+hero.height > gameProps.height) {
					hero.y = gameProps.height - hero.height;
				}
				hero.element.style.top = hero.y + "px";
			};

		var createGunda = function() {
			var gunda = new Gunda();
			gameDiv.appendChild(gunda.element);
			gundas.push(gunda);
			console.log("creating a gunda");

		};

		var keepInFrame = function() {
			if(hero.y < 0) {
				hero.y = 0;
			}
		};

		var loopCounter = 0;

		var gameLoop = function() {

			if (stopGame !=true) {
					loopCounter++;

					background.updateFrame();
					hero.updateFrame();

					if (loopCounter % 50=== 0) {
						createGunda();
					}

					for (var i=0; i<gundas.length; i++) {
						var gunda = gundas[i];
						gunda.updateFrame();
					}

					keepInFrame();
					gravity();
					collisionDetection();
			}
		};

		var random = function(){
			var rand = Math.floor(Math.random()*200);
			return rand;
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
		}
		gameSetup();
		setInterval(gameLoop, interval);
	};

	window.LineRunner = LineRunner;
})();
