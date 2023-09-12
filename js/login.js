document.addEventListener("DOMContentLoaded", function () {
    const switchLoginRegistro = document.getElementById("switchLoginRegistro");
    const accesoForm = document.querySelector(".acceso");
    const registroForm = document.querySelector(".registro");
    const labelSwitch = document.querySelector(".form-check-label");
  
    const notification = document.getElementById("notification");
    const notificationMessage = document.getElementById("notification-message");
    const closeButton = document.querySelector(".btn-close");
  
    switchLoginRegistro.addEventListener("change", () => {
      if (switchLoginRegistro.checked) {
        labelSwitch.innerHTML = "¿Ya tienes una cuenta?<br>Pulsa para ir al menú de ingreso.";
      } else {
        labelSwitch.innerHTML = "¿No tienes una cuenta?<br>Pulsa para ir al menú de registro.";
      }
  
      accesoForm.classList.toggle("acceso");
      accesoForm.classList.toggle("registro");
      registroForm.classList.toggle("registro");
      registroForm.classList.toggle("acceso");
  
      document.getElementById("usernameLogin").value = "";
      document.getElementById("contraseñaLogin").value = "";
      document.getElementById("usernameRegistro").value = "";
      document.getElementById("contraseñaRegistro").value = "";
      document.getElementById("contraseñaRegistro2").value = "";
      document.getElementById("emailRegistro").value = "";
      document.getElementById("nacimientoRegistro").value = "";
      document.getElementById("msgErrorRegistro").innerHTML = "Ingrese sus datos.";
      document.getElementById("msgErrorLogin").innerHTML = "Ingrese sus datos.";
    });
  
    closeButton.addEventListener("click", () => {
      hideNotification();
    });
  
    const btnRegistro = document.getElementById("btnRegistro");
  
    btnRegistro.addEventListener("click", () => {
      const username = document.getElementById("usernameRegistro").value;
      const password = document.getElementById("contraseñaRegistro").value;
      const password2 = document.getElementById("contraseñaRegistro2").value;
      const email = document.getElementById("emailRegistro").value;
      const birthdate = document.getElementById("nacimientoRegistro").value;
  
      if (username === "" || password === "" || password2 === "" || email === "" || birthdate === "") {
        registrationError("Por favor, complete todos los campos.");
        return;
      }
      if (password === password2) {
        if (password.length >= 8) {
          registrationSuccess();
        } else {
          registrationError("La contraseña debe tener al menos 8 caracteres.");
        }
      } else {
        registrationError("Las contraseñas no coinciden.");
      }
    });
  
    const btnAcceder = document.getElementById("btnAcceder");
  
    btnAcceder.addEventListener("click", () => {
      const username = document.getElementById("usernameLogin").value;
      const password = document.getElementById("contraseñaLogin").value;
  
      if (username === "" || password === "") {
        loginError("Por favor, completa ambos campos.");
      } else if (password.length < 8) {
        loginError("La contraseña debe tener al menos 8 caracteres.");
      } else {
        loginSuccess();
      }
    });
  
    document.addEventListener("DOMContentLoaded", function () {
      var estaLogueado = localStorage.getItem("logueado");
      if (estaLogueado === "true") {
        window.location.href = "index.html";
      }
    });
  
    function showNotification(message, type) {
      notification.classList.add("show", `alert-${type}`);
      notificationMessage.textContent = message;
  
      setTimeout(() => {
        hideNotification();
      }, 2000);
    }
  
    function hideNotification() {
      notification.classList.remove("show");
      notification.classList.remove("alert-success", "alert-danger");
      notificationMessage.textContent = "";
    }
  
    function registrationSuccess() {
      showNotification("Registro correcto.", "success");
      accesoForm.classList.remove("registro");
      accesoForm.classList.add("acceso");
      registroForm.classList.remove("acceso");
      registroForm.classList.add("registro");
  
      document.getElementById("usernameRegistro").value = "";
      document.getElementById("contraseñaRegistro").value = "";
      document.getElementById("contraseñaRegistro2").value = "";
      document.getElementById("emailRegistro").value = "";
      document.getElementById("nacimientoRegistro").value = "";
      document.getElementById("msgErrorRegistro").innerHTML = "Ingrese sus datos.";
      document.getElementById("msgErrorLogin").innerHTML = "Ingrese sus datos.";
    }
  
    function registrationError(message) {
      showNotification(message, "danger");
    }
  
    function loginSuccess() {
      showNotification("Acceso correcto.", "warning");
      localStorage.setItem("logueado", "true");
      localStorage.setItem("nombreLogueado", usernameLogin.value);
  
      setTimeout(() => {
        window.location.href = "index.html"; 
      }, 2500);
    }
  
    function loginError(message) {
      showNotification(message, "danger");
    }
  });