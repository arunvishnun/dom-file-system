let main = $('#main');

function TraverseDOM(p, node) {
    
    parent = $('<ul />');
    for(let i=0; i < node.childNodes.length; i++) {
        if(node.childNodes[i].nodeType === Node.ELEMENT_NODE) {
            let li = createFolder(node.childNodes[i])
            parent.append(li);
            parent.append(TraverseDOM(li, node.childNodes[i]));
            
        } 
        else if(node.childNodes[i].nodeType === Node.TEXT_NODE && node.childNodes[i].nodeValue.trim() !=='') {
            parent.append(createFile(node.childNodes[i]));
            parent.append(parent)
            
        } 
        p.append(parent)    
    }
    
    
}

function createFolder(node) {
    let li = $('<li/>');

    li.append($('<span/>').addClass('expand-collapse expanded'));
    li.append($('<span/>').addClass('folder-icon'));
    li.append($('<label/>').html(node.nodeName));
    
    return li;
}

function createFile(node) {
    let li = $('<li/>');
    
    li.append($('<span/>').addClass('file-icon'));
    li.append($('<label/>').html(node.nodeValue));

    return li;
}

$.get('/test/index.html', function(html) {
    let parser = new DOMParser();

    doc = parser.parseFromString(html, "text/html");
    TraverseDOM(main, doc.getElementsByTagName('body')[0]);
    
});

$(document).ready(function() {
    $('#main').on('click', 'li', function(e) {
        $('li').removeClass('active');
        $(this).addClass('active');
        $(this).find('ul').toggle();
        $(this).siblings('li').find('ul').hide();
    })
});

