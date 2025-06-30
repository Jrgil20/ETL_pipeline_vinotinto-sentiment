# ETL Pipeline - Análisis de Sentimientos Vinotinto

Un pipeline ETL completo para extraer, transformar y cargar datos de análisis de sentimientos sobre la Vinotinto (Selección de Venezuela) desde Twitter, utilizando Azure AI para el análisis de sentimientos y Supabase como base de datos.

## 🏗️ Arquitectura del Pipeline ETL

Este proyecto implementa una arquitectura ETL (Extract, Transform, Load) distribuida en módulos especializados:

```
ETL_pipeline_vinotinto-sentiment/
├── extraction/          # 🚀 MÓDULO DE EXTRACCIÓN
│   ├── src/core/       # Extracción de tweets desde Twitter API v2
│   └── output/         # Datos extraídos (CSV)
├── transformation/      # 🔄 MÓDULO DE TRANSFORMACIÓN
│   └── src/           # Análisis de sentimientos con Azure AI
├── orchestration/      # 🎛️ MÓDULO DE ORQUESTACIÓN
│   ├── src/           # Dashboard React + API Express
│   └── server.js      # Servidor backend
└── scripts/           # 🔧 SCRIPTS DE INTEGRACIÓN
    ├── integrate-extraction.js
    └── validate-env.js
```

## 📋 Descripción de Módulos

### 🚀 **Extraction** - Extracción de Datos
- **Fuente**: Twitter API v2
- **Funcionalidad**: Extrae tweets relacionados con la Vinotinto
- **Filtros**: Palabras clave, fechas específicas, métricas de engagement
- **Salida**: CSV con tweets filtrados
- **Tecnologías**: Node.js, Twitter API, Supabase

### 🔄 **Transformation** - Análisis de Sentimientos
- **Procesamiento**: Análisis de sentimientos usando Azure AI Foundry
- **Entrada**: Tweets extraídos (CSV)
- **Salida**: Resultados de análisis (JSON)
- **Tecnologías**: Python, Azure AI, OpenAI

### 🎛️ **Orchestration** - Monitoreo y Control
- **Dashboard**: Interfaz web React para monitoreo en tiempo real
- **API**: Servidor Express para comunicación entre módulos
- **Métricas**: Visualización de logs y estado del pipeline
- **Tecnologías**: React, Express, Tailwind CSS

### 🔧 **Scripts** - Integración y Validación
- **Validación**: Verificación de variables de entorno
- **Integración**: Scripts para conectar módulos
- **Automatización**: Flujos de trabajo del pipeline

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18+)
- Python (v3.8+)
- Cuenta de Twitter Developer
- Proyecto Supabase
- Cuenta de Azure AI

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd ETL_pipeline_vinotinto-sentiment
```

### 2. Configurar Variables de Entorno

#### Extraction Module
```bash
cd extraction
cp env.example .env
```

Editar `extraction/.env`:
```env
TWITTER_BEARER_TOKEN=your_twitter_bearer_token
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Transformation Module
```bash
cd transformation
cp env.example .env
```

Editar `transformation/.env`:
```env
AZURE_OPENAI_ENDPOINT=your_azure_endpoint
AZURE_OPENAI_API_KEY=your_azure_api_key
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
```

#### Orchestration Module
```bash
cd orchestration
cp env.example .env
```

Editar `orchestration/.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_API_KEY=your_supabase_api_key
SUPABASE_TABLE=tweets_nosql
```

### 3. Instalar Dependencias

#### Extraction
```bash
cd extraction
npm install
```

#### Transformation
```bash
cd transformation
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Orchestration
```bash
cd orchestration
npm install
```

## 🔄 Flujo de Trabajo del Pipeline

### 1. Extracción de Datos
```bash
# Desde la raíz del proyecto
npm run extract

# O directamente
cd extraction
node src/core/main.js
```

**Proceso**:
- Conecta con Twitter API v2
- Extrae tweets de cuentas específicas
- Aplica filtros de contenido y fecha
- Almacena en Supabase
- Exporta a CSV

### 2. Análisis de Sentimientos
```bash
cd transformation
azd auth login
python src/setup_azure.py
python src/chat_app.py --input ../extraction/output/tweets.csv --output results.json
```

**Proceso**:
- Lee tweets desde CSV
- Analiza sentimientos con Azure AI
- Genera resultados estructurados
- Exporta análisis en JSON

### 3. Monitoreo y Visualización
```bash
cd orchestration
npm run dev          # Frontend React
npm run start:backend # Backend Express
```

**Funcionalidades**:
- Dashboard en tiempo real
- Métricas del pipeline
- Logs de ejecución
- Configuración de Supabase

## 📊 Configuración de Base de Datos

### Tabla Supabase
```sql
CREATE TABLE tweets_nosql (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tweet_data JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  username TEXT NOT NULL
);
```

## 🛠️ Scripts de Utilidad

### Validación de Entorno
```bash
node scripts/validate-env.js
```

### Integración de Módulos
```bash
node scripts/integrate-extraction.js
```

## 📈 Monitoreo y Métricas

El dashboard de orquestación proporciona:
- **Estado del Pipeline**: Visualización en tiempo real
- **Logs de Ejecución**: Historial de operaciones
- **Métricas de Rendimiento**: Tiempos de procesamiento
- **Configuración de Supabase**: Gestión de conexiones

## 🔧 Desarrollo

### Estructura de Desarrollo
```
├── extraction/          # Módulo independiente
├── transformation/      # Módulo independiente  
├── orchestration/       # Módulo independiente
└── scripts/            # Scripts de integración
```

### Patrones de Diseño
- **Modularidad**: Cada módulo es independiente
- **Configuración**: Variables de entorno por módulo
- **Integración**: Scripts para conectar módulos
- **Monitoreo**: Dashboard centralizado

## 🚨 Troubleshooting

### Problemas Comunes

1. **Error de Twitter API**
   - Verificar `TWITTER_BEARER_TOKEN`
   - Comprobar límites de rate limiting

2. **Error de Azure AI**
   - Verificar credenciales de Azure
   - Comprobar deployment activo

3. **Error de Supabase**
   - Verificar URL y API key
   - Comprobar estructura de tabla

### Logs y Debugging
- Los logs se muestran en el dashboard de orquestación
- Cada módulo tiene su propio sistema de logging
- Usar `scripts/validate-env.js` para verificar configuración

## 📝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Soporte

Para soporte técnico o preguntas sobre el pipeline ETL:
- Revisar la documentación de cada módulo
- Verificar logs en el dashboard de orquestación
- Usar scripts de validación para diagnóstico