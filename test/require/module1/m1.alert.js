define(['jquery','m1Sub','vue'],function($,sub,vue) {
	var alert = {};
	alert.aaa = "我来自模块alert";
	
	//为需要依赖此js的sub模块赋值
	sub.init(alert);
	function showMsg(str) {
		$('.msg_box').css({
			'margin':'50px auto',
			'width':"800px",
			'height':'50px',
			'font-size':'20px',
			'text-align':'center',
			'line-height':'50px',
			'box-shadow':'0px 0px 10px 2px',
			'display':'none'
		}).html(str+"-"+sub.getInfo("闵星")).show();
	}
	
	
	var vue = new vue({
		el:'.box',
		data:{
			msg:"init",
			show:false
		},
		methods:{
			showName:function() {
				this.show = true;
				this.msg = sub.getInfo("闵星");
			}
		}
	})
	
	
	return alert;
})
