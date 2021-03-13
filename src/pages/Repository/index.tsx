import React, { useEffect, useState } from 'react';
// Importamos o useRouteMatch para obter os parâmetros passados para a rota
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

// Importando os estilos criados para a página
import { Header, RepositoryInfo, Issues } from './styles';

// Definindo a tipagem para os parâmetros da rota do repositório
interface RepositoryParams {
  repository: string;
}

// Definindo a tipagem para o repositório
interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

// Definindo a tipagem para a issue
interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Dashboard: React.FC = () => {
  // Definindo os estados para o repositório e as issues
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  // Obtendo os parâmetros passados na rota
  const { params } = useRouteMatch<RepositoryParams>();

  // Atualizando a tela quando houver mudança no repositório recebido nos parâmetros
  useEffect(() => {
    // Pegando os dados do repositório (stars, forks, quantidade de issues abertas, etc.)
    api.get(`repos/${params.repository}`).then(response => {
      // Definindo os dados do repositório no estado
      setRepository(response.data);
    });

    // Pegando as issues do repositório
    api.get(`repos/${params.repository}/issues`).then(response => {
      // Definindo os dados das issues no estado
      setIssues(response.data);
    });

    // Outra foram de fazer todas as requisições juntas seria
    // async function loadData(): Promise<void> {
    //   const [repository, issues] = await Promise.all([
    //     api.get(`repos/${params.repository}`),
    //     api.get(`repos/${params.repository}/issues`)
    //   ]);
    //   // Caso tivéssemos algumas requisições e quiséssemos apenas o resultado da que
    //   // retornasse primeiro, faríamos
    //   // const response = await Promise.race([
    //   //   api.get(`repos/${params.repository}`),
    //   //   api.get(`repos/${params.repository}/issues`)
    //   // ]);

    //   console.log(repository);
    //   console.log(issues);
    // }
    // loadData();

    // Caso precisássemos que a primeira requisição tivesse finalizado antes de fazer
    // a segunda, poderíamos fazer como abaixo:
    // async function loadData(): Promise<void> {
    //   const repository = await api.get(`repos/${params.repository}`);
    //   const issues = await api.get(`repos/${params.repository}/issues`);

    //   console.log(repository);
    //   console.log(issues);
    // }
    // loadData();
  }, [params.repository]);

  return (
    <>
      {/* Definindo o cabeçalho da aplcação (com a logo e o botão de voltar) */}
      <Header>
        <img src={logoImg} alt="GitHub Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {/* Informações sobre o repositório (caso exista) */}
      {repository && (
        <RepositoryInfo>
          <header>
            {/* Imagem do repositório */}
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />

            {/* Container vertical com o nome e descrição do repositório */}
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>

          {/* Criando a lista com stars, forks e issues abertas */}
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      {/** Criando a lista com as issues abertas no repositório
       * Mapeando todas as issues obtidas com a API
      */}
      <Issues>
        {issues.map(issue => (
          // Aqui usamos o 'a' pois não estamos lidando com uma rota interna
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Dashboard;
