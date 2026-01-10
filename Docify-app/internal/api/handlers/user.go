package handlers

import (
	"Docify-app/internal/model"
	"encoding/json"
	"net/http"
)

func GetDummyUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	user := model.User{
		FirstName: "Mudit",
		LastName:  "Garg",
		Email:     "mudit@example.com",
		Password:  "password123",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}