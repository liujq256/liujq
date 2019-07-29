/**
 * 1. 初始化 展示明星头像
 * 2. 选择某一位明星后，展示该明星相关事件
 * 3. 明星、事件 生成文章(loading)
 * 4. 展示生成文章列表
 * 5. 选择文章 发布
 * 
 */

var item = {
     img:'./image/pengyuyan.jpg',
     name:'彭于晏', 
     ename: 'jim bt',
     id:'1'
};
var User = { 
    name:'彭于晏',
    ename: 'jim bt', 
    id:'1',
    topics:[],
    selectedTopic:'',

};

var EventIndex = 0;
function resetUser()
{
    User = { 
        name:'',
        ename: '', 
        img:'',
        id:'',
        topics:[],
        selectedTopic:'',
    
    };
}
function AD()
{
    var loadingTimer = null;

    this.PeopleTask =  function(){
        var camera, scene, renderer;
        var controls;

        var objects = [];
        var targets = { table: [], sphere: [], helix: [], grid: [] };
        var _table = []; 

        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
var arr = [arr1,arr2,arr3];
        fetchPeoples().then((peoples)=>{ 
                if(peoples && peoples.length)
                {  
                    peoples.forEach((star)=>{
                            var images = star.imgs;
                            if(images && images.length)
                            {
                                images.forEach((img)=>{
                                    var element =  {...item};

                                    element.id = star._id;
                                    element.name = star.name;
                                    element.ename = star.enName;
                                    element.topics = star.topicList;
                                    element.img = img;
                                    arr[index].push(element);

                                    /*if(arr1.some(a=>a.id == star._id))
                                    {
                                        arr2.push(element);
                                    }else if(arr2.some(a=>a.id == star._id)){
                                        arr3.push(element);
                                    }else{
                                        arr1.push(element);
                                    }*/
                                      
                                });
                            }else{
                                images = ['./image/pengyuyan.jpg','./image/pengyuyan.jpg','./image/pengyuyan.jpg'];
                                images.forEach((img,index)=>{
                                    var element =  {...item};

                                    element.id = star._id;
                                    element.name = star.name;
                                    element.ename = star.enName;
                                    element.topics = star.topicList;
                                    element.img = img;
                                    arr[index].push(element);
                                    /*if(arr1.some(a=>a.id == star._id))
                                    {
                                        arr2.push(element);
                                    }else if(arr2.some(a=>a.id == star._id)){
                                        arr3.push(element);
                                    }else{
                                        arr1.push(element);
                                    }*/
                                      
                                });
                            }
                    });
                    _table =  [...arr1,...arr2,...arr3];

                }else{
                    for (let i = 0; i < 100; i++) {
                    var element =  {...item};
                    element.id = i+1;
                    element.name = element.name;
                    _table.push(element);              
                  }
                }

                init();
                animate();
         });
          

            

           

            function init() {	
                buildAnimation();
                /* var button = document.getElementById( 'table' );
                button.addEventListener( 'click', function ( event ) {
            
                    transform( targets.table, 2000 );
            
                }, false ); */
            
                var button = document.getElementById( 'sphere' );
                button.addEventListener( 'click', function ( event ) {
            
                    transform( targets.sphere, 2000 );
                    EventIndex = 0;
                }, false );
            
                var button = document.getElementById( 'helix' );
                button.addEventListener( 'click', function ( event ) {
            
                    transform( targets.helix, 2000 );
                    EventIndex = 1;
                }, false );
            
                var button = document.getElementById( 'grid' );
                button.addEventListener( 'click', function ( event ) {
            
                    transform( targets.grid, 2000 );
                    EventIndex = 2;
                }, false );
              
                transform( targets.helix, 2000 );
            
                //
            
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
                    element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
 
                    //选择明星
                    element.onclick = function(e){ 
                         $('.people').hide(800);                      
                         $('.event').show(800,()=>{
                            
                            //返回键显现
                            $('.left').hover(()=>{
                                 $('.go-btn').show();
                            },()=>{$('.go-btn').hide();})

                            //返回键单击
                             $('.go-btn').click(()=>{
                                clearCloud();
                                $('.container-circle .number').html(0); 
                                $('.container-circle').css('backgroundImage', '');
                                $('.container-circle').css('border', '2px solid');
 
                                $('.event').hide(300);
                                
                                $('.people').show(800);
                             });

                             var ele = e.target;
                             var elem = $(ele).closest('.element');

                             var index = elem[0].index; 
                             var data = _table[index];
                             $('.event .name').html(data.name);    //显示中文名
                             $('.event .ename').html(data.ename);  //显示英文名
                             $('.event .ren').attr('src', './image/' + data.name + 'event.jpg');   //显示图片
                             $('.loading-circle-1').show();
                             $('.loading-circle-2').show();
                             $('.loading-circle-3').show();
                             User = {...data};
                               
                             //启动字符云
                             initCloud();
                             var events = User.topics;
                             
                             fetchCount(User.name).then((count)=>{
                                var k = parseInt(count);
                                var max1 = k;
                                var max2 = k * 0.5;
                                var max3 = k * 0.3;

                                var min1 = k - 10000;
                                var min2 = k * 0.5 - 10000;
                                var min3 = k * 0.3 - 10000;

                                var max = [0,max1,max2,max3];
                                var min = [0,min1,min2,min3];

                                var len = events.length;
                                var count = 1;
                                if(len % 3)
                                {
                                    count = parseInt(len/3,10) + 1 ;
                                }else{
                                    count = parseInt(len/3,10);
                                }                               
                                
                                function setTimer (index,left,num)
                                {
                                    var time1 = 1000 + parseInt(Math.random() * 3000);
                                    setTimeout(() => {
                                        if(events.length > 0)
                                        {
                                        var step = parseInt(Math.random() * 1000);
                                                                                    
                                            step = parseInt(min[index]/count) + step;
                                        
                                        var num1 = num;
                                        num += step;
                                        if(num < max[index])
                                        {
                                            var tempTimer = setInterval(() => {
                                            if(num1 < num)
                                            {
                                                num1 += (10 +  parseInt(Math.random() * 1000));
                                                $('.number' + index).html(num1);
                                            }else{

                                                $('.number' + index).html(num);
                                                clearInterval(tempTimer);
                                                addTopics(index,left);
                                                setTimer (index,left,num);
                                            }
                                            }, 30);
                                        }else{
                                            $('.loading-circle-' + index).hide();
                                            var bgurl = "url('./image/loadingCirclebg.png')"; 
                                            $('.container-circle-' + index).css('backgroundImage', bgurl);
                                            $('.container-circle-' + index).css('border', 'none');

                                        }
                                        
                                                                                
                                        
                                        }else{ 
                                            
                                            var tempTimer2 =  setInterval(() => {
                                                    if(num < min[index])
                                                    {
                                                        num += (1000 +  parseInt(Math.random() * 1000));
                                                    $('.number' + index).html(num);
                                                    }else{    
                                                    clearInterval(tempTimer2); 
                                                    $('.loading-circle-' + index).hide();
                                                    var bgurl = "url('./image/loadingCirclebg.png')";
                                                    $('.container-circle-' + index).css('backgroundImage', bgurl);
                                                    $('.container-circle-' + index).css('border', 'none');
                                                    }
                                                }, 30);
                                            
                                        
                                        }
                                    }, time1);
                                }

                                setTimer(1,40,0);
                                setTimer(2,300,0);
                                setTimer(3,600,0);
                             })
                             
 
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

                                            oTag.onclick = function(){
                                                User.selectedTopic = txt;

                                                console.log(User);
                                                //选择话题事件
                                                Loading.startLoading();

                                                
                                                
                                                fetchArticles(User.name,User.selectedTopic).then((articls)=>{
                                                    var articles = [];
                                                    console.log(articls);
                                                    if(articls && articls.length > 0)
                                                    {
                                                        articles = [...articls];
                                                    }else{
                                                         articles = [
                                                            {content: '<p>我是第一篇文章 明星好多啊</p>',title:'我是标题1',_id:1},
                                                            {content: '<p>我是第2篇文章 明星好多啊</p>',title:'我是标题1',_id:2},
                                                            {content: '<p>我是第3篇文章 明星好多啊</p>',title:'我是标题1',_id:3},
                                                            {content: '<p>我是第4篇文章 明星好多啊</p>',title:'我是标题1',_id:4},
                                                            {content: '<p>我是第5篇文章 明星好多啊</p>',title:'我是标题1',_id:5},
                                                            {content:  '<p>我是第6篇文章 明星好多啊</p>',title:'我是标题1',_id:6},
                                                            {content:  '<p>我是第6篇文章 明星好多啊</p>',title:'我是标题1',_id:6},
                                                            {content:  '<p>我是第6篇文章 明星好多啊</p>',title:'我是标题1',_id:6},
                                                            {content:  '<p>我是第6篇文章 明星好多啊ds</p>',title:'我是标题1',_id:6},
                                                            {content:  '<p>我是第6篇greg文章 明星好多啊dsdd</p>',title:'我是标题1',_id:6},
                                                            {content:  '<p>我是第6篇文章 明星好多啊fdsf</p>',title:'我是标题1',_id:6},
                                                            {content:  '<p>我是第6篇ggegre文章 明星好多啊fdsfds</p>',title:'我是标题1',_id:6},
                                                            {content:  '<p>我是第6篇文章 明星好多啊fdsfsd</p>',title:'我是标题1',_id:6},
                                                            {content:  '<p>我是第6篇文章 明星好多啊fdsfds</p>',title:'我是标题1',_id:6},
                                                            {content:  '<p>我是第6篇文章 明星好多啊fdsfds</p>',title:'我是标题1',_id:6},
                                                            {content:  '<p>我是第6篇文erger章 明星好多啊fdsfds</p>',title:'我是标题1',_id:6},
                                                            {content:  '<p>我是第6篇greg文章 明星好多啊fdsf</p>',title:'我是标题1',_id:6},
                                                            {content:  '<p>我是第6篇gfdgfd文章 明星好多啊fdsf</p>',title:'我是标题1',_id:6}, 
     
                                                         ]
                                                         
                                                    }
                                                        buildCoverPage(); 
                                                        buildContentPage(articles);
                                                        
                                                        var baraja = $( '#baraja-el' ).baraja();  
                                                        // navigation
                                                        $( '#nav-prev' ).on( 'click', function( event ) {
                                                        
                                                            baraja.previous();
                                                        
                                                        } );
                                                        
                                                        $( '#nav-next' ).on( 'click', function( event ) {
                                                            baraja.next();
                                                        
                                                        } ); 
                                                        
                                                         
                                                        setTimeout(()=>{                                                   
                                                            Loading.stopLoading();
                                                            $('.event').hide();
                                                            $('.books').show(600);
                                                            $('.light').show();
                                                        },3000);
                                                })
                                                
                                            }
                                            
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
                            function buildCoverPage(){                              
                                var containerLi = document.createElement('li');
                                var containerPerson = document.createElement('div');
                                containerPerson.className = 'person-page';
                                var url = "url('./image/"+User.name+"cover.jpg')";
                                containerPerson.style.backgroundImage= url;
                                userportrait.src = './image/'+User.name+'portrait.png';
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
                            function buildContentPage(articles){  
                                if(articles && articles.length > 0)
                                {
                                    articles.map((article)=>{
                                        var containerLi = document.createElement('li');
                                        var containerContent = document.createElement('div');
                                        containerContent.className = 'content-page';
                                       /* <div class="article-title">
                                     彭于晏一个特点暴露异性缘有多好!原来不是不结婚,而是太有魅力
                                 </div>
                                 <div class="article-text"></div>*/

                                 article-box

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
                                img.src = './image/publish.png';
                                img.className = 'publish-img';
                                pb.className = 'publish-text';
                                pb.textContent = '发 布';
                                containerPb.appendChild(img);
                                containerPb.appendChild(pb);
                                containerPb.onclick = function(e){
                                    e.stopPropagation();
                                    $('.books').hide(600,()=>{
                                        $('.pbLoading').show();
                                        /* SetPublish(article._id).then(()=>{

                                        }); */
                                        setTimeout(() => {
                                         var str = 'http://baijiahao.baidu.com/s?id=1640103312420732224';
                                        $('#code').qrcode({ 
                                                                width: 190,
                                                                height:190,
                                                                text: str
                                                            });
                                        document.getElementById('articleiframe').src = str;
                                        $('.light').attr('src','./image/ligt2.jpg');
                                        $('.pbLoading').hide();
                                        $('.result').show();

                                    }, 3000);

                                    });
                                    
                                         
                                    
                                     
                                   
                                } 
                                containerContent.appendChild(box);

                                containerContent.appendChild(containerPb);

                                containerLi.appendChild(containerContent);

                                $('#baraja-el').append(containerLi);
                                });
                                }                            
                                 
                            }
                         });
                         
                        //Loading.startLoading();
            
                        //setTimeout(()=>{
                            //document.getElementById( 'container' ).style.display = 'block';
                            //Loading.stopLoading();
                        //},5000);
                    }
                    

                    var name = t.name;
                    var number = document.createElement( 'div' );
                    number.className = 'number';
                     
                    number.textContent = name;
                    
                    element.appendChild( number ); 
                     
                    var symbol = document.createElement( 'div' );
                        symbol.className = 'symbol';
                        //symbol.textContent = name;
                        //symbol.style.backgroundImage = 'url("' + t.img +'")';
                        element.appendChild( symbol );

                        var symbolimg = document.createElement( 'img' );
                        symbolimg.src = t.img;
                        symbolimg.height = '80';
                        symbolimg.style.opacity = '0.3'; 
                        symbol.appendChild( symbolimg );

                        symbolimg.onmouseover = function(e){ 
                            e.target.style.opacity = '1';
                        }
                        symbolimg.onmouseout = function(e){ 
                            e.target.style.opacity = '0.3';
                        }
                    
                    var details = document.createElement( 'div' );
                        details.className = 'details';
                        //details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
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
             
    }
//黑客帝国loading
    var Loading =   
     {
        startLoading  : function()
        {
            var canvas = document.getElementById("canvas");
            canvas.style.display = 'block';
            var can = canvas.getContext("2d");
            var s=window.screen;//获取屏幕
            var w=canvas.width=s.width;//获取屏幕宽度
            var h=canvas.height=s.height;//获取屏幕高度

            can.fillStyle = setcolor();

            var words = Array(256).join("1").split("");
            //设置一个包含256个空元素的数组，join("1")用来把数组里的元素拼接成字符串，split("")过滤掉数组里的空元素
            
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
                    words[n]=( y > 758 + Math.random()*484 ? 0:y+10 );
                });//数组元素的一个映射            
    
            }  
            
           
		},
 
		

          stopLoading : function()
            {
                if(loadingTimer)
                {
                    clearInterval(loadingTimer);
                    var canvas = document.getElementById("canvas");
                    canvas.style.display = 'none';
                }
            }
         
    }



}

function setcolor(){
    var color = Math.ceil(Math.random()*16777215).toString(16); 			
        while(color.length<6){
            color = '0'+color;
        }
        return '#'+color;
    }
function randomColor()
{
    var colors = ['#5299e3','#00faff','#fe6b00','#ffde36','#ff5a7a'];
    var index = parseInt(Math.random() * 5);
    return colors[index]
}

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


 var ad = new AD();
ad.PeopleTask(); 


 

