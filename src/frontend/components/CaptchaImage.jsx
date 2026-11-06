function CaptchaImage({ captcha }) {
  return (
    <div className="captcha-image">
      <img
        src={captcha.image}
        alt="CAPTCHA"
      />
    </div>
  );
}

export default CaptchaImage