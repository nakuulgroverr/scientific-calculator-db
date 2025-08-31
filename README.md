# 🧪 Scientific Calculator (Dockerized Flask + MySQL)

A **scientific web calculator** built with **Python Flask** for the backend and a modern **HTML, CSS, and JavaScript** frontend.  
The app supports advanced mathematical operations and includes a **history page** where all calculations are stored in a **MySQL database** with persistent storage using Docker volumes.

---

## 🚀 Features

- Scientific operations:
  - Trigonometry: `sin`, `cos`, `tan`
  - Logarithm (log base 10)
  - Exponential (`eˣ`)
  - Square root (√)
  - Power (^)
- Responsive and interactive UI  
- Calculation history stored in **MySQL**  
- Data persistence with **Docker volumes**  
- Containerized using **Docker Compose**

---

## 📋 Requirements

- [Docker](https://www.docker.com/) (>= 20.10)  
- [Docker Compose](https://docs.docker.com/compose/) (>= 1.29)  

System requirements:
- Minimum **2 CPU cores** and **2 GB RAM**  
- At least **2 GB free disk space**

---

## 🛠️ Setup & Run

1. **Clone the repository**

```bash
git clone https://github.com/nakuulgroverr/scientific-calculator-db.git
cd scientific-calculator-db
```

2. **Start the application with Docker Compose**

```bash
docker-compose up --build -d
```

This will:
- Start a **MySQL 8.0 container** with a persistent volume (`mysql_data`)  
- Start the **Flask web app container** connected to the database  

3. **Access the application**

Open your browser and go to:  
👉 [http://localhost:5003](http://localhost:5003)

---

## 🧹 Stop and Cleanup

To stop the application:

```bash
docker-compose down
```

To remove containers, networks, and volumes:

```bash
docker-compose down -v
```

---

## 📂 Project Structure

```
scientific-calculator/
│── app.py                # Flask backend
│── templates/            # HTML frontend
│── static/               # CSS / JS files
│── Dockerfile            # Web app container build
│── docker-compose.yml    # Multi-container setup (Web + MySQL)
│── requirements.txt      # Python dependencies
│── README.md             # Project documentation
```

---

## 📦 Data Persistence

- All MySQL data (calculation history) is stored in a **Docker volume**:

```
mysql_data:/var/lib/mysql
```

- This ensures that history is **not lost** when containers are restarted.

---

## 🐳 About Docker Compose

This project uses **Docker Compose** to manage multiple containers as a single application.  
In our case, we have:  
- A **Flask web application container** (backend + frontend logic)  
- A **MySQL database container** (to store calculation history)  

Both containers run together and communicate over a shared network created by Docker Compose.  

This demonstrates how we can build a **full-stack application using Docker Compose**:  
- **App layer** → Flask application  
- **Database layer** → MySQL with persistent storage  
- **Frontend layer** → HTML, CSS, JavaScript served by Flask  
- More services (APIs, monitoring tools, caching systems, etc.) can be integrated the same way by adding them into the `docker-compose.yml`.  

👉 With this approach, each service runs in its **own container**, making the system modular, scalable, and easy to manage.
