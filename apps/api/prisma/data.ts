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
    { name: 'iPhone 15 Pro', description: 'Apple flagship smartphone with Titanium design.', price: 999.99, category: Category.ELECTRONICS },
    { name: 'MacBook Air M2', description: 'Thin and light laptop with powerful M2 chip.', price: 1199.00, category: Category.ELECTRONICS },
    { name: 'Sony WH-1000XM5', description: 'Industry-leading noise canceling headphones.', price: 349.50, category: Category.ELECTRONICS },
    { name: 'iPad Pro 11-inch', description: 'Next-generation M2 chip performance.', price: 799.00, category: Category.ELECTRONICS },
    { name: 'Samsung Galaxy S23 Ultra', description: 'Android phone with 200MP camera.', price: 1199.99, category: Category.ELECTRONICS },
    { name: 'Dell XPS 15', description: 'High-performance laptop for creators.', price: 1599.00, category: Category.ELECTRONICS },
    { name: 'Logitech MX Master 3S', description: 'Performance wireless mouse.', price: 99.00, category: Category.ELECTRONICS },
    { name: 'Keychron K2 Keyboard', description: 'Mechanical keyboard for Mac and Windows.', price: 79.99, category: Category.ELECTRONICS },
    { name: 'ASUS ROG Swift Monitor', description: '32-inch 4K gaming monitor.', price: 899.00, category: Category.ELECTRONICS },
    { name: 'Apple Watch Series 9', description: 'Advanced health features and faster chip.', price: 399.00, category: Category.ELECTRONICS },
    { name: 'Nintendo Switch OLED', description: 'Gaming console with vibrant OLED screen.', price: 349.00, category: Category.ELECTRONICS },
    { name: 'GoPro HERO12', description: 'Action camera with 5.3K video resolution.', price: 399.99, category: Category.ELECTRONICS },
    { name: 'Kindle Paperwhite', description: 'E-reader with 6.8-inch display.', price: 139.00, category: Category.ELECTRONICS },
    { name: 'Bose SoundLink Speaker', description: 'Portable Bluetooth speaker.', price: 129.00, category: Category.ELECTRONICS },
    { name: 'Razer DeathAdder V3', description: 'Ultra-lightweight gaming mouse.', price: 69.99, category: Category.ELECTRONICS },
    { name: 'SteelSeries Arctis Nova', description: 'Wireless gaming headset.', price: 179.99, category: Category.ELECTRONICS },
    { name: 'Microsoft Surface Pro 9', description: 'Versatile 2-in-1 laptop-tablet.', price: 999.00, category: Category.ELECTRONICS },

    // --- BOOKS (17 items) ---
    { name: 'Clean Code', description: 'A Handbook of Agile Software Craftsmanship.', price: 42.00, category: Category.BOOKS },
    { name: 'The Pragmatic Programmer', description: 'Your journey to mastery.', price: 45.00, category: Category.BOOKS },
    { name: 'Refactoring', description: 'Improving the Design of Existing Code.', price: 50.00, category: Category.BOOKS },
    { name: 'JavaScript: The Good Parts', description: 'Learning the core of JS.', price: 29.99, category: Category.BOOKS },
    { name: 'Introduction to Algorithms', description: 'Comprehensive guide to algorithms.', price: 85.00, category: Category.BOOKS },
    { name: 'Structure and Interpretation', description: 'Computer Programs classic.', price: 65.00, category: Category.BOOKS },
    { name: 'Design Patterns', description: 'Elements of Reusable Object-Oriented Software.', price: 55.00, category: Category.BOOKS },
    { name: 'Cracking the Coding Interview', description: '189 Programming Questions.', price: 35.00, category: Category.BOOKS },
    { name: 'Effective Java', description: 'Best practices for the Java platform.', price: 48.00, category: Category.BOOKS },
    { name: 'Eloquent JavaScript', description: 'A Modern Introduction to Programming.', price: 32.00, category: Category.BOOKS },
    { name: 'You Don\'t Know JS', description: 'Up & Going deep dive.', price: 25.00, category: Category.BOOKS },
    { name: 'The Art of Computer Programming', description: 'Fundamental Algorithms.', price: 190.00, category: Category.BOOKS },
    { name: 'Domain-Driven Design', description: 'Tackling Complexity in Software.', price: 60.00, category: Category.BOOKS },
    { name: 'Clean Architecture', description: 'A Craftsman\'s Guide to Software Structure.', price: 38.00, category: Category.BOOKS },
    { name: 'Test Driven Development', description: 'By Example by Kent Beck.', price: 40.00, category: Category.BOOKS },
    { name: 'Patterns of Enterprise Architecture', description: 'Solutions for common problems.', price: 58.00, category: Category.BOOKS },
    { name: 'Continuous Delivery', description: 'Reliable Software Releases.', price: 52.00, category: Category.BOOKS },

    // --- CLOTHING (16 items) ---
    { name: 'Levi\'s 501 Original', description: 'Classic straight fit jeans.', price: 89.90, category: Category.CLOTHING },
    { name: 'Nike Air Force 1', description: 'Legendary sneakers with air cushioning.', price: 110.00, category: Category.CLOTHING },
    { name: 'The North Face Jacket', description: 'Waterproof and windproof shell.', price: 199.00, category: Category.CLOTHING },
    { name: 'Cotton T-Shirt Black', description: '100% organic cotton basic tee.', price: 15.00, category: Category.CLOTHING },
    { name: 'Adidas Ultraboost', description: 'Comfortable running shoes.', price: 180.00, category: Category.CLOTHING },
    { name: 'Uniqlo Oxford Shirt', description: 'Long-sleeve formal cotton shirt.', price: 39.90, category: Category.CLOTHING },
    { name: 'Carhartt Beanie', description: 'Classic acrylic watch hat.', price: 20.00, category: Category.CLOTHING },
    { name: 'Patagonia Nano Puff', description: 'Warm, windproof, water-resistant vest.', price: 149.00, category: Category.CLOTHING },
    { name: 'Ray-Ban Wayfarer', description: 'Classic sunglasses for daily wear.', price: 160.00, category: Category.CLOTHING },
    { name: 'Champion Hoodie', description: 'Reverse weave heavy hoodie.', price: 65.00, category: Category.CLOTHING },
    { name: 'Hanes Crew Socks', description: 'Pack of 6 cushioned socks.', price: 12.00, category: Category.CLOTHING },
    { name: 'Dickies 874 Pants', description: 'Durable work trousers.', price: 45.00, category: Category.CLOTHING },
    { name: 'Puma Suede Classic', description: 'Retro lifestyle sneakers.', price: 75.00, category: Category.CLOTHING },
    { name: 'Timberland 6-Inch Boot', description: 'Original waterproof work boot.', price: 190.00, category: Category.CLOTHING },
    { name: 'Lacoste Polo Shirt', description: 'Classic petit piqué cotton polo.', price: 95.00, category: Category.CLOTHING },
    { name: 'Vans Old Skool', description: 'Classic skate shoes.', price: 60.00, category: Category.CLOTHING }
];
