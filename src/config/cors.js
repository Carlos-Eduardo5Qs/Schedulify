// Configuração para o CORS (Cross-Origin Resource Sharing)
export const CORSconfig = {
  // Define a origem permitida para acessar a API
  // Neste caso, apenas requisições vindas de 'http://localhost' serão aceitas
  origin: 'http://localhost',

  // Define os métodos HTTP permitidos para interação com a API
  // Aqui, são permitidos GET, POST, PUT e DELETE
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
