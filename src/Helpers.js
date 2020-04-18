export function profileType(auth, profile) {
  if (auth.uid && profile) {
    if (profile.type === "Company") {
      return "Company";
    } else {
      return "User";
    }
  } else {
    return "Guest";
  }
}
