module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    description: { type: String, required: true },
    value: { type: Number, required: true },
    category: { type: String, required: true },
    year: { type: Number, required: true },
    month: {
      type: Number,
      required: true,
      min: [1, 'informe o mês entre 1 e 12'],
      max: [12, 'informe o mês entre 1 e 12'],
    },
    day: {
      type: Number,
      required: true,
      min: [1, 'informe o dia entre 1 e 31'],
      max: [31, 'informe o mês entre 1 e 31'],
    },
    yearMonth: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{4}-\d{2}/.test(v);
        },
        message: (props) =>
          `${props.value} inválido. Informe campo no formato yyyy-mm`,
      },
    },
    yearMonthDay: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{4}-\d{2}-\d{2}/.test(v);
        },
        message: (props) =>
          `${props.value} inválido. Informe campo no formato yyyy-mm-dd`,
      },
    },
    type: { type: String, required: true },
  });

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Transaction = mongoose.model('transaction', schema);

  return Transaction;
};

// module.exports = TransactionModel;
