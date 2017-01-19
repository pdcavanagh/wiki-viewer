var resultsToReturn = 10;
var randUrl = 'https://www.google.com';

// function traverseJSON (object) {
// 	for(var i in object) {
// 		//func.apply(this, [i, object[i]]);
// 		if(object[i] != null && typeof object[i]==='object'){
// 			$('#results').append('<ul>');
// 			traverseJSON(object[i]);
// 			$('#results').append('</ul>');
// 		}
// 		else if(object[i] != null) {
// 			console.log(object[i]);
// 			$('#results').append('<li>' + object[i] + '</li>');
// 		}
// 	}
// }

function displayResults (data) {
	$('#results').empty();
	for (var i=0; i<resultsToReturn; i++) {
		$('#results').append('<h3>' + data[1][i] + '</h3>');
		$('#results').append('<p>' + data[2][i] + '</p>');
		$('#results').append('<a href="' + data[3][i] + '">' + data[3][i] + '</a>');
	}
}

function returnResults() {
	var searchTopic = $('#search').val();

	var wikiAPIcall = 'https://en.wikipedia.org/w/api.php?';
	var queryData = 'action=opensearch&search=' + searchTopic + '&format=json&callback=?';
	
	// Using jQuery
	$.ajax( {
	    url: wikiAPIcall,
	    data: queryData,
	    dataType: 'json',
	    type: 'GET',
	    headers: { 'Api-User-Agent': 'Wiki-viewer/1.0 (pdcavanagh@yahoo.com)' },
	    success: function(data, textStatus, jqXHR) {
	    	console.log('success ' + data.length);
	    	console.log(data);
	      //traverseJSON(data);
	      displayResults(data);
	    }
	  });
}

function returnRandArticle () {
	var wikiAPIcall = 'https://en.wikipedia.org/w/api.php?';
	var queryData = 'action=query&format=json&prop=&list=random&rnnamespace=0&callback=?';

	$.ajax( {
	    url: wikiAPIcall,
	    data: queryData,
	    dataType: 'json',
	    type: 'GET',
	    headers: { 'Api-User-Agent': 'Wiki-viewer/1.0 (pdcavanagh@yahoo.com)' },
	    success: function(data, textStatus, jqXHR) {
	    	//console.log('success ' + data.length);
	    	//console.log(data);
	      //traverseJSON(data);
	      var pageID = data.query.random[0].id;
				randQuery = 'action=query&format=json&prop=info&pageids=' + pageID + '&inprop=url&callback=?';
				//console.log(pageID);
				//console.log(wikiAPIcall + randQuery);
				$.ajax( {
			    url: wikiAPIcall,
			    data: randQuery,
			    dataType: 'json',
			    type: 'GET',
			    headers: { 'Api-User-Agent': 'Wiki-viewer/1.0 (pdcavanagh@yahoo.com)' },
			    success: function(data, textStatus, jqXHR) {
			    	//console.log('success ' + data.length);
			    	//console.log(data);
						randUrl = data.query.pages[pageID].fullurl;
						window.location.href=randUrl;
	    		}
	    	});
	  	}
	});
}

document.getElementById("search")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("submit").click();
    }
});

$('#submit').click( function () {
	returnResults();
	
})

$('#random').click( function () {
	returnRandArticle();
	//console.log(randUrl);

})