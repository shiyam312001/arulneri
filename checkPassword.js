const bcrypt = require('bcryptjs');

const hash = '$2b$12$v47fbER3hP0ApJQI8XCwhu6ZKm5hAODXvqoxJtuqYjf/x4FkC1iUa';
const inputPassword = 'ADMIN123@'; // Replace with your guessed password

bcrypt.compare(inputPassword, hash, (err, res) => {
  if (err) {
    console.error('Error comparing:', err);
    return;
  }

  if (res) {
    console.log('✅ Password match!');
  } else {
    console.log('❌ No match.');
  }
});
