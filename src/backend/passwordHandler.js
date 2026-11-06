
import rules from "./rules.js"

function passwordHandler(
  password,
  captchaChecked,
  captchaAnswer,
  geoGuessrAnswers,
  congoRuleActivated,
  mimicEliminated,
  fontRanges = []
) {
  const normalize = (text) =>
    String(text ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase()

  const normalizedPassword = normalize(password);

  const hasLula = normalizedPassword.includes(
    normalize("Luiz Inácio Lula da Silva")
  )

  const hasFelix = normalizedPassword.includes(
    normalize("Félix Antoine Tshisekedi Tshilombo")
  )

  const word = "eisqueleto";
  const wordIndex = password.toLowerCase().indexOf(word)

  const eisqueletoInComicSans =
    wordIndex !== -1 &&
    fontRanges.some((range) =>
      range.fontFamily === "Comic Sans MS" &&
      range.start <= wordIndex &&
      range.end >= wordIndex + word.length
    );

  const results = rules.map((rule) => {
    let passed
    let text = rule.text

    if (rule.id === 8) {
      passed = captchaChecked

    } else if (rule.id === 9) {
      passed = normalizedPassword.includes(
        normalize(captchaAnswer)
      );

    } else if (rule.id === 13) {
      passed = normalizedPassword.includes(
        normalize("rick astley")
      );

    } else if (rule.id === 16) {
      passed = mimicEliminated

    } else if (rule.id === 20) {
      passed = eisqueletoInComicSans

    } else {
      passed = rule.check(password)
    }

    return {
  id: rule.id,
  text,
  link: rule.link,
  passed,
}
  })

  return results
}

export default passwordHandler
