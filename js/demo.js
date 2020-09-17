// window.onload = function () {
//样式配置单
var config = [{
    width: 400,
    top: 20,
    left: 50,
    opacity: 0.2,
    "z-index": 2,
  }, //0
  {
    width: 600,
    top: 70,
    left: 0,
    opacity: 0.8,
    "z-index": 3,
  }, //1
  {
    width: 800,
    top: 120,
    left: 200,
    opacity: 1,
    "z-index": 4,
  }, //2
  {
    width: 600,
    top: 70,
    left: 600,
    opacity: 0.8,
    "z-index": 3,
  }, //3
  {
    width: 400,
    top: 20,
    left: 750,
    opacity: 0.2,
    "z-index": 2,
  }, //4
];

//1.获取元素
let wrap = document.getElementById("wrap"); //整个大盒子
let arrow = document.getElementById("arrow"); //装左右焦点的盒子
let lis = document.querySelectorAll("#slide>ul>li"); //所有的li标签
let arrLeft = document.getElementById("arrLeft"); //左边焦点
let arrRight = document.getElementById("arrRight"); //右边焦点

//给大盒子设置鼠标移入移出事件:显示隐藏左右焦点
wrap.onmouseover = function () {
  arrow.style.opacity = 1;
};
wrap.onmouseout = function () {
  arrow.style.opacity = 0;
};

//声明一个变量,用来记录能不能做动画.
let flag = true;

//2.遍历每一个li标签,缓动动画设置样式
showStyles();

function showStyles() {
  for (let i = 0; i < lis.length; i++) {
    animateSlow(lis[i], config[i], function () {
      //动画做完了,就运行再次做动画
      flag = true;
    });
  }
}

//3.给右边交单设置一个点击事件.
arrRight.onclick = function () {
  if (flag == true) {
    //把config数组的最后一个删掉 添加到第一个
    config.unshift(config.pop());
    //根据新的数组配置项(新的样式),给li标签设置样式
    showStyles();

    //把flag的值改成一个false.
    flag = false;
  }
};

//4.给左边焦点设置一个点击事件.
arrLeft.onclick = function () {
  if (flag == true) {
    //把config数组的第一个删掉,添加到最后一个
    config.push(config.shift());
    //根据新的数组配置项(新的样式),给li标签设置样式
    showStyles();

    flag = false;
  }
};
// };