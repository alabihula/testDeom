define(['vue','vueax5','axios'], function(vue,vueax5,axios) {

		
	var urlObj = {
		stateByName: {
			name: "轮训查询视频状态",
			url: {
				other:"//183.247.147.173:12007/netcat/replayMaterial/getReplayStateByName.do",
				dev: "stateByName.json",
				pub: "netcat/replayMaterial/getReplayStateByName.do"
			},
			data:function(fileName) {
				return "fileName="+fileName
			}
		},
		getShareInfo: {
			name: "获取分享签名",
			url: {
				dev: "getSign.json",
				pub: "share/getShareSign.do"
			},
			data:function() {
				return "url="+encodeURIComponent(location.href);
			}
		},
		getPlay: {
			name: "获取视频",
			url: {
				dev: "getPlay.json",
				pub: "share/getLOLVideoInfo.do"
			},
			data:function(QQ,matchId) {
				return "QQ="+QQ+"&matchId="+matchId;
			}
		},
		getAlPlay: {
			name: "获取分享视频",
			url: {
				dev: "getAlPlay.json",
				pub: "share/getLOLVideoInfoByVideoId.do"
			},
			data:function(videoId,videoType) {
				return "videoId="+videoId+"&videoType="+videoType;
			}
		},
		getAdviceVideos: {
			name: "获取推荐视频",
			url: {
				dev: "getAdviceVideos.json",
				pub: "share/geAdviceVideos.do"
			}
		}
	}
	vueax5(vue,axios);
	new vue({
		el: ".box",
		data: {
			name: 111,
		},
		mounted: function() {

		},
		watch:{

		},
		methods: {
			show:function() {
				this.axios("js/testUrl/getAlPlay.json").then(function(data) {
					if(data.status == 0) {
						return data.data;
					} else {
						throw new Error("code error");
					}
				}).then(function(data) {
					console.log(data);
				}).catch(function(e) {
					console.log("error: "+e);
				})
			},
			show2:function() {
				fetch("js/testUrl/getAlPlay.json").then(function(data) {
					if(data.status == 0) {
						return data.data;
					} else {
						throw new Error("code error");
					}
				}).then(function(data) {
					console.log(data);
				}).catch(function(e) {
					console.log("error: "+e);
				})
			}
		}
	})
})
