var number_of_vars = null;

$(document).ready(function () {
    number_of_vars = $('#number_of_vars');
    draw_table();
});

// Функція для відмальовки таблиці
function draw_table() {
    draw_header_of_table();
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


function draw_body_of_table() {
    // Кількість змінних
    var number = parseInt(number_of_vars.val());
    var html;


    var count_of_rows = Math.pow(2, number);

    // Тіло таблиці
    var tbody = $('#table tbody');
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

    for (i = 1; i < rows.length; i++) {
        $("#col_" + i + ' button').html(e);
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

    $("#min_collection").css({'display': 'block'});
    $('#min_collection ul').html('');
	
	var temp = '';
	var arr = new Array();
	for (var i = 0; i < f.length; i++) {
		if (f[i] == '?')
			temp += '?'
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

function get_indexes(str) {
    var arr = new Array();
    for (var i = 0; i < str.length; i++) {
        if (str[i] == '?') {
            arr.push(i);
        }
    }

    return arr;
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