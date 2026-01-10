package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port     string
	Env      string
	MongoURI string
	MongoDB  string
}

func Load() *Config {
	// Load .env only for local/dev
	if os.Getenv("APP_ENV") == "" {
		_ = godotenv.Load()
	}

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "3600"
	}

	env := os.Getenv("APP_ENV")
	if env == "" {
		env = "development"
	}

	mongoURI := os.Getenv("MONGO_URI")
	mongoDB := os.Getenv("MONGO_DB")

	if mongoURI == "" || mongoDB == "" {
		log.Fatal("Missing MongoDB configuration (MONGO_URI / MONGO_DB)")
	}

	log.Println("Environment:", env)

	return &Config{
		Port:     port,
		Env:      env,
		MongoURI: mongoURI,
		MongoDB:  mongoDB,
	}
}
