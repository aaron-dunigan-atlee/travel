var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1mI0Prj20RwR-9bMV_wnmKgavspKl7jg6cvYrOLi61Fg/edit?usp=sharing';

function init() {
Tabletop.init( { key: publicSpreadsheetUrl,
                    callback: addToPage,
                    simpleSheet: true } )
}

function logData(data, tabletop) {
    console.log(data);
}

function addToPage(data, tabletop) {
    var div = document.getElementById('gdoc-content');
    var pageName = getMeta("page-name");
    for (var i=0; i < data.length; i++) {
        if (data[i].page === pageName) {
            div.innerHTML += data[i].content;
        }
    }
}

function getMeta(metaName) {
    const metas = document.getElementsByTagName('meta');
  
    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === metaName) {
        return metas[i].getAttribute('content');
      }
    }
  
    return '';
  }
  
window.addEventListener('DOMContentLoaded', init)