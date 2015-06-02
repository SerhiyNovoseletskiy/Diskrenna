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

// Мінімізація функції
function minimization() {
    var temp = '';
    var k = 0;
    var tmp = 'a';
    var arr_l, arr_r; // Ліва і права частина трикутника
    var cols = parseInt($('#number_of_vars').val()); // Кількість стовпців в таблиці
    var our_function = ''; // Наша функція
    var new_function = ''; // Нова функція
    var rows = $('table tr').length; // Кількість рядків в таблиці
    var list_l = {'code': null, 'array': new Array()};
    var list_r = {'code': null, 'array': new Array()};
    var table;
    var struct;
    var p;
    var minimize_function;
    var minimize_function_list = new Array();


    function minimize(our_function) {
        $('#log').append('<p>Довизначена функція : ' + our_function + '</p>');
        minimize_function_list = new Array();
        // Будую таблицю
        table = new Array();
        for (var i = 1; i < rows; i++) {

            temp = '';
            struct = {
                'lines': null,
                'value': null
            };

            for (var j = 1; j <= cols; j++)
                temp += $('#col_' + i + '_' + j).html();

            struct.lines = temp;
            struct.value = our_function[i - 1];
            table.push(struct);
        }
        // Будую трикутник
        console.log('Будую трикутник для функції: ' + our_function);

        list_l.code = table[0].lines;
        list_r.code = table[table.length - 1].lines;

        for (var i = 1; i < rows; i++) {
            console.log(our_function);
            temp = '';
            k = 0;
            tmp = 'a';

            arr_l = {
                'indexes': new Array(),
                'value': our_function[0]
            };

            arr_r = {
                'indexes': new Array(),
                'value': our_function[our_function.length - 1]
            };

            for (var j = 1; j <= cols; j++) {
                if ($('#col_' + i + '_' + j).html() == '1') {
                    k++;
                    arr_l.indexes.push(j);
                    arr_r.indexes.push(j);
                }
            }

            if (k == 0) {
                arr_l.indexes = ['0'];
                arr_r.indexes = ['0'];
            }


            if (our_function.length >= 2)
                for (var j = 0; j < our_function.length; j++) {
                    if (j + 1 < our_function.length) {
                        if (our_function[j] == our_function[j + 1])
                            temp += '0';
                        else
                            temp += '1';
                    }
                }

            our_function = temp;

            list_l.array.push(arr_l);
            list_r.array.push(arr_r);
        }
        // Виводжу A (наприклад P(0,0,0))
        console.log("P(" + list_l.code + ")");
        minimize_function = '';
        for (var i = 0; i < list_l.array.length; i++) {
            tmp = 'a';
            for (j = 0; j < list_l.array[i].indexes.length; j++) {
                tmp += list_l.array[i].indexes[j] + ' ';

                if (list_l.array[i].value == 1)
                    if (list_l.array[i].indexes.length == 1 && list_l.array[i].indexes[0] == 0) {
                        minimize_function += '1';
                    } else {
                        minimize_function += 'X';
                        minimize_function += list_l.array[i].indexes[j]
                    }
            }

            if (list_l.array[i].value == 1) {
                minimize_function += ' &theta; ';
            }

            console.log(tmp + ' = ' + list_l.array[i].value);
        }
        minimize_function = minimize_function.substring(0, minimize_function.lastIndexOf('&theta;') - 1);
        console.log('Мінімізована функція : ' + minimize_function);
        minimize_function_list.push(
            {
                'position': 'l',
                'function': minimize_function,
                'code': list_l.code
            }
        );

        // Виводжу A (наприклад P(1,1,1))
        console.log("P(" + list_r.code + ")");
        minimize_function = '';
        for (var i = 0; i < list_r.array.length; i++) {
            tmp = 'a';
            for (j = 0; j < list_r.array[i].indexes.length; j++) {
                tmp += list_r.array[i].indexes[j] + ' ';

                if (list_r.array[i].value == 1)
                    if (list_r.array[i].indexes.length == 1 && list_r.array[i].indexes[0] == 0) {
                        minimize_function += '1';
                    } else {
                        minimize_function += 'X';
                        minimize_function += list_r.array[i].indexes[j]
                    }
            }

            if (list_r.array[i].value == 1) {
                minimize_function += ' &theta; ';
            }

            console.log(tmp + ' = ' + list_r.array[i].value);
        }
        minimize_function = minimize_function.substring(0, minimize_function.lastIndexOf('&theta;') - 1);
        console.log('Мінімізована функція : ' + minimize_function);
        minimize_function_list.push(
            {
                'position': 'r',
                'function': minimize_function,
                'code': list_r.code
            }
        );

        var p;
        var indexes;

        for (var i = 2; i <= (rows - 1) / 2; i++) {
            new_function = '';
            p = table[i - 1].lines;
            indexes = new Array();
            for (var j = 0; j < p.length; j++)
                if (p[j] == '1')
                    indexes.push(j);

            for (var n = 0; n < rows - 1; n++) {
                tmp = table[n].lines;
                temp = '';
                for (var m = 0; m < tmp.length; m++) {
                    if (indexes.indexOf(m) == -1) {
                        temp += tmp[m];
                    } else {
                        if (tmp[m] == '1')
                            temp += '0';
                        else
                            temp += '1';
                    }
                }

                for (var m = 0; m < rows - 1; m++) {
                    if (temp == table[m].lines)
                        new_function += table[m].value;
                }

            }

            console.log('Нова функція: ' + new_function);
            console.log("Будую для неї трикутник");
            list_l = {'code': null, 'array': new Array()};
            list_r = {'code': null, 'array': new Array()};

            list_l.code = table[i - 1].lines;
            list_r.code = table[table.length - i].lines;

            for (var m = 1; m < rows; m++) {
                console.log(new_function);
                temp = '';
                k = 0;
                tmp = 'a';

                arr_l = {
                    'indexes': new Array(),
                    'value': new_function[0]
                };

                arr_r = {
                    'indexes': new Array(),
                    'value': new_function[new_function.length - 1]
                };

                for (var j = 1; j <= cols; j++) {
                    if ($('#col_' + m + '_' + j).html() == '1') {
                        k++;
                        arr_l.indexes.push(j);
                        arr_r.indexes.push(j);
                    }
                }

                if (k == 0) {
                    arr_l.indexes = ['0'];
                    arr_r.indexes = ['0'];
                }


                if (new_function.length >= 2)
                    for (var j = 0; j < new_function.length; j++) {
                        if (j + 1 < new_function.length) {
                            if (new_function[j] == new_function[j + 1])
                                temp += '0';
                            else
                                temp += '1';
                        }
                    }

                new_function = temp;

                list_l.array.push(arr_l);
                list_r.array.push(arr_r);
            }

            // Виводжу A (наприклад P(0,0,0))
            console.log("P(" + list_l.code + ")");
            minimize_function = '';
            for (var m = 0; m < list_l.array.length; m++) {
                tmp = 'a';
                for (j = 0; j < list_l.array[m].indexes.length; j++) {
                    tmp += list_l.array[m].indexes[j] + ' ';

                    if (list_l.array[m].value == 1)
                        if (list_l.array[m].indexes.length == 1 && list_l.array[m].indexes[0] == 0) {
                            minimize_function += '1';
                        } else {
                            minimize_function += 'X';
                            minimize_function += list_l.array[m].indexes[j]
                        }
                }

                if (list_l.array[m].value == 1) {
                    minimize_function += ' &theta; ';
                }

                console.log(tmp + ' = ' + list_l.array[m].value);
            }
            minimize_function = minimize_function.substring(0, minimize_function.lastIndexOf('&theta;') - 1);
            console.log('Мінімізована функція : ' + minimize_function);
            minimize_function_list.push(
                {
                    'position': 'l',
                    'function': minimize_function,
                    'code': list_l.code
                }
            );

            // Виводжу A (наприклад P(1,1,1))
            console.log("P(" + list_r.code + ")");
            minimize_function = '';
            for (var m = 0; m < list_r.array.length; m++) {
                tmp = 'a';
                for (j = 0; j < list_r.array[m].indexes.length; j++) {
                    tmp += list_r.array[m].indexes[j] + ' ';

                    if (list_r.array[m].value == 1)
                        if (list_r.array[m].indexes.length == 1 && list_r.array[m].indexes[0] == 0) {
                            minimize_function += '1';
                        } else {
                            minimize_function += 'X';
                            minimize_function += list_r.array[m].indexes[j]
                        }
                }

                if (list_r.array[m].value == 1) {
                    minimize_function += ' &theta; ';
                }

                console.log(tmp + ' = ' + list_r.array[m].value);
            }
            minimize_function = minimize_function.substring(0, minimize_function.lastIndexOf('&theta;') - 1);
            console.log('Мінімізована функція : ' + minimize_function);
            minimize_function_list.push(
                {
                    'position': 'r',
                    'function': minimize_function,
                    'code': list_r.code
                }
            );
        }


        var min = 1000;
        var functions = new Array();
        var count;

        if ($('#dodanki_selected').is(':checked')) {
            minimize_function_list.forEach(function (e) {
                if (min > e.function.split('&theta;').length)
                    min = e.function.split('&theta;').length;

                functions.push(
                    {
                        'count': e.function.split('&theta;').length,
                        'function': e.function,
                        'code': e.code
                    }
                );
            });

        }

        if ($('#naymensha_kilkist_vhodgen').is(':checked')) {
            minimize_function_list.forEach(function (e) {
                if (min > e.function.split('X').length - 1)
                    min = e.function.split('X').length - 1;

                functions.push(
                    {
                        'count': e.function.split('X').length - 1,
                        'function': e.function,
                        'code': e.code
                    });
            });


        }

        var list;
        var codes;
        if ($('#operations_selected').is(':checked')) {
            minimize_function_list.forEach(function (e) {
                count = 0;
                list = e.function.split('X');

                codes = new Array();

                for (var i = 0; i < e.code.length; i++) {
                    if (e.code[i] == 1)
                        codes.push(i + 1);
                }

                for (var i = 1; i < list.length; i++) {
                    count++;

                    if (codes.indexOf(parseInt(list[i])) != -1)
                        count++;
                }

                if (e.function[0] == '1')
                    count++;

                count--;

                if (min > count)
                    min = count;

                functions.push(
                    {
                        'count': count,
                        'function': e.function,
                        'code': e.code
                    });
            });
        }

        functions.forEach(function (e) {
            codes = new Array();

            for (var i = 0; i < e.code.length; i++) {
                if (e.code[i] == 1)
                    codes.push(i + 1);
            }

            temp = '';
            tmp = e.function.split('&theta;');
            tmp.forEach(function (e) {
                if (e.indexOf('X') == -1) {
                    temp += e + '&theta; ';
                } else {
                    list = e.split('X');
                    list.forEach(function (e) {
                        if (codes.indexOf(parseInt(e)) !== -1) {
                            temp += '<img src = "x.png">' + e;
                        } else {
                            temp += 'X' + e;
                        }
                    });
                }
            });

            if (temp.indexOf('XX') == 0)
                temp = temp.substr(1, temp.length);

            e.function = temp;

            if (e.count == min) {
                $('#log').append('<p>P(' + e.code + ') F = ' + e.function + ' L(P(' + e.code + ') F) = ' + e.count + '</p>');
            }
        });
    }

    // Очищую результат якщо він уже був виведений
    $('#log').html('');
    // Роблю довизначення функції
    dovuznachenna_funkcii();
    // Якщо в нас немає довизначених функцій то беремо з таблиці
    if ($('#dovuznachenna_funkcii ul li').length == 0) {
        for (var i = 1; i < rows; i++) {
            our_function += $("#col_" + i + ' button').html();
        }
        minimize(our_function);
    } else {
        // Якщо у нас є довизначені функції
        $('#dovuznachenna_funkcii ul li').each(function () {
            minimize($(this).html());
        });
    }

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
