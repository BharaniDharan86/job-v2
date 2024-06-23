export const generateOtp = (length = 6) => {
  const characters =
    "0a1b2c3d4e5f6g7h8i9jAkBlCmDnEoFpGqHrIsJtKuLvMwNxOyPzQqRrSsTtUuVvWwXxYyZz";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const ind = Math.floor(Math.random() * characters.length);
    otp += characters[ind];
  }

  return otp;
};
