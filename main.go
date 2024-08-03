package main

import (
	"context"
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

//go:embed icon.svg
var iconData []byte

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()
	// iconData, error := os.ReadFile("frontend/src/assets/images/icon.png")
	// if error != nil {
	// 	println(error.Error())
	// 	return
	// }
	// Create application with options
	err := wails.Run(&options.App{
		Title:      "Godo",
		MaxWidth:   539,
		MinWidth:   500,
		MaxHeight:  785,
		MinHeight:  600,
		Fullscreen: false,
		Frameless:  true,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 0, A: 255},
		OnStartup:        app.startup,
		OnDomReady: func(ctx context.Context) {
			runtime.Show(ctx)
		},
		Linux: &linux.Options{
			Icon: iconData,
		},
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
