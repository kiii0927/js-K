/*
 * @Description: custom js
 * @version:
 * @Author: king
 * @Date: 2022-09-16 00:49:50
 * @LastEditors: king
 * @LastEditTime: 2022-09-19 22:34:00
 */
var flag;

//  @Description: 返回顶部 显示网页阅读进度

window.addEventListener('scroll', percent); // 执行函数

// 页面百分比
function percent() {
    let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
        b =
            Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight,
                document.body.clientHeight,
                document.documentElement.clientHeight
            ) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
        result = Math.round((a / b) * 100), // 计算百分比
        btn = document.querySelector('#percent'); // 获取图标
    result <= 99 || (result = 99), (btn.innerHTML = result);
}
document.getElementById('page-name').innerText = document.title.split(' | king')[0];

// 隐藏分页按钮
function paginationHidden() {
    let p_father = document.getElementById('pagination');
    if (p_father == null) return;
    let count = p_father.getElementsByTagName('a').length;
    // 如果分页只有一页就隐藏
    count < 1 ? (p_father.style.display = 'none') : '';
}

paginationHidden();

/* 
    通过 data-pjax属性的的js，在页面切换后执行重载，达到局部刷新的效果。
    see: https://akilar.top/posts/3b78b69a/
 */

// 监听网络状态
window.addEventListener('online', function () {
    // alert('网络连接了');
    btf.snackbarShow('网络连接了~');
});

window.addEventListener('offline', function () {
    alert('网络断开了');
    // btf.snackbarShow('网络断开了~');
});

// 禁止用户 f12
document.οncοntextmenu = function () {
    return false;
};
document.onselectstart = function () {
    return false;
};
document.oncontextmenu = function () {
    return false;
};
//在本网页的任何键盘敲击事件都是无效操作 （防止F12和shift+ctrl+i调起开发者工具）
window.onkeydown =
    window.onkeyup =
    window.onkeypress =
        function () {
            return true;
        };
//禁用开发者工具F12
document.onkeydown = function () {
    if (window.event && window.event.keyCode == 123) {
        console.log(`%c W23-12 %c 你已打开控制台.`, 'color:white; background-color:#4f90d9');
        console.log(`%c S013-782 %c 你现在正处于监控中.`, 'color:white; background-color:#d9534f');
        btf.snackbarShow('开发者模式已打开，请遵循GPL协议');
        return true;
    }
};

window.onload = function () {
    if (isWeiXin()) return alert('微信浏览器~推荐在PC端访问哦~');

    if (isQQBrowser()) return alert('QQ浏览器~推荐在PC端访问哦~');

    if (!isPC()) {
        // alert('PC端访问效果更加哦');
        btf.snackbarShow('PC端访问效果更加哦~');
    }
};

/**
 * @description 是否是PC端
 * @returns
 */
var isPC = () => {
    var userAgentInfo = navigator.userAgent;
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};

/**
 * @description 是否是微信浏览器
 * @returns
 */
var isWeiXin = () => {
    return navigator.userAgent.match(/microMessenger/i) == 'micromessenger';
};

/**
 * @description 是否是qq浏览器
 * @returns
 */
var isQQBrowser = () => {
    return !!navigator.userAgent.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i);
};

'/essay/' == location.pathname && changeTimeInEssay(),
    document.getElementById('post-comment') && owoBig();

// 时间格式化
function changeTimeInEssay() {
    document.querySelector('#bber') &&
        document.querySelectorAll('#bber time').forEach(function (e) {
            var t = e,
                o = t.getAttribute('datetime');
            (t.innerText = bbDiffDate(o, !0)), (t.style.display = 'inline');
        });
}
function bbDiffDate(e, t) {
    var n,
        r,
        o,
        i = 1 < arguments.length && void 0 !== t && t,
        a = new Date(),
        s = new Date(e),
        u = a.getTime() - s.getTime();
    return i
        ? ((n = u / 864e5),
          (r = u / 36e5),
          (o = u / 6e4),
          12 < u / 2592e6
              ? s.toLocaleDateString()
              : 7 <= n
              ? s.toLocaleDateString().substr(5)
              : 1 <= n
              ? parseInt(n) + '' + GLOBAL_CONFIG.date_suffix.day
              : 1 <= r || 1 <= o
              ? '最近'
              : GLOBAL_CONFIG.date_suffix.just)
        : parseInt(u / 864e5);
}

// 即刻文章点击跳转评论
function rightMenuCommentText(e) {
    var n = document.getElementsByClassName('el-textarea__inner')[0],
        t = document.createEvent('HTMLEvents');
    if (!n) return;
    document.getElementById('comment-tips').classList.add('show');
    t.initEvent('input', !0, !0);
    var o = replaceAll(e, '\n', '\n> ');
    (n.value = '"' + o + '" >>> \n'), n.dispatchEvent(t);
    var i = document.querySelector('#post-comment').offsetTop;
    window.scrollTo(0, i - 80),
        n.focus(),
        n.setSelectionRange(-1, -1),
        document.getElementById('comment-tips') &&
            document.getElementById('comment-tips').classList.add('show');
}
function replaceAll(e, t, n) {
    return e.split(t).join(n);
}

function owoBig() {
    let e = 1,
        t = '',
        n = document.createElement('div');
    (n.id = 'owo-big'),
        document.querySelector('body').appendChild(n),
        document.getElementById('post-comment').addEventListener('DOMNodeInserted', o => {
            if (o.target.classList && (o.target.classList.value, 1)) {
                let a = o.target;
                a.addEventListener('contextmenu', e => e.preventDefault()),
                    a.addEventListener('mouseover', o => {
                        'LI' == o.target.tagName &&
                            e &&
                            ((e = !1),
                            (t = setTimeout(() => {
                                let e = 3 * o.path[0].clientHeight,
                                    t = 3 * o.path[0].clientWidth,
                                    a = o.x - o.offsetX - (t - o.path[0].clientWidth) / 2,
                                    l = o.y - o.offsetY;
                                (n.style.height = e + 'px'),
                                    (n.style.width = t + 'px'),
                                    (n.style.left = a + 'px'),
                                    (n.style.top = l + 'px'),
                                    (n.style.display = 'flex'),
                                    (n.innerHTML = `<img src="${
                                        o.target.querySelector('img').src
                                    }">`);
                            }, 300)));
                    }),
                    a.addEventListener('mouseout', o => {
                        (n.style.display = 'none'), (e = 1), clearTimeout(t);
                    });
            }
        });
}

function waterfall(container, item) {
    // let item = document.getElementsByClassName('item');
    //获取元素的宽度
    let width = item[0].offsetWidth;
    //计算出应该放几列（向下取整）
    let columnCount = Math.floor(container.offsetWidth / width);
    // 设置container盒子的高度
    let clo = Math.ceil(item.length / columnCount);
    let totalHeight = Math.ceil(item[0].offsetHeight) * clo + clo * 17 + 100;
    container.style.height = totalHeight + 'px';
    // 设置每一个item元素的排列位置
    //  第一行整体的top值都是0 后面的依次找上一行高度最小的容器，在它下面进行排列
    let hrr = [];

    for (let i = 0; i < item.length; i++) {
        //定位第一行的图片
        if (i < columnCount) {
            item[i].style.top = '0px';
            i != 0
                ? (item[i].style.left = i * width + i * 28 + 'px')
                : (item[i].style.left = i * width + 'px');
            hrr.push(item[i].offsetHeight + 16);
        } else {
            //第一行之后的
            //选择总高度最小的列
            let min = Math.min(...hrr);
            let index = hrr.indexOf(min);
            //将每个元素定位到当前总高度最小的列下
            item[i].style.top = min + 'px';
            // 设置每个item定位的位置(间距)
            /*
                width------>item的宽度
                count------>到三归零, 因为最大就排3列
                    index = 0  就直接 index * width就好了, left = index * width(0); /第一列
                    index = 1  就直接 width + 28的间距距离   left = index(1) * width + 28 + 'px'; 第二列
                    index = 2  left = index * width + count * 28的间距
                        还有一种情况, 上一列的某个item内容较多, 高度高出其它的item高度, 导致下列排不下三个item
                          0  1  2
                          0     1
                          0  1  2
                             0  2
                            index === 2 && count === 1  这个说明第一列变成第二列、二---->三(0 2)
                            那么它的间距要是28的双倍也就是56; left = index * width + 56 + 'px'
                */
            index != 0
                ? index != 1
                    ? (item[i].style.left = index * width + index * 28 + 'px')
                    : (item[i].style.left = width + 28 + 'px')
                : (item[i].style.left = 0 + 'px');

            //当前定位的元素加入该列
            hrr[index] += item[i].offsetHeight + 16;
        }
    }
}
var king = {
    /* 即刻文章瀑布布局 */
    // 获取container盒子
    container: document.getElementById('waterfall'),
    //注意：浏览器的可视区域的宽度 / 一个item元素的宽度 = 一行的排列的元素的个数
    item: document.getElementsByClassName('item'),
    reflashEssayWaterFall: function () {
        king.container &&
            setTimeout(function () {
                if (!king.item || !king.item.length) return;
                waterfall(king.container, king.item);
                king.container.classList.add('show');
            }, 500);
    },
    showIndexElement(e) {
        e &&
            setTimeout(() => {
                e.classList.add('show');
            }, 500);
    },
    initIndexEssay: function () {
        new Swiper('.swiper-container', {
            direction: 'vertical', // 垂直切换选项
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: true,
                // pauseOnMouseEnter: !0 //鼠标放上去不轮播
            },
            mousewheel: true,
        });
    },
};

window.onload = function () {
    king.initIndexEssay();
};
king.reflashEssayWaterFall(), //每次页面改变大小调用
    king.showIndexElement(document.getElementById('content-inner')),
    window.addEventListener('resize', king.reflashEssayWaterFall);
