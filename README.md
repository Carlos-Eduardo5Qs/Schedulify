### Sistema de agendamento com Pagamento Online e Bot Assistente

1. **Resumo**: O sistema permite que clientes agendem horários com um prestador de serviço, mas somente após a realização do pagamento. Todo o atendimento será realizado via WhatsApp, auxiliado por um bot que coleta informações do cliente e valida o pagamento antes de confirmar o agendamento. O sistema também notifica tanto o cliente quanto o prestador sobre eventos importantes, como confirmações, alterações e cancelamentos.

---

2. **Funcionamento Geral**:

  - **Clientes**:
    - Consultam horários disponíveis com base na agenda do prestador.
    - Realizam pagamentos online para confirmar o agendamento.

    - **Recebem notificações via WhatsApp**:
      - Confirmação do agendamento.
      - Lembretes (ex.: 24 horas antes do horário marcado).
      - Notificações de alterações feitas pelo prestador ou pelo cliente.
      - Confirmação de reembolsos.

    - **Podem**:
      - Adiar, cancelar ou alterar agendamentos.
      - Solicitar reembolsos diretamente pelo sistema.
      - Visualizar seus horários confirmados.

  - **Prestadores de Serviços**:
    - Configuram horários disponíveis para atendimento (ex.: 5h às 16h).
    - Definem o número máximo de clientes por horário (ex.: até 4 clientes).
    
    - **Recebem notificações via WhatsApp**:
      - Confirmação de novos agendamentos.
      - Solicitações de alterações ou cancelamentos.
      - Atualizações sobre o status dos pagamentos dos clientes.
    
    - **Podem**:
      - Cancelar atendimentos e processar reembolsos.
      - Gerenciar a lista de clientes e horários.
      - Alterar a disponibilidade a qualquer momento.

  - **Bot Assistente**:

    - **Atua como intermediário para coleta de informações do cliente, como**:
      - Nome, preferências, e detalhes relevantes para o atendimento.
      - Valida o pagamento antes de confirmar o agendamento.

    - **Envia mensagens automáticas para**:
      - Informar horários disponíveis.
      - Confirmar dados fornecidos pelo cliente.
      - Acompanhar solicitações de alterações ou cancelamentos.

---

3. **Sistema de Notificações**:
  - As notificações são parte central da experiência do sistema e funcionam da seguinte forma:

  - **Tipos de notificações**:

    - **Para clientes**:
      - Confirmação de agendamento.
      - Lembretes (enviados antes do horário marcado).
      - Atualizações sobre alterações de horário.
      - Cancelamentos (com ou sem reembolso).
      - Mensagens sobre o status do pagamento (pendente, confirmado, ou reembolsado).
  
    - **Para Prestadores**:
      - Notificação de novos agendamentos.
      - Alterações ou cancelamentos feitos por clientes.
      - Atualizações de status de pagamento.
      - Solicitações de reembolso.

  - **Canal de Notificação**:
    > **WhatsApp**: O sistema usará o WhatsApp para envio de mensagens em tempo real, garantindo que todos os envolvidos sejam informados imediatamente.

---

4. **Sistema de Reembolso**:

  - **Solicitações de Reembolso**:

      - **Por Parte do Cliente**:
        - O cliente pode solicitar o reembolso diretamente pelo sistema (ex.: botão "Cancelar e Solicitar Reembolso").
        - O sistema verifica se a solicitação está dentro do prazo permitido (ex.: até 24 horas antes do horário agendado).

        - **Caso a solicitação deja válida**:
          - O status do agendamento é alterado para "Reembolso Solicitado".
          - Uma notificação é enviada ao prestador de serviço para aprovar ou rejeitar a solicitação.
        
        - **Caso a solicitação esteja fora do prazo permitido**:
          - O sistema rejeita automaticamente e envia uma mensagem ao cliente explicando o motivo.
      
      - **Por Parte do Prestador**:
        - O prestador pode decidir reembolsar um cliente a qualquer momento (ex.: cancelamento por indisponibilidade ou outro motivo).
        - O sistema processa o reembolso automaticamente e notifica o cliente.

      - **Processamento Automático (Caso a gente a gente permita no sistema de pagamento)**:
        - O sitema realiza o reembolso diretamente para o método de pagamento usado (ex.:cartão de crédito, PIX).
        - Um comprovante do reembolso é gerado e enviado ao cliente.

---

5. **Regras do Sistema**:
  - Cada horário pode ter até "X" clientes (definido pelo prestador).
  - Apenas horários com vagas disponíveis são exibidos para clientes.
  - O pagamento é obrigatório para a confirmação de agendamentos.
  - Alterações ou cancelamentos podem ser feitos até X horas antes do horário marcado.
  - O sistema gerencia notificações de forma automática, enviando mensagens programadas para todos os envolvidos.