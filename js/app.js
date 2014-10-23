/*
* @since 2014/10/13
* @author terry
*/

//Demo模型
(function(win){
	var Sample = function(){

	}

	win.Sample = Sample;
//注册全局事件
	//Blend.ui.getLayerId()
	$(document).on("click","a.back",function(){
        Blend.ui.get(Blend.ui.getLayerId()).out();
        return false;
    });

	var registerEvent = function(dom,layer){
		layer = layer||new Blend.ui.Layer({});
        // $("a.back",dom).click(function(){
        //     layer.out();
        //     return false;
        // });

        $(".icon_down",dom).click(function(e){
			$(this).closest('.screen').hide();
			$(this).closest('.screen').next('.screen').show();
		});
		/*
		document.addEventListener('touchmove',function(){
			if (event.targetTouches.length == 1) {
		　　	event.preventDefault();// 阻止浏览器默认事件，重要 
		        var touch = event.targetTouches[0];
		        $(".screen:visible").hide().siblings().show();
		    }
		})
		*/
	}

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
	        var mylayer = blend.ui.get("battery");
			registerEvent(dom,mylayer);
		},
		network:function(dom){
			$("#status",dom).click(function(event){
				event.preventDefault();
				Blend.device.connection.get({
					onsuccess:function(data){
		                $("#api",dom).val(JSON.stringify(data));
		                $("#networktype",dom).text(data);
					},
					onfail: function(data){
		                $("#api",dom).val(JSON.stringify(data));
					}
				});
			});
			registerEvent(dom,blend.ui.get("network"));
		},
		media:function(dom){
			$("#take,#photo").click(function(event){
				var id = $(this).attr('id');
				var mediaType = Blend.device.MEDIA_TYPE.IMAGE
				if(id === 'take'){ 
					source = 0;
				}else{ 
					source = 1
				}
				if(id === 'recordvideo'){
					mediaType = Blend.device.MEDIA_TYPE.VIDEO;
					source = 0;
				}else if(id === 'video'){
					mediaType = Blend.device.MEDIA_TYPE.VIDEO;
					source = 1;
				}
				Blend.device.media.captureMedia({
					onsuccess:function(data){
						$("#api",dom).val(JSON.stringify(data));
						$("#media",dom).attr({src:"data:"+data.type+";base64,"+data.base64});
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					mediaType: mediaType,
					source: source,
					base64: true,
					quality: 90,
					width: 260,
					height: 280
				});
			});
			registerEvent(dom,blend.ui.get("media"));
		},
		camera:function(dom){
			$("#imageurl",dom).click(function(){
	            clouda.device.media.captureMedia({
	                mediaType : 0,
	                source : 0,
	                onfail : function(err){
	                    alert(JSON.stringify(err));
	                },
	                onsuccess : function(mediaFile){
	                    alert(JSON.stringify(mediaFile));
	                } 
	            });
			});
			$("#imagebase64",dom).click(function(){
	            clouda.device.media.captureMedia({
	                mediaType : 0,
	                source : 0,
	                onfail : function(err){
	                        alert(JSON.stringify(err));
	                },
	                onsuccess : function(mediaFile){
	                        //返回读取到的图片文件的本地全信息
	                        alert(JSON.stringify(mediaFile));
	                } 
	            });
			});			
            registerEvent(dom,blend.ui.get("camera"));
		},
		geolocaiton:function(dom){
			registerEvent(dom,blend.ui.get("geolocaiton"));
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
		    registerEvent(dom,blend.ui.get("intent"));
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
			registerEvent(dom,blend.ui.get("device"));
		},
		explorer:function(dom){
			$("#upload",dom).click(function(){
				var path = $("[name=file]").val();
				var target = $("[name=url]").val();
				var options = {
					onsuccess:function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					}
				}
				Blend.device.fs.post(path,target,options);
			})
			registerEvent(dom,blend.ui.get("explorer"));
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
			registerEvent(dom,blend.ui.get("qrcode"));
		},
		position:function(dom){
			var options = {
				onsuccess: function(data){
					var params = {
						location: data.longitude+','+data.latitude,
					};
					$("[lbs-map']",dom).attr({center:params.location});
					$("[lbs-poi']",dom).attr({location:params.location});
					$("#api",dom).val(JSON.stringify(data));
				},
				onfail: function(data){
					$("#api",dom).val(JSON.stringify(data));
				}			
			}
			Blend.device.geolocation.get(options);
			registerEvent(dom,blend.ui.get("position"));
		},
		contact:function(dom){
			var fields = ['name'];
			Blend.device.contact.find(fields,{
				onsuccess: function(data){
					$("#api",dom).val(JSON.stringify(data));
				},
				onfail: function(data){
					$("#api",dom).val(JSON.stringify(data));
				},
				filter: '',
				multiple: true
			});
			registerEvent(dom,blend.ui.get("contact"));
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
			registerEvent(dom,blend.ui.get("voice"));
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
				Blend.device.compass.startListen({
					onsuccess: function(data){
						rotate(data.magneticHeading,dom);
						$("#deg").text(data.magneticHeading);
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					frequency: 100
				});
			});
			$("#stop").click(function(){
				Blend.device.compass.stopListen();
			});			
			registerEvent(dom,blend.ui.get("compass"));
		},
		recognition:function(dom){
			var uid = "demo_user";
			$("#register",dom).click(function(){
				alert('registerEvent');
				clouda.mbaas.facerecognition.reister(uid,{
					onsuccess: function(data){
						alert(1);
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						alert(2);
						$("#api",dom).val(JSON.stringify(data));
					}
				})
			});
			$("#face",dom).click(uid,function(){
				clouda.mbaas.facerecognition.verify(uid,{
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					}
				})				
			});
			$("#blink",dom).click(uid,function(){
				clouda.mbaas.facerecognition.checkBlink(uid,{
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					}
				})
			});
			registerEvent(dom,blend.ui.get("recognition"));
		},
		accelerator:function(dom){
			$("#start",dom).click(function(){
				Blend.device.accelerometer.startListen({
					onsuccess: function(data){
						$("#x",dom).text(data.x);
						$("#y",dom).text(data.y);
						$("#z",dom).text(data.z);
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					frequency: 2000
				});
			});
			$("#stop").click(function(){
				Blend.device.accelerometer.stopListen();
			});			
			registerEvent(dom,blend.ui.get("accelerator"));
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
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					}
				})
			});
			$("#share",dom).click(function(){
				var base64imageData = '';
				Blend.device.screen.shareImage(base64imageData,{
					onsuccess: function(data){
						$("#api",dom).val(JSON.stringify(data));
					},
					onfail: function(data){
						$("#api",dom).val(JSON.stringify(data));
					}
				});
			});
			registerEvent(dom,blend.ui.get("capture"));
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
					redirect_uri: "",
					mediaType: '',
					scope: '',
					authorize_url: ''
				})
			});
			$("#sign",dom).click(function(){
			});
			$("#logout",dom).click(function(){

			});
			registerEvent(dom,blend.ui.get("account"));
		},
		pay:function(dom){
			registerEvent(dom,blend.ui.get("pay"));
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
			registerEvent(dom,blend.ui.get("share"));
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
			registerEvent(dom,blend.ui.get("message"));
		},
		
		layer:function(dom){
			// newlayer
			// $("#newlayer",dom).click(function(){
			// 	new Blend.ui.Layer({
			// 		// id:"layer",
			// 		url:"samples/layer.html",
			// 		active:"true",
			// 	});
			// 	return false;
			// });

			registerEvent(dom,blend.ui.get("layer"));
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
                    "ptrFn":function(){
                        console.log("refresh1 callback");
                        setTimeout(function(){
                            
                            Blend.ui.layerStopRefresh();

                        },800);
                    }
                }, {
                    id: 'group2',
                    url: 'samples/group2.html',
                        
                    'autoload': true
                }, {
                    id: 'group3',
                    url: 'samples/group3.html',
                    'autoload': true,
                    "pullToRefresh":true,
                    "pullText":"下拉刷新：）",
                    "loadingText":"更新中...",
                    "releaseText":"释放更新^_^",
                    "ptrFn":function(){
                        console.log("refresh3 callback");
                        setTimeout(function(){
                            
                            Blend.ui.layerStopRefresh();

                        },500);
                    }
                    
                
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
            // $("a.back",dom).on("click",function(){
            //     Blend.ui.get("layergroup").out();
            //     return false;
            // });
			
			registerEvent(dom,blend.ui.get("layergroup"));
		},
		slider:function(dom){
			// var blend = Blend.ui;
			// var mylayer = Blend.ui.get("Slider");

	        
	        var Slider = Blend.ui.Slider;
	        var images = [],slider;
	        $(".page-content img",dom).each(function(i, n) {
	            images.push({
	                url: $(this).attr("src")
	            });
	        }).click(function(){
	            if (!slider) {
	                slider = new Slider({
	                    "id": "test",
	                    "bgColor": "#cccccc",
	                    "images": images,
	                    hasIndicator: true,
	                    inactiveColor: "#888888",
	                    activeColor: "#ff0000",
	                    "tap": function(e) {
	                    	slider.destroy();
	                    	slider=undefined;
	                        // history.back();
	                    },
	                    'slide': function(e) {
	                        console.log(e.data.index)
	                    }
	                });
	            } else {
	            	slider.in();
	                // slider && slider.destroy();
	            }
	        });
			registerEvent(dom,blend.ui.get("slider"));

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
	"use strict"
	// Blend.lightInit({
	//     ak:"xxxx", //轻应用apikey，请参考《获取API Key》文档
	//     module:["battery","blendui"]//根据需要添加模块到数组中即可
	// });

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
})();