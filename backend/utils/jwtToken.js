export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // only over HTTPS
      sameSite: 'Lax', // or 'None' if you're doing cross-domain
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};
