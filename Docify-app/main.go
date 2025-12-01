package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {

	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Simple handler
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Server is running!")
	})

	fmt.Println("Server listening on port " + port + "...")
	http.ListenAndServe(":"+port, nil)
}
