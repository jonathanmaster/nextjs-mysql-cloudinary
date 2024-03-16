import { conn } from '@/libs/mysql'
import { NextResponse } from 'next/server'
import cloudinary from '@/libs/cloudinary'
import { unlink } from 'fs/promises'
import { processImage } from '@/libs/processImage'

export async function GET() {
  try {
    const results = await conn.query('SELECT * FROM product')

    return NextResponse.json(results)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    )
  }
}

export async function POST(request) {
  try {
    const data = await request.formData()
    const image = data.get('image')

    if (!data.get('name')) {
      return NextResponse.json(
        {
          message: 'name is required',
        },
        {
          status: 400,
        }
      )
    }
    // si quiero que sea requerido pongo el signo de admiración
    if (!image) {
      return NextResponse.json(
        {
          message: 'Image is required',
        },
        {
          status: 400,
        }
      )
    }

    // para convertirlo
    const filePath = await processImage(image)

    const rest = await cloudinary.uploader.upload(filePath)
    // console.log(rest)

    if (rest) {
      // es para que se elimine de la carpeta de public
      await unlink(filePath)
    }

    const result = await conn.query('INSERT INTO product SET ?', {
      name: data.get('name'),
      description: data.get('description'),
      price: data.get('price'),
      image: rest.secure_url,
    })

    return NextResponse.json({
      name: data.get('name'),
      description: data.get('description'),
      price: data.get('price'),
      id: result.insertId,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    )
  }
}
