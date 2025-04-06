import ReduxProvider from "@/redux/ReduxProvider"
import "../styles/globals.css"
import ToastProvider from "@/components/general/ToastProvider"

// Prismjs imports for formating code
import 'prismjs'
import 'prismjs/themes/prism-okaidia.css'; // Pick any theme
import 'prismjs/components/prism-javascript'; // Ensure JavaScript support
import 'prismjs/components/prism-jsx'; // Ensure JSX support

export const metadata = {
  metadataBase: new URL('https://www.jsdreamers.netlify.app'), // Set the base URL for your site
  title: 'jsdreamers',
  description: 'A platform for JavaScript enthusiasts to share and learn completely for free.',
  keywords: 'JavaScript, programming, free learning, Next.js, Next, React, React.js, coding community, developers, jsDreamers',
  authors: [{ name: 'jsDreamers', url: 'https://jsdreamers.netlify.app' }],
  creator: 'jsDreamers',
  robots: 'index, follow', // Ensure search engines index the page
  icons: {
    icon: '/logo3D-min.ico',
    shortcut: '/logo3D-min.ico',
    apple: '/logo3D-min.ico',

  },
  openGraph: {
    title: 'jsdreamers',
    description: 'A platform for JavaScript enthusiasts to share and learn completely for free.',
    url: 'https://jsdreamers.netlify.app',
    siteName: 'jsdreamers',
    images: [
      {
        url: '/logo3D-min.png',
        width: 800,
        height: 600,
        alt: 'jsdreamers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'jsdreamers',
    description: 'A platform for JavaScript enthusiasts to share and learn completely for free.',
    images: '/logo3D-min.png',
  },
}

const RootLayout = ({ children }) => {

  return (
    <html lang="en">
        <ReduxProvider>
          <body>
            { children }
            <ToastProvider/>
          </body>
        </ReduxProvider>
    </html>
  )
}

export default RootLayout
