# 💬 gemmawebllm

A lightweight, private, in-browser AI chat application powered by the **Gemma-2B-IT** model using MLC and WebLLM.  
Runs fully in-browser with **WebGPU** — no API keys, no servers, no data sent anywhere. 🛡️

---

## 🚀 Features

- 🤖 Uses [Gemma-2B-IT](https://huggingface.co/mlc-ai/gemma-2b-it-q4f16_1-MLC) instruction-tuned MLC model
- 🌐 100% client-side execution with [WebLLM](https://github.com/mlc-ai/web-llm)
- 🔐 Privacy-first: no backend, no API calls
- ⚛️ Built using React + Vite
- ⚡ Fast and responsive experience with WebGPU

---

## 🧠 Model Details

| Attribute        | Value                                                |
|------------------|------------------------------------------------------|
| Model Name       | `gemma-2b-it-q4f16_1-MLC`                             |
| Source           | [Hugging Face](https://huggingface.co/mlc-ai/gemma-2b-it-q4f16_1-MLC) |
| Architecture     | Gemma 2B (Instruction-Tuned)                         |
| Format           | MLC                                                  |
| Quantization     | q4f16_1                                              |

---

## 🧱 Tech Stack

- React
- Vite
- WebLLM
- WebGPU

---

## 📦 Getting Started

```bash
git clone https://github.com/Saketh-Reddy-Bejadi/gemma_web_llm.git
cd gemma_web_llm
npm install
npm run dev
```
