const seed = require('./seed');

// Run the seed function
try {
    seed();
} catch (err) {
    console.log(err);
}
