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

/**
 **
 **Funciones que cargan al iniciar la app.
 **
 */
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
/**
 **
 ** Funciones de la primera pantalla. index.html#inicio
 **
 */
/** Función para cambiar a la pantalla de Login  **/
function irLogin() {
    $.mobile.changePage("#login", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}
/** Función para cambiar pantalla de los clientes no registrados **/
function irNoClientes() {
    $.mobile.changePage("#noclientes", {
        transition: "",
        reverse: true,
        changeHash: true
    });
    if (!localStorage.getItem('dialogo_nocliente')) {
        swal("Servicios Sedalib S.A.", "Consultas telefónicas\nLugares de Pago\nLugares de Atención\nNoticias Generales")
    }
    localStorage.setItem("dialogo_nocliente", 1);
}
/** Función para cambiar de pagina nos lleva  a la pagina camra.html. Ademas guarda crea una variable de localstorage para poder volver a la pagina de inicio**/
function camara(a) {
    localStorage.setItem("camara", a);
    location.href = "camara.html";
}
/** Función para llamar a la pagina de mapa.html**/
function mapa(a) {
    localStorage.setItem("mapa", a);
    location.href = "pages/mapa.html";
}
/**
 **
 ** Funciones para la pantalla de Login. index.html#login
 **
 */
function volverInicio() {
    $.mobile.changePage("#inicio", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}
//funcion para ingresar a la app
function irRegistro() {
    $.mobile.changePage("#registro", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}

function login() {
    var email = $("#txt-email").val();
    localStorage.setItem('email', email);
    var password = $("#txt-pass").val();
    localStorage.setItem('password', password);
    $.ajax({
        type: "POST",
        url: conexion + "login1.php",
        data: "correo=" + email + "&contrasenia=" + password,
        cache: false,
        dataType: "text",
        success: onSuccess
    });
}

function onSuccess(data) {
    if(data == "$$$$$$$$$$$$$$$$0"){
        swal("Usuario no Registrado");
    }else{
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
                clifechavencimiento = clifechavencimiento + data.charAt(i);
               
            } else if (data.charAt(i) != "$" && j == 7) {
                clifechacorte = clifechacorte + data.charAt(i)
            } else if (data.charAt(i) != "$" && j == 8) {
                
                 clicantidad = clicantidad + data.charAt(i);
            } else {
                j++;
                i++;
            }
        }
        localStorage.setItem('fecha_actualizacion', clifecha)
        localStorage.setItem('hora_actualizacion', clihora)
        localStorage.setItem("codigo_cliente", clicodigo);
        localStorage.setItem("suministro_cliente", clisuministro);
        localStorage.setItem("nombre_cliente", clinombre);
        localStorage.setItem("deuda_cliente", parseFloat(clideuda));
        localStorage.setItem("cantidad_cliente", clicantidad);
        localStorage.setItem("fchVencimiento_cliente", clifechavencimiento);
        localStorage.setItem("fchCorte_cliente", clifechacorte);
        localStorage.setItem("direccion_cliente", clidireccion);
        document.getElementById("suministro_cliente").innerHTML = localStorage.getItem("codigo_cliente");
        document.getElementById("deuda_cliente").innerHTML = localStorage.getItem("deuda_cliente");
        document.getElementById("nombre_cliente").innerHTML = localStorage.getItem("nombre_cliente");
            if (localStorage.getItem('deuda_cliente') == 0) {
                document.getElementById("vencimiento").innerHTML = "AL DÍA";
                document.getElementById("corte").innerHTML = "AL DÍA";
                document.getElementById("cantidad_cliente").innerHTML = 0;
            } else {
                if (localStorage.getItem("fchVencimiento_cliente") && localStorage.getItem("fchCorte_cliente")) {
                    document.getElementById("vencimiento").innerHTML = localStorage.getItem("fchVencimiento_cliente");
                    document.getElementById("corte").innerHTML = localStorage.getItem("fchCorte_cliente");
                    document.getElementById("cantidad_cliente").innerHTML = localStorage.getItem("cantidad_cliente");
                } else {
                    document.getElementById("vencimiento").innerHTML = "AL DÍA";
                    document.getElementById("corte").innerHTML = "AL DÍA";

                }
            }
            if (localStorage.getItem('deuda_cliente') == 0) {
                $("#carta").css("background-color", "#4caf50");
                document.getElementById("carita").src ="img/alegre.gif"
                //$("#carita").attr("src", "../img/alegre.gif")
            } else if (localStorage.getItem('cantidad_cliente') > 0 && localStorage.getItem('cantidad_cliente') < 3) {
                $("#carta").css("background-color", "#ffeb3b");
                document.getElementById("carita").src ="img/triste.gif"
               // $("#carita").attr("src", "../img/triste.gif")
            } else if (localStorage.getItem('cantidad_cliente') > 2) {
                $("#carta").css("background-color", "#f44336");
                document.getElementById("carita").src ="img/triste.gif"
                //$("#carita").attr("src", "../img/triste.gif")
            }
        verPagos(localStorage.getItem("codigo_cliente"));

        $.mobile.changePage("#usuarios", {
                transition: "",
                reverse: true,
                changeHash: true
            });
    }
   /* a = JSON.parse(data);
    console.log(a);
    if (data ==null || a.length == 0) {
        swal("Usuario no Registrado");
    } else {
        if (a.length > 7) {
            localStorage.setItem('fecha_actualizacion', a[0])
            localStorage.setItem('hora_actualizacion', a[1])
            localStorage.setItem('direccion_cliente', a[2])
            localStorage.setItem('codigo_cliente', a[3])
            localStorage.setItem('deuda_cliente', a[5])
            localStorage.setItem('cantidad_cliente', a[a.length - 1])
            localStorage.setItem('fchVencimiento_cliente', a[a.length - 3])
            localStorage.setItem('fchCorte_cliente', a[a.length - 2])
            separar_nombre(a[4]);
        } else {
            localStorage.setItem('fecha_actualizacion', a[0])
            localStorage.setItem('hora_actualizacion', a[1])
            localStorage.setItem('direccion_cliente', a[2])
            localStorage.setItem('codigo_cliente', a[3])
            localStorage.setItem('deuda_cliente', a[5])
            localStorage.setItem('cantidad_cliente', a[6])
            separar_nombre(a[4]);
            
        }
        document.getElementById("suministro_cliente").innerHTML = localStorage.getItem("codigo_cliente");
        document.getElementById("deuda_cliente").innerHTML = localStorage.getItem("deuda_cliente");
            if (localStorage.getItem('deuda_cliente') == 0) {
                document.getElementById("vencimiento").innerHTML = "AL DÍA";
                document.getElementById("corte").innerHTML = "AL DÍA";
                document.getElementById("cantidad_cliente").innerHTML = 0;
            } else {
                if (localStorage.getItem("fchVencimiento_cliente") && localStorage.getItem("fchCorte_cliente")) {
                    document.getElementById("vencimiento").innerHTML = localStorage.getItem("fchVencimiento_cliente");
                    document.getElementById("corte").innerHTML = localStorage.getItem("fchCorte_cliente");
                    document.getElementById("cantidad_cliente").innerHTML = localStorage.getItem("cantidad_cliente");
                } else {
                    document.getElementById("vencimiento").innerHTML = "AL DÍA";
                    document.getElementById("corte").innerHTML = "AL DÍA";

                }
            }
            if (localStorage.getItem('deuda_cliente') == 0) {
                $("#carta").css("background-color", "#4caf50");
                document.getElementById("carita").src ="img/alegre.gif"
                //$("#carita").attr("src", "../img/alegre.gif")
            } else if (localStorage.getItem('cantidad_cliente') > 0 && localStorage.getItem('cantidad_cliente') < 3) {
                $("#carta").css("background-color", "#ffeb3b");
                document.getElementById("carita").src ="img/triste.gif"
               // $("#carita").attr("src", "../img/triste.gif")
            } else if (localStorage.getItem('cantidad_cliente') > 2) {
                $("#carta").css("background-color", "#f44336");
                document.getElementById("carita").src ="img/triste.gif"
                //$("#carita").attr("src", "../img/triste.gif")
            }
        verPagos(localStorage.getItem("codigo_cliente"));

        $.mobile.changePage("#usuarios", {
                transition: "",
                reverse: true,
                changeHash: true
            });
    }
*/
}

function separar_nombre(a) {
    var suministro_cliente1 = "";
    var nombre_cliente = "";
    for (var i = 0; i < a.length; i++) {
        if (a.charCodeAt(i) >= 48 && a.charCodeAt(i) <= 57) {
            suministro_cliente1 = suministro_cliente1 + a.charAt(i);
        } else {
            nombre_cliente = nombre_cliente + a.charAt(i);
        }
    }
    localStorage.setItem('suministro_cliente', suministro_cliente1)
    localStorage.setItem('nombre_cliente', nombre_cliente)
    document.getElementById("nombre_cliente").innerHTML = localStorage.getItem("nombre_cliente");

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
        swal("Advertencia", "Evite Pagar fuera de la Fecha de Vencimiento")
    }
}

/*function salirApp() {
    $.mobile.changePage("#login", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}*/

function estadoCuenta() {
    var codigo = localStorage.getItem('codigo_cliente');
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
    $.mobile.changePage("#estadoCuenta", {
        transition: "",
        reverse: true,
        changeHash: true
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
    var mes = datospersonales[0].substring(3, 5);
    var anio = datospersonales[0].substring(6, 10);
    mes = cambiarMes(mes);
    datospersonales[0] = dia + "-" + mes + "-" + anio;
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
    deudacapital = Math.round(deudacapital * 100) / 100;
    localStorage.setItem("deudacapital", "S./" + deudacapital);
    localStorage.setItem("cuotasemitir", "S./" + datospersonales[10]);
    var tgastoscobranza = parseFloat(datospersonales[11]) + parseFloat(datospersonales[12]);
    tgastoscobranza = Math.round(tgastoscobranza * 100) / 100;
    localStorage.setItem("tgastoscobranza", "S./" + tgastoscobranza);
    localStorage.setItem("interese", "S./" + datospersonales[13]);
    localStorage.setItem("totalinterese", "S./" + datospersonales[14]);
    var deudatotal = deudacapital + parseFloat(datospersonales[10]) + tgastoscobranza + parseFloat(datospersonales[13]) + parseFloat(datospersonales[14]);
    localStorage.setItem("deudatotal", "S./" + deudatotal);
    document.getElementById("suministro").innerHTML = localStorage.getItem("codigo_cliente");
    document.getElementById("usuario").innerHTML = localStorage.getItem("nombre_cliente");
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
    if (a == "01") {
        mes = "ENERO";
    } else if (a == "02") {
        mes = "FEBRERO";
    } else if (a == "03") {
        mes = "MARZO";
    } else if (a == "04") {
        mes = "ABRIL";
    } else if (a == "05") {
        mes = "MAYO";
    } else if (a == "06") {
        mes = "JUNIO";
    } else if (a == "07") {
        mes = "JULIO";
    } else if (a == "08") {
        mes = "AGOSTO";
    } else if (a == "09") {
        mes = "SETIEMBRE";
    } else if (a == "10") {
        mes = "OCTUBRE";
    } else if (a == "11") {
        mes = "NOVIEMBRE";
    } else if (a == "12") {
        mes = "DICIEMBRE";
    }
    return mes;
}

/**
 **
 ** Funciones para la pantalla de Registro. index.html#registro
 **
 */
function volverLogin() {
    $.mobile.changePage("#login", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}

function registrar() {
    var rnombre = document.getElementsByName("rnombre")[0].value;
    var rcorreo = document.getElementsByName("rcorreo")[0].value;
    var rsuministro = document.getElementsByName("rsuministro")[0].value;
    var rcelular = document.getElementsByName("rcelular")[0].value;
    var rdni = document.getElementsByName("rdni")[0].value;
    registrarBD(rnombre, rcorreo, rsuministro, rcelular, rdni);
    /*if (rnombre == "" || rnombre == "NOMBRE COMPLETO" || rcorreo == "" || rcorreo == "CORREO" || rsuministro == "" || rsuministro == "SUMINISTRO" || rcelular == "" || rcelular == "CELULAR" || rdni == "" || rdni == "DNI") {
        alert("Rellene todos los campos correctamente");
    } else {
        if (rcorreo.indexOf("@") == -1) {
            alert("correo no valido");
        } else if (rdni.length != 8) {
            alert("DNI incorrecto, ingrese uno válido");
        } else {*/
    //
    /* }
    }*/

}


function registrarBD(a, b, c, d, e) {
    $.ajax({
        type: "POST",
        url: "http://pekin.sedalib.com.pe:90/SIC/correo.php",
        data: "nombre=" + a + "&email=" + b + "&suministro=" + c + "&tel=" + d + "&dni=" + e,
        cache: false,
        dataType: "text",
        success: onSuccess8
    });
}

function onSuccess8(data) {
    if(data == "Usuario ya Registrado"){
             swal({ title:"Error", text: "Usuario Existente",   timer: 3000,   showConfirmButton: false });
         $.mobile.changePage("#login", {
            transition: "",
            reverse: true,
            changeHash: true
        });
    }else{
         swal({ title:"Usuario Registrado", text: "Porfavor Revise su correo en unos minutos le llegara el mensaje de confirmación",   timer: 3000,   showConfirmButton: false });
         $.mobile.changePage("#login", {
            transition: "",
            reverse: true,
            changeHash: true
        });
        }
   
}
/**
 **
 ** Funciones para la pantalla de no Clientes. index.html#noclientes
 **
 */
function dondepagar(a) {
    localStorage.setItem("dondepagar", a);
    location.href = "#dondePagar";
}

function volverNoCliente() {
    $.mobile.changePage("#noclientes", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}
/**
 **
 ** Funciones para la pantalla de Estado de Cuenta
 **
 **/
function irUsuarios() {
    $.mobile.changePage("#usuarios", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}

function recibospendientes(a) {
    localStorage.setItem("recibospendientes", a);
    var codigo = localStorage.getItem("codigo_cliente");
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
        swal("No cuenta con recibos pendientes");
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
        document.getElementById('cantidad_recibos').innerHTML = localStorage.getItem("cantidad_cliente");
        document.getElementById('fecha_actual1').innerHTML = localStorage.getItem('fecha_actualizacion') + " - " + localStorage.getItem("hora_actualizacion");
        document.getElementById('rpcliente').innerHTML = localStorage.getItem("nombre_cliente");
        document.getElementById('rpdireccion').innerHTML = localStorage.getItem("direccion_cliente");
        $.mobile.changePage("#recibospendientes1", {
            transition: "",
            reverse: true,
            changeHash: true
        });
    }
}

function consumos(a) {
    localStorage.setItem("consumos", a);
    $.ajax({
        type: "POST",
        url: conexion + "historicoConsumos.php",
        data: "codigo=" + localStorage.getItem("codigo_cliente"),
        cache: false,
        dataType: "text",
        success: onSuccess5
    });
}

function onSuccess5(data) {
    var tabla = document.getElementById('tabla3');
    $("#tabla3").empty();
    if (data == "") {
        swal("No cuenta con consumos Registrados");
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
        document.getElementById("ccliente").innerHTML = localStorage.getItem("nombre_cliente");
        document.getElementById("cdireccion").innerHTML = localStorage.getItem("direccion_cliente");
        document.getElementById("fecha_actual3").innerHTML = localStorage.getItem("fecha_actualizacion") + "-" + localStorage.getItem("hora_actualizacion");
        location.href = "#consumo";
    }
}

function salirApp() {
    $.mobile.changePage("#login", {
        transition: "",
        reverse: true,
        changeHash: true
    });

    //Destruir variables
    localStorage.removeItem("nombre_cliente");
    localStorage.removeItem("direccion_cliente");
    localStorage.removeItem("fecha_actualizacion");
    localStorage.removeItem("hora_actualizacion");
    localStorage.removeItem("codigo_cliente");
    localStorage.removeItem("deuda_cliente");
    localStorage.removeItem("cantidad_cliente");
    localStorage.removeItem("fchVencimiento_cliente");
    localStorage.removeItem("fchCorte_cliente");
    $("#txt-email").val("");
    $("#txt-pass").val("");

}


/**
 **
 **   Cuotas por emitir
 **
 **/

function cuotasxemitir(a) {
    localStorage.setItem("cuotasxemitir", a);
    var cod = localStorage.getItem('codigo_cliente');
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
        swal("No cuenta con cuotas por emitir")
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
        document.getElementById('fecha_actual2').innerHTML = localStorage.getItem('fecha_actualizacion') + " - " + localStorage.getItem("hora_actualizacion");
        document.getElementById('cecliente').innerHTML = localStorage.getItem("nombre_cliente");
        document.getElementById('cedireccion').innerHTML = localStorage.getItem("direccion_cliente");
        location.href = "#cuotasxemitir";
    }
}

function reclamos() {

    $.ajax({
        type: "POST",
        url: conexion + "reclamos.php",
        data: "codigo=" + localStorage.getItem("codigo_cliente"),
        cache: false,
        dataType: "text",
        success: onSuccess6
    });
}

function onSuccess6(data) {
    var tabla = document.getElementById('tabla4');
    $("#tabla4").empty();
    if (data == "") {
        swal("No cuenta con reclamos Regitrados");
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
        document.getElementById("rcliente").innerHTML = localStorage.getItem("nombre_cliente");
        document.getElementById("rdireccion").innerHTML = localStorage.getItem("direccion_cliente");
        document.getElementById("fecha_actual4").innerHTML = localStorage.getItem("fecha_actualizacion") + "-" + localStorage.getItem("hora_actualizacion");
        location.href = "#reclamos";
    }
}

/*function irclientes() {
    $.mobile.changePage("#usuarios", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}*/

function hpagos() {
    $.ajax({
        type: "POST",
        url: conexion + "historicoPagos.php",
        data: "codigo=" + localStorage.getItem("codigo_cliente"),
        cache: false,
        dataType: "text",
        success: onSuccess7
    });
}

function onSuccess7(data) {
    if (data == "") {
        swal("No tiene Pagos Registrados")
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
        document.getElementById("pcliente").innerHTML = localStorage.getItem("nombre_cliente");
        document.getElementById("pdireccion").innerHTML = localStorage.getItem("direccion_cliente");
        document.getElementById("fecha_actual5").innerHTML = localStorage.getItem("fecha_actualizacion") + "-" + localStorage.getItem("hora_actualizacion");
        location.href = "#historicopagos";
    }
}






//función para visualizar el diálogo de la página no Clientes
localStorage.setItem('visitarNoClientes', 0);

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

function pagosOnline(){
     $.mobile.changePage("#pagosOnline", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}


function pagosBCP() {
    if(device.platform == 'Android'){ // si estamos en android
        var successCallback = function() { // si está instalada….
        // alert(“Success!”);
        window.plugins.launcher.launch({packageName:'com.bcp.bank.bcp'}); // debes conocer el package de la aplicación que tienes instalada para abrirla
        };
        var errorCallback = function() { // no está instalada
        //alert(“Error! ” + errMsg);
        window.location.href="market://details?id=com.bcp.bank.bcp"; //ruta google play de la aplicación
        };
        window.plugins.launcher.canLaunch({packageName:"com.bcp.bank.bcp"}, successCallback, errorCallback); // compruebo si tengo instalada la aplicación
    }
/*}else { // si en estamos en IOS por ejemplo
var successCallback = function() { // si está instalada….
window.location.href=”example://”; -> la aplicación que tienes en IOS instalada
};
var errorCallback = function() { // si no está instalada
window.location.href=”itms-apps://itunes.apple.com/app/idExample”; // ruta al itunes de la aplicación si no la tienes instalada

};
window.plugins.launcher.canLaunch({uri:’example://’}, successCallback, errorCallback); // debes conocer el uri de la aplicación para comprobar si la tienes o no

}*/
}

function pagosInterbank() {
    if(device.platform == 'Android'){ // si estamos en android
        var successCallback = function() { // si está instalada….
        // alert(“Success!”);
        window.plugins.launcher.launch({packageName:'pe.com.interbank.mobilebanking'}); // debes conocer el package de la aplicación que tienes instalada para abrirla
        };
        var errorCallback = function() { // no está instalada
        //alert(“Error! ” + errMsg);
        window.location.href="market://details?id=pe.com.interbank.mobilebanking"; //ruta google play de la aplicación
        };
        window.plugins.launcher.canLaunch({packageName:"pe.com.interbank.mobilebanking"}, successCallback, errorCallback); // compruebo si tengo instalada la aplicación
    }
}

function pagosBanbif() {
    if(device.platform == 'Android'){ // si estamos en android
        var successCallback = function() { // si está instalada….
        // alert(“Success!”);
        window.plugins.launcher.launch({packageName:'pe.com.banBifBanking.icBanking.androidUI'}); // debes conocer el package de la aplicación que tienes instalada para abrirla
        };
        var errorCallback = function() { // no está instalada
        //alert(“Error! ” + errMsg);
        window.location.href="market://details?id=pe.com.banBifBanking.icBanking.androidUI"; //ruta google play de la aplicación
        };
        window.plugins.launcher.canLaunch({packageName:"pe.com.banBifBanking.icBanking.androidUI"}, successCallback, errorCallback); // compruebo si tengo instalada la aplicación
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

function arreglar(a) {
    var a1 = a.substr(0, 4);
    var a2 = a.substr(4, 5);
    var cad = a1 + "-" + a2;
    return cad;
}
//función para obtener el consumo de los usuarios



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
    var mes = a.substr(3, 2);
    var anio = a.substr(6, 4);
    mes = cambiarMes2(mes);
    return dia + "-" + mes + "-" + anio;
}

function cambiarMes2(a) {
    var mes = "";
    if (a == "01") {
        mes = "ENE";
    } else if (a == "02") {
        mes = "FEB";
    } else if (a == "03") {
        mes = "MAR";
    } else if (a == "04") {
        mes = "ABR";
    } else if (a == "05") {
        mes = "MAY";
    } else if (a == "06") {
        mes = "JUN";
    } else if (a == "07") {
        mes = "JUL";
    } else if (a == "08") {
        mes = "AGO";
    } else if (a == "09") {
        mes = "SET";
    } else if (a == "10") {
        mes = "OCT";
    } else if (a == "11") {
        mes = "NOV";
    } else if (a == "12") {
        mes = "DIC";
    }
    return mes;
}

function configurar() {
    location.href = "#configuracion";
}


function regresar98() {
    if (localStorage.getItem("dondepagar") == 1) {
        location.href = "#usuarios";
    } else if (localStorage.getItem("dondepagar") == 2) {
        location.href = "#noclientes";
    } else if(localStorage.getItem("dondepagar")==3){
        location.href = "#inicio";
    }
}
