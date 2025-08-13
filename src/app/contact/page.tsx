import Contacts from "@/components/Contacts";
import { FaEnvelope } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

export default function Contact(){
    return(
        <div className="py-4 mx-auto">
                <h1 className="text-center">Contact</h1>
            <div className="flex flex-col justify-center px-4 mt-12 gap-6 md:flex-row md:justify-around md:px-2">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl">Personal details:</h2>
                    <div className="flex gap-2 items-center">
                        <FaPerson />
                        <p className="contact-name">Thomas N. Jensen</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <FaEnvelope />
                        <p className="contact-email"><a href="mailto:thomasnorupjensen@gmail.com">Email</a></p>
                    </div>
                </div>
                <div className="md:w-5/12 flex flex-col">
                    <h2 className="text-xl">Send me a message:</h2>
                    {/* <form className="flex flex-col">
                        <input type="hidden" id="postId" value="{POST_ID}" />
                        <label htmlFor="fullName">Name</label>
                        <input type="text" id="fullName" placeholder="Full Name" />
                        <div className="form-error" id="fullName-error">Please enter your full name</div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Email" />
                        <div className="form-error" id="email-error">Please enter a valid email address</div>
                        <label htmlFor="subject">Subject</label>
                        <input type="text" name="subject" id="subject" placeholder="Subject" />
                        <div className="form-error" id="subject-error">Please enter a subject, minimum 15 characters</div>
                        <label htmlFor="message">Message</label>
                        <textarea cols="30" rows="5" id="message" name="message" placeholder="Message"></textarea>
                        <div className="form-error" id="message-error">Please enter a message, minimum 15 characters</div>
                        <input type="submit" name="submit" id="submit" value="Send" />
                    </form> */}
                    <div className="py-1 rounded mt-1">
                        <Contacts />
                    </div>
                </div>
            </div>
        </div>  
    )
}