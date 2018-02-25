(ns handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [clojure.string :refer [ends-with?]]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [clojure.java.io :as io]
            [ring.middleware.json :refer [wrap-json-response]]
            [ring.util.json-response :refer [json-response]]
            [ring.util.response :refer [response]]
            [ring.middleware.cors :refer [wrap-cors]]))

(def ^:const localhost  "http://localhost:3000")

(defn fileIsPreviewable [fileMap]
  "Returns true if a `fileMap` can be previewed"
  (ends-with? (get fileMap :name) ".txt")
 )

(defn toFileInfo [file]
  "Given a `file`, returns only the data of interest
  Set of information returned depends on if the file is a directory or a file.
  If it is a file, it also changes in case it can be previewed."
  (let [fileMap (bean file)
        filePath (get fileMap :path)
        commonData (select-keys fileMap [:path :name :directory])]
    (cond
      (fileIsPreviewable fileMap)
      (assoc commonData :previewUrl (str localhost "/preview?path=" filePath))
      (.isDirectory file)
      (assoc commonData :dirUrl (str localhost "/dir?path=" filePath))
      :else commonData
      )))

(defn getFiles [path]
  "Returns information about the files in a specific `path`"
    (map toFileInfo (.listFiles (io/file path)))
)

(defn getFileLines [n filename]
  "Returns the first `n` lines of a `filename`"
  (let [fileContents (with-open [rdr (io/reader filename)]
                       (doall (take n (line-seq rdr))))]
    {:file filename :content fileContents })
  )

(defroutes app-routes
           (GET "/dir" [path] (wrap-json-response (fn [_] (response (getFiles path)))))
           (GET "/preview" [path]  (json-response (getFileLines 10 path)))
           (route/not-found "Not Found"))

(def app
    (-> (wrap-defaults app-routes site-defaults)
        (wrap-cors :access-control-allow-origin #"http://localhost:4200"
                   :access-control-allow-methods [:get]
                   :access-control-allow-headers ["Content-Type"])))