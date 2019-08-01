/**
 * 1. 初始化 展示明星头像
 * 2. 选择某一位明星后，展示该明星相关事件
 * 3. 明星、事件 生成文章(loading) 展示生成文章列表
 * 4. 选择文章 发布
 * 
 */

var item = {
     img:'',
     name:'', 
     ename: '',
     id:''
};
var User = { 
    img:'',
    name:'',
    ename: '', 
    id:'',
    topics:[],
    selectedTopic:'',

};
 
var pageTimer = {} ; //定义计算器全局变量
function AD()
{
    var loadingTimer = null;
    //展示明星
    this.PeopleTask =  function(){
        var camera, scene, renderer;
        var controls;
        
        var objects = [];
        var targets = { table: [], sphere: [], helix: [], grid: [] };
        var _table = []; 

        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var arr4 = [];
        start();
        function start(){
            var arr = [arr1,arr2,arr3,arr4];
            fetchPeoples().then((peoples)=>{ 
                    if(peoples && peoples.length)
                    {  
                        peoples.forEach((star)=>{
                                var images = star.imgs;
                                if(images && images.length)
                                { 
                                    images.forEach((img,index)=>{
                                        var element =  {...item};

                                        element.id = star._id;
                                        element.name = star.name;
                                        element.ename = star.enName;
                                        element.topics = star.topicList;
                                        element.img =   './' + img;
                                        arr[index].push(element);
    
                                    });
                                } 
                        });
                        _table =  [...arr1,...arr2,...arr3,...arr4];                  
                    }

                    init();
                    animate();
            });
          
        }
            function init() {	
                buildAnimation();
                /* var button = document.getElementById( 'table' );
                button.addEventListener( 'click', function ( event ) {
            
                    transform( targets.table, 2000 );
            
                }, false ); */
            
                var button = document.getElementById( 'sphere' );
                button.addEventListener( 'click', function ( event ) {           
                    transform( targets.sphere, 1000 ); 
                }, false );
            
                var button = document.getElementById( 'helix' );
                button.addEventListener( 'click', function ( event ) {
            
                    transform( targets.helix, 1000 ); 
                }, false );
            
                var button = document.getElementById( 'grid' );
                button.addEventListener( 'click', function ( event ) {
            
                    transform( targets.grid, 1000 ); 
                }, false );
              
                transform( targets.helix, 1000 );    //螺旋转动

                window.addEventListener( 'resize', onWindowResize, false );
            
            }
            
            function transform( targets, duration ) {
            
                TWEEN.removeAll();
            
                for ( var i = 0; i < objects.length; i ++ ) {
            
                    var object = objects[ i ];
                    var target = targets[ i ];
            
                    new TWEEN.Tween( object.position )
                        .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
                        .easing( TWEEN.Easing.Exponential.InOut )
                        .start();
            
                    new TWEEN.Tween( object.rotation )
                        .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
                        .easing( TWEEN.Easing.Exponential.InOut )
                        .start();
            
                }
            
                new TWEEN.Tween( this )
                    .to( {}, duration * 2 )
                    .onUpdate( render )
                    .start();
            
            }
            
            function onWindowResize() {
            
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            
                renderer.setSize( window.innerWidth, window.innerHeight );
            
                render();
            
            }
            
            function animate() {
            
                requestAnimationFrame( animate );
            
                TWEEN.update();
            
                controls.update();
            
            }
            
            function render() {
            
                renderer.render( scene, camera );
            }
            function buildAnimation()
            {
                camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
                camera.position.z = 3000;
            
                scene = new THREE.Scene();
            
                // table  表面 表
            
                for ( var i = 0; i < _table.length; i ++ ) {
            
                    var t = _table[i];
                    var element = document.createElement( 'div' );
                    element.className = 'element';
                    element.index = i; 
                    element.style.backgroundColor = 'rgba(0,100,225,' + ( Math.random() * 0.5 + 0.25 ) + ')';
 
                    //选择明星
                    element.onclick = selectFun;
                         
                    var name = t.name;
                    var number = document.createElement( 'div' );
                    number.className = 'number';
                     
                    number.textContent = name;
                    
                    element.appendChild( number ); 
                     
                    var symbol = document.createElement( 'div' );
                    symbol.className = 'symbol';
                    element.appendChild( symbol );
                    var symbolimg = document.createElement( 'img' );
                    symbolimg.src = t.img;
                    symbolimg.height = '80';
                    symbolimg.style.opacity = '0.3'; 
                    symbol.appendChild( symbolimg );

                    element.onmouseover = function(e){  
                            if(e.target.tagName == 'img')
                            {
                                e.target.style.opacity = '1';  
                            }else{ 
                                $(this).find('img').css('opacity','1')
                            }
                                                    
                        }
                    element.onmouseout = function(e){ 
                        if(e.target.tagName == 'img')
                        {
                            e.target.style.opacity = '0.3';  
                        }else{
                            $(this).find('img').css('opacity','0.3')
                        }                    
                        }
                    
                    var details = document.createElement( 'div' );
                    details.className = 'details';                    
                    details.innerHTML = t.ename
                    element.appendChild( details );
            
                    var object = new THREE.CSS3DObject( element );
                    object.position.x = Math.random() * 4000 - 2000;
                    object.position.y = Math.random() * 4000 - 2000;
                    object.position.z = Math.random() * 4000 - 2000;
                    scene.add( object );
            
                    objects.push( object );
             
                    
                }
                
                // sphere  球体
            
                var vector = new THREE.Vector3();
            
                for ( var i = 0, l = objects.length; i < l; i ++ ) {
            
                    var phi = Math.acos( -1 + ( 2 * i ) / l );
                    var theta = Math.sqrt( l * Math.PI ) * phi;
            
                    var object = new THREE.Object3D();
                     
                    object.position.x = 800 * Math.cos( theta ) * Math.sin( phi );
                    object.position.y = 800 * Math.sin( theta ) * Math.sin( phi );
                    object.position.z = 800 * Math.cos( phi ); 
                    
            
                    vector.copy( object.position ).multiplyScalar( 2 );
            
                    object.lookAt( vector );
            
                    targets.sphere.push( object );
            
                }
            
                // helix   螺旋
            
                var vector = new THREE.Vector3();
            
                for ( var i = 0, l = objects.length; i < l; i ++ ) {
            
                    var phi = i * 0.175 + Math.PI;
            
                    var object = new THREE.Object3D();
            
                    object.position.x = 900 * Math.sin( phi );
                    object.position.y = - ( i * 8 ) + 450;
                    object.position.z = 900 * Math.cos( phi );

                    vector.x = object.position.x * 2;
                    vector.y = object.position.y;
                    vector.z = object.position.z * 2;
            
                    object.lookAt( vector );
            
                    targets.helix.push( object );
            
                }
            
                // grid 网格
            
                for ( var i = 0; i < objects.length; i ++ ) {
            
                    var object = new THREE.Object3D();
            
                    object.position.x = ( ( i % 5 ) * 400 ) - 800;
                    object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
                    object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
            
                    targets.grid.push( object );
            
                }
            
                //           
                renderer = new THREE.CSS3DRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.domElement.style.position = 'absolute';
                document.getElementById( 'container' ).appendChild( renderer.domElement );
            
                //          
                controls = new THREE.TrackballControls( camera, renderer.domElement );
                controls.rotateSpeed = 0.5;
                controls.minDistance = 500;
                controls.maxDistance = 6000;
                controls.addEventListener( 'change', render );
                
            
            }
             
            function selectFun(e)
            { 
                    $('.people').hide(800); 
                    var elem = $(e.target).closest('.element');
                    var index = elem[0].index; 
                    var data = _table[index];                    
                    $('.event').show(800,events.bind(null,data));
                    
            }
            
    }
    //选定明星后展示明星相关话题
    var events = function(data){
                //关闭所有定时器
                for(var each in pageTimer){
                    clearInterval(pageTimer[each]);
                }
               User = {...data};
               var events = User.topics;
              putBgColor('event');
              settBgOpacity('event',1,2); 
              buildTopic(events,Books);

             //返回键显现
                $('.left').hover(()=>{
                         $('.go-btn').show();
                       },
                       ()=>{$('.go-btn').hide();})

            //返回键单击
                $('.go-btn').click(()=>{
                    //clearCloud();
                    //关闭所有定时器
                    for(var each in pageTimer){
                        clearInterval(pageTimer[each]);
                    }
                    User = {};
                    $('.event .name').html('');    
                    $('.event .ename').html('');  
                    $('.event .ren').attr('src', '');   
                    $('.container-circle .number').html(0); 
                    //$('.container-circle').css('backgroundImage', '');
                    //$('.container-circle').css('border', '2px solid rgba(215,215,215,0.3)');
                    TopicClear();
                    $('.event').hide(300);                               
                    $('.people').show(800);
                    $('.loading-circle').hide();
                    
                });

                 
                $('.event .name').html(data.name);    //显示中文名
                $('.event .ename').html(data.ename);  //显示英文名
                $('.event .ren').attr('src', './image/' + data.name + '/' + data.name + 'event.jpg');   //显示图片
                $('.loading-circle').hide();
                
                
                
                
                
                //清理停止字符云
                //clearCloud();
                //启动字符云
                //initCloud();
                
                startAnalyzeTopic(User.name);
                
            //查询百度话题量，设置最低限及最高限，分析有哪些话题
               function startAnalyzeTopic(name)
               {
                 fetchCount(name).then((count)=>{
                    var k = parseInt(count);
                    var max1 = k;
                    var max2 = k * 0.5;
                    var max3 = k * 0.3;

                    var min1 = k - 10000;
                    var min2 = k * 0.5 - 10000;
                    var min3 = k * 0.3 - 10000;

                    var max = [0,max1,max2,max3];
                    var min = [0,min1,min2,min3];
                    var finish = [0,0,0,0]
                    function setTimer (index,num)
                    {
                        var time1 = parseInt(Math.random() * 1000);
                        pageTimer['set' + index] = setTimeout(() => {
                         
                                var step = parseInt( max[index] / 2 - Math.random() * 3000);
                                                                                                               
                                var num1 = num;
                                num += step;
                                if(num < max[index])
                                {
                                    pageTimer['timer' + index] = setInterval(() => {
                                        if(num1 < num)
                                        {
                                            num1 += (100 +  parseInt(Math.random() * 5000));
                                            $('.number' + index).html(num1);
                                        }else{
                                            $('.number' + index).html(num);
                                            clearInterval(pageTimer['timer' + index]); 
                                            setTimer (index,num);
                                            }
                                        }, 30);
                                }else{
                                    
                                    if(num1 < min[index])
                                    {
                                        num = min[index] +  parseInt(Math.random() * 10000);
                                        $('.number' + index).html(num);
                                    }
                                    finish[index] = 1;
                                    clearInterval(pageTimer['timer' + index]);
                                    var sum = 0
                                    finish.forEach(ele => {
                                        sum += ele;
                                    });

                                    if(sum == 3)
                                    {
                                        $('.loading-circle').show(600); 
                                        settBgOpacity('event',2,2);
                                        TopicShow(()=>{
                                            settBgOpacity('event',3,2);
                                            $('.loading-circle').hide(600); 

                                        })
                                    }
                                }
                                                                                                                                                    
                                
                            }, time1);
                       }
 
                setTimer(1,0);
                setTimer(2,0);
                setTimer(3,0);
                })
            }

                function animation(fun){
                    requestAnimationFrame(fun)  
                }
                    
                function addTopics(i,left)
                {
                        if(events.length > 0)
                        {
                            var txt = events.shift();
                            var oTag = document.createElement('a');
                            oTag.innerHTML = txt;
                            //oTag.href= ':;';
                            oTag.style.display = 'block';
                            oTag.style.position = 'absolute';
                            oTag.style.zIndex = 999;
                            oTag.style.top = '370px';
                            oTag.style.cursor = 'pointer';
                            oTag.style.color = randomColor();
                            oTag.onclick =  Books.bind(null,txt);                          
                            oTag.style.left = left + 'px';

                            $('#tagsList').append(oTag);
                            var top  = 370;
                            var l = left;
                            var create = function (){
                                oTag.style.top = (top -= 10) + 'px';
                                if(i == 1)
                                {
                                    oTag.style.left = (l += 5) + 'px';
                                }
                                else if(i == 3)
                                {
                                    oTag.style.left = (l -= 5) + 'px';
                                }
                                                                                
                                if(top > 0) 
                                {
                                    animation(create);
                                }
                                else { 
                                            addCloud(oTag);                                                         
                                    }
                            }  
                            
                            animation(create);
                        }
            }
            
    }
    //生成明星、话题相关的文章并展示
    var Books = function(txt){
        User.selectedTopic = txt;
        for(var each in pageTimer){
            clearInterval(pageTimer[each]);
        }  
        Loading.startLoading(()=>{
            $('.event').hide();
        });       

        //Loading.suspend()
                                                  
        fetchArticles(User.name,User.selectedTopic).then((articls)=>{
            clearCloud();
            var articles = [];
            //console.log(articls);
            if(articls && articls.length > 0)
            {
                articles = [...articls];
            } 
            makeProcess('#loadingContainer',['分析热门话题', '选取文章模板','精确匹配素材','合成文章']); 
            putBgColor('loadingContainer');                      

            buildCoverPage(); 
            buildContentPage(articles);
            $('#baraja-el li .article-text img').parent().css('text-align','center');
            var baraja = $( '#baraja-el' ).baraja();  
                // navigation
                $( '#nav-prev' ).on( 'click', function( event ) {
                
                    baraja.previous();
                
                } );
                
                $( '#nav-next' ).on( 'click', function( event ) {
                    baraja.next();
                
                } ); 
                 
                Promise.all(goprocess(4)).then(()=>{ 
                    setTimeout(()=>{                                                   
                        Loading.stopLoading();
                        $('.event').hide();
                        $('.books').show(600);
                        $('.light').show();
                  },  100 + Math.random() * 300 );
                });    
                
        })
        //构建封面
        function buildCoverPage(){                              
            var containerLi = document.createElement('li');
            var containerPerson = document.createElement('div');
            containerPerson.className = 'person-page';
            var url = "url('./image/" + User.name + '/' + User.name + "cover.jpg')";
            containerPerson.style.backgroundImage= url;
            userportrait.src = './image/' + User.name + '/' + User.name + 'portrait.png';
            var imgleft = document.createElement('img');
            var imgright = document.createElement('img');
            var divInfo = document.createElement('div');
            imgleft.src = './image/left.png';
            imgleft.className = 'left-border';

            imgright.src = './image/right.png';
            imgright.className = 'right-border';
            divInfo.className ='info-box'
            var divName = document.createElement('div');
            var divEname = document.createElement('div');
            var divTopic = document.createElement('div');
            divName.className = 'name person-name1';
            divEname.className = 'ename person-name2';
            divTopic.className = 'person-text';
            divName.textContent = User.name;
            divEname.textContent = User.ename;
            divTopic.textContent = User.selectedTopic;

            divInfo.appendChild(divName);
            divInfo.appendChild(divEname);
            divInfo.appendChild(divTopic);

            containerPerson.appendChild(imgleft);
            containerPerson.appendChild(imgright);
            containerPerson.appendChild(divInfo);

            containerLi.appendChild(containerPerson);

            $('#baraja-el').append(containerLi);
        }
        //构建内容页
        function buildContentPage(articles){  
            if(articles && articles.length > 0)
            {
                articles.forEach((article,index)=>{
                var containerLi = document.createElement('li');
                var containerContent = document.createElement('div');
                containerContent.className = 'content-page';
                    
                var box = document.createElement('div');
                box.className = 'article-box'
                var containertitle = document.createElement('div');
                var containerTxt = document.createElement('div');
                containertitle.className = 'article-title';
                containerTxt.className = 'article-text';
                $(containertitle).append(article.title);

                $(containerTxt).append(article.content);

                $(box).append(containertitle);
                $(box).append(containerTxt);
                            
                var containerPb = document.createElement('div');
                var img = document.createElement('img');
                var pb = document.createElement('p');
                containerPb.className = 'publish';
                /* if(index%2 == 0)
                {
                    img.src = './image/publish2.png';
                }else{
                    img.src = './image/publish.png';
                } */
                 if(article.important)
                {
                    img.src = './image/publish2.png';
                    console.log(article.title);
                }else{
                    img.src = './image/publish.png';
                } 
                
                img.className = 'publish-img';
                pb.className = 'publish-text';
                pb.textContent = '发 布';
                containerPb.appendChild(img);
                containerPb.appendChild(pb);
                containerPb.onclick = function(e){
                    e.stopPropagation();
                    publish(article._id);                              
                } 
                containerContent.appendChild(box);

                containerContent.appendChild(containerPb);

                containerLi.appendChild(containerContent);

                $('#baraja-el').append(containerLi);
                });
        }                            
                
        }

    }

    //发布 展示结果页
    var publish = function(id){
        $('.books').hide(600,()=>{
            Loading.startLoading(()=>{
                $('.books').hide();
            });
            makeProcess('#loadingContainer',['文章合规分析', '原创度检测','选取媒体账号','提交至平台审核']); 
            putBgColor('loadingContainer');

            var ps = goprocess(4);
            ps.push(SetPublish(id));

            Promise.all(ps).then((sResult)=>{                                                   
                    console.log(sResult);
                    var res = sResult[sResult.length-1]
                    setTimeout(() => {
                        Loading.stopLoading();
                        var str = 'http://baijiahao.baidu.com/s?id=1640103312420732224';
                        if(res)
                        {
                            str  = res;
                        }
                        /* $('#code').qrcode({ 
                                            width: 190,
                                            height:190,
                                            text: str
                                        }); */
                        document.getElementById('articleiframe').src = str;
                        $('.light').attr('src','./image/light2.png');
                         
                        $('.result').show(600);
        
                        
              },  100 + Math.random() * 300 );
            });    
            
        }); 
        
    }
    //黑客帝国loading
    var Loading =   
     {
        startLoading  : function(callback)
        {
            var canvas = document.getElementById("canvas");
            canvas.style.display = 'block';
            var can = canvas.getContext("2d");
            var s=window.screen;//获取屏幕
            var w=canvas.width=s.width;//获取屏幕宽度
            var h=canvas.height=s.height;//获取屏幕高度

            can.fillStyle = setcolor();

            //var words = Array(256).join("1").split("");
            var words = [] // Array(256);

            //设置一个包含256个空元素的数组，join("1")用来把数组里的元素拼接成字符串，split("")过滤掉数组里的空元素
             for (let index = 0; index < 256; index++) {
                words.push(parseInt(Math.random() * 50 + ''));
                 
             }
            clearInterval(loadingTimer);
            loadingTimer = setInterval(draw,50);

            function draw(){
                //can.fillRect()画一个实心矩形:坐标x，坐标y，矩形宽，举行高
                can.fillStyle='rgba(0,0,0,0.05)';
                can.fillRect(0,0,w,h);
                can.fillStyle=setcolor(); 
                words.map(function(y,n){
                    text=String.fromCharCode(Math.ceil(65+Math.random()*57)); //转换为键盘上值
                    x = n*10;
                    can.fillText(text,x,y)
                    //words[n]=( y > 758 + Math.random()*484 ? 0:y + 10 );
                    words[n]=( y > 758 + Math.random()*484 ? 0 : y + (1 + parseInt(Math.random() * 40)) );

                });//数组元素的一个映射            
    
            }  
            callback && callback();
            //canvas.style.opacity = 0.4;
           
		},
 
		

          stopLoading : function()
            {
                if(loadingTimer)
                {
                    clearInterval(loadingTimer);
                    var canvas = document.getElementById("canvas");
                    canvas.style.display = 'none';
                    $('#loadingContainer').hide(600,()=>{
                        $('#loadingContainer').html('');
                        for(var each in pageTimer){
                            clearInterval(pageTimer[each]);
                        } 
                    })
                }
            },
            suspend :function(){
                if(loadingTimer)
                {
                    clearInterval(loadingTimer);
                     
                }
            }
         
    }

    

}

function goprocess(allstep)
            {
                var ps = [];
                var time = 0;
                for (let index = 1; index <= allstep+1; index++) {
                    var _time = 2000 + parseInt(Math.random() * 3000);
                    time += _time;
                    var p = new Promise(function(resolve,reject){
                        setTimeout(() => { 
                            settBgOpacity('loadingContainer',index,allstep);
                            resolve(index);                            
                            }, time);
                        });       
                   ps.push(p) 
                    
                }

                return ps;
                        /* settBgOpacity('loadingContainer',step,allstep);
                         
                            return new Promise((resolve,reject)=>{
                              setTimeout(() => {
                                step++;
                                settBgOpacity('loadingContainer',step,allstep);
                                resolve(step);
                                }, 3000 + parseInt(Math.random() * 5000));
                            });  */              
                
            }

function makeProcess(container,allStep)
{
    var processDiv = $('.template .processContainer').clone();
    $(container).css('display','block');
    $(container).html('');

    //processDiv.css('display','none');
    var tagC = $(processDiv).find('.tagContainer .nodetitle').eq(0).clone();
    var pointC = $(processDiv).find('.pointContainer .point').eq(0).clone();
    $(processDiv).find('.tagContainer').html('');
    $(processDiv).find('.pointContainer').html('');

    if(allStep && allStep.length)
    {
        allStep.forEach((step)=>{
               var tag = tagC.clone();
               tag.html('<img alt="" src="./image/ok.png" style="display: none" /> ' + step);
               $(processDiv).find('.tagContainer').append(tag);

               for (let index = 0; index < 40; index++) {
                   var element = pointC.clone();
                   if(index == 0)
                   {
                     element[0].className = 'point pointStart';
                   }else{
                    element[0].className = 'point';
                   }
                   $(processDiv).find('.pointContainer').append(element);                 
               }
        })
    }

    $(container).append(processDiv);
}


function setcolor(){
    var color = Math.ceil(Math.random()*16777215).toString(16); 			
        while(color.length<6){
            color = '0'+color;
        }

        var c = '#'+color;
        var cc = colorConversion(c);
        if(cc[0] < 50 || cc[1] < 50 || cc[2] < 50)
        {
            return setcolor()
        }
        return c;
    }
function randomColor()
{
    var colors = ['#5299e3','#00faff','#fe6b00','#ffde36','#ff5a7a'];
    var index = parseInt(Math.random() * 5);
    return colors[index]
}

//处理二维码中的中文
function toUtf8(str) {   
    var out, i, len, c;   
    out = "";   
    len = str.length;   
    for(i = 0; i < len; i++) {   
    	c = str.charCodeAt(i);   
    	if ((c >= 0x0001) && (c <= 0x007F)) {   
        	out += str.charAt(i);   
    	} else if (c > 0x07FF) {   
        	out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));   
        	out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));   
        	out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	} else {   
        	out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));   
        	out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	}   
    }   
    return out;   
}



//设置渐变色中的某一步明暗动画
function settBgOpacity(obj,step,Allstep)
{       
         
    var len = $('.'+ obj + ' .pointContainer .point').length;
      	  
      	  var _len = parseInt(len / Allstep);
      	 
      	  $('.'+ obj + ' .pointContainer .point').each((index,item)=>{
            if(index > (step - 1) * _len)
            {
                $(item).css({'opacity':'0.1'}); 
            }else{
                $(item).css({'opacity':'1'});
            }            
          })
          $('.'+ obj + ' .tagContainer .nodetitle').each((index,item)=>{
            if(index < step)
            {
                $(item).css({'opacity':'1'});
            }else{
                $(item).css({'opacity':'0'});
            }
          
         
        
        })
          if(step > 1)
          {
                $('.'+ obj + ' .tagContainer .nodetitle').eq(step-2).find('img').show(600);
          }
          
          clearInterval(pageTimer['point']);
           if(step  <= Allstep)
           {
            
          var t = (step -1) * _len;

            pageTimer['point'] = setInterval(function(){
                        if(t < step * _len)
                        {
                            $('.'+ obj + ' .pointContainer .point').eq(t).css({'opacity':'1'});
                            t++;
                        }else{
                            t = (step -1) * _len;
                            $('.'+ obj + ' .pointContainer .point:gt('+ t +')').css({'opacity':'0.1'});
                        }
                        
                        
                },30);

                
           }  
          

          
       
}

//设置obj内部一串.point元素渐变色
function putBgColor(obj)
{
       //var colors = ['#2f71ff','#ffb710','#e44335','#2dba52']; 
	   var _colors = [[47,113,255],[255,183,16],[228,67,57],[45,186,82]]
      
          var len = $('.'+ obj + ' .pointContainer .point').length; 
      	var _len = parseInt(len / 4);
      	var colorIndex = 0;
      	var initcolor = _colors[0];
        var toColor = _colors[1];
          
		_R_step=parseInt(Math.ceil(Math.abs(initcolor[0] - toColor[0])/_len)); //R的增减步长
		_G_step=parseInt(Math.ceil(Math.abs(initcolor[1] - toColor[1])/_len)); //G的增减步长
		_B_step=parseInt(Math.ceil(Math.abs(initcolor[2] - toColor[2])/_len)); //B的增减步长 
         
        if(_R_step == 0 ) _R_step = 1;
        if(_G_step == 0)  _G_step = 1;
        if(_B_step == 0)  _B_step = 1;
         
      	$('.'+ obj + ' .pointContainer .point').each((index,item)=>{
      		  if(index%_len == 0 && colorIndex < _colors.length -1)
      		  {
      		  	    initcolor = _colors[colorIndex];
					colorIndex++;
					toColor = _colors[colorIndex]; 
					_R_step=parseInt(Math.ceil(Math.abs(initcolor[0] - toColor[0])/_len)); //R的增减步长
		 			_G_step=parseInt(Math.ceil(Math.abs(initcolor[1] - toColor[1])/_len)); //G的增减步长
		 			_B_step=parseInt(Math.ceil(Math.abs(initcolor[2] - toColor[2])/_len)); //B的增减步长 
                      
                     if(_R_step == 0 ) _R_step = 1;
                     if(_G_step == 0)  _G_step = 1;
                     if(_B_step == 0)  _B_step = 1;
                } 
                
              $(item).css({'background-color':'rgb('+initcolor[0]+','+initcolor[1]+','+initcolor[2]+')'});
             initcolor = getColor(index %_len ,initcolor,toColor,_R_step,_G_step,_B_step);
             
      	})
       
}

//颜色值十六进制转RGB
function colorConversion(code){
    var len=code.length;
    var f=new Array();
    f['0']=0;
    f['1']=1;
    f['2']=2;
    f['3']=3;
    f['4']=4;
    f['5']=5;
    f['6']=6;
    f['7']=7;
    f['8']=8;
    f['9']=9;
    f['A']=10;
    f['B']=11;
    f['C']=12;
    f['D']=13;
    f['E']=14;
    f['F']=15;
    code=code.toLocaleUpperCase();//转换为大写
    var s=code.substr(0,1);
    if(s=='#'){
        code=code.substr(1,6);
    }
    var r=f[code[0]]*16+f[code[1]];
    var g=f[code[2]]*16+f[code[3]];
    var b=f[code[4]]*16+f[code[5]];
    return [r,g,b];
}

//渐变色 当前颜色与目标颜色之间，根据step计算下一个颜色值
function getColor(_step,_thisRGB,_toRGB,_R_step,_G_step,_B_step){
   var r=_step==0?_thisRGB[0]:(_thisRGB[0]>_toRGB[0] ? _thisRGB[0] -_R_step :_thisRGB[0] + _R_step);
    var g=_step==0?_thisRGB[1]:(_thisRGB[1]>_toRGB[1] ? _thisRGB[1] - _G_step :_thisRGB[1] + _G_step);
    var b=_step==0?_thisRGB[2]:(_thisRGB[2]>_toRGB[2] ? _thisRGB[2] - _B_step :_thisRGB[2] + _B_step);

    return [r,g,b]

}

//把话题绑定至DOM
function buildTopic(topics,clkFun)
{
     if(topics && topics.length > 0)
     {
          topics.forEach((item)=>{
                var li = document.createElement('li');
                li.style.color = setcolor();
                var fs = 14 + parseInt(Math.random() * 18);
                var pl = 3 + parseInt(Math.random() * 19);
                var pr = 4 + parseInt(Math.random() * 14);

                li.style.fontSize = fs + 'px';
                li.style.paddingLeft =  pl + 'px';
                li.style.paddingRight=  pr + 'px';
                //li.style.lineHeight =  fs + 10 + 'px';

                li.innerHTML = item;
                li.onclick = clkFun.bind(null,item)
                $('#tagsList .topicContainer').append(li);
          });
     }
}
//清空话题
function TopicClear()
{
      
        $('#tagsList .topicContainer').html('');
          
}
//逐渐展示话题
function TopicShow(callback)
{
    $('#tagsList .topicContainer').animate({'opacity':1},2000)

    var t = 0;
    var len = $('#tagsList .topicContainer li').length;
    pageTimer['topic'] = setInterval(()=>{
        if(t < len)
        {
            $('#tagsList .topicContainer li').eq(t).css('opacity',1);
            t++;
        }else{
               clearInterval(pageTimer['topic']);
               callback && callback(); 
        }
        
    },200);
     
    
}



$(function(){
    var ad = new AD();
    ad.PeopleTask(); 
    
    $('.topbar').click(function(){
         document.location.href = document.location;
    });
})
 

