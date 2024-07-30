import { Social } from "../../components/social"
import { FaLinkedin, FaGithub } from "react-icons/fa"

export function Home(){
    return(
        <div className="mt-8 flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white">Renan Santos</h1>
            <span className="text-gray-50 mb-5 mt-3">Meus links 👇🏻</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                <section className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                    <a>
                        <p className="text-base md:text-lg">
                            LinkedIn
                        </p>
                    </a>
                </section>

                <section className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                    <a>
                        <p className="text-base md:text-lg">
                            GitHub
                        </p>
                    </a>
                </section>

                <footer className="flex justify-center gap-3 my-4">
                    <Social url={"https://linkedin.com/in/renan-santos-js"}>
                        <FaLinkedin size={35} color="#FFF"/>
                    </Social>

                    <Social url ={"https://github.com/renansilvaz"}>
                        <FaGithub size={35} color="#FFF"/>
                    </Social>
                </footer>
            </main>
        </div>
    )
}