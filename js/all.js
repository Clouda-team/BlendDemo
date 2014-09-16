(function () {
    Blend.lightapp("TO REPLACE ONLINE AK");

    window.blend=Blend.ui;
    
    var layer = blend.Layer;

    blend.layerInit("battery",function(dom){
        console.log("battery page......");
        
        var mylayer = blend.get("battery");
        
        $("a.back",dom).click(function(){
            console.log("click.... back... out....")
            mylayer.out();
            return false;
        });

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
    
    blend.layerInit("network",function(dom){
        var mylayer = blend.get("network");
        
        $("a.back",dom).click(function(){
            console.log("click.... back... out....")
            mylayer.out();
            return false;
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
