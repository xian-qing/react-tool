/**
 * Created by stone on 2017/6/18.
 */
module.exports = {
    getTime(value){
        var time = new Date(value*1000);
        var y = time.getFullYear();//年
        var m = time.getMonth() + 1;//月
        var d = time.getDate();//日
        var h = time.getHours();//时
        var mm = time.getMinutes();//分
        var s = time.getSeconds();//秒
        //alert(y+"-"+m+"-"+d+" "+h+":"+mm+":"+s)
        return y+"-"+m+"-"+d
    },
    getTimeMMDD(value){
        var time = new Date(value*1000);
        var y = time.getFullYear();//年
        var m = time.getMonth() + 1;//月
        var d = time.getDate();//日
        var h = time.getHours();//时
        var mm = time.getMinutes();//分
        var s = time.getSeconds();//秒
        //alert(y+"-"+m+"-"+d+" "+h+":"+mm+":"+s)
        return m+"月"+d+"日"
    },
    getTimeHHMM(value){
        var time = new Date(value*1000);
        var y = time.getFullYear();//年
        var m = time.getMonth() + 1;//月
        var d = time.getDate();//日
        var h = time.getHours();//时
        var mm = time.getMinutes();//分
        var s = time.getSeconds();//秒
        //alert(y+"-"+m+"-"+d+" "+h+":"+mm+":"+s)
        return h+":"+mm+":"+s
    },
    getTimeAll(value){
        var time = new Date(value*1000);
        var y = time.getFullYear();//年
        var m = time.getMonth() + 1;//月
        var d = time.getDate();//日
        var h = time.getHours();//时
        var mm = time.getMinutes();//分
        var s = time.getSeconds();//秒
        //alert(y+"-"+m+"-"+d+" "+h+":"+mm+":"+s)
        return y+"-"+m+"-"+d+"  "+ h +":"+mm+":"+s
    },
    getTimeAfter(value){
        var nowTime = new Date();
        var endTime = new Date(value * 1000);
        var t = endTime.getTime() - nowTime.getTime();
        var d=Math.floor(t/1000/60/60/24);
        var hour=Math.floor(t/1000/60/60%24);
        var min=Math.floor(t/1000/60%60);
        var sec=Math.floor(t/1000%60);
        if (hour < 10) {
            //hour = "0" + hour;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if(d>0){
            if(d>7){
                return '一周后' ;
            }else {
                return d + "天" + hour + "小时后" ;
            }

        }else {
            return hour + "小时" + min + "分后" ;
        }

    },
    getTimeFilter(dateTimeStamp){
        dateTimeStamp = dateTimeStamp * 1000;
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var year = month * 12;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if(diffValue < 0){return;}
        var yearC = diffValue/year;
        var monthC =diffValue/month;
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;
        var result = '';
        if(yearC>=1){
            result="" + parseInt(yearC) + "年前";
        }else if(monthC>=1){
            result="" + parseInt(monthC) + "月前";
        }
        else if(weekC>=1){
            result="" + parseInt(weekC) + "周前";
        }
        else if(dayC>=1){
            result=""+ parseInt(dayC) +"天前";
        }
        else if(hourC>=1){
            result=""+ parseInt(hourC) +"小时前";
        }
        else if(minC>=1){
            result=""+ parseInt(minC) +"分钟前";
        }else
            result="刚刚";
        return result;
    },
    countdownTime(value){
        var NowTime = parseInt(+new Date()/1000)
        var initTime = value
        if(NowTime < initTime){
            var t = initTime - NowTime;
            var d = Math.floor(t / (24 * 3600));
            var h = Math.floor((t - 24 * 3600 * d) / 3600);
            var m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
            var s = Math.floor((t - 24 * 3600 * d - h * 3600 - m * 60));
            return d + '天' + h + '时' + m + '分' + s + '秒'
        }else {
            return ''
        }

    },
    getArgs(strParame){
        var args = new Object();
        var query;
        if(arguments.length == 2)
            query = arguments[1];
        else
            query = location.search.substring(1);

        var pairs = query.split("&");
        for(var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if (pos == -1) continue;
            var argname = pairs[i].substring(0,pos);
            var value = pairs[i].substring(pos+1);
            value = decodeURIComponent(value);
            args[argname] = value;
        }
        return args[strParame];
    },
    getCookie(c_name) {
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++)
        {
            x=ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x==c_name)
            {
                return unescape(y);
            }
        }
        return null;
    },
    setCookie(c_name, value) {
        var exdays = 30; //360天 修改成30
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value + "; path=/";
    },
    graphQlFn(params,callback){
        /*var url = 'http://www.jggvip.com/api/graphql';
        if(process.env.NODE_ENV !== 'production') {
            url = '/api/graphql'
        }*/
        var url = params.url || '/api/graphql';
        $.ajax({
            url:url,
            type:'post',
            contentType: 'application/json; charset=utf-8',
            dataType:'json',
            data:params.params,
            success:function (res) {
                callback(res)
            }
        })
    },
    carCountAnimate(type,all){
        //type 1 是加 0 是减
        var count  = Number($('.car-count').text());
        if(type == 0){
            if(all==0){
                $('.car-count').text(0)
            }else {
                $('.car-count').text(count-1)
            }
        }else {
            $('.car-count').text(count+1)
        }

        $('.car-count').addClass('rubberBand animated');
        setTimeout(function () {
            $('.car-count').removeClass('rubberBand animated');
        },500)
    },
    addAnimate(x,y){
        let div = document.createElement("div");
        div.style.height = '20px';
        div.style.width = '20px';
        div.style.background = '#ff0059';
        div.style.borderRadius = '15px';
        div.style.position = 'fixed';
        div.style.left = `${x-10}px`;
        div.style.top = `${y-10}px`;
        div.style.color = '#fff';
        div.style.textAlign = 'center';
        div.style.lineHeight = '20px';
        div.style.zIndex = '101';
        div.style.fontSize = '12px';
        div.style.transform = 'all 2s';
        div.innerHTML = '1';
        div.className = 'addAnimatedDiv';
        setTimeout(function () {
            div.className = 'addAnimatedDiv addAnimate';
            div.style.left = `95%`;
            div.style.top = `10px`;
            div.style.height = '5px';
            div.style.width = '5px';
            div.style.overflow = 'hidden';
        },100)

        document.body.appendChild(div);
        setTimeout(function () {
            document.body.removeChild(div)
        },2000)
    },
    getBrowserType(){
        var u = navigator.userAgent, app = navigator.appVersion;
        var isMobile = !!u.match(/AppleWebKit.*Mobile.*/);
        var type;
        var ua = navigator.userAgent.toLowerCase();
        //alert(ua)
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            type = 'wx'
        }else
        if (ua.match(/WeiBo/i) == "weibo") {
            type='wb'
            //在新浪微博客户端打开
        }else
        if (ua.match(/QQ/i) == "qq") {
            type='qq'
            //在QQ空间打开
        }else
        if(!type){
            type = 'others'
        }23
        return type
    },
    wxShare(config,callback){
        //console.log(config)
        var me = this
        var url = window.location.href;
        var shareOption, success, cancel, err;
        shareOption = config.shareOption
        success = config.success || new Function();
        cancel = config.cancel || new Function();
        err = config.err || new Function();
        var url = location.href.split('#')[0];
        var params = JSON.stringify({
            query:'mutation {' +
            'result:getWeiXinToken( url:"'+ url +'"){' +
            'token {' +
            'timeStamp,' +
            'sig,' +
            'noncestr,'+
            'url}}'+
            '}'
        })
        me.graphQlFn({params:params},res=>{
           var e = res.data.result.token;
           //console.log(e)
            wx.config({
                //debug: true,
                appId: 'wxb9189778eef0d1e6', // 必填，公众号的唯一标识
                timestamp: e.timeStamp, // 必填，生成签名的时间戳
                nonceStr: e.noncestr, // 必填，生成签名的随机串
                signature: e.sig,// 必填，签名，见附录1
                jsApiList: [
                    'onMenuShareTimeline',//分享
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'chooseWXPay'
                ] // 必填，
            })
            wx.ready(function () {
                // to friend sick
                wx.onMenuShareTimeline({
                    title: shareOption.title, // 分享标题
                    link: shareOption.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareOption.imgUrl, // 分享图标
                    success: success,
                    cancel: cancel
                });
                // to friend
                wx.onMenuShareAppMessage({
                    title: shareOption.title, // 分享标题
                    desc: shareOption.desc, // 分享描述
                    link: shareOption.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareOption.imgUrl, // 分享图标
                    //type: '', // 分享类型,music、video或link，不填默认为link
                    //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: success,
                    cancel: cancel
                });
                // to qq
                wx.onMenuShareQQ({
                    title: shareOption.title, // 分享标题
                    desc: shareOption.desc, // 分享描述
                    link: shareOption.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareOption.imgUrl, // 分享图标
                    success: success,
                    cancel: cancel
                });
                // to weibo
                wx.onMenuShareWeibo({
                    title: shareOption.title, // 分享标题
                    desc: shareOption.desc, // 分享描述
                    link: shareOption.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareOption.imgUrl, // 分享图标
                    success: success,
                    cancel: cancel
                });
            });
            wx.error(err);
            if(callback){
                callback()
            }
        })
    },
    cnzzFn(){
        var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
        window.document.write(unescape("%3Cspan id='cnzz_stat_icon_1262698390'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s19.cnzz.shareApp/z_stat.php%3Fid%3D1262698390%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));
        window.document.getElementById('cnzz_stat_icon_1262698390').style.display = 'none'
    }

}