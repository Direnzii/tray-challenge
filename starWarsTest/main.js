import http from "k6/http";
import { check } from "k6";

const url = "https://swapi.dev/api";

export const options = {
  insecureSkipTLSVerify: true, // por algum motivo a api nao estava retornando com certificado, por isso essa linha
  vus: 10,
  iterations: 10,
};

const validarContentType = (r) =>
  r.headers["Content-Type"] &&
  r.headers["Content-Type"].includes("application/json");

function validacaoStatusCode(status) {
  return (r) => r.status === status;
}

function validarFormatoRequest() {
  const response = http.get(`${url}/films/?format=json`);
  check(response, {
    "Resposta é um Json valido": (r) => {
      if (!r.body) return false;
      try {
        JSON.parse(r.body);
        return true;
      } catch (err) {
        return false;
      }
    },
    "Contem a key results": (r) => {
      const json = JSON.parse(r.body);
      return json.hasOwnProperty("results");
    },
    "Status-code é 200": validacaoStatusCode(200),
    "Content-type é application/json": validarContentType,
  });
}

function validarRetornoUrlInvalida() {
  const response = http.get(`${url}/films/?format=jsonx`);
  check(response, {
    "Contem a key detail: Not found": (r) => {
      try {
        const json = JSON.parse(r.body);
        return json.detail === "Not found";
      } catch (err) {
        return false;
      }
    },
    "Status-code é 404": validacaoStatusCode(404),
    "Content-type é application/json": validarContentType,
  });
}

function validarFilmeInexistente() {
  const response = http.get(`${url}/films/10`);
  check(response, {
    "Status-code é 404": validacaoStatusCode(404),
    "Content-type é Json": validarContentType,
    "Contem a key detail: Not found": (r) => {
      try {
        const json = JSON.parse(r.body);
        return json.detail === "Not found";
      } catch (err) {
        return false;
      }
    },
  });
}

function validarCamposFilme(key, value) {
  return (r) => {
    const json = JSON.parse(r.body);
    return json[key] === value;
  };
}

function retornaValue(key) {
  return (r) => {
    const json = JSON.parse(r.body);
    return json[key];
  };
}

function isDataAmericanaValida(data) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(data);
}

function validarDadosFilne() {
  const response = http.get(`${url}/films/2`);
  check(response, {
    "Status-code é 200": validacaoStatusCode(200),
    "Content-type é application/json": validarContentType,
    "Resposta contém title": validarCamposFilme(
      "title",
      "The Empire Strikes Back"
    ),
    "Resposta contém episode_id": validarCamposFilme("episode_id", 5),
    "Resposta contém director": validarCamposFilme(
      "director",
      "Irvin Kershner"
    ),
    "Resposta contém producer": validarCamposFilme(
      "producer",
      "Gary Kurtz, Rick McCallum"
    ),
    "Resposta contém release_date": validarCamposFilme(
      "release_date",
      "1980-05-17"
    ),
    "Validar data padrão americano": (r) => {
      const json = JSON.parse(r.body);
      return isDataAmericanaValida(json.release_date);
    },
  });
}

function validarC3PO() {
  const response = http.get(`${url}/people/2`);
  const mock = {
    name: "C-3PO",
    height: "167",
    mass: "75",
  };
  check(response, {
    "Status-code é 200": validacaoStatusCode(200),
    "Content-type é application/json": validarContentType,
    "Name é C-3PO": (r) => JSON.parse(r.body).name === mock.name,
    "Altura corresponde": (r) => JSON.parse(r.body).height === mock.height,
    "Peso corresponde": (r) => JSON.parse(r.body).mass === mock.mass,
    "participa de pelo menos um filme": (r) => {
      const json = JSON.parse(r.body);
      return Array.isArray(json.films) && json.films.length > 0;
    },
  });
}

export default function () {
  validarFormatoRequest(); //cenario 1
  validarRetornoUrlInvalida(); //cenario 2
  validarFilmeInexistente(); //cenario 3
  validarDadosFilne(); //cenario 4, 5, 6 e 7
  validarC3PO(); //cenario 8
}
