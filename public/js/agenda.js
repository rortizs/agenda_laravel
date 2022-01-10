
document.addEventListener('DOMContentLoaded', function () {

    /**seleccionar el formulario y capturar los datos */
    let formulario = document.querySelector("#formularioEventos");

    var calendarEl = document.getElementById('agenda');

    var calendar = new FullCalendar.Calendar(calendarEl, {

        initialView: 'dayGridMonth',
        locale: "es",
        displayEventTime: true,

        headerToolbar: {
            left: 'prev,next today ',

            center: 'title',

            right: 'dayGridMonth,timeGridWeek,listWeek'

        },

        // events: "http://localhost/agenda/public/evento/mostrar",
        eventSources:{

            url: baseURL+"/evento/mostrar",
            method: "POST",
            extraParams: {
                _token: formulario._token.value,

            }

        },

        /**evento click para mostrar los datos */
        dateClick: function (info) {

            formulario.reset()

            formulario.start.value = info.dateStr;
            formulario.end.value = info.dateStr;

            $('#evento').modal("show");

        },

        eventClick: function (info) {

            var evento = info.event;

            axios.post(baseURL+"/evento/editar/" + info.event.id).then(
                (respuesta) => {
                    /**meotodo para cargar la informacion al formulario del calendario */
                    formulario.id.value = respuesta.data.id
                    formulario.title.value = respuesta.data.title

                    formulario.descripcion.value = respuesta.data.descripcion

                    formulario.start.value = respuesta.data.start
                    formulario.end.value = respuesta.data.end

                    $("#evento").modal("show");

                }
            ).catch(
                error => {
                    if (error.respose) {
                        console.log(error.respose.data)
                    }
                }
            )
        }

    });

    calendar.render();

    document.getElementById("btnGuardar").addEventListener("click", function () {

        enviarDatos("/evento/agregar");

    });

    document.getElementById("btnEliminar").addEventListener("click", function () {

        enviarDatos("/evento/borrar/" + formulario.id.value);

    });

    document.getElementById("btnModificar").addEventListener("click", function () {

        enviarDatos("/evento/actualizar/" + formulario.id.value);

    });

    /**metodo para enviar los datos  */

    function enviarDatos(url) {

        const datos = new FormData(formulario);

        const nuevaURL= baseURL+url;

        axios.post(nuevaURL, datos).then(
            (respuesta) => {

                /**meotodo para actualizar el calendario */
                calendar.refetchEvents();

                /**oculto el modal */
                $("#evento").modal("hide");

            }
        ).catch(error => {if (error.respose) {
                    console.log(error.respose.data)
                }
            }
        )
    }

});