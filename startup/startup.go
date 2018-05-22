package startup

import (
	"net/http"

	"sorryGolang/config"
	"sorryGolang/service"

	"github.com/gin-gonic/gin"
)

func Run() {
	router := gin.Default()

	router.GET("/ping", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "pong")
	})
	router.POST("/generateGif", service.GenerateGif)
	router.OPTIONS("/generateGif", service.PreflightGenerateGif)
	router.GET("/gif/:id", service.DownloadGifById)

	router.Run(config.Conf.Port)
}
