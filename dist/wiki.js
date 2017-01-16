var resultsToReturn = 10;
var randUrl = 'https://www.google.com';

function traverseJSON (object) {
	for(var i in object) {
		//func.apply(this, [i, object[i]]);
		if(object[i] != null && typeof object[i]==='object'){
			$('#data').append('<ul>');
			traverseJSON(object[i]);
			$('#data').append('</ul>');
		}
		else if(object[i] != null) {
			console.log(object[i]);
			$('#data').append('<li>' + object[i] + '</li>');
		}
	}
}

function displayResults (data) {
	for (var i=0; i<resultsToReturn; i++) {
		$('#data').append('<h3>' + data[1][i] + '</h3>');
		$('#data').append('<p>' + data[2][i] + '</p>');
		$('#data').append('<a href="' + data[3][i] + '">' + data[3][i] + '</a>');
	}
}

function returnResults() {
	var searchTopic = $('#searchTerm').val();

	//var wikiAPIcall = 'https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json';
	var wikiAPIcall = 'https://en.wikipedia.org/w/api.php?';
	//var queryData = 'action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json&callback=?';
	//var queryData = 'action=query&titles=' + searchTopic + '&format=json&callback=?';
	var queryData = 'action=opensearch&search=' + searchTopic + '&format=json&callback=?';
	//var queryData = "Main Page";
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
	    	console.log('success ' + data.length);
	    	console.log(data);
	      //traverseJSON(data);
	      var pageID = data.query.random[0].id;
				randQuery = 'action=query&format=json&prop=info&pageids=' + pageID + '&inprop=url&callback=?';
				console.log(pageID);
				console.log(wikiAPIcall + randQuery);
				$.ajax( {
			    url: wikiAPIcall,
			    data: randQuery,
			    dataType: 'json',
			    type: 'GET',
			    headers: { 'Api-User-Agent': 'Wiki-viewer/1.0 (pdcavanagh@yahoo.com)' },
			    success: function(data, textStatus, jqXHR) {
			    	console.log('success ' + data.length);
			    	console.log(data);
			      //traverseJSON(data);
			      //var pageID = data.query.random[0].id;
						randUrl = data.query.pages[pageID].fullurl;
						//console.log(randUrl);
						window.location.href=randUrl;
	    		}
	    	});
	  	}
	});
}

$('#submit').click( function () {
	returnResults();
})

$('#random').click( function () {
	returnRandArticle();
	//console.log(randUrl);

})