import pandas as pd
import requests
from geopy.geocoders import ArcGIS
import time
from pymongo import MongoClient

geolocator = ArcGIS(timeout=10)

client = MongoClient("mongodb+srv://root:root@buscafarma.xprmej7.mongodb.net/?retryWrites=true&w=majority&appName=BuscaFarma")
db = client['BuscaFarma']
collection = db['Farmacia']

def consultar_cnpj_brasilio(cnpj):
    url = f"https://brasilapi.com.br/api/cnpj/v1/{cnpj}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data.get("descricao_situacao_cadastral") == "ATIVA":
            info = {
                "numeroCNPJ": data.get("cnpj", ""),
                "nomeFantasia": data.get("nome_fantasia", ""),
                "municipio": data.get("municipio", ""),
                "estado": data.get("uf", ""),
                "telefone": [data.get("telefone", "")],
                "endereco": {
                    "rua": data.get("logradouro", ""),
                    "numero": data.get("numero", ""),
                    "bairro": data.get("bairro", "")
                },
                "AvaliacaoClienteProduto": {
                    "marcadorAnonimo": False,
                    "dataAvaliacao": None,
                    "documentoCliente": "",
                    "nomeProduto": [],
                    "marcadorProduto": False
                },
                "AvaliacaoClienteRank": {
                    "marcadorAnonimo": False,
                    "dataAvaliacao": None,
                    "documentoCliente": "",
                    "valor": 0
                },
                "AvaliacaoClienteComentario": {
                    "marcadorAnonimo": False,
                    "dataAvaliacao": None,
                    "documentoCliente": "",
                    "texto": ""
                },
                "AvaliacaoClienteATD": {
                    "marcadorAnonimo": False,
                    "dataAvaliacao": None,
                    "houveFila": False,
                    "horarioAtendimento": "",
                    "tipoAdquirido": "",
                    "qualidadeAtendimento": ""
                }
            }
            return info
    return None

def get_coordinates(tipo_logradouro, logradouro, numero, bairro, cidade, estado):
    location = geolocator.geocode(f"{tipo_logradouro} {logradouro}, {numero}, {bairro}, {cidade}, {estado}")
    if location:
        return location.latitude, location.longitude
    return None

def cnpj_existe_em_mongodb(cnpj):
    return collection.count_documents({"numeroCNPJ": cnpj}) > 0

df = pd.read_excel('/content/Farmacias_Credenciadas.xlsx', skiprows=12, usecols="B:H")


cnpjs = df['CNPJ']
cnpjs = cnpjs.str.replace(".", "").str.replace("/", "").str.replace("-", "")
cnpjs_para_processar = [cnpj for cnpj in cnpjs if not cnpj_existe_em_mongodb(cnpj)]

for cnpj in cnpjs_para_processar:
    cnpj_info = consultar_cnpj_brasilio(cnpj)
    if cnpj_info:
        tipo_logradouro = cnpj_info['endereco'].get("Tipo_Logradouro", "")
        logradouro = cnpj_info['endereco'].get("rua", "")
        numero = cnpj_info['endereco'].get("numero", "")
        bairro = cnpj_info['endereco'].get("bairro", "")
        cidade = cnpj_info.get("municipio", "")
        estado = cnpj_info.get("estado", "")

        coordinates = get_coordinates(tipo_logradouro, logradouro, numero, bairro, cidade, estado)
        if coordinates:
            cnpj_info["coordenadaGeo"] = {
                "type": "Point",
                "coordinates": [coordinates[1], coordinates[0]]
            }
            collection.insert_one(cnpj_info)
        else:
            print("Coordenadas não encontradas para o endereço fornecido.")
    else:
        print(f"Não foi possível obter informações para o CNPJ {cnpj}")
    time.sleep(0.07)

client.close()