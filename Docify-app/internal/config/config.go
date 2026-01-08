package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port string
	Env  string
}

func Load() *Config {
	// Load .env only in local/dev
	if os.Getenv("APP_ENV") == "" {
		_ = godotenv.Load()
	}

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "3600" // safe fallback
	}

	env := os.Getenv("APP_ENV")
	if env == "" {
		env = "development"
	}

	log.Println("Environment:", env)

	return &Config{
		Port: port,
		Env:  env,
	}
}
