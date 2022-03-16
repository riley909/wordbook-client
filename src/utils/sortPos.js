export const sortPos = (pos) => {
  switch (pos) {
    case '명사':
      return 'Nomina';
    case '동사':
      return 'Verba';
    case '부사':
      return 'Adverbia';
    case '형용사':
      return 'Adjektiva';
    case '수사':
      return 'Numeralia';
    case '관형사':
      return 'Pewatas';
    case '접사':
      return 'Imbuhan';
    case '어미':
      return 'Akhiran';
    case '의존 명사':
      return 'Nomina bentuk terikat';
    case '조사':
      return 'Partikel';
    case '품사 없음':
      return 'Tidak Berkelas Kata';
    default:
      return null;
  }
};
