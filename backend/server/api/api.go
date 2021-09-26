package api

import (
	"fmt"
	"log"
	"net/http"

	"github.com/golang-jwt/jwt"
)

func Protected(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookies := r.Cookies()
		found := false
		for _, v := range cookies {
			if v.Name == "auth" {
				found = true
				jwtString := v.Value
				token, err := jwt.Parse(jwtString, func(token *jwt.Token) (interface{}, error) {
					return JwtSigner, nil
				})
				if err != nil {
					w.WriteHeader(http.StatusUnauthorized)
					log.Println("Failed Auth: Error parsing/validating token")
					log.Println(err)
					return
				}

				if token.Valid {
					next.ServeHTTP(w, r)
				} else {
					w.WriteHeader(http.StatusUnauthorized)
					log.Println("Failed Auth: Token not valid.")
				}
			}
		}
		if !found {
			w.WriteHeader(http.StatusUnauthorized)
			log.Println("Failed Auth: No Token.")
		}
	})

}

func HandleRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hi from home")
}
