var app = {
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;

        function disp(pos) {
            longitud = pos.coords.longitude;
            latitud = pos.coords.latitude;
            //$('.lat-view').html(pos.coords.latitude);
            //$('.long-view').html(pos.coords.longitude);
        }

        $('#btn-foto').click(function () {
            navigator.geolocation.getCurrentPosition(disp);
        });

    }
};

window.onload = function () {
    document.getElementById("foto").style.width = (window.innerWidth - 50) + "px";
    document.getElementById("foto").style.height = (window.innerWidth - 50) + "px";
    document.getElementById("foto").style.backgroundImage = "url('img/cordova2.png')";
    document.getElementById("foto").style.backgroundSize = "50% 50%";
};

function capturePhoto() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 90,
        destinationType: Camera.DestinationType.DATA_URL,
        correctOrientation: true,
        targetWidth: 1000,
        targetHeight: 1000
    });
}

function getPhoto(source) {
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 90,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

function onSuccess(imageData) {

    document.getElementById("foto").style.backgroundImage = "url('data:image/jpeg;base64," + imageData + "')";
    document.getElementById("foto").style.backgroundSize = "100% 100%";
    URIimg = "data:image/jpeg;base64,'" + imageData + "'";
    //onPhotoURISuccess("data:image/jpeg;base64,'"+imageData+"'");    
}

function onPhotoURISuccess(imageURI) {
    document.getElementById("foto").style.backgroundImage = "url('" + imageURI + "')";
    document.getElementById("foto").style.backgroundSize = "100% 100%";
    URIimg = String(imageURI);
}

function enviarFoto(URIimg) {
    enviarPosicion();
    var nombreArchivo = prompt("Ingrese una descripción a la imagen", "");
    while (nombreArchivo == "") {
        var nombreArchivo = prompt("Ingrese una descripción a la imagen", "");
    }

    var opciones = new FileUploadOptions();
    opciones.fileKey = "file";
    //opciones.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    opciones.fileName = nombreArchivo;
    opciones.mimeType = "image/jpeg";

    var parametros = new Object();
    parametros.value1 = "test";
    parametros.value2 = "param";

    opciones.parametros = parametros;
    opciones.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(URIimg, "http://pekin.sedalib.com.pe:90/SIC/upload.php", win, fail, opciones);

    //alert("longitud = " + longitud + "\nlatitud = "+latitud);
}

function enviarPosicion() {
    $.ajax({
        type: "POST",
        url: conexion + "upload.php",
        data: "longitud=" + longitud + "&latitud=" + latitud,
        cache: false,
        dataType: "text",
        success: onSuccess7
    });
}

function onSuccess7(data) {
    swal({ title:data, timer: 3000,   showConfirmButton: false });
    regresar();

}

function win(r) {
    console.log("code = " + r.responseCode);
    console.log("response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    alert(r.response);
}

function fail(error) {
    //alert("A ocurrido un error : code = " + error.code);
    swal("","Error al envio de Foto");
}

function onFail(message) {
    //alert('Error por: ' + message);
    swal("","Error encontrado en la camara");
}


function regresar() {
    if (localStorage.getItem("camara") == 1) {
        location.href = "index.html#inicio";
    } else if (localStorage.getItem("camara") == 2 || localStorage.getItem("camara") == 3) {
        location.href = "index.html#usuarios";
    }
}
