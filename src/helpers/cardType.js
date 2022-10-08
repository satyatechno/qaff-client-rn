const visaRegex = /^4[0-9]{0,}$/;
const masterCardRegex = /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$/;
const maestroCardRegex = /^(5[06789]|6)[0-9]{0,}$/;
export const cardType = (value) => {
  let trimmedValue = value.replace(/\s/g, '');
  let cardName = '';
  if (visaRegex.test(trimmedValue)) cardName = 'VISA';
  else if (masterCardRegex.test(trimmedValue)) cardName = 'MASTER';
  else if (maestroCardRegex.test(trimmedValue)) cardName = 'MAESTRO';
  else cardName = 'UNKNOWN';

  return cardName;
};
