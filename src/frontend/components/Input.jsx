
import { useRef, useLayoutEffect } from "react"

function Input({
  password,
  setPassword,
  mimicIndex,
  mimicEliminated,
  fontRanges,
  setFontRanges,
  showFontToolbar,
}) {
  const editorRef = useRef(null)

  useLayoutEffect(() => {
    const editor = editorRef.current

    if (editor && editor.innerText !== password) {
      editor.innerText = password
    }
  }, [password])

  const updateFontRanges = () => {
    const editor = editorRef.current
    if (!editor) return

    const ranges = []
    const walker = document.createTreeWalker(
      editor,
      NodeFilter.SHOW_TEXT
    )

    let position = 0
    let node

    while ((node = walker.nextNode())) {
      const parent = node.parentElement
      const fontFamily = parent?.closest("[data-font]")?.dataset.font
      const length = node.textContent.length

      if (fontFamily) {
        ranges.push({
          start: position,
          end: position + length,
          fontFamily,
        })
      }

      position += length
    }

    setFontRanges(ranges)
  }

  const applyFont = (fontFamily) => {
    const editor = editorRef.current
    const selection = window.getSelection()

    if (!editor || !selection || selection.rangeCount === 0) return;

    const selectedRange = selection.getRangeAt(0)

    if (
      !editor.contains(selectedRange.startContainer) ||
      !editor.contains(selectedRange.endContainer) ||
      selectedRange.collapsed
    ) {
      return
    }

    const span = document.createElement("span")
    span.dataset.font = fontFamily
    span.style.fontFamily = fontFamily

    const selectedContent = selectedRange.extractContents()
    span.appendChild(selectedContent)
    selectedRange.insertNode(span)

  
    setPassword(editor.innerText)
    updateFontRanges()

    selection.removeAllRanges()
  }

  const handleInput = () => {
    const editor = editorRef.current

    setPassword(editor.innerText)
    updateFontRanges()
  }

  return (
    <div className="password-input-container">
      {showFontToolbar && (
  <div className="font-toolbar">
    <button
      type="button"
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => applyFont("Comic Sans MS")}
    >
      Comic Sans MS
    </button>
  </div>
)}

      <div
        ref={editorRef}
        className="password-editor"
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Digite sua senha"
        onInput={handleInput}
      />
    </div>
  )
}

export default Input
