var c=0,step=0;
var t;
var game, startBtn, resetBtn;


function timedCount() 
{ 
	document.getElementById('time').value=c;
	c=c+1;
	t=setTimeout("timedCount()",1000);
}
function resetCount() 
{
	c=0;
	clearTimeout(t);
	document.getElementById('time').value=c;
}
function stopCount()
{
	clearTimeout(t);
	document.getElementById('time').value=c;
}
function stepCount()
{
	step++;
	document.getElementById('step').value=step;
}
function resetStep()
{
	step = 0;
	document.getElementById('step').value=step;
}


function gamepuzzle(container)
{
	this.container = container;
	this.tiles = new Array(16);
}

var j;

gamepuzzle.prototype = {
		init: function(){
			var i, len, tile;
			for(i = 0, len = this.tiles.length; i < len; i++){
				tile = this.newTile((i*7)%16);
				tile.setAttribute('index', i);
				this.container.appendChild(tile);
				this.tiles[i] = tile;
			}
		},
		newTile: function(val){
			var tile = document.createElement('div');
			this.setTileVal(tile, val);
			return tile;
		},
		setTileVal: function(tile, val){
			tile.className = 'tile tile' + val;
			tile.setAttribute('val', val);
		},
		move:function(direction){//move
			switch(direction){
			case 1://down
				if(j >= 4){
					this.change(this.tiles[j - 4], this.tiles[j]);
					j -= 4;
				}
				break;
			case 0://up
				if(j <= 11){
					this.change(this.tiles[j + 4], this.tiles[j]);
					j += 4;
				}
				break;
			case 3://right
				if(j % 4 !== 0){
					this.change(this.tiles[j - 1], this.tiles[j]);
					j -= 1;
				}
				break;
			case 2://left
				if(j % 4 !== 3){
					this.change(this.tiles[j + 1], this.tiles[j]);
					j += 1;
				}
				break;
			}
			this.end();

		},
		change: function(prevTile, currTile){
			var prevVal = prevTile.getAttribute('val'),
			currVal = currTile.getAttribute('val');
			this.setTileVal(prevTile, currVal);
			this.setTileVal(currTile, prevVal);
		},
		end: function(){
			var i,len;
			for(i = 0, len = this.tiles.length; i < len; i++){
				if(this.tiles[i].getAttribute('val') == i)
					continue;
				else break;
			}
			if(i == len)
			{
				stopCount();
				alert('Congratulation!Press OK to select picture again.');
				window.location = "changepic.html";
			}
		},
		clean: function(){
			var i, len;
			for(i = 0, len = this.tiles.length; i < len; i++){
				this.container.removeChild(this.tiles[i]);
			}
			this.tiles = new Array(16);
		}

}


window.onload = function () {
	document.getElementById('time').value = c;
	document.getElementById('step').value = step;
	container = document.getElementById('divpuzzle');
	resetBtn = document.getElementById('reset');
		timedCount();
		game = game || new gamepuzzle(container);
		game.init();
		j = 9;
	resetBtn.onclick = function(){
		resetCount();
		game.clean();
		resetStep();
		timedCount();
		game = game || new gamepuzzle(container);
		game.init();
		j = 9;
	}
	
}
var x, y;
function deriction(x,y){
	var num;
	if (Math.abs(x) < Math.abs(y) && y < 0){//up
		num = 0;
	}
	else if (Math.abs(x) < Math.abs(y) && y > 0) {//down
		num = 1;
	} 
	else if (Math.abs(x) > Math.abs(y) && x < 0){//left
		num = 2;
	}
	else if (Math.abs(x) > Math.abs(y) && x > 0){//right
		num = 3;
	}
	game.move(num);
	stepCount();
}

window.addEventListener('tizenhwkey', function onTizenHwKey(e) {
    if (e.keyName === 'back') {
        try {
            tizen.application.getCurrentApplication().exit();
        } catch (err) {
            console.log('Error: ', err);
        }
    }
});

