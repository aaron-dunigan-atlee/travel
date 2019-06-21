var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/19Gf6yHLQOSVqSuQ4UdOct7CxnO1pyD1E8ADG6N62Kfc/edit?usp=sharing';

function init() {
Tabletop.init( { key: publicSpreadsheetUrl,
                    callback: addToPage,
                    simpleSheet: true,
                wanted: ['BlogPosts'] } )
}

function addToPage(data, tabletop) {
    var div = document.getElementById('gdoc-content');
    for (var i=0; i < data.length; i++) {
        var html = '<section class="blog-post">';
            html += '<h3 class="post-title">' + data[i].title + '</h3>';
            html += '<h4 class="post-author">Posted by ' + data[i].author + '</h4>';
            html += '<h5 class="post-location">' + data[i].location + '</h5>'; 
            html += '<h5 class="post-date">' + data[i].date + '</h5>';
            html += '<div class="post-body">' + data[i].body + '</div>';
            html += '</section>';
        div.innerHTML += html;
    }
}

  
window.addEventListener('DOMContentLoaded', init)