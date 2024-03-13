const months = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
};

const printDate = (d) => {
  const date = new Date(d);
  return (
    <>
      {date.getDate()} &#183; {months[date.getMonth()]} &#183;{' '}
      {date.getFullYear()}
    </>
  );
};

export default printDate;
