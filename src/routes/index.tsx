import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Importando as páginas que nós criamos para o projeto
import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

/** 
 * Criando o componente principal para o roteamento das páginas do projeto
 * Observação, ao invés de fazermos
 *    const Routes: React.FC = () => {return(...)}
 * podemos fazer apenas
 *    const Routes: React.FC = () => (...)
 * */
const Routes: React.FC = () => {
  return (
    /** Para cada página da aplicação, precisamos definir uma rota (endereço, URL da aplicação)
    * O <Switch></Switch> garante que apenas uma rota será renderizada
    * Para os caminhos, podemos definir a propriedade 'exact', estabelecendo que o endereço
    * deve ser exatamente igual ao 'path' para chegar à rota
    * Utilizamos o '/repositories/:repository+' pois os nomes dos repositórios tem barras '/'
    * E dessa forma conseguimos informar que se tratará de um só parâmetro da rota
    * */
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/repositories/:repository+" component={Repository} />
    </Switch>
  );
};

export default Routes;
