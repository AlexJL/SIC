//funcion para colocar los plugins de phonegap AIzaSyAD5cYe8yvuil-ariamIXqpOkKCYgTctMA
var nombre = new Array("Documento", "F. emison", "F. Vencimiento", "F. Corte", "Monto");
var nombre1 = new Array("Documento", "Fecha Pago", "Fecha Vencimiento", "Lugar de Pago", "Monto");
var numeroRecibos = new Array();
var totalRecibos = new Array();
var femiRecibos = new Array();
var fvenRecibos = new Array();
var mes = new Array();
var consumido = new Array();
var facturado = new Array();
var datospersonales = new Array();
var clinombre = "";
var clicodigo = "";
var clisuministro = "";
var clideuda = "";
var clicantidad = "";
var clifechavencimiento = "";
var clifechacorte = "";
var clidireccion = "";
var clifecha = "";
var clihora = "";


function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, true);
}

function exitFromApp() {
    navigator.app.exitApp();
}

function onDeviceReady() {
    document.addEventListener("backbutton", handleBackButton, true);
    networkState = navigator.connection.type;
    checkConnection();
}

function handleBackButton() {
    if ($.mobile.activePage.attr('id') == 'inicio') {
        navigator.app.exitApp();
    } else if ($.mobile.activePage.attr('id') == 'noClientes') {
        $.mobile.changePage('#inicio');
    } else {
        navigator.app.backHistory();
    }
}

function checkConnection() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';
    if (states[networkState] == "Unknown connection" || states[networkState] == 'No network connection') {
        alert('No tiene conexión a Red. Porfavor Conectesé a la red a traves de sus datos o  un red WiFi');
        navigator.app.exitApp();
    }
}
//función para visualizar el diálogo de la página no Clientes
localStorage.setItem('visitarNoClientes', 0);

function verDialogo() {
    $.mobile.changePage("#noClientes", {
        transition: "",
        reverse: true,
        changeHash: true
    });
    if (localStorage.getItem('visitarNoClientes') == 0) {
        location.href = "#dialog";
        localStorage.setItem('visitarNoClientes', 1);
    }
}

function irclientes() {
    $.mobile.changePage("#usuarios", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}

function irLogin() {
    $.mobile.changePage("#login", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}

function volverInicio() {
    $.mobile.changePage("#inicio", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}

function irNoClientes() {
    $.mobile.changePage("#noclientes", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}

function noticias(a) {
    alert("En Construcción");
    //localStorage.setItem("noticias",a);
    //$.mobile.changePage( "#noticias", {transition: "",reverse: true,changeHash: true});
}

function verNoticia(id) {
    $.mobile.changePage("#noticiaCompleta", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}

function cambiarPla() {
    document.getElementById('txt-email').placeholder = "";
}

function cambiarPla1() {
    document.getElementById('txt-pass').placeholder = "";
}

function regresarInicio() {
    $.mobile.changePage("#inicio", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}

function pagos() {
    $.mobile.changePage("#pagos", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}

function mapa(a) {
    localStorage.setItem("mapa", a);
    location.href = "pages/mapa.html";
}

function camara(a) {
    localStorage.setItem("camara", a);
    location.href = "camara.html";
}
//funcion para ingresar a la app
function login() {
    var email = $("#txt-email").val();
    localStorage.setItem('email', email);
    var password = $("#txt-pass").val();
    localStorage.setItem('password', password);
    $.ajax({
        type: "POST",
        url: conexion + "login1.php",
        data: ({
            correo: email,
            contrasenia: password
        }),
        cache: false,
        dataType: "text",
        success: onSuccess
    });
}

function onSuccess(data) {
    if (data == "$$$$$$$$$$$$0$$$$$$") {
        alert("USUARIO O CONTRASEÑA INVALIDO");
        $.mobile.changePage("index.html#login", {
            reverse: false,
            changeHash: true
        });
    } else {
        var j = 0;
        clinombre = "";
        clicodigo = "";
        clisuministro = "";
        clideuda = "";
        clifechavencimiento = "";
        clicantidad = "";
        clifechacorte = "";
        clihora = "";
        clifecha = "";
        clidireccion;
        for (var i = 0; i < data.length; i++) {
            if (data.charAt(i) != "$" && j == 0) {
                clifecha = clifecha + data.charAt(i);
            } else if (data.charAt(i) != "$" && j == 1) {
                clihora = clihora + data.charAt(i);
            } else if (data.charAt(i) != "$" && j == 2) {
                clidireccion = clidireccion + data.charAt(i);
            } else if (data.charAt(i) != "$" && j == 3) {
                clicodigo = clicodigo + data.charAt(i);
            } else if (data.charAt(i) != "$" && j == 4) {
                if (data.charCodeAt(i) >= 48 && data.charCodeAt(i) <= 57) {
                    clisuministro = clisuministro + data.charAt(i);
                } else {
                    clinombre = clinombre + data.charAt(i);
                }
            } else if (data.charAt(i) != "$" && j == 5) {
                clideuda = clideuda + data.charAt(i);
            } else if (data.charAt(i) != "$" && j == 6) {
                clicantidad = clicantidad + data.charAt(i);
            } else if (data.charAt(i) != "$" && j == 7) {
                clifechavencimiento = clifechavencimiento + data.charAt(i);
            } else if (data.charAt(i) != "$" && j == 8) {
                clifechacorte = clifechacorte + data.charAt(i)
            } else {
                j++;
                i++;
            }
        }
        localStorage.setItem("clicodigo", clicodigo);
        localStorage.setItem("clisuministro", clisuministro);
        localStorage.setItem("clinombre", clinombre);
        localStorage.setItem("clideuda", parseFloat(clideuda));
        localStorage.setItem("clicantidad", clicantidad);
        localStorage.setItem("clifechavencimiento", clifechavencimiento);
        localStorage.setItem("clifechacorte", clifechacorte);
        localStorage.setItem("clidireccion", clidireccion);
        var dia1 = clifecha.substring(0, 2);
        var mes1 = clifecha.substring(3, 6);
        var anio1 = clifecha.substring(7, 10);
        mes1 = cambiarMes(mes1);
        localStorage.setItem("clifecha", dia1 + "-" + mes1 + "-" + anio1);
        localStorage.setItem("clihora", clihora);
        document.getElementById("nom-user").innerHTML = localStorage.getItem("clinombre");
        document.getElementById("cantrecibos").innerHTML = localStorage.getItem('clicantidad');
        if (localStorage.getItem("clideuda") == "0") {
            document.getElementById("deuda-actual").innerHTML = "0.00";
            document.getElementById("fecha1").innerHTML = "AL DÍA";
            document.getElementById("fecha2").innerHTML = "AL DÍA";
        } else {
            var deuda = Math.round(localStorage.getItem("clideuda") * 100) / 100;
            document.getElementById("deuda-actual").innerHTML = deuda;
            document.getElementById("fecha1").innerHTML = localStorage.getItem("clifechavencimiento");
            document.getElementById("fecha2").innerHTML = localStorage.getItem("clifechacorte");
        }
        if (localStorage.getItem('clicantidad') == 0) {
            document.getElementById('deuda').style.background = "#01FF02";
            document.getElementById('cara').src = "img/alegre.gif";
        } else if (localStorage.getItem('cant') > 0 || localStorage.getItem('cant') <= 2) {
            document.getElementById('deuda').style.background = "#FFFC00";
            document.getElementById('deuda-cliente').style.color = "#000";
            document.getElementById('cara').src = "img/triste.gif";
        } else {
            document.getElementById('deuda').style.background = "#FE0002";
            document.getElementById('cara').src = "img/triste.gif";
        }
        $.mobile.changePage("#usuarios", {
            transition: "",
            reverse: true,
            changeHash: true
        });
        verPagos(localStorage.getItem("clicodigo"));
    }
}

function verPagos(cod) {
    $.ajax({
        type: "POST",
        url: conexion + "pagosPosteriores.php",
        data: ({
            code: cod
        }),
        cache: false,
        dataType: "text",
        success: onSuccess2
    });
}

function onSuccess2(data) {
    if (data == "Paso") {
        location.href = "#dialog1";
    }
}

function salirApp() {
    $.mobile.changePage("#login", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}

function estadoCuenta() {
    var codigo = localStorage.getItem('clicodigo');
    $.ajax({
        type: "POST",
        url: conexion + "estado-cuenta.php",
        data: ({
            cod: codigo
        }),
        cache: false,
        dataType: "text",
        success: onSuccess1
    });
}


function onSuccess1(data) {
    var cad = "";
    var k = 0;
    for (var i = 0; i < data.length; i++) {
        if (data.charAt(i) != '$') {
            cad = cad + data.charAt(i);
        } else {
            datospersonales[k] = cad;
            cad = "";
            k++;
            i++;
        }
    }
    var dia = datospersonales[0].substring(0, 2);
    var mes = datospersonales[0].substring(3, 6);
    var anio = datospersonales[0].substring(7, 10);
    mes = cambiarMes(mes);
    datospersonales[0] = dia + "-" + mes + "-20" + anio;
    localStorage.setItem("fecha", datospersonales[0]);
    localStorage.setItem("hora", datospersonales[1]);
    localStorage.setItem("localidad", datospersonales[2]);
    localStorage.setItem("direccion", datospersonales[3]);
    localStorage.setItem("conexion", datospersonales[4]);
    localStorage.setItem("tarifa", datospersonales[5]);
    localStorage.setItem("medidor", datospersonales[6]);
    localStorage.setItem("recibospendientes", "S./" + datospersonales[7]);
    localStorage.setItem("notasdebito", "S./" + datospersonales[8]);
    localStorage.setItem("notascredito", "S./" + datospersonales[9]);
    var deudacapital = parseFloat(datospersonales[7]) + parseFloat(datospersonales[8]) - parseFloat(datospersonales[9]);
    localStorage.setItem("deudacapital", "S./" + deudacapital);
    localStorage.setItem("cuotasemitir", "S./" + datospersonales[10]);
    var tgastoscobranza = parseFloat(datospersonales[11]) + parseFloat(datospersonales[12]);
    localStorage.setItem("tgastoscobranza", "S./" + tgastoscobranza);
    localStorage.setItem("interese", "S./" + datospersonales[13]);
    localStorage.setItem("totalinterese", "S./" + datospersonales[14]);
    var deudatotal = deudacapital + parseFloat(datospersonales[10]) + tgastoscobranza + parseFloat(datospersonales[13]) + parseFloat(datospersonales[14]);
    localStorage.setItem("deudatotal", "S./" + deudatotal);
    document.getElementById("suministro").innerHTML = localStorage.getItem("clicodigo");
    document.getElementById("usuario").innerHTML = localStorage.getItem("clinombre");
    document.getElementById("localidad").innerHTML = localStorage.getItem("localidad");
    document.getElementById("direccion").innerHTML = localStorage.getItem("direccion");
    document.getElementById("conexion").innerHTML = localStorage.getItem("conexion");
    document.getElementById("tarifa").innerHTML = localStorage.getItem("tarifa");
    document.getElementById("medidor").innerHTML = localStorage.getItem("medidor");
    document.getElementById("medidor").innerHTML = localStorage.getItem("medidor");
    document.getElementById("medidor").innerHTML = localStorage.getItem("medidor");
    document.getElementById("recibospendientes").innerHTML = localStorage.getItem("recibospendientes");
    document.getElementById("notasdebito").innerHTML = localStorage.getItem("notasdebito");
    document.getElementById("notascredito").innerHTML = localStorage.getItem("notascredito");
    document.getElementById("deudacapital").innerHTML = localStorage.getItem("deudacapital");
    document.getElementById("cuotasemitir").innerHTML = localStorage.getItem("cuotasemitir");
    document.getElementById("tgastoscobranza").innerHTML = localStorage.getItem("tgastoscobranza");
    document.getElementById("interese").innerHTML = localStorage.getItem("interese");
    document.getElementById("totalinterese").innerHTML = localStorage.getItem("totalinterese");
    document.getElementById("deudatotal").innerHTML = localStorage.getItem("deudatotal");
    document.getElementById("fpago").innerHTML = localStorage.getItem("fecha") + " - " + localStorage.getItem("hora");
    $.mobile.changePage("#estadoCuenta", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}

function cambiarMes(a) {
    var mes = "";
    if (a == "JAN") {
        mes = "ENERO";
    } else if (a == "FEB") {
        mes = "FEBRERO";
    } else if (a == "MAR") {
        mes = "MARZO";
    } else if (a == "APR") {
        mes = "ABRIL";
    } else if (a == "MAY") {
        mes = "MAYO";
    } else if (a == "JUN") {
        mes = "JUNIO";
    } else if (a == "JUL") {
        mes = "JULIO";
    } else if (a == "AUG") {
        mes = "AGOSTO";
    } else if (a == "SEP") {
        mes = "SETIEMBRE";
    } else if (a == "OCT") {
        mes = "OCTUBRE";
    } else if (a == "NOV") {
        mes = "NOVIEMBRE";
    } else if (a == "DEC") {
        mes = "DICIEMBRE";
    }
    return mes;
}

function recibospendientes(a) {
    localStorage.setItem("recibospendientes", a);
    var codigo = localStorage.getItem("clicodigo");
    $.ajax({
        type: "POST",
        url: conexion + "RecibosPendientes.php",
        data: ({
            codigo: codigo
        }),
        cache: false,
        dataType: "text",
        success: onSuccess3
    });
}

function onSuccess3(data) {
    $("p").remove(".recibos0");
    $("p").remove(".numero-docum");
    $("hr").remove(".bajo-doc");
    $("p").remove(".num-rec");
    $("p").remove(".monto-rec");
    $("p").remove(".femi-rec");
    $("p").remove(".fven-rec");
    var div = document.getElementById('recibos-pen');
    if (data == "") {
        location.href = "#dialog2";
    } else {
        var cad1 = "";
        var cad2 = "";
        var cad3 = "";
        var cad4 = "";
        var k1 = 0;
        var k2 = 0;
        var k3 = 0;
        var k4 = 0;
        var p = 0;
        var z = 0;
        for (var i = 0; i < data.length; i++) {
            if (data.charAt(i) != '$' && p == 0) {
                cad1 = cad1 + data.charAt(i);
            } else if (data.charAt(i) != '$' && p == 1) {
                cad2 = cad2 + data.charAt(i);
            } else if (data.charAt(i) != '$' && p == 2) {
                cad3 = cad3 + data.charAt(i);
            } else if (data.charAt(i) != '$' && p == 3) {
                cad4 = cad4 + data.charAt(i);
            } else if (data.charAt(i) == '$' && p == 0) {
                numeroRecibos[k1] = cad1;
                k1++;
                cad1 = "";
                i++;
                p = 1;
            } else if (data.charAt(i) == '$' && p == 1) {
                totalRecibos[k2] = cad2;
                k2++;
                cad2 = "";
                i++;
                p = 2;
            } else if (data.charAt(i) == '$' && p == 2) {
                femiRecibos[k3] = cad3;
                k3++;
                cad3 = "";
                i++;
                p = 3;
            } else if (data.charAt(i) == '$' && p == 3) {
                fvenRecibos[k4] = cad4;
                k4++;
                cad4 = "";
                i++;
                p = 0;
                z++;
            }
        }
        for (var j = 0; j < z; j++) {
            /****************** Docuemnto nro -- *************/
            var p3 = document.createElement("p");
            p3.setAttribute('class', 'numero-docum');
            p3.innerHTML = "DOCUMENTO N° " + (j + 1);
            var hr1 = document.createElement("hr");
            hr1.setAttribute('class', 'bajo-doc');
            div.appendChild(p3);
            div.appendChild(hr1);
            /****************** Nro del Recibo ***************/
            var p4 = document.createElement("p");
            p4.setAttribute('class', 'num-rec');
            var i1 = document.createElement("i");
            i1.setAttribute('class', 'num-rec1')
            i1.innerHTML = "Nro de Recibo";
            var i2 = document.createElement("i");
            i2.setAttribute('class', 'num-rec2')
            i2.innerHTML = numeroRecibos[j];
            p4.appendChild(i1);
            p4.appendChild(i2);
            div.appendChild(p4);
            /*************** Total Recibo **********************/
            var p5 = document.createElement("p");
            p5.setAttribute('class', 'monto-rec');
            var i3 = document.createElement("i");
            i3.setAttribute('class', 'monto-rec1');
            i3.innerHTML = "Total";
            var i4 = document.createElement("i");
            i4.setAttribute("class", "monto-rec2");
            i4.innerHTML = totalRecibos[j];
            p5.appendChild(i3);
            p5.appendChild(i4);
            div.appendChild(p5);
            /************* Fecha Emision ***********************/
            var p6 = document.createElement("p");
            p6.setAttribute('class', 'femi-rec');
            var i5 = document.createElement("i");
            i5.setAttribute('class', 'femi-rec1');
            i5.innerHTML = "Fecha Emisión";
            var i6 = document.createElement("i");
            i6.setAttribute("class", "femi-rec2");
            i6.innerHTML = femiRecibos[j];
            p6.appendChild(i5);
            p6.appendChild(i6);
            div.appendChild(p6);
            /************* Fecha Vencimiento ***********************/
            var p7 = document.createElement("p");
            p7.setAttribute('class', 'fven-rec');
            var i7 = document.createElement("i");
            i7.setAttribute('class', 'fven-rec1');
            i7.innerHTML = "Fecha Vencimiento";
            var i8 = document.createElement("i");
            i8.setAttribute("class", "fven-rec2");
            i8.innerHTML = fvenRecibos[j];
            p7.appendChild(i7);
            p7.appendChild(i8);
            div.appendChild(p7);
        }
        document.getElementById('cantidad_recibos').innerHTML = localStorage.getItem("clicantidad");
        document.getElementById('fecha_actual1').innerHTML = localStorage.getItem('clifecha') + " - " + localStorage.getItem("clihora");
        document.getElementById('rpcliente').innerHTML = localStorage.getItem("clinombre");
        document.getElementById('rpdireccion').innerHTML = localStorage.getItem("clidireccion");
        location.href = "#recibospendientes1";
    }
}

function volver() {
    if (localStorage.getItem("recibospendientes") == 1) {
        location.href = "#estadoCuenta";
    } else if (localStorage.getItem("recibospendientes") == 2) {
        location.href = "#consultas";
    }
}

function volver1() {
    if (localStorage.getItem("consumos") == 1) {
        location.href = "#estadoCuenta";
    } else if (localStorage.getItem("consumos") == 2) {
        location.href = "#consultas";
    }
}

function volver2() {
    if (localStorage.getItem("cuotasxemitir") == 1) {
        location.href = "#estadoCuenta";
    } else if (localStorage.getItem("cuotasxemitir") == 2) {
        location.href = "#consultas";
    }
}

function volver3() {
    if (localStorage.getItem("noticias") == 1) {
        location.href = "#noClientes";
    } else if (localStorage.getItem("noticias") == 2) {
        location.href = "#usuarios"
    }
}
//Función para obtener la data de cuotas por emitir
function cuotasxemitir(a) {
    localStorage.setItem("cuotasxemitir", a);
    var cod = localStorage.getItem('clicodigo');
    $.ajax({
        type: "POST",
        url: conexion + "cuotasxemitir.php",
        data: "codigo=" + cod,
        cache: false,
        dataType: "text",
        success: onSuccess4
    });
}

function onSuccess4(data) {
    var tabla = document.getElementById('table2');
    $("#table2").empty();
    if (data == "") {
        location.href = "#dialog3";
    } else {
        var tr = document.createElement('tr');
        var th1 = document.createElement('th');
        th1.setAttribute('class', 'col_ncon1');
        th1.innerHTML = 'Nro. Convenio';
        var th2 = document.createElement('th');
        th2.setAttribute('class', 'col_fcon1');
        th2.innerHTML = 'Fecha Convenio';
        var th3 = document.createElement('th');
        th3.setAttribute('class', 'col_ncuo1');
        th3.innerHTML = 'Nro. Cuota';
        var th4 = document.createElement('th');
        th4.setAttribute('class', 'col_amv1');
        th4.innerHTML = 'Vencimiento';
        var th5 = document.createElement('th');
        th5.setAttribute('class', 'col_total1');
        th5.innerHTML = 'Total';
        var th6 = document.createElement('th');
        th6.setAttribute('class', 'col_tcuo1');
        th6.innerHTML = 'Tipo de Cuota';
        var th7 = document.createElement('th');
        th7.setAttribute('class', 'col_con1');
        th7.innerHTML = 'Concepto';
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);
        tr.appendChild(th6);
        tr.appendChild(th7);
        tabla.appendChild(tr);
        var cad1 = "";
        var cad2 = "";
        var cad3 = "";
        var cad4 = "";
        var cad5 = "";
        var cad6 = "";
        var cad7 = "";
        var p = 0;
        var sum = 0;
        var total = 0;
        for (var i = 0; i < data.length; i++) {
            if (data.charAt(i) != "$" && p == 0) {
                cad1 = cad1 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 1) {
                cad2 = cad2 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 2) {
                cad3 = cad3 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 3) {
                cad4 = cad4 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 4) {
                cad5 = cad5 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 5) {
                cad6 = cad6 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 6) {
                cad7 = cad7 + data.charAt(i);
            } else if (data.charAt(i) == "$") {
                i++;
                p++;
                if (p == 7) {
                    var tr = document.createElement('tr');
                    var th1 = document.createElement('th');
                    th1.setAttribute('class', 'col_fp');
                    th1.innerHTML = cad1;
                    var th2 = document.createElement('th');
                    th2.setAttribute('class', 'col_fv');
                    th2.innerHTML = cad2;
                    var th3 = document.createElement('th');
                    th3.setAttribute('class', 'col_lugar');
                    th3.innerHTML = cad3;
                    var th4 = document.createElement('th');
                    th4.setAttribute('class', 'nro_recibo');
                    cad4 = arreglar(cad4);
                    th4.innerHTML = cad4;
                    var th5 = document.createElement('th');
                    th5.setAttribute('class', 'col_pago');
                    total = total + parseFloat(cad5);
                    th5.innerHTML = parseFloat(cad5);
                    var th6 = document.createElement('th');
                    th6.setAttribute('class', 'col_refer');
                    th6.innerHTML = cad6;
                    var th7 = document.createElement('th');
                    th7.setAttribute('class', 'col_conc');
                    th7.innerHTML = cad7;
                    tr.appendChild(th1);
                    tr.appendChild(th2);
                    tr.appendChild(th3);
                    tr.appendChild(th4);
                    tr.appendChild(th5);
                    tr.appendChild(th6);
                    tr.appendChild(th7);
                    tabla.appendChild(tr);
                    cad1 = "";
                    cad2 = "";
                    cad3 = "";
                    cad4 = "";
                    cad5 = "";
                    cad6 = "";
                    cad7 = "";
                    p = 0;
                    sum++;
                }
            }
            document.getElementById('numcuotas').innerHTML = sum;
            total = Math.round(total * 100) / 100;
            document.getElementById('total').innerHTML = total;
        }
        document.getElementById('fecha_actual2').innerHTML = localStorage.getItem('clifecha') + " - " + localStorage.getItem("clihora");
        document.getElementById('cecliente').innerHTML = localStorage.getItem("clinombre");
        document.getElementById('cedireccion').innerHTML = localStorage.getItem("clidireccion");
        location.href = "#cuotasxemitir";
    }
}

function arreglar(a) {
    var a1 = a.substr(0, 4);
    var a2 = a.substr(4, 5);
    var cad = a1 + "-" + a2;
    return cad;
}
//función para obtener el consumo de los usuarios
function consumos(a) {
    localStorage.setItem("consumos", a);
    $.ajax({
        type: "POST",
        url: conexion + "historicoConsumos.php",
        data: "codigo=" + localStorage.getItem("clicodigo"),
        cache: false,
        dataType: "text",
        success: onSuccess5
    });
}

function onSuccess5(data) {
    var tabla = document.getElementById('tabla3');
    $("#tabla3").empty();
    if (data == "") {
        location.href = "#dialog4";
    } else {
        var cad1 = "";
        var cad2 = "";
        var cad3 = "";
        var cad4 = "";
        var cad5 = "";
        var cad6 = "";
        var p = 0;
        var sum = 0;
        var cont = 0;
        var subcadena = "3";
        subcadena = subcadena.sup();

        var tr = document.createElement('tr');
        var th1 = document.createElement('th');
        th1.setAttribute('class', 'col_amf1');
        th1.innerHTML = 'Año-Mes Facturado';
        var th2 = document.createElement('th');
        th2.setAttribute('class', 'col_lam1');
        th2.innerHTML = 'Lectura Actual (m' + subcadena + ")";
        var th3 = document.createElement('th');
        th3.setAttribute('class', 'col_vl1');
        th3.innerHTML = 'Volumen Leído (m' + subcadena + ")";
        var th4 = document.createElement('th');
        th4.setAttribute('class', 'col_vf1');
        th4.innerHTML = 'Volumen Facturado (m' + subcadena + ")";
        var th5 = document.createElement('th');
        th5.setAttribute('class', 'col_tle1');
        th5.innerHTML = 'Tipo de Lectura';
        var th6 = document.createElement('th');
        th6.setAttribute('class', 'col_ref1');
        th6.innerHTML = 'Referencia';
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);
        tr.appendChild(th6);
        tabla.appendChild(tr);
        for (var i = 0; i < data.length; i++) {
            if (data.charAt(i) != "$" && p == 0) {
                cad1 = cad1 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 1) {
                cad2 = cad2 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 2) {
                cad3 = cad3 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 3) {
                cad4 = cad4 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 4) {
                cad5 = cad5 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 5) {
                cad6 = cad6 + data.charAt(i);
            } else if (data.charAt(i) == "$") {
                i++;
                p++;
                if (p == 6) {

                    var tr = document.createElement('tr');
                    var th1 = document.createElement('th');
                    th1.setAttribute('class', 'col_amf');
                    var cad12 = arreglar(cad1);
                    th1.innerHTML = cad12;
                    mes[cont] = cad1;
                    var th2 = document.createElement('th');
                    th2.setAttribute('class', 'col_lam');
                    th2.innerHTML = cad2;
                    var th3 = document.createElement('th');
                    th3.setAttribute('class', 'col_vl');
                    th3.innerHTML = cad3;
                    consumido[cont] = parseInt(cad3);
                    var th4 = document.createElement('th');
                    th4.setAttribute('class', 'col_vf');
                    th4.innerHTML = cad4;
                    facturado[cont] = parseInt(cad4);
                    facturado[i - 1] = parseInt(cad4);
                    var th5 = document.createElement('th');
                    th5.setAttribute('class', 'col_tle');
                    th5.innerHTML = cad5;
                    var th6 = document.createElement('th');
                    th6.setAttribute('class', 'col_ref');
                    th6.innerHTML = cad6;
                    tr.appendChild(th1);
                    tr.appendChild(th2);
                    tr.appendChild(th3);
                    tr.appendChild(th4);
                    tr.appendChild(th5);
                    tr.appendChild(th6);
                    tabla.appendChild(tr);
                    cad1 = "";
                    cad2 = "";
                    cad3 = "";
                    cad4 = "";
                    cad5 = "";
                    cad6 = "";
                    p = 0;
                    sum++;
                    cont++;
                }
            }
            document.getElementById('num_consumos').innerHTML = sum;
        }
        document.getElementById("ccliente").innerHTML = localStorage.getItem("clinombre");
        document.getElementById("cdireccion").innerHTML = localStorage.getItem("clidireccion");
        document.getElementById("fecha_actual3").innerHTML = localStorage.getItem("clifecha") + "-" + localStorage.getItem("clihora");
        location.href = "#consumo";
    }
}

function reclamos() {
    $.ajax({
        type: "POST",
        url: conexion + "reclamos.php",
        data: "codigo=" + localStorage.getItem("clicodigo"),
        cache: false,
        dataType: "text",
        success: onSuccess6
    });
}

function onSuccess6(data) {
    var tabla = document.getElementById('tabla4');
    $("#tabla4").empty();
    if (data == "") {
        location.href = "#dialog5";
    } else {
        var cad1 = "";
        var cad2 = "";
        var cad3 = "";
        var cad4 = "";
        var cad5 = "";
        var cad6 = "";
        var cad7 = "";
        var cad8 = "";
        var cad9 = "";
        var p = 0;
        var sum = 0;
        var tr = document.createElement('tr');
        var th1 = document.createElement('th');
        th1.setAttribute('class', 'col_cod1');
        th1.innerHTML = 'Código';
        var th2 = document.createElement('th');
        th2.setAttribute('class', 'col_des1');
        th2.innerHTML = 'Descripción';
        var th3 = document.createElement('th');
        th3.setAttribute('class', 'col_reg1');
        th3.innerHTML = 'F. Registro';
        var th4 = document.createElement('th');
        th4.setAttribute('class', 'col_fin1');
        th4.innerHTML = 'F. Final';
        var th5 = document.createElement('th');
        th5.setAttribute('class', 'col_pro1');
        th5.innerHTML = 'Tipo Problema';
        var th6 = document.createElement('th');
        th6.setAttribute('class', 'col_est1');
        th6.innerHTML = 'Estado';
        var th7 = document.createElement('th');
        th7.setAttribute('class', 'col_ins1');
        th7.innerHTML = 'Instancia';
        var th8 = document.createElement('th');
        th8.setAttribute('class', 'col_per1');
        th8.innerHTML = 'Periodo';
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);
        tr.appendChild(th6);
        tr.appendChild(th7);
        tr.appendChild(th8);
        tabla.appendChild(tr);
        for (var i = 0; i < data.length; i++) {
            if (data.charAt(i) != "$" && p == 0) {
                cad1 = cad1 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 1) {
                cad2 = cad2 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 2) {
                cad3 = cad3 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 3) {
                cad4 = cad4 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 4) {
                cad5 = cad5 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 5) {
                cad6 = cad6 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 6) {
                cad7 = cad7 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 7) {
                cad8 = cad8 + data.charAt(i);
            } else if (data.charAt(i) == "$") {
                i++;
                p++;
                if (p == 8) {

                    var tr = document.createElement('tr');
                    var th1 = document.createElement('th');
                    th1.setAttribute('class', 'col_cod');
                    th1.innerHTML = cad1;
                    var th2 = document.createElement('th');
                    th2.setAttribute('class', 'col_des');
                    th2.innerHTML = cad2;
                    var th3 = document.createElement('th');
                    th3.setAttribute('class', 'col_reg');
                    th3.innerHTML = cad3;
                    var th4 = document.createElement('th');
                    th4.setAttribute('class', 'col_fin');
                    th4.innerHTML = cad4;
                    var th5 = document.createElement('th');
                    th5.setAttribute('class', 'col_pro');
                    th5.innerHTML = cad5;
                    var th6 = document.createElement('th');
                    th6.setAttribute('class', 'col_est');
                    th6.innerHTML = cad6;
                    var th7 = document.createElement('th');
                    th7.setAttribute('class', 'col_ins');
                    th7.innerHTML = cad7;
                    var th8 = document.createElement('th');
                    th8.setAttribute('class', 'col_per');
                    th8.innerHTML = arreglar(cad8);
                    tr.appendChild(th1);
                    tr.appendChild(th2);
                    tr.appendChild(th3);
                    tr.appendChild(th4);
                    tr.appendChild(th5);
                    tr.appendChild(th6);
                    tr.appendChild(th7);
                    tr.appendChild(th8);
                    tabla.appendChild(tr);
                    cad1 = "";
                    cad2 = "";
                    cad3 = "";
                    cad4 = "";
                    cad5 = "";
                    cad6 = "";
                    cad7 = "";
                    cad8 = "";
                    cad9 = "";
                    p = 0;
                    sum++;
                }
            }
            document.getElementById('numreclamos').innerHTML = sum;
        }
        document.getElementById("rcliente").innerHTML = localStorage.getItem("clinombre");
        document.getElementById("rdireccion").innerHTML = localStorage.getItem("clidireccion");
        document.getElementById("fecha_actual4").innerHTML = localStorage.getItem("clifecha") + "-" + localStorage.getItem("clihora");
        location.href = "#reclamos";
    }
}


function hpagos() {
    $.ajax({
        type: "POST",
        url: conexion + "historicoPagos.php",
        data: "codigo=" + localStorage.getItem("clicodigo"),
        cache: false,
        dataType: "text",
        success: onSuccess7
    });
}

function onSuccess7(data) {
    if (data == "") {
        location.href = "#dialog6";
    } else {
        var tabla = document.getElementById('tabla5');
        $("#tabla5").empty();
        var cad1 = "";
        var cad2 = "";
        var cad3 = "";
        var cad4 = "";
        var cad5 = "";
        var p = 0;
        var sum = 0;

        var tr = document.createElement('tr');
        var th1 = document.createElement('th');
        th1.setAttribute('class', 'col_pfp1');
        th1.innerHTML = 'Fecha Pago';
        var th2 = document.createElement('th');
        th2.setAttribute('class', 'col_pfv1');
        th2.innerHTML = 'Fecha Vencimiento';
        var th3 = document.createElement('th');
        th3.setAttribute('class', 'col_plugar1');
        th3.innerHTML = 'Lugar Pago';
        var th4 = document.createElement('th');
        th4.setAttribute('class', 'nro_precibo1');
        th4.innerHTML = 'Nro Recibo';
        var th5 = document.createElement('th');
        th5.setAttribute('class', 'col_ppago1');
        th5.innerHTML = 'Total Pagado';
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);
        tabla.appendChild(tr);
        for (var i = 0; i < data.length; i++) {
            if (data.charAt(i) != "$" && p == 0) {
                cad1 = cad1 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 1) {
                cad2 = cad2 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 2) {
                cad3 = cad3 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 3) {
                cad4 = cad4 + data.charAt(i);
            } else if (data.charAt(i) != "$" && p == 4) {
                cad5 = cad5 + data.charAt(i);
            } else if (data.charAt(i) == "$") {
                i++;
                p++;
                if (p == 5) {

                    var tr = document.createElement('tr');
                    tr.setAttribute('id', 'fila' + sum);
                    var th1 = document.createElement('th');
                    th1.setAttribute('class', 'col_pfp');
                    cad12 = cambiarMes1(cad1);
                    th1.innerHTML = cad12;
                    var th2 = document.createElement('th');
                    th2.setAttribute('class', 'col_pfv');
                    cad22 = cambiarMes1(cad2);
                    th2.innerHTML = cad22;
                    var th3 = document.createElement('th');
                    th3.setAttribute('class', 'col_plugar');
                    th3.innerHTML = cad3;
                    var th4 = document.createElement('th');
                    th4.setAttribute('class', 'nro_precibo');
                    th4.innerHTML = cad4;
                    var th5 = document.createElement('th');
                    th5.setAttribute('class', 'col_ppago');
                    th5.innerHTML = cad5;
                    tr.appendChild(th1);
                    tr.appendChild(th2);
                    tr.appendChild(th3);
                    tr.appendChild(th4);
                    tr.appendChild(th5);
                    tabla.appendChild(tr);
                    cambiarColor(cad1, cad2, sum);
                    cad1 = "";
                    cad2 = "";
                    cad3 = "";
                    cad4 = "";
                    cad5 = "";
                    p = 0;
                    sum++;
                }
            }
        }
        document.getElementById('numpagos').innerHTML = sum;
        document.getElementById("pcliente").innerHTML = localStorage.getItem("clinombre");
        document.getElementById("pdireccion").innerHTML = localStorage.getItem("clidireccion");
        document.getElementById("fecha_actual5").innerHTML = localStorage.getItem("clifecha") + "-" + localStorage.getItem("clihora");
        location.href = "#historicopagos";
    }
}


function cambiarColor(a, b, cont) {
    var cad1 = a.substring(0, 2);
    var cad2 = a.substring(3, 6);
    var cad3 = a.substring(7, 9);

    var cad4 = b.substring(0, 2);
    var cad5 = b.substring(3, 6);
    var cad6 = b.substring(7, 9);

    var anio1 = parseInt(cad3);
    var anio2 = parseInt(cad6);

    var valor = cambiarMes(cad2);
    var valor1 = cambiarMes(cad5);

    var dia = parseInt(cad1);
    var dia1 = parseInt(cad4);
    if (anio1 > anio2) {
        document.getElementById('fila' + cont).style.background = '#FFFFBF';
    } else {
        if (valor > valor1) {
            document.getElementById('fila' + cont).style.background = '#FFFFBF';
        } else {
            if (dia > dia1) {
                document.getElementById('fila' + cont).style.background = '#FFFFBF';
            } else {
                document.getElementById('fila' + cont).style.background = 'rgba(236, 245, 255,.9)';
            }
        }
    }

}

function cambiarMes1(a) {
    var dia = a.substr(0, 2);
    var mes = a.substr(3, 3);
    var anio = a.substr(7, 2);
    mes = cambiarMes2(mes);
    return dia + "-" + mes + "-" + anio;
}

function cambiarMes2(a) {
    var mes = "";
    if (a == "JAN") {
        mes = "ENE";
    } else if (a == "FEB") {
        mes = "FEB";
    } else if (a == "MAR") {
        mes = "MAR";
    } else if (a == "APR") {
        mes = "ABR";
    } else if (a == "MAY") {
        mes = "MAY";
    } else if (a == "JUN") {
        mes = "JUN";
    } else if (a == "JUL") {
        mes = "JUL";
    } else if (a == "AUG") {
        mes = "AGO";
    } else if (a == "SEP") {
        mes = "SET";
    } else if (a == "OCT") {
        mes = "OCT";
    } else if (a == "NOV") {
        mes = "NOV";
    } else if (a == "DEC") {
        mes = "DIC";
    }
    return mes;
}

function configurar() {
    location.href = "#configuracion";
}

function registrar() {
    var rnombre = document.getElementsByName("rnombre")[0].value;
    var rcorreo = document.getElementsByName("rcorreo")[0].value;
    var rsuministro = document.getElementsByName("rsuministro")[0].value;
    var rcelular = document.getElementsByName("rcelular")[0].value;
    var rdni = document.getElementsByName("rdni")[0].value;

    if (rnombre == "" || rnombre == "NOMBRE COMPLETO" || rcorreo == "" || rcorreo == "CORREO" || rsuministro == "" || rsuministro == "SUMINISTRO" || rcelular == "" || rcelular == "CELULAR" || rdni == "" || rdni == "DNI") {
        alert("Rellene todos los campos correctamente");
    } else {
        if (rcorreo.indexOf("@") == -1) {
            alert("correo no valido");
        } else if (rdni.length != 8) {
            alert("DNI incorrecto, ingrese uno válido");
        } else {
            registrarBD(rnombre, rcorreo, rsuministro, rcelular, rdni);
        }
    }

}


function registrarBD(a, b, c, d, e) {
    $.ajax({
        type: "POST",
        url: "http://192.168.22.10/correo.php",
        data: "nombre=" + a + "&suministro=" + c + "&dni=" + c + "&email=" + d + "&tel=" + e,
        cache: false,
        dataType: "text",
        success: onSuccess8
    });
}

function onSuccess8(data) {
    alert(data);
}

function dondepagar(a) {
    localStorage.setItem("dondepagar", a);
    location.href = "#dondePagar";
}

function regresar98() {
    if (localStorage.getItem("dondepagar") == 1) {
        location.href = "#usuarios";
    } else if (localStorage.getItem("dondepagar") == 2) {
        location.href = "#noClientes";
    }
}
