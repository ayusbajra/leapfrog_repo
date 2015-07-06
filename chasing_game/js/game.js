;(function() {
'use strict';
	var guy = document.getElementById('guy');
	var container = document.getElementById('container');

	var ghostLeft = 0;
	var ghostTop = 0;
	var left=580;
	var top=380;

	function Animate() {
		/****************Horizontal Chase****************/
		if(ghostLeft<left){
			ghostLeft+=10;
			ghost.style.left = ghostLeft + 'px';
		}else if(ghostLeft>left){
			ghostLeft-=10;
			ghost.style.left = ghostLeft + 'px';
		}else {
			ghostLeft=ghostLeft;
			ghost.style.left = ghostLeft + 'px';
		}

		/*******************Vertical Chase*******************/
		if (ghostTop<top) {
			ghostTop+=10;
			ghost.style.top = ghostTop + 'px';
		}else if(ghostTop>top) {
			ghostTop-=10;
			ghost.style.top = ghostTop + 'px';
		}else {
			ghostTop=ghostTop;
			ghost.style.top = ghostTop + 'px';
		}
		
		/****************Collision Detection****************/

		if ((ghostLeft<left+20) && (ghostLeft+20>left) && (ghostTop<top+20) && (ghostTop+20>top)) {
				clearInterval(inter);
				alert ("You Lose.");
		}

		/**************** Movement of Guy ****************/

		window.onkeydown = function(event){
			if(event.which==65) { /*Left Button*/
				left -= 10;
				if (left<0){
					left = 0;
				}
				guy.style.left = left + 'px';
			}
			if(event.which==68) { /*Right Button*/
				left += 10;
				if (left>=580){
					left = 580;
				}
				guy.style.left = left+'px';
			}
			if(event.which==87) { /*Up Button*/
				top -= 10;
				if (top<0) {
					top = 0;
				}
				guy.style.top = top + 'px';
			}
			if(event.which==83) { /*Down Button*/
				top += 10;
				if (top>380) {
					top = 380;
				}
				guy.style.top = top + 'px';
			}
		};


	};
	var inter = setInterval(Animate, 80);

})();