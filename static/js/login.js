$(document).ready(function () {
  let action = $("#cb form").attr("action");
  let method = $("#cb form").attr("method");
  let btn_get = document.getElementById("btn_get");
  let btn_loading = document.getElementById("btn_loading");
  let span_msg = document.getElementById("msg_btn");

  $("#cb form").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      beforeSend: function (xhr, settings) {
        // if (
        //   !/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) &&
        //   !this.crossDomain
        // ) {
        //   xhr.setRequestHeader("X-CSRFToken", csrf_token);
        // }
        console.clear();
        console.log("Consultado...");
        $("#btn_get").hide();
        btn_loading.style.display = "block";
        $("#btn_loading").show();
        msg_btn.innerText = "Iniciando sesión...";
      },
      url: action,
      type: method,
      data: JSON.stringify(
        $("#cb form")
          .serializeArray()
          .reduce(function (a, z) {
            a[z.name] = z.value;
            return a;
          }, {})
      ),
      dataType: "json",
      success: function (info) {
        console.log(info);
        $("#btn_loading").hide();
        if (info.Logged) {
          btn_get.innerText = info.msg;
          btn_get.disabled = true;
          setTimeout(() => {
            window.location.href = "/cpadmin";
          }, 1000);
        } else {
          btn_get.innerText = info.msg;
          setTimeout(() => {
            btn_get.innerText = "Iniciar sesión";
          }, 2000);
        }
        $("#btn_get")
          .removeClass(["btn-danger", "btn-primary"])
          .addClass(["btn-success"]);
        $("#btn_get").show();
      },
      error: function (jqXHR, status, error) {
        console.log(`Estado: ${status}`);
        console.log(`Error: ${error}`);
        $("#btn_loading").hide();
        btn_get.innerText = "Error de inicio de sesión";
        $("#btn_get")
          .removeClass(["btn-sucess", "btn-primary"])
          .addClass(["btn-danger"]);

        $("#btn_get").show();
      },
      complete: function (jqXHR, status) {
        console.log(`Petición completada con estado: ${status}`);
      },
      timeout: 10000,
    });
  });
});
