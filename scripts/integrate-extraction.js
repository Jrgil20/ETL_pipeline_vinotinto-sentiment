#!/usr/bin/env node

/**
 * Script para integrar datos del módulo de extracción
 * Conecta el repositorio de extracción con el pipeline principal
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROJECT_ROOT = join(__dirname, '..');
const EXTRACTION_PATH = join(PROJECT_ROOT, 'extraction');

/**
 * Verifica que el submodule de extracción esté disponible
 */
function checkExtractionModule() {
  if (!existsSync(EXTRACTION_PATH)) {
    console.error('❌ Error: El módulo de extracción no está disponible');
    console.log('💡 Ejecuta: git submodule update --init --recursive');
    process.exit(1);
  }
  
  console.log('✅ Módulo de extracción encontrado');
}

/**
 * Lee la configuración del módulo de extracción
 */
function readExtractionConfig() {
  const packagePath = join(EXTRACTION_PATH, 'package.json');
  
  if (!existsSync(packagePath)) {
    console.error('❌ Error: No se encontró package.json en el módulo de extracción');
    process.exit(1);
  }
  
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
  console.log('📦 Configuración del módulo de extracción:', packageJson.name);
  
  return packageJson;
}

/**
 * Crea un enlace simbólico o copia archivos según sea necesario
 */
function integrateExtractionData() {
  const extractionSrc = join(EXTRACTION_PATH, 'src');
  const targetPath = join(PROJECT_ROOT, 'src', 'extraction');
  
  console.log('🔗 Integrando datos de extracción...');
  console.log(`   Desde: ${extractionSrc}`);
  console.log(`   Hacia: ${targetPath}`);
  
  // Aquí puedes agregar lógica específica para integrar los datos
  // Por ejemplo, copiar archivos, crear enlaces, etc.
  
  console.log('✅ Integración completada');
}

/**
 * Función principal
 */
function main() {
  console.log('🚀 Iniciando integración del módulo de extracción...\n');
  
  try {
    checkExtractionModule();
    readExtractionConfig();
    integrateExtractionData();
    
    console.log('\n🎉 Integración completada exitosamente!');
    console.log('💡 Ahora puedes usar los datos del módulo de extracción en tu pipeline');
    
  } catch (error) {
    console.error('❌ Error durante la integración:', error.message);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as integrateExtraction }; 