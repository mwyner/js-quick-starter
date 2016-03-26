"use strict";
var $ = require('jquery');
var template = require('./templates/user-lists.hbs');
var template2 = require('./templates/user.hbs');

// code inside this block only runs when the DOM is ready for manipulation
// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
$(document).ready(function() {	
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
				console.dir(response);
				$('#app-container').append(
					template2(response[response.length - 1])
				);  
				
			},
			error: function(xhr, status, err) {
				console.dir(xhr, status, err);
			}
	   	});

	};
	$('#submit-user').on('click', clickHandler);
	
	var data = {};
	$.ajax({
		url: '/api/get-users',
		dataType: 'json',
		type: 'GET',
		
		success: function(response) {
			console.dir(response);
			data.users = response;
			$('#app-container').html(template(data));  
		},
		error: function(xhr, status, err) {
			console.dir(xhr, status, err);
		}
	});	
});
