var HOST = "http://192.168.210.158:1031/";
//var HOST_img = "http://192.168.210.158:1032/";

var ADGetPeoplesUrl = 'api/AD/getstars';
var ADGetEventsUrl = 'api/AD/getevents';
var ADGetArticlesUrl = 'api/AD/geteventarticles';
var ADPostpublishUrl = 'api/AD/publish';
var ADPostpublishUrl = 'api/AD/publish';
var ADGetnewsCountUrl = 'api/HotNews/getzxcount';


var Setting = {method: 'GET',data:''}
function Ajax(setting)
{ 
     var p = new Promise((resolve,reject)=>{
         var props = {
            //请求方式
            type : setting.method,
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : HOST + setting.url , 
            //请求成功
            success : function(result) {
                if(typeof result == 'object')
                {
                    if(result.code == 200)
                    {
                        resolve(result.data)
                    }else{
                        reject(result.errmsg)
                    }
                }else{
                    resolve(result);
                }
                
                
            },
            //请求失败，包含具体的错误信息
            error : function(e){  
                reject(e.statusText);
            } 

        }
        if(setting.data)
        {
            //props.data = JSON.stringify(setting.data);
            if(typeof setting.data == 'object')
            {
                props.data = setting.data;
            }else{
                props.data = JSON.stringify(setting.data);
            }
            

        }
        $.ajax(props);
     })

     return p;
     
}
//获取展示的明星集合
function fetchPeoples()
{
    var setting = $.extend({},Setting,{ url:ADGetPeoplesUrl});
    return Ajax(setting);

}
//明星相关的事件
function fetchEvents(name)
{
    var setting = $.extend({},Setting,{ url:ADGetEventsUrl,data:{starName:name}});
    return Ajax(setting);

}
//生成的文章列表
function fetchArticles(name,ev)
{
    var setting = $.extend({},Setting,{ url:ADGetArticlesUrl,data:{starName:name,eventName:ev}});
    return Ajax(setting);

}
//发布到外网平台
function SetPublish(articleId)
{
    var setting = $.extend({},Setting,{method: 'POST', url:ADPostpublishUrl,data:articleId});
    return Ajax(setting);

}

//发布到外网平台
function fetchCount(keyword)
{
    var setting = $.extend({},Setting,{ url:ADGetnewsCountUrl,data:{'keyword':keyword}});
    return Ajax(setting);

}