(ns gmt-api.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [clojure.string :refer [ends-with?]]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [clojure.java.io :as io]
            [ring.middleware.json :refer [wrap-json-response]]
            [ring.util.json-response :refer [json-response]]
            [ring.util.response :refer [response]]
            [ring.middleware.cors :refer [wrap-cors]]))

(defn fileIsPreviewable [fileMap]
  (ends-with? (get fileMap :name) ".txt")
 )

(defn ToFileInfo [file]
  (let [fileMap (bean file)]
    (if (fileIsPreviewable fileMap)
      (assoc (select-keys fileMap [:path :name :directory])
        :previewUrl (str "http://localhost:3000/preview?path=" (get fileMap :path)))
      (select-keys fileMap [:path :name :directory]))))


(defn GetFiles [path]
    (map ToFileInfo (.listFiles (io/file path)))
)

(defn getFileLines [n filename]
  (let [fileContents (with-open [rdr (io/reader filename)]
                       (doall (take n (line-seq rdr))))]
    {:file filename :content fileContents })
  )

(defroutes app-routes
           (GET "/" [] "Hello World")
           (GET "/dir" [path] (wrap-json-response (fn [_] (response (GetFiles path)))))
           (GET "/preview" [path]  (json-response (getFileLines 10 path)))
           (route/not-found "Not Found"))

(def app
    (-> (wrap-defaults app-routes site-defaults)
        (wrap-cors :access-control-allow-origin #"http://localhost:4200"
                   :access-control-allow-methods [:get]
                   :access-control-allow-headers ["Content-Type"])))