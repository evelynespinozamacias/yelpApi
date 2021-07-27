$(function() {
	
	$("#search").keypress(keywordSearch);
	
	//"mDl8AIUncJLzYsH0nPJwTA"
	//getBusinessReviews("mDl8AIUncJLzYsH0nPJwTA");
	
	function getBusinessReviews(id) {
		$.ajax({
			url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id+"/reviews",
			headers: {
					Authorization: "Bearer 8S1zOQjPhSGoUzAaGAiY1k2VHlTgcf0Kvu9LbmTVv4juziGHBQt0yR9DCdi9IKXew9BPjfncZgioEBgzikp75vm_sP92l68cYJYLwHvBGpHv3QApeC33o2hLqrnwYHYx"
			},
			method: "GET", 
			dataType: "json",
			data: {
					
				}, 
				error: ajaxError, 
				success: function(data) {
					console.log(data);
					console.log(data.reviews[1].text);
					console.log(data.reviews[1].user);
				}
		});
	}
	
	function getBusiness(id) {
		
		$.ajax({
			url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id,
			headers: {
					Authorization: "Bearer 8S1zOQjPhSGoUzAaGAiY1k2VHlTgcf0Kvu9LbmTVv4juziGHBQt0yR9DCdi9IKXew9BPjfncZgioEBgzikp75vm_sP92l68cYJYLwHvBGpHv3QApeC33o2hLqrnwYHYx"
			},
			method: "GET", 
			dataType: "json",
			data: {
					
				}, 
				error: ajaxError, 
				success: function(data) {
					console.log(data);
				}
		});
		
	}
	
	function keywordSearch(event) {
		if(event.which == 13 ){
			
			var keyword = $(this).val();
			getBusinesses(keyword);
		}
	}
	
	function getBusinesses(keyword){
			
			$.ajax({
				url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search",
				headers: {
					Authorization: "Bearer 8S1zOQjPhSGoUzAaGAiY1k2VHlTgcf0Kvu9LbmTVv4juziGHBQt0yR9DCdi9IKXew9BPjfncZgioEBgzikp75vm_sP92l68cYJYLwHvBGpHv3QApeC33o2hLqrnwYHYx"
				},
				method: "GET", 
				dataType: "json", 
				data: {
					term: keyword,
					location: "Omaha"
				}, 
				error: ajaxError, 
				success: function(data) {
					console.log(data);
					
					buildBusinesses(data);
				}
			});
	}
	
	function ajaxError() {
		alert("Ajax Error!");
	}
	
	function buildBusinesses(data) {
		// build ui with business data
		
		$(".card").remove();
		for (var i = 0; i < data.businesses.length; i++) {
			//console.log(data.businesses[i].name);
			
			var $bus = data.businesses[i];
			var $business = $("#business-card").clone();
			$business.removeAttr("id");
			$business.addClass("card");
			$business.find(".business-image img").attr("src", $bus.image_url);
			$business.find(".business-title").append($bus.name);
			$business.find(".business-rating").append($bus.rating);
			$business.find(".review-count").append($bus.review_count);
			//$business.find(".business-address").append($bus.location.display_address);
			//add phone number
			$("#businesses").append($business);
			
			
		}
		
	}
	

});





