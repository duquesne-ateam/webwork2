function translateToPG(rawInput, urlDataArr, imgDataArr){

//pgToSaveA gets placed after: TEXT(beginproblem());

//pgToSaveB gets placed after: BEGIN_TEXT

//pgToSaveC gets placed before: END_TEXT

//

//Please note that WeBWorK pg problems may be using PGML, in which case...

//pgToSaveA still gets placed after TEXT(beginproblem());

//BUTT

//pgToSaveB/C don't get used. Instead,

//pgToSaveD gets placed after: BEGIN_PGML

//pgToSaveE gets placed before: END_PGML

var urlName = urlDataArr[0];

var urlWidth = urlDataArr[1];

var urlHeight = urlDataArr[2];

var imgFileName = imgDataArr[0];

var imgWidth = imgDataArr[1];

var imgHeight = imgDataArr[2];

var counter = 0;

if( urlWidth ) {} else {var urlWidth = "1000"}

if( urlHeight ) {} else {var urlHeight = "1000"}

if( imgWidth ) {} else {var imgWidth = "1000"}

if( imgHeight ) {} else {var imgHeight = "1000"}

if( imgFileName ) {

	var pgToSaveB = "\\{ image( \""+imgFileName+"\", width=>"+imgWidth+", height=>"+imgHeight+", tex_size=>700, extra_html_tags=>'alt=\""+imgFileName+"\"' ) \\} $BR";

	var pgToSaveD = "[@ image( \""+imgFileName+"\", width=>"+imgWidth+", height=>"+imgHeight+", tex_size=>700, extra_html_tags=>'alt=\""+imgFileName+"\"' ) @]*  ";

}

else{

	var pgToSaveB = "";

	var pgToSaveD = "";

}

if( rawInput ) {var counter = counter + 1;}

if ( urlName ) {var counter = counter + 2;}

if( counter == 1 ) {

var pgToSaveA = "HEADER_TEXT(<<EOF);" + "\n" +

"<script language=\"javascript\" type=\"text/javascript\">" + "<!-- //" + "\n" +

  "var tempInput = \""+rawInput+"\";" +

  "function rawToText(words){" +

    "url = \"\";" +

    "var opt = \"height=20,width=300,location=no,\" +" +

    "\"menubar=no,status=no,resizable=yes,\" +" +

    "\"scrollbars=no,toolbar=no,\";" +

    "newwindow=window.open(url,'examdata_info',opt);" +

    "newdocument=newwindow.document;" +

    "newdocument.write(words);" +

    "newdocument.close();" +

  "}" +

  "// -->" +

  "</script>" + "\n" +

"EOF";

var pgToSaveC = "$BR" +

"\\{ htmlLink( \"javascript:rawToText(tempInput)\", \"Need help?\" ) \\}";

var pgToSaveE = "\n" + "[@ htmlLink(\"javascript:rawToText(tempInput)\",\"Need help?\") @]*";

}

if( counter == 2 ) {

var pgToSaveA = "HEADER_TEXT(<<EOF);" + "\n" +

"<script language=\"javascript\" type=\"text/javascript\">" + "<!-- //" + "\n" +

  "var tempInput = \""+urlName+"\";" +

  "var uheight = \""+urlWidth+"\";" +

  "var uwidth = \""+urlHeight+"\";" +

  "function rawToText(words, nerds, birds){" +

    "url = \"\";" +

    "var opt = \"height=20,width=300,location=no,\" +" +

    "\"menubar=no,status=no,resizable=yes,\" +" +

    "\"scrollbars=no,toolbar=no,\";" +

    "newwindow=window.open(url,'examdata_info',opt);" +

    "newdocument=newwindow.document;" +

    "var iframe = newdocument.createElement('iframe');" +

    "iframe.src = words;" +

    "iframe.height = nerds;" +

    "iframe.width = birds;" +

    "newdocument.body.appendChild(iframe);" +

    "newdocument.close();" +

  "}" +

  "// -->" +

  "</script>" + "\n" +

"EOF";

var pgToSaveC = "$BR" +

"\\{ htmlLink( \"javascript:rawToText(tempInput, uheight, uwidth)\", \"Need help?\" ) \\}";

var pgToSaveE = "\n" + "[@ htmlLink(\"javascript:rawToText(tempInput, uheight, uwidth)\",\"Need help?\") @]*";

}

if( counter == 3 ) {

var pgToSaveA = "HEADER_TEXT(<<EOF);" + "\n" +

"<script language=\"javascript\" type=\"text/javascript\">" + "<!-- //" + "\n" +

  "var tempInputA = \""+rawInput+"\";" +

  "var tempInputB = \""+urlName+"\";" +

  "var uheight = \""+urlWidth+"\";" +

  "var uwidth = \""+urlHeight+"\";" +

  "function rawToText(wordsA, wordsB, nerds, birds){" +

    "url = \"\";" +

    "var opt = \"height=20,width=300,location=no,\" +" +

    "\"menubar=no,status=no,resizable=yes,\" +" +

    "\"scrollbars=no,toolbar=no,\";" +

    "newwindow=window.open(url,'examdata_info',opt);" +

    "newdocument=newwindow.document;" +

    "newdocument.write(wordsA);" +

    "var iframe = newdocument.createElement('iframe');" +

    "iframe.src = wordsB;" +

    "iframe.height = nerds;" +

    "iframe.width = birds;" +

    "newdocument.body.appendChild(iframe);" +

    "newdocument.close();" +

  "}" +

  "// -->" +

  "</script>" + "\n" +

"EOF";

var pgToSaveC = "$BR" +

"\\{ htmlLink( \"javascript:rawToText(tempInputA, tempInputB, uheight, uwidth)\", \"Need help?\" ) \\}";

var pgToSaveE = "\n" + "[@ htmlLink(\"javascript:rawToText(tempInputA, tempInputB, uheight, uwidth)\",\"Need help?\") @]*";

}

if( counter == 0 ) {

	var pgToSaveA = "";

	var pgToSaveC = "";

	var pgToSaveE = "";

}

insertHintToPG(pgToSaveA, pgToSaveB, pgToSaveC, pgToSaveD, pgToSaveE);

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
