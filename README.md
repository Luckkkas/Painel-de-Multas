# 🚦 Sistema de Multas

Aplicação web para registrar multas de trânsito e acompanhar os pontos da carteira de habilitação. Feita com HTML, CSS e JavaScript puro, sem frameworks, como projeto de estudo.

## ✨ Funcionalidades

- Cadastro de multas com nome do motorista, placa, infração e data
- Validação da placa nos formatos antigo (`ABC-1234`) e Mercosul (`ABC1D23`)
- Cálculo automático de pontos e do valor total das multas
- Medidor de pontos que muda de cor e de mensagem conforme o risco
- Aviso quando o limite de 20 pontos é atingido
- Lista de multas com opção de remover uma ou limpar todas

## 🎨 Gravidades

| Gravidade | Pontos | Valor |
|---|---|---|
| Leve | 3 | R$ 88,38 |
| Média | 4 | R$ 130,16 |
| Grave | 5 | R$ 195,23 |
| Gravíssima | 7 | R$ 293,47 |

> Os valores são os valores-base do Código de Trânsito Brasileiro, e a regra de suspensão foi simplificada para 20 pontos. O projeto tem fins educacionais.

## 🧰 Tecnologias

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ▶️ Como usar

1. Baixe ou clone o repositório.
2. Mantenha `index.html`, `style.css` e `script.js` na mesma pasta.
3. Abra o `index.html` no navegador.

## 🗂️ Estrutura

```
├── index.html   # estrutura da página
├── style.css    # visual e cores
└── script.js    # regras, cálculos e interação
```

## 🔧 Personalização

- **Cores:** em `style.css`, no bloco `:root`.
- **Infrações:** em `script.js`, na lista `INFRACOES`.
- **Valores e pontos:** em `script.js`, no objeto `GRAVIDADES`.

## 📚 O que pratiquei

- Manipulação do DOM e eventos
- Validação de formulários com expressões regulares
- Organização de dados com arrays e objetos
- Layout responsivo com CSS Grid

## 🔮 Próximos passos

- Salvar as multas no navegador com `localStorage`
- Filtrar e buscar por placa
- Adicionar mais infrações

## 👨‍💻 Autor

**Lucas Raphael**, desenvolvedor web em formação, de Recife.
[LinkedIn](https://www.linkedin.com/in/lucas-raphael-23850643b/) · [GitHub](https://github.com/Luckkkas)
