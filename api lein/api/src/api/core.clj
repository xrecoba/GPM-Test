(ns api.core
  (:gen-class)
  (:require [clojure.data.json :as json])
  (:require [clojure.java.io :as io]))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "Hello, World!"))

((defn file-or-folder
  "docstring"
  [path]
   (str "hello")
  ))

(defn fileOrFolder [path] (str "Hello, " path) )

(defn isFile [path]
  (
    (.exists (io/as-file path))))


; Works
(defn isFile [path]
  (.exists (io/as-file path)))

; No need to define an extra function for is Directory
' (.isDirectory (io/file "c:/ToDelete"))

; function to list all elements in folder:
(.list (io/file "c:/ToDelete"))


(defn enrich [name]
  (if (isFile path)
    {:path path
     :type "file"}
    {:path path
     :type "folder"})
  )

; (json/write-str (map enrich (.list (io/file "c:"))))