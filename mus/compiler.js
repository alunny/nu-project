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

    function pushNote(note) {
        sequence.push({ tag: 'note',
                       pitch: convertPitch(note.pitch),
                       dur: note.dur,
                       start: time });
    }
    
    function compileHelper(expr) {
        var i = 0;

        if (expr.tag == 'rest') {
            time += expr.dur;
        } else if (expr.tag == 'note') {
            pushNote(expr);
            time += expr.dur;
        } else if (expr.tag == 'par') {
            pushNote(expr.left);
            pushNote(expr.right);
            time += pDuration(expr);
        } else if (expr.tag == 'seq') {
            compileHelper(expr.left);
            compileHelper(expr.right);
        } else if (expr.tag == 'repeat') {
            for (i=0; i < expr.count; i++) {
                pushNote(expr.section);
                time += expr.section.dur;
            }
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
                right: { 
                    tag: 'repeat',
                    section: { tag: 'note', pitch: 'd4', dur: 250 },
                    count: 3
                } }
    };

console.log(melody_mus);
console.log(compile(melody_mus));
