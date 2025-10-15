const { Basket, addToBasket, removeFromBasket, transactionAllowed, payBasket } = require('./ecommerce');

// 1 Test unitaire : testAdd()
test('testAdd() - ajoute un produit au panier et vérifie le montant total', () => {
  const basket = new Basket();
  const item = { name: 'Carte mère', price: 100 };

  addToBasket(basket, item);

  expect(basket.totalPrice).toBe(100);
  expect(basket.items).toContainEqual(item);
});


// 2 Test unitaire : testRemove()
test('testRemove() - supprime un produit du panier et vérifie le montant total', () => {
  const basket = new Basket();
  const item = { name: 'Carte mère', price: 100 };

  addToBasket(basket, item);
  removeFromBasket(basket, item);

  expect(basket.items.length).toBe(0);
  expect(basket.totalPrice).toBe(0);
});

// Question 3 Test factorisé : testAddRemove()
test('testAddRemove() - ajoute puis supprime un produit et vérifie le total', () => {
  const basket = new Basket();
  const item = { name: 'Carte mère', price: 100 };

  
  addToBasket(basket, item);
  expect(basket.items).toContainEqual(item);
  expect(basket.totalPrice).toBe(100);

  removeFromBasket(basket, item);
  expect(basket.items.length).toBe(0);
  expect(basket.totalPrice).toBe(0);
});

// 4 Test unitaire : testTransactionAllowed()
test('testTransactionAllowed() - vérifie que la transaction est autorisée ou refusée selon le solde', () => {
  const user = { name: 'Perceval', balance: 500 };

  const allowed = transactionAllowed(user, 400);
  expect(allowed).toBe(true);

  const refused = transactionAllowed(user, 600);
  expect(refused).toBe(false);
});


test(' testPayBasket() - vérifie le bon déroulement d’un paiement', () => {
   const user = { name: 'Perceval', balance: 500 };

  // Création d’un panier avec un produit coûtant 300 €
  const basket = new Basket();
  const item = { name: 'Carte graphique', price: 300 };
  addToBasket(basket, item);

  payBasket(user, basket);
  expect(user.balance).toBe(200);
  expect(basket.totalPrice).toBe(300);

  payBasket(user, basket);
  expect(user.balance).toBe(200);
})