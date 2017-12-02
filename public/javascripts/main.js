$.ajax({
	url: '/getBlog',
	type: 'GET',
	dataType: 'JSON',
	success: function(data){

		var postListItem = '';

		for (var i = 0; i < data.length; i++) {

			postListItem += '<li><h3>' + data[i].postTitle + '</h3>';
			postListItem += '<p>' + data[i].postContent+ '</p>';
			postListItem += '<p>' + data[i].postPicture+ '</p></li>';

		}
		$('#user-post-list').append(postListItem);
	}
});
