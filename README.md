# Prova de Web 3 - Questão 7

**Aluno:** Pedro Raposo Felix de Sousa

**Matrícula:** 20190004642

## Requisitos da questão

![Questão 7 - Descrição](./public/questao7.png)

## Resumo

<p>Estes arquivos tem como função servir como base para o funcionamento da API de busca requisitada na questão 7 da última prova da disciplina de Sistemas Web III do ano 2021.1 na UFRRJ</p>

<p>Para o funcionamento do programa é necessário a instalação dos módulos e dependências explicitadas no arquivo package.json. Para isso basta apenas executar o comando <code>npm install</code> e todas as dependências serão instaladas automaticamente.</p>

Dependências utilizadas:

<li>Express.js: Framework responsável pela facilitação da criação de um servidor HTTP e leitura dos corpos da requisições</li>

<li>GoogleAPIs: Módulo que permite uma interface de comunicação entre APIs do Google e a aplicação em si</li>

<li>Dotenv: Módulo para facilitar o carregamento de dados vindos a partir das variáveis de ambiente guardadas no arquivo .env</li>

<p>Para iniciar o servidor basta executar o comando <code>node index.js</code>. O servidor é hospedado na porta 80, mas isso pode ser alterado manualmente alterando o número da porta no método .listen() presente na linha 108 do arquivo index.js</p>

## Importante

<p>Além da instalação das dependências é necessário criar o arquivo .env no diretório raiz e adicionar as seguintes variáveis de ambiente 
ao arquivo:</p>

<li>API_TOKEN=AIzaSyCI3tbQpU99Qt5rnWKHfsXzTxMohsClmbY</li>
<li>SEARCH_ENGINE_ID=a72cef33e5d424a29</li>

<p>Por questões de segurança as variaveis utilizadas nesta API serão desativadas após o fim do período letivo em 21/12/2021</p>

---

## Arquiterura do Software

<p>É disponibilizada uma interface simples para visualização rápida no navegador, porém não é necessária para o funcionamento do programa. Todas as requisições podem ser feitas através de aplicativos de terceiros como <i>Postman</i> ou <i>Insomnia</i> disparando requisições para as mesmas URLs usadas pela interface.</p>

Rotas definidas:

<li>
	<span style="font-family: 'Fira Sans', sans-serif ;background-color: #009756; padding: 3px 5px; border-radius: 10px; color: white">GET</span> /search?q=query&lr=lang_pt&n=2
	<ul>
		<li>q: Item a ser pesquisado</li>
		<li>lr: Idioma da pesquisa seguindo o padrão <i>lang_xx</i>. <a href="https://support.google.com/googleplay/android-developer/table/4419860?hl=pt">Lista de idiomas suportados</a></li>
		<li>n: Número de resultados a serem retornados onde 2 ≤ n ≤ 10</li>
	</ul>
</li>

<li>
	<span style="font-family: 'Fira Sans', sans-serif ;background-color: #ecae31; padding: 3px 5px; border-radius: 10px; color: white">POST</span> /search
	<ul>
		<li>headers: Content-Type = application/json (se não gerado pela aplicação)</li>
		<li>body: 
			<ul>
				<li>query: "string" // Item pesquisado</li>
				<li>language: "string" // Idioma da pesquisa</li>
				<li>date: "string|datetime" // Data da pesquisa</li>
				<li>items: "array" // Array contendo os links e títulos dos resultados reunidos encapsulados em objetos</li>
			</ul>
		</li>
	</ul>
</li>

<li>
	<span style="font-family: 'Fira Sans', sans-serif ;background-color: #009756; padding: 3px 5px; border-radius: 10px; color: white">GET</span> /results
</li>

---

## Resultados obtidos através do *Postman*

<li><span style="font-family: 'Fira Sans', sans-serif ;background-color: #009756; padding: 3px 5px; border-radius: 10px; color: white">GET</span> /search?q=Homem+de+Ferro&lr=lang_pt&n=3</li>

![Exemplo 1](./public/examples/get_search.png)

<li><span style="font-family: 'Fira Sans', sans-serif ;background-color: #ecae31; padding: 3px 5px; border-radius: 10px; color: white">POST</span> /search</li>

##### Body enviado:

![Exemplo 2 - Body](./public/examples/post_search_in.png)

##### Resposta:

![Exemplo 2 - Responsta](./public/examples/post_search_out.png)

<li>
	<span style="font-family: 'Fira Sans', sans-serif ;background-color: #009756; padding: 3px 5px; border-radius: 10px; color: white">GET</span> /results
</li>

<p>OBS.: Esta rota funciona de maneira diferente dependendo de onde foi feita a requisição. Para navegadores a resposta é retornada como um download de arquivo e, para demais agentes, é retornado um JSON com os mesmos dados.</p>

##### Navegadores

![Exemplo 3 - Navegador](./public/examples/get_results_browser.png)

##### Outro agentes

![Exemplo 3 - Outros Agentes](./public/examples/get_results_oa.png)
