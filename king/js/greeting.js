/* greeting.js */
(() => {
    //- 创建盒子
    let div = document.createElement('div');
    //- 设置ID
    div.id = 'greeting';
    //- 设置class
    div.classList.add('show');
    //- 插入盒子
    let greetingBox = document.querySelector('#greetingBox');
    greetingBox.appendChild(div);
    const nowTime = new Date().getHours();
    let greetings = '';
    if (0 <= nowTime && nowTime <= 5) {
        greetings = '晚安😴';
    } else if (5 < nowTime && nowTime <= 10) {
        greetings = '早上好鸭👋, 祝你一天好心情！';
    } else if (10 < nowTime && nowTime <= 11) {
        greetings = '上午好👋, 状态很好，鼓励一下～';
    } else if (11 < nowTime && nowTime <= 12) {
        greetings = '11点多啦, 在坚持一下就吃饭啦～';
    } else if (12 < nowTime && nowTime < 14) {
        greetings = '午安👋, 宝贝';
    } else if (14 <= nowTime && nowTime <= 18) {
        greetings = '下午好👋, 继续加油喔。';
    } else if (18 < nowTime && nowTime <= 19) {
        greetings = '充实的一天辛苦啦！';
    } else if (19 < nowTime && nowTime <= 20) {
        greetings = '19点喽, 奖励一顿丰盛的大餐吧。';
    } else if (19 < nowTime && nowTime <= 24) {
        greetings = '晚上好👋, 在属于自己的时间好好放松😌~';
    } else {
        greetings = '晚上好👋';
    }
    div.innerHTML = greetings;
    setTimeout(() => {
        div.classList.remove('show');
    }, 3500);
})();