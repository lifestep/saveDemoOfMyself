var pow = Math.pow,
    BACK_CONST = 1.70158;
// t指的的是动画进度 归一化的时间  前面的p
Easing = {
    // 匀速运动
    linear: function (t) {
        return t;
    },
    // 匀加速运动
    easeIn: function (t) {
        return t * t;
    },
    // 减速运动
    easeOut: function (t) {
        return (2 - t) * t;
    },
    //先加速后减速
    easeBoth: function (t) {
        return (t *= 2) < 1 ? .5 * t * t : .5 * (1 - (--t) * (t - 2));
    },
    // 4次方加速
    easeInStrong: function (t) {
        return t * t * t * t;
    },
    // 4次方法的减速
    easeOutStrong: function (t) {
        return 1 - (--t) * t * t * t;
    },
    // 先加速后减速，加速和减速的都比较剧烈
    easeBothStrong: function (t) {
        return (t *= 2) < 1 ? .5 * t * t * t * t : .5 * (2 - (t -= 2) * t * t * t);
    },
    //
    easeOutQuart: function (t) {
        return -(Math.pow((t - 1), 4) - 1)
    },
    // 指数变化 加减速
    easeInOutExpo: function (t) {
        if (t === 0) return 0;
        if (t === 1) return 1;
        if ((t /= 0.5) < 1) return 0.5 *Math.pow(2, 10 * (t - 1));
        return 0.5 * (-Math.pow(2, - 10 * --t) + 2);
    },
    //指数式减速
    easeOutExpo: function (t) {
        return (t === 1) ? 1 : -Math.pow(2, - 10 * t) + 1;
    },
    // 先回弹，再加速
    swingFrom: function (t) {
        return t * t * ((BACK_CONST + 1) * t - BACK_CONST);
    },

    // 多走一段，再慢慢的回弹
    swingTo: function (t) {
        return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1;
    },

    //弹跳
    bounce: function (t) {
        var s = 7.5625,
            r;

        if (t < (1 / 2.75)) {
            r = s * t * t;
        } else if (t < (2 / 2.75)) {
            r = s * (t -= (1.5 / 2.75)) * t + .75;
        } else if (t < (2.5 / 2.75)) {
            r = s * (t -= (2.25 / 2.75)) * t + .9375;
        } else {
            r = s * (t -= (2.625 / 2.75)) * t + .984375;
        }

        return r;
    }
};
