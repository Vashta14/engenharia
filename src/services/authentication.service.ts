export async function authentication(props: authenticationProps) {
  const { password, email } = props;
  const users: Record<string, user> = {
    "abc@gmail.com": { name: "Raul", password: "1234abcd" },
    "abcd@gmail.com": { name: "Raul Lima", password: "1234abcd" },
  };
  if (users[email]?.password === password) {
    const user = users[email];
    return new Response(JSON.stringify({ name: user.name }), {
      status: 200,
    });
  }
  return new Response(null, { status: 404 });
}
