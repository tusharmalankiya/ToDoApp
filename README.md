# Todo App

#### Video Demo: https://www.youtube.com/watch?v=-x7vuVV1weA

#### Description:  A simple and efficient Todo application built using **React** for the frontend and **Flask** for the backend. This app allows users to manage their tasks by creating, editing, and deleting todos.

## Features

- **User Authentication**: Sign up and log in to manage personal tasks.
- **Task Management**: Add, edit, mark as complete/incomplete, and delete tasks.
- **Categories**: Organize tasks into different categories.

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Axios**: For making HTTP requests to the Flask API.

### Backend
- **Flask**: A lightweight Python microframework for building APIs.
- **SQLite**: A simple, file-based database for storing user and task data.

## Setup

### Prerequisites
- **Node.js** (for React)
- **Python** (for Flask)
- **SQLite** (for the database)

### Installation

1. **Clone the repository**:

   ```bash
    git clone https://github.com/tusharmalankiya/ToDoApp.git
   ```

2. **Backend Setup**:
    - Navigate to the backend directory and install the required dependencies:

        ```bash
            pip3 install -r requirements.txt
        ```

    - Start the Flask server:
        ```bash
            python3 app.py
        ```

3. **Frontend Setup**:
    - Navigate to the frontend directory and install the dependencies:

        ```bash
        yarn install
        ```
    
    - Start the React development server:
        
        ```bash
        yarn start
        ```

### Usage:
1. Register or log in to the app.
2. Create a new categories and add tasks for that perticular categories.
3. Edit, complete, or delete tasks as needed.