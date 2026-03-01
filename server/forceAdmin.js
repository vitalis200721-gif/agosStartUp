require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to DB successfully!');
    
    // Update all users to admin (or just the specific one)
    const res = await User.updateMany({}, { role: 'admin' });
    console.log(`Elevated ${res.modifiedCount} users to Admin.`);
    
    // Also reset the password to Agos123! just in case they need to log in manually
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('Agos123!', salt);
    
    const u = await User.findOneAndUpdate(
      { email: 'bolsakovasvitalijus@gmail.com' },
      { role: 'admin', password: password },
      { new: true }
    );
    
    console.log('User role is now:', u ? u.role : 'NOT FOUND');
    console.log('Password reset to: Agos123!');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('DB Error:', err);
    process.exit(1);
  });
