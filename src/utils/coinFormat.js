import "intl";

//Devolve um número formatado com tipo de moeda
//consoante a coin que o utilizador recebeu
//caso o utilizador nao possua coin
// o dolar é o default para a currency
//ao ser chamada a função
function coinFormat(coin, currency) {
  return Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(coin);
}

export default coinFormat;
