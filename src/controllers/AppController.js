// Definição da classe responsável pelo controle das requisições principais da aplicação
class AppController {
  // Método que retorna uma mensagem simples para a rota inicial
  getHome(req, res) {
    // Envia uma resposta com uma mensagem de boas-vindas
    res.send('Welcome to the API!');
  }

  // Método que retorna o status da API
  getStatus(req, res) {
    // Envia uma resposta JSON com o status "Okay!" e código HTTP 200 (sucesso)
    res.status(200).json({ status: 'Okay!' });
  }
}

// Exporta uma instância da classe AppController para ser utilizada em outros módulos
export const appController = new AppController();
