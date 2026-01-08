package service

import (
	"time"

	"github.com/google/uuid"

	"Docify-app/internal/model"
)

func CreateEmptyDocument() (*model.DocumentMeta, error) {
	doc := &model.DocumentMeta{
		ID:            uuid.NewString(),
		SchemaVersion: 1,
		CreatedAt:     time.Now(),
	}

	// later:
	// - store metadata in Mongo
	// - create empty snapshot
	// - initialize ops log

	return doc, nil
}
