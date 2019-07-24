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
     sex:'male',
     ename: 'jim bt',
     id:'1'
};
var item2 = { 
    name:'彭于晏',
    ename: 'jim bt',
    sex:'male',
    id:'1'
};

var EventIndex = 0;

function AD()
{
    var loadingTimer = null;
    this.PeopleTask =  function(){
         var _table = []; 
            var _table2 = []; 

            for (let i = 0; i < 100; i++) {
                var element =  {...item};
                element.id = i+1;
                element.name = element.name;
                _table.push(element);

                var element2 =  {...item2};
                element2.id = i+1;
                element2.name = element2.name;
                _table2.push(element2);
                
            }

            var camera, scene, renderer;
            var controls;

            var objects = [];
            var targets = { table: [], sphere: [], helix: [], grid: [] };

            init();
            animate();

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
              
                transform( targets.sphere, 2000 );
            
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
            
                for ( var i = 0; i < _table2.length; i ++ ) {
            
                    var t = _table[i];
                    var element = document.createElement( 'div' );
                    element.className = 'element';
                    element.index = i;
                    //element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
                    element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

                    
                    //element.style.backgroundImage = 'url("' + t.img +'")';
                    
                    
                    element.onclick = function(e){ 
                         $('.people').hide(800);
                         $('.event').show(800,()=>{
                           
                            //返回键显现
                            $('.left').hover(()=>{
                                 $('.go-btn').show();
                            },()=>{$('.go-btn').hide();})

                            //返回键单击
                             $('.go-btn').click(()=>{
                                $('.event').hide(300);
                                
                                $('.people').show(800);
                             });

                             var ele = e.target;
                             var elem = $(ele).closest('.element');

                             var index = elem[0].index; 
                             var data = _table[index];
                             $('.event .name').html(data.name);
                             $('.event .ename').html(data.ename);
                             $('.event .ren').attr('src', './image/' + data.name + '.jpg');


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

                    //表面现实的字
                    
                   /* if(t.img)
                    {
                        element.style.backgroundImage = 'url("' + t.img +'")';
            
                        
                    
                    }else{
                        var symbol = document.createElement( 'div' );
                        symbol.className = 'symbol';
                        symbol.textContent = name;
                        element.appendChild( symbol );
                    }
                  */
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
              /*      
                    object.position.x = 1200 * Math.sin( phi );
                    object.position.y = - ( i * 8 ) + 450;
                    object.position.z = 1200 * Math.cos( phi );
            */
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
            loadingTimer = setInterval(draw,80);

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
            
            function setcolor(){
                var color = Math.ceil(Math.random()*16777215).toString(16); 			
                    while(color.length<6){
                        color = '0'+color;
                    }
                    return '#'+color;
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
//黑客帝国loading


}

var ad = new AD();
ad.PeopleTask();
 

