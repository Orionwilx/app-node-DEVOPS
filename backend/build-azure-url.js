// Script para construir la DATABASE_URL de Azure PostgreSQL

console.log('='.repeat(60));
console.log('CONSTRUCTOR DE URL PARA AZURE POSTGRESQL');
console.log('='.repeat(60));
console.log('');

// Información que necesitas de Azure Portal
console.log('📝 Información que necesitas de Azure Portal:');
console.log('   Ve a: Azure Portal > Tu Servidor PostgreSQL > Connection strings');
console.log('');

// Datos conocidos
const username = 'root1';
const password = 'Contraseña2';
const port = '5432';
const database = 'postgres'; // Por defecto, puede ser otro

console.log('✅ Datos conocidos:');
console.log(`   Usuario: ${username}`);
console.log(`   Contraseña: ${password}`);
console.log(`   Puerto: ${port}`);
console.log(`   Base de datos: ${database} (puede variar)`);
console.log('');

console.log('❓ Datos que necesitas encontrar en Azure:');
console.log('   1. Nombre del servidor (ejemplo: miservidor)');
console.log('   2. Host completo (ejemplo: miservidor.postgres.database.azure.com)');
console.log('');

console.log('💡 IMPORTANTE: Azure PostgreSQL requiere el formato:');
console.log('   Usuario: root1@NOMBRESERVIDOR');
console.log('   (donde NOMBRESERVIDOR es el nombre de tu servidor sin .postgres.database.azure.com)');
console.log('');

// URL-encode la contraseña
function encodePassword(pwd) {
  return encodeURIComponent(pwd);
}

const encodedPassword = encodePassword(password);

console.log('🔒 Contraseña URL-encoded:');
console.log(`   Original: ${password}`);
console.log(`   Codificada: ${encodedPassword}`);
console.log('');

console.log('📌 EJEMPLO de URL (reemplaza NOMBRESERVIDOR con tu servidor):');
console.log('');
const exampleServerName = 'miservidor';
const exampleHost = `${exampleServerName}.postgres.database.azure.com`;
const exampleUrl = `postgresql://${username}%40${exampleServerName}:${encodedPassword}@${exampleHost}:${port}/${database}?sslmode=require`;

console.log(`DATABASE_URL="${exampleUrl}"`);
console.log('');

console.log('⚠️  NOTA: El símbolo @ del usuario también está codificado como %40');
console.log('');

console.log('📋 PLANTILLA para copiar y pegar (reemplaza NOMBRESERVIDOR):');
console.log('');
console.log(`DATABASE_URL="postgresql://root1%40NOMBRESERVIDOR:${encodedPassword}@NOMBRESERVIDOR.postgres.database.azure.com:5432/postgres?sslmode=require"`);
console.log('');

console.log('='.repeat(60));
console.log('PASOS SIGUIENTES:');
console.log('='.repeat(60));
console.log('');
console.log('1. Ve a Azure Portal y encuentra el nombre de tu servidor');
console.log('2. Reemplaza NOMBRESERVIDOR en la URL de arriba');
console.log('3. Copia la URL completa al archivo backend/.env');
console.log('4. Ejecuta: npx prisma generate');
console.log('5. Ejecuta: npx prisma migrate deploy');
console.log('');
