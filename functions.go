package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"time"
)

func getAppDir() string {
	var homeDir, _ = os.UserHomeDir()
	appDir := filepath.Join(homeDir, ".local/share/godo")
	return appDir
}

func pathExists(path string) bool {
	var _, error = os.Stat(path)
	if error == nil {
		return true
	} else {
		return false
	}
}

func ensureAppDir() {

	var appDir = getAppDir()

	if pathExists(appDir) {
		// Do something here
		println("found found")
	} else {
		os.MkdirAll(appDir, 755)

	}
}

func getTodosFilePath() string {
	return filepath.Join(getAppDir(), "todos.json")
}

func isTodoListFileExists() bool {
	var todoListFile = getTodosFilePath()
	if pathExists(todoListFile) {
		var file, _ = os.Stat(todoListFile)
		if !file.IsDir() {
			return true
		} else {
			return false
		}
	}
	return false
}
func getRandomId() int64 {
	return time.Now().UnixMilli()
}

type Todo struct {
	Id          int64  `json:"id"`
	Text        string `json:"text"`
	IsCompleted bool   `json:"isCompleted"`
}

func addTodo(text string) ([]Todo, error) {
	var newTodo = Todo{Id: getRandomId(), Text: text, IsCompleted: false}
	if isTodoListFileExists() {
		file, error := os.ReadFile(getTodosFilePath())
		fmt.Println(string(file))
		if error != nil {
			fmt.Println(error.Error())
			return nil, error
		}
		var todos []Todo
		error = json.Unmarshal(file, &todos)
		if error != nil {
			fmt.Println(error.Error())
			return nil, error
		}
		todos = append(todos, newTodo)
		updatedJSON, error := json.Marshal(todos)
		if error != nil {
			fmt.Println(error.Error())
			return nil, error
		}
		os.WriteFile(getTodosFilePath(), updatedJSON, 0755)
		return todos, nil
	} else {
		todos := []Todo{newTodo}
		jsonData, err := json.Marshal(todos)
		if err == nil {

			error := os.WriteFile(getTodosFilePath(), []byte(jsonData), 0755)
			if error != nil {
				println(error.Error())
				return nil, error
			}
			return todos, nil
		} else {
			println(err)
			return nil, err
		}
	}
}

func getTodoList() ([]Todo, error) {
	var todoListFile, error = os.ReadFile(getTodosFilePath())
	if error != nil {
		return nil, error
	}
	var todos []Todo
	error = json.Unmarshal(todoListFile, &todos)
	if error != nil {
		println(error.Error())
		return nil, error
	}
	return todos, nil
}

func markAsComplete(taskId int64) ([]Todo, error) {
	var todos, error = getTodoList()

	if error != nil {
		return nil, error
	}
	for i := range todos {
		if todos[i].Id == taskId {

			todos[i].IsCompleted = true
			jsonEncodedTasks, error := json.Marshal(todos)
			if error != nil {
				return nil, error
			}
			error = os.WriteFile(getTodosFilePath(), jsonEncodedTasks, 0755)
			if error != nil {
				return nil, error
			}
			return todos, nil
		}
	}

	return nil, errors.New("task with that id not found!")
}

func deleteTask(taskId int64) ([]Todo, error) {
	var todos, error = getTodoList()

	if error != nil {
		return nil, error
	}
	for i := range todos {
		if todos[i].Id == taskId {

			newTodos := append(todos[:i], todos[i+1:]...)
			jsonEncodedTasks, error := json.Marshal(newTodos)
			if error != nil {
				return nil, error
			}
			error = os.WriteFile(getTodosFilePath(), jsonEncodedTasks, 0755)
			if error != nil {
				return nil, error
			}
			return newTodos, nil
		}
	}

	return nil, errors.New("task with that id not found!")
}
