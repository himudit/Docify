package model

import "time"

type DocumentMeta struct {
	ID            string    `json:"docId"`
	SchemaVersion int       `json:"schemaVersion"`
	Owner         string    `json:"owner,omitempty"`
	CreatedAt     time.Time `json:"createdAt"`
}
