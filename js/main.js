// ========= ver. 0.5  ===========
$(document).ready(function () {
    let $button = $('.row div');
    let display = '';
    let symbols = ['/', '*', '+', '-'];

    $button.on("click", function () {
        let $btn = $(this).text();
        let last = display[display.length - 1];

        if ($btn === '=') {
            //sprawdza czy ostatnia jest liczba i oblicza wynik
            display === '' || last === '/' || last === '*' || last === '+' || last === '-' ? console.log('I need a number...') : display = eval(display);
            console.log('eval ', display);

        } else if ($btn === 'AC') {
            //kasuje wszystko czyli zeruje display
            console.log('AC');
            display = '';

        } else if ($btn === 'CE') {
            //kasuje ostatnia liczbe  z display az do znaku
            let lastSymbol = symbols.map((e) => display.lastIndexOf(e));
            display = display.slice(0, Math.max(...lastSymbol));

        } else if ($btn === '') {
            //gumka - kasuje tylko ostatnia liczbe z display
            display = display.slice(0, -1);

        } else if ($btn === '+/-') {
            //TODO - pobiez ostatni symbol, jesli go brak lub jest + * / wstaw minus przed liczbe, jesli jest minus zmie go na plus

        } else if ($btn === '.' || $btn === '/' || $btn === '*' || $btn === '+' || $btn === '-') {
            last === '.' || last === '/' || last === '*' || last === '+' || last === '-' ? console.log("Double mark...") : display += $btn;
            if (display.indexOf($btn) === 0 && $btn !== '.') {
                display = '';
            }

        } else {
            display += $btn;
        }

        $('#input').text(display);
        // console.log(display, display.length);
        console.log($btn);

    });
});
