// Dados fixos do cardápio usados na Home e no Detalhe.
// Estrutura: categoria MACRO -> categorias MICRO -> produtos.

// Monta a URL de uma foto do Unsplash a partir do id dela.
const foto = (id) => `https://images.unsplash.com/photo-${id}?w=600&q=80`;

// Categorias macro (lista horizontal de cima)
export const categoriasMacro = [
  { id: 'quentes', nome: 'Quentes', emoji: '☕' },
  { id: 'geladas', nome: 'Geladas', emoji: '🧊' },
  { id: 'salgados', nome: 'Salgados', emoji: '🥪' },
  { id: 'doces', nome: 'Doces', emoji: '🍰' },
];

// Categorias micro: cada uma aponta para a sua macro pelo campo macroId
export const categoriasMicro = [
  { id: 'cafes', macroId: 'quentes', nome: 'Cafés clássicos' },
  { id: 'especiais', macroId: 'quentes', nome: 'Cafés especiais' },
  { id: 'chas', macroId: 'quentes', nome: 'Chás' },

  { id: 'cafes-gelados', macroId: 'geladas', nome: 'Cafés gelados' },
  { id: 'shakes', macroId: 'geladas', nome: 'Frappés e shakes' },
  { id: 'refrescos', macroId: 'geladas', nome: 'Refrescos' },

  { id: 'sanduiches', macroId: 'salgados', nome: 'Sanduíches' },
  { id: 'padaria', macroId: 'salgados', nome: 'Padaria' },

  { id: 'bolos', macroId: 'doces', nome: 'Bolos' },
  { id: 'cookies', macroId: 'doces', nome: 'Cookies e cupcakes' },
  { id: 'sobremesas', macroId: 'doces', nome: 'Sobremesas' },
];

// Produtos: cada um pertence a uma categoria micro (microId).
// Quem tem precoPromocional aparece com o badge "Promoção".
export const produtos = [
  // ---------- Quentes ----------
  {
    id: '1',
    microId: 'cafes',
    nome: 'Espresso',
    descricao: 'Café curto e encorpado, extraído na hora com grãos 100% arábica torrados na casa.',
    preco: 6.5,
    imagem: foto('1514432324607-a09d9b4aefdd'),
  },
  {
    id: '2',
    microId: 'cafes',
    nome: 'Café coado',
    descricao: 'Coado no filtro de pano, do jeito tradicional. Suave, aromático e servido bem quente.',
    preco: 7.0,
    precoPromocional: 5.0,
    imagem: foto('1497515114629-f71d768fd07c'),
  },
  {
    id: '3',
    microId: 'cafes',
    nome: 'Café com leite',
    descricao: 'Metade café, metade leite vaporizado. Acompanha dois biscoitos amanteigados.',
    preco: 8.5,
    imagem: foto('1544787219-7f47ccb76574'),
  },
  {
    id: '4',
    microId: 'especiais',
    nome: 'Cappuccino',
    descricao: 'Espresso, leite vaporizado e uma camada generosa de espuma cremosa com canela.',
    preco: 12.0,
    imagem: foto('1572442388796-11668a67e53d'),
  },
  {
    id: '5',
    microId: 'especiais',
    nome: 'Latte',
    descricao: 'Espresso com bastante leite vaporizado e desenho de latte art feito pelo barista.',
    preco: 13.5,
    precoPromocional: 10.9,
    imagem: foto('1541167760496-1628856ab772'),
  },
  {
    id: '6',
    microId: 'especiais',
    nome: 'Flat white',
    descricao: 'Dose dupla de espresso com uma camada fina e aveludada de leite. Mais intenso que o latte.',
    preco: 14.0,
    imagem: foto('1534778101976-62847782c213'),
  },
  {
    id: '7',
    microId: 'chas',
    nome: 'Chá preto',
    descricao: 'Chá preto em folhas, servido com mel ou açúcar à parte.',
    preco: 7.5,
    imagem: foto('1571934811356-5cc061b6821f'),
  },
  {
    id: '8',
    microId: 'chas',
    nome: 'Chá de ervas',
    descricao: 'Infusão de camomila, erva-cidreira e hortelã, servida no bule para duas xícaras.',
    preco: 9.0,
    imagem: foto('1564890369478-c89ca6d9cde9'),
  },
  {
    id: '9',
    microId: 'chas',
    nome: 'Chai latte',
    descricao: 'Chá preto com especiarias (canela, cravo, gengibre e cardamomo) e leite vaporizado.',
    preco: 13.0,
    precoPromocional: 11.0,
    imagem: foto('1517487881594-2787fef5ebf7'),
  },

  // ---------- Geladas ----------
  {
    id: '10',
    microId: 'cafes-gelados',
    nome: 'Iced latte',
    descricao: 'Espresso, leite gelado e muito gelo. Refrescante para os dias quentes.',
    preco: 14.5,
    imagem: foto('1461023058943-07fcbe16d735'),
  },
  {
    id: '11',
    microId: 'cafes-gelados',
    nome: 'Iced mocha',
    descricao: 'Espresso com calda de chocolate meio amargo, leite gelado e gelo.',
    preco: 15.9,
    precoPromocional: 12.9,
    imagem: foto('1517701604599-bb29b565090c'),
  },
  {
    id: '12',
    microId: 'shakes',
    nome: 'Frappé de chocolate',
    descricao: 'Batido com gelo, chocolate belga, chantilly e farofa de biscoito.',
    preco: 18.9,
    imagem: foto('1563805042-7684c019e1cb'),
  },
  {
    id: '13',
    microId: 'shakes',
    nome: 'Milkshake da casa',
    descricao: 'Sorvete de baunilha batido com leite. Escolha a cobertura: morango, banana ou caramelo.',
    preco: 17.5,
    imagem: foto('1505252585461-04db1eb84625'),
  },
  {
    id: '14',
    microId: 'refrescos',
    nome: 'Suco de laranja',
    descricao: 'Laranjas espremidas na hora, sem açúcar e sem conservantes. 400 ml.',
    preco: 10.0,
    imagem: foto('1600271886742-f049cd451bba'),
  },
  {
    id: '15',
    microId: 'refrescos',
    nome: 'Chá gelado com limão',
    descricao: 'Chá preto gelado, rodelas de limão e um toque de hortelã.',
    preco: 9.5,
    precoPromocional: 7.5,
    imagem: foto('1556679343-c7306c1976bc'),
  },

  // ---------- Salgados ----------
  {
    id: '16',
    microId: 'sanduiches',
    nome: 'Misto quente',
    descricao: 'Pão de forma artesanal, presunto e queijo derretido, prensado na chapa.',
    preco: 12.0,
    imagem: foto('1528735602780-2552fd46c7af'),
  },
  {
    id: '17',
    microId: 'sanduiches',
    nome: 'Sanduíche natural',
    descricao: 'Pão integral, peito de peru, queijo branco, alface, tomate e cenoura.',
    preco: 16.0,
    precoPromocional: 13.5,
    imagem: foto('1553909489-cd47e0907980'),
  },
  {
    id: '19',
    microId: 'padaria',
    nome: 'Pão de fermentação natural',
    descricao: 'Pão rústico de longa fermentação, casca crocante e miolo macio. Unidade de 500 g.',
    preco: 18.0,
    imagem: foto('1509440159596-0249088772ff'),
  },
  {
    id: '20',
    microId: 'padaria',
    nome: 'Folhados variados',
    descricao: 'Seleção do dia com croissant, pain au chocolat e folhado de queijo (3 unidades).',
    preco: 21.0,
    precoPromocional: 17.9,
    imagem: foto('1568254183919-78a4f43a2877'),
  },
  {
    id: '21',
    microId: 'padaria',
    nome: 'Torrada com ovo',
    descricao: 'Pão de fermentação natural tostado, ovo frito com gema mole e ervas frescas.',
    preco: 15.0,
    imagem: foto('1525351484163-7529414344d8'),
  },

  // ---------- Doces ----------
  {
    id: '22',
    microId: 'bolos',
    nome: 'Bolo de chocolate',
    descricao: 'Massa fofinha de cacau com recheio e cobertura de brigadeiro. Fatia generosa.',
    preco: 14.0,
    imagem: foto('1578985545062-69928b1d9587'),
  },
  {
    id: '23',
    microId: 'bolos',
    nome: 'Bolo três camadas',
    descricao: 'Camadas de chocolate, doce de leite e baunilha com cobertura de chantilly.',
    preco: 16.5,
    imagem: foto('1586985289688-ca3cf47d3e6e'),
  },
  {
    id: '24',
    microId: 'bolos',
    nome: 'Brownie',
    descricao: 'Brownie de chocolate meio amargo, casquinha crocante e centro molhadinho.',
    preco: 9.0,
    precoPromocional: 7.0,
    imagem: foto('1606313564200-e75d5e30476c'),
  },
  {
    id: '25',
    microId: 'cookies',
    nome: 'Cookie com gotas',
    descricao: 'Cookie amanteigado com gotas de chocolate ao leite e meio amargo.',
    preco: 6.0,
    imagem: foto('1499636136210-6f4ee915583e'),
  },
  {
    id: '26',
    microId: 'cookies',
    nome: 'Cupcake de baunilha',
    descricao: 'Massa de baunilha com cobertura de buttercream e confeitos dourados.',
    preco: 8.5,
    imagem: foto('1576618148400-f54bed99fcfd'),
  },
  {
    id: '27',
    microId: 'cookies',
    nome: 'Donuts coloridos',
    descricao: 'Donuts com cobertura de chocolate e granulado colorido. Unidade.',
    preco: 7.9,
    precoPromocional: 5.9,
    imagem: foto('1551024601-bec78aea704b'),
  },
  {
    id: '18',
    microId: 'cookies',
    nome: 'Cupcake de chocolate',
    descricao: 'Massa de cacau, cobertura de creme de baunilha e biscoito recheado por cima.',
    preco: 9.5,
    imagem: foto('1612203985729-70726954388c'),
  },
  {
    id: '28',
    microId: 'sobremesas',
    nome: 'Crepe com morangos',
    descricao: 'Crepe doce recheado com creme, morangos frescos e chantilly.',
    preco: 19.0,
    imagem: foto('1587314168485-3236d6710814'),
  },
  {
    id: '29',
    microId: 'sobremesas',
    nome: 'Torta de chocolate',
    descricao: 'Base crocante de biscoito, ganache de chocolate e calda de caramelo.',
    preco: 15.5,
    imagem: foto('1607920591413-4ec007e70023'),
  },
];
