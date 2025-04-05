import ReduxProvider from "@/redux/ReduxProvider"
import "../styles/globals.css"
import ToastProvider from "@/components/general/ToastProvider"

// Prismjs imports for formating code
import 'prismjs'
import 'prismjs/themes/prism-okaidia.css'; // Pick any theme
import 'prismjs/components/prism-javascript'; // Ensure JavaScript support
import 'prismjs/components/prism-jsx'; // Ensure JSX support


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
