package service

import (
	"bufio"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"sorryGolang/def"

	"github.com/gin-gonic/gin"
)

var generateNameMutex sync.Mutex

type GenerateGifParam struct {
	Words        []string `json:"words"`
	TemplateType string   `json:"template_type"`
}

func GenerateGif(ctx *gin.Context) {
	ggp := GenerateGifParam{}
	if err := ctx.ShouldBindJSON(&ggp); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
	if !ValidTemplateType(ggp.TemplateType) {
		ctx.AbortWithError(http.StatusBadRequest, errors.New("wrong template_type."))
		return
	}
	assPath, endtime, err := generateAss(ggp.TemplateType, ggp.Words)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	gifFile, err := generateGif(ggp.TemplateType, assPath, endtime)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	gifId := strings.Split(strings.Split(gifFile, "/")[1], ".")[0]
	obj := gin.H{"code": fmt.Sprintf("%d", http.StatusOK), "message": "操作成功", "data": gifId}
	ctx.JSON(http.StatusOK, obj)
}

func generateGif(templateType string, assFile string, endtime string) (string, error) {
	// Generate tmp file
	var sourceFile string
	switch templateType {
	case def.TemplateSorry:
		sourceFile = def.SourceFileSorryPath
	case def.TemplateWangjingze:
		sourceFile = def.SourceFileWangjingzePath
	}
	gifFile := generateTmpFileName(def.GifTmpFile)
	cmdstr := fmt.Sprintf("ffmpeg -ss 0 -t %s -i %s -r 5 -vf ass=%s,scale=180:-1 -y %s", endtime, sourceFile, assFile, gifFile)
	fmt.Println(cmdstr)
	cmds := strings.Split(cmdstr, " ")
	cmd := exec.Command("ffmpeg", cmds[1:]...)
	return gifFile, cmd.Run()
}

func generateAss(templateType string, words []string) (assPath string, endtime string, err error) {
	var tmplPath string
	switch templateType {
	case def.TemplateSorry:
		tmplPath = def.TemplateSorryPath
	case def.TemplateWangjingze:
		tmplPath = def.TemplateWangjingzePath
	}
	rf, err := os.Open(tmplPath)
	if err != nil {
		return "", "", err
	}
	defer rf.Close()

	// Generate tmp file
	assPath = generateTmpFileName(def.AssTmpFile)
	// Write tmp ass file
	wf, err := os.OpenFile(assPath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		return "", "", err
	}
	defer wf.Close()

	br := bufio.NewReader(rf)
	bw := bufio.NewWriter(wf)
	var i int
	for {
		var l string
		i++
		line, _, err := br.ReadLine()
		if err == io.EOF {
			break
		}
		if i >= def.TemplateReplaceStartLine {
			if len(words) > i-def.TemplateReplaceStartLine {
				l = strings.Replace(string(line), "{{text}}", words[i-26], -1)
				endtime = strings.Split(strings.Split(l, ",")[2], ":")[2]
			} else {
				break
			}
		} else {
			l = string(line)
		}
		fmt.Fprintln(bw, l)
	}
	bw.Flush()
	return
}

func generateTmpFileName(tmpFileType string) string {
	generateNameMutex.Lock()
	defer generateNameMutex.Unlock()
	name := ""
	for {
		var tail string
		switch tmpFileType {
		case def.AssTmpFile:
			tail = ".ass"
		case def.GifTmpFile:
			tail = ".gif"
		}
		ts := fmt.Sprintf("%v", time.Now().UnixNano())
		name = filepath.Join(def.TmpFilePath, ts+tail)

		if _, err := os.Stat(name); err != nil {
			fi, _ := os.Create(name)
			fi.Close()
			break
		}
		time.Sleep(time.Microsecond)
	}

	return name
}
