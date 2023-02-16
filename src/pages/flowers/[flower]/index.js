import Image from 'next/image'
import { useContext } from 'react'
import makeStars  from '../../../utils/makeStars'
import { CartContext } from '../../../contexts/cart'

const Flower = ({ flower }) => {

    const { addToCart } = useContext(CartContext)

    
  return (
    <section className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-32 ml-30 p-4 justify-center items-center w-3/4 h-3/4 glass-container">
        <div className="flex flex-col justify-center border-2  sm:w-80 w-72 items-center p-2 sm:ml-0 -ml-2">
        <Image src={flower.image} alt={flower.name} className="object-cover shadow-lg " width={500} height={300} />
        </div>
        <div className="flex  flex-col col-span-4 justify-center ml-60 items-start p-4">
        <h2 className="text-2xl text-center mt-3 uppercase">{flower.name}</h2>
        <p className="text-md font-medium mt-3">${flower.price}
        <span className="ml-9 text-rose-500">
        {makeStars(flower.rating)}
        </span>
        </p>
        <p className="text-xs text-left border-t-2 mt-3 leading-6">{flower.description}</p>
        </div>
    </section>
  )
}

export default Flower

export async function getStaticPaths() {
    const {flowers} = await import('../../../data/flowers.json')
    const paths = flowers.map((flower) => ({
        params: {flower: flower.name}
    }))
    return {paths, fallback: false}
    }

export async function getStaticProps({ params }) {
    const {flowers} = await import('../../../data/flowers.json')
    const flower = flowers.find((flower) => flower.name === params.flower)
    return {props: {flower}}
}

