
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
			postListItem += '<div class="postCard" data-_id="' + data[i]._id + '">';
			postListItem += createImgElement(data[i].postPicture,'preview-postPicture');
			postListItem += '<li><h3>' + data[i].postTitle + '</h3>';
			postListItem += shortenDescription(data[i].postContent, 50);
			postListItem += createPElement(data[i].published);
			postListItem += '</li><a href="#" class="removeBlog" data-_id="' + data[i]._id + '">Delete</a><a href="#" class="editBlog" data-_id="' + data[i]._id + '">Edit</a></div>';

			// USER BLOG PAGE
			userBlog += '<div>';
			userBlog += createImgElement(data[i].postPicture,'userBlog-postPicture');
			userBlog += '<h3>' + data[i].postTitle + '</h3>';
			userBlog += createPElement(data[i].postContent);
			userBlog += createPElement(data[i].published);
			userBlog += '</div>';
		}

		appendData('#userContainer', userBlog);
		appendData('#user-post-list', postListItem);
	}
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

// EDIT BUTTON
$('body').on('click', '.editBlog', function() {
	var ele = $(this);

	$.ajax('/API_updateBlog/' + ele.attr('data-_id'), {
		method: "GET",
		success: function(data){

			$('#inputTitle').val(data[0].postTitle);
			$('#inputTextArea').text(data[0].postContent);
			$('.actionButton').text('Update').attr('data-_id', data[0]._id);
			$('.actionForm').attr('action', 'addBlog/update');
			$('.actionButton').after('<button class="cancelButton">Cancel Update</button>');
			if ($('#hidden_post_id_field').length <= 0) {
				$('.actionForm').append('<input id="hidden_post_id_field" type="hidden" name="post_id"/>');
			}
			$('#hidden_post_id_field').val(ele.attr('data-_id'));

		},
		error: function(error){
			console.log('error: ' + error)
		}
	});

});

// UPDATE BUTTON
// $('body').on('click', '.actionButton', function(e) {
// 	e.preventDefault();
// 	var ele = $(this);
//
//
// 	$.ajax('/API_updateBlog/' + ele.attr('data-_id'), {
// 		method: "POST",
// 		data: {
//
// 		},
// 		success: function(data){
//
// 			// UPDATE BLOG PAGE
// 			var postListItem = '<div class="postCard" data-_id="' + data[0]._id + '">';
// 			postListItem += createImgElement(data[0].postPicture,'preview-postPicture');
// 			postListItem += '<li><h3>' + data[0].postTitle + '</h3>';
// 			postListItem += shortenDescription(data[0].postContent, 50);
// 			postListItem += createPElement(data[0].published);
// 			postListItem += '</li><a href="#" class="removeBlog" data-_id="' + data[0]._id + '">Delete</a><a href="#" class="editBlog" data-_id="' + data[0]._id + '">Edit</a></div>';
//
// 			$(postListItem).insertAfter('.postCard[data-_id="' + data[0]._id + '"]');
// 			$('.postCard[data-_id="' + data[0]._id + '"]').remove();
// 			//appendData('#user-post-list', postListItem);
//
// 			$('#inputTitle').val('');
// 			$('#inputTextArea').text('');
// 			$('.actionButton').text('Add');
// 			$('.removeBlog').attr('method', 'post');
// 			$('.cancelButton').remove();
//
// 		},
// 		error: function(error){
// 			console.log('error: ' + error)
// 		}
// 	});
//
// });

// CANCEL EDIT BUTTON
$('body').on('click', '.cancelButton', function() {
	$('#inputTitle').val('');
	$('#inputTextArea').text('');
	$('.actionButton').text('Add');
	$('.removeBlog').attr('method', 'post');
	$('.cancelButton').remove();
});


var userName = {};
var userPosts = [];

// LOOP THROUGH DATA
function postLoop(data) {

	for (var i = 0; i < data.length; i++) {
		addBlogList(userName, data[i].userName, data[i].postPicture, data[i].postTitle, data[i].postContent, data[i].published, data[i].userId, data[i].postPicture);
	}

	Object.keys(userName).forEach(function(user) {
		// USER
		userNameList = '<li><a href="/shareBlog/' + userName[user][0][4] + '"><h3>' + user + '</h3></a>';
		// LOOP THROUGH POSTS
		userName[user].slice(0, 3).forEach(function(post) {
			userNameList += createImgElement(post[0],'all-blog-postPicture');
			userNameList += '<h3>' + post[1] + '</h3>';
			userNameList += shortenDescription(post[2], 100);
			userNameList += createPElement(post[3]);
		});

		appendData('#all-blog-list', userNameList);
	});

}

function createImgElement(source, imgClass) {
	source = '<img src="'+ '/uploads/' + source +'" class="' + imgClass + '">';
	return source;
}

// CREATE P ELEMENT
function createPElement(content) {
	content = '<p>' + content + '</p>';
	return content;
}

// LIMIT DESCRIPTION
function shortenDescription(description, maxChar) {
	if ( description.length > 50 ) {
		description = createPElement(description.substring(0, maxChar) + '... ');
	} else {
		description = createPElement(description);
	}
	return description;
}

// ADD USERNAME ARRAY TO OBJECT IF USER DOESN'T ALREADY EXIST
function addBlogList(object, user, picture, title, description, date, userId) {
	if (!object[user]) {
		object[user] = [];
	}
	object[user].unshift([picture, title, description, date, userId]);
}

// APPEND CONTENT TO SELECTR
function appendData(idSelector, content) {
	$(idSelector).append(content);
}
