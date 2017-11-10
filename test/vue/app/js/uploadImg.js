define(['jquery'], function($) {
	// 全局对象，不同function使用传递数据
	var uploadObj = function(callback,parmObj) {
		this.imgMasSize = 1024 * 1024 * 10;
		this.imgCompassMaxSize = 100 * 1024; // 超过 200k 就压缩
		this.imgFile = {};

		this.handleInputChange = function(event) {
			// 获取当前选中的文件
			var file = event.target.files[0];
			// 检查文件类型
			if(['jpeg', 'png', 'gif', 'jpg'].indexOf(file.type.split("/")[1]) < 0) {
				// 自定义报错方式
				callback({error:"文件类型仅支持 jpeg/png/gif！"});
				return;
			}
			// 文件大小限制
			if(file.size > this.imgMasSize) {
				// 文件大小自定义限制
				callback({error:"文件大小不能超过2MB"});
				return;
			}
			// 图片压缩之旅
			transformFileToDataUrl.call(this,file);
		}
		// 将File append进 FormData
		function transformFileToFormData(file,result) {
			var formData = new FormData();
			// 自定义formData中的内容
			// type
			formData.append('type', file.type || "image/jpeg");
			// size
			formData.append('size', file.size);
			// name
			formData.append('fileName', file.name);
			formData.append('token', parmObj.token);
			formData.append('memberId', parmObj.memberId);
			formData.append('QQ', parmObj.QQ);
			// lastModifiedDate
			formData.append('lastModifiedDate', file.lastModifiedDate);
			// append 文件
			formData.append('selectedFile', file);
			//返回图片url和formData
			callback({dataURL:result,formData:formData});
		}
		//		// 将file转成dataUrl
		function transformFileToDataUrl(file) {
			// 存储文件相关信息
			var t = this;
			this.imgFile.type = file.type || 'image/jpeg'; // 部分安卓出现获取不到type的情况
			this.imgFile.size = file.size;
			this.imgFile.name = file.name;
			this.imgFile.lastModifiedDate = file.lastModifiedDate;
			// 封装好的函数
			var reader = new FileReader();
			// file转dataUrl是个异步函数，要将代码写在回调里
			reader.onload = function(e) {
				var result = e.target.result;
				if(!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
					transformFileToFormData(file,result);
					alert(111);
					return;
				}
				if(result.length < this.imgCompassMaxSize) {
					compress.call(t,result, processData.bind(null,t), false); // 图片不压缩
				} else {
					compress.call(t,result, processData.bind(null,t)); // 图片压缩
				}
			};
			reader.readAsDataURL(file);
		}
		// 使用canvas绘制图片并压缩
		function compress(dataURL, callback, shouldCompress) {
			var t = this;
			if(!shouldCompress) shouldCompress = true;
			var img = new window.Image();
			img.src = dataURL;
			img.onload = function() {
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');

				canvas.width = img.width;
				canvas.height = img.height;

				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				var compressedDataUrl;
				if(shouldCompress) {
					compressedDataUrl = canvas.toDataURL(t.imgFile.type, 0.5);
				} else {
					compressedDataUrl = canvas.toDataURL(t.imgFile.type, 1);
				}
				callback(compressedDataUrl);
			}
		}

		function processData(t,dataURL) {
			// 这里使用二进制方式处理dataUrl
			var binaryString = window.atob(dataURL.split(',')[1]);
			var arrayBuffer = new ArrayBuffer(binaryString.length);
			var intArray = new Uint8Array(arrayBuffer);
			var imgFile = t.imgFile;
			for(var i = 0, j = binaryString.length; i < j; i++) {
				intArray[i] = binaryString.charCodeAt(i);
			}
			var data = [intArray];
			var blob;
			try {
				blob = new Blob(data, {
					type: t.imgFile.type || "image/jepg"
				});
			} catch(error) {
				window.BlobBuilder = window.BlobBuilder ||
					window.WebKitBlobBuilder ||
					window.MozBlobBuilder ||
					window.MSBlobBuilder;
				if(error.name === 'TypeError' && window.BlobBuilder) {
					var builder = new BlobBuilder();
					builder.append(arrayBuffer);
					blob = builder.getBlob(t.imgFile.type);
				} else {
					callback({error:"版本过低，不支持上传图片"});
					return;
				}
			}
			// blob 转file
			var fileOfBlob = new File([blob], t.imgFile.name);
			var formData = new FormData();
			// type
			formData.append('type', t.imgFile.type);
			// size
			formData.append('size', fileOfBlob.size);
			// name
			formData.append('fileName', t.imgFile.name);
			formData.append('token', parmObj.token);
			formData.append('memberId', parmObj.memberId);
			formData.append('QQ', parmObj.QQ);
			// lastModifiedDate
			formData.append('lastModifiedDate', t.imgFile.lastModifiedDate);
			// append 文件
			formData.append('selectedFile', fileOfBlob);
			callback({dataURL:dataURL,formData:formData});
		}
	}
	
	return uploadObj;
})