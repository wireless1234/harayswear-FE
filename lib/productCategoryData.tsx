export const tabs= [
    {
      "id": 1,
      "name": "Lambert & Bulter",
      "description": null,
      "logo": null
    },
    {
      "id": 2,
      "name": "Double Happiness",
      "description": null,
      "logo": null
    },
    {
      "id": 3,
      "name": "Benson & Hedges",
      "description": null,
      "logo": null
    },
    {
      "id": 4,
      "name": "Dunhill",
      "description": null,
      "logo": null
    },
    {
      "id": 5,
      "name": "Manchester",
      "description": null,
      "logo": null
    },
    {
      "id": 6,
      "name": "Esse",
      "description": null,
      "logo": null
    },
    {
      "id": 7,
      "name": "Marlboro",
      "description": null,
      "logo": null
    },
    {
      "id": 8,
      "name": "Memphis",
      "description": null,
      "logo": null
    },
    {
      "id": 9,
      "name": "Eights",
      "description": null,
      "logo": null
    },
    {
      "id": 10,
      "name": "Bussiness",
      "description": null,
      "logo": null
    },
    {
      "id": 11,
      "name": "Mac",
      "description": null,
      "logo": null
    },
    {
      "id": 12,
      "name": "Modern",
      "description": null,
      "logo": null
    },
    {
      "id": 14,
      "name": "Rollo",
      "description": null,
      "logo": "image/upload/v1742897175/ab0yba77rph2icospyfv.jpg"
    },
    // {
    //   "id": 15,
    //   "name": "Alibarbar",
    //   "description": "Alibarbar",
    //   "logo": "image/upload/v1742893911/feviae86kqplqvbjlcr3.png"
    // },
    // {
    //   "id": 16,
    //   "name": "Cuz",
    //   "description": "Cuz",
    //   "logo": "image/upload/v1742893945/dc8v1hmkztwgrtbdjwva.png"
    // },
    // {
    //   "id": 17,
    //   "name": "LV",
    //   "description": "LV",
    //   "logo": "image/upload/v1742893969/ccvseqouintrgfuxsuzu.png"
    // },
    {
      "id": 18,
      "name": "Pouches",
      "description": "Pouches",
      "logo": null
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
  