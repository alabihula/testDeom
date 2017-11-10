define(function() {
	return {
		config:{
			qq:function(title,url,pics,summary) {
				return {
					base:"http://connect.qq.com/widget/shareqq/index.html",
					url:url,
					showcount:0,
					title:title,
					pics:pics,
					summary:summary,
					desc:title
				}
			},
			qzone:function(title,url,pics,summary) {
				return {
					base:"https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
					url:url,
					title:title,
					pics:pics,
					summary:summary
				}
			},
			weibo:function(title,url,pics,summary) {
				return {
					base:"http://service.weibo.com/share/share.php",
					url:url,
					title:title,
					source:summary,
					pics:pics,
					appkey:"",
					sourceUrl:url
				}
			}
		},
		send:function(sns,obj){
			var _this = this,
			_cfg=_this.config[sns](obj.title,obj.url,obj.pics,obj.summary),str;
			
			 if(_cfg){
				_str = _cfg.base;
				 for(i in _cfg){
					 if(i!='base'){
						_str = _this.updateParams(_str,i,_cfg[i]);
					}
				 }
				 window.open(_str)
			 }
		},
		updateParams: function (url, name, value) {
		   var r = url;
		   if (r != null && r != 'undefined' && r != "") {
				value = encodeURIComponent(value);
				var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
				var tmp = name + "=" + value;
				if (url.match(reg) != null) {
					r = url.replace(eval(reg), tmp);
				}
				else {
					if (url.match("[\?]")) {
						r = url + "&" + tmp;
					} else {
						r = url + "?" + tmp;
					}
				}
			}
			return r;
		  }
	}
})