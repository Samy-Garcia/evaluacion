# Evaluación Práctica – Desarrollo de Aplicaciones Móviles

**Estudiante(s):** [COMPLETA TU NOMBRE COMPLETO AQUÍ]
**Carnet(s):** [COMPLETA TU CARNET AQUÍ]
**Módulo:** 3.5 Desarrollo de componentes para dispositivos móviles
**Institución:** Instituto Técnico Ricaldone

## Descripción del proyecto

Aplicación móvil desarrollada con **React Native** y **Expo** que implementa
autenticación de usuarios mediante **Firebase Authentication** y almacenamiento
de datos en **Cloud Firestore**. El usuario puede registrarse, iniciar sesión,
y visualizar/actualizar su información personal desde un panel (Dashboard).

### Pantallas

- **Login**: inicio de sesión con correo y contraseña.
- **Register**: registro de nuevos usuarios (crea cuenta en Firebase Auth y
  guarda sus datos en Firestore).
- **Dashboard**: muestra y permite editar la información del usuario
  autenticado, además de cerrar sesión.

## Paleta de colores

"Deep Teal & Amber"

| Color | Hex | Uso |
|---|---|---|
| Primary | `#073B4C` | Encabezados, botones principales |
| Secondary | `#06D6A0` | Acentos, botón secundario |
| Accent | `#FFD166` | Detalles |
| Danger | `#EF476F` | Errores, botón de cerrar sesión |
| Background | `#F7F9FA` | Fondo general |

## Dependencias principales

- `expo`
- `react`, `react-native`
- `firebase` (Auth + Firestore)
- `@react-navigation/native`, `@react-navigation/native-stack`
- `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`
- `react-native-dotenv` (variables de entorno)
- `@react-native-async-storage/async-storage` (persistencia de sesión)

## Configuración del entorno

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear un archivo `.env` en la raíz (usa `.env.example` como referencia)
   con tus credenciales de Firebase:
   ```
   API_KEY=
   AUTH_DOMAIN=
   PROJECT_ID=
   STORAGE_BUCKET=
   MESSAGING_SENDER_ID=
   APP_ID=
   ```
3. Ejecutar el proyecto:
   ```bash
   npx expo start
   ```

**Importante:** el archivo `.env` nunca debe subirse al repositorio (ya está
en `.gitignore`).
