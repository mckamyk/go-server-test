package server

import (
	"fmt"
	"go-server-test/server/api"
	"log"
	"net/http"
	"strings"
)

func handler(w http.ResponseWriter, r *http.Request) {
	parts := strings.Split(r.URL.Path, "/")[1:]
	var topRoute string
	if len(parts) == 1 {
		topRoute = "root"
	} else {
		topRoute = parts[1]
	}

	for i, v := range parts {
		fmt.Println(i, v)
	}
	fmt.Println("TopRoute:", topRoute, r.URL.Path)

	switch topRoute {
	case "root":
		api.HandleRoot(w, r)
	case "foo":
		api.HandleFoo(w, r)
	default:
		w.WriteHeader(404)
	}
}

func Start() {
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
