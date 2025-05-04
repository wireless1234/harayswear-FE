export const tabs= [
    {
      "id": 1,
      "name": "Small Plates",
      "description": null,
      "logo": null
    },
    {
      "id": 2,
      "name": "Mains",
      "description": null,
      "logo": null
    },
    {
      "id": 3,
      "name": "Burgers",
      "description": null,
      "logo": null
    },
    {
      "id": 4,
      "name": "Grill",
      "description": null,
      "logo": null
    },
    
  ]

// export interface Product {
//     id: number;
//     name: string;
//     short_description: string;
//     price: number;
//     discounted_price: number | null;
//     stock: number;
//     category: {
//       id: number;
//       name: string;
//       description: string | null;
//     };
//     brand: {
//       id: number;
//       name: string;
//       logo: string;
//     };
//     images: string | null;
//   }
  
  export interface Product{
    id: number;
    name: string;
    short_description: string;
    price: number;
    discounted_price?: number | null;
    tax: number;
    stock: number;
    category: {
      id: number;
      name: string;
      description?: string | null;
    };
    brand: {
      id: number;
      name: string;
      description?: string;
      logo?: string | null;
    };
    images?: string | null;
  };