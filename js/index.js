$(function(){
    let wykl = $("<div id='wykl'></div>");
    $("body").append(wykl);


//创建头部导航部分


    let navTop = ()=>{
        let topnav = function(){
            return `<div class="top-nav">
            <div class="top-nav-content">
                <div class="top-nav-left">
                    <span>网易考拉欢迎您！</span>
                    <a href="http://127.0.0.1/wangyikaola/html/dengluzhuce.html" class="login">登陆</a>
                    <a href="http://127.0.0.1/wangyikaola/html/dengluzhuce.html" class="post">免费注册</a>
                </div>
                <div class="top-nav-right">
                    <ul class="nav-right-ul">
                        <li class="nav-right-lia"><a href="" class="nav-right-a">每日签到</a></li>
                        <li class="nav-right-lia"><a href="" class="nav-right-a">我的订单</a></li>
                    </ul>
                </div>
            </div>
        </div>`
        }
        $("#wykl").append(topnav);
        
        $.ajax({
            type: "post",
            url: "/wangyikaola/server/index/topnav.json",
            dataType: "json",
            success: function(response){
                let topnav = response.map(ele => {
                    var lia = "";
                    for(var i=0;i<ele.downText.length;i++){
                        var litext =`<li class="li-down"><a href="">${ele.downText[i]}</a></li>`;
                        lia += litext;
                    }
                   
                    return `
                            <li class="nav-right-li">
                                <a href="" class="nav-right-a">${ele.title}</a>
                                <ul class="right-down">${lia}</ul>
                            </li>`
                                        
                }).join("");

                $(".nav-right-ul").append(topnav)

            }
        })
    }
    navTop()

//创建logo部分
    let logo = function(){
        return `<div class="top-logo">
                    <div class="logo-center">
                        <div class="logo"></div>
                        <div class="search">
                            <div class="search-text">
                                <input type="text">
                                <div class="search-img"></div>
                            </div>
                        </div>
                        <a href="" class="shopping">
                            <img src="./img/shoppingcar.png" alt="">
                            <span>购物车</span>
                        </a>
                    </div>
                </div>`
    }
    $("#wykl").append(logo);

//创建中间导航部分
    let nav = function(){
        return `<div class="nav">
                    <div class="nav-center">
                        <div class="nav-left">
                            <p class="nav-list">所有分类</p>
                            <p class="banner-aout">
                                <a href="javascript:void(false)" class="prev">&lt;</a>
                                <a href="javascript:void(false)" class="next">&gt;</a>
                            </p>
                            <div class="banner-round">
                                <a href="javascript:void(0)" class="round active"></a>
                                <a href="javascript:void(0)" class="round"></a>
                                <a href="javascript:void(0)" class="round"></a>
                                <a href="javascript:void(0)" class="round"></a>
                                <a href="javascript:void(0)" class="round"></a>
                                <a href="javascript:void(0)" class="round"></a>
                            </div>
                            <ul class="nav-box"></ul>
                        </div>
                        <ul class="nav-right"></ul>
                    </div>
                </div>`
    }
    $("#wykl").append(nav)

    let navcontent = () =>{
        $.ajax({
            type: "post",
            url: "/wangyikaola/server/index/nav.php",
            dataType: "json",
            success: function(response){
                let navbanner = response.map(ele => {
                    let navgla = "";
                    for(var i=0; i<ele.nav.length;i++){
                        var navgl = `<li><a href="javascript:void(0)">${ele.nav[i]}</a></li>`
                        navgla += navgl;
                    }

                    return navgla
                }).join("")
                $(".nav-right").append(navbanner)
            }
        })
    }
    navcontent();

    let navlt = () =>{
        $.ajax({
            type: "post",
            url: "/wangyikaola/server/index/nava.php",
            dataType: "json",
            success: function(response){
                let navleft = response.map((ele)=>{
                    let navh3 = "";
                    let srcimg ="";
                    for(let i = 0; i<ele.navtext.length; i++){
                        let txt = "";
                        for(let e = 0; e<ele.navtext[i].text.length; e++){
                            let navtxt = `<li>${ele.navtext[i].text[e]}</li>`
                            txt += navtxt;
                        }
                        
                        let htxt = `<div class="leftTxt">
                                        <h3>${ele.navtext[i].h3}</h3>
                                        <ul>${txt}</ul>
                                    </div>`;
                        navh3 += htxt;
                    }

                    for(let i = 0; i<ele.srca.length; i++){
                        let navimg = `<div class="right-img"><img src="${ele.srca[i]}" alt=""></div>`
                        srcimg +=navimg
                    }
                    
                    return `<li class="nav-list-text">
                                <a href="" class="list-text">${ele.navlt}</a>
                                <div class="nav-nav">
                                    <div class="nav-nav-left">
                                        ${navh3}
                                    </div>
                                    <div class="nav-nav-right">
                                        ${srcimg}
                                        <div class="right-imga"><img src="${ele.srcb}" alt=""></div>
                                    </div>
                                </div>
                            </li>`
                }).join("");
                $(".nav-box").append(navleft);      
            }
        })
    }
    navlt();

    //轮播图
    let banner = function(){
        return `<div class="banner">
                    <div class="img">
                        <img src="./img/banner01.jpg" alt="">
                        <img src="./img/banner02.jpg" alt="">
                        <img src="./img/banner03.jpg" alt="">
                        <img src="./img/banner04.jpg" alt="">
                        <img src="./img/banner05.jpg" alt="">
                        <img src="./img/banner06.jpg" alt="">
                    </div>
                    <div class="banner-text">
                        <div class="banner-text-content">
                            <a href="">• 网易自营</a>
                            <a href="">• 全球直采</a>
                            <a href="">• 假一赔十</a>
                            <a href="">• 售后无忧</a>
                        </div>
                    </div>
                </div>`
    }
    $("#wykl").append(banner);

    $(".img").append($(".img>img:first").clone());
    $(function(){
        let length = $(".img>img").length;
        let i = 0;
        autoPlayer();

        $(".prev").click(prev);
        $(".next").click(next);
        

        function next(){
            i++;
            if(i >= length){
                $(".img").css("left",0);
                i = 1
            }
            $(".img").stop().animate({
                "left":-(i *100) + "%"
            })
        }

        function prev(){
            i--;
            if(i < 0){
                $(".img").css("left",-(length - 1)*100 + "%");
                i = length - 2
            }
            $(".img").stop().animate({
                "left":-(i *100) + "%"
            })
        }

        function autoPlayer(){
            timer = setInterval(next,3000)
        };

        $(".img").hover(function(){
            clearInterval(timer);
        },autoPlayer);
    })

    //创建banner-nav.................................
    let a = `<div class="banner-nav"></div>`
    $("#wykl").append(a);

    let bannerimg = () =>{
        $.ajax({
            type: "post",
            url: "/wangyikaola/server/index/nav.php",
            dataType: "json",
            success: function(response){
                let bannernav = response.map((ele)=>{
                    let navimg = "";
                    for(var i=0; i<ele.src.length;i++){
                        var img = `<a href=""><img src="${ele.src[i]}" alt=""></a>`
                        navimg += img;
                    }
                    return `
                                <div class="banner-nav-content">
                                    ${navimg}
                                </div>
                            `
                }).join("");
                $(".banner-nav").append(bannernav);                  
            }         
        })
    }
    bannerimg();

    //.......................................................
    let b = `<div class="brand"></div>`
    $("#wykl").append(b);
    let brand = ()=>{
        $.ajax({
            type: "post",
            url: "/wangyikaola/server/index/brand-shop.php",
            dataType: "json",
            success: function(response){
                let obrand = function(){
                    return `
                                <div class="brand-nav">
                                    <h3>热门品牌</h3>
                                    <p>全球精选，一网打尽</p>
                                </div>
                                <div class="brand-banner">
                                    <div class="brand-auot">
                                        <div class="brand-auot-img">
                                            <span class="brand-prev">&lt;</span>
                                            <span class="brand-next">&gt;</span>
                                        </div>
                                        <div class="brand-text">
                                            <h3>App Store 充值卡</h3>
                                            <p>70多个国家母婴界的信赖品牌</p>
                                        </div>
                                    </div>
                                    <div class="brand-shop"></div>
                                </div>
                            ` 
                };
                $(".brand").append(obrand)
                let brandshop = response.map(ele => {

                    return `<div class="brand-shop-nav">
                                        <div class="shop-nav-a">
                                            <img src="${ele.src}" alt="">
                                            <b>${ele.b}</b>
                                        </div>
                                        <div class="shop-nav-b">
                                            <a href="" class="follow">+关注</a>
                                            <img src="${ele.src}" alt="">
                                            <p>${ele.p}</p>
                                            <a href="" class="in-shop">进入品牌</a>
                                        </div>
                                    </div>`                    
                }).join("");
                $(".brand-shop").append(brandshop)
                
            }
        })
    }
    brand();

    //.............................................................
    let c = `<div class="hotbox"></div>`;
    $("#wykl").append(c);
    let hotbrand = () =>{
        $.ajax({
            type: "post",
            url: "/wangyikaola/server/index/hot.php",
            dataType: "json",
            success: function(response){
                
                let hot = response.map(ele => {
                    let hotnav = "";
                    ele.titlenav.forEach(element => {
                        hotnav += `<li>${element}</li>`
                    });

                    let imgli = "";
                    ele.imgnav.forEach(element => {
                        imgli += `<li>${element}</li>`
                    });

                    let centernav = "";
                    for(let i = 0; i<ele.center.length; i++){
                        centernav += `<div class="shop-center-nav">
                                          <h3>${ele.center[i].h3}</h3>
                                          <p>${ele.center[i].cp}</p>
                                          <img src="${ele.center[i].imgcenter}" alt="">
                                      </div>`
                    }

                    let leftnav = "";
                    for(let i = 0; i<ele.left.length; i++){
                        leftnav += `<div class="hot-sell">
                                          <div class="imglt"><img src="${ele.left[i].ltimg}" alt=""></div>
                                          <p>${ele.left[i].ltp}</p>
                                          <span class="hot-price">${ele.left[i].hotprice}</span>
                                          <span class="cost-price">${ele.left[i].costprice}</span>
                                      </div>`
                    }

                    let hotbanner = "";
                    for(let i = 0; i<ele.hotbrand.length; i++){
                        hotbanner += `<div class="img-name"><img src="${ele.hotbrand[i]}" alt=""></div>`
                    }
                    
                    
                    return `<div class="hot" id="${ele.id}">
                                <div class="hot-nav">
                                    <h3>${ele.title}</h3>
                                    <ul>${hotnav}</ul>
                                </div>
                                <div class="hot-shop">
                                    <div class="shop-left">
                                        <img src="${ele.hotimg}" alt="">
                                        <ul>${imgli}</ul>
                                    </div>
                                    <div class="shop-center">
                                        ${centernav}
                                    </div>
                                    <div class="shop-right">
                                        <h3>${ele.leftnav}</h3>
                                        ${leftnav}
                                    </div>
                                </div>
                            </div>
                            <div class="hot-brand">
                                <h3>热卖品牌</h3>
                                <div class="brand-name">${hotbanner}</div>
                            </div>`
                }).join("")

                $(".hotbox").append(hot)
            }
        })
    }
    hotbrand();

    //.....................................................................
    let d = `<div class="recommend"></div>`
    $("#wykl").append(d);
    let recommendnav = () =>{
        $.ajax({
            type: "post",
            url: "/wangyikaola/server/index/recommend.php",
            dataType: "json",
            success: function(response){
                let recommend = function(){
                    return `
                                <div class="nav-title">
                                    <h3>猜你喜欢</h3>
                                    <p>根据你的浏览记录推荐的商品</p>
                                </div>
                                <div class="recommend-nav"></div>
                            `
                };
                $(".recommend").append(recommend);
                let recommendtext = response.map(ele =>{
                    return  `<div class="recommend-text">
                                <div class="text-img">
                                    <img src="${ele.src}" alt="">
                                </div>
                                <div class="text-p">
                                    <h4>${ele.title}</h4>
                                    <p class="p1">${ele.pricea}</p>
                                    <p class="p2">${ele.priceb}</p>
                                    <a href="">${ele.assess}</a>
                                 </div>
                              </div>`
                }).join("");
                $(".recommend-nav").append(recommendtext);
            }
        })
    }
    recommendnav()

    //...............................................................
    let e = `<div class="pledge-nav"></div>`;
    $("#wykl").append(e);
    let pledge = () =>{
        $.ajax({
            type: "post",
            url: "/wangyikaola/server/index/pledge.php",
            dataType: "json",
            success: function(response){
                let pledgebox = function(){
                    return `<div class="pledge">
                                <div class="pledge-center">
                                    <div class="Servicea"></div>
                                </div>
                            </div>`
                }
                $(".pledge-nav").append(pledgebox);

                let pledgetext = response.map(ele => {
                    return `<div class="Service-nav">
                                <b>${ele.title}</b>
                                <h3>${ele.pa}</h3>
                                <p>${ele.pb}</p>
                            </div>`
                }).join("");
                $(".Servicea").append(pledgetext);
            }
        })
        $.ajax({
            type: "post",
            url: "/wangyikaola/server/index/servertext.php",
            dataType: "json",
            success: function(response){
                let severnav = function(){
                    return `<div class="Serviceb">
                                <div class="Serviceb-left">
                                    <img src="./img/logo.png" alt="">
                                </div>
                                <div class="Serviceb-center"></div>
                                <div class="Serviceb-right">
                                    <img src="./img/erweima.png" alt="">
                                    <p>扫描下载手机版</p>
                                </div>
                            </div>`
                }
                $(".pledge-center").append(severnav);

                let severli = response.map(ele =>{
                    let litext = "";
                    ele.litxt.forEach(element => {
                        litext += `<li><a href="">${element}</a></li>`
                    });

                    return `<ul>
                                <h3>${ele.txt}</h3>
                                ${litext}
                            </ul>`
                }).join("");
                $(".Serviceb-center").append(severli);
            }
        })
    }
    pledge() 

    let foot = function(){
        return `<div class="foot">
        <div class="foot-center">
            <p>About NetEase - 公司简介 - 联系方法 - 友情链接 - 招聘信息 - 客户服务 - 隐私政策 - 网络营销 - 网易考拉 </p>
            <p>网络文化经营许可证：浙网文[2019]1372-138号 增值电信业务经营许可证：浙B2-20160288 自营经营者信息 （浙）网械平台备字[2018]第00007号 </p>
            <p>浙公网安备 33010802002216号 网易公司版权所有©1997-2019 互联网药品信息服务资格证书编号（浙）-2017-0027 浙ICP备16011229号-6</p>
            <img src="https://haitao.nos.netease.com/86998579-754f-4f2c-b800-5dae6404a1f6.png" alt="">
            <img src="https://haitao.nos.netease.com/d720d83b55a04b6f932ea845c673c5bf.png" alt="">
        </div>
    </div>`
    }
    $("#wykl").append(foot)
})


