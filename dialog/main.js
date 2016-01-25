require.config({
	paths : {
		'jquery' : 'script/jQuery2.1.4.min',
		'jqueryUI' : 'script/jquery-ui.min',
		'dialog' : 'script/dialog',
		'widget' : 'script/widget'
	}
});


require(['jquery', 'dialog'], function($, dialog) {
	var dg = new dialog.dialog;
	$('#alert').click(function() {
		dg.alert({
			'title' : 'tips',
			'content' : 'hello world!',
			// 'hasMask' : false,
			'width' : 300,
			'height' : 100,
			'top' : 100,
			'skinClassName' : 'skin_a',
			'hasCloseBtn' : true,
			'text4AlertBtn' : '确定',
			'isDraggable' : true,
			'dragHandle' : '.alert_header',
			'handle4AlertBtn' : function() {
				console.log('u click the alert button')
			},
			'handle4CloseBtn' : function() {
				console.log('u click the close button')
			},
		});

		dg.on('alert', function() {
			console.log('onalert')
		}).on('alert', function(){
			console.log('second alert')
		}).on('close', function() {
			console.log('second close')
		});

	});

	$('#confirm').click(function() { 
		dg.confirm({
			'content' : 'r u sure?',
			// 'width' : 300,
			'height' : 100,
			'isDraggable' : true,
			'dragHandle' : '.alert_header',
			// 'skinClassName' : 'skin_a',
		});

		dg.on('confirm', function() {
			console.log('confirm 1')
		}).on('cancel', function() {
			console.log('cancel 1')
		});

	});

	$('#prompt').click(function() { 
		dg.prompt({
			'content' : 'please input your password',
			'width' : 300,
			'height' : 150,
			'isDraggable' : true,
			'dragHandle' : '.alert_header',
			isPromptInputPassword : true,
			// 'skinClassName' : 'skin_a',
		});

		dg.on('prompt', function(data) {
			console.log(data)
		})

	});

	$('#common').click(function() { 
		dg.common({
			'content' : 'common dialog',
			'width' : 200,
			'height' : 100,
			'isDraggable' : true,
			'hasCloseBtn' : true,
		});

	});

});



