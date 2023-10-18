import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../../components/layout/Layout"
import { Title } from "../../components/title/Title"
import OrderContext from "../../contexts/OrderContext"
import { routes } from "../../routes"
import { Button } from "../../components/button/Button"
import { convertToCurrency } from "../../helpers/convertToCurrency"
import {
  CheckoutAction,
  CheckoutItem,
  CheckoutItemFlex,
  PaymentMethodGroup,
} from "./Checkout.style"

export default function Checkout() {
  const { pizzaOrder, qtdePizzas } = useContext(OrderContext)
  const [paymentOptions, setPaymentOptions] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const getPaymentOptions = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8000/payment/options")
      const options = await response.json()
      setPaymentOptions(options)
    } catch (error) {
      alert(`Deu ruim: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const [paymentType, setPaymentType] = useState("")
  // const [isDisabled, setIsDisabled] = useState(true)

  const handleChange = (event) => {
    setPaymentType(event.target.value)
    // setIsDisabled(false)
  }

  const getPaymentOptiontype = (paymentType: number) => {
    if (!paymentType) return

    const filteredValue = paymentOptions.filter(
      (payment) => payment.value === paymentType
    )

    return filteredValue[0].text
  }

  const createOrder = (orderPayload) => {
    try {
      fetch("http://localhost:8000/order/create_order", {
        method: "POST",
        body: JSON.stringify(orderPayload),
      })
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Finally");
    }
  }


  const handleClick = () => {
    createOrder(pizzaOrder)
  }

  useEffect(() => {
    if (pizzaOrder === undefined) {
      return navigate(routes.pizzaSize)
    }
  }, [])

  useEffect(() => {
    getPaymentOptions()
  }, [])

  // ?. nullish

  return (
    <Layout>
      <Title tabIndex={0}>Pagamento</Title>
      <CheckoutItem>
        <h2>Items</h2>
        <CheckoutItemFlex>
          {pizzaOrder.item.name2 ? <p>Metade</p> : ""}
          
          <p>
            {pizzaOrder?.item.name}/{pizzaOrder?.item.size}
          </p>
          <p>Qtde: {qtdePizzas}</p>
          <p>{convertToCurrency(pizzaOrder?.item.value)}</p>

          {pizzaOrder.item.name2 ? (
            <>
            <p>Metade</p>
            <p>
            {pizzaOrder?.item.name2}/{pizzaOrder?.item.size2}
            </p>
          <p>{convertToCurrency(pizzaOrder?.item.value2)}</p>
            </>) : ""}
          
        </CheckoutItemFlex>
      </CheckoutItem>
      <CheckoutItem>
        <h2>Forma de pagamento</h2>
        <CheckoutItemFlex>
          <PaymentMethodGroup>
            <label htmlFor="payments">Selecione a forma de pagamento</label>
            <select
              name="payments"
              id="payments"
              defaultValue={""}
              onChange={handleChange}
            >
              <option disabled value="">
                Selecione
              </option>
              {paymentOptions.map(({ id, value, text }) => (
                <option key={id} value={value}>
                  {text}
                </option>
              ))}
            </select>
          </PaymentMethodGroup>
          <p>{getPaymentOptiontype(Number(paymentType))}</p>
        </CheckoutItemFlex>
      </CheckoutItem>
      <CheckoutItem>
        <CheckoutItemFlex>
          <h2>Total do pedido</h2>
          <p>{convertToCurrency(pizzaOrder?.total)}</p>
        </CheckoutItemFlex>
      </CheckoutItem>
      <CheckoutAction>
        <Button onClick={handleClick} disabled={!Boolean(paymentType)}>
          Fazer pedido
        </Button>
      </CheckoutAction>
    </Layout>
  )
}
