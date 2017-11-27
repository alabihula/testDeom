'use strict';

define(['promise', 'vue', 'vueax5', 'axios'], function (Promise, vue, vueax5, axios) {
	var urlObj = {
		stateByName: {
			name: "轮训查询视频状态",
			url: {
				other: "//183.247.147.173:12007/netcat/replayMaterial/getReplayStateByName.do",
				dev: "stateByName.json",
				pub: "netcat/replayMaterial/getReplayStateByName.do"
			},
			data: function data(fileName) {
				return "fileName=" + fileName;
			}
		},
		getShareInfo: {
			name: "获取分享签名",
			url: {
				dev: "getSign.json",
				pub: "share/getShareSign.do"
			},
			data: function data() {
				return "url=" + encodeURIComponent(location.href);
			}
		},
		getPlay: {
			name: "获取视频",
			url: {
				dev: "getPlay.json",
				pub: "share/getLOLVideoInfo.do"
			},
			data: function data(QQ, matchId) {
				return "QQ=" + QQ + "&matchId=" + matchId;
			}
		},
		getAlPlay: {
			name: "获取分享视频",
			url: {
				dev: "getAlPlay.json",
				pub: "share/getLOLVideoInfoByVideoId.do"
			},
			data: function data(videoId, videoType) {
				return "videoId=" + videoId + "&videoType=" + videoType;
			}
		},
		getAdviceVideos: {
			name: "获取推荐视频",
			url: {
				dev: "getAdviceVideos.json",
				pub: "share/geAdviceVideos.do"
			}
		}
	};
	window.Promise = Promise;
	vueax5(vue, axios);
	new vue({
		el: ".box",
		data: {
			name: 111,
			btnName: "click"
		},
		mounted: function mounted() {},
		watch: {},
		methods: {
			prof: function prof() {
				var pro = Promise.resolve(2);
				pro.then(function (v) {
					alert(v);
				});
			},
			show: function show() {
				this.prof();
				var t = this;
				try {
					this.axios("js/testUrl/getAlPlay.json").then(function (data) {
						console.log(data);
						t.btnName = 1111;
						if (data.status == 200) {
							return data.data;
						} else {
							throw new Error("code error");
						}
					}).then(function (data) {
						console.log(data);
						t.btnName = "haha";
					}).catch(function (e) {
						console.log("error: " + e);
						t.btnName = e;
					});
				} catch (e) {
					alert(e);
				}
			},
			show2: function show2() {
				var t = this;
				this.$http("js/testUrl/getAlPlay.json").then(function (data) {
					console.log(data);
					if (data.status == 200) {
						return data.data;
					} else {
						throw new Error("code error");
					}
				}).then(function (data) {
					console.log(data);
					t.btnName = "111";
				}).catch(function (e) {
					console.log("error: " + e);
				});
			}
		}
	});
});