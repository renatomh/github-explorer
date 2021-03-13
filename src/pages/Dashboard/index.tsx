// Importando o React, estados e eventos de formulário
import React, { useState, useEffect, FormEvent } from 'react';
// Importando o ícone de seta para direita do 'Feather Icons'
import { FiChevronRight } from 'react-icons/fi';
// Componente para navegar entre páginas (como o <a href=""></a>)
import { Link } from 'react-router-dom';
// Importando o serviço para consumir a API
import api from '../../services/api';

// Importando a logo para inserção na página
import logoImg from '../../assets/logo.svg';

// Importando os estilos criados para a página
import { Title, Form, Error, Repositories } from './styles';

// Criando a interface/tipo para o repositório
// Definimos somente as tipagens das informações que vamos utilizar
interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

// Criando o componente para a página do Dashboard do tipo React.FC (React Function Component)
const Dashboard: React.FC = () => {
  // Definindo o estado para ler o que é passado no input do formulário de busca de repositórios
  const [newRepo, setNewRepo] = useState('');
  // Definindo o estado para verificar erros na entrada de repositórios
  const [inputError, setInputError] = useState('');
  // Definindo o estado para armazenar os repositórios, definindo o tipo e o local de armazenamento
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    // Lendo o conteúdo dos repositórios armazenados localmente
    const storageRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    // Caso a variável esteja presente, convertemos seu conteúdo em JSON
    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }

    // Caso contrário, deixamos vazio
    return [];
  });

  // Sempre que uma variável mudar, a função useEffect() é chamada
  // Aqui definimos a função a ser chamada sempre que a variável 'repositories' for modificada
  useEffect(() => {
    /**
     * Aqui salvamos a lista de repositórios no armazenamento
     * Colocamos o @GithubExplorer: antes do nome da variável para não confundir
     * com outras de outras aplicações que podem estar rodando no mesmo host (localhost por exemplo)
     *  */
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  // Função para lidar com a adição de novos repositórios
  // Pegamos o FormEvent para impedir a ação padrão de formulários
  // E definmos o tipo de retorno (Promise<void>)
  async function handleAddRepository(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    // Evitando que a página recarregue (que é o comportamento padrão de formulários)
    e.preventDefault();

    // Verificando se foi passado o autor e o nome do repositório
    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    // Tentando pegar o repositório no GitHub
    try {
      // Consumindo a API do GitHub com as informações vindas do 'input'
      // E definindo tipo de dado de retorno com a interface 'Repository'
      // Esse tipo é definindo somente para facilitar verificar os campos do registro
      // Com o atalhao 'Ctrl+[Espaço]'
      const response = await api.get<Repository>(`repos/${newRepo}`);
      // Recolhendo os dados obtidos
      const repository = response.data;

      // Salvando na lista de repositórios
      setRepositories([...repositories, repository]);
      // Limpando o 'input' do formulário e o campo de erros
      setNewRepo('');
      setInputError('');
    } catch (err) {
      // Caso ocorra algum erro, informamos no campo de erro
      setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="GitHub Explorer" />
      <Title>Explore repositórios no GitHub</Title>

      {/**
       * Criando o formulário para pesquisa com um input e um botão
       * Definimos a função a ser chamada quando o botão for clicado (onSubmit)
       * E passando a propriedade de erro (transformando a string em boolano com o '!!')
       * */}
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        {/**
         * Associando o input ao estado do newRepo e aribuindo as mudanças feitas no campo
         * com a função de atualização de estado 'setNewRepo'
         * */}
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {/**
       * Criando o componente para apresentar os erros na entrada
       * E apresentando somente caso haja um erro a ser exibido
       *  */ }
      {inputError && <Error>{inputError}</Error>}

      {/* Criando a lista de repositórios */}
      <Repositories>
        {/**
         * Mapeando todos os repositórios e definindo as rotas para os links
         *  */}
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            {/* Definindo a imagem para o repositório */}
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />

            {/* Definindo o nome e a descrição do repositório */}
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            {/* Adicionando ainda o ícone para ver mais detalhes do repositório */}
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
