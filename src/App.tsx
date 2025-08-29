import { useCallback, useEffect, useState } from "react";
import BookForm from "./Components/BookForm/BookForm";
import BookList from "./Components/BookList/BookList";
import type { Livro } from "./Types/Livro";
import axios, { type AxiosResponse } from "axios";
import styles from "./App.module.css";

const KEY = 'e40401a06f1446fdac58e61553bc23c6'
const API_URL = `https://crudcrud.com/api/${KEY}/livros`;

function App() {

  const [livros, setLivros] = useState<Livro[]>([])

  const requestData = useCallback(async(tipo : string, novoLivro? : Livro,id? : string) => {
    try {
      switch (tipo) {
        case "post":
          const respostaPost : AxiosResponse<Livro> = await axios.post<Livro>(API_URL, novoLivro);
          setLivros(prev => [...prev, respostaPost.data]);
          break;
        case "get":
          const respostaGet: AxiosResponse<Livro[]> = await axios.get<Livro[]>(API_URL);
          setLivros(respostaGet.data);
          break;
        case "delete":
          await axios.delete<Livro>(`${API_URL}/${id}`);
          setLivros(prev => prev.filter(item => item._id !== id));
          break;
      }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Erro HTTP: ", error.response?.status);
        } else {
          console.error("Erro inesperado: ", error)
        }
      }
  }, [])

  const adicionarLivro = (novoLivro : Livro) => {
    requestData("post",novoLivro);
  }

  const removerLivro = (id : string | undefined) => {
    requestData("delete",undefined,id);
  }

  useEffect(() => {
    requestData("get");
  }, [])

  return (
    <>
      <h1 className={styles.title}>Catalogo de livros</h1>
      <BookForm adicionarLivro={adicionarLivro}/>
      <BookList livros={livros} removerLivro={removerLivro}/>
    </>
  )
}

export default App
