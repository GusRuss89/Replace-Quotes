var s,
    diff,
    codes = [
        {
            name: "Left Single Quote",
            unicode_regex: /\u2018/g,
            html: "&lsquo;",
            simple: "'"
        },
        {
            name: "Right Single Quote",
            unicode_regex: /\u2019/g,
            html: "&rsquo;",
            simple: "'"
        },
        {
            name: "Left Double Quote",
            unicode_regex: /\u201C/g,
            html: "&ldquo;",
            simple: '"'
        },
        {
            name: "Right Double Quote",
            unicode_regex: /\u201D/g,
            html: "&rdquo;",
            simple: '"'
        },
        {
            name: "Ellipsis",
            unicode_regex: /\u2026/g,
            html: "&hellip;",
            simple: "..."
        },
        {
            name: "Em Dash",
            unicode_regex: /\u2014/g,
            html: "&mdash;",
            simple: "-"
        },
        {
            name: "En Dash",
            unicode_regex: /\u2013/g,
            html: "&ndash;",
            simple: "-"
        },
        {
            name: "Circumflex",
            unicode_regex: /\u02C6/g,
            html: "&circ;",
            simple: "^"
        },
        {
            name: "Open Angle Bracket",
            unicode_regex: /\u2039/g,
            html: "&lt;",
            simple: "<"
        },
        {
            name: "Close Angle Bracket",
            unicode_regex: /\u203A/g,
            html: "&gt;",
            simple: ">"
        },
        {
            name: "Spaces",
            unicode_regex: /[\u02DC|\u00A0]/g,
            html: " ",
            simple: " "
        }
    ];

// Updates s and diff based on given input and output
var replaceInstances = function(input, output) {
    s = s.replace(input, output);
    diff = diff.replace(input, "<mark class='bad'>$&</mark><mark class='good'>" + output + "</mark>");
}

//Replaces commonly-used Windows 1252 encoded chars that do not exist in ASCII or ISO-8859-1 with ISO-8859-1 cognates or html entities.
// This could totally take an array of objects with dirty/clean pairs and iterate over it
var replaceWordChars = function(text) {
    s = text;
    diff = text;

    if( $('#use-html-entities').is(':checked') ) {
        for( i=0; i<codes.length; i+=1 ) {
            replaceInstances(codes[i].unicode_regex, codes[i].html);
        }
    } else {
        for( i=0; i<codes.length; i+=1 ) {
            replaceInstances(codes[i].unicode_regex, codes[i].simple);
        }
    }
}

$(document).ready(function(){

    // Add placeholder to outputText
    $('#outputText').attr('placeholder', 'You\'ve gotta be kiddin\' me!" - Angus Russell...');

    // Process input text on change
    $('#inputText, input').on('change', function(){
        // Update placeholder content
        if( $('#use-html-entities').is(':checked') ) {
            $('#outputText').attr('placeholder', '&ldquo;You&rsquo;ve gotta be kiddin&rsquo; me!&rdquo; &ndash; Angus Russell&hellip;');
        } else {
            $('#outputText').attr('placeholder', 'You\'ve gotta be kiddin\' me!" - Angus Russell...');
        }
        // Process input text
        var dirty = $('#inputText');
        replaceWordChars( dirty.val() );
        $('#outputText').val( s );
        $('.what-changed-group').hide();
        $('#what-changed').html( diff );
        if( s.length ) {
            $('.what-changed-group').slideDown()
        }
    });

});