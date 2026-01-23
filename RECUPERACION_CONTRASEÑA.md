# Configuración de Recuperación de Contraseña

## Resumen de Funcionalidades Implementadas

Se ha implementado un sistema completo de recuperación de contraseña que incluye:

1. ✅ Link "¿Olvidaste tu contraseña?" en la página de login
2. ✅ Formulario para ingresar el correo electrónico registrado
3. ✅ Validación del correo contra la base de datos
4. ✅ Envío de correo electrónico con enlace de recuperación (usando Nodemailer)
5. ✅ Página de reseteo con 2 inputs (nueva contraseña y confirmación)
6. ✅ Redirección automática al login después de resetear

## Archivos Creados/Modificados

### Backend:

- **Nuevo:** `backend/src/config/nodemailer.js` - Configuración de Nodemailer
- **Nuevo:** `backend/src/controllers/passwordRecovery.controller.js` - Lógica de recuperación
- **Nuevo:** `backend/src/routes/passwordRecovery.routes.js` - Rutas del sistema
- **Modificado:** `backend/src/routes/index.js` - Agregada ruta de recuperación
- **Nuevo:** `backend/.env.example` - Ejemplo de variables de entorno

### Frontend:

- **Modificado:** `frontend/src/pages/LoginAdmin.jsx` - Agregado formulario de recuperación
- **Nuevo:** `frontend/src/pages/ResetPassword.jsx` - Página de reseteo
- **Modificado:** `frontend/src/App.jsx` - Agregadas rutas

## Configuración Necesaria

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
EMAIL_USER=tucorreo@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
```

### 2. Obtener Contraseña de Aplicación de Gmail

Para usar Gmail como servidor de correo:

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. Navega a **Seguridad**
3. Activa la **Verificación en 2 pasos** (si no está activada)
4. Busca **Contraseñas de aplicaciones**
5. Selecciona "Correo" como aplicación y "Windows" como dispositivo
6. Google generará una contraseña de 16 caracteres
7. Copia esa contraseña en `EMAIL_PASS` en tu archivo `.env`

### 3. Alternativas a Gmail

Si prefieres usar otro servicio de correo, modifica el archivo `backend/src/config/nodemailer.js`:

#### Outlook/Hotmail:

```javascript
service: "outlook";
```

#### Yahoo:

```javascript
service: "yahoo";
```

#### Otro SMTP personalizado:

```javascript
host: 'smtp.tuservidor.com',
port: 587,
secure: false, // true para 465, false para otros puertos
```

## Flujo de Uso

1. El usuario hace clic en "¿Olvidaste tu contraseña?" en `/loginadmin`
2. Ingresa su correo electrónico registrado
3. El sistema verifica si el correo existe en la BD
4. Si existe, envía un correo con un enlace de recuperación válido por 1 hora
5. El usuario hace clic en el enlace y es redirigido a `/reset-password/:token`
6. El sistema verifica que el token sea válido
7. El usuario ingresa su nueva contraseña dos veces
8. El sistema valida que coincidan y actualiza la contraseña
9. Redirección automática al login

## API Endpoints

### POST `/api/password-recovery/request`

Solicita recuperación de contraseña

```json
{
  "mail": "usuario@ejemplo.com"
}
```

### GET `/api/password-recovery/verify/:token`

Verifica si un token de recuperación es válido

### POST `/api/password-recovery/reset/:token`

Resetea la contraseña con un token válido

```json
{
  "password": "nuevaContraseña",
  "confirmPassword": "nuevaContraseña"
}
```

## Seguridad

- Los tokens de recuperación expiran en 1 hora
- Las contraseñas se hashean con bcrypt antes de guardarse
- Se valida que las contraseñas coincidan antes de actualizarlas
- Longitud mínima de contraseña: 6 caracteres
- Los tokens se eliminan después de ser usados

## Mejoras Futuras (Opcional)

Para un entorno de producción, considera:

1. **Guardar tokens en la base de datos** en lugar de en memoria (Map)
2. **Agregar límite de intentos** para evitar spam de correos
3. **Implementar CAPTCHA** en el formulario de recuperación
4. **Usar variables de entorno** para las URLs del frontend
5. **Agregar logs** de seguridad para intentos de recuperación
6. **Implementar rate limiting** en las rutas de recuperación

## Pruebas

Para probar el sistema:

1. Asegúrate de tener un usuario en la BD con un correo válido
2. Configura el archivo `.env` con tus credenciales de correo
3. Inicia el backend: `npm run dev` o `nodemon`
4. Inicia el frontend: `npm run dev`
5. Navega a `/loginadmin` y prueba el flujo completo

## Solución de Problemas

### El correo no se envía:

- Verifica las credenciales en `.env`
- Asegúrate de usar una contraseña de aplicación, no tu contraseña normal
- Revisa la consola del backend para errores específicos
- Verifica que la verificación en 2 pasos esté activada en Gmail

### Token inválido o expirado:

- Los tokens duran solo 1 hora
- Si reinicias el servidor, los tokens en memoria se pierden (implementa BD para producción)

### Las contraseñas no se actualizan:

- Verifica la conexión a la base de datos
- Revisa que el campo `pass` existe en la tabla `usuarios`
- Chequea los logs del servidor para mensajes de error
