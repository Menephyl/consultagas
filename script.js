const channels = [
  {
    name: 'Aplicativo Bolsa Família',
    what: 'App oficial para acompanhar benefícios sociais e mensagens da conta.',
    how: 'Disponível para Android e iOS. Faça login com sua conta Gov.br.',
    steps: [
      'Abra o app Bolsa Família.',
      'Entre com CPF e senha Gov.br.',
      'Verifique a aba de benefícios e calendário.',
      'Confira notificações e mensagens do sistema.'
    ],
    notes: 'Em alguns períodos, a atualização pode levar algumas horas após processamento.',
    cta: 'https://www.gov.br/pt-br/servicos/aplicativo-bolsa-familia'
  },
  {
    name: 'Aplicativo CAIXA Tem',
    what: 'App da CAIXA para movimentação e consulta de benefícios e extrato.',
    how: 'Baixe nas lojas oficiais e entre com seus dados cadastrados.',
    steps: ['Acesse o CAIXA Tem.', 'Confira extrato e saldo.', 'Verifique mensagens dentro do app.'],
    notes: 'Evite instalar aplicativos fora das lojas oficiais.',
    cta: 'https://www.caixa.gov.br/caixatem/Paginas/default.aspx'
  },
  {
    name: 'Portal Cidadão CAIXA',
    what: 'Portal web para consultar informações de benefícios por acesso autenticado.',
    how: 'Entre pelo navegador em ambiente seguro e confira dados da conta.',
    steps: ['Abra o Portal Cidadão CAIXA.', 'Faça login.', 'Procure pela área de benefícios.'],
    notes: 'Sempre confirme o cadeado de segurança no navegador.',
    cta: 'https://cidadao.caixa.gov.br/'
  },
  {
    name: 'Telefone 111',
    what: 'Canal de atendimento da CAIXA para orientações sobre benefícios.',
    how: 'Ligue do seu telefone e siga as opções automáticas ou atendimento.',
    steps: ['Disque 111.', 'Informe os dados solicitados.', 'Anote número de protocolo se disponível.'],
    notes: 'Tenha CPF em mãos para agilizar.',
    cta: 'tel:111'
  },
  {
    name: 'Telefone 121',
    what: 'Canal de atendimento do MDS para informações de programas sociais.',
    how: 'Ligue 121 para tirar dúvidas sobre regras e cadastro.',
    steps: ['Disque 121.', 'Selecione a opção correspondente.', 'Confirme orientações de atualização cadastral.'],
    notes: 'Horários de atendimento podem variar por região.',
    cta: 'tel:121'
  },
  {
    name: 'Consulta por CPF (quando disponível)',
    what: 'Em alguns canais oficiais pode haver consulta por CPF com autenticação.',
    how: 'Verifique no app ou portal oficial se a funcionalidade está ativa.',
    steps: ['Acesse canal oficial.', 'Procure opção de consulta por CPF.', 'Confira retorno e orientações.'],
    notes: 'Nunca informe CPF em sites não oficiais.',
    cta: 'https://www.caixa.gov.br/'
  }
];

const tabs = document.querySelector('.channel-tabs');
const panel = document.getElementById('channel-panel');

function renderPanel(channel) {
  panel.innerHTML = `
    <h3>${channel.name}</h3>
    <p><strong>O que é:</strong> ${channel.what}</p>
    <p><strong>Como acessar:</strong> ${channel.how}</p>
    <p><strong>Passo a passo:</strong></p>
    <ol>${channel.steps.map((step) => `<li>${step}</li>`).join('')}</ol>
    <p><strong>Observação útil:</strong> ${channel.notes}</p>
    <div class="hero-actions">
      <a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="${channel.cta}">Abrir canal</a>
      <button class="btn btn-secondary" id="copy-instructions" type="button">Copiar instruções</button>
    </div>
  `;

  document.getElementById('copy-instructions').addEventListener('click', async (event) => {
    const text = `${channel.name}\n${channel.what}\n${channel.how}\n${channel.steps.join(' | ')}`;
    await navigator.clipboard.writeText(text);
    const original = event.target.textContent;
    event.target.textContent = 'Instruções copiadas!';
    setTimeout(() => (event.target.textContent = original), 1800);
  });
}

channels.forEach((channel, i) => {
  const btn = document.createElement('button');
  btn.className = `tab-btn ${i === 0 ? 'active' : ''}`;
  btn.textContent = channel.name;
  btn.type = 'button';
  btn.setAttribute('role', 'tab');
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderPanel(channel);
  });
  tabs.appendChild(btn);
});

renderPanel(channels[0]);

const simForm = document.getElementById('sim-form');
const simResult = document.getElementById('sim-result');
simForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(simForm);
  let score = 0;
  ['cadunico', 'bolsa', 'atualizado', 'caixa', 'mensagens'].forEach((f) => {
    if (data.get(f)) score++;
  });

  let msg = 'Vale conferir nos canais oficiais.';
  if (score >= 4) msg = 'Você pode ter perfil para consulta oficial. Consulte os canais agora.';
  if (score <= 2) msg = 'Atualizar cadastro pode ser importante antes de nova consulta.';

  simResult.innerHTML = `<strong>Resultado orientativo:</strong> ${msg}`;
});

const copyPix = document.getElementById('copy-pix');
const copyStatus = document.getElementById('copy-status');
copyPix.addEventListener('click', async () => {
  await navigator.clipboard.writeText(document.getElementById('pix-key').textContent.trim());
  copyStatus.textContent = 'Chave Pix copiada com sucesso!';
  setTimeout(() => (copyStatus.textContent = ''), 2000);
});

const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
menuToggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
