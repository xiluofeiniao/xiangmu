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

    let imgCodeText = "";
    (new Captcha({ fontSize: 90 })).draw(document.querySelector('#captcha'), r => {
        imgCodeText = r;
    });

    let regUsername = /^[A-Za-z]{6,8}$/;
    let regPhone = /^1[3-9]\d{9}$/; 
    let regPassword = /^[a-zA-Z0-9]{6,16}$/;
})