import React from "react";

function Login() {
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="login-card">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <form method="POST" action="{{ url_for('login') }}">
            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value="{{ email or '' }}"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
                name="remember"
              />
              <label className="form-check-label">Recordarme</label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Iniciar Sesión
            </button>
          </form>
          <div className="mt-3 text-center">
            <p>
              ¿No tienes una cuenta?{" "}
              <a href="{{ url_for('register') }}">Regístrate</a>
            </p>
            <p>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
