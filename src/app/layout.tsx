import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Murtuza Rangwala | Data Analyst · Financial Analyst | Europe',
  description:
    'Murtuza Rangwala — Data Analyst, Data Scientist & Financial Analyst based in Verona, Italy. Open to work in Italy, Germany, Netherlands & across Europe. Expert in Python, SQL, R, Machine Learning, Financial Modeling, and Econometrics.',
  keywords:
    'Murtuza Rangwala, data analyst Europe, data scientist portfolio, financial analyst Europe, business analyst Italy Germany Netherlands, Python SQL finance, econometrics, machine learning finance, quantitative analyst, financial modeling',
  authors: [{ name: 'Murtuza Rangwala' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'profile',
    url: 'https://www.murtuza.eu',
    title: 'Murtuza Rangwala | Data Analyst · Data Scientist · Financial Analyst | Europe',
    description:
      'Data Analyst & Financial Analyst open to work in Italy, Germany, Netherlands & Europe. Expert in Python, SQL, Machine Learning, Financial Modeling & Econometrics.',
    images: [{ url: 'https://www.murtuza.eu/profile-photo.png', width: 1200, height: 630, alt: 'Murtuza Rangwala' }],
    siteName: 'Murtuza Rangwala — Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Murtuza Rangwala | Data Analyst · Financial Analyst | Europe',
    description: 'Data Analyst & Financial Analyst open to work in Italy, Germany, Netherlands & Europe.',
    images: ['https://www.murtuza.eu/profile-photo.png'],
  },
  other: {
    'google-site-verification': 'yKqewJjprdiz6fYoPrpRhr8LLWYWi17Rhnv4qeIq6S0',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Murtuza Rangwala',
              url: 'https://www.murtuza.eu',
              jobTitle: ['Data Analyst', 'Data Scientist', 'Financial Analyst', 'Business Analyst'],
              email: 'murtuzarangwala8@gmail.com',
              address: { '@type': 'PostalAddress', addressLocality: 'Verona', addressCountry: 'IT' },
              knowsAbout: [
                'Data Analysis', 'Data Science', 'Financial Modeling', 'Econometrics',
                'Python', 'R', 'SQL', 'Machine Learning', 'Power BI',
                'Investment Banking', 'Quantitative Finance', 'Time Series Analysis',
              ],
              alumniOf: [
                { '@type': 'EducationalOrganization', name: 'University of Verona' },
                { '@type': 'EducationalOrganization', name: 'University of Mumbai' },
              ],
              sameAs: [
                'https://www.linkedin.com/in/murtaza-rangwala-856456102',
                'https://github.com/murtuzarangwala8-alt',
                'https://www.murtuza.eu',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}
