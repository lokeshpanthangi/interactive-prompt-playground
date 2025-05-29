# 🤖 Interactive Prompt Playground

Welcome to the **Interactive Prompt Playground**!  
Test and refine AI model parameters in a conversational interface.  
Experiment with different settings to understand how they affect AI responses.

---

## 🚀 Getting Started

### 1. Clone the Repository

```sh
git clone 
cd interactive-prompt-playground
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Environment Variables

- Copy `.env.example` to `.env` and add your OpenAI API key or other required secrets.

### 4. Run the Playground

```sh
npm run dev
```

- Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## ✨ Features

### 🧠 Model Selection

- Choose between different AI models (e.g., `gpt-3.5-turbo`).
- Visually highlighted selection for clarity.

### 🎛️ Parameter Controls

- **Temperature**: Adjust randomness of responses.
- **Max Tokens**: Set the maximum length of the AI's reply.
- **Presence Penalty**: Discourage repetition of new topics.
- **Frequency Penalty**: Discourage repeating the same lines.

### 💬 Prompt Configuration

- **System Prompt**: Set the system's behavior or context.
- **User Prompt**: Enter your message to the AI.

### ⚡ Action Buttons

- **Generate**: Get a response from the AI.
- **Batch Test**: Run the same prompt with different parameters for comparison.

### 📊 Response Display

- View AI responses with metadata (model, temperature, tokens used, response time).
- Add responses to a comparison view.

### 🗂️ Chat History & Sidebar

- Browse previous chats.
- Load, start new chats, or collapse the sidebar for focus.

### 🆚 Comparison View

- Compare up to two responses side-by-side

## 🛠️ Project Structure

- `src/components/` – UI components (ModelSelection, Header, ParameterControls, etc.)
- `src/pages/Index.tsx` – Main playground logic and state management
- `src/config/` – API configuration
- `public/` – Static assets

---

## 📝 How It Works

1. **Select a Model**: Pick your preferred AI model.
2. **Configure Prompts**: Set system and user prompts.
3. **Tune Parameters**: Adjust temperature, max tokens, and penalties.
4. **Generate**: Click "Generate" to see the AI's response.
5. **Compare**: Add responses to the comparison view for side-by-side analysis.
6. **Review History**: Access previous chats from the sidebar.

---

## 📦 Built With

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

---
Enjoy experimenting! 🚀