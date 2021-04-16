// Write your client side Javascript code here
document.addEventListener("DOMContentLoaded", function(event) { 
    initEvents();
    displayCodes();
});

function initEvents() {
    var button = document.getElementById('btn-show-modal-code-snippet');
    button.onclick = function() {
        // show modal
        var code_modal = document.getElementById('modal-code-snippet');
        code_modal.style.display = 'block';
    }

    var code_submit_btn = document.getElementById('create-code-snippet');
    code_submit_btn.onclick = async function() {
        var title = document.getElementById('code-snippet-title').value;
        var code = document.getElementById('code-snippet-code').value;

        try {
            var results = await fetch('/code_snippets', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: title, code: code})
            });

            const data = await results.json();
            addCodeData(data.data);

        } catch(e) {
            console.error(e);
        }
    }

    var close_button_array = document.getElementsByClassName('close');
    for(var i = 0; i < close_button_array.length; i++)
    {
        var item = close_button_array[i];
        item.onclick = function() {
            var code_modal = document.getElementById('modal-code-snippet');
            var comment_modal = document.getElementById('modal-comment');
            code_modal.style.display = 'none';
            comment_modal.style.display = 'none';
        }
    };
    
}

async function displayCodes() {    
    try {
        var results = await fetch('/code_snippets');
        const data = await results.json();

        console.log(data);
        if( data.code != 200 )
            return;
        
        data.docs.forEach(item => {
            addCodeData(item);
        });
        

    } catch(e) {
        console.error(e);
    }
}

function addCodeData(item) {
    // find main element
    var main = document.getElementsByTagName('main')[0];

    var article = document.createElement("article");
    var title = document.createElement("h3");
    title.innerHTML = item['title'];

    var code = document.createElement("pre");
    code.innerHTML = item['code'];

    var comments = document.createElement("ul");

    comments.innerHTML = '<li>Coffee</li>' +
                            '<li>Tea</li>' +
                            '<li>Milk</li>';

    article.appendChild(title);
    article.appendChild(code);
    article.appendChild(comments);

    main.appendChild(article);
}