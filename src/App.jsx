
import { useEffect, useState, useRef } from "react";
import passwordHandler from "./backend/passwordHandler";
import captchas from "./backend/captchas";

import Navbar from "./frontend/components/Navbar";
import Input from "./frontend/components/Input";
import TextHint from "./frontend/components/TextHint";
import Footer from "./frontend/components/Footer";
import CaptchaCheckbox from "./frontend/components/CaptchaCheckbox";
import CaptchaImage from "./frontend/components/CaptchaImage";
import RickAstleyGif from "./frontend/components/RickAstleyGif";

import "./App.css";

function App() {
  const [password, setPassword] = useState("")
  const [mimicIndex, setMimicIndex] = useState(null)
  const [mimicEliminated, setMimicEliminated] = useState(false)
  const [mimicStarted, setMimicStarted] = useState(false)
  const [fontRanges, setFontRanges] = useState([])
  const passwordRef = useRef(password)
  const mimicIndexRef = useRef(null)
  const mimicInitializedRef = useRef(false)
  
    const [captchaChecked, setCaptchaChecked] = useState(false)
    const [unlockedCount, setUnlockedCount] = useState(0)

    const currentCaptcha = captchas[0]

    const results = passwordHandler(
    password,
    captchaChecked,
    currentCaptcha.answer,
    mimicEliminated,
    fontRanges
  )

  useEffect(() => {
    if (unlockedCount === 0 && password.length > 0) {
      setUnlockedCount(1);
      return;
    }

    const lastUnlockedRule = results[unlockedCount - 1]

    if (
      lastUnlockedRule &&
      lastUnlockedRule.passed &&
      unlockedCount < results.length
    ) {
      setUnlockedCount((current) => current + 1)
    }
  }, [password, captchaChecked, unlockedCount, results])

    const unlockedRules = results.slice(0, unlockedCount)
    useEffect(() => {
    const mimicRuleVisible = unlockedRules.some(
      (rule) => rule.id === 16
    );

    if (
      mimicRuleVisible &&
      !mimicInitializedRef.current &&
      password.length > 0
    ) {
      const characters = Array.from(password)

      const randomIndex = Math.floor(
        Math.random() * characters.length
      )

      mimicIndexRef.current = randomIndex

      setMimicIndex(randomIndex)
      setMimicStarted(true)

      mimicInitializedRef.current = true
    }
  }, [unlockedCount, password, unlockedRules])
  useEffect(() => {
    if (!mimicStarted || mimicEliminated) return

    const interval = setInterval(() => {
      const characters = Array.from(passwordRef.current)

      const currentMimicIndex = mimicIndexRef.current

      if (
        currentMimicIndex === null ||
        characters.length <= 1
      ) {
        return
      }

      const possibleIndexes = characters
        .map((_, index) => index)
        .filter((index) => index !== currentMimicIndex)

      if (possibleIndexes.length === 0) return

      const randomIndex =
        possibleIndexes[
          Math.floor(Math.random() * possibleIndexes.length)
        ]

      characters.splice(randomIndex, 1)

      const updatedPassword = characters.join("")

      passwordRef.current = updatedPassword
      setPassword(updatedPassword)

      if (randomIndex < currentMimicIndex) {
        const newIndex = currentMimicIndex - 1

        mimicIndexRef.current = newIndex
        setMimicIndex(newIndex)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [mimicStarted, mimicEliminated])

    const [gameOver, setGameOver] = useState(false)
    useEffect(() => {
    const normalize = (text) =>
      String(text ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "")
        .toLowerCase()

    const normalizedPassword = normalize(password)

    if (
      normalizedPassword.includes("matheusclaxynz") ||
      normalizedPassword.includes("andrey")
    ) {
      setGameOver(true)
    }
  }, [password])

    const sortedRules = [...unlockedRules].sort((a, b) => {
      if (a.passed === b.passed) {
        return a.id - b.id
      }

      return a.passed ? 1 : -1
    })
  if (gameOver) {
    return (
      <div className="app game-over">
        <h1>VOCÊ PERDEU</h1>

        <p>Você apostou na pessoa errada.</p>
      </div>
    );
  }
  const handleUserPasswordChange = (nextPassword) => {
    const previousChars = Array.from(passwordRef.current)
    const nextChars = Array.from(nextPassword)

    let prefix = 0

    while (
      prefix < previousChars.length &&
      prefix < nextChars.length &&
      previousChars[prefix] === nextChars[prefix]
    ) {
      prefix++
    }

    let suffix = 0

    while (
      suffix < previousChars.length - prefix &&
      suffix < nextChars.length - prefix &&
      previousChars[previousChars.length - 1 - suffix] ===
        nextChars[nextChars.length - 1 - suffix]
    ) {
      suffix++
    }
    const oldEnd = previousChars.length - suffix
    const newEnd = nextChars.length - suffix
    const removedCount = oldEnd - prefix
    const insertedCount = newEnd - prefix

    const currentMimicIndex = mimicIndexRef.current
    if (currentMimicIndex !== null) {
      if (
        currentMimicIndex >= prefix &&
        currentMimicIndex < oldEnd
      ) {
        mimicIndexRef.current = null
        setMimicIndex(null)
        setMimicEliminated(true)
        setMimicStarted(false)

      } else if (currentMimicIndex >= oldEnd) {
        const newIndex =
          currentMimicIndex - removedCount + insertedCount

        mimicIndexRef.current = newIndex
        setMimicIndex(newIndex)
      }
    }

    passwordRef.current = nextPassword
    setPassword(nextPassword)
  }
    return (
      
      <div className="app">
        <Navbar />

        <main className="game">

  <Input
    password={password}
    setPassword={handleUserPasswordChange}
    mimicIndex={mimicIndex}
    mimicEliminated={mimicEliminated}
    fontRanges={fontRanges}
    setFontRanges={setFontRanges}
    showFontToolbar={unlockedRules.some((rule) => rule.id === 20)}
  />

  <div className="rules">
  {sortedRules.map((rule) => (
   <TextHint key={rule.id} rule={rule}>

    {rule.id === 8 && !rule.passed && (
    <CaptchaCheckbox
        checked={captchaChecked}
        setChecked={setCaptchaChecked}
    />
    )}

    {rule.id === 9 && !rule.passed && (
    <CaptchaImage captcha={currentCaptcha} />
    )}

    {rule.id === 13 && (
    <RickAstleyGif />
    )}

  </TextHint>
  ))}
  </div>
  </main>

  <Footer/>
  </div>
  )
}

export default App
