// Necessária a importação desse componente para se tornar global
import { createGlobalStyle } from 'styled-components';

// Importando a imagem de background para utilização no estilo da página
import githubBackground from '../assets/github-background.svg';

// Arquivo de estilização global, a ser aplicado em todo o sistema
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #f0f0f5 url(${githubBackground}) no-repeat 70% top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  button {
    cursor: pointer;
  }
`;
