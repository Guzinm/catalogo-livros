import { useState, type FormEvent } from "react";
import type { Livro } from "../../Types/Livro";
import styles from "./BookForm.module.css";

type Prop = {
    adicionarLivro: (livro : Livro) => void;
}

function BookForm({adicionarLivro} : Prop) {

    const [titulo, setTitulo] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState(false);

    const clear = () => {
        setTitulo('');
        setAuthor('');
        setStatus(false);
    }
    
    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!titulo.trim() || !author.trim()) {
            alert("Insira valores válidos!");
            clear();
            return
        }

        const novoLivro : Livro = {
            title: titulo.trim(),
            author: author.trim(),
            status: status
        };

        adicionarLivro(novoLivro);
        clear();
    }

    return(
        <form onSubmit={handleSubmit}>
            <fieldset className={styles.form}>
                <legend>Adicionar Livro</legend>

                <input type="text" placeholder="Título do livro" value={titulo} onChange={(e) => {setTitulo(e.target.value)}} required/>
                <input type="text" placeholder="Autor do livro" value={author} onChange={(e) => {setAuthor(e.target.value)}} required/>
                <fieldset>
                    <legend>Status</legend>
                    <label htmlFor="lido">Lido </label>
                    <input type="radio" id="lido" name="lidoStatus" onChange={()=>{setStatus(true)}} checked={status}/><br/>
                    <label htmlFor="nao-lido">Não Lido </label>
                    <input type="radio" id="nao-lido" name="lidoStatus" onChange={() => {setStatus(false)}} checked={!status}/>
                </fieldset>

                <button type="submit">Enviar Livro</button>
            </fieldset>
        </form>
    )
}

export default BookForm