
// GET BLOGS FOR SPECIFIC USER
$.ajax({
	url: '/API_getBlog/' + $('.var-user-id').attr('data-var-user-id'),
	type: 'GET',
	dataType: 'JSON',
	success: function(data){


		var postListItem = '';
		var userBlog = '';

		for (var i = 0; i < data.length; i++) {

			// ADD BLOG PAGE
			postListItem += '<div><img src="' + '/uploads/' + data[i].postPicture + '"class="preview-postPicture">';
			postListItem += '<li><h3>' + data[i].postTitle + '</h3>';
				if ( data[i].postContent.length > 50 ) {
					postListItem += '<p>' + data[i].postContent.substring(0, 50) + '... ' + '</p>';
				} else {
					postListItem += '<p>' + data[i].postContent + '</p>';
				}
			postListItem += '<p>' + data[i].published + '</p>';
			postListItem += '</li><a href="#" class="removeBlog" data-_id="' + data[i]._id + '">Delete</a></div>';

			// USER BLOG PAGE
			userBlog += '<div><img src="' + '/uploads/' + data[i].postPicture + '"class="userBlog-postPicture">';
			userBlog += '<h3>' + data[i].postTitle + '</h3>';
			userBlog += '<p>' + data[i].postContent + '</p>';
			userBlog += '<p>' + data[i].published + '</p>';

			userBlog += '</div>'
		}

		appendData('#userContainer', userBlog);
		appendData('#user-post-list', postListItem);
	}
});


// DELETE API
$('body').on('click', '.removeBlog', function() {

	var ele = $(this);

  $.ajax('/API_removeBlog/' + ele.attr('data-_id'), {
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
		addBlogList(userName, data[i].userName, data[i].postTitle, data[i].published, data[i].userId);
	}


	Object.keys(userName).forEach(function(user) {

		userNameList = '<li><a href="/shareBlog/' + userName[user][0][2] + '"><h3>' + user + '</h3></a>';

		// LOOP THROUGH POSTS
		userName[user].forEach(function(post) {
			userNameList += '<p>' + post + '</p></li>';
		});

		appendData('#all-blog-list', userNameList);
	});

}

// ADD USERNAME ARRAY TO OBJECT IF USER DOESN'T ALREADY EXIST
function addBlogList(object, user, title, date, userId) {
	if (!object[user]) {
		object[user] = [];
	}
	object[user].unshift([title, date, userId]);
}

// APPEND CONTENT TO SELECTR
function appendData(idSelector, content) {
	$(idSelector).append(content);
}
