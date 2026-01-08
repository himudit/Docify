package main

import (
	"log"
	"net/http"

	"Docify-app/internal/api"
	"Docify-app/internal/config"
)

func main() {
	cfg := config.Load()

	router := api.NewRouter()

	addr := ":" + cfg.Port
	log.Println("Docify backend running on", addr)

	log.Fatal(http.ListenAndServe(addr, router))
}
