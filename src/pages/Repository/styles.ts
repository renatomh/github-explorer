import styled from 'styled-components';

// Estilização para o cabeçalho
export const Header = styled.header`
  display: flex;
  // Alinhando verticalmente
  align-items: center;
  // Jogando um item para cada lado
  justify-content: space-between;

  // O 'Link' é um anchor (a)
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }

    // Distanciando um pouco o ícone do texto
    svg {
      margin-right: 4px;
    }
  }
`;

// Estilização para a área com informações sobre o repositório
export const RepositoryInfo = styled.section`
  // Espaçando com relação ao header principal
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    div {
      // Distanciando da imagem do repositório
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }
    }
  }

  ul {
    display: flex;
    // Tirando o bullet-list da lista
    list-style: none;
    margin-top: 40px;

    li {
      // Criando o espaçamento entre os itens da lista (a partir do segundo)
      & + li {
        margin-left: 80px;
      }

      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }
    }
  }
`;

// Estilização para a lista de issues
// (É basicamente igual à lista de repositórios)
export const Issues = styled.div`
  margin-top: 80px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;
