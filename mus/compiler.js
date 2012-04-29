function endTime (time, expr) {
    if (expr.tag == 'note') {
        return time + expr.dur;
    } else {
        return endTime(endTime(time, expr.left),
                       expr.right);
    }
};

// this is all you
// maybe some helper functions
function pDuration(parExpr) {
    // assuming par contains two notes
    return Math.max(parExpr.left.dur, parExpr.right.dur);
}

function compile (musexpr) {
    var sequence = [],
        time = 0;
    
    function compileHelper(expr) {
        if (expr.tag == 'rest') {
            time += expr.dur;
        } else if (expr.tag == 'note') {
            sequence.push({ tag: 'note',
                           pitch: convertPitch(expr.pitch),
                           dur: expr.dur,
                           start: time });
            time += expr.dur;
        } else if (expr.tag == 'par') {
            sequence.push({ tag: 'note',
                           pitch: convertPitch(expr.left.pitch),
                           dur: expr.left.dur,
                           start: time });
            sequence.push({ tag: 'note',
                           pitch: convertPitch(expr.right.pitch),
                           dur: expr.right.dur,
                           start: time });
            time += pDuration(expr);
        } else if (expr.tag == 'seq') {
            compileHelper(expr.left);
            compileHelper(expr.right);
        }                 
    }
    
    compileHelper(musexpr);
    return sequence;
};

function convertPitch(pitch) {
    var offsets = {
        a: 21, b: 23, c: 24, d: 26, e: 28, f: 29, g: 31
    },
        pitchChar = pitch.split('')[0],
        pitchNum = Number(pitch.split('')[1]);

    if (pitchChar != 'a' && pitchChar != 'b') pitchNum--;

    return offsets[pitchChar] + (12 * pitchNum);
}

var melody_mus = 
    { tag: 'seq',
        left: 
            { tag: 'seq',
                left: { tag: 'note', pitch: 'a4', dur: 250 },
                right: { tag: 'note', pitch: 'b4', dur: 250 } },
        right:
            { tag: 'seq',
                left: { tag: 'note', pitch: 'c4', dur: 100 },
                right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));
