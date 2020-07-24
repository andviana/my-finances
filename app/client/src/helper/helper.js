export const calculateSummary = (transactions) => {
  const receitas = transactions.reduce(
    (acc, curr) => (curr.type === '+' ? (acc += curr.value) : acc),
    0
  );
  const despesas = transactions.reduce(
    (acc, curr) => (curr.type === '-' ? (acc += curr.value) : acc),
    0
  );
  const saldo = receitas - despesas;
  const lancamentos = transactions.length;
  return { receitas, despesas, saldo, lancamentos };
};
