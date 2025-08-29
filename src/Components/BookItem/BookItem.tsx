import type React from "react";
import type { Livro } from "../../Types/Livro"
import styles from "./BookItem.module.css"
import { memo } from "react";

type Prop = {
    livro: Livro;
    children: React.ReactNode;
}

function BookItem({livro, children} : Prop) {
    return(
        <div className={styles.item}>
            <p>Titulo: {livro.title}</p>
            <p>Escrito por: {livro.author}</p>
            <p>Status: {livro.status ? "Lido" : "Não lido"}</p>
            {children}
        </div>
    )
}

export default memo(BookItem)