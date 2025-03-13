import { FetchedOrder, Product } from "./types"


export const SAMPLE_ORDER: FetchedOrder = {
  orderInfo: {
    id: 4 ,
    date: "2025-03-18",
    orderNumber: 4,
    finalPrice: 190,
  },
  orderProducts: [
    {
      id: 1,
      name: "Chicken",
      unitPrice: 30,
      quantity: 3,
      subTotal: 90
    },
    {
      id: 3,
      name: "Orange Juice",
      unitPrice: 50,
      quantity: 2,
      subTotal: 100
    },
  ]
}
  
export const SAMPLE_ORDERS: FetchedOrder[] = [
  {
    orderInfo: {
      id: 1,
      date: "2025-03-12",
      orderNumber: 1,
      finalPrice: 130,
      status: "InProgress",
    },
    orderProducts: [
      {
        id: 1,
        name: "Chicken",
        unitPrice: 30,
        quantity: 2,
        subTotal: 60
      },
      {
        id: 2,
        name: "Cookie",
        unitPrice: 20,
        quantity: 1,
        subTotal: 20
      },
      {
        id: 3,
        name: "Orange Juice",
        unitPrice: 50,
        quantity: 1,
        subTotal: 50
      }
    ]
  },
  {
    orderInfo: {
      id: 2,
      date: "2025-03-13",
      orderNumber: 2,
      finalPrice: 160,
      status: "InProgress",

    },
    orderProducts: [
      {
        id: 1,
        name: "Chicken",
        unitPrice: 30,
        quantity: 3,
        subTotal: 90
      },
      {
        id: 3,
        name: "Orange Juice",
        unitPrice: 50,
        quantity: 1,
        subTotal: 50
      },
      {
        id: 2,
        name: "Cookie",
        unitPrice: 20,
        quantity: 1,
        subTotal: 20
      }
    ]
  },
  {
    orderInfo: {
      id: 3,
      date: "2025-03-14",
      orderNumber: 3,
      finalPrice: 120,
      status: "Completed",

    },
    orderProducts: [
      {
        id: 2,
        name: "Cookie",
        unitPrice: 20,
        quantity: 2,
        subTotal: 40
      },
      {
        id: 3,
        name: "Orange Juice",
        unitPrice: 50,
        quantity: 1,
        subTotal: 50
      },
      {
        id: 1,
        name: "Chicken",
        unitPrice: 30,
        quantity: 1,
        subTotal: 30
      }
    ]
  },
  {
    orderInfo: {
      id: 4,
      date: "2025-03-15",
      orderNumber: 4,
      finalPrice: 120,
      status: "InProgress",

    },
    orderProducts: [
      {
        id: 1,
        name: "Chicken",
        unitPrice: 30,
        quantity: 2,
        subTotal: 60
      },
      {
        id: 2,
        name: "Cookie",
        unitPrice: 20,
        quantity: 3,
        subTotal: 60
      }
    ]
  },
  {
    orderInfo: {
      id: 5,
      date: "2025-03-16",
      orderNumber: 5,
      finalPrice: 50,
      status: "Pending",

    },
    orderProducts: [
      {
        id: 3,
        name: "Orange Juice",
        unitPrice: 50,
        quantity: 1,
        subTotal: 50
      }
    ]
  }
]


export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Chicken",
    unitPrice: 30
  },
  {
    id: 2,
    name: "Cookie",
    unitPrice: 20
  },
  {
    id: 3,
    name: "Orange Juice",
    unitPrice: 50
  }
]