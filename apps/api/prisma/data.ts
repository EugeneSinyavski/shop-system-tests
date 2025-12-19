import { Category, Role } from '@prisma/client';

export const adminUser = {
    email: 'admin@test.com',
    username: 'admin',
    firstname: 'Admin',
    lastname: 'User',
    role: Role.ADMIN,
    password: 'admin123',
};

export const regularUsers = [
    { email: 'user1@test.com', username: 'user1', firstname: 'John', lastname: 'Doe', role: Role.USER },
    { email: 'user2@test.com', username: 'user2', firstname: 'Jane', lastname: 'Smith', role: Role.USER },
];

export const staticProducts = [
    // --- ELECTRONICS (17 items) ---
    { name: 'iPhone 15 Pro', description: 'Apple flagship smartphone.', price: 999.99, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=500' },
    { name: 'MacBook Air M2', description: 'Thin and light laptop.', price: 1199.00, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1611186871348-b1ec696e5237?q=80&w=500' },
    { name: 'Sony WH-1000XM5', description: 'Noise canceling headphones.', price: 349.50, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1613665813446-82a78c44b8fe?q=80&w=500' },
    { name: 'iPad Pro 11', description: 'M2 chip performance.', price: 799.00, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=500' },
    { name: 'Samsung S23 Ultra', description: '200MP camera smartphone.', price: 1199.99, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=500' },
    { name: 'Logitech MX Master 3S', description: 'Wireless performance mouse.', price: 99.00, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1625773143851-4f16a04e8d35?q=80&w=500' },
    { name: 'Keychron K2', description: 'Mechanical keyboard.', price: 79.99, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=500' },
    { name: 'Nintendo Switch OLED', description: 'Handheld gaming console.', price: 349.00, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=500' },
    { name: 'Apple Watch S9', description: 'Advanced health features.', price: 399.00, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=500' },
    { name: 'Kindle Paperwhite', description: '6.8-inch e-reader.', price: 139.99, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1592434134753-a70baf7979d7?q=80&w=500' },
    { name: 'GoPro HERO12', description: '5.3K action camera.', price: 399.00, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1565349173908-1e6492875503?q=80&w=500' },
    { name: 'Bose SoundLink', description: 'Bluetooth speaker.', price: 129.00, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=500' },
    { name: 'Razer DeathAdder V3', description: 'Wired gaming mouse.', price: 69.99, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=500' },
    { name: 'SteelSeries Headset', description: 'Gaming wireless audio.', price: 179.99, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=500' },
    { name: 'Dell UltraSharp', description: '4K USB-C monitor.', price: 650.00, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=500' },
    { name: 'Surface Pro 9', description: '2-in-1 tablet laptop.', price: 999.00, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1664447972888-005d5272a912?q=80&w=500' },
    { name: 'DJI Mini 3 Pro', description: 'Lightweight camera drone.', price: 759.00, category: Category.ELECTRONICS, urlImage: 'https://images.unsplash.com/photo-1527977966376-1c841de9d21a?q=80&w=500' },

    // --- BOOKS (17 items) ---
    { name: 'Clean Code', description: 'Agile Craftsmanship book.', price: 42.00, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=500' },
    { name: 'Refactoring', description: 'Martin Fowler classics.', price: 50.00, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=500' },
    { name: 'Design Patterns', description: 'Gang of Four guide.', price: 55.00, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=500' },
    { name: 'Eloquent JavaScript', description: 'Modern JS introduction.', price: 32.00, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=500' },
    { name: 'The Silent Patient', description: 'Psychological thriller.', price: 18.00, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=500' },
    { name: 'Atomic Habits', description: 'James Clear self-help.', price: 22.00, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=500' },
    { name: 'Great Gatsby', description: 'Classic F. Scott Fitzgerald.', price: 12.50, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1543004218-283020ee3fdf?q=80&w=500' },
    { name: '1984 George Orwell', description: 'Dystopian fiction.', price: 14.99, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=500' },
    { name: 'Brave New World', description: 'Aldous Huxley classic.', price: 15.50, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=500' },
    { name: 'Cracking Interview', description: 'Coding interview prep.', price: 35.00, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=500' },
    { name: 'Domain Driven Design', description: 'Eric Evans complexity.', price: 60.00, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=500' },
    { name: 'Clean Architecture', description: 'Uncle Bob software structure.', price: 38.00, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=500' },
    { name: 'Effective Java', description: 'Best Java practices.', price: 48.00, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500' },
    { name: 'Pragmatic Programmer', description: 'Journey to mastery.', price: 45.00, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=500' },
    { name: 'Continuous Delivery', description: 'Reliable software releases.', price: 52.00, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=500' },
    { name: 'TDD by Example', description: 'Kent Beck guidance.', price: 40.00, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=500' },
    { name: 'Mythical Man-Month', description: 'Software engineering essays.', price: 33.00, category: Category.BOOKS, urlImage: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=500' },

    // --- CLOTHING (16 items) ---
    { name: 'Levi 501 Original', description: 'Classic straight jeans.', price: 89.90, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500' },
    { name: 'Nike Air Force 1', description: 'Legendary white sneakers.', price: 110.00, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=500' },
    { name: 'North Face Jacket', description: 'Windproof outdoor shell.', price: 199.00, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=500' },
    { name: 'Cotton T-Shirt', description: 'Organic cotton black tee.', price: 15.00, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500' },
    { name: 'Adidas Ultraboost', description: 'Running comfort shoes.', price: 180.00, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=500' },
    { name: 'Uniqlo Oxford', description: 'Classic formal shirt.', price: 39.90, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c717658?q=80&w=500' },
    { name: 'Patagonia Vest', description: 'Water-resistant outdoor vest.', price: 149.00, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1620706821791-031e9c20a1bc?q=80&w=500' },
    { name: 'Ray-Ban Wayfarer', description: 'Classic daily sunglasses.', price: 160.00, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500' },
    { name: 'Champion Hoodie', description: 'Heavyweight reverse hoodie.', price: 65.00, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500' },
    { name: 'Dickies 874', description: 'Durable work trousers.', price: 45.00, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=500' },
    { name: 'Timberland Boots', description: 'Waterproof 6-inch boots.', price: 190.00, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=500' },
    { name: 'Lacoste Polo', description: 'Petit piqué cotton polo.', price: 95.00, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=500' },
    { name: 'Vans Old Skool', description: 'Classic skate canvas shoes.', price: 60.00, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=500' },
    { name: 'Leather Belt', description: 'Handcrafted genuine leather.', price: 35.00, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1624222247344-550fbadfd08e?q=80&w=500' },
    { name: 'Knit Beanie', description: 'Soft wool blend beanie.', price: 19.99, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1576871337622-98d48d895e7e?q=80&w=500' },
    { name: 'Denim Jacket', description: 'Classic blue trucker jacket.', price: 75.00, category: Category.CLOTHING, urlImage: 'https://images.unsplash.com/photo-1576995811123-538306290040?q=80&w=500' },
];
