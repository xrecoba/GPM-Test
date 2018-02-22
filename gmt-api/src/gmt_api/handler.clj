(ns gmt-api.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [clojure.java.io :as io]
            [ring.middleware.json :refer [wrap-json-response]]
            [ring.util.json-response :refer [json-response]]
            [ring.util.response :refer [response]]
            [ring.middleware.cors :refer [wrap-cors]]))

(defn ToFileInfo [file]
  (select-keys (bean file) [:path :name :directory]))

(defn GetFiles [request]
  ;(.println java.lang.System/out request)
  (response (map ToFileInfo (.listFiles (io/file "c:/ToDelete")))))

(defn GetFilesWithParam [path]
  (.println java.lang.System/out path)
  (.println java.lang.System/out (type path))

  (map ToFileInfo (.listFiles (io/file path)))
  ;(response  (+ 1 1))
  ;(response (str "Hello user "))
  )

(defn getFileLines [n filename]
  (let [fileContents (with-open [rdr (io/reader filename)]
                       (doall (take n (line-seq rdr))))]
    {:file filename :content fileContents })
  )

(defroutes app-routes
           (GET "/" [] "Hello World")
           (GET "/preview" [path]  (getFileLines 10 "c:/ToDelete/Hola.txt"))
           ;(GET "/previewWithParam" [path]  (getFileLines 10 path))
           (GET "/previewWithParam" [path]  (json-response (getFileLines 10 path)))
           ;           (GET "/id"  (wrap-json-response  (GetFilesWithParam "c:/ToDelete") ))

           ;(GET "/:id" [u :uri]  (wrap-json-response  (GetFilesWithParam u) ))
           (GET "/dirOld" [] (wrap-json-response GetFiles))
           (GET "/dir" [path] (wrap-json-response (GetFilesWithParam path)))
           (GET "/dirNew" [path] (wrap-json-response (fn [_] (response {:id path :message "hello2"}))))
           (GET "/dirNew2" [path] (wrap-json-response (fn [_] (response (GetFilesWithParam path)))))

           (GET "/HelloWorld" [path]  (str "Hello World" path)) ;Works
           ;(GET "/dir" [] (wrap-json-response GetFiles))
           (route/not-found "Not Found Yes"))


(def app
    (-> (wrap-defaults app-routes site-defaults)
        (wrap-cors :access-control-allow-origin #"http://localhost:4200"
                   :access-control-allow-methods [:get]
                   :access-control-allow-headers ["Content-Type"])))