import { PrismaClient } from '@prisma/client';

/**
 * Configuración de la conexión a la base de datos
 * Prisma maneja automáticamente la conexión según DATABASE_URL en .env
 */

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // En desarrollo, reutilizar la instancia para evitar múltiples conexiones
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  prisma = global.prisma;
}

/**
 * Función para verificar la conexión a la base de datos
 */
export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Conexión a la base de datos establecida');
    console.log(`📊 Proveedor: ${process.env.DATABASE_PROVIDER}`);
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

/**
 * Función para cerrar la conexión a la base de datos
 */
export const disconnectDatabase = async () => {
  await prisma.$disconnect();
  console.log('🔌 Desconectado de la base de datos');
};

export default prisma;
