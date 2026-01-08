package api

import (
	"net/http"

	"Docify-app/internal/api/handlers"
)

func NewRouter() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/documents", handlers.CreateDocument)

	return mux
}
