var endTime = function (time, expr) {
    if (expr.tag == 'note') {
        return time + expr.dur;
    } else {
        return endTime(endTime(time, expr.left),
                       expr.right);
    }
};