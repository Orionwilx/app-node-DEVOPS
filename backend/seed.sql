-- ================================================
-- DATOS DE PRUEBA PARA LA BASE DE DATOS
-- ================================================
-- Ejecuta este script para poblar la base de datos
-- con datos de ejemplo
-- ================================================

-- Asegúrate de estar usando la base de datos correcta
USE node;

-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, createdAt, updatedAt) VALUES
('Laptop HP Pavilion', 'Laptop para desarrollo con 16GB RAM y 512GB SSD', 850000.00, NOW(), NOW()),
('Mouse Logitech MX Master 3', 'Mouse inalámbrico ergonómico para productividad', 95000.00, NOW(), NOW()),
('Teclado Mecánico Keychron K2', 'Teclado mecánico compacto con switches Cherry MX', 125000.00, NOW(), NOW()),
('Monitor LG 27"', 'Monitor 4K UHD de 27 pulgadas IPS', 420000.00, NOW(), NOW()),
('Webcam Logitech C920', 'Webcam Full HD 1080p para videoconferencias', 85000.00, NOW(), NOW()),
('Auriculares Sony WH-1000XM4', 'Auriculares inalámbricos con cancelación de ruido', 350000.00, NOW(), NOW()),
('Escritorio Ajustable', 'Escritorio de altura ajustable eléctrico', 450000.00, NOW(), NOW()),
('Silla Ergonómica Herman Miller', 'Silla de oficina ergonómica premium', 1200000.00, NOW(), NOW()),
('Disco Duro Externo 2TB', 'Disco duro portátil USB 3.0 de 2TB', 75000.00, NOW(), NOW()),
('Router WiFi 6 TP-Link', 'Router de alta velocidad con WiFi 6', 145000.00, NOW(), NOW());

-- Verificar que se insertaron correctamente
SELECT * FROM products;

-- Estadísticas
SELECT
    COUNT(*) as total_productos,
    MIN(price) as precio_minimo,
    MAX(price) as precio_maximo,
    AVG(price) as precio_promedio
FROM products;
