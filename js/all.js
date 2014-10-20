(function () {
    Blend.lightapp("TO REPLACE ONLINE AK");

    window.blend=Blend.ui;
    
    var layer = blend.Layer;

    $(document).bind("click","a.back",function(){
        console.log("click.... back... out....")
        mylayer.out();
        return false;
    });

    //activity -- contact
    blend.layerInit("calender",function(dom){
        var mylayer = blend.get("calender");

        

        function onsuccess(){
            $("#apiresult",dom).val(JSON.stringify(data));
        }

        function onfail(){
            $("#apiresult",dom).val(JSON.stringify(errno));
        }

        function setupCalender() {//新建日历
            var intent = {
                action: "android.intent.action.EDIT",
                type: "vnd.android.cursor.item/event",
                title: "Some title",
                description: "Some description",
                beginTime: 1384676947757,
                endTime: 1384680547757
            };
            Blend.device.activity.start({onsuccess:onsuccess,onfail:onfail,intent:intent});
        }

        setupCalender();

    });

    //activity -- sms
    blend.layerInit("sms",function(dom){
        var mylayer = blend.get("sms");

        

        function onsuccess(){
            $("#apiresult",dom).val(JSON.stringify(data));
        }

        function onfail(){
            $("#apiresult",dom).val(JSON.stringify(errno));
        }

        function sendMessage() {//发送短信
            var intent = {
                action: "android.intent.action.SENDTO",
                uri: "smsto: 18600872789",
                sms_body: "How are you doing?"
            };
            Blend.device.activity.start({onsuccess:onsuccess,onfail:onfail,intent:intent});
        }

        sendMessage();
    });

    //activity -- playerVideo
    blend.layerInit("video",function(dom){
        var mylayer = blend.get("video");

        

        function onsuccess(){
            $("#apiresult",dom).val(JSON.stringify(data));
        }

        function onfail(){
            $("#apiresult",dom).val(JSON.stringify(errno));
        }

        function playVideo() {//播放视频
            var intent = {
                action: "android.intent.action.VIEW",
                uri: "http://bcs.duapp.com/jaketestbucket/BaiduXCloud%20v03.mp4?sign=MBO:B3cd3aed3bca93d78135c99c2ab8b5ce:3rCc42yqHZu6lOn7uuucEMSQzI8%3D",
                type: "video/*"
            };
            Blend.device.activity.start({onsuccess:onsuccess,onfail:onfail,intent:intent});
        }

        playVideo();
    });

    // 电池
    blend.layerInit("battery",function(dom){
        console.log("battery page......");
        
        var mylayer = blend.get("battery");
        
        

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
                
                $("#apiresult",dom).val(JSON.stringify(data));
                
                var val = data.level;
                if(val >=0 && val <= 100){ showLevel(val);}
                
            },onfail:function(errno){
                $("#apiresult",dom).val(JSON.stringify(errno));
            }
        });

        
    });

    //network
    blend.layerInit("network",function(dom){
        var mylayer = blend.get("network");
        
        

        Blend.device.connection.get({
            onsuccess:function(data){
                $("#apiresult",dom).val(JSON.stringify(data));

            },onfail:function(errno){
                $("#apiresult",dom).val(JSON.stringify(errno));
            }
        });

    });

    //device
    blend.layerInit("device",function(dom){
        var mylayer = blend.get("device");

        

        Blend.device.device.getImei({
            onsuccess:function(data){
                $("#imei_apiresult",dom).val(JSON.stringify(data));

            },onfail:function(errno){
                $("#imei_apiresult",dom).val(JSON.stringify(errno));
            }
        });

        Blend.device.device.getSysVersion({
            onsuccess:function(data){
                $("#system_version_apiresult",dom).val(JSON.stringify(data));

            },onfail:function(errno){
                $("#system_version_apiresult",dom).val(JSON.stringify(errno));
            }
        });

        Blend.device.device.getDeviceModelName({
            onsuccess:function(data){
                $("#model_name_apiresult",dom).val(JSON.stringify(data));

            },onfail:function(errno){
                $("#model_name_apiresult",dom).val(JSON.stringify(errno));
            }
        });

        Blend.device.device.getScreenSize({
            onsuccess:function(data){
                $("#screen_size_apiresult",dom).val(JSON.stringify(data));

            },onfail:function(errno){
                $("#screen_size_apiresult",dom).val(JSON.stringify(errno));
            }
        });

    });

    //file_post   未调通
    blend.layerInit("file_post",function(dom){
        var mylayer = blend.get("file_post");

        

        function onsuccess(){
            $("#apiresult",dom).val(JSON.stringify(data));
        }

        function onfail(){
            $("#apiresult",dom).val(JSON.stringify(errno));
        }

        var path = '/sdcard/111.txt';
        var target = 'http://php.yun.com/test/request.php';   //本地部署的服务
        var onprogress = function(data){
            $("#apiresult",dom).val(JSON.stringify(data));
        }
        var uploadKey = "1111";
        var options = {onsuccess:onsuccess, onfail:onfail, params:{a:1}, uploadKey:uploadKey};
//        clouda.device.fs.post(path, target, options);
        $(".upload",dom).click(function(){
            clouda.device.fs.post(path, target, options);

        });

    });

    //地图定位   --  一直没有返回值，试了以前好使的demo（BlendUI App->Demo->地理定位功能），同样没有返回值
    blend.layerInit("geolocation",function(dom){
        var mylayer = blend.get("geolocation");

        

        Blend.device.geolocation.get({
            onsuccess:function(data){
                $("#apiresult",dom).val(JSON.stringify(data));

            },onfail:function(errno){
                $("#apiresult",dom).val(JSON.stringify(errno));
            }
        });

    });

    //系统语言
    blend.layerInit("globalization",function(dom){
        var mylayer = blend.get("globalization");

        

        Blend.device.globalization.getlocale({
            onsuccess:function(data){
                $("#apiresult",dom).val(JSON.stringify(data));

            },onfail:function(errno){
                $("#apiresult",dom).val(JSON.stringify(errno));
            }
        });

    });


    //媒体录制播放  未调通
    blend.layerInit("media",function(dom){
        var mylayer = blend.get("media");

        

        function onsuccess(){
            $("#apiresult",dom).val(JSON.stringify(data));
        }

        function onfail(){
            $("#apiresult",dom).val(JSON.stringify(errno));
        }

        recordPath = "http://bcs.duapp.com/lishuai/music.mp3";
        recordPath = "/sdcard/baidu/record.mp3";

        clouda.device.media.operateMedia(recordPath,"play",{onsuccess:onsuccess,onfail:onfail});

    });

    //摄像头
    blend.layerInit("camera",function(dom){
        var mylayer = blend.get("camera");

        

        Blend.device.media.captureMedia({
            onsuccess:function(data){
                $("#apiresult",dom).val(JSON.stringify(data));

            },onfail:function(errno){
                $("#apiresult",dom).val(JSON.stringify(errno));
            },mediaType:Blend.device.MEDIA_TYPE.IMAGE //,source:1 //读取图片时加上
        });

    });

    //二维码
    blend.layerInit("QRCode",function(dom){
        var mylayer = blend.get("QRCode");

        

        Blend.device.qr.startCapture({
            onsuccess:function(data){
                $("#apiresult",dom).val(JSON.stringify(data));

            },onfail:function(errno){
                $("#apiresult",dom).val(JSON.stringify(errno));
            },type:Blend.device.QR_TYPE.QRCODE
        });

    });

    
    blend.layerInit("0",function(){

        
        $(document).click(function(e){
            //blend.fire("layercreates","0",{data1:123,data2:[1,2,3]});

            var _layer = window._layer;
            var $t = $(e.target).closest('a');
            if (!$t.length) return true;
            console.log("new layer... id: " + $t.attr("data-id"));
            e.preventDefault();
            window._layer && window._layer.destroy();
            window._layer = new layer({
                "id":$t.attr("data-id"),
                "url": $t.attr('href'),
                "active":true
                ,"afterrender":function(){
                    console.log("onrender...");
                }
                ,"onload":function(event){
                    console.log("onload...");
                }
                ,"changeUrl":function(event){
                    // console.log("onload");
                    console.log(event['url'])
                }
                ,"onhide":function(e){
                    console.log("onhide...")
                }
                ,"ptrFn":function(){
                    setTimeout(function(){
                        console.log("refresh callback");
                        _layer.endPullRefresh();

                    },1500);
                    
                }
            });
            // $(".list-block a:first").click();
           
        });
    });
    

    
})();
