define(['jquery', 'widget', 'jqueryUI'], function($, widget, $UI) {
	function dialog() {
		this.cfg = {
			title : 'system message',
			content : 'nothing',
			handle4AlertBtn : null,
			handle4CloseBtn : null,
			handle4ConfirmBtn : null,
			handle4CancelBtn : null,
			handle4PromptBtn : null,
			text4AlertBtn : 'ok',
			text4ConfirmBtn : 'ok',
			text4CancelBtn : 'cancel',
			text4PromptBtn : 'submit',
			text4PromptCancelBtn : 'cancel',
			isPromptInputPassword : false,
			defaultValue4PromptInput : '',
			maxLength4PromptInput : 32,
			skinClassName : '',
			width : 500,
			height : 300,
			hasCloseBtn : false,
			hasMask : true,
			zindex : 1000,
			isDraggable : false,
			dragHandle : null,
		}
	}

	dialog.prototype = $.extend({}, new widget.widget, {
		renderUI : function() {

			var footContent = '';
			switch(this.cfg.dialogType) {
				case 'alert' : 
					footContent = "<input class='alert_button' type='button' value='"+ this.cfg.text4AlertBtn +"'/>";
					break;
				case 'confirm' :
					footContent = "<input class='alert_confirm_button' type='button' value='"+ this.cfg.text4ConfirmBtn +"'/>" +
								"<input class='alert_cancel_button' type='button' value='"+ this.cfg.text4CancelBtn +"'/>";
					break;
				case 'prompt' :
				 	this.cfg.content += "<p>" + "<input type='"+ (this.cfg.isPromptInputPassword ? 'password' : 'text') +"' maxlength='" + this.cfg.maxLength4PromptInput + "' value='" + this.cfg.defaultValue4PromptInput + "' class='alert_prompt_input'/>" + "</p>";
				 	footContent = "<input class='alert_propmt_button' type='button' value='"+ this.cfg.text4PromptBtn +"'/>" +
								"<input class='alert_cancel_button' type='button' value='"+ this.cfg.text4PromptCancelBtn +"'/>";
					break;
				default:
					break;
			}

			if(this.cfg.dialogType != 'common') {
				this.box = $("<div class='alert'>" + 
							"<div class='alert_header'>" + this.cfg.title + "</div>" +
							"<div class='alert_body'>" + this.cfg.content + "</div>" +
							"<div class='alert_footer'>" + footContent + "</div>" +
							"</div>");
			} else {
				this.box = $("<div class='alert'>" + 
							"<div class='alert_body'>" + this.cfg.content + "</div>" +
							"</div>");
			}

			if(this.cfg.hasMask) {
				this.mask = $("<div class='alert_mask'></div>");
				this.mask.appendTo('body');
			}

			if(this.cfg.hasCloseBtn) {
				this.closeBtn = $("<span class='alert_close'>X</span>");
				this.closeBtn.appendTo(this.box);
			}
			this.box.appendTo(document.body);
			this.promptInput = this.box.find('.alert_prompt_input');
		},

		bindUI : function() {
			var that = this;
			this.box.delegate('.alert_button', 'click', function() {
				that.fire('alert');
				that.destroy();
			}).delegate('.alert_close', 'click', function() {
				that.fire('close');
				that.destroy();
			}).delegate('.alert_confirm_button', 'click', function() {
				that.fire('confirm');
				that.destroy();
			}).delegate('.alert_cancel_button', 'click', function() {
				that.fire('cancel');
				that.destroy();
			}).delegate('.alert_propmt_button', 'click', function() {
				that.fire('prompt', that.promptInput.val());
				that.destroy();
			});

			this.cfg.handle4AlertBtn && that.on('alert', this.cfg.handle4AlertBtn);
			this.cfg.handle4CloseBtn && that.on('close', this.cfg.handle4CloseBtn);
			this.cfg.handle4ConfirmBtn && that.on('confirm', this.cfg.handle4ConfirmBtn);
			this.cfg.handle4CancelBtn && that.on('cancel', this.cfg.handle4CancelBtn);
			this.cfg.handle4PromptBtn && that.on('prompt', this.cfg.handle4PromptBtn);
		},

		syncUI : function() {
			this.box.css({
				'width' : this.cfg.width + 'px',
				'height' : this.cfg.height + 'px',
				'left' : (this.cfg.left || ($(window).width() - this.cfg.width) / 2) + 'px',
				'top' : (this.cfg.top || ($(window).height() - this.cfg.height) / 2) + 'px',
				'z-index' : this.cfg.zindex,
			});

			this.mask.css({
				'z-index' : this.cfg.zindex - 1,
			});

			this.cfg.skinClassName && this.box.addClass(this.cfg.skinClassName);

			if(this.cfg.isDraggable) {
				if(this.cfg.dragHandle) {
					this.box.draggable({handle:this.cfg.dragHandle});
				} else {
					this.box.draggable();
				}
			}

		},

		destructor : function() {
			this.mask && this.mask.remove();
		},

		alert : function(cfg) {
			$.extend(this.cfg, cfg, {dialogType : 'alert'});
			this.render();
			return this;
		},

		confirm : function(cfg) {
			$.extend(this.cfg, cfg, {dialogType : 'confirm'});
			this.render();
			return this;
		},

		prompt : function(cfg) {
			$.extend(this.cfg, cfg, {dialogType : 'prompt'});
			this.render();
			this.promptInput.focus();
			return this;
		},

		common : function(cfg) {
			$.extend(this.cfg, cfg, {dialogType : 'common'});
			this.render();
			return this;
		},

	});

	return {
		dialog : dialog
	}

});