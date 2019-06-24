window.onload = function () {
  //获取dom元素
  var arrow = document.querySelector('#header .headMain .arrow')
  var liNodes = document.querySelectorAll('#header .headMain > .nav > .list > li')
  var upNodes = document.querySelectorAll('#header .headMain > .nav > .list > li .up')
  var firstLiNode = liNodes[0];
  var firstUpNode = firstLiNode.querySelector(".up");

  var head = document.querySelector("#header");
  var content = document.querySelector("#content");
  var cLiNodes = document.querySelectorAll("#content .list > li");
  var documentHeight = document.body.clientHeight || document.documentElement.clientHeight
  var cList = document.querySelector("#content .list");
  //小圆点样式
  var dotLis = document.querySelectorAll("#content > .dot > li");
  var now = 0
  var timer = null
  //音频
  var music = document.querySelector("#header > .headMain .music");
  var audio = document.querySelector("#header > .headMain .music audio");
  music.onclick = function () {
    if (audio.paused) {
      audio.play();
      music.style.background = "url(img/musicon.gif)";
    } else {
      audio.pause();
      music.style.background = "url(img/musicoff.gif)";
    }
  }
  // 出入场
  var preIndex = 0
  var anArr = [
    {
      inAn: function () {
        var home1 = document.querySelector("#content > .list > .home .home1");
        var home2 = document.querySelector("#content > .list > .home .home2");

        home1.style.transform = "translateY(0px)";
        home2.style.transform = "translateY(0px)";
        home1.style.opacity = 1;
        home2.style.opacity = 1;
      },
      outAn: function () {
        var home1 = document.querySelector("#content > .list > .home .home1");
        var home2 = document.querySelector("#content > .list > .home .home2");

        home1.style.transform = "translateY(-400px)";
        home2.style.transform = "translateY(100px)";
        home1.style.opacity = 0;
        home2.style.opacity = 0;
      }
    },
    {
      inAn: function () {
        var plane1 = document.querySelector("#content  .course .plane1");
        var plane2 = document.querySelector("#content  .course .plane2");
        var plane3 = document.querySelector("#content  .course .plane3");

        plane1.style.transform = "translate(0px,0px)";
        plane2.style.transform = "translate(0px,0px)";
        plane3.style.transform = "translate(0px,0px)";
      },
      outAn: function () {
        var plane1 = document.querySelector("#content  .course .plane1");
        var plane2 = document.querySelector("#content  .course .plane2");
        var plane3 = document.querySelector("#content  .course .plane3");

        plane1.style.transform = "translate(-200px,-200px)";
        plane2.style.transform = "translate(-200px,200px)";
        plane3.style.transform = "translate(200px,-200px)";
      }
    },
    {
      inAn: function () {
        var pencel1 = document.querySelector("#content  .works .pencel1");
        var pencel2 = document.querySelector("#content  .works .pencel2");
        var pencel3 = document.querySelector("#content  .works .pencel3");

        pencel1.style.transform = "translateY(0px)";
        pencel2.style.transform = "translateY(0px)";
        pencel3.style.transform = "translateY(0px)";
      },
      outAn: function () {
        var pencel1 = document.querySelector("#content  .works .pencel1");
        var pencel2 = document.querySelector("#content  .works .pencel2");
        var pencel3 = document.querySelector("#content  .works .pencel3");

        pencel1.style.transform = "translateY(-100px)";
        pencel2.style.transform = "translateY(100px)";
        pencel3.style.transform = "translateY(100px)";
      }
    },
    {
      inAn: function () {
        var Rect1 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(1)");
        var Rect2 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(2)");

        Rect1.style.transform = "rotate(0deg)";
        Rect2.style.transform = "rotate(0deg)";
      },
      outAn: function () {
        var Rect1 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(1)");
        var Rect2 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(2)");

        Rect1.style.transform = "rotate(45deg)";
        Rect2.style.transform = "rotate(-45deg)";
      }
    },
    {
      inAn: function () {
        var Rect1 = document.querySelector("#content > .list > .team .team1");
        var Rect2 = document.querySelector("#content > .list > .team .team2");

        Rect1.style.transform = "translateX(0px)";
        Rect2.style.transform = "translateX(0px)";
      },
      outAn: function () {
        var Rect1 = document.querySelector("#content > .list > .team .team1");
        var Rect2 = document.querySelector("#content > .list > .team .team2");

        Rect1.style.transform = "translateX(-200px)";
        Rect2.style.transform = "translateX(200px)";
      }
    }
  ]
  for (var i = 0; i < anArr.length; i++) {
    anArr[i]["outAn"]();
  }
  setTimeout(function () {
    anArr[0].inAn();
  }, 2000)
  // 第一屏3d效果
  var home2LiNodes = document.querySelectorAll("#content > .list > .home .home2 > li");
  var home1LiNodes = document.querySelectorAll("#content > .list > .home .home1 > li");
  var home1 = document.querySelector("#content > .list > .home .home1");
  var oldIndex = 0;
  var timer3D = null;
  var autoIndex = 0;
  home3D()
  function home3D() {
    for (var i = 0; i < home2LiNodes.length; i++) {
      home2LiNodes[i].index = i
      home2LiNodes[i].onclick = function () {
        for (var i = 0; i < home2LiNodes.length; i++) {
          home2LiNodes[i].classList.remove('active')
        }
        home2LiNodes[this.index].classList.add('active')
        //从左往右  当前索引大于上一次索引  rightShow
        if (this.index > oldIndex) {
          home1LiNodes[this.index].classList.remove('leftHide')
          home1LiNodes[this.index].classList.remove('leftShow')
          home1LiNodes[this.index].classList.remove('rightHide')
          home1LiNodes[this.index].classList.add('rightShow')

          home1LiNodes[oldIndex].classList.remove('rightShow')
          home1LiNodes[oldIndex].classList.remove('leftShow')
          home1LiNodes[oldIndex].classList.remove('rightHide')
          home1LiNodes[oldIndex].classList.add('leftHide')
        }
        //从右往左  当前索引小于上一次索引 leftShow
        if (this.index < oldIndex) {
          home1LiNodes[this.index].classList.remove('leftHide')
          home1LiNodes[this.index].classList.remove('rightHide')
          home1LiNodes[this.index].classList.remove('rightShow')
          home1LiNodes[this.index].classList.add('leftShow')

          home1LiNodes[oldIndex].classList.remove('leftHide')
          home1LiNodes[oldIndex].classList.remove('rightShow')
          home1LiNodes[oldIndex].classList.remove('leftShow')
          home1LiNodes[oldIndex].classList.add('rightHide')
        }
        oldIndex = this.index
        autoIndex = this.index;
      }

    }
    //3D自动轮播
    move()
    function move() {
      clearInterval(timer3D)
      timer3D = setInterval(function () {
        autoIndex++;

        //无缝
        if (autoIndex == home1LiNodes.length) {
          autoIndex = 0;
        }


        for (var i = 0; i < home2LiNodes.length; i++) {
          home2LiNodes[i].classList.remove("active");
        }
        home2LiNodes[autoIndex].classList.add("active");

        home1LiNodes[autoIndex].classList.remove("leftShow");
        home1LiNodes[autoIndex].classList.remove("leftHide");
        home1LiNodes[autoIndex].classList.remove("rightHide");
        home1LiNodes[autoIndex].classList.add("rightShow");


        home1LiNodes[oldIndex].classList.remove("leftShow");
        home1LiNodes[oldIndex].classList.remove("rightShow");
        home1LiNodes[oldIndex].classList.remove("rightHide");
        home1LiNodes[oldIndex].classList.add("leftHide");

        oldIndex = autoIndex
      }, 2000)
    }
    home1.onmouseenter = function () {
      clearInterval(timer3D)
    }
    home1.onmouseleave = function () {
      move()
    }
  }
  //第五屏效果
  var team3Lis = document.querySelectorAll("#content > .list > .team .team3 ul>li");
  show()
  function show() {
    for (var i = 0; i < team3Lis.length; i++) {
      team3Lis[i].onmouseenter = function () {
        for (var i = 0; i < team3Lis.length; i++) {
          team3Lis[i].style.opacity = .2;
        }
        this.style.opacity = 1;
      }
      team3Lis[i].onmouseleave = function () {
        for (var i = 0; i < team3Lis.length; i++) {
          team3Lis[i].style.opacity = 1;
        }
      }
    }
  }
  //可视区域随缩放或扩大时随着改变
  window.onresize = function () {
    contentBind()
    cList.style.top = -now * (documentHeight - head.offsetHeight) + "px";
    arrow.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth / 2 - arrow.offsetWidth / 2 + "px";
  }

  //滚动鼠标实现滑屏效果
  if (content.addEventListener) {
    content.addEventListener('DOMMouseScroll', function (e) {
      e = e || window.event
      //让fn的逻辑在DOMMouseScroll事件被频繁触发的时候只执行一次
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn(e)
      }, 200)
    })
  }
  content.onmousewheel = function (e) {
    e = e || window.event
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn(e)
    }, 200)
  }
  function fn(e) {
    console.log('123')
    e = e || window.event
    var dir = ''
    if (e.wheelDelta) {
      dir = e.wheelDelta > 0 ? 'up' : 'down'
    } else if (e.detail) {
      dir = e.detail < 0 ? 'up' : 'down'
    }
    console.log(now)
    preIndex = now
    switch (dir) {
      case "up":
        if (now > 0) {
          now--;
          move(now);
        }
        break;
      case "down":
        if (now < cLiNodes.length - 1) {
          now++;
          move(now);
        }
        move(now)
        break;
    }
  }
  //内容区的高度
  contentBind()
  function contentBind() {
    //动态计算内容区的宽度
    content.style.height = documentHeight - head.offsetHeight + 'px';
    for (var i = 0; i < cLiNodes.length; i++) {
      cLiNodes[i].style.height = documentHeight - head.offsetHeight + 'px';
    }
  }
  //头部交互
  headBind()
  function headBind() {
    //页面加载时arrow移到第一个li标签下
    firstUpNode.style.width = '100%'
    arrow.style.left = firstLiNode.offsetLeft + firstLiNode.offsetWidth / 2 - arrow.offsetWidth / 2 + "px";
    //点击li,arrow移动到对应的li标签下
    for (var i = 0; i < liNodes.length; i++) {
      liNodes[i].index = i
      liNodes[i].onclick = function () {
        console.log('132233')
        preIndex = now
        move(this.index)
        now = this.index;
      }
    }
    for (var i = 0; i < dotLis.length; i++) {
      dotLis[i].index = i;
      dotLis[i].onclick = function () {
        //i:liNodes.length 5
        preIndex = now;
        move(this.index);
        now = this.index;
      }
    }
  }
  //动画的核心函数

  function move(index) {
    for (var i = 0; i < upNodes.length; i++) {
      //upNodes[i].style.width="0";
      upNodes[i].style.width = "";
    }
    for (var i = 0; i < dotLis.length; i++) {
      dotLis[i].className = "";
    }
    dotLis[index].className = "active";
    upNodes[index].style.width = "100%";
    arrow.style.left = liNodes[index].offsetLeft + liNodes[index].offsetWidth / 2 - arrow.offsetWidth / 2 + "px";
    cList.style.top = -index * (documentHeight - head.offsetHeight) + "px";
    //出入场
    if (anArr[index] && typeof anArr[index]["inAn"] === "function") {
      anArr[index]["inAn"]();
    }
    if (anArr[preIndex] && typeof anArr[preIndex]["inAn"] === "function") {
      anArr[preIndex]["outAn"]();
    }
  }

}
