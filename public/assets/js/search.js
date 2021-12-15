function sendRequest() {
    const results = document.getElementById('results')
    results.hidden = true;

    document.getElementById('error_q').hidden = true;
    document.getElementById('error_lr').hidden = true;
    document.getElementById('error_n').hidden = true;
    
    document.getElementById('save_btn').disabled = true;
    document.getElementById('download_btn').disabled = true;

    const q = document.getElementById('q').value;
    const lr = document.getElementById('lr').value;
    const n = document.getElementById('n').value;

    if(!q) document.getElementById('error_q').hidden = false;
    if(!lr) document.getElementById('error_lr').hidden = false;
    if(!n) document.getElementById('error_n').hidden = false;

    if(!q || !lr || !n)  return;

    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4) {
            ajax.responseJSON = JSON.parse(ajax.responseText);

            if(ajax.status == 200) {
                document.getElementById('query-input').value = ajax.responseJSON.query;
                document.getElementById('language-input').value = ajax.responseJSON.language;
                document.getElementById('date-input').value = ajax.responseJSON.date;
                
                const items = ajax.responseJSON.items;
                
                document.getElementById('save_btn').disabled = false;
                
                document.getElementById('results_length').innerHTML = items.length;
                document.getElementById('results_query').innerHTML = ajax.responseJSON.query;

                const tbody = document.getElementById('results_body');
                tbody.innerHTML = '';
                
                for(let index in items) {
                    const tr = document.createElement('tr');
                    
                    tr.className = index == items.length - 1 ? 'last' : '';

                    const td_title = document.createElement('td');
                    const td_link = document.createElement('td');

                    const a = document.createElement('a');
                    a.href = items[index].link;
                    a.innerHTML = a.href;
                    a.target = '_blank';

                    td_title.innerHTML = items[index].title;
                    td_link.appendChild(a);

                    tr.appendChild(td_title);
                    tr.appendChild(td_link);

                    tbody.appendChild(tr);
                }
                
                results.hidden = false;
            } else {
                alert('Algo deu errado na consulta. Tente atualizar a página. Se o erro persistir tente novamente mais tarde!');
                console.log(ajax.responseJSON);
            }
        }
    }

    ajax.open('GET', `http://localhost/search?q=${q}&lr=${lr}&n=${n}`);
    ajax.send();
}
