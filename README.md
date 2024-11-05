# Electromedicina

Electromedicina es una aplicación web desarrollada con Angular CLI (versión 17.3.7) y diseñada para facilitar la gestión de datos médicos. La aplicación permite administrar pacientes, profesionales de salud y métricas de signos vitales, ofreciendo funcionalidades avanzadas para monitoreo de información médica.

## Funcionalidades principales
La aplicación cuenta con tres sectores principales:

1. **Sector Médico:** Los profesionales de la salud pueden iniciar sesión para gestionar sus pacientes, registrarlos, ver métricas de signos vitales y asignar o reasignar pacientes según sea necesario.
2. **Sector Paciente:** Los pacientes pueden ver su información médica, que se sincroniza automáticamente con el sistema.
3. **Sector Administrador:** Los administradores tienen un panel donde pueden gestionar tanto a médicos como a pacientes, visualizando estadísticas generales y realizando operaciones de alta y baja de profesionales de salud.
Servidor de desarrollo

Para iniciar el servidor de desarrollo, se ejecuta ng serve en la terminal y luego se navega a http://localhost:4200/ en el navegador. La aplicación se recargará automáticamente al realizar cambios en los archivos fuente, facilitando el desarrollo y las pruebas.

## Construcción del proyecto
Se ejecuta ng build para compilar el proyecto. Los archivos generados se guardarán en el directorio dist/, listos para su despliegue en un entorno de producción.

Descripción de los módulos y servicios implementados
Servicios de Autenticación y Gestión de Datos Médicos

**El servicio de autenticación (AuthService) permite:**
- Validar las credenciales de acceso de los profesionales de salud.
- Gestionar la información de usuarios registrados en la base de datos.
- Asignar pacientes a médicos y actualizar métricas de signos vitales.
- Registro de Pacientes y Vinculación con Profesionales
- En el componente registro-paciente.component.ts, se implementó un formulario para registrar a los pacientes, captando información personal y médica. 

**Este formulario:**
- Valida los datos antes de enviarlos.
- Genera un nuevo ID de paciente en la base de datos.
- Almacena tanto el perfil del paciente como las métricas iniciales de signos vitales.
- Vincula al paciente con un profesional de salud para seguimiento.
- Autenticación de Médicos e Ingreso al Panel
- En el componente ingreso-medico.component.ts, se ofrece una interfaz para autenticar a los profesionales de salud. Dependiendo del tipo de usuario (médico o administrador), se redirige al panel correspondiente. También se puede registrar un nuevo médico mediante un formulario específico.

**Visualización en el Mapa**
La aplicación incluye una sección de mapa donde se visualizan las ubicaciones de los pacientes registrados. La ubicación inicial representa el área donde fueron registrados, pero se actualizará automáticamente cuando se reciban datos de sensores. Esto permite monitorear la ubicación en tiempo real de cada paciente a través de dispositivos ESP32 conectados a sensores que miden temperatura, presión y niveles de oxígeno. Los datos de estos sensores se sincronizan con la aplicación, mostrando la última ubicación del paciente en el mapa en función de las lecturas de los dispositivos médicos.

## Notas finales
El proyecto Electromedicina se encuentra en constante desarrollo, integrando nuevas funcionalidades para mejorar la experiencia del usuario y la administración de datos médicos.

