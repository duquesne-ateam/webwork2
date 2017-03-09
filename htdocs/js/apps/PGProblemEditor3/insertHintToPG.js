window.onload = function(){
	insertHintToPG('A', 'B', 'C', 'D', 'E');
}

//find index of where to insert the hint
function findIndex(section, textArea, indicator){

	//find index of where section begins
	var sectionIndex = textArea.textContent.indexOf(section);

	var insertIndex = -1;

	if(indicator == 'before'){
		insertIndex = sectionIndex - 1;
	}

	else if(indicator == 'after'){
		insertIndex = sectionIndex + section.length;
	}

	//return where to insert hint
	return insertIndex;
	
}

//method to split up text area and insert hint in between
function splitAndInsert(textArea, beginIndex, endIndex, hintStr){

	var beginText = textArea.textContent.substr(0, beginIndex);
	var endText = textArea.textContent.substr(beginIndex+1, endIndex);

	textArea.textContent = beginText + hintStr + endText;
}

//surrounds hint content with new lines
function surroundWithNewLines(hint){
	return '\n' + hint + '\n';
}

//method to see if problem author is using PGML or Text to create problem
function usingPGML(textArea){
	if(textArea.textContent.indexOf('BEGIN_PGML') != -1){
		return true;
	}
	else{
		return false;
	}
}
	
//main method called when wanting to insert a hint to problem code
function insertHintToPG(hint, textHintA, textHintB, pgmlHintA, pgmlHintB){

	//find main text area where problem text is held
	//webwork uses name instead of id... only 1 of this element
	var problemTextArea = document.getElementsByName('problemContents');
	problemTextArea = problemTextArea[0];
	
	hint = surroundWithNewLines(hint);
	splitAndInsert(problemTextArea, findIndex('TEXT(beginproblem());', problemTextArea, 'after'), problemTextArea.textContent.length, hint);

	//figure out if using PGML or TEXT in problem PG code
	if(usingPGML(problemTextArea)){
		pgmlHintA = surroundWithNewLines(pgmlHintA);
		pgmlHintB = surroundWithNewLines(pgmlHintB);

		splitAndInsert(problemTextArea, findIndex('BEGIN_PGML', problemTextArea, 'after'), problemTextArea.textContent.length, pgmlHintA);
		splitAndInsert(problemTextArea, findIndex('END_PGML', problemTextArea, 'before'), problemTextArea.textContent.length, pgmlHintB);
	}

	else{
		textHintA = surroundWithNewLines(textHintA);
		textHintB = surroundWithNewLines(textHintB);

		splitAndInsert(problemTextArea, findIndex('BEGIN_TEXT', problemTextArea, 'after'), problemTextArea.textContent.length, textHintA);
		splitAndInsert(problemTextArea, findIndex('END_TEXT', problemTextArea, 'before'), problemTextArea.textContent.length, textHintB);
	}

}
