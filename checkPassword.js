const bcrypt = require('bcryptjs');

const hash = '$2b$10$DLP0RLk.QIEL0H6HOFrIgucuSNxe.V/HApi53oKVJZlZwceJOpy76';
const inputPassword = 'Deepan@123'; 

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

