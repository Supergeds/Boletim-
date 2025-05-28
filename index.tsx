import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import jsPDF from "jspdf";
import "leaflet/dist/leaflet.css";

export default function Home() {
  const [form, setForm] = useState({
    numero: "",
    data: "",
    endereco: "",
    natureza: "",
    historico: "",
    partes: [{ nome: "", condicao: "", rg: "", telefone: "" }],
    veiculos: [{ placa: "", renavam: "", modelo: "", cor: "" }],
    localizacao: { lat: -20.432, lng: -51.343 }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleParteChange = (index, field, value) => {
    const updated = [...form.partes];
    updated[index][field] = value;
    setForm({ ...form, partes: updated });
  };

  const handleVeiculoChange = (index, field, value) => {
    const updated = [...form.veiculos];
    updated[index][field] = value;
    setForm({ ...form, veiculos: updated });
  };

  const handleMapClick = (e) => {
    setForm({ ...form, localizacao: e.latlng });
  };

  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.text("Boletim de Ocorrência", 10, 10);
    doc.text(`Número: ${form.numero}`, 10, 20);
    doc.text(`Data: ${form.data}`, 10, 30);
    doc.text(`Endereço: ${form.endereco}`, 10, 40);
    doc.text(`Natureza: ${form.natureza}`, 10, 50);
    doc.text(`Histórico: ${form.historico}`, 10, 60);
    doc.save("boletim_ocorrencia.pdf");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Registro de Boletim de Ocorrência</h1>
      <input name="numero" placeholder="Número" value={form.numero} onChange={handleChange} /><br />
      <input name="data" type="date" value={form.data} onChange={handleChange} /><br />
      <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} /><br />
      <input name="natureza" placeholder="Natureza" value={form.natureza} onChange={handleChange} /><br />
      <textarea name="historico" placeholder="Histórico" value={form.historico} onChange={handleChange} /><br />

      <h2>Partes Envolvidas</h2>
      {form.partes.map((parte, i) => (
        <div key={i}>
          <input placeholder="Nome" value={parte.nome} onChange={e => handleParteChange(i, "nome", e.target.value)} />
          <input placeholder="Condição" value={parte.condicao} onChange={e => handleParteChange(i, "condicao", e.target.value)} />
          <input placeholder="RG" value={parte.rg} onChange={e => handleParteChange(i, "rg", e.target.value)} />
          <input placeholder="Telefone" value={parte.telefone} onChange={e => handleParteChange(i, "telefone", e.target.value)} /><br />
        </div>
      ))}

      <h2>Veículos Envolvidos</h2>
      {form.veiculos.map((v, i) => (
        <div key={i}>
          <input placeholder="Placa" value={v.placa} onChange={e => handleVeiculoChange(i, "placa", e.target.value)} />
          <input placeholder="RENAVAM" value={v.renavam} onChange={e => handleVeiculoChange(i, "renavam", e.target.value)} />
          <input placeholder="Modelo" value={v.modelo} onChange={e => handleVeiculoChange(i, "modelo", e.target.value)} />
          <input placeholder="Cor" value={v.cor} onChange={e => handleVeiculoChange(i, "cor", e.target.value)} /><br />
        </div>
      ))}

      <h2>Localização</h2>
      <div style={{ height: 300 }}>
        <MapContainer center={[form.localizacao.lat, form.localizacao.lng]} zoom={15} style={{ height: "100%" }} whenCreated={(map) => {
          map.on("click", (e) => handleMapClick(e));
        }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[form.localizacao.lat, form.localizacao.lng]} />
        </MapContainer>
      </div><br />

      <button onClick={gerarPDF}>Gerar PDF</button>

    </div>
  );
}