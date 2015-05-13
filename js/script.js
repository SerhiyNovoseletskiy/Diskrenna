var number_of_vars = null; // На поле для введення кількості змінних

// Коли наша сторінка уже загрузилась
$(document).ready(function () {
    // Отримуємо посилання на поле введення кількості змінних
    number_of_vars = $('#number_of_vars');
    // Викликаємо функцію відмальовки таблиці
    draw_table();
});

// Функція для відмальовки таблиці
function draw_table() {
    // Малюємо шапку таблиці
    draw_header_of_table();
    // Малюємо тіло таблиці
    draw_body_of_table();
}

// Відмальовка шапки таблиці
function draw_header_of_table() {
    // Кількість змінних
    var number = parseInt(number_of_vars.val());
    // Наша шапка
    var thead = $('#table thead tr');

    // Спочатку ми її очищюємо
    thead.html("");

    for (var i = 1; i <= number; i++) {
        thead.append("<td>X " + i + "</td>");
    }

    thead.append("<td>F</td>");
}

// Відмальовка тіла таблиці
function draw_body_of_table() {
    var number = parseInt(number_of_vars.val());   // Кількість змінних
    var html; // Тут буде зберігатись наш html код
    var count_of_rows = Math.pow(2, number); // Кількість рядків у таблиці

    // Отримуємо посилання на тіло таблиці
    var tbody = $('#table tbody');

    // Очищення таблиці
    tbody.html('');

    for (var i = 1; i <= count_of_rows; i++) {
        html = '<tr id="row_' + i + '">';

        for (var j = 1; j <= number; j++) {

            html += '<td id = "col_' + i + '_' + j + '">' + GenerateDN(i - 1, number).charAt(j - 1) + '</td>';
        }

        html += '<td id = "col_' + i + '"><button class="btn" onclick="change_button_f(this)">0</button></td>';

        tbody.append(html);
    }
}

function only(e) {
    var cols = $('#row_1 td');
    var rows = $('table tr');

    for (var i = 1; i < rows.length; i++) {
        $("#col_" + i).html('<button class="btn" onclick="change_button_f(this)">' + e + '</button>');
    }
}


function change_button_f(e) {
    switch ($(e).html()) {
        case '0':
            $(e).html('1');
            break;
        case '1':
            $(e).html('?');
            break;
        case '?':
            $(e).html('0');
            break;
    }
}

function dovuznachenna_funkcii() {
    var f = '';
    var arr = [];
    var rows = $('table tr');

    for (var i = 1; i < rows.length; i++) {
        f += $("#col_" + i + ' button').html();
    }

    var count = Math.pow(2, count_of_f(f))
    if (count == 1)
        count = 0;

    var indexes = new Array();
    for (var i = 0; i < f.length; i++) {
        if (f[i] == '?')
            indexes.push(i);
    }

    var indexes_length = indexes.length;
    var index;
    var result = new Array();
    var row;

    for (var i = 0; i < count; i++) {
        row = new Array();
        for (var j = 0; j < indexes_length; j++) {
            row.push(GenerateDN(i, indexes_length).charAt(j));
        }
        result.push(row);
    }

    var temp = '';

    $('#dovuznachenna_funkcii').css({
        'display': 'block'
    });

    $('#dovuznachenna_funkcii ul').html('');

    for (var i = 0; i < count; i++) {
        row = result[i];
        temp = '';
        index = null;

        for (var j = 0; j < f.length; j++) {

            if (indexes.indexOf(j) == -1)
                temp += f[j];
            else {
                temp += row[indexes.indexOf(j)];
            }
        }

        $('#dovuznachenna_funkcii ul').append('<li class="collection-item">' + temp + '</li>');
    }
}

// Мінімізація функції за кілкістю доданків
function minimization() {
    var list_of_struct = new Array();

    function minimize(f) {
        var temp;
        var cols = parseInt($('#number_of_vars').val());
        var rows = $('table tr');
        var arr;
        var tmp = 'a';
        var k = 0;
        var a = new Array();

        var struct = {
            'length': 0,
            'value': ''
        };


        for (var i = 0; i < rows.length; i++) {
            console.log(f);
            temp = '';
            k = 0;
            tmp = 'a';

            arr = {
                'indexes': new Array(),
                'value': f[0]
            };

            for (var j = 1; j <= cols; j++) {
                if ($('#col_' + i + '_' + j).html() == '1') {
                    k++;
                    arr.indexes.push(j);
                }
            }

            if (k == 0)
                arr.indexes = ['0'];

            if (f.length >= 2)
                for (var j = 0; j < f.length; j++) {
                    if (j + 1 < f.length) {
                        if (f[j] == f[j + 1])
                            temp += '0';
                        else
                            temp += '1';
                    }
                }

            f = temp;
            a.push(arr);
        }

        console.log('Відображаю А');
        for (var i = 1; i < a.length; i++) {
            tmp = 'a';
            for (j = 0; j < a[i].indexes.length; j++) {
                tmp += a[i].indexes[j] + ' ';

                if (a[i-1].value == 1)
                    if (a[i].indexes.length == 1 && a[i].indexes[0] == 0) {
                        struct.value += '0';
                    } else {
                        if (j == 0) {
                            struct.value += 'X';
                            struct.value += a[i].indexes[j]
                        } else {
                            struct.value += a[i].indexes[j]
                        }
                    }
            }

            tmp += ' = ' + a[i - 1].value;
            console.log(tmp);

            if (a[i - 1].value == 1) {
                struct.length++;
                struct.value += '&theta;';
            }
        }

        console.log('Мінімізована функція: ' + struct.value);
        console.log('Кількість доданків :' + struct.length);
        list_of_struct.push(struct)
    }

    var f = $('#dovuznachenna_funkcii ul li').each(function () {
        console.log("For Function : " + $(this).html());
        minimize($(this).html());
    });

    var min = list_of_struct[0].length;
    var value = list_of_struct[0].value;

    for (var i = 1; i < list_of_struct.length; i++) {
        if (min > list_of_struct[i].length) {
            min = list_of_struct[i].length;
            value = list_of_struct[i].value;
        }
    }

    value = value.substr(0, value.lastIndexOf('&theta;'));
    Materialize.toast(value);
}


function count_of_f(str) {
    var result = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] == '?')
            result++;
    }
    return result;
}


////// Генерування двійкового набору заданої розмірності за його десятковим еквівалентом
function GenerateDN(number, size)
// number - десятковий еквівалент двійкового набору
// size - розмірність двійкового набору
{
    var i, tmp = (number).toString(2);
    var count = size - tmp.length;
    for (i = 1; i <= count; i++) {
        tmp = "0" + tmp;
    }
    return tmp;
}