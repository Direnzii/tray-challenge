# 🚀 tray-challenge

Este repositório contém o desafio automatizado utilizando [Cypress](https://www.cypress.io/) e [k6](https://k6.io/).

## ✅ Tudo Rodando
![Tudo Rodando](./imagens/all_pass.gif)

## 🏆 Boas Práticas
- **Reutilização de métodos**: Funções e comandos desenvolvidos com foco na reutilização e manutenção.
- **Arquitetura escalável**: Estrutura de pastas e arquivos organizada para facilitar a escalabilidade do projeto.
- **Uso de constantes**: Evita duplicação de valores por meio da centralização de constantes reutilizáveis.
- **Separação de variáveis de ambiente**: Utilização de arquivos separados para armazenar secrets e variáveis sensíveis.  
  > ⚠️ **Nota**: Como este é um projeto de desafio, o arquivo `cypress.env.json` foi incluído no repositório apenas para fins de demonstração. Em um ambiente real, esse tipo de arquivo seria adicionado ao `.gitignore` e mantido fora do controle de versão.


## 📦 Configuração do Ambiente

### 🔹 Clonar o Repositório e Instalar Dependências
1. Certifique-se de ter o **Node.js**, **Git**, **k6** e o **Docker** (opcional) instalados em sua máquina.
2. Clone o repositório:
   ```bash
   git clone https://github.com/Direnzii/tray-challenge.git
   ```
3. Acesse a pasta do projeto e instale as dependências:
   ```bash
   cd tray-challenge
   npm install
   ```

---

## 🧪 Teste E2E (Cypress)

### 🚀 Teste Executado
![Teste Cypress](./imagens/cypress_run_pass.png)

### ▶️ Como Executar os Testes
- Executar todos os testes via CLI:
  ```bash
  npx cypress run
  ```
- Executar uma spec específica:
  ```bash
  npx cypress run --spec ./cypress/e2e/<nome-da-spec>.cy.js
  ```
  - Substitua `<nome-da-spec>` pelo nome do arquivo de teste que deseja rodar.

### 💡 Dicas
- Você pode abrir o Cypress em modo interativo com:
  ```bash
  npx cypress open
  ```

### 🤖 Uso de IA
Utilizei IA apenas para reescrever este README de forma mais estruturada e visualmente agradável.
![IA Reescrevendo](./imagens/chat_readme.png)

---

## 🔗 Teste de API (k6)

### ✅ Teste Executado
![Teste API](./imagens/k6_run_pass.png)

### ▶️ Como Executar os Testes
- Executar todos os testes via CLI:
  ```bash
  k6 run .\starWarsTest\main.js
  ```

### 💡 Dicas
Para melhorar a visualização dos resultados, configurei um **Docker Compose** para rodar um banco de dados e o **Grafana** localmente. Com poucos ajustes, é possível criar dashboards para análise dos testes:

1. **Construa as imagens** em sua máquina:
   ```bash
   docker compose up -d
   ```
2. **Acesse a interface do Grafana**: `localhost:3000`
   - **Adicione o banco de dados**  
     ![Adicionar DB](./imagens/add_data_source.png)
   - **Configure o banco de dados**  
     ![Configuração DB](./imagens/configuracao_db_grafana.png)
3. **Importe um dashboard pronto para o k6**  
   ![Importação Grafana](./imagens/import_grafana.png)
   - Utilize o **ID = 14801** para que fique igual ao vídeo demonstrativo.

### 🤖 Uso de IA
Utilizei IA em dois momentos:
- Para solucionar um erro de certificado da API no k6:  
  ![Erro Certificado](./imagens/erro_certificado_k6.png)
- Para validar entradas usando Regex (nunca decoro Regex 🙃)  
  ![Validação Regex](./imagens/ajuda_para_validacao_com_regex.png)
