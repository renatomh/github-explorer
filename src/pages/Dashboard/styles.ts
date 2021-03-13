import styled, { css } from 'styled-components';
import { shade } from 'polished';

// Definindo a propriedade a ser recebida no formulário
interface FormProps {
  hasError: boolean;
}

// Estilizando o título da página
export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  // Usamos max-width ao invés de width para telas menores, como de celulares
  max-width: 450px;
  line-height: 56px;

  margin-top: 80px;
`;

// Criando o formulário personalizado e definindo as propriedades customizadas
export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;

  display: flex;

  input {
    // Ocupando todo o espaço disponível
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    // Tirando a borda da direta (que encontra com o botão)
    border-right: 0;

    // Caso tenha um erro, mudar a cor da borda para chamar a atenção do usuário
    // Para criar o css adicional, precisamos do css antes da expressão
    ${props =>
    props.hasError &&
    css`
        border-color: #c53030;
      `}

    // Redefinindo a cor do placeholder do input
    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    // Definindo o tamanho específico do botão
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    // Efeito de transição para mudança de cor
    transition: background-color 0.2s;

    // Aqui também podeíramos fazer o button:hover fora do 'button {}'
    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

// Criando o estilo para apresentar as mensagens de erro
export const Error = styled.span`
  // Ocupando um espaçamento de bloco
  display: block;
  color: #c53030;
  // Separando um pouco do formulário
  margin-top: 8px;
`;

// Criando a lista para apresentar os repositórios
export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  // Container para cara um dos itens no componente
  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    // Espaçamento interno
    padding: 24px;
    display: block;
    // Aqui tiramos os underlines do texto
    text-decoration: none;

    // Para um elemento ficar do lado do outro
    display: flex;
    // Alinhando no eixo vertical central
    align-items: center;
    // Definindo o tempo que leva a transição
    transition: transform 0.2s;

    // Aqui estamos referenciando o próximo item da lista (cujo anterior é do mesmo tipo)
    & + a {
      // Criando um espaçamento vertical
      margin-top: 16px;
    }

    // Animação para quando colocar o mouse por cima do elemento
    &:hover {
      // Deslocamos o elemento um pouco para a direita
      transform: translateX(10px);
    }

    // Formatando a imagem dentro do componente
    img {
      width: 64px;
      height: 64px;
      // Deixando a imagem totalmente arredondada
      border-radius: 50%;
    }

    // Elemento com título e descrição do repositório
    div {
      // Distanciando um pouco da imagem e da borda
      margin: 0 16px;
      // Ajustando a imagem ao tamanho disponível
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        // Aqui distanciamos um pouco do título
        margin-top: 4px;
      }
    }

    // Estilizando o ícone (sempre ficam como svg)
    svg {
      // Criando um espaçamento do título e descrição do repositório
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;
