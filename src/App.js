import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
import './styles.css';


function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch() {
    //06236090/json
    if (input === '') {
      alert("preencha algum cep!")
      return;
    }

    try {
      const response = await api.get(input + '/json');
      setCep(response.data)
      setInput("")

    } catch {
      alert("Erro ao buscar!")
      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title"> Cep Hunt</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (

        <main className='main'>
          <h2> CEP: {cep.cep}</h2>

          <span> {cep.logradouro} </span>
          <span> {cep.complemento}</span>
          <span> {cep.bairro}</span>
          <span> {cep.localidade}</span>

        </main>
      )}

    </div>
  );
}

export default App;
