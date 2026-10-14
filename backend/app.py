import math
from pathlib import Path
from flask import Flask
from flask_cors import CORS

FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"
app = Flask(__name__, static_folder=str(FRONTEND_DIR), static_url_path="")
CORS(app)

def a_numero(valor):
    try:
        return float(valor)
    except ValueError:
        return None


def error(mensaje):
    return f"<h1>Error: {mensaje}</h1> <hr>", 400


@app.route("/")
def HolaFlask():
    return app.send_static_file("index.html")

@app.route("/ecuacion")
@app.route("/ecuacion/<x>/<z>")
def ecuacion(x=0, z=0):
    x = a_numero(x)
    z = a_numero(z)
    if x is None or z is None:
        return error("X y Z deben ser números")
    y = x * z + z + x
    return f"<h1>Y = {x:g} * {z:g} + {z:g} + {x:g} = {y:g}</h1> <hr>"

@app.route("/tabla")
@app.route("/tabla/<numero>")
def tabla(numero=0):
    n = a_numero(numero)
    if n is None:
        return error("Debe ingresar un número")
    filas = ""
    for i in range(1, 11):
        filas += f"{n:g} x {i} = {n * i:g}<br>"
    return f"<h1>Tabla de multiplicar del {n:g}</h1> <p>{filas}</p> <hr>"

@app.route("/areas/circulo/<radio>")
def area_circulo(radio):
    r = a_numero(radio)
    if r is None or r < 0:
        return error("El radio debe ser un número positivo")
    area = math.pi * r ** 2
    return f"<h1>Área del círculo (r = {r:g}): {area:.2f}</h1> <hr>"


@app.route("/areas/cuadrado/<lado>")
def area_cuadrado(lado):
    l = a_numero(lado)
    if l is None or l < 0:
        return error("El lado debe ser un número positivo")
    return f"<h1>Área del cuadrado (lado = {l:g}): {l ** 2:.2f}</h1> <hr>"


@app.route("/areas/triangulo/<base>/<altura>")
def area_triangulo(base, altura):
    b = a_numero(base)
    h = a_numero(altura)
    if b is None or h is None or b < 0 or h < 0:
        return error("Base y altura deben ser números positivos")
    area = (b * h) / 2
    return f"<h1>Área del triángulo (b = {b:g}, h = {h:g}): {area:.2f}</h1> <hr>"


if __name__ == '__main__':
    app.run(debug=True)