var es = require('./interpreter'),
    assert = require('assert'),
    env = {}, result;

// numbers
assert.equal(es(1, env), 1);

// basic arithmetic
assert.equal(es(['+', 1, 2], env), 3);
assert.equal(es(['-', 1, 2], env), -1);
assert.equal(es(['*', 4, 2], env), 8);
assert.equal(es(['/', 15, 3], env), 5);

// variable references (reference, define, set!)
es(['define', 'y', 12], env);
assert.equal(env.y, 12);

assert.equal(es(['+', 'y', 8], env), 20);

es(['set!', 'y', ['/', 'y', 2]], env);
assert.equal(env.y, 6);

// begin
result = es(['begin',
                ['define', 'foo', 18],
                ['set!', 'y', ['/', 'foo', 12]],
                ['+', 'y', 3]], env);
assert.equal(result, 4.5);

// quote
assert.deepEqual(es(['quote', ['+', 2, 3]],env), ['+', 2, 3]);

// =, <
assert.equal(es(['=', 'y', 5], { y: 5}), '#t');
assert.equal(es(['=', 'y', 8], { y: 5}), '#f');

assert.equal(es(['<', 'y', 5], { y: 5}), '#f');
assert.equal(es(['<', 'y', 8], { y: 5}), '#t');

// cons, car, cdr
result = es(['cons',
            ['quote', [1, 2]],
            ['quote', [3, 4]]], env);
assert.deepEqual(result, [[1, 2], 3, 4]);

result = es(['car',
            ['quote', [1, 2, 3, 4]]], env);
assert.equal(result, 1);

result = es(['cdr',
            ['quote', [1, 2, 3, 4]]], env);
assert.deepEqual(result, [2, 3, 4]);

// if
result = es(['if',
            ['=', 'foo', 'bar'],
            ['+', 5, 6],
            ['*', 5, 6]], {foo: 4, bar: 12});
assert.deepEqual(result, 30);
