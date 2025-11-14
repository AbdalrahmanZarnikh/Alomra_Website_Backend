const generateVCard = (user) => {
  const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${user.name}
TEL:${user.phone}
END:VCARD
  `.trim();

  return vCard;
};

module.exports = { generateVCard };
