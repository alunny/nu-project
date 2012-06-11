var PEG = require('pegjs'),
    assert = require('assert'),
    fs = require('fs'),
    data = fs.readFileSync('scheem-expr.pegjs', 'utf-8'),
    parse = PEG.buildParser(data).parse;

assert.deepEqual(parse("(* n 2)"), ['*', 'n', '2']);

assert.deepEqual(parse("(* n 2 (plus a five))"),
                        ['*', 'n', '2', ['plus', 'a', 'five']]);

