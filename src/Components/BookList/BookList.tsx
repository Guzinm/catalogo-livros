import type { Livro } from "../../Types/Livro"
import BookItem from "../BookItem/BookItem";
import styles from "./BookList.module.css"

type Prop = {
    livros: Livro[];
    removerLivro: (id : string | undefined) => void;
}

function BookList({livros, removerLivro} : Prop) {

    return(
        <div className={styles.center}>
            <h1>Livros listados</h1>
            <div className={styles.lista}>
                {livros.length === 0 ? <p>Nenhum livro encontrado</p> : livros.map(livro => (
                    <BookItem key={livro._id} livro={livro}>
                        <button onClick={() => {removerLivro(livro._id)}}>Excluir livro</button>
                    </BookItem>
                ))}
            </div>
        </div>
    )
}

export default BookList