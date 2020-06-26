//Serve para formatar o texto e a String recebida
//do backend não ficar toda contínua
module.exports = function stringRefactor(word) {
    return word
      .split("_")
      .map((e) => e.substring(0, 1) + e.substring(1).toLowerCase())
      .join(" ");
};