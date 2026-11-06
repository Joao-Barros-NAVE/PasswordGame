function CaptchaCheckbox({ checked, setChecked }) {
  return (
    <div className="captcha-checkbox">
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />

        <span>No, I'm not a robot</span>
      </label>
    </div>
  );
}

export default CaptchaCheckbox