import { Button } from "@/components/Button"
import Link from "next/link"

export const metadata = {
    title: "Home"
} 

export default function Home(){
    return(
        <main className="flex flex-col justify-around py-3 px-5 md:px-10 mx-auto pb-6">
            <p className="text-lg">Hello, my name is</p>
            <h1 className="text-2xl">Thomas</h1>
            <p className="mb-2">and I&apos;m a <span className="text-lg font-bold text-blue-700">frontend developer</span></p>
            <Button
                size="default"
                title="ReadMore"
                aria-label="ReadMore"
                className="max-w-xs btn-background"
                >
                    <Link href={"/projects"}>Read More</Link>
            </Button>
            {/* <button  className="bg-red-400 p-3 rounded hover:bg-red-300 max-w-xs"><Link href={"/projects"}>Learn More</Link></button> */}
            <figure className="flex justify-end my-3">
                <img src="/images/elvehavn_1.jpg" alt="landing page image" width="180" height="180" className="rounded-full" />
                {/* <figcaption>Me in Elvehavn, Trondheim</figcaption> */}
            </figure>
            <figure>
                <img src="/images/landing-page.png" alt="landing page icon" className="max-w-xs animate-slide mb-8" width="512" height="512" />
                <figcaption><Link href="https://www.flaticon.com/free-icons/landing-page" className="slide-left">Landing page icons created by Freepik - Flaticon</Link></figcaption>
            </figure>   
    </main>
    )
}