import { useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function App() {
  const [form, setForm] = useState({
    area: 1500,
    bedrooms: 2,
    bathrooms: 2,
    age: 10,
    location: 3
  });

  const [price, setPrice] = useState(null);
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const predict = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", form);
      setPrice(res.data.predicted_price);
      setHistory([...history, res.data.predicted_price]);
    } catch {
      alert("Backend not running!");
    }
  };

  // 📊 Data
  const trendData = history.map((p, i) => ({ name: `P${i+1}`, price: p }));

  const featureData = [
    { name: "Area", value: form.area },
    { name: "Bedrooms", value: form.bedrooms * 1000 },
    { name: "Bathrooms", value: form.bathrooms * 800 },
    { name: "Location", value: form.location * 1200 }
  ];

  const pieData = [
    { name: "Area", value: 50 },
    { name: "Rooms", value: 30 },
    { name: "Location", value: 20 }
  ];

  const modelData = [
    { name: "Linear", accuracy: 99.9 },
    { name: "Random Forest", accuracy: 99.2 }
  ];

  const COLORS = ["#00f5d4", "#4cc9f0", "#f72585"];

  // 📄 PDF Download
  const downloadPDF = async () => {
    const element = document.getElementById("dashboard");
    const canvas = await html2canvas(element);
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(img, "PNG", 10, 10, 180, 100);
    pdf.save("report.pdf");
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl text-center font-bold mb-6"
      >
        🏡 AI House Price Predictor
      </motion.h1>

      {/* FORM */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="max-w-md mx-auto backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl"
      >
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            className="w-full p-2 my-2 rounded bg-black/40"
          />
        ))}

        <button
          onClick={predict}
          className="w-full bg-cyan-500 py-2 mt-3 rounded hover:bg-cyan-600"
        >
          Predict Price
        </button>

        {price && (
          <h2 className="text-center text-green-400 mt-4 text-xl">
            ₹ {price.toLocaleString()}
          </h2>
        )}
      </motion.div>

      {/* DASHBOARD */}
      <div id="dashboard" className="mt-10 space-y-10">

        {/* 📈 TREND */}
        <div className="bg-white/5 p-6 rounded-xl">
          <h2 className="text-xl mb-4">📈 Price Trend</h2>
          <LineChart width={500} height={250} data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Line type="monotone" dataKey="price" stroke="#00f5d4" />
          </LineChart>
        </div>

        {/* 📊 FEATURE IMPACT */}
        <div className="bg-white/5 p-6 rounded-xl">
          <h2 className="text-xl mb-4">📊 Feature Impact</h2>
          <BarChart width={500} height={250} data={featureData}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="value" fill="#4cc9f0"/>
          </BarChart>
        </div>

        {/* 🥧 PIE */}
        <div className="bg-white/5 p-6 rounded-xl">
          <h2 className="text-xl mb-4">🥧 Price Breakdown</h2>
          <PieChart width={400} height={250}>
            <Pie data={pieData} dataKey="value">
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* 📊 MODEL COMPARISON */}
        <div className="bg-white/5 p-6 rounded-xl">
          <h2 className="text-xl mb-4">⚡ Model Comparison</h2>
          <BarChart width={500} height={250} data={modelData}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="accuracy" fill="#f72585"/>
          </BarChart>
        </div>

        {/* 📄 DOWNLOAD */}
        <button
          onClick={downloadPDF}
          className="bg-green-500 px-6 py-2 rounded"
        >
          Download Report
        </button>

      </div>
    </div>
  );
}