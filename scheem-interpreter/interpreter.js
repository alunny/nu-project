module.exports = function evalScheem(expr, env) {
    // basic expressions
    switch (typeof expr) {
        case 'number':
            return expr;

        case 'string':
            return env[expr];
    }

    // compound expressions (lists)
    switch (expr[0]) {
        case '+': // addition
            return evalScheem(expr[1],env) + evalScheem(expr[2],env);

        case '-': // subtraction
            return evalScheem(expr[1],env) - evalScheem(expr[2],env);

        case '*': // multiplication
            return evalScheem(expr[1],env) * evalScheem(expr[2],env);

        case '/': // division
            return evalScheem(expr[1],env) / evalScheem(expr[2],env);

        case 'define': // define variable
        case 'set!': // define variable
            env[expr[1]] = evalScheem(expr[2], env);
            return 0;

        case 'begin': // block of expressions;
            var i = 1, last = 0;
            while (i < expr.length) {
                last = evalScheem(expr[i], env);
                i++;
            }
            return last;

        case 'quote': // return list without evaluating
            return expr[1];

        case '=': // equality
            var equal = evalScheem(expr[1], env) ===
                        evalScheem(expr[2], env);
            return equal ? "#t" : "#f";

        case '<': // less-than
            var equal = evalScheem(expr[1], env) <
                        evalScheem(expr[2], env);
            return equal ? "#t" : "#f";

        case 'cons': // cons
            return [evalScheem(expr[1], env)].concat(evalScheem(expr[2], env));

        case 'car': // contents of address register
            return evalScheem(expr[1], env)[0];

        case 'cdr': // contents of decrement register
            return evalScheem(expr[1], env).slice(1);

        case 'if': // conditional logic
            if (evalScheem(expr[1], env) == '#t') {
                return evalScheem(expr[2], env);
            } else {
                return evalScheem(expr[3], env);
            }

        default:
            fail('unknown reference "' + expr[0] + '"');
    }
}

function fail(msg) {
    throw new Error(msg);
}
