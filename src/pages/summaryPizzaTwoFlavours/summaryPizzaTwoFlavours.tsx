import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../../components/layout/Layout"
import { routes } from "../../routes"
import OrderContext from "../../contexts/OrderContext"
import { Title } from "../../components/title/Title"
import { convertToCurrency } from "../../helpers/convertToCurrency"
import {
  SummaryActionWrapper,
  SummaryAmount,
  SummaryContentWrapper,
  SummaryDescription,
  SummaryDetails,
  SummaryImage,
  SummaryPrice,
  SummaryTitle,
} from "../summary/Summary.style"
import { Button } from "../../components/button/Button"

export default function SummaryTwoFlavours() {
  const navigate = useNavigate()

  const { pizzaSize, pizzaFlavour, setPizzaOrder, pizzaSecondFlavour, setPizzaSecondFlavour, flavourId, setFlavourId } = useContext(OrderContext)
  const [summaryData, setSummaryData] = useState({})
  const [summaryData2, setSummaryData2] = useState({})
  const [summaryAmount, setSummaryAmount] = useState(0)

  const handleBack = () => {
    navigate(routes.pizza2Flavours)
  }
  const handleNext = () => {
    const payload = {
      item: {
        name: summaryData.name,
        name2: summaryData2.name,
        image: summaryData.image,
        image2: summaryData2.image,
        size: summaryData.text,
        size2: summaryData2.text,
        slices: summaryData.slices,
        slices2: summaryData2.slices,
        value: summaryData.price,
        value2: summaryData2.price
      },
      total: summaryAmount,
    }

    setPizzaOrder(payload)
    navigate(routes.checkout)
  }

  useEffect(() => {
    if (!pizzaFlavour) {
      return navigate(routes.pizzaSize)
    }

    if (!pizzaSize) {
      return navigate(routes.home)
    }

    setSummaryData({
      text: pizzaSize[0].text,
      slices: pizzaSize[0].slices,
      name: pizzaFlavour[0].name,
      price: pizzaFlavour[0].price[pizzaSize[0].slices],
      image: pizzaFlavour[0].image,
    })

    setSummaryData2({
      text: pizzaSize[0].text,
      slices: pizzaSize[0].slices,
      name: pizzaSecondFlavour[0].name,
      price: pizzaSecondFlavour[0].price[pizzaSize[0].slices],
      image: pizzaSecondFlavour[0].image,
    })

  }, [])

  useEffect(() => {
    setSummaryAmount(summaryData.price + summaryData2.price)
  }, [summaryAmount])

  return (
    <Layout>
      <Title tabIndex={0}>Resumo do pedido</Title>
      <SummaryContentWrapper>
        <SummaryDetails>
          <SummaryImage src={summaryData.image} alt="" />
          <SummaryTitle>Metade</SummaryTitle>
          <SummaryTitle>{summaryData.name}</SummaryTitle>
          <SummaryDescription>
            {summaryData.text} {`(${summaryData.slices}) pedaços`}
          </SummaryDescription>
          <SummaryPrice>{convertToCurrency(summaryData.price)}</SummaryPrice>
        </SummaryDetails>
        {/* <SummaryAmount>
          <SummaryPrice>{convertToCurrency(summaryAmount)}</SummaryPrice>
        </SummaryAmount> */}
      </SummaryContentWrapper>

      <SummaryContentWrapper>
        <SummaryDetails>
          <SummaryImage src={summaryData2.image} alt="" />
          <SummaryTitle>Metade</SummaryTitle>
          <SummaryTitle>{summaryData2.name}</SummaryTitle>
          <SummaryDescription>
            {summaryData2.text} {`(${summaryData2.slices}) pedaços`}
          </SummaryDescription>
          <SummaryPrice>{convertToCurrency(summaryData2.price)}</SummaryPrice>
        </SummaryDetails>
        <SummaryAmount>
          <SummaryPrice>{convertToCurrency(summaryAmount)}</SummaryPrice>
        </SummaryAmount>
      </SummaryContentWrapper>

      <SummaryActionWrapper>
        <Button inverse="inverse" onClick={handleBack}>
          Voltar
        </Button>
        <Button onClick={handleNext}>Ir para o pagamento</Button>
      </SummaryActionWrapper>
    </Layout>
  )
}
