package main

import (
	"log"
	"net/http"

	"Docify-app/internal/api"
	"Docify-app/internal/config"
	"Docify-app/internal/db"
)

func main() {
	cfg := config.Load()
    mongoClient := db.ConnectMongo(cfg.MongoURI)
	defer mongoClient.Disconnect(nil)
	router := api.NewRouter()

	addr := ":" + cfg.Port
	log.Println("Docify backend running on", addr)

	log.Fatal(http.ListenAndServe(addr, router))
}
