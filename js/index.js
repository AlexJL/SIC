//funcion para colocar los plugins de phonegap AIzaSyAD5cYe8yvuil-ariamIXqpOkKCYgTctMA
var nombre = new Array("Documento", "F. emison", "F. Vencimiento", "F. Corte", "Monto");
var nombre1 = new Array("Documento", "Fecha Pago", "Fecha Vencimiento", "Lugar de Pago", "Monto");
var numeroRecibos = new Array();
var totalRecibos = new Array();
var femiRecibos = new Array();
var fvenRecibos = new Array();
var dias_recibos = new Array();
var mes = new Array();
var consumido = new Array();
var facturado = new Array();
var datospersonales = new Array();
var num_reclamos = new Array();
var total_estancado = new Array();
var nd_creada = new Array();
var nc_creada = new Array();
var neto_obtenido = new Array();
var num_recibos_reclamos = new Array();
var nc = new Array();
var r1 = new Array();
var r2 = new Array();
var r3 = new Array();
var r4 = new Array();
var r5 = new Array();
var r6 = new Array();
var r7 = new Array();
var r8 = new Array();
var r9 = new Array();
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
var dias_transcurridos = "";
var tipoCli = "";
var estado = "";
var imagenes_servidor = "http://www.sedalib.com.pe/upload/";
var comunicado = "http://www.sedalib.com.pe/upload/drive/82013/20130823-3219568128.jpg";

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
    }else if ($.mobile.activePage.attr('id') == 'login') {
        $.mobile.changePage('#inicio');
    }else if ($.mobile.activePage.attr('id') == 'usuarios') {
        $.mobile.changePage('#login');
    } else if ($.mobile.activePage.attr('id') == 'estadoCuenta') {
        $.mobile.changePage('#usuarios');
    }else if ($.mobile.activePage.attr('id') == 'consultas') {
        $.mobile.changePage('#usuarios');
    }else {
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
    email =  trim(email);
    localStorage.setItem('email', email);
    var password = $("#txt-pass").val();
    password = trim(password);
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
    if(data == "$$$$$$$$$$$$$$$$0$$0$$"){
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
        clidireccion="";
        tipoCli ="";
        estado = "";
        dias_transcurridos="";
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
            } else if(data.charAt(i) != "$" && j == 9){
                dias_transcurridos = dias_transcurridos + data.charAt(i);
            }else if(data.charAt(i) != "$" && j == 10){
                estado = estado + data.charAt(i);
            }else {
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
        localStorage.setItem("cantidad_cliente", parseInt(clicantidad));
        localStorage.setItem("fchVencimiento_cliente", clifechavencimiento);
        localStorage.setItem("fchCorte_cliente", clifechacorte);
        localStorage.setItem("direccion_cliente", clidireccion);
        localStorage.setItem("tipo_cliente", tipoCli);
        localStorage.setItem("estado_cliente", parseInt(estado));
        localStorage.setItem("dias_transcurridos", parseInt(dias_transcurridos));
        document.getElementById("suministro_cliente").innerHTML = localStorage.getItem("codigo_cliente");
        document.getElementById("deuda_cliente").innerHTML = localStorage.getItem("deuda_cliente");
        document.getElementById("nombre_cliente").innerHTML = localStorage.getItem("nombre_cliente");
        
        if(localStorage.getItem('deuda_cliente') == 0){
             document.getElementById("vencimiento").innerHTML = "No Tiene";
             document.getElementById("column2_1").style.display = "none";
             document.getElementById("corte").innerHTML = "AL DÍA";
             document.getElementById("cantidad_cliente").innerHTML = 0;
            $("#carta").css("background-color", "#4caf50");
            document.getElementById("carita").src ="img/alegre.gif"
            $("#colum_1").css("color","#FFF")
            $("#column2_0").css("color","#FFF")
            $("#column2_1").css("color","#FFF")
            $("#fuera_fecha").css("color","#FFF")
            document.getElementById("fuera_fecha").style.display = "none";
        }
        else if(localStorage.getItem("deuda_cliente")>0){
            if(localStorage.getItem("cantidad_cliente") == 0){
                document.getElementById("vencimiento").innerHTML = "No Tiene";
                document.getElementById("column2_1").style.display = "none";
                document.getElementById("corte").innerHTML = "AL DÍA";
                document.getElementById("cantidad_cliente").innerHTML = 0;
                $("#carta").css("background-color", "#4caf50");
                document.getElementById("carita").src ="img/alegre.gif"
                $("#colum_1").css("color","#FFF")
                $("#column2_0").css("color","#FFF")
                $("#column2_1").css("color","#FFF")
                $("#fuera_fecha").css("color","#FFF")
                document.getElementById("fuera_fecha").style.display = "none";
            }
            else if(localStorage.getItem("cantidad_cliente")>0 && localStorage.getItem("cantidad_cliente")<3){
                document.getElementById("vencimiento").innerHTML = localStorage.getItem("fchVencimiento_cliente");
                document.getElementById("column2_1").style.display = "block";
                document.getElementById("corte").innerHTML = localStorage.getItem("fchCorte_cliente");
                document.getElementById("cantidad_cliente").innerHTML = localStorage.getItem("cantidad_cliente");
                $("#carta").css("background-color", "#ffeb3b");
                document.getElementById("carita").src ="img/triste.gif"
                $("#colum_1").css("color","#00207E")
                $("#column2_0").css("color","#00207E")
                $("#column2_1").css("color","#00207E")
                $("#fuera_fecha").css("color","#00207E")
            }else if(localStorage.getItem("cantidad_cliente")>2){
                document.getElementById("vencimiento").innerHTML = localStorage.getItem("fchVencimiento_cliente");
                document.getElementById("column2_1").style.display = "block";
                document.getElementById("corte").innerHTML = localStorage.getItem("fchCorte_cliente");
                document.getElementById("cantidad_cliente").innerHTML = localStorage.getItem("cantidad_cliente");
                $("#carta").css("background-color", "#f44336");
                document.getElementById("carita").src ="img/triste.gif"
                $("#colum_1").css("color","#FFF")
                $("#column2_0").css("color","#FFF")
                $("#column2_1").css("color","#FFF")
                $("#fuera_fecha").css("color","#FFF")
                
            }
        }
        if(localStorage.getItem("dias_transcurridos")>0){
            document.getElementById("fuera_fecha").style.display = "block";
            document.getElementById("dias_sin_pagar").innerHTML = localStorage.getItem("dias_transcurridos");
        }else{
            document.getElementById("fuera_fecha").style.display = "none";
        }
        
        if(estado == 1){
            $.mobile.changePage("#usuarios", {
                transition: "",
                reverse: true,
                changeHash: true
            });
            verPagos(localStorage.getItem("codigo_cliente"));
        } else{
             swal({   title: "",   text:"Porfavor Cambie su Contraseña por Seguridad",   timer: 2000,   showConfirmButton: false });
            $.mobile.changePage("#cambioContra", {
                transition: "",
                reverse: true,
                changeHash: true
            });
        }
        
    }
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
    datospersonales.length = 0;
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
    if(parseFloat(datospersonales[9])>0){
        localStorage.setItem("notascredito", "S./ - " + datospersonales[9]);
    }else{
        localStorage.setItem("notascredito", "S./ " + datospersonales[9]);
    }
    var deudacapital = parseFloat(datospersonales[7]) + parseFloat(datospersonales[8]) - parseFloat(datospersonales[9]);
    deudacapital = Math.round(deudacapital * 100) / 100;
    localStorage.setItem("deudacapital", "S./" + deudacapital);
    localStorage.setItem("cuotasemitir", "S./" + datospersonales[10]);
    var tgastoscobranza = parseFloat(datospersonales[11]) + parseFloat(datospersonales[12]);
    tgastoscobranza = Math.round(tgastoscobranza * 100) / 100;
    tgastoscobranza = tgastoscobranza +  parseFloat(datospersonales[13]) + parseFloat(datospersonales[14]);
    localStorage.setItem("tgastoscobranza", "S./" + Math.round(tgastoscobranza*100)/100);
    //localStorage.setItem("interese", "S./" + parseFloat(datospersonales[13]));
    //localStorage.setItem("totalinterese", "S./" + parseFloat(datospersonales[14]));
    var deudatotal = deudacapital + parseFloat(datospersonales[10]) + tgastoscobranza;
    localStorage.setItem("numreclamos",parseInt(datospersonales[15]));
    localStorage.setItem("numreclamos_cerrados",parseInt(datospersonales[16]));
    localStorage.setItem("estado_agua",datospersonales[17]);
    localStorage.setItem("estado_desague",datospersonales[18]);
    deudatotal = Math.round(deudatotal*100)/100;;
    localStorage.setItem("deudatotal", "S./" +deudatotal );
    document.getElementById("suministro").innerHTML = localStorage.getItem("codigo_cliente");
    document.getElementById("usuario").innerHTML = localStorage.getItem("nombre_cliente");
    document.getElementById("localidad").innerHTML = localStorage.getItem("localidad");
    document.getElementById("direccion").innerHTML = localStorage.getItem("direccion");
    document.getElementById("conexion").innerHTML = "AGUA: "+localStorage.getItem("estado_agua") + " | DESAGUE: "+localStorage.getItem("estado_agua");
    document.getElementById("tarifa").innerHTML = localStorage.getItem("tarifa");
    if(localStorage.getItem("medidor") != " "){
        document.getElementById("medidor").innerHTML = localStorage.getItem("medidor");
    }else{
        document.getElementById("medidor").innerHTML = "NO CUENTA CON MEDIDOR"
    }
    document.getElementById("recibospendientes").innerHTML = localStorage.getItem("recibospendientes");
    document.getElementById("notasdebito").innerHTML = localStorage.getItem("notasdebito");
    document.getElementById("notascredito").innerHTML = localStorage.getItem("notascredito");
    document.getElementById("deudacapital").innerHTML = localStorage.getItem("deudacapital");
    document.getElementById("cuotasemitir").innerHTML = localStorage.getItem("cuotasemitir");
    document.getElementById("tgastoscobranza").innerHTML = localStorage.getItem("tgastoscobranza");
    document.getElementById("numreclamos").innerHTML = "Total: " + localStorage.getItem("numreclamos")+" | Cerrados: "+localStorage.getItem("numreclamos_cerrados") + " | Abiertos: "+ (localStorage.getItem("numreclamos") - localStorage.getItem("numreclamos_cerrados"));
    //document.getElementById("interese").innerHTML = localStorage.getItem("interese");
    //document.getElementById("interese").innerHTML = localStorage.getItem("interese");
    //document.getElementById("totalinterese").innerHTML = localStorage.getItem("totalinterese");
    document.getElementById("deudatotal").innerHTML = localStorage.getItem("deudatotal");
    document.getElementById("fpago").innerHTML = localStorage.getItem("fecha") + " - " + localStorage.getItem("hora");
    if(localStorage.getItem("dias_transcurridos")>0 && localStorage.getItem('deuda_cliente') > 0){
        document.getElementById("d_p").style.display = "block";
        document.getElementById("dias_pago").innerHTML = localStorage.getItem("dias_transcurridos");
    }else{
        document.getElementById("d_p").style.display = "none";
    }
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
    rnombre = trim(rnombre);
    rcorreo = trim(rcorreo);
    rsuministro = trim(rsuministro);
    rcelular = trim(rcelular);
    rdni = trim(rdni);
    
    if(rnombre == "" || rnombre == null || rcorreo=="" || rcorreo==null || rsuministro == "" || rsuministro == null || rcelular == "" || rcelular==null || rdni =="" || rdni==null){
        swal("Error", "Rellene Todos los campos", "error")
    }else{
        if(rsuministro.length >= 7 && rsuministro.length<=11){
            if(rcorreo.indexOf("@") == -1){
                swal("Error", "Correo No Valido", "error")
            }else{
                if(rdni.length == 8){
                    if(rcelular.length == 9){
                        registrarBD(rnombre, rcorreo, rsuministro, rcelular, rdni);
                    }else{
                        swal("Error", "Número de Celular no Valido", "error")
                    }
                }else{
                     swal("Error", "Número de DNI incorrecto", "error")
                }
            }
        }else{
            swal("Error", "Suministro Incorrecto", "error")
        }
        
    }
    
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
             swal({ title:"Error", text: data,   timer: 3000,   showConfirmButton: false });
         $.mobile.changePage("#login", {
            transition: "",
            reverse: true,
            changeHash: true
        });
    }else{
         swal({ title:"Usuario Registrado", text: "Porfavor Revise su correo en unos minutos le llegara el mensaje de confirmación con su contraseña",   timer: 3000,   showConfirmButton: false });
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
    $("p").remove(".dias_trans");
    $("p").remove(".nota_credito");
    var div = document.getElementById('recibos-pen');
    if (data == "") {
        swal("No cuenta con recibos pendientes");
    } else {
        var cad1 = "";
        var cad2 = "";
        var cad3 = "";
        var cad4 = "";
        var cad5 = "";
        var cad6 = "";
        var k1 = 0;
        var k2 = 0;
        var k3 = 0;
        var k4 = 0;
        var k5 = 0;
        var k6 = 0;
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
            } else if (data.charAt(i) != '$' && p == 4){
                cad5 = cad5 + data.charAt(i);
            }else if (data.charAt(i) != '$' && p == 5){
                cad6 = cad6 + data.charAt(i);
            }else if (data.charAt(i) == '$' && p == 0) {
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
                p = 4;
                
            }else if(data.charAt(i) == '$' && p == 4){
                dias_recibos[k5] = parseInt(cad5);
                k5++;
                cad5 ="";
                i++;
                p=5;
            }
            else if(data.charAt(i) == '$' && p == 5){
                nc[k6] = parseFloat(cad6);
                k6++;
                cad6 ="";
                i++;
                p=0;
                z++;
            }
        }
        for (var j = 0; j < z; j++) {
            /****************** Docuemnto nro -- *************/
            var p3 = document.createElement("p");
            p3.setAttribute('class', 'numero-docum');
            var f123 = subcadena1(femiRecibos[j]);
            p3.innerHTML = "DOCUMENTO N° " + (j + 1) + " - Período: "+f123;
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
            i4.innerHTML = "S./ " + totalRecibos[j];
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
            /************* Dias Transcurridos *******************/
            if(dias_recibos[j]>0){
                var p8 = document.createElement("p");
                p8.setAttribute('class',"dias_trans")
                var i9 = document.createElement("i");
                i9.setAttribute("class","dias_trans1")
                i9.innerHTML = "Días transcurridos sin pagar";
                var i10 = document.createElement("i");
                i10.setAttribute("class", "dias_trans2");
                i10.innerHTML = dias_recibos[j] + " dias";
                p8.appendChild(i9);
                p8.appendChild(i10);
                div.appendChild(p8);
            }
            if(nc[j]>0){
                var p9 = document.createElement("p");
                p9.setAttribute('class',"nota_credito")
                var i11 = document.createElement("i");
                i11.setAttribute("class","nota_credito1")
                i11.innerHTML = "Nota Crédito Asociada";
                var i12 = document.createElement("i");
                i12.setAttribute("class", "nota_credito2");
                i12.innerHTML = "S./ - " + nc[j];
                p9.appendChild(i11);
                p9.appendChild(i12);
                div.appendChild(p9);
            }
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
function subcadena1(a){
    var r = a.substr(3,2);
    var r1 = a.substr(6,4);
    var r2 = cambiarMes2(r);
    return r2+" - "+r1;
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
    localStorage.removeItem("codigo_cliente");
    localStorage.removeItem("localidad");
    localStorage.removeItem("direccion");
    localStorage.removeItem("conexion");
    localStorage.removeItem("tarifa");
    localStorage.removeItem("medidor");
    localStorage.removeItem("recibospendientes");
    localStorage.removeItem("notasdebito");
    localStorage.removeItem("notascredito");
    localStorage.removeItem("deudacapital");
    localStorage.removeItem("cuotasemitir");
    localStorage.removeItem("tgastoscobranza");
    localStorage.removeItem("deudatotal")
    localStorage.removeItem("fecha");
    localStorage.removeItem("hora");
    localStorage.removeItem('deuda_cliente');
    localStorage.removeItem("dias_transcurridos");
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
function regresar_de_reclamos(){
    if(localStorage.getItem("variable") == 1){
        location.href = "#consultas";
    }else if(localStorage.getItem("variable") == 2){
        location.href = "#estadoCuenta";
    }
}
function reclamos(a) {
 localStorage.setItem("variable",a);
    $.ajax({
        type: "POST",
        url: conexion + "reclamo_detalle.php",
        data: "codigo=" + localStorage.getItem("codigo_cliente"),
        cache: false,
        dataType: "text",
        success: onSuccess789
    });/*
    $.ajax({
        type: "POST",
        url: conexion + "reclamos.php",
        data: "codigo=" + localStorage.getItem("codigo_cliente"),
        cache: false,
        dataType: "text",
        success: onSuccess6
    });*/
}
function onSuccess789(data){
    var cad1 = "",cad2 = "",cad3 = "",cad4="",cad5="",cad6="";
    var p=0,k=0,k1=0,k2=0,k3=0,k4=0,k5=0;
    for(var i = 0;i<data.length;i++){
        if(data.charAt(i) != "$" && p == 0){
            cad1 = cad1 + data.charAt(i);
        }else if(data.charAt(i) != "$" && p==1){
            cad2 = cad2 + data.charAt(i);
        }else if(data.charAt(i) != "$" && p==2){
            cad3 = cad3 + data.charAt(i);
        }else if(data.charAt(i) != "$" && p==3){
            cad4 = cad4 + data.charAt(i);
        }else if(data.charAt(i) != "$" && p==4){
            cad5 = cad5 + data.charAt(i);
        }else if(data.charAt(i) != "$" && p==5){
            cad6 = cad6 + data.charAt(i);
        }else if(data.charAt(i)=="$" && p==0){
            num_reclamos[k]=cad1;
            cad1="";
            i++;p=1;k++;
        }else if(data.charAt(i)=="$" && p==1){
            total_estancado[k1]=parseFloat(cad2);
            cad2="";
            i++;p=2;k1++;
        }else if(data.charAt(i)=="$" && p==2){
            nd_creada[k2]=parseFloat(cad3);
            cad3="";
            i++;p=3;k2++;
        }else if(data.charAt(i)=="$" && p==3){
            nc_creada[k3]=parseFloat(cad4);
            cad4="";
            i++;p=4;k3++;
        }else if(data.charAt(i)=="$" && p==4){
            neto_obtenido[k4]=parseFloat(cad5);
            cad5="";
            i++;p=5;k4++;
        }else if(data.charAt(i)=="$" && p==5){
            num_recibos_reclamos[k5]=parseInt(cad6);
            cad6="";
            i++;p=0;k5++;
        }
    }
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
    $("hr").remove(".bajo_reclamo");
    $("p").remove(".numero_reclamo");
    $("p").remove(".descripcion_reclamo");
    $("p").remove(".fecha_registro");
    $("p").remove(".fecha_final");
    $("p").remove(".tipo_problema");
    $("p").remove(".estado_reclamo");
    $("p").remove(".instancia_reclamo");
    $("p").remove(".periodo_reclamo");
    $("p").remove(".dias_reclamo");
    $("p").remove(".monto_reclamo");
    $("p").remove(".nd_reclamo");
    $("p").remove(".nc_reclamo");
    $("p").remove(".monto_reclamo_pago");
    $("p").remove(".cant_reclamo");
    var div = document.getElementById('reclamos_obtenidos');
    if(data == ""){
        swal("No cuenta con reclamos Regitrados");
    }else{
        var cad1 = "",cad2 = "", cad3 = "",cad4 = "",cad5 = "",cad6 = "",cad7="",cad8="",cad9="";
        var k1 = 0, k2 = 0, k3 = 0, k4 = 0, k5 = 0, k6 = 0,k7=0,k8=0,k9=0, p = 0, z = 0;
        for(var i= 0;i<data.length;i++){
            if(data.charAt(i) != '$' && p ==0){cad1 = cad1 + data.charAt(i);}
            else if(data.charAt(i) != '$' && p ==1){cad2 = cad2 + data.charAt(i);}
            else if(data.charAt(i) != '$' && p ==2){cad3 = cad3 + data.charAt(i);}
            else if(data.charAt(i) != '$' && p ==3){cad4 = cad4 + data.charAt(i);}
            else if(data.charAt(i) != '$' && p ==4){cad5 = cad5 + data.charAt(i);}
            else if(data.charAt(i) != '$' && p ==5){cad6 = cad6 + data.charAt(i);}
            else if(data.charAt(i) != '$' && p ==6){cad7 = cad7 + data.charAt(i);}
            else if(data.charAt(i) != '$' && p ==7){cad8 = cad8 + data.charAt(i);}
            else if(data.charAt(i) != '$' && p ==8){cad9 = cad9 + data.charAt(i);}
            else if(data.charAt(i) == '$' && p ==0){r1[k1] = cad1;k1++;cad1="";i++;p=1}
            else if(data.charAt(i) == '$' && p ==1){r2[k2] = cad2;k2++;cad2="";i++;p=2}
            else if(data.charAt(i) == '$' && p ==2){r3[k3] = cad3;k3++;cad3="";i++;p=3}
            else if(data.charAt(i) == '$' && p ==3){r4[k4] = cad4;k4++;cad4="";i++;p=4}
            else if(data.charAt(i) == '$' && p ==4){r5[k5] = cad5;k5++;cad5="";i++;p=5}
            else if(data.charAt(i) == '$' && p ==5){r6[k6] = cad6;k6++;cad6="";i++;p=6}
            else if(data.charAt(i) == '$' && p ==6){r7[k7] = cad7;k7++;cad7="";i++;p=7}
            else if(data.charAt(i) == '$' && p ==7){r8[k8] = cad8;k8++;cad8="";i++;p=8}
            else if(data.charAt(i) == '$' && p ==8){r9[k9] = cad9;k9++;cad9="";i++;p=0;z++}
        }
        document.getElementById("numreclamos1").innerHTML = z;
        for(var j =0 ;j<z;j++){
            /****************** Número de Reclamo *************/
            var p3 = document.createElement("p");
            p3.setAttribute('class', 'numero_reclamo');
            p3.innerHTML = "N° RECLAMO - " + r1[j] ;
            var hr1 = document.createElement("hr");
            hr1.setAttribute('class', 'bajo_reclamo');
            div.appendChild(p3);
            div.appendChild(hr1);
            /****************** Descripción de Reclamo ***************/
            var p4 = document.createElement("p");
            p4.setAttribute('class', 'descripcion_reclamo');
            var i1 = document.createElement("i");
            i1.setAttribute('class', 'descripcion_reclamo1')
            i1.innerHTML = "Descripción";
            var i2 = document.createElement("i");
            i2.setAttribute('class', 'descripcion_reclamo2')
            i2.innerHTML = r2[j];
            p4.appendChild(i1);
            p4.appendChild(i2);
            div.appendChild(p4);
            /*************** Fecha Registro **********************/
            var p5 = document.createElement("p");
            p5.setAttribute('class', 'fecha_registro');
            var i3 = document.createElement("i");
            i3.setAttribute('class', 'fecha_registro1');
            i3.innerHTML = "Fecha Registro";
            var i4 = document.createElement("i");
            i4.setAttribute("class", "fecha_registro2");
            i4.innerHTML = r3[j];
            p5.appendChild(i3);
            p5.appendChild(i4);
            div.appendChild(p5);
            /************* Fecha final ***********************/
            if(r4[j]!="01/01/0001"){
                 var p6 = document.createElement("p");
                p6.setAttribute('class', 'fecha_final');
                var i5 = document.createElement("i");
                i5.setAttribute('class', 'fecha_final1');
                i5.innerHTML = "Fecha Final";
                var i6 = document.createElement("i");
                i6.setAttribute("class", "fecha_final2");
                i6.innerHTML = r4[j];
                p6.appendChild(i5);
                p6.appendChild(i6);
                div.appendChild(p6);
            }
           
            /************* Fecha Vencimiento ***********************/
            var p7 = document.createElement("p");
            p7.setAttribute('class', 'tipo_problema');
            var i7 = document.createElement("i");
            i7.setAttribute('class', 'tipo_problema1');
            i7.innerHTML = "Tipo Problema";
            var i8 = document.createElement("i");
            i8.setAttribute("class", "tipo_problema2");
            i8.innerHTML = r5[j];
            p7.appendChild(i7);
            p7.appendChild(i8);
            div.appendChild(p7);
            /************** Estado Reclamo ***********************/
            var p8 = document.createElement("p");
            p8.setAttribute('class',"estado_reclamo")
            var i9 = document.createElement("i");
            i9.setAttribute("class","estado_reclamo1")
            i9.innerHTML = "Estado Reclamo";
            var i10 = document.createElement("i");
            i10.setAttribute("class", "estado_reclamo2");
            i10.setAttribute("id", "estado_reclamo2"+j);
            i10.innerHTML = r6[j];
            p8.appendChild(i9);
            p8.appendChild(i10);
            div.appendChild(p8);
            if(r6[j] == "CERRADO"){
                 $("#estado_reclamo2"+j).css("color","#FF0000")
            }else{
                $("#estado_reclamo2"+j).css("color","#4caf50")
            }
            /************** Instancia Reclamo ***********************/
            var p9 = document.createElement("p");
            p9.setAttribute('class',"instancia_reclamo")
            var i11 = document.createElement("i");
            i11.setAttribute("class","instancia_reclamo1")
            i11.innerHTML = "Instancia Reclamo";
            var i12 = document.createElement("i");
            i12.setAttribute("class", "instancia_reclamo2");
            i12.innerHTML = r7[j];
            p9.appendChild(i11);
            p9.appendChild(i12);
            div.appendChild(p9);
            /************** Periodo Reclamo ***********************/
            var p10 = document.createElement("p");
            p10.setAttribute('class',"periodo_reclamo")
            var i13 = document.createElement("i");
            i13.setAttribute("class","periodo_reclamo1")
            i13.innerHTML = "Periodo Reclamo";
            var i14 = document.createElement("i");
            i14.setAttribute("class", "periodo_reclamo2");
            var rq34r = obtener_periodo(r8[j]);
            i14.innerHTML = rq34r;
            p10.appendChild(i13);
            p10.appendChild(i14);
            div.appendChild(p10);
            /************** Días Reclamo ***********************/
            var p10 = document.createElement("p");
            p10.setAttribute('class',"dias_reclamo")
            var i13 = document.createElement("i");
            i13.setAttribute("class","dias_reclamo1")
            i13.innerHTML = "Dias de Reclamo";
            var i14 = document.createElement("i");
            i14.setAttribute("class", "dias_reclamo2");
            i14.innerHTML = r9[j];
            p10.appendChild(i13);
            p10.appendChild(i14);
            div.appendChild(p10);
            /************** Monto Estancado de Reclamo ***********************/
            var tra = obtener_reclamo(r1[j]);
            var p11 = document.createElement("p");
            p11.setAttribute('class',"monto_reclamo")
            var i15 = document.createElement("i");
            i15.setAttribute("class","monto_reclamo1")
            i15.innerHTML = "Monto Estancado";
            var i16 = document.createElement("i");
            i16.setAttribute("class", "monto_reclamo2");
            i16.innerHTML = "S./ "+total_estancado[tra];
            p11.appendChild(i15);
            p11.appendChild(i16);
            div.appendChild(p11);
            /************** Nota de Débito de Reclamo ***********************/
            if(nd_creada[tra] > 0){
                var p12 = document.createElement("p");
                p12.setAttribute('class',"nd_reclamo")
                var i17 = document.createElement("i");
                i17.setAttribute("class","nd_reclamo1")
                i17.innerHTML = "Nota de Débito Asociada";
                var i18 = document.createElement("i");
                i18.setAttribute("class", "nd_reclamo2");
                i18.innerHTML = "S./ "+nd_creada[tra];
                p12.appendChild(i17);
                p12.appendChild(i18);
                div.appendChild(p12);
            }
            /************** Nota de Credito de Reclamo ***********************/
            if(nc_creada[tra] > 0){
                var p13 = document.createElement("p");
                p13.setAttribute('class',"nc_reclamo")
                var i19 = document.createElement("i");
                i19.setAttribute("class","nc_reclamo1")
                i19.innerHTML = "Nota de Crédito Asociada";
                var i20 = document.createElement("i");
                i20.setAttribute("class", "nc_reclamo2");
                if(neto_obtenido[tra]<0){
                    i20.innerHTML = "- S./ "+total_estancado[tra];
                }else{
                    i20.innerHTML = "- S./ "+nc_creada[tra];
                }
                p13.appendChild(i19);
                p13.appendChild(i20);
                div.appendChild(p13);
            }
            /************** Monto Pagado ***********************/
            if(r6[j] == "CERRADO"){
                var p14 = document.createElement("p");
                p14.setAttribute('class',"monto_reclamo_pago")
                var i21 = document.createElement("i");
                i21.setAttribute("class","monto_reclamo_pago1")
                i21.innerHTML = "Monto Obtenido";
                var i22 = document.createElement("i");
                i22.setAttribute("class", "monto_reclamo_pago2");
                if(neto_obtenido[tra]<0){
                    i22.innerHTML = "S./ 0.00";
                }else{
                    i22.innerHTML = "S./ "+neto_obtenido[tra];
                }
                p14.appendChild(i21);
                p14.appendChild(i22);
                div.appendChild(p14);
            }
            var p15 = document.createElement("p");
                p15.setAttribute('class',"cant_reclamo")
                var i23 = document.createElement("i");
                i23.setAttribute("class","cant_reclamo1")
                i23.innerHTML = "N° Recibos Asociados";
                var i24 = document.createElement("i");
                i24.setAttribute("class", "cant_reclamo2");
                i24.innerHTML = num_recibos_reclamos[tra];
                p15.appendChild(i23);
                p15.appendChild(i24);
                div.appendChild(p15);
            
        }
        document.getElementById("rcliente").innerHTML = localStorage.getItem("nombre_cliente");
        document.getElementById("rdireccion").innerHTML = localStorage.getItem("direccion_cliente");
        
        document.getElementById("fecha_actual4").innerHTML = localStorage.getItem("fecha_actualizacion") + "-" + localStorage.getItem("hora_actualizacion");
    location.href = "#reclamos";
    }     
}
function obtener_reclamo(a){
    var p = 0;
    for(var i=0;i<num_reclamos.length;i++){
        if(num_reclamos[i] == a){
            p = i;
        }
    }
    return p;
}
function obtener_periodo(a){
    var a1 = a.substr(0,4);
    var a2 = a.substr(4,2);
    var a3 = cambiarMes2(a2);
    return a3+" - "+a1;
}
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
                    var aaa = restarFechas(cad1,cad2);
                    //alert(aaa);
                    //cambiarColor(cad1, cad2, sum);
                    if(aaa<0){
                        $("#fila"+sum).css("background","#FFFFBF")
                    }else{
                        $("#fila"+sum).css("background","rgba(236, 245, 255, .9)")
                    }
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
function restarFechas(f1,f2) {
 var aFecha1 = f1.split('/'); 
 var aFecha2 = f2.split('/'); 
 var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]); 
 var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]); 
 var dif = fFecha2 - fFecha1;
 var dias = Math.floor(dif / (1000 * 60 * 60 * 24)); 
 return dias;
 }
function noticias(a) {
    $.ajax({
        type: "POST",
        url: "http://pekin.sedalib.com.pe:90/SIC/noticias.php",
        data: "",
        cache: false,
        dataType: "text",
        success: onSuccess611
    });
    localStorage.setItem("noticias",a);
    //$.mobile.changePage( "#noticias", {transition: "",reverse: true,changeHash: true});
}
var titulo_noticia = new Array();
var subtitulo_noticia = new Array();
var cuerpo_noticia = new Array();
var fecha_noticia = new Array();
var imagen_noticia = new Array();
var pdf_noticia = new Array();
function onSuccess611(data){
    var cad1="",cad2="",cad3="",cad4="",cad5="",cad6="";
    var k=0,p=0,k1=0,k2=0,k3=0,k4=0,k5=0;
    for(var i=0;i<data.length;i++){
        if(data.charAt(i)!='$' && p==0){
            cad1 = cad1 + data.charAt(i);
        }else if(data.charAt(i)!='$' && p==1){cad2 = cad2 + data.charAt(i);}
        else if(data.charAt(i)!='$' && p==2){cad3 = cad3 + data.charAt(i);}
        else if(data.charAt(i)!='$' && p==3){cad4 = cad4 + data.charAt(i);}
        else if(data.charAt(i)!='$' && p==4){cad5 = cad5 + data.charAt(i);}
        else if(data.charAt(i)!='$' && p==5){cad6 = cad6 + data.charAt(i);}
        else if(data.charAt(i)=='$' && p==0){titulo_noticia[k]=cad1;cad1="";i++;k++;p=1;}
        else if(data.charAt(i)=='$' && p==1){subtitulo_noticia[k1]=cad2;cad2="";i++;k1++;p=2;}
        else if(data.charAt(i)=='$' && p==2){cuerpo_noticia[k2]=cad3;cad3="";i++;k2++;p=3;}
        else if(data.charAt(i)=='$' && p==3){fecha_noticia[k3]=cad4;cad4="";i++;k3++;p=4}
        else if(data.charAt(i)=='$' && p==4){imagen_noticia[k4]=cad5;cad5="";i++;k4++;p=5;}
        else if(data.charAt(i)=='$' && p==5){pdf_noticia[k5]=cad6;cad6="";i++;k5++;p=0;}
    }
    var div = document.getElementById("noticas_generales");
    for(var i=0;i<titulo_noticia.length;i++){
        var tr = document.createElement('tr');
        tr.setAttribute("style","background:#eae7ec")
        var td = document.createElement('td');
        td.setAttribute("width","30%")
        var td1 = document.createElement('td');
        td1.setAttribute("width","70%")
        var table = document.createElement("table");
        table.setAttribute("width","100%")
        var tr1 = document.createElement("tr");
        var tr2 = document.createElement("tr");
        var tr3 = document.createElement("tr");
        var td2 = document.createElement("td")
        td2.setAttribute("style","font-family: 'Yanone Kaffeesatz'")
        var td3 = document.createElement("td")
        td3.setAttribute("style","font-family: 'Yanone Kaffeesatz';color:#296fb7;text-shadow:none")
        var td4 = document.createElement("td")
        var btn = document.createElement("a")
        td4.appendChild(btn);
        td4.setAttribute("style","padding:15px;text-align: right;")
        btn.setAttribute("id",i);
        btn.setAttribute("onclick","verNoticia("+i+")");
        btn.setAttribute("style","width:200px;height:50px;background:#6EA976;color:#FFF;text-shadow:none;font-family: 'Yanone Kaffeesatz';    padding: 5px 10px;");
        btn.innerHTML = "Leer Más";
        td3.innerHTML = titulo_noticia[i];
        td2.innerHTML = "Publicado : "+ fecha_noticia[i];
        tr1.appendChild(td2);
        tr2.appendChild(td3);
        tr3.appendChild(td4);
        table.appendChild(tr1);
        table.appendChild(tr2);
        table.appendChild(tr3);
        td1.appendChild(table);
        var img = document.createElement('img');
        img.setAttribute("src",imagen_noticia[i]);
        img.setAttribute("width","100%");
        td.appendChild(img);
        tr.appendChild(td);
        tr.appendChild(td1);
        div.appendChild(tr);
    }
    $.mobile.changePage("#noticias", {
        transition: "",
        reverse: true,
        changeHash: true
    });
}
function verNoticia(id) {
    $.mobile.changePage("#noticia_especifica", {
        transition: "",
        reverse: true,
        changeHash: true
    });
    document.getElementById("titu_not").innerHTML = titulo_noticia[id];
    document.getElementById("img_not").src = imagen_noticia[id];
    document.getElementById("subti_not").innerHTML = subtitulo_noticia[id];
    document.getElementById("cont_not").innerHTML = cuerpo_noticia[id];
    if(pdf_noticia[id] == ""){
        document.getElementById("sub_cont_not").style.display = "none";
    }else{
        document.getElementById("sub_cont_not").style.display = "block";
        //document.getElementById("sub_cont_not").setAttribute("href",pdf_noticia[id]);
        document.getElementById("sub_cont_not").setAttribute("onclick","descargar("+id+")");
        
    }
    

}

function descargar(id){
    alert(id);
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(pdf_noticia[id]);
    var fileURL = '/sdcard/Download/20160520-3337976320.pdf';

    fileTransfer.download(
        uri,
        fileURL,
        function(entry) {
            console.log("download complete: " + entry.fullPath);
            alert(entry.fullPath);
        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("upload error code" + error.code);
            alert("codigo = "+error.code+"\n error target"+error.target+"\n error source: "+error.source);
        },
        false,
        {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
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
        location.href = "#noclientes";
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
function cambiarPass(){
   //$("#txt-email1").val(localStorage.getItem('email'));
   var pass1 = $("#txt-pass1").val();
   var pass2 = $("#txt-pass2").val();
   var pass3 = $("#txt-pass3").val();
    if(pass1 ==  localStorage.getItem('password')){
        if(pass2.length >= 8){
                if(pass2 ==  pass3){
                $.ajax({
                type: "POST",
                url: conexion + "cambiarPass.php",
                data: "pass=" +pass2+"&codigo="+localStorage.getItem("codigo_cliente")+ "&key=opaioncjwfg54aj",
                cache: false,
                dataType: "text",
                success: onSuccess34
                });
                }else{
                    swal("Error", "La  nueva contraseña deben coincidir", "error")
            }
        }else{
            swal("Error", "La contraseña nueva debe tener al menos 8 caracteres", "error")
        }
        
    } else{
        swal("Error", "Las contraseña Antigua es incorrecta", "error")
    }
    
    
}
function onSuccess34(data){
    if(data == "Actualización Correcta"){
        $.mobile.changePage("#usuarios", {
            transition: "",
            reverse: true,
            changeHash: true
        });
        swal({   title: "",   text:data,   timer: 2000,   showConfirmButton: false });
    }
}
function trim (myString){
return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}