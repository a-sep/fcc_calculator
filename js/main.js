/*jshint esversion: 6 */
// ========= ver. 2.0  ===========
// log saves all inputs, only '=' counts result

$(document).ready(function() {
    let display = '0';
    let log = [];
    let symbols = ['/', '*', '+', '-'];
    let rowLog = $('#log').attr('rows');
    let rowDisplay = $('#display').attr('rows');

    $('#display').text(display);
    $('.row div').on("click", function() {
        let $btn = $(this).text();

        switch ($btn) {
            case "=":
                display = eval(log.join('')); // jshint ignore:line
                display = +display.toFixed(10); // delete unnecessary zeros from the end, max 10 decimal number
                log.push($btn, display);
                break;
            case "AC":
                display = '0';
                log = [];
                rowLog = 1;
                rowDisplay = 1;
                break;
            case "CE":
                // CE delete last number and symbol from log
                display = '0';
                let lastSymbol = symbols.map((e) => log.lastIndexOf(e));
                log = log.slice(0, Math.max(...lastSymbol));
                if (Math.max(...lastSymbol) === -1) {
                    log = [];
                }
                // adjust height of log and display textareas
                rowLog = Math.ceil(log.length / 28);
                rowDisplay = Math.ceil(display.length / 14);
                // console.log('last', Math.max(...lastSymbol));
                break;
            case ".":
                if (log.indexOf('=') !== -1) {
                    log = [];
                    display = '0';
                }

                if (log[log.length - 1] !== '0' && display === '0' || symbols.indexOf(display) !== -1) {
                    display = '0' + $btn;
                    log.push('0', $btn);
                } else if (log.indexOf('=') !== -1) {
                    display = '0' + $btn;
                    log.push('0', $btn);
                } else if (log.indexOf('=') === -1 && display.indexOf(".") === -1) {
                    display += '.';
                    log.push('.');
                }
                break;
            default:
                if (symbols.indexOf($btn) === -1) {
                    // if $btn is a number
                    //  if log contains '=' -> reset log
                    if (log.indexOf('=') !== -1) {
                        log = [];
                        display = '0';
                    }
                    // only one zero can be before '.'
                    if (display === '0' && $btn === '0') {
                        console.log('$btn = 0');
                    } else if ($btn === '0' && symbols.indexOf(display) !== -1) {
                        // console.log('$btn = 0 i znak na display');
                    } else if (display === '0' && log.length === 0) {
                        // delete first zero
                        display = $btn;
                        log.push($btn);
                    } else if (symbols.indexOf(display) !== -1) {
                        // console.log('symbol na display');
                        display = $btn;
                        log.push($btn);
                    } else {
                        display += $btn;
                        log.push($btn);
                    }
                } else {
                    // $btn is a symbol
                    // reset log and save only score
                    if (log.indexOf('=') !== -1) {
                        log = [];
                        log.push(display);
                    }
                    if (symbols.indexOf(display) === -1 && log.length !== 0) {
                        display = $btn;
                        log.push(display);
                    } else if (log.length !== 0) {
                        log.pop();
                        display = $btn;
                        log.push(display);
                    }
                }
        }

        // adjust height of log and display textareas
        if (log.length === 28 * rowLog) {
            rowLog++;
        }
        if (display.length === 14 * rowDisplay) {
            rowDisplay++;
        }

        $('#log').attr('rows', rowLog);
        $('#display').attr('rows', rowDisplay);
        $('#display').text(display);
        $('#log').text(log.join(''));
        // console.log(log);
        // console.log('----');
    });
});
