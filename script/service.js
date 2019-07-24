var HOST = "192.168.210.158:2000/";
var Setting = {method: 'GET',data:{}}
function Ajax(setting)
{ 
     var p = new Promise((resolve,reject)=>{
        $.ajax({
            //请求方式
            type : setting.method,
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : HOST + setting.url ,
            //数据，json字符串
            data : JSON.stringify(setting.data),
            //请求成功
            success : function(result) {
                resolve(result)
            },
            //请求失败，包含具体的错误信息
            error : function(e){  
                reject(e.statusText);
            } 

        });
     })

     return p;
     
}

function fetchPeoples()
{
    var setting = $.extend({},Setting,{ url:''});
    return Ajax(setting);

}