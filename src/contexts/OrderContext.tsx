import { createContext, useState } from "react"

type PizzaSizeType = {
  id: string
  flavours: number
  size: number
  slices: number
  text: string
}

type PizzaFlavourType = {
  id: string
  image: string
  name: string
  description: string
  price: {
    "8": number
    "4": number
    "1": number
  }
}

type PizzaOrderType = {
  item: {
    name: string
    name2: string
    image: string
    image2: string
    size: string
    size2: string
    slices: number
    slices2: number
    value: number
    value2: number
  }
  total: number
}

type OrderContextProps = {
  pizzaSize: PizzaSizeType
  setPizzaSize: React.Dispatch<React.SetStateAction<PizzaSizeType>>
  pizzaFlavour: PizzaFlavourType
  setPizzaFlavour: React.Dispatch<React.SetStateAction<PizzaFlavourType>>
  pizzaSecondFlavour: PizzaFlavourType
  setPizzaSecondFlavour: React.Dispatch<React.SetStateAction<PizzaFlavourType>>
  pizzaOrder: PizzaOrderType
  setPizzaOrder: React.Dispatch<React.SetStateAction<PizzaOrderType>>

}

const OrderContext = createContext<OrderContextProps>({})

const OrderContextProvider = ({ children }) => {
  const [pizzaSize, setPizzaSize] = useState()
  const [pizzaFlavour, setPizzaFlavour] = useState()
  const [pizzaSecondFlavour, setPizzaSecondFlavour] = useState()
  const [pizzaOrder, setPizzaOrder] = useState()
  const [flavourId, setFlavourId] = useState("")
  const [qtdePizzas, setQtdePizzas] = useState()

  return (
    <OrderContext.Provider
      value={{
        pizzaSize,
        setPizzaSize,
        pizzaFlavour,
        setPizzaFlavour,
        pizzaSecondFlavour,
        setPizzaSecondFlavour,
        pizzaOrder,
        setPizzaOrder,
        flavourId,
        setFlavourId,
        qtdePizzas,
        setQtdePizzas
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export { OrderContextProvider }
export default OrderContext
