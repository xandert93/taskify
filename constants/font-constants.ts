import { Poppins, Rubik } from 'next/font/google'

// 🔥 have to be declared outside of an object, since "Font loaders must be called and assigned to a const in the module scope"

const heading = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const text = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const fonts = { heading, text }
