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
                    <a href="" class="login">登陆</a>
                    <a href="" class="post">免费注册</a>
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
                            <img src="../img/shoppingcar.png" alt="">
                            <span>购物车</span>
                            <span class="shopnum"></span>
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
                        var navgl = `<li><a href="">${ele.nav[i]}</a></li>`
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

//详情页
    let details = $("<div class='details'></div>");
    $("#wykl").append(details);
    let detailscontent = $(".details-content");
    $(".details").append(detailscontent);

    let gid =Number((location.search).split("?")[1].split("=")[1]);

    let tim = function(){
           
       $.ajax({
            type: "post",
            url: "http://127.0.0.1/wangyikaola/server/liebiao/liebiaoa.php",
            dataType: "json",
            data:`gid=${gid}`,
            success:function(ele){
                let text = ele.data[0];
                $(".right-title").html(text.title);
                $(".topb").html(`￥${text.price}`);
                $(".topd").html(`￥${text.del}`);
                $(".magnifier-view img")[0].src = text.img;
                $(".images-cover img")[0].src = text.img;
                $(".small-img img")[0].src = text.img;
                $(".right-title").attr("id", text.gid)
             }
        })
    }
    tim()
    
//给立即添加商品到购物车点击事件
    $(".buy-shop").click(function(){
        let index = $(".right-title")[0].id;
        let price = $(".topb").text().split("￥")[1]

        $.ajax({
            type: "get",
            url: "/wangyikaola/server/shopping/shoppingserver.php",
            dataType: "json",
            data: `gid=${index}&price=${price}`,
            success: function(response){
                
                let textnum = response["totalRow"];
                $(".shopnum").html(textnum);
            }
        })
    })

//给购物车添加点击事件
    $(".shopping").click(function(){
        window.open("http://127.0.0.1/wangyikaola/html/shopping.html");
    })
    

    //创建底部
    let e = `<div class="pledge"></div>`;
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
                $(".pledge").append(pledgebox);

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
                                    <img src="http://haitao.nos.netease.com/70dee793-133d-4628-b374-b99e29aad157.png?imageView&thumbnail=220x0&quality=85&v=1" alt="">
                                </div>
                                <div class="Serviceb-center"></div>
                                <div class="Serviceb-right">
                                    <img src="https://haitao.nos.netease.com/880b10ac-5714-4c1b-89a9-e24c2302ac79.png" alt="">
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


