# Orchestration Service - ETL Pipeline Vinotinto Sentiment

Este es el módulo de orquestación para el pipeline ETL de análisis de sentimientos de Vinotinto. Proporciona una interfaz web para monitorear y controlar el proceso de extracción, transformación y carga de datos.

## Características

- **Dashboard Web**: Interfaz React para monitoreo en tiempo real
- **API REST**: Servidor Express para comunicación con otros módulos
- **Métricas en Tiempo Real**: Visualización de logs y métricas del pipeline
- **Configuración de Supabase**: Gestión de conexiones a la base de datos

## Tecnologías

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Estilos**: Tailwind CSS
- **Base de Datos**: Supabase (PostgreSQL)
- **Linting**: ESLint

## Instalación

1. Clona este repositorio:
```bash
git clone <url-del-repositorio>
cd orchestration-service
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp env.example .env
```

4. Completa los valores en el archivo `.env`:
   - `SUPABASE_URL`: URL de tu proyecto Supabase
   - `SUPABASE_API_KEY`: Clave API de Supabase
   - `SUPABASE_TABLE`: Nombre de la tabla para almacenar datos

## Uso

### Desarrollo
```bash
# Iniciar el servidor de desarrollo (frontend)
npm run dev

# Iniciar el servidor backend
npm run start:backend
```

### Producción
```bash
# Construir la aplicación
npm run build

# Iniciar en modo preview
npm run preview
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo Vite
- `npm run build`: Construye la aplicación para producción
- `npm run lint`: Ejecuta ESLint para verificar el código
- `npm run preview`: Inicia el servidor de preview
- `npm run start:backend`: Inicia el servidor backend Express

## Estructura del Proyecto

```
orchestration-service/
├── src/
│   ├── components/     # Componentes React
│   ├── App.jsx        # Componente principal
│   └── main.jsx       # Punto de entrada
├── public/            # Archivos estáticos
├── server.js          # Servidor Express
├── package.json       # Dependencias y scripts
└── README.md          # Este archivo
```

## Integración con el Pipeline ETL

Este módulo se integra con:
- **Extraction Module**: Para monitorear la extracción de tweets
- **Load Module**: Para visualizar el estado de carga de datos
- **Supabase**: Para almacenar y consultar métricas

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## Licencia

Este proyecto está bajo la misma licencia que el proyecto principal ETL Pipeline Vinotinto Sentiment.