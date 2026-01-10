package api

import (
	"net/http"

	"Docify-app/internal/api/handlers"
)

func NewRouter() http.Handler {
	mux := http.NewServeMux()

	// Health check
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		w.Write([]byte("hello world"))
	})

	// Existing routes
	mux.HandleFunc("/documents", handlers.CreateDocument)

	mux.HandleFunc("/api/dummyData", handlers.GetDummyUser)

	return mux
}
