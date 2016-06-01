//variables para obtener el alto y ancho de la pnatalla
var map;
var alto = $(window).height();
var alto = alto - 250;
var altoCadena = String(alto) + "px";
// Variables para obtner la latitud y la longitud de la persona
var latitud;
var longitud;
var postionLatitud = new Array();
var postionLongitud = new Array();
postionLatitud[0] = -8.1057525; // Agencia Central
postionLatitud[1] = -8.0860326; //Agencia Porvenir
postionLatitud[2] = -8.1418496; //Agencia Huaman
postionLatitud[3] = -8.0820154; //Agencia Huanchaco
postionLatitud[4] = -8.0738318; //Agencia Esperanza
postionLatitud[5] = -7.791305; //Agencia Chocope
postionLatitud[6] = -7.2266265; //Agencia Chepen
postionLatitud[7] = -8.1700515; //Agencia Moche
postionLatitud[8] = -7.702425; //Agencia Puerto Malabrigo
postionLatitud[9] = -8.223873; //Agencia Salaverry
postionLongitud[0] = -79.0000976; //Agencia Central 
postionLongitud[1] = -79.00031; //Agencia Porvenir  
postionLongitud[2] = -79.0478091; //Agencia Huaman
postionLongitud[3] = -79.1220051; //Agencia Huanchaco
postionLongitud[4] = -79.0482735; //Agencia Esperanza
postionLongitud[5] = -79.2218158; //Agencia Chocope
postionLongitud[6] = -79.4323404; //Agencia Chepen
postionLongitud[7] = -79.00881; //Agencia Moche
postionLongitud[8] = -79.4364685; //Agencia Puerto Malabrigo
postionLongitud[9] = -78.9762672; //Agencia Salaverry
var ruta = new Array();
// función para cargar el mapa
$(document).ready(function () {
    document.getElementById("map").style.display = "block";
    document.getElementById("map").style.height = altoCadena;
    map = new GMaps({
        div: '#map',
        lat: 12.1194713,
        lng: -90.0924,
        zoom: 11,
        zoomControl: true,
        zoomControlOpt: {
            style: 'SMALL',
            position: 'TOP_RIGHT'
        },
        panControl: true,
        streetViewControl: true,
        mapTypeControl: false
    });

    // lugares de Atención - Sede central
    map.addMarker({
        lat: -8.1057525,
        lng: -79.0000976,
        animation: google.maps.Animation.DROP,
        icon: "../img/marker.png",
        title: 'SEDE CENTRAL',
        click: function (e) {
            map.cleanRoute();
            $('#instructions').empty();
            map.travelRoute({
                origin: [latitud, longitud],
                destination: [postionLatitud[0], postionLongitud[0]],
                travelMode: 'driving',
                step: function (e) {
                    $('#instructions').append('<li>' + e.instructions + '</li>');
                    ruta.push(e.instructions);
                    $('#instructions li:eq(' + e.step_number + ')').delay(550 * e.step_number).fadeIn(200, function () {
                        map.drawPolyline({
                            path: e.path,
                            strokeColor: '#296fb7',
                            strokeOpacity: 0.6,
                            strokeWeight: 6
                        });
                    });
                }
            });
            document.getElementById("titulo-maps").innerHTML = "SEDE CENTRAL DE SEDALIB S.A.";
            document.getElementById('img-sede').src = "../img/sede-central.png";
            document.getElementById('direccion-sedalib').innerHTML = "Av. Federico Villarreal 1300 Urb. Semi Rústica El Bosque";
            document.getElementById('telefono-sedalib').innerHTML = "044 - 482335";
            document.getElementById('horario1-sedalib').innerHTML = "Lun a Vie 8:00a.m. a 4:00p.m. Horario Corrido";
            document.getElementById('horario2-sedalib').innerHTML = "Lun a Vie 8:00a.m. a 5:00p.m. y Sáb 8:00a.m. a 1:00p.m.";
            document.getElementById('color-sedalib').innerHTML = "Azul";
            document.getElementById('color').style.background = "#296fb7";
            //document.getElementById('btn_llegar').style.background = "#296fb7 !important";
            var distancia = verDistancia(latitud, longitud, postionLatitud[0], postionLongitud[0]);
            document.getElementById('distancia').innerHTML = distancia + "km";
            document.getElementById("info").style.display = "block";
            $('html, body').animate({
                scrollTop: $('#instructions').offset().top
            }, 1000);
            map.setCenter(postionLatitud[0], postionLongitud[0]);
            map.setZoom(15);
        },
        infoWindow: {
            content: '<center><strong style="color:#296fb7;margin-top:40px;font-size:14px">SEDE CENTRAL</strong></center>'
        }
    });

    map.addMarker({
        lat: -8.0860326,
        lng: -79.00031,
        animation: google.maps.Animation.DROP,
        icon: "../img/marker.png",
        title: 'SEDE EL PORVENIR',
        click: function (e) {
            map.cleanRoute();
            $('#instructions').empty();
            map.travelRoute({
                origin: [latitud, longitud],
                destination: [postionLatitud[1], postionLongitud[1]],
                travelMode: 'driving',
                step: function (e) {
                    $('#instructions').append('<li>' + e.instructions + '</li>');
                    $('#instructions li:eq(' + e.step_number + ')').delay(550 * e.step_number).fadeIn(200, function () {
                        map.drawPolyline({
                            path: e.path,
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.6,
                            strokeWeight: 6
                        });
                    });
                }
            });
            document.getElementById("titulo-maps").innerHTML = "SEDE EL PORVENIR DE SEDALIB S.A.";
            document.getElementById('img-sede').src = "../img/sede-porvenir.png";
            document.getElementById('direccion-sedalib').innerHTML = "Av. Micaela Bastidas Nº 1450";
            document.getElementById('telefono-sedalib').innerHTML = "044 - 410425 | 044 - 482336 Anexo: 409 ";
            document.getElementById('horario1-sedalib').innerHTML = "Lun a Vie 8:00a.m. a 5:00p.m.";
            document.getElementById('horario2-sedalib').innerHTML = "Lun a Vie 8:00a.m. a 5:00p.m. y Sáb 8:00a.m. a 1:00p.m. ";
            document.getElementById('color-sedalib').innerHTML = "Rojo";
            document.getElementById('color').style.background = "#FF0000";
            //document.getElementById('btn_llegar').style.background = "#FF0000";
            //document.getElementById('btn_llegar').style.color = "#FFF";
            var distancia = verDistancia(latitud, longitud, postionLatitud[1], postionLongitud[1]);
            document.getElementById('distancia').innerHTML = distancia + "km";
            document.getElementById("info").style.display = "block";
            $('html, body').animate({
                scrollTop: $('#instructions').offset().top
            }, 1000);
            map.setCenter(postionLatitud[1], postionLongitud[1]);
            map.setZoom(15);
        },
        infoWindow: {
            content: '<center><strong style="color:#296fb7;margin-top:40px;font-size:14px">SEDE EL PORVENIR</strong></center>'
        }
    });

    map.addMarker({
        lat: -8.1418496,
        lng: -79.0478091,
        animation: google.maps.Animation.DROP,
        icon: "../img/marker.png",
        title: 'SEDE HUAMÁN',
        click: function (e) {
            map.cleanRoute();
            $('#instructions').empty();
            map.travelRoute({
                origin: [latitud, longitud],
                destination: [postionLatitud[2], postionLongitud[2]],
                travelMode: 'driving',
                step: function (e) {
                    $('#instructions').append('<li>' + e.instructions + '</li>');
                    $('#instructions li:eq(' + e.step_number + ')').delay(550 * e.step_number).fadeIn(200, function () {
                        map.drawPolyline({
                            path: e.path,
                            strokeColor: '#FFFF00',
                            strokeOpacity: 0.6,
                            strokeWeight: 6
                        });
                    });
                }
            });
            document.getElementById("titulo-maps").innerHTML = "SEDE HUAMÁN DE SEDALIB S.A.";
            document.getElementById('img-sede').src = "../img/sede-victorLarco.png";
            document.getElementById('direccion-sedalib').innerHTML = "Esquina Av. Huamán / Manuel Seoane";
            document.getElementById('telefono-sedalib').innerHTML = "044 - 408308 | 044 - 482336 Anexo: 414";
            document.getElementById('horario-of').style.display = "none";
            document.getElementById('horario2-sedalib').innerHTML = "Lun a Vie 8:00a.m. a 5:00p.m. y Sábado 8:00a.m. a 1:00p.m";
            document.getElementById('color-sedalib').innerHTML = "Amarillo";
            document.getElementById('color').style.background = "#FFFF00";
            //document.getElementById('btn_llegar').style.background = "#FFFF00";
            //document.getElementById('btn_llegar').style.color = "#000";
            var distancia = verDistancia(latitud, longitud, postionLatitud[2], postionLongitud[2]);
            document.getElementById('distancia').innerHTML = distancia + "km";
            document.getElementById("info").style.display = "block";
            $('html, body').animate({
                scrollTop: $('#instructions').offset().top
            }, 1000);
            map.setCenter(postionLatitud[2], postionLongitud[2]);
            map.setZoom(15);
        },
        infoWindow: {
            content: '<center><strong style="color:#296fb7;margin-top:40px;font-size:14px">SEDE HUÁMAN</strong></center>'
        }
    });

    map.addMarker({
        lat: -8.0820154,
        lng: -79.1220051,
        animation: google.maps.Animation.DROP,
        icon: "../img/marker.png",
        title: 'SEDE HUANCHACO',
        click: function (e) {
            map.cleanRoute();
            $('#instructions').empty();
            map.travelRoute({
                origin: [latitud, longitud],
                destination: [postionLatitud[3], postionLongitud[3]],
                travelMode: 'driving',
                step: function (e) {
                    $('#instructions').append('<li>' + e.instructions + '</li>');
                    $('#instructions li:eq(' + e.step_number + ')').delay(550 * e.step_number).fadeIn(200, function () {
                        map.drawPolyline({
                            path: e.path,
                            strokeColor: '#00FF00',
                            strokeOpacity: 0.6,
                            strokeWeight: 6
                        });
                    });
                }
            });
            document.getElementById("titulo-maps").innerHTML = "SEDE HUANCHACO DE SEDALIB S.A.";
            document.getElementById('img-sede').src = "../img/sede-huanchaco.png";
            document.getElementById('direccion-sedalib').innerHTML = "Los Pinos Nº 142";
            document.getElementById('telefono-sedalib').innerHTML = "044 - 461202 | 044 - 482336 Anexo: 412";
            document.getElementById('horario-of').style.display = "none";
            document.getElementById('horario2-sedalib').innerHTML = "Lun a Vie 8:00a.m. a 5:00p.m. y Sáb 8:00 a.m. a 1:00p.m.";
            document.getElementById('color-sedalib').innerHTML = "Verde";
            document.getElementById('color').style.background = "#00FF00";
            //document.getElementById('btn_llegar').style.background = "#00FF00";
            //document.getElementById('btn_llegar').style.color = "#000";
            var distancia = verDistancia(latitud, longitud, postionLatitud[3], postionLongitud[3]);
            document.getElementById('distancia').innerHTML = distancia + "km";
            document.getElementById("info").style.display = "block";
            $('html, body').animate({
                scrollTop: $('#instructions').offset().top
            }, 1000);
            map.setCenter(postionLatitud[2], postionLongitud[2]);
            map.setZoom(15);
        },
        infoWindow: {
            content: '<center><strong style="color:#296fb7;margin-top:40px;font-size:14px">SEDE HUANCHACO</strong></center>'
        }
    });

    map.addMarker({
        lat: -8.0738318,
        lng: -79.0482735,
        animation: google.maps.Animation.DROP,
        icon: "../img/marker.png",
        title: 'SEDE LA ESPERANZA',
        click: function (e) {
            map.cleanRoute();
            $('#instructions').empty();
            map.travelRoute({
                origin: [latitud, longitud],
                destination: [postionLatitud[4], postionLongitud[4]],
                travelMode: 'driving',
                step: function (e) {
                    $('#instructions').append('<li>' + e.instructions + '</li>');
                    $('#instructions li:eq(' + e.step_number + ')').delay(550 * e.step_number).fadeIn(200, function () {
                        map.drawPolyline({
                            path: e.path,
                            strokeColor: '#00FFFF',
                            strokeOpacity: 0.6,
                            strokeWeight: 6
                        });
                    });
                }
            });
            document.getElementById("titulo-maps").innerHTML = "SEDE LA ESPERANZA DE SEDALIB S.A.";
            document.getElementById('img-sede').src = "../img/sede-esperanza.png";
            document.getElementById('direccion-sedalib').innerHTML = "Av. Tahuantinsuyo Cuadra 17   ";
            document.getElementById('telefono-sedalib').innerHTML = "044 - 272253 | 044 - 482336 Anexo: 406-407";
            document.getElementById('horario-of').style.display = "none";
            document.getElementById('horario2-sedalib').innerHTML = "Lun a Vie 8:00a.m. a 5:00p.m. Horario Corrido y Sáb 8:00a.m. a 1:00p.m. ";
            document.getElementById('color-sedalib').innerHTML = "Celeste";
            document.getElementById('color').style.background = "#00FFFF";
            //document.getElementById('btn_llegar').style.background = "#00FFFF";
            //document.getElementById('btn_llegar').style.color = "#000";
            var distancia = verDistancia(latitud, longitud, postionLatitud[4], postionLongitud[4]);
            document.getElementById('distancia').innerHTML = distancia + "km";
            document.getElementById("info").style.display = "block";
            $('html, body').animate({
                scrollTop: $('#instructions').offset().top
            }, 1000);
            map.setCenter(postionLatitud[4], postionLongitud[4]);
            map.setZoom(15);
        },
        infoWindow: {
            content: '<center><strong style="color:#296fb7;margin-top:40px;font-size:14px">SEDE ESPERANZA</strong></center>'
        }
    });

    map.addMarker({
        lat: -8.1700515,
        lng: -79.00881,
        animation: google.maps.Animation.DROP,
        icon: "../img/marker.png",
        title: 'SEDE MOCHE',
        click: function (e) {
            map.cleanRoute();
            $('#instructions').empty();
            map.travelRoute({
                origin: [latitud, longitud],
                destination: [postionLatitud[7], postionLongitud[7]],
                travelMode: 'driving',
                step: function (e) {
                    $('#instructions').append('<li>' + e.instructions + '</li>');
                    $('#instructions li:eq(' + e.step_number + ')').delay(550 * e.step_number).fadeIn(200, function () {
                        map.drawPolyline({
                            path: e.path,
                            strokeColor: '#41521F',
                            strokeOpacity: 0.6,
                            strokeWeight: 6
                        });
                    });
                }
            });
            document.getElementById("titulo-maps").innerHTML = "SEDE MOCHE DE SEDALIB S.A.";
            document.getElementById('img-sede').src = "../img/sede-moche.png";
            document.getElementById('direccion-sedalib').innerHTML = "Francisco Bolognesi Nº 504";
            document.getElementById('telefono-sedalib').innerHTML = "465172 - 482336 Anexo: 416";
            document.getElementById('horario-of').style.display = "none";
            document.getElementById('horario2-sedalib').innerHTML = "Lun a Vie 8:00a.m. a 5:00p.m. y Sáb 8:00a.m. a 1:00p.m. Sólo Cobranza";
            document.getElementById('color-sedalib').innerHTML = "Verde Petroleo";
            document.getElementById('color').style.background = "#41521F";
            //document.getElementById('btn_llegar').style.background = "#41521F";
            //document.getElementById('btn_llegar').style.color = "#FFF";
            var distancia = verDistancia(latitud, longitud, postionLatitud[7], postionLongitud[7]);
            document.getElementById('distancia').innerHTML = distancia + "km";
            document.getElementById("info").style.display = "block";
            $('html, body').animate({
                scrollTop: $('#instructions').offset().top
            }, 1000);
            map.setCenter(postionLatitud[7], postionLongitud[7]);
            map.setZoom(13);
        },
        infoWindow: {
            content: '<center><strong style="color:#296fb7;margin-top:40px;font-size:14px">SEDE MOCHE</strong></center>'
        }
    });
    //sede Puerto Malabrigo    
    map.addMarker({
        lat: -7.702425,
        lng: -79.4364685,
        animation: google.maps.Animation.DROP,
        icon: "../img/marker.png",
        title: 'SEDE PUERTO MALABRIGO',
        click: function (e) {
            map.cleanRoute();
            $('#instructions').empty();
            map.travelRoute({
                origin: [latitud, longitud],
                destination: [postionLatitud[8], postionLongitud[8]],
                travelMode: 'driving',
                step: function (e) {
                    $('#instructions').append('<li>' + e.instructions + '</li>');
                    $('#instructions li:eq(' + e.step_number + ')').delay(550 * e.step_number).fadeIn(200, function () {
                        map.drawPolyline({
                            path: e.path,
                            strokeColor: '#7401DF',
                            strokeOpacity: 0.6,
                            strokeWeight: 6
                        });
                    });
                }
            });
            document.getElementById("titulo-maps").innerHTML = "SEDE PUERTO MALABRIGO DE SEDALIB S.A.";
            document.getElementById('img-sede').src = "../img/sede_puerto.png";
            document.getElementById('direccion-sedalib').innerHTML = "Alfonso Ugarte N° 617";
            document.getElementById('telefono-sedalib').innerHTML = "576202";
            document.getElementById('horario-of').style.display = "none";
            document.getElementById('horario2-sedalib').innerHTML = "Lun a Vie 8:00a.m. a 1:00p.m. y 3:00p.m. a 6:00p.m. y Sáb 8:00a.m. a 1:00p.m. Sólo Cobranza";
            document.getElementById('color-sedalib').innerHTML = "Morado";
            //document.getElementById('color').style.background = "#7401DF";
            //document.getElementById('btn_llegar').style.background = "#7401DF";
            var distancia = verDistancia(latitud, longitud, postionLatitud[8], postionLongitud[8]);
            document.getElementById('distancia').innerHTML = distancia + "km";
            document.getElementById("info").style.display = "block";
            $('html, body').animate({
                scrollTop: $('#instructions').offset().top
            }, 1000);
            map.setCenter(postionLatitud[8], postionLongitud[8]);
            map.setZoom(13);
        },
        infoWindow: {
            content: '<center><strong style="color:#296fb7;margin-top:40px;font-size:14px">SEDE PUERTO MALABRIGO</strong></center>'
        }
    });
    //sede Slaverry       
    map.addMarker({
        lat: -8.223873,
        lng: -78.9762672,
        animation: google.maps.Animation.DROP,
        icon: "../img/marker.png",
        title: 'SEDE SALAVERRY',
        click: function (e) {
            map.cleanRoute();
            $('#instructions').empty();
            map.travelRoute({
                origin: [latitud, longitud],
                destination: [postionLatitud[9], postionLongitud[9]],
                travelMode: 'driving',
                step: function (e) {
                    $('#instructions').append('<li>' + e.instructions + '</li>');
                    $('#instructions li:eq(' + e.step_number + ')').delay(550 * e.step_number).fadeIn(200, function () {
                        map.drawPolyline({
                            path: e.path,
                            strokeColor: '#FE9A2E',
                            strokeOpacity: 0.6,
                            strokeWeight: 6
                        });
                    });
                }
            });
            document.getElementById("titulo-maps").innerHTML = "SEDE SALAVERRY DE SEDALIB S.A.";
            document.getElementById('img-sede').src = "../img/sede_salaverry.png";
            document.getElementById('direccion-sedalib').innerHTML = "Jr. Córdova Nº 313";
            document.getElementById('telefono-sedalib').innerHTML = "437529 - 482336 Anexo: 411";
            document.getElementById('horario-of').style.display = "none";
            document.getElementById('horario2-sedalib').innerHTML = "Lun a Vie 8:00a.m. a 5:00p.m. y Sáb 8:00a.m. a 1:00p.m. Sólo Cobranza";
            document.getElementById('color-sedalib').innerHTML = "Naranja";
            document.getElementById('color').style.background = "#FE9A2E";
            //document.getElementById('btn_llegar').style.background = "#FE9A2E";
            //document.getElementById('btn_llegar').style.color = "#FFF";
            var distancia = verDistancia(latitud, longitud, postionLatitud[9], postionLongitud[9]);
            document.getElementById('distancia').innerHTML = distancia + "km";
            document.getElementById("info").style.display = "block";
            $('html, body').animate({
                scrollTop: $('#instructions').offset().top
            }, 1000);
            map.setCenter(postionLatitud[9], postionLongitud[9]);
            map.setZoom(13);
        },
        infoWindow: {
            content: '<center><strong style="color:#296fb7;margin-top:40px;font-size:14px">SEDE SALAVERRY</strong></center>'
        }
    });
    //sede chocope    
    map.addMarker({
        lat: -7.791305,
        lng: -79.2218158,
        animation: google.maps.Animation.DROP,
        icon: "../img/marker.png",
        title: 'SEDE CHOCOPE',
        click: function (e) {
            map.cleanRoute();
            $('#instructions').empty();
            map.travelRoute({
                origin: [latitud, longitud],
                destination: [postionLatitud[5], postionLongitud[5]],
                travelMode: 'driving',
                step: function (e) {
                    $('#instructions').append('<li>' + e.instructions + '</li>');
                    $('#instructions li:eq(' + e.step_number + ')').delay(550 * e.step_number).fadeIn(200, function () {
                        map.drawPolyline({
                            path: e.path,
                            strokeColor: '#FE2EF7',
                            strokeOpacity: 0.6,
                            strokeWeight: 6
                        });
                    });
                }
            });
            document.getElementById("titulo-maps").innerHTML = "SEDE CHOCOPE DE SEDALIB S.A.";
            document.getElementById('img-sede').src = "../img/sede_chocope.png";
            document.getElementById('direccion-sedalib').innerHTML = "Diego de Mora Nº 174";
            document.getElementById('telefono-sedalib').innerHTML = "542221";
            document.getElementById('horario-of').style.display = "none";
            document.getElementById('horario2-sedalib').innerHTML = "Lun a Vie 8:00a.m. a 1:00p.m. y 3:00p.m. a 6:00p.m. y Sáb 8:00a.m. a 1:00p.m. Sólo Cobranza ";
            document.getElementById('color-sedalib').innerHTML = "Rosado";
            document.getElementById('color').style.background = "#FE2EF7";
            //document.getElementById('btn_llegar').style.background = "#FE2EF7";
            var distancia = verDistancia(latitud, longitud, postionLatitud[5], postionLongitud[5]);
            document.getElementById('distancia').innerHTML = distancia + "km";
            document.getElementById("info").style.display = "block";
            $('html, body').animate({
                scrollTop: $('#instructions').offset().top
            }, 1000);
            map.setCenter(postionLatitud[5], postionLongitud[5]);
            map.setZoom(13);
        },
        infoWindow: {
            content: '<center><strong style="color:#296fb7;margin-top:40px;font-size:14px">SEDE CHOCOPE</strong></center>'
        }
    });
    //sede chepen    
    map.addMarker({
        lat: -7.2266265,
        lng: -79.4323404,
        animation: google.maps.Animation.DROP,
        icon: "../img/marker.png",
        title: 'SEDE CHEPÉN',
        click: function (e) {
            map.cleanRoute();
            $('#instructions').empty();
            map.travelRoute({
                origin: [latitud, longitud],
                destination: [postionLatitud[6], postionLongitud[6]],
                travelMode: 'driving',
                step: function (e) {
                    $('#instructions').append('<li>' + e.instructions + '</li>');
                    $('#instructions li:eq(' + e.step_number + ')').delay(550 * e.step_number).fadeIn(200, function () {
                        map.drawPolyline({
                            path: e.path,
                            strokeColor: '#0B614B',
                            strokeOpacity: 0.6,
                            strokeWeight: 6
                        });
                    });
                }
            });
            document.getElementById("titulo-maps").innerHTML = "SEDE CHEPÉN DE SEDALIB S.A.";
            document.getElementById('img-sede').src = "../img/sede_chepen.png";
            document.getElementById('direccion-sedalib').innerHTML = "Calle Manco Capac Nº 05";
            document.getElementById('telefono-sedalib').innerHTML = "562258";
            document.getElementById('horario-of').style.display = "none";
            document.getElementById('horario2-sedalib').innerHTML = "Lun a Vie 8:00a.m. a 1:00p.m. y 3:00p.m. a 6:00p.m. y Sáb 8:00a.m. a 1:00p.m. Sólo Cobranza";
            document.getElementById('color-sedalib').innerHTML = "Cristal";
            document.getElementById('color').style.background = "#0B614B";
            //document.getElementById('btn_llegar').style.background = "#0B614B";
            var distancia = verDistancia(latitud, longitud, postionLatitud[6], postionLongitud[6]);
            document.getElementById('distancia').innerHTML = distancia + "km";
            document.getElementById("info").style.display = "block";
            $('html, body').animate({
                scrollTop: $('#instructions').offset().top
            }, 1000);
            map.setCenter(postionLatitud[5], postionLongitud[5]);
            map.setZoom(13);
        },
        infoWindow: {
            content: '<center><strong style="color:#296fb7;margin-top:40px;font-size:14px">SEDE CHEPÉN</strong></center>'
        }
    });

    //Geoposicionamiento 
    GMaps.geolocate({
        success: function (position) {
            map.setCenter(position.coords.latitude, position.coords.longitude);
            map.addMarker({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                icon: "../img/user-marker.png",
                title: 'Ubicación',
                infoWindow: {
                    content: 'Ubicación Relativa'
                }
            });
            latitud = (position.coords.latitude);
            longitud = (position.coords.longitude);
        },

        error: function (error) {
            alert('Falló la Geoposición: ' + error.message);
        },
        not_supported: function () {
            alert("Tú celular no soporta Geoposicionamiento");
        },
        always: function () {
            swal({
                title: "Posición Obtenida",
                text: "El mensaje se cerrara en 2 seg.",
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
});

function verDistancia(a, b, c, d) {
    var R = 6371;
    var x1 = c - a;
    var dLat = toRad(x1);
    var x2 = d - b;
    var dLon = toRad(x2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(a)) * Math.cos(toRad(c)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = Math.round((R * c) * 100) / 100;
    return d;
}

function toRad(a) {
    return a * Math.PI / 180;
}

function regresar() {
    if (localStorage.getItem('mapa') == 1) {
        location.href = "../index.html#inicio";
    } else if (localStorage.getItem("mapa") == 2) {
        location.href = "../index.html#noclientes";
    } else if (localStorage.getItem("mapa") == 3) {
        location.href = "../index.html#usuarios";
    }
}
