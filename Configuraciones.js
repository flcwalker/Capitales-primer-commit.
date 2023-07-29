function guardarConfiguracion() {
  // Obtener los valores seleccionados por el usuario
  var nivelDificultad = document.getElementById("nivel-dificultad").value;
  var categoriaPaises = document.getElementById("categoria-paises").checked;
  var categoriaContinentes = document.getElementById("categoria-continentes").checked;
  var categoriaHistoricas = document.getElementById("categoria-historicas").checked;
  var modoJuego = document.querySelector('input[name="modo"]:checked').value;
  var idioma = document.getElementById("idioma").value;
  var habilitarSonidos = document.getElementById("habilitar-sonidos").checked;
  var ayudaEliminar = document.getElementById("ayuda-eliminar").checked;
  var ayudaPista = document.getElementById("ayuda-pista").checked;
  var colorFondo = document.getElementById("color-fondo").value;

  // Guardar la configuración en la base de datos o localStorage, por ejemplo
  // ...
  console.log("Configuración guardada");
}
