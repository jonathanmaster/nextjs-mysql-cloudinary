import { conn } from '@/libs/mysql'
import { NextResponse } from 'next/server'

export async function GET() {
  const result = await conn.query('SELECT NOW()')

  return NextResponse.json({ message: result[0]['NOW()'] })
}
