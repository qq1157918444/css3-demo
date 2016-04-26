//step1:翻面控制
function turn(elem){
    var cls = elem.className;
    var n = elem.id.split("_")[1];
    if(!(/photo-center/.test(cls))){
        return rsort(n);
    }
    if( /photo_front/.test( cls )){
        cls = cls.replace(/photo_front/,"photo_back");
        g("#nav_"+n).className += " i_back ";
    }else{
        cls = cls.replace(/photo_back/,"photo_front");
        g("#nav_"+n).className = g("#nav_"+n).className.replace(/\s*i_back\s*/," ")
    }
    return elem.className = cls;
}

//step4:输出所有海报
var data = data;
function addPhotos(){
    var template = g("#wrap").innerHTML;
    var html = [];
    var nav = [];
    for(var i in data){
        var _html = template
            .replace("{{index}}", i)
            .replace("{{img}}", data[i].img)
            .replace("{{caption}}", data[i].caption)
            .replace("{{desc}}", data[i].desc);
        html.push(_html);
        nav.push('<span class="i" id="nav_'+i+'" onclick="turn(g(\'#photo_'+i+'\'))">&nbsp;</span>');
    }
    html.push("<div class='nav'>"+nav.join('')+"</div>");
    g("#wrap").innerHTML  = html.join("");
    rsort(random([0,data.length]))
}
addPhotos();
//step5:排序海报
function rsort(n){
    console.log(n)
    var _photo = g(".photo");
    var photos = [];
    for(var i = 0;i<_photo.length;i++){
        _photo[i].className = _photo[i].className.replace(/\s*photo-center\s*/," ");
        _photo[i].className = _photo[i].className.replace(/\s*photo_front\s*/," ");
        _photo[i].className = _photo[i].className.replace(/\s*photo_back\s*/," ");
        _photo[i].className +=" photo_front ";
        _photo[i].style.left="";
        _photo[i].style.top="";
        _photo[i].style["transform"] = _photo[i].style["-webkit-transform"]="rotate(360deg) scale(1.3)";
        photos.push(_photo[i])
    }

    var photo_center  = g("#photo_"+n);
    photo_center.className += " photo-center ";
    photo_center = photos.splice(n,1)[0];
    //把海报分为左右俩个区域
    var photos_left = photos.splice(0,Math.ceil(photos.length/2));
    var photos_right = photos;

    var ranges = range();
    for(var p in photos_left){
        var photo = photos_left[p];
        photo.style.left = random(ranges.left.x)+ "px";
        photo.style.top = random(ranges.left.y)+"px";
        photo.style["transform"] = photo.style["-webkit-transform"] = "rotate("+random([-150,150])+"deg) scale(1)"
    }
    for(var q in photos_right){
        var photo = photos_right[q];
        photo.style.left = random(ranges.right.x)+ "px";
        photo.style.top = random(ranges.right.y)+"px";
        photo.style["transform"] = photo.style["-webkit-transform"] = "rotate("+random([-150,150])+"deg) scale(1)"
    }
    var navs = g(".i");
    for(var j = 0;j<navs.length;j++){
        navs[j].className = navs[j].className.replace(/\s*i_current\s*/," ");
        navs[j].className = navs[j].className.replace(/\s*i_back\s*/," ");
    }
    console.log(n)
    g("#nav_"+n).className += " i_current ";
    console.log(photos_left.length,photos_right.length)
}
//获取元素通用函数
function g(selector){
    var method = selector.substr(0,1) == "." ? "getElementsByClassName":"getElementById";
    return document[method](selector.substr(1))
}
//随机生成一个值，有取值范围
function random(range){
    var max = Math.max(range[0],range[1]);
    var min = Math.min(range[0],range[1]);
    var diff = max - min;//差值 [1,6]->5

    var number  = Math.ceil((Math.random()*diff+min));//[0,1) -> [0,5) ->[1,6)
    return number;
}
//计算左右分区的范围
function range(){
    var range = {
        left:{
            x:[],
            y:[]
        },
        right:{
            x:[],
            y:[]
        }
    };
    var wrap = {
        w:g("#wrap").clientWidth,
        h:g("#wrap").clientHeight
    };
    var photo = {
        w:g(".photo")[0].clientWidth,
        h:g(".photo")[0].clientHeight
    };
    range.left.x = [0-photo.w, wrap.w/2 - photo.w/2];
    range.left.y = [0-wrap.h,wrap.h];
    range.right.x =[wrap.w/2 + photo.w/2,wrap.w + photo.w];
    range.right.y =[0-wrap.h,wrap.h];
    console.log("左右分区的范围:",range)
    return range;
}