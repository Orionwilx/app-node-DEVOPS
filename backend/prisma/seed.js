import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    name: 'Laptop HP Pavilion',
    description: 'Laptop para desarrollo con 16GB RAM y 512GB SSD',
    price: 850000.0,
  },
  {
    name: 'Mouse Logitech MX Master 3',
    description: 'Mouse inalámbrico ergonómico para productividad',
    price: 95000.0,
  },
  {
    name: 'Teclado Mecánico Keychron K2',
    description: 'Teclado mecánico compacto con switches Cherry MX',
    price: 125000.0,
  },
  {
    name: 'Monitor LG 27"',
    description: 'Monitor 4K UHD de 27 pulgadas IPS',
    price: 420000.0,
  },
  {
    name: 'Webcam Logitech C920',
    description: 'Webcam Full HD 1080p para videoconferencias',
    price: 85000.0,
  },
  {
    name: 'Auriculares Sony WH-1000XM4',
    description: 'Auriculares inalámbricos con cancelación de ruido',
    price: 350000.0,
  },
  {
    name: 'Escritorio Ajustable',
    description: 'Escritorio de altura ajustable eléctrico',
    price: 450000.0,
  },
  {
    name: 'Silla Ergonómica Herman Miller',
    description: 'Silla de oficina ergonómica premium',
    price: 1200000.0,
  },
  {
    name: 'Disco Duro Externo 2TB',
    description: 'Disco duro portátil USB 3.0 de 2TB',
    price: 75000.0,
  },
  {
    name: 'Router WiFi 6 TP-Link',
    description: 'Router de alta velocidad con WiFi 6',
    price: 145000.0,
  },
];

async function main() {
  console.log('🌱 Iniciando seed...\n');

  // Limpiar datos existentes (opcional)
  console.log('🗑️  Limpiando productos existentes...');
  await prisma.product.deleteMany();
  console.log('✅ Productos eliminados\n');

  // Insertar productos
  console.log('📦 Insertando productos...');
  for (const product of products) {
    const created = await prisma.product.create({
      data: product,
    });
    console.log(`  ✓ Creado: ${created.name} - ₡${created.price}`);
  }

  console.log('\n✅ Seed completado exitosamente!');

  // Mostrar estadísticas
  const count = await prisma.product.count();
  const stats = await prisma.product.aggregate({
    _min: { price: true },
    _max: { price: true },
    _avg: { price: true },
  });

  console.log('\n📊 Estadísticas:');
  console.log(`  Total de productos: ${count}`);
  console.log(`  Precio mínimo: ₡${stats._min.price}`);
  console.log(`  Precio máximo: ₡${stats._max.price}`);
  console.log(`  Precio promedio: ₡${stats._avg.price?.toFixed(2)}`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
