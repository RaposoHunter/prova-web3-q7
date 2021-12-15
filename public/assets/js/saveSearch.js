function saveSearch() {
    document.getElementById('download_btn').disabled = true;

    const tbody = document.getElementById('results_body');

    const rows = tbody.children;

    let results = {
        query: document.getElementById('query-input').value,
        language: document.getElementById('language-input').value,
        date: document.getElementById('date-input').value,
        items: []
    };

    for(let row of rows) {
        results.items.push({
            title: row.firstElementChild.innerHTML,
            link: row.lastElementChild.lastElementChild.href,
        });
    }

    const ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4) {
            ajax.responseJSON = JSON.parse(ajax.responseText);

            if(ajax.status == 200) {
                document.getElementById('download_btn').disabled = false;
            } else {
                alert('Algo deu errado ao salvar o arquivo. Tente novamente mais tarde');
                console.log(ajax.responseJSON);
            }
        }
    }

    ajax.open('POST', 'http://localhost/search');
    ajax.setRequestHeader('Content-Type', 'application/json');

    ajax.send(JSON.stringify(results));
}