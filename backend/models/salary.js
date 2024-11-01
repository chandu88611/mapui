import mongoose from 'mongoose';

const salarySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // Other fields related to salary as needed
});

const Salary = mongoose.model('Salary', salarySchema);

export default Salary;
