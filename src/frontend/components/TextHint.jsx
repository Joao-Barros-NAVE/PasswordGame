function TextHint({ rule, children }) {
  return (
    <div className={`rule-box ${rule.passed ? "rule-passed" : "rule-failed"}`}>
      <p>
        {rule.text}
        {rule.link && (
          <>
            {" "}
            <a
              href={rule.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.youtube.com/watch?v=LrqKjMovRSs
            </a>
          </>
        )}
      </p>

      {children && <div className="rule-extra">{children}</div>}
    </div>
  )
}

export default TextHint