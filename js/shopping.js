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


//购物车商品列表
let oshopping = $("<div class='shopping-box'></div>");
$("#wykl").append(oshopping);
let shopcon = $(".shopping-content")
$(".shopping-box").append(shopcon);

var targetData;

shopnav();
function shopnav(){

    $.ajax({
        type: "get",
        url: "http://127.0.0.1/wangyikaola/server/shopping/shopping.php",
        dataType: "json",
        success: function(data){
            targetData = data;
            let res = data.map(function(ele){
                let shoptxt = `<div class="shop-nav" id="${ele.gid}">
                <div class="fang">
                    <input class="shopcheck" type="checkbox" ${ele.isactive==1 ? "checked" : ""}>
                </div>
                <dl class="shop-text">
                    <dt>
                        <img src="${ele.img}" alt="">
                    </dt>
                    <dd>${ele.title}</dd>
                </dl>
                <div class="shop-price">￥${ele.price}</div>
                <div class="buy-num">
                    <div class="num-box">
                        <button class="btna">-</button>
                        <input type="text" class="shu-box" value=${ele.num}>
                        <button class="btnb">+</button>
                    </div>
                </div>
                <div class="money">￥${ele.money}</div>
                <a href="javascript:void(0)" class="do">删除</a>
            </div>`
            return shoptxt;
            }).join("");
            $(".shoppingbox").append(res);
            buymoneyall();
        }
    })
}


//创建总价
function buymoneyall() {

    var rese = 0;
    // debugger;
    targetData.forEach(element => {
        if (element.isactive == 1) {
            rese += element.money * 1;
        }
    });
    
    $(".buymoney").html("总计：" + rese);
}

//全选点击事件
$("#allshop").click(function() {
    $(".shopcheck").prop("checked", $(this).is(":checked"))
})


//点击勾选改变总价
$(".shoppingbox").on("click", ".shopcheck", function() {
    var gid = $(this).parents(".shop-nav")[0].id
    
    var isactive = $(this).is(":checked");
    $.ajax({
        type: "get",
        url: "http://127.0.0.1/wangyikaola/server/shopping/shopbox.php",
        data: `gid=${gid}&isactive=${isactive}`,
        dataType: "dataType",
        success: function(response) {
            shopnav();
        }
    });
})

//删除点击事件
$(".shoppingbox").on("click", ".do", function() {
    var gid = $(this).parents(".shop-nav")[0].id
    $.ajax({
        type: "get",
        url: "http://127.0.0.1/wangyikaola/server/shopping/removeshop.php",
        data: "gid=" + gid,
        success: function(response) {
           console.log(response);
           
        }
    });
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


