import { Layout } from "../../components/layout/Layout"
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import OrderContext from "../../contexts/OrderContext"
import {
  FlavourActionWrapper,
  FlavourCard,
  FlavourCardDescription,
  FlavourCardImage,
  FlavourCardPrice,
  FlavourCardTitle,
  FlavourContentWrapper,
} from "../flavours/Flavours.styles"
import { Title } from "../../components/title/Title"
import { Button } from "../../components/button/Button"
import { convertToCurrency } from "../../helpers/convertToCurrency"

import Mussarela from "../../assets/pizza-flavours/mucarela.png"
import ChickenWithCheese from "../../assets/pizza-flavours/frango-catupiry.png"
import Margherita from "../../assets/pizza-flavours/margherita.png"
import Lusa from "../../assets/pizza-flavours/portuguesa.png"
import { routes } from "../../routes"


export default function Twoflavours() {
  const navigate = useNavigate()
  const [secondFlavourId, setSecondFlavourId] = useState("")
  const { pizzaSize, pizzaFlavour, setPizzaFlavour, pizzaSecondFlavour, setPizzaSecondFlavour, flavourId, setFlavourId } = useContext(OrderContext)

  const flavoursOptions = [
    {
      id: "10",
      image: Mussarela,
      name: "Mussarela",
      description:
        "Muçarela especial fresca, finalizada com orégano e azeitonas portuguesas.",
      price: {
        "8": 71/2,
        "4": 35.5/2,
        "1": 18/2,
      },
    },
    {
      id: "11",
      image: ChickenWithCheese,
      name: "Frango com catupiry",
      description:
        "Peito de frango cozido, desfiado e refogado em azeite de oliva e temperos naturais, anéis de cebola sobre base de muçarela especial, bacon em cubos e Catupiry® gratinado. É finalizada com orégano.",
      price: {
        "8": 95/2,
        "4": 47.5/2,
        "1": 24/2,
      },
    },
    {
      id: "12",
      image: Margherita,
      name: "Margherita",
      description:
        "Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado.",
      price: {
        "8": 90/2,
        "4": 45/2,
        "1": 22.5/2,
      },
    },
    {
      id: "13",
      image: Lusa,
      name: "Portuguesa",
      description:
        "Clássica pizza, leva presunto magro, cebola, palmito e ervilha sobre base de muçarela fresca. Finalizada com cobertura de ovos, orégano e azeitonas portuguesas. ",
      price: {
        "8": 93/2,
        "4": 46.5/2,
        "1": 23.5/2,
      },
    },
  ]

  const flavoursOptions2 = [
    {
      id: "10",
      image: Mussarela,
      name: "Mussarela",
      description:
        "Muçarela especial fresca, finalizada com orégano e azeitonas portuguesas.",
      price: {
        "8": 71/2,
        "4": 35.5/2,
        "1": 18/2,
      },
    },
    {
      id: "11",
      image: ChickenWithCheese,
      name: "Frango com catupiry",
      description:
        "Peito de frango cozido, desfiado e refogado em azeite de oliva e temperos naturais, anéis de cebola sobre base de muçarela especial, bacon em cubos e Catupiry® gratinado. É finalizada com orégano.",
      price: {
        "8": 95/2,
        "4": 47.5/2,
        "1": 24/2,
      },
    },
    {
      id: "12",
      image: Margherita,
      name: "Margherita",
      description:
        "Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado.",
      price: {
        "8": 90/2,
        "4": 45/2,
        "1": 22.5/2,
      },
    },
    {
      id: "13",
      image: Lusa,
      name: "Portuguesa",
      description:
        "Clássica pizza, leva presunto magro, cebola, palmito e ervilha sobre base de muçarela fresca. Finalizada com cobertura de ovos, orégano e azeitonas portuguesas. ",
      price: {
        "8": 93/2,
        "4": 46.5/2,
        "1": 23.5/2,
      },
    },
  ]

  const getPizzaFlavour = (id: string) => {
    return flavoursOptions.filter((flavour) => flavour.id === id)
  }

  const getPizzaSecondFlavour = (id: string) => {
    return flavoursOptions2.filter((flavour) => flavour.id === id)
  }

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlavourId(event.target.id)
    
  }

  const handleClickSecondFlavour = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondFlavourId(event.target.id)
  }

  const handleBack = () => {
    navigate(routes.pizzaSize)
  }

  const handleNext = () => {
    const selectedFlavour = getPizzaFlavour(flavourId)
    const selectedSecondFlavour = getPizzaSecondFlavour(secondFlavourId)
    setPizzaFlavour(selectedFlavour)
    setPizzaSecondFlavour(selectedSecondFlavour)

    navigate(routes.summary2Flavours)

  }

  useEffect(() => {
    if (!pizzaFlavour) return
    if (!pizzaSecondFlavour) return
    
    setFlavourId(pizzaFlavour[0].id)
    setSecondFlavourId(pizzaSecondFlavour[0].id)
  }, [])

  return (
    <Layout>
      <Title tabIndex={0}>Escolha 2 sabores para a sua pizza</Title>
      <FlavourContentWrapper>
        {flavoursOptions.map(({ id, image, name, description, price }) => (
          <FlavourCard key={id} selected={id === flavourId ? true : false}>
            <FlavourCardImage src={image} alt={name} />
            <FlavourCardTitle>{name}</FlavourCardTitle>
            <FlavourCardDescription>{description}</FlavourCardDescription>
            <FlavourCardPrice>
              {convertToCurrency(price[pizzaSize[0].slices])}
            </FlavourCardPrice>
            <Button id={id} onClick={handleClick}>
              Selecionar
            </Button>
          </FlavourCard>
        ))}
      </FlavourContentWrapper>


      <FlavourContentWrapper>
        {flavoursOptions2.map(({ id, image, name, description, price }) => (
          <FlavourCard key={id} selected={id === secondFlavourId ? true : false}>
            <FlavourCardImage src={image} alt={name} />
            <FlavourCardTitle>{name}</FlavourCardTitle>
            <FlavourCardDescription>{description}</FlavourCardDescription>
            <FlavourCardPrice>
              {convertToCurrency(price[pizzaSize[0].slices])}
            </FlavourCardPrice>
            <Button id={id} onClick={handleClickSecondFlavour}>
              Selecionar
            </Button>
          </FlavourCard>
        ))}
      </FlavourContentWrapper>
      <FlavourActionWrapper>
        <Button inverse="inverse" onClick={handleBack}>
          Voltar
        </Button>
        <Button onClick={handleNext}>Escolha os sabores</Button>
      </FlavourActionWrapper>
    </Layout>
  )
}

