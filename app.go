package main

import (
	"context"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	// runtime.WindowShow(ctx)
	a.ctx = ctx

	// runtime.WindowSetBackgroundColour(ctx, 0, 0, 0, 255)
	runtime.Hide(ctx)
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) AddTodo(text string) []Todo {
	todoList, error := addTodo(text)
	if error == nil {
		return todoList
	} else {
		return nil
	}
}

func (a *App) GetTodoList() []Todo {
	todos, error := getTodoList()
	if error == nil {
		return todos
	} else {
		return nil
	}
}

func (a *App) MarkAsComplete(taskId int64) []Todo {
	var newTodos, error = markAsComplete(taskId)
	if error != nil {
		return nil
	}
	return newTodos
}
func (a *App) DeleteTask(taskId int64) []Todo {
	var newTodos, error = deleteTask(taskId)
	if error != nil {
		return nil
	}
	return newTodos
}

func (a *App) Minimize() {
	runtime.WindowMinimise(a.ctx)
}
func (a *App) CloseApp() {
	runtime.Quit(a.ctx)
}
