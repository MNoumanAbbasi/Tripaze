export function profileType(auth, profile) {
  if (auth.uid && profile) {
    if (profile.type === 'Company') {
      return 'Company';
    } else {
      return 'User';
    }
  } else {
    return 'Guest';
  }
}

export function validatePassword(password) {
  let letter = /[a-zA-Z]/;
  let number = /[0-9]/;
  let valid = number.test(password) && letter.test(password); //match a letter _and_ a number
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  } else if (!valid) {
    return 'Password must contain at least one number and one alphabet.';
  } else {
    return 'Valid';
  }
}
