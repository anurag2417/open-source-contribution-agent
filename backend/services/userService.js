const supabase = require("../config/supabase")

const saveUser = async (user) => {
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("github_id", user.githubId)
    .single()

  if (existingUser) {
    return existingUser
  }

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        github_id: user.githubId,
        username: user.username,
        display_name: user.displayName,
        avatar_url: user.avatar,
        profile_url: user.profileUrl,
      },
    ])
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

module.exports = saveUser