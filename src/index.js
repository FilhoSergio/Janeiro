const express = require("express");
const app = express();

const axios = require("axios");
require("dotenv/config");


const clientID = process.env.CLIENT_ID;

const clientSecret = process.env.CLIENT_SECRET;

// rotas
app.get("/home", (req, res) => {
  const requestToken = req.query.code;

  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,

    headers: {
      accept: "application/json"
    }
  }).then(response => {
    const accessToken = response.data.access_token;
    console.log(response.data);

    // redireciona o user para a pagina home e retona o token
    res.redirect(`/home.html?access_token=${accessToken}`);
  });
});

app.use(express.static(__dirname + "/public"));
app.listen(4000, () => {
  console.log("Serviço executado na porta : 4000");
});
