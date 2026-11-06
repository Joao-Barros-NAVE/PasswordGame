const names = ["coxinha", "dna", "piggy"]

const rules = [
  {
    id: 1,
    text: "A senha deve ter pelo menos 5 caracteres.",
    check: (password) => password.length >= 5,
  },
  {
    id: 2,
    text: "A senha deve conter pelo menos um número.",
    check: (password) => /\d/.test(password),
  },
  {
    id: 3,
    text: "A senha deve conter pelo menos uma letra maiúscula.",
    check: (password) => /[A-Z]/.test(password),
  },
  {
    id: 4,
    text:
      "A senha deve conter o nome de um personagem da Turma da Mônica criado em 1994.",
    check: (password) => {
      const normalize = (text) =>
        text
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]/g, "")

      const normalizedPassword = normalize(password);

      const validNames = [
        "nimbus",
        "docontra"
      ];

      return validNames.some((name) =>
        normalizedPassword.includes(name)
      );
    }
  },
  {
    id: 5,
    text: "A senha deve conter o nome do personagem que possui uma estátua nas coordenadas 39.91892, -123.76441.",
    check: (password) => {
      const normalizedPassword = password
        .toLowerCase()
        .replace(/\s+/g, "");

      return normalizedPassword.includes("billcipher");
    }
  },
  {
    id: 6,
    text:
      "A senha deve conter o valor estimado de um Incenso de Comandar Elementais do Ar em peças de electrum em D&D 5e.",
    check: (password) => {
      const normalizedPassword = password
      return normalizedPassword.includes("10000");
    }
  },
  {
    id: 7,
    text: "Dinheiro não dá em árvore, pelo menos 20% da senha deve ser composta pelos nossos patrocinadores.",
    check: (password) => {
      const normalize = (text) =>
        text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "")
          .toLowerCase();

      const normalizedPassword = normalize(password);

      const sponsors = [
        "ProfessorClicker",
        "ManoCoxas",
        "TetiCorre"
      ].map(normalize);

      let sponsorCharacters = 0;

      sponsors.forEach((sponsor) => {
        let index = 0;

        while (
          (index = normalizedPassword.indexOf(sponsor, index)) !== -1
        ) {
          sponsorCharacters += sponsor.length
          index += sponsor.length
        }
      });

      return (
        normalizedPassword.length > 0 &&
        sponsorCharacters / normalizedPassword.length >= 0.20
      );
    },
  },
  {
    id: 8,
    text: "Verifique que você não é um robô.",
    check: () => false,
  },
  {
    id: 9,
    text: "A senha deve conter a resposta do captcha.",
    check: () => false,
  },
  {
    id: 10,
    text: 'A senha deve conter o momento em que o Michael faz seu 9° "HEE HEE" em',
    link: "https://www.youtube.com/watch?v=LrqKjMovRSs",
    check: (password) => password.includes("19:06"),
  },
  {
    id: 11,
    text: "A senha deve conter o nome do presidente da República",
    check: (password) => {
      const normalizedPassword = password
        .toLowerCase()
        .replace(/\s+/g, "");

      return normalizedPassword.includes("luizinacioluladasilva");
    }
  },
  {
    id: 12,
    text: "A senha deve conter o nome do presidente da República Democrática do Congo",
    check: (password) => {
      const normalizedPassword = password
        .toLowerCase()
        .replace(/\s+/g, "");

      return normalizedPassword.includes("Félix Antoine Tshisekedi Tshilombo");
    }
  },
  {
    id: 13,
    text: "",
    check: () => false,
  },
  {
    id: 14,
    text: "A senha deve conter o lance final da Partida do Século entre Bobby Fischer e Donald Byrne",
    check: (password) => {
      const normalizedPassword = password
        .toLowerCase()
        .replace(/\s+/g, "")

      return normalizedPassword.includes("rc2#")
    }
  },
  {
    id: 15,
    text: "Em quem você aposta? Matheus Claxynz, Amanda ou Andrey",
    check: (password) => {
      const normalized = password
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "")
        .toLowerCase()

      return normalized.includes("amanda")
    },
  },
  {
    id: 16,
    text: "O mago Mordenkainen disse que um dos caracteres é um mímico, elimine-o antes que devore toda a senha.",
    check: () => false,
  },
  {
    id: 17,
    text:
      "A senha deve conter o número de caracteres na letra de Faroeste Caboclo em binário (incluindo os espaços).",
    check: (password) => {
      const normalizedPassword = password
      return normalizedPassword.includes("1100001111011")
    }
  },
  
  {
    id: 18,
    text: "A senha deve conter o nome dos desenvolvedores.",
    check: (password) =>
      names.every((name) =>
        password.toLowerCase().includes(name)
      ),
  },
  {
    id: 19,
    text: "Eis que...💀",
    check: (password) => {
      const normalizedPassword = password
        .toLowerCase()
        .replace(/\s+/g, "")

      return normalizedPassword.includes("eisqueleto")
    }
  },
  {
    id: 20,
    text: "A resposta da piadinha deve estar escrita na fonte Comic Sans MS.",
    check: () => false,
  },
]

export default rules