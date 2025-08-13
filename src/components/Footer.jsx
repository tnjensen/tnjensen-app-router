import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

export function Footer(){
    let date = new Date().getFullYear();
    if(date > 2017){
        date = ` 2023 - `+ date;
    }else{
        date =  ` 2024`;
    }
    return(
        <footer className="bg-foreground text-white h-12 p-2 bottom-0 z-20">
            <div className="flex h-8 items-center justify-around w-full">
                <p>Copyright &copy; {date}</p>
                <div className="flex items-center gap-2">
                    <Link href={"https://www.linkedin.com/in/tnjensen09/"}><FaLinkedin /></Link>
                    <Link href={"https://www.instagram.com/tnjensen09/"}><FaInstagram /></Link>
                    <Link href={"https://www.facebook.com/profile.php?id=100058563252363"}><FaFacebook /></Link>
                </div>
            </div>
    </footer>
    )
}