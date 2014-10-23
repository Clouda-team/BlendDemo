/*
* @since 2014/10/13
* @author terry
*/

//Demo模型
(function(win){
	var Sample = function(){

	}


//提示浮层方法
	var Tips = function(){

	}	

	Tips = {
		_template: function(text){
			return $('<div class="tips">'+text+'</div>');
		},
		show: function(dom,config){
			$(".page-content",dom).append(this._template(config.text));
			setTimeout(function(){
				$(".page-content",dom).find(".tips").addClass("opacity").hide();
			},2000);
		}
	}

	win.Sample = Sample;
//注册全局事件
	//Blend.ui.getLayerId()
	$(document).on("click","a.back",function(){
        Blend.ui.get(Blend.ui.getLayerId()).out();
        return false;
    });

	$(document).on("touchend",".icon_down",function(){
		var screens = $(this).closest(".page-content").find('.screen');
		if($(this).hasClass('reverse')){
			screens.eq(0).show();
			screens.eq(1).hide();
			$(this).removeClass('reverse');
		}else{
			screens.eq(1).show();
			screens.eq(0).hide();
			$(this).addClass('reverse');
		}
    });



	$(document).on("touchstart",".grid",function(){
		$(this).addClass('grid_hover');
    }); 

    $(document).on("touchend",".grid",function(){
		$(this).removeClass('grid_hover');
    });

    $(document).on("touchmove",".grid",function(){
    	if($(this).hasClass('grid_hover')){
    		$(this).removeClass('grid_hover');
    	}
    });     

	Sample.prototype = {
		battery:function(dom){
	        var showLevel = function(val){
	            val = parseInt(val);
	            var level = $("#level",dom),value=$("#value",dom);
	            if(val < 0 || val > 100){ return }
	            if(val <= 20){
	                level.addClass("reddot");
	                value.addClass("low");
	            }else if( val > 20){
	                level.removeClass("reddot");
	                value.removeClass("low");
	            }
	            level.css("height",3.54 * val + "px");
	            value.text(val);
	        }

	        Blend.device.battery.get({
	            onsuccess:function(data){
	                $("#api",dom).val(JSON.stringify(data));
	                var val = data.level;
	                if(val >=0 && val <= 100){ showLevel(val);}
	                
	            },
	            onfail:function(errno){
	                $("#api",dom).val(JSON.stringify(errno));
	            }
	        });
	        var mylayer = Blend.ui.get("battery");
		},
		network:function(dom){
				var success = function(data){
		                $("#api",dom).val(JSON.stringify(data));
		                switch(data){
		                	case Blend.device.CONNECTION_STATUS.NONE:
		                		$("#network",dom).removeClass().addClass("network warning");
		                		break;
		                	case Blend.device.CONNECTION_STATUS.UNKNOWN:
		                		$("#network",dom).removeClass().addClass("network unknown");
		                		break;			                				                	
		                	case Blend.device.CONNECTION_STATUS.WIFI:
		                		$("#network",dom).removeClass().addClass("network wifi");
		                		break;
		                	case Blend.device.CONNECTION_STATUS.CELL_3G:
		                		$("#network",dom).removeClass().addClass("network g3");
		                		break;
		                	case Blend.device.CONNECTION_STATUS.CELL_2G:
		                		$("#network",dom).removeClass().addClass("network g2");
		                		break;
		                	case Blend.device.CONNECTION_STATUS.CELL_4G:
		                		$("#network",dom).removeClass().addClass("network g4");
		                		break;
		                	case Blend.device.CONNECTION_STATUS.CELL:
		                		$("#network",dom).removeClass().addClass("network cell");
		                		break;	
		                	case Blend.device.CONNECTION_STATUS.ETHERNET:
		                		$("#network",dom).removeClass().addClass("network ethernet");
		                		break;
		                }
		                $("#networktype",dom).text(data);
					}
				var fail = function(data){
		                $("#api",dom).val(JSON.stringify(data));
					}			
			$("#status",dom).click(function(event){
				event.preventDefault();
				Blend.device.connection.get({
					onsuccess: success,
					onfail: fail
				});
			});
			$("#start",dom).click(function(event){
				event.preventDefault();
				if($(this).hasClass("button-white")){
					Blend.device.connection.stopListen();
					$(this).removeClass('button-white').text('开始监听');
				}else{
					Blend.device.connection.startListen({
						onsuccess: success,
						onfail: fail
					});
					$(this).addClass('button-white').text('停止监听');
				}
			});			
		},
		media:function(dom){

			var result;

			$("#video").click(function(event){
				var link = result.fullPath ? result.fullPath : '';
				Blend.mbaas.mediaplayer.play(link,{
					onsuccess:function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					}
				});
			});

			$("#audio").click(function(){
				var link = result.fullPath ? result.fullPath : '';
				Blend.device.media.operateMedia(link, 'play', {
					onsuccess:function(){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail:function(){
						$("#api",dom).val(JSON.stringify(data));
					}
				})
			});

			$("#recordvideo,#recordaudio").click(function(){
				var mediaType = '';
				if($(this).attr('id') === 'recordvideo'){
					mediaType = Blend.device.MEDIA_TYPE.VIDEO;					
				}else{
					mediaType = Blend.device.MEDIA_TYPE.AUDIO;
				}
									
				Blend.device.media.captureMedia({
					onsuccess: function(data){
						result = data;
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					mediaType: mediaType,
					source: 0,
					quality: 80
				});
			});
		},
		camera:function(dom){
			$("#imageurl",dom).click(function(){
				Blend.device.media.captureMedia({
					onsuccess:function(data){
						$("#api",dom).val(JSON.stringify(data));
						$("#media",dom).attr({src:"data:"+data.type+";base64,"+data.base64});
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					mediaType: Blend.device.MEDIA_TYPE.IMAGE,
					source: 0,
					base64: true,
					quality: 90,
					width: 260,
					height: 280
				});
			});
			$("#imagebase64",dom).click(function(){
				Blend.device.media.captureMedia({
					onsuccess:function(data){
						$("#api",dom).val(JSON.stringify(data));
						$("#media",dom).attr({src:"data:"+data.type+";base64,"+data.base64});
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					mediaType: Blend.device.MEDIA_TYPE.IMAGE,
					source: 1,
					base64: true,
					quality: 90,
					width: 260,
					height: 280
				});
			});			
		},
		globalization:function(dom){
			Blend.device.globalization.getlocale({
				onsuccess: function(data){
					$("#api",dom).append(JSON.stringify(data));
					$("#locale").text(data);
					Tips.show(dom,{text:"获取成功"});
				},
				onfail: function(data){
					$("#api",dom).append(JSON.stringify(data));
				}
			});

/*			Blend.device.globalization.getPreferredLanguage({
				onsuccess: function(data){
					$("#api",dom).append(JSON.stringify(data));
					$("#language").text(data);
				},
				onfail: function(data){
					$("#api",dom).append(JSON.stringify(data));
				}
			});	*/		
		},
		intent:function(dom){
			var intent = {

		    };

		    var intent_baidumap = {
		        action: "android.intent.action.VIEW",
		        uri: "geo:38.899533,-77.036476"    	
		    }


		    var intent_baidubrowser = {
		        action: "android.intent.action.VIEW",
		        uri: "http://www.cloudajs.org/",
		        calss: ['com.android.browser','com.android.Browser.BrowserActivity']	
		    }

		    var intent_player = {
		        action: "android.intent.action.VIEW",
		        uri: "http://bcs.duapp.com/jaketestbucket/BaiduXCloud%20v03.mp4?sign=MBO:B3cd3aed3bca93d78135c99c2ab8b5ce:3rCc42yqHZu6lOn7uuucEMSQzI8%3D",
		        type: "video/*"		    	
		    }

		    $("#baidumap, #baidubrowser, #videoplayer",dom).click(function(){
			    if($(this).attr('id') === 'baidumap'){
			    	intent = intent_baidumap;
			    } else if($(this).attr('id') === 'baidubrowser'){
			    	intent = intent_baidubrowser;
			    }else{
			    	intent = intent_player
			    }
			    Blend.device.activity.start({
			    	onsuccess: function(data){
			    		$("#api",dom).val(JSON.stringify(data));
			    	},
			    	onfail: function(data){
			    		$("#api",dom).val(JSON.stringify(data));
			    	},
			    	intent:intent
			    });
		    });
		},
		device:function(dom){
			var options = {
				onsuccess:function(data){
					$("#info",dom).val(JSON.stringify(data));
				},
				onfail: function(data){
					$("#api",dom).val(JSON.stringify(data));
				}			
			}
			$("#imei",dom).click(function(){
				Blend.device.device.getImei(options);
			});
			$("#model",dom).click(function(){
				Blend.device.device.getDeviceModelName(options)
			});
			$("#version",dom).click(function(){
				Blend.device.device.getSysVersion(options)
			});
			$("#screen",dom).click(function(){
				Blend.device.device.getScreenSize(options)
			});						
		},
		explorer:function(dom){
			$("#upload",dom).click(function(){
				$("#load").css({width:0});
				$("#loadval").text("0%");
				Blend.device.media.captureMedia({
					onsuccess:function(data){
						var target = 'http://bcs.duapp.com/cloudaapi/filetest';
						var options = {
							onsuccess:function(data){
								$("#api",dom).val(JSON.stringify(data));
							},
							onfail: function(data){
								$("#api",dom).val(JSON.stringify(data));
							},
							onprogress: function(data){
								var width = Math.ceil((data.loaded/data.total)*100)+'%';
								$("#load").css({width:width});
								if(width === '100%'){
									$("#loadval").text('上传成功');
									Tips.show(dom,{text:"上传成功"});
								}else{
									$("#loadval").text(width);
								}
							},
							uploadKey: "1111"
						}
						Blend.device.fs.post(data.fullPath, target, options);
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					mediaType: Blend.device.MEDIA_TYPE.IMAGE,
					source: 1,
					base64: true,
					quality: 90,
					width: 260,
					height: 280
				});	
			})
		},
		qrcode:function(dom){
			$("#qrcode,#barcode").click(function(){
				if($(this).attr('id') === 'qrcode') 
					type = Blend.device.QR_TYPE.QRCODE;
				else
					type = Blend.device.QR_TYPE.BARCODE;
				Blend.device.qr.startCapture({
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
						$("#info",dom).val("返回成功:"+JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					type: type
				});
			})
		},
		position:function(dom){
			var options = {
				onsuccess: function(data){
					// 百度地图API功能
					var map = new BMap.Map("allmap");
					map.centerAndZoom(new BMap.Point(data.longitude, data.latitude), 20); 
					map.enableScrollWheelZoom(true);

					//坐标转换完之后的回调函数
					translateCallback = function (point){
						map.clearOverlays(); 
						var marker = new BMap.Marker(point);
						map.addOverlay(marker);
						map.panTo(point); 
						map.setCenter(point);
					}
					BMap.Convertor.translate(gpsPoint,0,translateCallback);     //真实经纬度转成百度坐标				
				},
				onfail: function(data){
					$("#api",dom).val(JSON.stringify(data));
				}			
			}
			Blend.device.geolocation.get(options);
		},
		contact:function(dom){
			var fields = ['*'];
     		var filter = '';
			Blend.device.contact.find(fields,{
				onsuccess: function(data){
					var html = [];
					var temp = '';
					for(var i in data){
						if(data && data[i] && data[i].displayName&&data[i].phoneNumbers && data[i].phoneNumbers[0]){
							temp = '<li><p>'+data[i].displayName+'</p><p>'+data[i].phoneNumbers[0].value+'</p></li><li class="split"></li>';
							html.push(temp);
						}
					}
					$("#api",dom).val(JSON.stringify(data));
					$('#contact').append(html.join(''));
				},
				onfail: function(data){
					$("#api",dom).val(JSON.stringify(data));
				},
				filter: filter,
				multiple: true
			});
		},
		voice:function(dom){
			var ak = "8MAxI5o7VjKSZOKeBzS4XtxO";
			var sk = "Ge5GXVdGQpaxOmLzc8fOM8309ATCz9Ha";
			var pid = "1536";

			$("#voice",dom).click(function(){
				Blend.mbaas.vtt.init(ak,sk,pid);
				Blend.mbaas.vtt.showDialog({
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					speechMode: Blend.mbaas.VTT_SPEECHMODE.SEARCH,
					uuid: 'abc-abc5151',
					enablePower: true
				})
			});
			$("#zh",dom).click(function(){
				var word = $("#word").val()?$("#word").val():'请输入';
				Blend.mbaas.tts.say(word,{
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					type: Blend.mbaas.tts.TYPE_DICT_ZH
				});
			});
			$("#en",dom).click(function(){
				var word = $("#word").val()?$("#word").val():'请输入'; 
				Blend.mbaas.tts.say(word,{
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					type: Blend.mbaas.tts.TYPE_DICT_US
				});
			});
		},
		compass:function(dom){
			function rotate(deg,dom){
				var rt = "rotate(" + deg + "deg)";
				$('#pan',dom).css({
					"transform": rt,
					"-webkit-transform": rt,
					"-ms-transform": rt,
					"-o-transform": rt
				});
			}
			$("#start",dom).click(function(){
				if ($(this).hasClass('button-white')) {
					Blend.device.compass.stopListen();
					$(this).text('开始').removeClass("button-white");
				}else{
					Blend.device.compass.startListen({
						onsuccess: function(data){
							rotate(data.magneticHeading,dom);
							$("#deg").text(data.magneticHeading);
							$("#api",dom).val(JSON.stringify(data));
						},
						onfail: function(data){
							$("#api",dom).val(JSON.stringify(data));
						},
						frequency: 2000
					});
					$(this).text('停止').addClass("button-white");
				}
			});		
		},
		recognition:function(dom){
			var uid = "123456";
			$("#register",dom).click(function(){
				Blend.mbaas.face.register(uid,{
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
						Tips.show(dom,{text:"注册成功"});
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
						Tips.show(dom,{text:"注册失败"})
					}
				})
			});
			$("#face",dom).click(uid,function(){
				Blend.mbaas.face.verify(uid,{
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
						Tips.show(dom,{text:"识别通过"});
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
						Tips.show(dom,{text:"识别失败"});
					}
				})				
			});
			$("#blink",dom).click(uid,function(){
				Blend.mbaas.face.checkBlink(uid,{
					onsuccess: function(data){
						Tips.show(dom,{text:"眨眼了！"});
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						Tips.show(dom,{text:"火眼金睛"});
						$("#api",dom).val(JSON.stringify(data));
					}
				})
			});
		},
		accelerator:function(dom){
			$("#start",dom).click(function(){
				if($(this).hasClass('button-white')){
					Blend.device.accelerometer.stopListen({
						onsuccess: function(){
							$("#api",dom).val(JSON.stringify(data));
						}
					});
					$("#start").text('开始加速').removeClass('button-white');
				}else{
					Blend.device.accelerometer.startListen({
						onsuccess: function(data){
							$("#x",dom).text(data.x);
							$("#y",dom).text(data.y);
							$("#z",dom).text(data.z);
							$("#api",dom).val(JSON.stringify(data));
							that.attr('disabled',false);
						},
						onfail: function(data){
							$("#api",dom).val(JSON.stringify(data));
						},
						frequency: 2000
					});
					$("#start").text('停止加速').addClass('button-white');
				}
			});		
		},
		capture:function(dom){
			$("#captureshare",dom).click(function(){
				Blend.device.screen.shareScreen({
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					}
				})
			});
			$("#capture",dom).click(function(){
				Blend.device.screen.captureScreen({
					onsuccess: function(data){
						$("#media").attr({src:"data:image/png;base64,"+data});
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					}
				})
			});
		},
		account:function(dom){
			$("#login",dom).click(function(){
				Blend.mbaas.account.login({
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					// redirect_uri: "oob",
					redirect_uri: "http://blenddemo.duapp.com/other/redirect.html",
					login_mode:1,
					login_type:"sms",
				})
			});
		},
		pay:function(dom){
			$("#pay",dom).click(function(){

				var PARTNER_ID = "qazxswe";
			    var options1 = {
			    	onsuccess:function(data){
				        alert('success '+JSON.stringify(data));
				    },
				    onfail:function(data){
				    	alert('fail '+JSON.stringify(data));
				    }
			    };
			    
			  	clouda.mbaas.pay.init(PARTNER_ID,options1);

				var orderInfo =document.getElementById("orderinfo").value; 
			   
			    var successCallback = function(resultText) {
			    	alert(resultText);
			    };
		      	var errorCallback  = function(code) {
		        	alert("error dopay, errcode = " + code);
		      	};
			    var options2 = {};
		      	options2.orderInfo = orderInfo;
		      	options2.showdDialog = true;
		      	options2.onsuccess = function(){};
		      	options2.onfail = function(){};
			      
			    clouda.mbaas.pay.doPay(options2);
			});
		},
		share:function(dom){
			$('#share',dom).click(function(){
				var content = $("#text").val();
				Blend.mbaas.socialshare.callShare({
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					mediaType: 'all',
					content: content,
					linkUrl: 'http://clouda.com/blend/introduction/introduction',
					imageUrl: 'http://www.baidu.com/img/bdlogo.png'
				});	
			})		
		},
		message:function(dom){
			$("#unicast",dom).click(function(){
				Blend.mbaas.push.registerUnicast({
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					}
				});
			});
			$("#multicast",dom).click(function(){
				Blend.mbaas.push.registerMulticast({
					tag: 'blendDemo',
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));						
					}
				});
			});
			$("#unregisterUnicast",dom).click(function(){
				Blend.mbaas.push.unregisterUnicast({
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(){
						$("#api",dom).val(JSON.stringify(data));
					}
				});
			});
			$("#unregisterMulticast",dom).click(function(){
				Blend.mbaas.push.unregisterMulticast({
					tag: 'blendDemo',
					onsuccess: function(){

					},
					onfail: function(){
						
					}
				});
			});			
		},
		layer:function(dom){
			// newlayer
			$("#newlayer",dom).click(function(){
				new Blend.ui.Layer({
					// id:"layer",
					url:"samples/layer.html",
					active:"true",
				});
				return false;
			});
		},
		layergroup:function(dom){
			var tabs = new Blend.ui.LayerGroup({
                id: "tab",
                layers: [{
                    id: 'group1',
                    url: 'samples/group1.html',
                    "active":true,
                    'autoload': true,
                    "pullToRefresh":true,
                    "pullBgColor":"ff0000",
                    "pullText":"下拉刷新",
                    "loadingText":"更新中...",
                    "releaseText":"释放更新"
                }, {
                    id: 'group2',
                    url: 'samples/group2.html',
                        
                    'autoload': true
                }, {
                    id: 'group3',
                    url: 'samples/group3.html',
                    'autoload': true
                }],
                onshow: function(event) {
                    var id = event['detail'];
                    $(".buttons-row a").removeClass('active');
                    $("#" + id).addClass('active');
                    // $("#navStyle").removeClass().addClass("ls"+ $("#" + id).index())
                },
                
                left: 0,
                top: 100
            });
			$(".buttons-row a").on("touchend",function(e) {
                // alert("in");
                e.preventDefault();
                tabs.active(this.id);
                return false;
            });
		},
		slider:function(dom){

		}
	}

})(this);

//视图类
+(function(win){
	var View = function(selector){

	}
	win.View = View;
	View.prototype = {
		init:function(){

		},
		render:function(){

		}
	}
})(this);

//--------程序入口--------
(function(){
	
	"use strict";

	Blend.lightInit({
	    ak:"vm84NzKXo6SzFWj5xu7BsCia", //轻应用apikey，请参考《获取API Key》文档
	    module:[]
	});

	document.addEventListener("blendready",function(){
		Blend.ui.layerInit("0",function(dom){
		    var herfLayer = [];
		    $(".home_link",dom).on("click",function(e){
		        e.preventDefault();
		        var id = $(this).attr('data-id');
		        if(herfLayer[id]){
		            herfLayer[id].in();
		        }else{
		            herfLayer[id] = new Blend.ui.Layer({
		                "id" : id,
		                "url" : this.href,
		                "active" :true
		            });
		        }
		    });
		});
		var samples = new Sample();
		for(var i in samples){
			Blend.ui.layerInit(i,samples[i]);
		}
	});

	//window注册登录成功回调
	window.loginSuccessCallback = function(data){
		alert("登录成功,5秒后回到登录界面");
		setTimeout(function(){
			Blend.mbaas.account.closeLoginDialog();
		},5000);
	}
})();