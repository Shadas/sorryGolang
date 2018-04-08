package service

import (
	"sorryGolang/def"
)

func ValidTemplateType(tt string) bool {
	switch tt {
	case def.TemplateSorry:
		fallthrough
	case def.TemplateWangjingze:
		return true
	default:
	}
	return false
}
