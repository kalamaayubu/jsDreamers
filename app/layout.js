import ReduxProvider from "@/redux/ReduxProvider"
import "../styles/globals.css"
import ToastProvider from "@/components/general/ToastProvider"

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
