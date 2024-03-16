import axios from 'axios'
import Buttons from './Buttons'

async function loadProduct(productId) {
  const { data } = await axios.get(
    `http://localhost:3000/api/products/${productId}`
  )
  return data
}

const ProductPage = async ({ params }) => {
  const product = await loadProduct(params.id)

  return (
    <section className='flex items-center justify-center h-[calc(100vh-10rem)] '>
      <div className='flex'>
        <div className='p-6 text-black bg-white'>
          <h3 className='mb-3 text-2xl font-bold'>{product.name}</h3>
          <h4 className='text-4xl font-bold'>{product.price}$</h4>
          <p className='text-slate-700'>{product.description}</p>

          <Buttons productId={product.id} />
        </div>
        <img src={product.image} alt={product.name} className='w-80' />
      </div>
    </section>
  )
}

export default ProductPage
