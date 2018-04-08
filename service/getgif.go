package service

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func DownloadGifById(ctx *gin.Context) {
	gifId := ctx.Param("id")
	filePath := fmt.Sprintf("./tmp/%v.gif", gifId)
	fmt.Println("downloading:", filePath)
	if _, err := os.Stat(filePath); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, errors.New("gif not exist."))
		return
	}
	f, err := os.Open(filePath)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	defer f.Close()

	if _, err := io.Copy(ctx.Writer, f); err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}
