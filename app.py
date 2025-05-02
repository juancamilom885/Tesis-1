# app.py
import os
from datetime import datetime
from flask import (Flask, render_template, request, redirect, url_for,
                   session, flash) # 'jsonify' no se usó, se puede quitar si no lo necesitas
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import logging # Para un mejor logging

# --- Inicialización de la Aplicación Flask ---
app = Flask(__name__)

# --- Configuración de la Aplicación ---
# Carga la clave secreta desde una variable de entorno o usa una por defecto (¡MENOS SEGURO!)
# En producción, SIEMPRE usa una variable de entorno.
# Ejemplo: export SECRET_KEY='tu_llave_super_secreta_y_aleatoria' en tu terminal
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'desarrollo-clave-secreta-cambiar-urgente')
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # Limitar tamaño de subida a 16MB

# Configurar logging básico
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]')


# --- Base de Datos (Simulada con un Diccionario) ---
# ¡RECUERDA! Esto es temporal. Los datos se pierden al reiniciar.
# Considera usar Flask-SQLAlchemy y SQLite/PostgreSQL para persistencia.
users_db = {
    'admin@ejemplo.com': {
        'password': generate_password_hash('admin123'),
        'name': 'Admin Principal',
        'type': 'admin', # 'admin', 'provider', 'buyer'
        'gallery': [],
        'bio': 'Administrador del sistema.',
        'location': 'Bogotá D.C.',
        'phone': '555-0100',
        'email': 'admin@ejemplo.com' # Añadir email para consistencia
    },
    'proveedor1@ejemplo.com': {
        'password': generate_password_hash('prov123'),
        'name': 'Proveedor Ejemplo Uno',
        'type': 'provider',
        'gallery': [
             {
                'title': 'Servicio de Diseño Web',
                'description': 'Creamos páginas web modernas y funcionales para PYMES.',
                'price': '1500000',
                'filename': 'ejemplo_servicio1.jpg', # Debes tener un archivo con este nombre en static/uploads
                'date': '01/04/2025 10:00'
            },
            {
                'title': 'Marketing Digital Básico',
                'description': 'Impulsa tu negocio en redes sociales y Google.',
                'price': '800000',
                'filename': 'ejemplo_servicio2.jpg', # Debes tener un archivo con este nombre en static/uploads
                'date': '02/04/2025 11:30'
            }
        ],
        'bio': 'Experto en desarrollo web y marketing digital con 5 años de experiencia. Ayudamos a PYMES a crecer.',
        'location': 'Medellín, Antioquia',
        'phone': '555-0101',
        'email': 'proveedor1@ejemplo.com'
    },
     'comprador1@ejemplo.com': {
        'password': generate_password_hash('comp123'),
        'name': 'Comprador Interesado SAS',
        'type': 'buyer',
        'gallery': [], # Los compradores no tienen galería de servicios
        'bio': 'Somos una PYME en crecimiento buscando servicios de contabilidad y diseño gráfico de calidad en Cali.',
        'location': 'Cali, Valle del Cauca',
        'phone': '555-0102',
        'email': 'comprador1@ejemplo.com'
    }
}

# --- Funciones Auxiliares ---
def allowed_file(filename):
    """Verifica si la extensión del archivo está permitida."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def save_uploaded_file(file):
    """Guarda un archivo subido de forma segura."""
    if not file or not file.filename:
        app.logger.warning("Intento de guardar archivo sin nombre.")
        return None

    if allowed_file(file.filename):
        original_filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        # Crear un nombre de archivo único para evitar sobreescrituras
        filename = f"{timestamp}_{original_filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        try:
            # Asegurarse que la carpeta exista antes de guardar
            os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
            file.save(filepath)
            app.logger.info(f"Archivo guardado: {filepath}") # Logging informativo
            return filename
        except Exception as e:
            app.logger.error(f"Error al guardar el archivo '{filename}': {e}", exc_info=True) # exc_info=True para traceback
            return None
    else:
        app.logger.warning(f"Intento de subir archivo con extensión no permitida: {file.filename}")
        return None

# --- Procesador de Contexto ---
@app.context_processor
def inject_common_variables():
    """ Hace que variables comunes estén disponibles en todas las plantillas Jinja2 """
    user_type = None
    user_name = None
    if 'user_email' in session:
        # Usar .get para evitar KeyError si el email no está (aunque no debería pasar)
        user = users_db.get(session['user_email'])
        if user:
            user_type = user.get('type')
            user_name = user.get('name')
    return dict(
        user_type=user_type,
        user_name=user_name, # Útil para mostrar el nombre en la navbar, etc.
        current_year=datetime.now().year
    )

# --- Rutas de la Aplicación ---

@app.route('/')
def home():
    """Página de inicio. Muestra contenido diferente si el usuario está logueado o no."""
    if 'user_email' in session:
        user = users_db.get(session['user_email'])
        if not user: # Manejo de caso donde el email en sesión no existe en DB
            session.pop('user_email', None)
            flash("Hubo un problema con tu sesión. Por favor, inicia sesión de nuevo.", "warning")
            app.logger.warning(f"Email '{session.get('user_email')}' en sesión pero no encontrado en DB.")
            return redirect(url_for('login'))

        # Lógica para mostrar contenido destacado a usuarios logueados
        # Usar list comprehensions con .get para seguridad
        featured_providers = [
            {**data, 'email': email} # Añadir email al diccionario para el enlace
            for email, data in users_db.items()
            if data.get('type') == 'provider'
        ][:3] # Tomar los primeros 3 proveedores

        return render_template('home_logged_in.html', user=user, featured_providers=featured_providers)
    else:
        # Lógica para la página pública (visitantes no logueados)
        featured_providers = [
             {**data, 'email': email}
             for email, data in users_db.items()
             if data.get('type') == 'provider'
        ][:3]
        return render_template('home_logged_out.html', featured_providers=featured_providers)

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Maneja el inicio de sesión de usuarios."""
    if 'user_email' in session:
         return redirect(url_for('home')) # Si ya está logueado, redirigir a home

    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        # Validación simple de entrada
        if not email or not password:
            flash("Correo electrónico y contraseña son requeridos.", "warning")
            return render_template('login.html', email=email)

        user = users_db.get(email)

        if not user or not check_password_hash(user.get('password', ''), password):
            flash('Correo o contraseña incorrectos.', 'danger')
            app.logger.warning(f"Intento de login fallido para email: {email}")
            # Renderizar la misma plantilla de login con el error y el email ingresado
            return render_template('login.html', email=email)

        # Inicio de sesión exitoso
        session['user_email'] = email
        # session.permanent = request.form.get('remember') == 'on' # Usar el checkbox "Recordarme"
        app.logger.info(f"Usuario inició sesión: {email}")
        flash(f"¡Bienvenido/a de nuevo, {user.get('name', 'Usuario')}!", 'success')
        return redirect(url_for('home')) # Idealmente redirigir a un dashboard o a donde iba antes

    # Método GET: simplemente muestra el formulario
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    """Maneja el registro de nuevos usuarios."""
    if 'user_email' in session:
         return redirect(url_for('home')) # Si ya está logueado, redirigir

    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        name = request.form.get('name')
        user_type = request.form.get('user_type') # 'provider' o 'buyer'

        # --- Validaciones ---
        error_msg = None
        if not email or not password or not name or not user_type:
             error_msg = 'Todos los campos marcados con * son obligatorios.'
        elif len(password) < 6:
            error_msg = 'La contraseña debe tener al menos 6 caracteres.'
        elif email in users_db:
            error_msg = 'El correo electrónico ya está registrado. Intenta iniciar sesión.'
        elif user_type not in ['provider', 'buyer']:
             error_msg = 'Tipo de usuario inválido seleccionado.'
        # Podrías añadir validación de formato de email aquí con regex o una librería

        if error_msg:
            flash(error_msg, 'warning')
            # Devolver datos al formulario para no perder lo ingresado
            return render_template('register.html', name=name, email=email, user_type=user_type)
        # --- Fin Validaciones ---

        # Crear nuevo usuario en nuestra "DB"
        users_db[email] = {
            'password': generate_password_hash(password),
            'name': name,
            'type': user_type,
            'gallery': [],
            'bio': '',
            'location': '',
            'phone': '',
            'email': email # Guardar email también aquí
        }
        app.logger.info(f"Nuevo usuario registrado: {email} ({user_type})")
        flash('¡Registro exitoso! Ahora puedes iniciar sesión con tus credenciales.', 'success')
        return redirect(url_for('login'))

    # Método GET: simplemente muestra el formulario
    return render_template('register.html')

@app.route('/logout')
def logout():
    """Cierra la sesión del usuario."""
    user_email = session.pop('user_email', None)
    if user_email:
        app.logger.info(f"Usuario cerró sesión: {user_email}")
        flash('Has cerrado sesión correctamente.', 'info')
    # session.clear() # Alternativa más drástica si guardas más cosas en sesión
    return redirect(url_for('home'))

@app.route('/gallery')
def gallery():
    """Muestra una galería de todos los servicios de los proveedores."""
    # No requiere login obligatorio para ver la galería general

    all_services = []
    # Recolectar todos los servicios de todos los proveedores
    for provider_email, provider_data in users_db.items():
        # Usar .get con valor default [] para gallery
        if provider_data.get('type') == 'provider':
            for service in provider_data.get('gallery', []):
                 # Añadir info del proveedor al servicio para mostrarla en la galería
                 # Crear una copia para no modificar el original en users_db
                 service_with_provider = service.copy()
                 service_with_provider['provider_name'] = provider_data.get('name', 'Proveedor Anónimo')
                 service_with_provider['provider_email'] = provider_email # Para enlazar al perfil del proveedor
                 service_with_provider['provider_location'] = provider_data.get('location') # Puede ser None
                 all_services.append(service_with_provider)

    # Podrías ordenar los servicios aquí, por ejemplo, por fecha si la parsearas
    # O implementar filtros/búsqueda si añades un formulario en gallery.html

    return render_template('gallery.html', services=all_services)

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    """Permite a los usuarios 'provider' subir nuevos servicios a su galería."""
    if 'user_email' not in session:
        flash('Debes iniciar sesión como proveedor para subir servicios.', 'warning')
        return redirect(url_for('login'))

    user = users_db.get(session['user_email'])
    # Verificar si el usuario existe y es proveedor
    if not user:
         session.pop('user_email', None) # Limpiar sesión inválida
         flash("Usuario no encontrado. Sesión cerrada.", "danger")
         app.logger.error(f"Usuario en sesión '{session.get('user_email')}' no encontrado al intentar subir servicio.")
         return redirect(url_for('login'))
    if user.get('type') != 'provider':
        flash('Solo los proveedores pueden acceder a esta página para subir servicios.', 'danger')
        return redirect(url_for('home'))

    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')
        price = request.form.get('price', '') # Obtener precio, puede ser vacío
        file = request.files.get('image')

        # Validación de campos obligatorios
        error_msg = None
        if not title or not description:
            error_msg = 'El título y la descripción son obligatorios.'
        elif not file or file.filename == '':
             error_msg = 'Debes seleccionar un archivo de imagen.'
        # Opcional: Validar formato de precio si se ingresó
        elif price:
            try:
                 # Permitir números enteros o decimales opcionales
                 float(price.replace(',', '.')) # Permitir coma como separador decimal
                 if float(price.replace(',', '.')) < 0:
                    error_msg = 'El precio no puede ser negativo.'
            except ValueError:
                error_msg = 'El formato del precio no es válido (solo números).'

        if error_msg:
            flash(error_msg, 'danger')
             # Devolver datos para rellenar form
            return render_template('upload.html', title=title, description=description, price=price)

        # Intentar guardar el archivo
        filename = save_uploaded_file(file)
        if not filename:
            # El error específico (formato o guardado) ya se logueó en save_uploaded_file
            flash('Error al procesar la imagen. Verifica el formato (png, jpg, jpeg, gif) y el tamaño (máx 16MB).', 'danger')
            return render_template('upload.html', title=title, description=description, price=price)

        # Añadir el nuevo servicio a la galería del usuario (en nuestra DB simulada)
        new_service = {
            'title': title,
            'description': description,
            # Guardar precio como string, formatear si es necesario al mostrar
            'price': price if price else 'A convenir',
            'filename': filename,
            'date': datetime.now().strftime("%d/%m/%Y %H:%M") # Añadir hora
        }
        # Asegurarse que 'gallery' exista y sea una lista
        if 'gallery' not in user or not isinstance(user['gallery'], list):
            user['gallery'] = []
        user['gallery'].append(new_service)

        app.logger.info(f"Nuevo servicio '{title}' añadido por {session['user_email']}")
        flash('¡Servicio subido correctamente!', 'success')
        # Redirigir al perfil del usuario donde puede ver sus servicios
        return redirect(url_for('profile')) # O a url_for('gallery') si prefieres

    # Método GET: muestra el formulario de subida
    return render_template('upload.html')

@app.route('/profile') # Ruta para ver el perfil PROPIO
def profile():
    """Muestra el perfil del usuario actualmente logueado."""
    if 'user_email' not in session:
        flash('Debes iniciar sesión para ver tu perfil.', 'warning')
        return redirect(url_for('login'))

    user = users_db.get(session['user_email'])
    if not user:
         session.pop('user_email', None)
         flash("Usuario no encontrado. Sesión cerrada.", "danger")
         app.logger.error(f"Usuario en sesión '{session.get('user_email')}' no encontrado al ver perfil.")
         return redirect(url_for('login'))

    # Pasar el email explícitamente además del objeto user
    return render_template('profile.html', user=user, email=session['user_email'])

@app.route('/profile/<user_email>') # Ruta para ver perfiles PÚBLICOS de otros
def view_profile(user_email):
    """Muestra el perfil público de un usuario específico (principalmente proveedores)."""
    # Validar que el email no sea el del propio usuario (ya tiene /profile)
    # if 'user_email' in session and session['user_email'] == user_email:
    #     return redirect(url_for('profile')) # Redirigir a su propia vista de perfil

    profile_user = users_db.get(user_email)

    if not profile_user:
        flash(f"Perfil para '{user_email}' no encontrado.", "danger")
        return redirect(url_for('home')) # O a una página de búsqueda/listado

    # Opcional: Restringir vista de perfiles de compradores si no eres admin?
    # if profile_user.get('type') == 'buyer':
    #    # Lógica para permitir o denegar vista
    #    pass

    app.logger.info(f"Viendo perfil público de: {user_email}")
    # Usar una plantilla diferente (profile_view.html)
    return render_template('profile_view.html', user=profile_user, email=user_email)


@app.route('/edit-profile', methods=['GET', 'POST'])
def edit_profile():
    """Permite al usuario logueado editar su propia información de perfil."""
    if 'user_email' not in session:
        flash('Debes iniciar sesión para editar tu perfil.', 'warning')
        return redirect(url_for('login'))

    user_email = session['user_email']
    user = users_db.get(user_email)
    if not user:
         session.pop('user_email', None)
         flash("Usuario no encontrado. Sesión cerrada.", "danger")
         app.logger.error(f"Usuario en sesión '{user_email}' no encontrado al intentar editar perfil.")
         return redirect(url_for('login'))

    if request.method == 'POST':
        # Actualizar datos del usuario en nuestra "DB"
        # Usar .get(key, default) para manejar campos que podrían no existir
        original_name = user.get('name', '')
        user['name'] = request.form.get('name', original_name).strip() # strip() para quitar espacios extra
        user['bio'] = request.form.get('bio', user.get('bio', '')).strip()
        user['location'] = request.form.get('location', user.get('location', '')).strip()
        user['phone'] = request.form.get('phone', user.get('phone', '')).strip()

        # Log del cambio (ejemplo con nombre)
        if original_name != user['name']:
            app.logger.info(f"Usuario {user_email} cambió su nombre de '{original_name}' a '{user['name']}'")
        else:
            app.logger.info(f"Usuario {user_email} actualizó su perfil.")

        flash('¡Perfil actualizado correctamente!', 'success')
        return redirect(url_for('profile')) # Redirigir de vuelta al perfil propio

    # Método GET: muestra el formulario de edición con los datos actuales
    return render_template('edit_profile.html', user=user)

# --- Manejadores de Errores HTTP ---
@app.errorhandler(404)
def page_not_found(e):
    """Muestra una página personalizada para errores 404."""
    app.logger.warning(f"Ruta no encontrada (404): {request.url} (Referrer: {request.referrer})")
    return render_template('404.html'), 404 # Necesitas crear templates/404.html

@app.errorhandler(500)
def internal_server_error(e):
    """Muestra una página personalizada y registra errores 500."""
    # Loggear el error real que causó el 500, incluyendo traceback
    app.logger.error(f"Error interno del servidor (500): {e} en {request.url}", exc_info=True)
    return render_template('500.html'), 500 # Necesitas crear templates/500.html

@app.errorhandler(405) # Method Not Allowed
def method_not_allowed(e):
    """Maneja errores cuando se usa un método HTTP incorrecto en una ruta."""
    app.logger.warning(f"Método no permitido (405): {request.method} para {request.url}")
    flash(f"Método {request.method} no permitido para esta página.", "warning")
    # Intentar redirigir a la URL anterior si es posible, si no a home
    return redirect(request.referrer or url_for('home'))

@app.errorhandler(413) # Payload Too Large
def payload_too_large(e):
    """Maneja el error cuando se sube un archivo demasiado grande."""
    max_size_mb = app.config.get('MAX_CONTENT_LENGTH', 0) / (1024 * 1024)
    app.logger.warning(f"Intento de subir archivo demasiado grande (413): {request.content_length} bytes (Límite: {max_size_mb:.1f}MB)")
    flash(f"El archivo es demasiado grande. El tamaño máximo permitido es {max_size_mb:.1f}MB.", 'danger')
    # Redirigir a la página desde donde se intentó subir (si es posible) o a una relevante
    if request.referrer and 'upload' in request.referrer:
        return redirect(url_for('upload'))
    return redirect(request.referrer or url_for('home'))


# --- Punto de Entrada Principal ---
if __name__ == '__main__':
    # Crear directorio de uploads si no existe al iniciar la app
    upload_dir = app.config['UPLOAD_FOLDER']
    if not os.path.exists(upload_dir):
        try:
            os.makedirs(upload_dir)
            app.logger.info(f"Directorio de subidas creado en: {upload_dir}")
        except OSError as e:
             app.logger.error(f"Error CRÍTICO al crear el directorio de subidas {upload_dir}: {e}", exc_info=True)
             # Considerar salir si no se puede crear la carpeta de uploads
             # import sys
             # sys.exit(1)

    # ¡IMPORTANTE! debug=True NO debe usarse en producción.
    # Controlar el modo debug con la variable de entorno FLASK_DEBUG=1 o FLASK_DEBUG=true
    # Usar un servidor WSGI como Gunicorn o uWSGI para producción:
    # Ejemplo: gunicorn -w 4 -b 0.0.0.0:5000 app:app
    is_debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() in ['true', '1', 't']
    app.logger.info(f"Iniciando aplicación en modo {'DEBUG' if is_debug_mode else 'PRODUCTION'}")

    # Obtener puerto de variable de entorno o usar 5000 por defecto
    port = int(os.environ.get('PORT', 5000))

    # Ejecutar la aplicación
    # host='0.0.0.0' permite conexiones desde otras máquinas en la red
    # Si solo quieres acceso local, usa host='127.0.0.1'
    app.run(
        debug=is_debug_mode,
        host='0.0.0.0',
        port=port
    )