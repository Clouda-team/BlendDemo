if(!navigator.userAgent.match(/BlendUI/)){
    document.write('<script src="js/BlendWebUI.js"></script>');
}else{
    document.write('<script src="js/lib/zepto.js"></script>');
    document.write('<script src="js/BlendHybridUI-0.0.4.js"></script>');
}
