// maybe some helper functions

var compile = function (musexpr) {
    var sequence = [],
        time = 0;
    
    function compileHelper(expr) {
        if (expr.tag == 'note') {
            sequence.push({ tag: 'note',
                           pitch: expr.pitch,
                           dur: expr.dur,
                           start: time });
            time += expr.dur;
        } else {
            compileHelper(expr.left);
            compileHelper(expr.right);
        }                 
    }
    
    // your code here
    compileHelper(musexpr);
    return sequence;
};