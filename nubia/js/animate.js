/**
 * Created by lyn on 2017/5/23.
 */
window.onload = function () {
    var width = document.body.clientWidth;
    var container = document.getElementById("container");
    var list = document.getElementById("list");
    // alert(list.style.offsetTop);
    // var s = "-" + width + "px";
    list.style.marginLeft = "0px";
    // alert(parseInt(list.style.marginLeft));
    var buttons = document.getElementById("buttons").getElementsByTagName("li");
    var index = 1;    //用于索引当前按钮
    var len = 3;      //图片的数量
    var animated = false;   //用于判断切换是否进行
    var interval = 3000;    //自动播放定时器秒数，这里是3秒
    var timer;             //定时器
    var start = index + 1;
    // alert(width);

    function animate (offset) {
        animated = true;     //切换进行中
        var time = 300;     //位移总时间
        var inteval = 10;   //位移间隔时间
        var speed = offset/(time/inteval);   //每次位移量
        var left = parseInt(list.style.marginLeft) + offset; //目标值

        var go = function (){
            // list.style.marginLeft = "-100px";
            //这两种情况表示还在切换中
           // alert(parseInt(list.style.marginLeft));
            //alert(left);
            if ( (speed > 0 && parseInt(list.style.marginLeft) < left) || (speed < 0 && parseInt(list.style.marginLeft) > left)) {
                list.style.marginLeft = parseInt(list.style.marginLeft) + speed + 'px';
                setTimeout(go, inteval); //继续执行切换go()函数
            }
            else {
                list.style.marginLeft = left + 'px';
                /*if(left>-width){
                    alert(left);
                    list.style.marginLeft = -width * len + 'px';
                }
                if(left<(-width * len)) {
                    list.style.marginLeft = "-" + width + "px";
                }*/
                animated = false; //切换完成
            }
        }
        go();
    }
    //用于为按钮添加样式
    function showButton() {
        //先找出原来有.on类的按钮，并移除其类
        //alert(buttons.length);
        for (let i = 0; i < buttons.length ; i++) {
            if( buttons[i].className == 'on'){
                //alert(i);
                buttons[i].className = '';
                break;
            }
        }
        //为当前按钮添加类
        //alert("index"+index);
        buttons[index - 1].className = 'on';
    }
    //自动播放
    function play() {
        timer = setTimeout(function () {
            start = index + 1;
            if(start > 3) {
                start = 1;
            }
            buttons[start - 1].onclick();
            start = start + 1;

            play();
        }, interval);
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            // alert(i + "clicked");
            if (animated) {         //如果切换还在进行，则直接结束，直到切换完成
                return;
            }
            if(this.className == 'on') {     //如果点击的按钮是当前的按钮，不切换，结束
                //alert("hello");
                return;
            }
            //获取按钮的自定义属性index，用于得到索引值
            var myIndex = parseInt(this.getAttribute('index'));
            //alert("myindex"+myIndex);
            var offset;
            if(myIndex > index) {
                offset = -width * (myIndex - index)
            } else {
                offset = -width * (myIndex - index)
            }
            //var offset = -width * (myIndex - index);   //计算总的位移量
           // alert(offset);
            animate(offset);
            index = myIndex;   //将新的索引值赋值index
            showButton();
        }
    }


    play();  //调用自动播放函数

}