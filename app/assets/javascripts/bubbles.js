var numbubbles = 10;
var oldbubbles = new Array();
var newbubbles = new Array();
 
function bubblesInc(str)
{
	if(oldbubbles[str] == undefined)
	{
		bubblesInit(str);
	}
	newbubbles[str]++;
	bubblesPrint(str);
}

function bubblesInit(str)
{
	oldbubbles[str] = new Array();
	for (var i = 0; i < bubblesMaxLength(); i++) 
	{
		oldbubbles[str][i] = 0;
	}			
	newbubbles[str] = 0;
}

function bubblesShift()
{
	var keys = Object.keys(newbubbles);
	var bubbleStr = "";
	for (var j = 0; j < keys.length; j++) 
	{
		var bub = "";
		var str = keys[j];
		if(oldbubbles[str].length >= numbubbles)
			oldbubbles[str].shift();
		oldbubbles[str].push(newbubbles[str]);
		newbubbles[str] = 0;
	}
}

function bubblesMaxValue()
{
	var keys = Object.keys(newbubbles);
	var currentMax = 0;

	// fore each set of bubbles
        for (var j = 0; j < keys.length; j++)
        {
		var str = keys[j];
		// Go through each bubble
		for (var i = 0; i < oldbubbles[str].length; i++)
		{
			if(oldbubbles[str][i] > currentMax) currentMax = oldbubbles[str][i];
		}
	}
	return currentMax;
}

function bubblesMaxLength()
{
	var keys = Object.keys(newbubbles);
	var currentMax = 0;

	// fore each set of bubbles
        for (var j = 0; j < keys.length; j++)
        {
		var str = keys[j];
		// Go through each bubble
		if(oldbubbles[str].length > currentMax) currentMax = oldbubbles[str].length;
	}
	return currentMax;
}


