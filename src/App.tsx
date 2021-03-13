import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Importando os estilos globais criados para a aplicação
import GlobalStyle from './styles/global';
// Importando as rotas criadas para a apllcação
import Routes from './routes';

// Criando o componente principal da aplicação
// O BrowserRouter é o que recebe o endereço URL passado no navegador
// Aplicamos ainda os estilos globais na aplicação
const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyle />
  </>
);

export default App;
