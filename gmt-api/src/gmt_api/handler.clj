(ns gmt-api.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [clojure.java.io :as io]
            [ring.middleware.json :refer [wrap-json-response]]
            [ring.util.response :refer [response]]
            [ring.middleware.cors :refer [wrap-cors]]))

(defn ToFileInfo [file]
  (select-keys (bean file) [:path :name :directory]))

(defn GetFiles [request]
  (response (map ToFileInfo (.listFiles (io/file "c:/ToDelete")))))

(defroutes app-routes
             (GET "/" [] "Hello World")
             (GET "/dir" [] (wrap-json-response GetFiles))

             (route/not-found "Not Found"))

(def app
    (-> (wrap-defaults app-routes site-defaults)
        (wrap-cors :access-control-allow-origin #"http://localhost:4200"
                   :access-control-allow-methods [:get]
                   :access-control-allow-headers ["Content-Type"])))