package config

import (
	"flag"
)

type Config struct {
	Port string `json:"port"`
}

var Conf = Config{}

func initDefaultConfig() {
	Conf.Port = ":8081"
}

var ConfigFile = flag.String("c", "../config/config.json", "The path of the config file.")

func init() {
	initDefaultConfig()
	flag.Parse()
}
