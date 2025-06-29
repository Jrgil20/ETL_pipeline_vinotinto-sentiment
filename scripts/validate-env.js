#!/usr/bin/env node

/**
 * Script para validar variables de entorno
 * Verifica que todas las variables requeridas estén configuradas
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROJECT_ROOT = join(__dirname, '..');

/**
 * Validar variables de entorno del módulo de extracción
 */
function validateExtractionEnv() {
    console.log('🔍 Validando variables de entorno del módulo de extracción...');
    
    const envPath = join(PROJECT_ROOT, 'extraction', '.env');
    
    if (!existsSync(envPath)) {
        console.error('❌ Error: No se encontró el archivo extraction/.env');
        console.log('💡 Crea el archivo copiando el ejemplo:');
        console.log('   cp extraction/env.example extraction/.env');
        return false;
    }
    
    // Cargar variables de entorno
    dotenv.config({ path: envPath });
    
    const requiredVars = [
        'TWITTER_BEARER_TOKEN',
        'SUPABASE_URL',
        'SUPABASE_ANON_KEY'
    ];
    
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
        console.error('❌ Variables faltantes en extraction/.env:');
        missingVars.forEach(varName => console.error(`   - ${varName}`));
        return false;
    }
    
    // Validar formato de variables
    const validationErrors = [];
    
    if (!process.env.SUPABASE_URL.startsWith('https://')) {
        validationErrors.push('SUPABASE_URL debe comenzar con https://');
    }
    
    if (!process.env.TWITTER_BEARER_TOKEN.startsWith('AAAA')) {
        validationErrors.push('TWITTER_BEARER_TOKEN parece tener formato incorrecto');
    }
    
    if (validationErrors.length > 0) {
        console.error('❌ Errores de formato:');
        validationErrors.forEach(error => console.error(`   - ${error}`));
        return false;
    }
    
    console.log('✅ Variables de extracción configuradas correctamente');
    return true;
}

/**
 * Validar variables de entorno del módulo de orquestación
 */
function validateOrchestrationEnv() {
    console.log('🔍 Validando variables de entorno del módulo de orquestación...');
    
    const envPath = join(PROJECT_ROOT, 'orchestration', '.env');
    
    if (!existsSync(envPath)) {
        console.error('❌ Error: No se encontró el archivo orchestration/.env');
        console.log('💡 Crea el archivo copiando el ejemplo:');
        console.log('   cp orchestration/env.example orchestration/.env');
        return false;
    }
    
    // Cargar variables de entorno
    dotenv.config({ path: envPath });
    
    const requiredVars = [
        'SUPABASE_URL',
        'SUPABASE_SERVICE_ROLE_KEY'
    ];
    
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
        console.error('❌ Variables faltantes en orchestration/.env:');
        missingVars.forEach(varName => console.error(`   - ${varName}`));
        return false;
    }
    
    // Validar formato de variables
    const validationErrors = [];
    
    if (!process.env.SUPABASE_URL.startsWith('https://')) {
        validationErrors.push('SUPABASE_URL debe comenzar con https://');
    }
    
    if (validationErrors.length > 0) {
        console.error('❌ Errores de formato:');
        validationErrors.forEach(error => console.error(`   - ${error}`));
        return false;
    }
    
    console.log('✅ Variables de orquestación configuradas correctamente');
    return true;
}

/**
 * Probar conexiones a servicios externos
 */
async function testConnections() {
    console.log('🌐 Probando conexiones a servicios externos...');
    
    try {
        // Probar Twitter API
        const { TwitterApi } = await import('twitter-api-v2');
        const extractionEnvPath = join(PROJECT_ROOT, 'extraction', '.env');
        dotenv.config({ path: extractionEnvPath });
        
        if (process.env.TWITTER_BEARER_TOKEN) {
            try {
                const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
                const user = await client.v2.userByUsername('twitter');
                console.log('✅ Twitter API: Conexión exitosa');
            } catch (error) {
                console.error('❌ Twitter API:', error.message);
            }
        }
        
        // Probar Supabase
        const { createClient } = await import('@supabase/supabase-js');
        
        if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
            try {
                const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
                const { data, error } = await supabase
                    .from('tweets_nosql')
                    .select('count')
                    .limit(1);
                
                if (error) throw error;
                console.log('✅ Supabase: Conexión exitosa');
            } catch (error) {
                console.error('❌ Supabase:', error.message);
            }
        }
        
    } catch (error) {
        console.error('❌ Error probando conexiones:', error.message);
    }
}

/**
 * Función principal
 */
async function main() {
    console.log('🚀 Iniciando validación de variables de entorno...\n');
    
    let allValid = true;
    
    // Validar módulo de extracción
    const extractionValid = validateExtractionEnv();
    if (!extractionValid) allValid = false;
    
    console.log(''); // Línea en blanco
    
    // Validar módulo de orquestación
    const orchestrationValid = validateOrchestrationEnv();
    if (!orchestrationValid) allValid = false;
    
    console.log(''); // Línea en blanco
    
    // Probar conexiones
    await testConnections();
    
    console.log(''); // Línea en blanco
    
    if (allValid) {
        console.log('🎉 ¡Todas las validaciones pasaron exitosamente!');
        console.log('💡 El proyecto está listo para ejecutarse');
        process.exit(0);
    } else {
        console.error('❌ Algunas validaciones fallaron');
        console.log('💡 Revisa los errores arriba y corrige la configuración');
        process.exit(1);
    }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(error => {
        console.error('❌ Error inesperado:', error.message);
        process.exit(1);
    });
}

export { main as validateEnv }; 