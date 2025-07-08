from flask import Flask, render_template, request, send_file
from generate_pdf import gerar_pdf
import os

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("frente.html")

@app.route("/verso")
def verso():
    return render_template("verso.html")

@app.route("/gerar_pdf", methods=["POST"])
def gerar_pdf_route():
    dados = request.form.to_dict(flat=True)
    gerar_pdf(dados)
    return render_template("success.html")

@app.route("/download")
def download():
    return send_file("boletim_final.pdf", as_attachment=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=81)
