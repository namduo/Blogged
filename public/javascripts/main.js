
// GET BLOGS FOR SPECIFIC USER
$.ajax({
	url: '/API_getBlog',
	type: 'GET',
	dataType: 'JSON',
	success: function(data){
		var postListItem = '';

		for (var i = 0; i < data.length; i++) {

			postListItem += '<div>';
			// IMAGE
			postListItem += '<img src=" ' + '/uploads/' + data[i].postPicture + ' "class="preview-postPicture" alt="">';
			// TITLE
			postListItem += '<li><h3>' + data[i].postTitle + '</h3>';
      // SHORTEN DESCRIPTION
			if ( data[i].postContent.length > 50 ) {
				postListItem += '<p>' + data[i].postContent.substring(0, 50) + '... ' + '</p>';
			} else {
				postListItem += '<p>' + data[i].postContent + '</p>';
			}
			// DATE
			postListItem += '<p>' + data[i].published + '</p>';
			// DELETE
			postListItem += '</li><a href="#" class="removeBlog" data-_id="' + data[i]._id + '">Delete</a></div>';
		}

		appendData('#user-post-list', postListItem)
	}
});

// DELETE
$('body').on('click', '.removeBlog', function() {

	var ele = $(this);

  $.ajax('/removeBlog/' + ele.attr('data-_id'), {
    method: "DELETE",

    success: function(data){
			ele.parent().remove();
    },
    error: function(error){
        console.log('error: ' + error)
    }
  });

});


// GET ALL BLOGS
$.ajax({
	url: '/API_getAllBlogs',
	type: 'GET',
	dataType: 'JSON',
	success: function(posts){
		postLoop(posts);
	}
});


var userName = {};
var userPosts = [];

// LOOP THROUGH DATA
function postLoop(data) {

	for (var i = 0; i < data.length; i++) {
		addblogList(userName, data[i].userName, data[i].postTitle);
	}

	Object.keys(userName).forEach(function(user) {
		userNameList = '<li><h3>' + user + '</h3>';
		// LOOP
		userName[user].forEach(function(post) {
			userNameList += '<p>' + post + '</p></li>';
		});
		appendData('#all-blog-list', userNameList);
	});

	console.log(userName);

}

// ADD USERNAME ARRAY TO OBJECT IF USER DOESN'T ALREADY EXIST
function addblogList(object, user, title) {
	if (!object[user]) {
		object[user] = [];
	}
	object[user].push(title);
}

// APPEND CONTENT TO SELECTR
function appendData(idSelector, content) {
	$(idSelector).append(content);
}
