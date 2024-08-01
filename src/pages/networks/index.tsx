import { FormEvent, useEffect, useState } from "react"
import { Header } from "../../components/header"
import { Input } from "../../components/input"
import { db } from "../../services/firebaseConnection"
import { setDoc, doc, getDoc } from "firebase/firestore"

export function Networks(){
    const [github, setGithub] = useState("")
    const [linkedIn, setLinkedIn] = useState("")

    useEffect(() => {
        function loadLinks(){
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setGithub(snapshot.data()?.github)
                    setLinkedIn(snapshot.data()?.linkedin)
                }
            })
        }

        loadLinks();
    }, [])

    function handleRegister(e: FormEvent){
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            github: github,
            linkedin: linkedIn
        })
        .then(() => {
            console.log("Cadastrado")
        })
        .catch ((error) => {
            console.log("Erro ao cadastrar " + error)
        })
    }

    return(
        <div className="flex flex-col items-center min-h-screen pb-7 px-2">
            <Header />

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas rede sociais</h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Link do GitHub</label>
                <Input 
                    type="url"
                    placeholder="Digite a url"
                    value={github}
                    onChange={ (e) => setGithub(e.target.value)}/>

                <label className="text-white font-medium mt-2 mb-2">Link do LinkedIn</label>
                <Input 
                    type="url"
                    placeholder="Digite a url"
                    value={linkedIn}
                    onChange={ (e) => setLinkedIn(e.target.value)}/>

                <button
                    type="submit"
                    className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mt-2 mb-7 font-medium">
                    Salvar links
                </button>
            </form>
        </div>
    )
}