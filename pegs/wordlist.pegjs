start =
    wordlist

wordlist =
    w:word space list:wordlist
        { return [w].concat(list) } /
    w:word
        { return [w] }

word =
    chars:[a-z]+ { return chars.join('') }

space =
    ' '
