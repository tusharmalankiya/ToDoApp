# Todo App

#### Video Demo: https://www.youtube.com/watch?v=-x7vuVV1weA

## Description:
A simple and efficient Todo application built using **React** for the frontend and **Flask** for the backend. This app allows users to manage their tasks by creating, editing, and deleting respective categories and tasks. To get started, first, user has to create an account. after account has been created, user can log in using the credentials and see the homepage where user can create categories and tasks. but before any tasks can be created, user has to make category for the task. categories can be made just by entering category name in the input field. once the category is created, user can select catgory by clicking on it and add tasks into that perticular catogory. tasks can also be modified by just clicking on the respective buttons. such as to edit the task name, user can click on edit button and can change its name and click on the save button to save it. similarly, delete button is used to delete the task. there is also a checkbox beside the name of the task which can be used to mark that task as completed and also can be marked as incomplete if it is already marked as completed. same way, categories can be modified and deleted.

I built this project using React.js for the front end and Flask, a Python microframework, for the backend. I used SQLite database to store user information, tasks and categories. This app uses Flask for storing all data in a database and the front-end communicates with the back-end via API calls to retrieve, update, and delete tasks and categories.

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
