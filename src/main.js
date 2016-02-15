"use strict";
var $ = require('jquery');

// code inside this block only runs when the DOM is ready for manipulation
// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
$(function(){
	
	var clickHandler = function(event){
		event.preventDefault();

		// collect data
		var dataObject = {
			first: $('#create-user .first-name').val(),
			last:  $('#create-user .last-name').val(),
			sex:   $('#create-user .sex').val()
		};
		console.log(dataObject);

		$.ajax({
	    	url: '/api/create-user',
	    	dataType: 'json',
	    	type: 'POST',
	    	data: dataObject,
	     
	     success: function(response) {
	      console.dir('everything worked!');  
	     },
	     error: function(xhr, status, err) {
	       console.dir(xhr, status, err);
	     }
	   	});

	};
	$('#submit-user').on('click', clickHandler);
});
