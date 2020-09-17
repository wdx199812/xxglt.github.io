//---------------------------------------------------
//缓动动画做一个函数封装.
//01-动画最终到达的目标位置不要写死 
//02-做动画的元素不要写死
//03-方向不写死
//04-做动画的样式不写死
//05-做动画的样式是多个不是一个.
//06-添加回调函数
//07-样式中有透明度和z-index
function animateSlow(ele, obj, fn) {
    //设置新计时器之前清空老的计时器
    clearInterval(ele.timerId);
    //设置计时器
    ele.timerId = setInterval(function () {
        //假设 当前移动的这一次 所有的属性都到达了目的地. 
        let flag = true;

        //遍历obj这个对象,拿到每一个要做动画的样式,来让他到达目标位置
        for (let key in obj) {
            //判断一下当前这个key是不是opacity
            if (key == 'opacity') {

                //获取元素传进来的样式的当前的值
                let currentValue = getStyle(ele, key) * 100;
                //设置步长
                let step = (obj[key] * 100 - currentValue) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //计算
                currentValue += step;
                //判断
                if (currentValue != obj[key] * 100) {
                    //假设失败
                    flag = false;
                }
                //赋值.
                ele.style[key] = currentValue / 100;
                console.log(key, step, currentValue);

            } else if (key == 'z-index' || key == 'zIndex') {
                //如果动画改变的是层级
                //直接赋值. 
                ele.style[key] = obj[key];
                console.log('z-index', obj[key]);
            } else {

                //获取元素传进来的样式的当前的值
                let currentValue = parseInt(getStyle(ele, key));
                //设置步长
                let step = (obj[key] - currentValue) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //计算
                currentValue += step;
                //判断
                if (currentValue != obj[key]) {
                    //假设失败
                    flag = false;
                }
                //赋值.
                ele.style[key] = currentValue + 'px';
                console.log(key, step, currentValue);
            }
        }

        //到了这里flag的值还是true,说明假设成功.说明所有的属性都已经到了目的地
        //就应该清空计时器
        if (flag == true) {
            clearInterval(ele.timerId);
            //调用fn
            if (typeof fn == 'function') {
                fn();
            }
        }

    }, 50);
}


//封装一个兼容函数--------
function getStyle(ele, attr) {
    //能力检测
    if (window.getComputedStyle != undefined) {
        //支持
        return window.getComputedStyle(ele, null)[attr]
    } else {
        //不支持
        return ele.currentStyle[attr]
    }
}