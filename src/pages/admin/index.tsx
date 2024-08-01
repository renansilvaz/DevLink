import { FormEvent, useState, useEffect } from "react"
import { Header } from "../../components/header"
import { Input } from "../../components/input"
import { FiTrash } from "react-icons/fi"
import { db } from "../../services/firebaseConnection"
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore"

interface LinkProps{
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}

export function Admin(){
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#f1f1f1")
    const [backgrounColorInput, setBackgoungColorInput] = useState("#121212")

    const [links, setLinks] = useState<LinkProps[]>([])

    useEffect(() =>{
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"))

        const unsub = onSnapshot(queryRef, (snapshot) => {
            // eslint-disable-next-line prefer-const
            let lista = [] as LinkProps[];

            snapshot.forEach((doc) =>{
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })

            setLinks(lista);

        })
        return() => {
            unsub();
        }
        

    }, [])

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if(nameInput === '' || urlInput ===''){
            alert("Preencha todos os campos!")
        }

        await addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: backgrounColorInput,
            color: textColorInput,
            created: new Date()
        })
        .then(() => {
            setNameInput("")
            setUrlInput("")
            setTextColorInput("#f1f1f1")
            setBackgoungColorInput("#121212")
            console.log("Cadastrado com sucesso!")
        })
        .catch((err) => {
            console.log("Erro ao cadastrar banco" + err)
        })
    }

    async function handleDeleteLink(id: string){
        const docRef = doc(db, "links", id)  
        await deleteDoc(docRef) 
    }


    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>


            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Nome do link</label>
                <Input 
                    placeholder="Digite o nome do link"
                    value={nameInput}
                    onChange={ (e) => setNameInput(e.target.value) }/>

                <label className="text-white font-medium mt-2 mb-2">URL do link</label>
                <Input
                    type="url"
                    placeholder="Digite a url do link"
                    value={urlInput}
                    onChange={ (e) => setUrlInput(e.target.value) }/>

                    <section className="flex mt-4 gap-5">
                        <div className="flex gap-2">
                            <label className="text-white font-medium mt-2 mb-2">Cor do link</label>
                            <input className="h-8 w-8"
                                type="color"
                                value={textColorInput}
                                onChange={(e) => setTextColorInput(e.target.value)} />
                        </div>

                        <div className="flex gap-2">
                            <label className="text-white font-medium mt-2 mb-2">Fundo do link</label>
                            <input className="h-8 w-8"
                                type="color"
                                value={backgrounColorInput}
                                onChange={(e) => setBackgoungColorInput(e.target.value)} />
                        </div>
                    </section>

                    {nameInput !== '' && (
                        <div className="flex items-center flex-col justify-start mb-7 p-1 border-gray-100/25 border rounded-md">
                        <label className="text-white font-medium mt-2 mb-3">Veja como está ficando:</label>
                        <article className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded px-1 py-3"
                            style={{marginBottom: 8, marginTop: 8, backgroundColor: backgrounColorInput}}>
                            <p style={{color: textColorInput, fontWeight: "bold"}}>{nameInput}</p>
                        </article>
                    </div>
                    )}

                    <button type="submit" className="bg-blue-600 w-full text-white rounded p-1 font-medium mb-7 mt-7">
                        Cadastrar
                    </button>
            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>
            
            {links.map( (link) => (
                <article
                key={link.id} 
                className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
                style={{backgroundColor: link.bg, color: link.color}}>
                <p>{link.name}</p>
                <button 
                    className="border-none p-1 rounded bg-transparent"
                    onClick={ () => handleDeleteLink(link.id) }>
                    <FiTrash size={18} color="#FFF"/>
                </button>
            </article>
            ))}
            
        </div>
    )
}