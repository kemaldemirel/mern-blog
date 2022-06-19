export const responseUser = (success, message = "Ok", token, user) => {
  if (token && user) {
    return {
      success,
      token,
      user,
    };
  }

  return {
    success,
    message,
  };
};
