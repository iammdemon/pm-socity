import { LoginForm } from "@/components/login-form"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

export default async function Page() {
  return (<>
  
  <Header/>
    <div className="flex min-h-[80vh] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
    <Footer/></>
  )
}
