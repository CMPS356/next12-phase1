import Navbar from "./Navigation/Navbar"
import Head from 'next/head'
import Script from 'next/script'
import Banner from './Banner/Banner'
import { useRouter } from "next/router"
import Footer from "../Footer/Footer"

export default function Layout({ children }) {
    const router = useRouter()

    return (
        <>
            <div style={{ display: router.pathname == "/" && "none" }}>
            <Head>
                <title>Halaqa Metrash</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous" />
            <Banner />

            <Navbar />
            <hr style={{height:"0px", margin:'0px', backgroundColor:"teal"}}></hr>
            </div>

            <main style={{ marginInline: router.pathname=='/' ? "0px" : "270px", marginTop: router.pathname=='/' ? "0px" : "50px", height: '1150px' }}>
                {children}
            </main>

            <Footer />
        </>

    )
}