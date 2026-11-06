function Footer() {
  const authors = [
    {
      name: "Mateus Antônio",
      github: "https://github.com/ymateu",
    },
    {
      name: "Davi Neres",
      github: "https://github.com/",
    },
    {
      name: "João Guilherme",
      github: "https://github.com/Joao-Barros-NAVE",
    },
  ]

  return (
    <footer className="footer">
      <div className="footer-line"></div>

      <div className="footer-content">
        <p>Desenvolvido por</p>

        <div className="footer-authors">
          {authors.map((author) => (
            <a
              key={author.name}
              href={author.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {author.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer