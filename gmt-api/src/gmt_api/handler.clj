(ns gmt-api.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [clojure.java.io :as io]
            [ring.middleware.json :refer [wrap-json-response]]
            [ring.util.response :refer [response]]))

(defn isFile [path]
  (.exists (io/as-file path)))

(defn enrich [path]
  (if (isFile path)
    {:path path
     :type "file"}
    {:path path
     :type "folder"})
  )

;(defn listItems [path]
; (.list (clojure.java.io/file path)))



(defn handler [request]
  (response (map enrich (.list (io/file "c:/ToDelete")))))

(defroutes app-routes
           (GET "/" [] "Hello World")
           (GET "/dir" [] (wrap-json-response handler))
           ;(GET "/dir" []  (wrap-json-response  {:value (+ 2 2)} ))

           (route/not-found "Not Found"))

(def app
  (wrap-defaults app-routes site-defaults))

