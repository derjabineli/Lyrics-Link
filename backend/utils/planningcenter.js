export async function getPCCredentials(code) {
  let requestOptions = {
    method: "POST",
    redirect: "follow",
  };
  const data = await fetch(
    `https://api.planningcenteronline.com/oauth/token?&grant_type=authorization_code&code=${code}&client_id=${process.env.PCCLIENTID}&client_secret=${process.env.PCSECRET}&redirect_uri=${process.env.REDIRECTURI}`,
    requestOptions
  );
  const accessData = await data.json();
  return accessData;
}
