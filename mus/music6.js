// this is all you
// maybe some helper functions
function pDuration(parExpr) {
    // assuming par contains two notes
    return Math.max(parExpr.left.dur, parExpr.right.dur);
}

function compileT (musexpr) {
    var sequence = [],
        time = 0;
    
    function compileHelper(expr) {
        if (expr.tag == 'note') {
            sequence.push({ tag: 'note',
                           pitch: expr.pitch,
                           dur: expr.dur,
                           start: time });
            time += expr.dur;
        } else if (expr.tag == 'par') {
            sequence.push({ tag: 'note',
                           pitch: expr.left.pitch,
                           dur: expr.left.dur,
                           start: time });
            sequence.push({ tag: 'note',
                           pitch: expr.right.pitch,
                           dur: expr.right.dur,
                           start: time });
            time += pDuration(expr);
        } else {
            compileHelper(expr.left);
            compileHelper(expr.right);
        }                 
    }
    
    compileHelper(musexpr);
    return sequence;
};
