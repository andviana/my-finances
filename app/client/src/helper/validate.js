export const transactionValidate = (body) => {
  const messageError = [];
  if (!body) messageError.push('Nenhum dado informado para cadastro');
  else {
    const { description, value, category, year, month, day, type } = body;

    if (!description || toString(description).trim === '')
      messageError.push('Campo descrição inválido');

    if (!value || isNaN(Number(value)) || Number(value) < 0)
      messageError.push('Campo valor inválido');

    if (!year || isNaN(Number(year)) || Number(year) < 1000)
      messageError.push('Campo ano inválido');

    if (
      !month ||
      isNaN(Number(month)) ||
      Number(month) < 1 ||
      Number(month) > 12
    )
      messageError.push('Campo mês inválido');

    if (!day || isNaN(Number(day)) || Number(day) < 1 || Number(day) > 31)
      messageError.push('Campo dia inválido');

    if (!category || toString(category).trim === '')
      messageError.push('Campo categoria inválido');

    if (!type || toString(type).trim === '')
      messageError.push('Campo tipo inválido');
  }

  return messageError.length > 0 ? messageError : null;
};
