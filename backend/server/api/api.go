package api

import (
	"fmt"
	"go-server-test/server/db/models"
	"net/http"
)

func HandleRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hi from home")
}

func HandleFoo(w http.ResponseWriter, r *http.Request) {
	id := models.ParseTest(r)
	fmt.Fprintln(w, id)
}
