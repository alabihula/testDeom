module.exports = {
	module1:{
		dist:"./dist/module1/",
		rjs:{
			baseUrl: "./app/module1/",
	        paths: {
		        jquery:"../js/jquery-3.1.1.min",
		        commons:"../js/commons",
		        vue:"../js/vue.min",
		        uploadImg:"uploadImg",
		        fastjs:"../js/fastclick",
		        action_appeal:"action-appeal",
		        wk:'wkapi-source'
		    },
	        name:"main-appeal",
	        out: "module1/main-appeal.js"
		},
		otherPath:{
			src:{
				html:[
					"app/module1/*.html"
				],
				json:"./app/module1/testUrl/**"
			},
			dist:{
				json:"./dist/module1/testUrl/"
			}
		}
		
	},
	module2:{
		dist:"./dist/module2",
		rjs:{
			baseUrl: "./app/module2/",
	        paths: {
		        vue:"../js/vue.min",
	        	action_appeal2:"action-appeal2"
		    },
	        name:"main-appeal2",
	        out: "module2/main-appeal2.js"
		},
		otherPath:{
			src:{
				html:[
					"app/module2/*.html"
				],
				json:"./app/module2/testUrl/**"
			},
			dist:{
				json:"./dist/module2/testUrl/"
			}
		}
	}
}
