import { prismaClient } from '@/shared/lib/prismaClient';


async function main() {
  const products = [
    {
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: "109", // Store price as an integer (cents)
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    },
    {
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: "22", // Store price as an integer (cents)
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    },
    {
      title: "Mens Cotton Jacket",
      price: "55",
      description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    },
    {
      title: "Mens Casual Slim Fit",
      price: "15",
      description: "The color could be slightly different between on the screen and in practice.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    },
    {
      title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: "69",
      description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    },
    {
      title: "Solid Gold Petite Micropave",
      price: "16",
      description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    },
    {
      title: "White Gold Plated Princess",
      price: "9",
      description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    },
    {
      title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
      price: "10",
      description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    },
    {
      title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
      price: "64",
      description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    },
    {
      title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
      price: "10",
      description: "Easy upgrade for faster boot up, shutdown, application load and response.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    },
    {
      title: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
      price: "10",
      description: "3D NAND flash are applied to deliver high transfer speeds.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    },
    {
      title: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
      price: "11",
      description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    },
    {
      title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
      price: "59",
      description: "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    },
    {
      title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA)",
      price: "99",
      description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    },
    {
      id: 15,
      title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
      price: "56",
      description: "Note: The Jackets is US standard size, Please choose size as your usual wear.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    },
    {
      title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
      price: "29",
      description: "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER).",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    },
    {
      title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
      price: "39",
      description: "Lightweight perfect for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    },
    {
      title: "MBJ Women's Solid Short Sleeve Boat Neck V",
      price: "98",
      description: "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    },
    {
      title: "Opna Women's Short Sleeve Moisture",
      price: "79",
      description: "100% Polyester, Machine wash, 100% cationic polyester interlock.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    },
    {
      title: "DANVOUY Womens T Shirt Casual Cotton Short",
      price: "12",
      description: "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    },
  ];

  for (const product of products) {
    await prismaClient.product.create({
      data: product,
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
