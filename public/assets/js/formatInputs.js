document.getElementById('lr').addEventListener('change', formatInput);
document.getElementById('n').addEventListener('keyup', formatInput);

function formatInput(e)  {
    const el = e.target;

    switch(el.id) {
        case 'lr':
            if(['lang_pt', 'lang_en', 'lang_de', 'lang_ru', 'lang_af', 'lang_es'].indexOf(el.value) === -1) {
                alert('Não altere o HTML!');
                window.location.reload();
                return false;
            }
        break;

        case 'n':
            if(!el.value) return true;
            else if(el.value < 2) el.value = 2;
            else if(el.value > 10) el.value = 10;
        break;

        default:
            alert('Não altere o HTML!');
            window.location.reload();
            return false;
    }
}