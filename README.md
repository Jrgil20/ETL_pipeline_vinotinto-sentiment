# ETL Pipeline - Análisis de Sentimientos Vinotinto

Pipeline ETL completo para extraer, transformar y cargar datos de sentimientos sobre la Vinotinto desde Twitter.

## 🏗️ Arquitectura

El proyecto está estructurado en módulos independientes:

- **extraction/**: Módulo de extracción de tweets (submodule desde [Proyecto_BD2](https://github.com/ajperez20/Proyecto_BD2))
- **orchestration/**: Frontend y backend para monitoreo y control
- **load/**: Módulo de carga de datos (en desarrollo)

## 🚀 Configuración Inicial

### 1. Clonar el repositorio con submodules

```bash
git clone --recursive <URL_DEL_REPOSITORIO>
cd ETL_pipeline_vinotinto-sentiment
```

### 2. Si ya clonaste sin submodules, inicialízalos:

```bash
git submodule update --init --recursive
```

### 3. Instalar dependencias de todos los módulos:

```bash
npm run install:all
```

## 📦 Scripts Disponibles

### Desarrollo
```bash
npm run dev          # Inicia el servidor de desarrollo (orchestration)
npm run build        # Construye la aplicación
```

### Extracción de Datos
```bash
npm run extract      # Ejecuta el módulo de extracción
npm run integrate    # Integra datos del módulo de extracción
```

### Gestión de Submodules
```bash
npm run submodule:init    # Inicializa submodules
npm run submodule:update  # Actualiza submodules desde remoto
```

### Backend
```bash
npm run start:backend     # Inicia el servidor backend
```

## 🔧 Uso del Módulo de Extracción

El módulo de extracción está configurado como un **git submodule** desde el repositorio [Proyecto_BD2](https://github.com/ajperez20/Proyecto_BD2).

### Actualizar el módulo de extracción:

```bash
# Actualizar a la última versión
npm run submodule:update

# O manualmente
git submodule update --remote extraction
git add extraction
git commit -m "feat: actualizar módulo de extracción"
```

### Trabajar con el módulo de extracción:

```bash
cd extraction
# Hacer cambios en el módulo
git add .
git commit -m "feat: mejoras en extracción"
git push origin master

# Volver al proyecto principal
cd ..
git add extraction
git commit -m "feat: actualizar submodule extraction"
```

## 📁 Estructura del Proyecto

```
ETL_pipeline_vinotinto-sentiment/
├── extraction/           # Submodule - Extracción de tweets
│   ├── src/
│   │   ├── core/        # Lógica principal de extracción
│   │   ├── data/        # Datos extraídos
│   │   └── database/    # Scripts de base de datos
│   └── package.json
├── orchestration/        # Frontend y backend
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   └── ...
│   └── package.json
├── load/                # Módulo de carga (en desarrollo)
├── scripts/             # Scripts de integración
├── package.json         # Package.json principal
└── README.md
```

## 🔗 Integración de Datos

Para integrar los datos extraídos con el pipeline principal:

1. **Ejecutar extracción**:
   ```bash
   npm run extract
   ```

2. **Integrar datos**:
   ```bash
   npm run integrate
   ```

3. **Verificar en la interfaz**:
   ```bash
   npm run dev
   ```

## 🛠️ Tecnologías

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Base de Datos**: Supabase
- **Extracción**: Twitter API v2
- **Análisis**: Natural Language Processing

## 📝 Notas

- El módulo de extracción mantiene su propio repositorio y puede ser actualizado independientemente
- Los cambios en el submodule deben ser commitados tanto en el submodule como en el proyecto principal
- Usa `npm run submodule:update` para mantener el módulo de extracción actualizado

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.