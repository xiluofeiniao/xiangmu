$(function(){

    $(".playphnoe").click(function () { 
        $(".logina").addClass("going");
        $(".loginb").removeClass("going");
    });

    $(".playpassword").click(function () { 
        $(".loginb").addClass("going");
        $(".logina").removeClass("going"); 
    });

    $(".mail-btn").click(function () { 
        $(".loginc").addClass("going");
        $(".logina").removeClass("going");
        $(".loginb").removeClass("going");
    });

    $(".phone-btn").click(function () { 
        $(".loginb").addClass("going");
        $(".logina").removeClass("going");
        $(".loginc").removeClass("going");  
    });
    
    $(".post").click(function () { 
        $(".post-in").addClass("going");
        $(".logina").removeClass("going");
        $(".loginb").removeClass("going");
        $(".loginc").removeClass("going");   
    });

    $(".post-one").click(function () { 
        $(".loginb").addClass("going");
        $(".logina").removeClass("going");
        $(".loginc").removeClass("going");
        $(".post-in").removeClass("going");   
    });

    
    let regPhone = /^1[3-9]\d{9}$/; 
    let regPassword = /^[a-zA-Z0-9]{6,16}$/;

    let nametext = "";
    let wordtext = "";
    let imgtext = "";

    let oPostusername = $("#postusername");
    let oPostword = $("#postword");
    let oImgcode = $("#imgcode");

    let imgCodeText = "";
    (new Captcha({ fontSize: 90 })).draw(document.querySelector('#captcha'), r => {
        imgCodeText = r;
        oImgcode.trigger("blur");
    });

    //注册.................................................
    //用户名验证
    oPostusername.blur(function (e) { 
        let text = $.trim($(this).val());
        nametext = text;
        if(text.length == 0){
            $('.inputtext').html("手机号不能为空!");
        }else if(!regPhone.test(text)){
            $('.inputtext').html("手机号不符合规范!");
        }else{
            $('.inputtext').html("");
        }
    });

    //密码验证
    oPostword.password.type = "password";
    oPostword.blur(function (e) { 
        let text = $.trim($(this).val());
        wordtext = text;
        if(text.length == 0){
            $('.inputtext').html("密码不能为空!");
        }else if(!regPassword.test(text)){
            $('.inputtext').html("密码不符合规范!");
        }else{
            $('.inputtext').html("");
        }
    });

    //验证码验证
        oImgcode.blur(function (e) { 
        let text = $.trim($(this).val());
        imgtext = text;
            if(text.length == 0){
                $('.inputtext').html("验证码不能为空!");
            }else if(imgCodeText.toLowerCase() != text.toLowerCase()){
                $('.inputtext').html("验证码不正确!");
            }else{
                $('.inputtext').html("");
            }
        });
    
    //点击注册
    $("#postbtn").click(function(){
        let isbox = $("#cookiebox").is(":checked")
        if(!isbox){
            alert("请阅读和同意《服务条款》和《网易考拉私隐政策》");
            return
        }


        if(nametext.length != 0 && 
           wordtext.length != 0 && 
           imgtext.length != 0 && 
           $('.inputtext').text().length == 0){
               
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1/wangyikaola/server/dengluzhuce/post.php",
                    dataType: "json",
                    data: `username=${nametext}&password=${wordtext}`,
                    success: function (response) {
                                        
                        if (response.status == "success") {
                            alert(response.msg);
  
                            window.location.href = "http://127.0.0.1/wangyikaola/html/dengluzhuce.html"
                        } else {
                            alert(response.msg);
                        }    
                    }
                });
        }
    })


    //登陆................................................
    

    let oLandname = $("#landname");
    oLandname.blur(function (e) { 
        let text = $.trim($(this).val());
        nametxt = text;
        if(text.length == 0){
            $('.inputtxt').html("手机号不能为空!");
        }else if(!regPhone.test(text)){
            $('.inputtxt').html("手机号不符合规范!");
        }else{
            $('.inputtxt').html("");
        }
    });

    let oLandword = $("#landword");
    oLandword.blur(function (e) { 
        let text = $.trim($(this).val());
        wordtxt = text;
        if(text.length == 0){
            $('.inputtxt').html("密码不能为空!");
        }else if(!regPassword.test(text)){
            $('.inputtxt').html("密码不符合规范!");
        }else{
            $('.inputtxt').html("");
        }
    });

    //点击登陆
    $(".password-login-in").click(function(){

        let nametxt = oLandname.val();
        let wordtxt = oLandword.val();

        $.ajax({
            type: "post",
            url: "/wangyikaola/server/dengluzhuce/login.php",
            dataType: "json",
            data: `username=${nametxt}&password=${wordtxt}`,
            success: function(response){

                if (response.status == "success") {
                    alert(response.msg);

                    window.location.href = "https://www.bilibili.com"
                } else {
                    alert(response.msg);
                }   
                
            }
        })
    })

})