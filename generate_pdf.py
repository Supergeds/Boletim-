from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

def gerar_pdf(dados):
    c = canvas.Canvas("boletim_final.pdf", pagesize=A4)
    width, height = A4

    c.setFont("Helvetica-Bold", 14)
    c.drawString(100, height - 50, "BOLETIM DE OCORRÊNCIA - GMISA")

    c.setFont("Helvetica", 10)
    c.drawString(40, height - 100, f"Número: {dados.get('numero', '')}")
    c.drawString(200, height - 100, f"Data: {dados.get('data', '')}")
    c.drawString(350, height - 100, f"Equipe: {dados.get('equipe', '')}")

    c.drawString(40, height - 120, f"Natureza: {dados.get('natureza', '')}")
    c.drawString(350, height - 120, f"Código: {dados.get('codigo', '')}")

    c.drawString(40, height - 140, f"Viatura: {dados.get('viatura', '')}")
    c.drawString(200, height - 140, f"Km Inicial: {dados.get('km_inicial', '')}")
    c.drawString(350, height - 140, f"Km Final: {dados.get('km_final', '')}")

    c.drawString(40, height - 160, f"Horário Saída: {dados.get('horario_saida', '')}")
    c.drawString(200, height - 160, f"Horário Local: {dados.get('horario_local', '')}")
    c.drawString(350, height - 160, f"Horário Término: {dados.get('horario_termino', '')}")

    c.drawString(40, height - 180, f"Endereço: {dados.get('endereco_ocorrencia', '')}")
    c.drawString(40, height - 200, f"Solicitante: {dados.get('solicitante', '')}")
    c.drawString(40, height - 220, f"Endereço do Solicitante: {dados.get('endereco_solicitante', '')}")

    c.drawString(40, height - 240, f"Bairro: {dados.get('bairro', '')}")
    c.drawString(200, height - 240, f"Cidade: {dados.get('cidade', '')}")

    c.drawString(40, height - 280, "HISTÓRICO:")
    c.setFont("Helvetica", 9)
    c.drawString(40, height - 300, dados.get('historico', ''))

    c.save()
