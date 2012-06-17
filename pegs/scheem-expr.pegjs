start =
    expr:expression ignore*
        { return expr }

expression =
    atom /
    quote /
    list

list =
    "(" contents:listContents ")"
        { return contents }

listContents =
    head:expression ignore+ tail:listContents
         { return [head].concat(tail) }
     /
    expr:expression
         { return [expr] }

quote =
    "'" quoted:list
        { return ["quote", quoted]; }

space =
    [ \n\t]+
    
validchar
    = [0-9a-zA-Z_?!+\-=@#$%^&*/.]

atom =
    num:[0-9]+
        { return parseInt(num.join('')); } /
    chars:validchar+
        { return chars.join(""); }

comment =
    ";" [^\n]* "\n"

ignore =
    space /
    comment
