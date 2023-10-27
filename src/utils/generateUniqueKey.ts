export const generateUniqueKey = (length: number = 6): string => {
  if (length < 1) {
    throw new Error("Invalid length parameter");
  }

  // Définir tous les caractères possibles qui pourraient faire partie de la clé
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let uniqueKey = "#";
  for (let i = 0; i < length; i++) {
    // Sélectionner un caractère au hasard parmi les caractères possibles
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueKey += characters.charAt(randomIndex);
  }

  return uniqueKey;
};
