const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombreUsuario = registerForm.elements.nombreUsuario.value;
  const correoElectronico = registerForm.elements.correoElectronico.value;
  const contraseña = registerForm.elements.contraseña.value;

  if (!nombreUsuario) {
    document.getElementById('nombreUsuario-error').innerHTML = 'El nombre de usuario es obligatorio';
    return;
  }

  if (!correoElectronico.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    document.getElementById('correoElectronico-error').innerHTML = 'El correo electrónico no es válido';
    return;
  }

  if (contraseña.length < 8) {
    document.getElementById('contraseña-error').innerHTML = 'La contraseña debe tener al menos 8 caracteres';
    return;
  }

  fetch("banderas 4/guardar_registro.php", {
    method: 'POST',
    body: JSON.stringify({
      username: nombreUsuario,
      email: correoElectronico,
      password: contraseña
    })
  })

    .then(response => {
      if (response.ok) {
        response.json()
          .then(data => {
            if (data.success) {
              window.location.href = 'login.html';
            } else {
              alert(data.message);
            }
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.error("La respuesta no es un objeto JSON");
      }
    })
    .catch(error => {
      console.error(error);
    });
});
