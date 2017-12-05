
// GET BLOGS FOR SPECIFIC USER
$.ajax({
	url: '/API_getBlog',
	type: 'GET',
	dataType: 'JSON',
	success: function(data){
		var postListItem = '';

		for (var i = 0; i < data.length; i++) {
			// IMAGE
			postListItem += '<img src=" ' + '/uploads/' + data[i].postPicture + ' "class="preview-postPicture" alt="">';
			// TITLE
			postListItem += '<li><h3>' + data[i].postTitle + '</h3>';
      // SHORT CONTENT
			if ( data[i].postContent.length > 50 ) {
				postListItem += '<p>' + data[i].postContent.substring(0, 50) + '... ' + '</p>';
			} else {
				postListItem += '<p>' + data[i].postContent + '</p>';
			}
			// DATE
			postListItem += '<p>' + data[i].published + '</p></li>';

		}
		
		// APPEND
		appendData('#user-post-list', postListItem)
	}
});


var userName = [];

// GET ALL BLOGS
$.ajax({
	url: '/API_getAllBlogs',
	type: 'GET',
	dataType: 'JSON',
	success: function(posts){
		postLoop(posts);
	}
});




// LOOP THROUGH DATA
function postLoop(data) {

	for (var i = 0; i < data.length; i++) {
		addUserName(userName, data[i].userName);
	}
	// LOOP USERNAME ARRAY AND PRINT
	var userNameList = '';
	for (var i = 0; i < userName.length; i++) {
		userNameList += '<li><h3>' + userName[i] + '</h3></li>';
	}
	// APPEND
	appendData('#all-blog-list', userNameList)
}


// ADD USERNAME TO ARRAY IF DOESN'T ALREADY EXIST
function addUserName(array, user) {
	if (array.indexOf(user) === -1 ) {
		array.push(user);
	}
}

// APPEND CONTENT TO SELECTR
function appendData(idSelector, content) {
	$(idSelector).append(content);
}












// // LOOP THROUGH BLOGS ARRAY
// for (var i = 0; i < blogs.length; i++) {
//
//
//
//
// 	$.ajax({
// 		url: '/API_getAllBlogs',
// 		type: 'GET',
// 		dataType: 'JSON',
// 		success: function(data){
// 			console.log(data);
//
// 			// $('#user-post-list').append();
// 		}
// 	});
//
//
//
// }
