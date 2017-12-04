
// ADD BLOG GET
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
		$('#user-post-list').append(postListItem);
	}
});



// // ADD BLOG GET
// $.ajax({
// 	url: '/API_getAllBlogs',
// 	type: 'GET',
// 	dataType: 'JSON',
// 	success: function(data){
//
// 		var postListItem = '';
//
// 		for (var i = 0; i < data.length; i++) {
//
// 			postListItem += '<p>' + data[i].postPicture + '</p></li>';
//
// 		}
// 		$('#').append(postListItem);
// 	}
// });
