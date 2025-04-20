# 🧠 CodeMate-Qwen

> An in-browser code assistant powered by the 0.5B Qwen2.5 Coder MLC model using WebLLM and WebGPU.

## 🚀 Features

- ⚡ Lightweight 0.5B model — fast to load, even on low-end devices
- 🧩 Built with [@mlc-ai/web-llm](https://github.com/mlc-ai/web-llm)
- 🖥️ Runs completely in-browser (no server/API needed)
- 🔐 Privacy-first: all computation happens locally

## 🧱 Tech Stack

- React
- Vite
- WebLLM
- WebGPU (Chrome 113+)

## 🧠 Model Used

**Model ID:** [`Qwen2.5-Coder-0.5B-Instruct-q4f32_1-MLC`](https://huggingface.co/mlc-ai/Qwen2.5-Coder-0.5B-Instruct-q4f32_1-MLC)  
**Provider:** `mlc-ai` on Hugging Face  
**Quantization:** q4f32_1  
**Architecture:** 0.5B Qwen2.5 (optimized for code)

## 📦 Setup

```bash
git clone https://github.com/Saketh-Reddy-Bejadi/Qwencode-webapp.git
cd qwen-lite-coder-webapp
npm install
npm run dev
```
