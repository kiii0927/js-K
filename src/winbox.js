/*
 * @Description: 切换博客背景 js
 * @version: 0.0.1
 * @Author: king
 * @Date: 2022-09-26 10:56:18
 * @LastEditors: king
 * @LastEditTime: 2022-09-26 11:43:29
 */

console.log(
    `
  %cHello，欢迎你来到我的博客。
  如果你喜欢上了本站某个样式的话，尽管借鉴即可。
  让我们一起学习进步，如果有什么不解可以给我留言。
  但是请不要恶意攻击本站哦~在此先行谢过了，请你吃糖🍭🍭🍭`,
    'line-height:22px;color:#00a5f2'
);

// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ time: Date.now(), data: data }));
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据;  默认传入的1440
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time;
        // time(1440) * 60 * 1000  即是一天的毫秒数
        if (t < time * 60 * 1000 && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
    let data = loadData('blogbg', 1440);
    if (data) changeBg(data, 1);
    else localStorage.removeItem('blogbg');
} catch (error) {
    localStorage.removeItem('blogbg');
}

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
    let bg = document.getElementById('web_bg');
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s;
        bg.style.backgroundImage = 'none';
    } else bg.style.backgroundImage = s;
    if (!flag) {
        btf.snackbarShow('壁纸切换成功，将于一天后到期~');
        saveData('blogbg', s);
    }
}
// 以下为2.0新增内容

// 创建窗口
var winbox = '';

function createWinbox() {
    let div = document.createElement('div');
    document.body.appendChild(div);
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: '切换背景',
        x: 'center',
        y: 'center',
        minwidth: '300px',
        height: '60%',
        background: 'var(--referto-literature-background-color)',
        onmaximize: () => {
            div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>`;
        },
        onrestore: () => {
            div.innerHTML = '';
        },
    });
    winResize();
    window.addEventListener('resize', winResize);

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
    <style>
        #changeBgBox .note {
            font-size: 14px;
            margin: 0 0 10px;
            padding: 9px 0 9px 2.3rem;
        }
        #changeBgBox .note:not(.no-icon)::before,
        #changeBgBox .note>.note-icon {
            left: 0.5em;
        }
        #changeBgBox button {
            padding:12px 0 !important;
        }
        #changeBgBox a.imgbox {
            text-decoration: none !important;
        }
        #changeBgBox .toggle>.toggle-content {
            margin: 0;
        }
    </style>
    <div id="article-container" style="padding:10px;">
    
    <div class="note info simple">
    <p>点击对应样式即可切换背景。<br>相册图片也可以当作壁纸哦～<a href="/gallery/wallpaper/" data-pjax-state="">前往相册</a></p>
    </div>

    <div class="note pink icon-padding simple">
    <i class="note-icon fas fa-image"></i>
    <p>有效期为一天，到期切回默认壁纸。</p>
    </div>

    <p><button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:#5fcdff;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button></p>
    
    <h2 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h2>
    <details class="toggle">
    <summary class="toggle-button">查看手机壁纸</summary>
    <div class="toggle-content">
        <div class="bgbox">
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2020/12/2020121409235638.jpeg)" class="imgbox" onclick="changeBg('url(https://img.vm.laomishuo.com/image/2020/12/2020121409235638.jpeg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/11/2021111016580917.jpeg)" class="imgbox" onclick="changeBg('url(https://img.vm.laomishuo.com/image/2021/11/2021111016580917.jpeg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://xinzhuobu.com/wp-content/uploads/2022/06/20220617004th.jpg)" class="imgbox" onclick="changeBg('url(https://xinzhuobu.com/wp-content/uploads/2022/06/20220617004th.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/11/2021110119420045.jpeg)" class="imgbox" onclick="changeBg('url(https://img.vm.laomishuo.com/image/2021/11/2021110119420045.jpeg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/11/2021111016525829.jpeg)" class="imgbox" onclick="changeBg('url(https://img.vm.laomishuo.com/image/2021/11/2021111016525829.jpeg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://www.toopic.cn/public/uploads/image/20200407/20200407210607_94155.jpg)" class="imgbox" onclick="changeBg('url(https://www.toopic.cn/public/uploads/image/20200407/20200407210607_94155.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/04/2021040311203011.jpeg)" class="imgbox" onclick="changeBg('url(https://img.vm.laomishuo.com/image/2021/04/2021040311203011.jpeg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(http://img.wwery.com/Sugar/mjYVBNkj.jpg)" class="imgbox" onclick="changeBg('url(http://img.wwery.com/Sugar/mjYVBNkj.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.wwery.com/Sugar/t306AFbf.png)" class="imgbox" onclick="changeBg('url(https://img.wwery.com/Sugar/t306AFbf.png)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.wwery.com/Sugar/HGawPyFe.png)" class="imgbox" onclick="changeBg('url(https://img.wwery.com/Sugar/HGawPyFe.png)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.wwery.com/Sugar/6ih6G7Kq.png)" class="imgbox" onclick="changeBg('url(https://img.wwery.com/Sugar/6ih6G7Kq.png)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.wwery.com/Sugar/oSEupdjk.png)" class="imgbox" onclick="changeBg('url(https://img.wwery.com/Sugar/oSEupdjk.png)')"></a>
        </div>
    </div>
    </details>
    
    
    <h2 id="图片（手机）"><a href="#图片（手机）" class="headerlink" title="图片（手机）" data-pjax-state=""></a>图片（手机）</h2>
    <details class="toggle">
    <summary class="toggle-button">查看手机壁纸</summary>
    <div class="toggle-content">
        <div class="bgbox">
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/05/2021053107390019.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2021/05/2021053107390019.jpeg')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/08/2021082418471438.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2021/08/2021082418471438.jpeg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/05/2021053111333664.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2021/05/2021053111333664.jpeg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/05/2021052509214162.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2021/05/2021052509214162.jpeg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/10/2021101113150626.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2021/10/2021101113150626.jpeg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/12/2021121119294157.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2021/12/2021121119294157.jpeg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2022/05/2022050211365433.jpg)" class="pimgbox" onclick="changeBg('url(https:\//img.vm.laomishuo.com/image/2022/05/2022050211365433.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/01/2021011114540487.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2021/01/2021011114540487.jpeg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/10/2021101112481925.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2021/10/2021101112481925.jpeg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2020/12/2020120109592351.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2020/12/2020120109592351.jpeg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/08/2021081519313621.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2021/08/2021081519313621.jpeg)')"></a>
        </div>
    </div>
    </details>

    <h2 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h2>
    <details class="toggle"><summary class="toggle-button" style="">查看渐变背景</summary>
        <div class="toggle-content">
            <div class="bgbox">
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, rgb(255, 110, 127), rgb(191, 233, 255))" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #ff4b1f, #1fddff)" onclick="changeBg('linear-gradient(to right, #ff4b1f, #1fddff)')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, rgb(251, 215, 134), rgb(247, 121, 125))" onclick="changeBg('linear-gradient(to right, rgb(251, 215, 134), rgb(247, 121, 125))')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #16bffd, #cb3066)" onclick="changeBg('linear-gradient(to right, #16bffd, #cb3066)')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, rgb(192, 192, 170), rgb(28, 239, 255))" onclick="changeBg('linear-gradient(to right, rgb(192, 192, 170), rgb(28, 239, 255))')"></a>
            </div>
        </div>
    </details>

    <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>
    <details class="toggle"><summary class="toggle-button" style="">查看纯色背景</summary>
        <div class="toggle-content">
            <div class="bgbox">
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #F4E2D8" onclick="changeBg('#F4E2D8')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #7D9D9C" onclick="changeBg('#7D9D9C')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #F2D7D9" onclick="changeBg('#F2D7D9')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #76BA99" onclick="changeBg('#76BA99')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #9FC088" onclick="changeBg('#9FC088')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #CEAB93" onclick="changeBg('#CEAB93')"></a>
            </div>
        </div>
    </details>
`;
}

// 适应窗口大小
function winResize() {
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + 'px', '90%').move('center', 'center');
    } else {
        winbox.resize(offsetWid * 0.6 + 'px', '70%').move('center', 'center');
    }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
    else createWinbox();
}
