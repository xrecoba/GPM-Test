(ns spa-om.core
  (:require [goog.dom :as gdom]
            [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]))

(enable-console-print!)

(println "Hello world!")

(defui HelloWorld
  Object
  (render [this]
    (dom/div nil (get (om/props this) :title))))

(def hello (om/factory HelloWorld))

(js/ReactDOM.render
  (apply dom/div nil
    (map #(hello {:react-key %
                  :title (str "Hello number " %)})
      (range 6)))
  (gdom/getElement "app"))