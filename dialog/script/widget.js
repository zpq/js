define(['jquery'] ,function($){ 
	function widget() {
		this.box = null;
	}

	widget.prototype = {
		on : function(type, handle) {
			if(typeof this.handlers[type] == 'undefined') {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handle);
			return this;
		},

		fire : function(type, data) {
			if(this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for(var i in handlers) {
					handlers[i](data);
				}
			}
		},

		render : function(container) {
			this.handlers = {};
			this.renderUI();
			this.bindUI();
			this.syncUI();
			$(container || document.body).append(this.box);
		},

		destroy : function() {
			this.destructor();
			this.box.off();
			this.box.remove();
		},

		renderUI : function(){}, // dom act
		bindUI : function(){}, // event bind
		syncUI : function(){},	// css 
		destructor : function(){}, //
	}

	return {
		widget : widget
	}
			
});