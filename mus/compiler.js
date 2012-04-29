function endTime (time, expr) {
    if (expr.tag == 'note') {
        return time + expr.dur;
    } else {
        return endTime(endTime(time, expr.left),
                       expr.right);
    }
};

function compile (musexpr) {
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

var melody_mus = 
    { tag: 'seq',
        left: 
            { tag: 'seq',
                left: { tag: 'note', pitch: 'a4', dur: 250 },
                right: { tag: 'note', pitch: 'b4', dur: 250 } },
        right:
            { tag: 'seq',
                left: { tag: 'note', pitch: 'c4', dur: 500 },
                right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));
