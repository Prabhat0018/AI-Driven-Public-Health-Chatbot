# AI-Driven-Public-Health-Chatbot

# 🩺 AI-Driven Public Health Chatbot

### 👨‍💻 Author: Prabhat Yadav  
GitHub: [Prabhat0018](https://github.com/Prabhat0018)

---

## 📘 About the Project
This is a simple **AI chatbot** that helps people learn about:
- Disease symptoms  
- Preventive health care  
- Vaccination schedules  
- Real-time outbreak alerts  

The chatbot can talk in **multiple languages** and will be available on **WhatsApp or SMS** using APIs like Twilio.

It’s made to spread awareness among **rural and semi-urban areas** using AI and simple messages.

---

## ⚙️ Tech Stack

| Part | Tools Used |
|------|-------------|
| Frontend | React.js (for admin panel) |
| Backend | Node.js + Express.js |
| Chatbot | Rasa or Dialogflow |
| Database | MongoDB |
| SMS/WhatsApp | Twilio API |
| Cloud | AWS EC2 |
| Auth | JWT (login/signup) |

---

| Folder | Technology/Role | Description |
| :--- | :--- | :--- |
| `client/` | **React** (Frontend) | The user interface for interacting with the chatbot and viewing responses. |
| `server/` | **Node.js/Express** (Backend API) | Handles communication between the React frontend and the Rasa chatbot service. Manages user sessions, history, and potentially database interactions. |
| `rasa_bot/` | **Rasa** (Chatbot Core) | The AI engine. Contains all NLU models, stories, actions (Python code for custom logic), and domain configuration. |
---

---

## 🧑‍💻 How to Run

### 1️⃣ Clone this repo
```bash
git clone https://github.com/Prabhat0018/AI-Driven-Public-Health-Chatbot.git
cd AI-Driven-Public-Health-Chatbot
