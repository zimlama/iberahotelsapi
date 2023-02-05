const hoteles = [
  {
    name: "hotel 1",
    id:1,
    address: "address one 123",
    city: "caba",
    state: "buenos aires",
    rooms: [
      {
        id:1,
        category: "low",
        price: "$50",
        img:"https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        qty: 2,
        rating: 4,
        specs: [
          {
            specOne: "low peasant room",
          },
        ],
      },
      {
        id:2,
        category: "med",
        price: "$250",
        img:"https://images.unsplash.com/photo-1444201983204-c43cbd584d93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        qty: 2,
        rating: 4,
        spects: [
          {
            specOne: "low peasant room",
          },
        ],
      },
      {
        id:3,
        category: "deluxe",
        price: "$1000",
        img:"https://images.unsplash.com/photo-1512918580421-b2feee3b85a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        qty: 4,
        rating: 5,
        spects: [
          {
            specOne: "high earners room",
          },
          {
            specTwo: "Great view",
          },
        ],
      },
    ],
    stars: 4,
    rating: 3.5,
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    specs: [
      {
        specOne: "Swimming pool",
      },
      {
        specTwo: "Private Restaurant",
      },
      {
        specThree:"Work Space"
      },
    ],
  },
  {
    name: "hotel 2",
    id:2,
    address: "address two 123",
    city: "cordoba",
    state: "cordoba",
    rooms: [
      {
        id:1,
        category: "low",
        price: "$50",
        img:"https://images.unsplash.com/photo-1512918580421-b2feee3b85a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        qty: 2,
        rating: 4,
        specs: [
          {
            specOne: "low peasant room",
          },
        ],
      },
      {
        id:2,
        category: "med",
        price: "$250",
        img:"https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        qty: 2,
        rating: 4,
        spects: [
          {
            specOne: "low peasant room",
          },
        ],
      },
      {
        id:3,
        category: "deluxe",
        price: "$1000",
        img:"https://images.unsplash.com/photo-1512918580421-b2feee3b85a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        qty: 4,
        rating: 5,
        spects: [
          {
            specOne: "high earners room",
          },
          {
            specTwo: "Great view",
          },
        ],
      },
    ],
    stars: 5,
    rating: 3.5,
    img:"https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    specs: [
      {
        specOne: "Swimming pool",
      },
      {
        specTwo: "Irish Bar",
      },
      {
        specThree:"yoga room"
      },
    ],
  },
];
module.exports = hoteles;