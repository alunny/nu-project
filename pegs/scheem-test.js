var PEG = require('pegjs'),
    assert = require('assert'),
    fs = require('fs'),
    read = function (f) { return fs.readFileSync(f, 'utf-8') },
    data = read('scheem-expr.pegjs'),
    parse = PEG.buildParser(data).parse,
    whitespace = read('scheem-whitespace.schm'),
    quote = read('scheem-quote.schm');
    comment = read('scheem-comment.schm');

assert.deepEqual(parse("(* n 2)"), ['*', 'n', '2']);

assert.deepEqual(parse("(* n 2 (plus a five))"),
                        ['*', 'n', '2', ['plus', 'a', 'five']]);

assert.deepEqual(parse(whitespace),
                        ['define', 'factorial',
                            ['lambda', ['n'],
                                ['if', ['=', 'n', '0'], '1',
                                    ['*', 'n',
                                        ['factorial', ['-', 'n', '1']
                        ]]]]]);

assert.deepEqual(parse(quote),
                        ['+', ['*', 'n', '2'],
                            ['quote', ['2', '3']]])

assert.deepEqual(parse(comment),
                        ['+', ['*', 'n', '2'],
                            ['quote', ['2', '3']]])
