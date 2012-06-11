start =
    expression

expression =
    atom /
    list

list =
    "(" contents:listContents ")"
        { return contents }

listContents =
    head:expression space tail:listContents
         { return [head].concat(tail) }
     /
    expr:expression
         { return [expr] }
     
space =
    [ \n\t]+
    
validchar
    = [0-9a-zA-Z_?!+\-=@#$%^&*/.]

atom =
    chars:validchar+
        { return chars.join(""); }
