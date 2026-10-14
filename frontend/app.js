const BASE = window.location.port === '5000' ? '' : 'http://127.0.0.1:5000'

function enviar() {
    var contenido = document.querySelector('#contenido')
    var v1 = document.querySelector('#t1').value
    var v2 = document.querySelector('#t2').value
    var url = ""

    if (document.querySelector('#opcion1').checked)
        url = BASE + '/ecuacion/' + v1 + '/' + v2
    else if (document.querySelector('#opcion2').checked)
        url = BASE + '/tabla/' + v1
    else if (document.querySelector('#opcion3').checked)
        url = BASE + '/areas/circulo/' + v1
    else if (document.querySelector('#opcion4').checked)
        url = BASE + '/areas/cuadrado/' + v1
    else if (document.querySelector('#opcion5').checked)
        url = BASE + '/areas/triangulo/' + v1 + '/' + v2
    else {
        swal("Mensaje", "Seleccione una opción", "warning")
        return
    }

    if (v1.trim() === '' ||
        ((document.querySelector('#opcion1').checked || document.querySelector('#opcion5').checked) && v2.trim() === '')) {
        swal("Mensaje", "Ingresa todos los números requeridos", "warning")
        return
    }

    fetch(url)
        .then(function (response) {
            return response.text().then(function (texto) {
                if (!response.ok) {
                    throw new Error(texto.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() ||
                        "Error en la llamada (revise que los datos sean números válidos)")
                }
                return texto
            })
        })
        .then(function (texto) {
            console.log(texto)
            contenido.innerHTML = texto
        })
        .catch(function (error) {
            console.log(error)
            swal({
                title: "Advertencia",
                text: String(error),
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
        })
}

// Función auxiliar para configurar los campos
function configurar(t1Habilitado, t2Habilitado, p1, p2) {
    var t1 = document.querySelector('#t1')
    var t2 = document.querySelector('#t2')
    t1.disabled = !t1Habilitado
    t2.disabled = !t2Habilitado
    t1.value = ""
    t2.value = ""
    t1.placeholder = p1
    t2.placeholder = p2
}

// Opción para la ecuación Y = X * Z + Z + X
function opcion1() { configurar(true, true, "X", "Z") }

// Opción para la tabla de multiplicar
function opcion2() { configurar(true, false, "Número", "") }

// Opción para el área del círculo
function opcion3() { configurar(true, false, "Radio", "") }

// Opción para el área del cuadrado
function opcion4() { configurar(true, false, "Lado", "") }

// Opción para el área del triángulo
function opcion5() { configurar(true, true, "Base", "Altura") }