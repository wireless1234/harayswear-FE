export const tabs= [
  {
    "id": 4,
    "name": "Mains",
    "description": ""
  },
  {
    "id": 5,
    "name": "Small Plates",
    "description": ""
  },
  {
    "id": 6,
    "name": "Burgers",
    "description": ""
  },
  {
    "id": 7,
    "name": "Grill",
    "description": ""
  }
    
  ]

export interface Product {
    id: number;
    name: string;
    short_description: string;
    price: number;
    discounted_price: number | null;
    stock: number;
    category: {
      id: number;
      name: string;
      description: string | null;
    };
    brand: {
      id: number;
      name: string;
      logo: string;
    };
    images: string | null;
  }
  
  // export interface Product{
  //   id: number;
  //   name: string;
  //   short_description: string;
  //   price: number;
  //   discounted_price?: number | null;
  //   tax: number;
  //   stock: number;
  //   category: {
  //     id: number;
  //     name: string;
  //     description?: string | null;
  //   };
  //   brand: {
  //     id: number;
  //     name: string;
  //     description?: string;
  //     logo?: string | null;
  //   };
  //   images?: string | null;
  // };