const bcrypt = require('bcryptjs');

async function main() {
    const hash = '$2b$10$YpLZg7YeCV7tzTUbqZ/J5e9s2GGxY9qJ/IHItzOXYoVfem/EBrEl2';
    const password = 'admin123';

    const match = await bcrypt.compare(password, hash);
    console.log(`Password matches: ${match}`);
}

main();
